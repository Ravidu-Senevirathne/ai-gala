import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import type { ChatApiRequest, ChatApiResponse } from "@/lib/ai/types";

// ---------------------------------------------------------------------------
// Prioritised fallback chain — first entry is always tried first.
// If it is rate-limited (429 / 400 / RESOURCE_EXHAUSTED), the next model is
// tried automatically, down to the high-limit lite model at position [3].
// ---------------------------------------------------------------------------
const FALLBACK_MODELS = [
    "gemini-2.5-flash",       // Primary   — highest capability
    "gemini-2.5-flash-lite",  // Secondary — lighter quota tier
    "gemini-2.0-flash",       // Tertiary  — stable fallback
    "gemini-2.0-flash-lite",  // Last-resort — highest free-tier limit
] as const;

// ---------------------------------------------------------------------------
// Determines whether an error is a transient quota / rate-limit failure that
// warrants trying the next model rather than aborting immediately.
// ---------------------------------------------------------------------------
function isRateLimitError(error: unknown): boolean {
    const message =
        error instanceof Error
            ? error.message
            : typeof error === "string"
              ? error
              : JSON.stringify(error);

    const normalized = message.toLowerCase();

    return (
        normalized.includes("429") ||
        normalized.includes("quota") ||
        normalized.includes("rate limit") ||
        normalized.includes("resource_exhausted") ||
        normalized.includes("limit exceeded") ||
        normalized.includes("too many requests")
    );
}

// ---------------------------------------------------------------------------
// Determines whether a 400 INVALID_ARGUMENT should be treated as a model-
// level failure (e.g. model not found / not available in the region) vs. a
// genuine malformed-request error that should be surfaced to the caller.
// ---------------------------------------------------------------------------
function isModelAvailabilityError(error: unknown): boolean {
    const message =
        error instanceof Error
            ? error.message
            : typeof error === "string"
              ? error
              : JSON.stringify(error);

    const normalized = message.toLowerCase();

    return (
        normalized.includes("invalid_argument") ||
        normalized.includes("model not found") ||
        normalized.includes("model_not_found") ||
        normalized.includes("is not supported") ||
        normalized.includes("not available")
    );
}

// ---------------------------------------------------------------------------
// POST /api/chat
// ---------------------------------------------------------------------------
export async function POST(request: Request) {
    // ── 1. Parse & validate request body ────────────────────────────────────
    let body: ChatApiRequest;
    try {
        body = (await request.json()) as ChatApiRequest;
    } catch {
        return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { messages, localTime } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
        return Response.json({ error: "messages is required and must be a non-empty array" }, { status: 400 });
    }

    // ── 2. Validate API key ──────────────────────────────────────────────────
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return Response.json(
            { error: "API Key configuration error", details: "GEMINI_API_KEY is missing from environment" },
            { status: 500 },
        );
    }

    // ── 3. Build system prompt (time-aware) ──────────────────────────────────
    const systemInstruction = buildSystemPrompt(localTime ?? new Date().toISOString());

    // ── 4. Sanitise conversation history ────────────────────────────────────
    // Gemini requires: (a) first turn must be "user", (b) roles must strictly alternate.

    // (a) Drop any leading assistant turns.
    const trimmed = messages.slice(messages.findIndex((m) => m.role === "user"));
    if (trimmed.length === 0) {
        return Response.json({ error: "No user message found in messages array" }, { status: 400 });
    }

    // (b) Merge consecutive same-role messages so the array always alternates.
    const alternating = trimmed.reduce<typeof trimmed>((acc, msg) => {
        const lastRole = acc.at(-1)?.role;
        if (lastRole === msg.role) {
            const last = acc[acc.length - 1]!;
            return [...acc.slice(0, -1), { ...last, content: `${last.content}\n${msg.content}` }];
        }
        return [...acc, msg];
    }, []);

    // (c) Map to the official SDK "contents" structure.
    //     Gemini uses role "model" where our app uses "assistant".
    const contents = alternating.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
    }));

    // ── 5. Multi-model fallback loop ─────────────────────────────────────────
    const genAI = new GoogleGenerativeAI(apiKey);
    let lastError: unknown = null;

    for (const modelName of FALLBACK_MODELS) {
        try {
            console.log(`[Gemini] Attempting model: ${modelName}`);

            const model = genAI.getGenerativeModel({
                model: modelName,
                // systemInstruction must be here, NOT inside contents[].
                systemInstruction,
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.95,
                    maxOutputTokens: 512,
                },
            });

            const result = await model.generateContent({ contents });
            const reply = result.response.text().trim();

            console.log(`[Gemini] Success with model: ${modelName}`);

            return Response.json({
                reply: reply || "මචං, මට ඒකට හොඳ උත්තරයක් හදන්න බැරි වුණා. ආයෙ try කරලා බලන්න.",
                // Surface the model that actually answered — useful for debugging.
                _model: modelName,
            } satisfies ChatApiResponse & { _model: string });
        } catch (error: unknown) {
            lastError = error;

            const shouldFallback = isRateLimitError(error) || isModelAvailabilityError(error);

            if (shouldFallback) {
                console.warn(
                    `[Gemini] Model ${modelName} failed (rate-limit / unavailable), switching to next fallback...`,
                );
                // Continue loop → try the next model.
                continue;
            }

            // Any other error (e.g. malformed request, auth failure) — stop immediately.
            console.error(`[Gemini] Non-recoverable error on model ${modelName}:`, error);
            break;
        }
    }

    // ── 6. All models exhausted / unrecoverable error ────────────────────────
    console.error("[Gemini] All models failed. Last error:", lastError);

    const lastMessage =
        lastError instanceof Error ? lastError.message : String(lastError);

    const isFullyExhausted = isRateLimitError(lastError);

    if (isFullyExhausted) {
        return Response.json(
            {
                reply: "මචං, දැන් AI models ටික ම quota reach කරලා ඉවර. ටිකකින් ආයෙ try කරලා බලන්න.",
                fallback: true,
                error: "All Gemini models exhausted (quota / rate limit)",
                details: lastMessage,
            } satisfies ChatApiResponse,
            { status: 429 },
        );
    }

    return Response.json(
        {
            reply: "කනගාටුයි මචං, server error එකක් ආවා. ටිකකින් ආයෙ try කරන්න.",
            error: "Unexpected Gemini request failure",
            details: lastMessage,
        } satisfies ChatApiResponse,
        { status: 500 },
    );
}
