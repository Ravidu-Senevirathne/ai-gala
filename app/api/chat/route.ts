import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import type { ChatApiRequest, ChatApiResponse } from "@/lib/ai/types";

function isLikelyQuotaError(errorText: string) {
    const normalized = errorText.toLowerCase();
    return (
        normalized.includes("quota") ||
        normalized.includes("rate limit") ||
        normalized.includes("resource_exhausted") ||
        normalized.includes("limit exceeded")
    );
}

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as ChatApiRequest;
        const { messages, localTime } = body;

        if (!Array.isArray(messages) || messages.length === 0) {
            return Response.json({ error: "messages is required" }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return Response.json(
                { error: "API Key configuration error", details: "GEMINI_API_KEY is missing" },
                { status: 500 },
            );
        }

        const system = buildSystemPrompt(localTime ?? new Date().toISOString());

        // Use exact model slug — the env var must be e.g. "gemini-1.5-flash" not a display name.
        const modelId = process.env.GEMINI_MODEL ?? "gemini-1.5-flash";

        // Gemini requires the conversation to start with a "user" turn and roles must alternate.
        const trimmedMessages = messages.slice(messages.findIndex((m) => m.role === "user"));

        if (trimmedMessages.length === 0) {
            return Response.json({ error: "No user message found" }, { status: 400 });
        }

        // Enforce strict alternation: merge consecutive same-role messages.
        const alternatingMessages = trimmedMessages.reduce<typeof trimmedMessages>((acc, msg) => {
            const lastRole = acc.at(-1)?.role;
            if (lastRole === msg.role) {
                const last = acc[acc.length - 1]!;
                return [...acc.slice(0, -1), { ...last, content: `${last.content}\n${msg.content}` }];
            }
            return [...acc, msg];
        }, []);

        // --- Official SDK usage ---
        // systemInstruction belongs inside getGenerativeModel() config, NOT in the contents array.
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: modelId,
            systemInstruction: system,
            generationConfig: {
                temperature: 0.7,
                topP: 0.95,
                maxOutputTokens: 512,
            },
        });

        // Build contents using the correct SDK format: { role, parts: [{ text }] }
        const contents = alternatingMessages.map((message) => ({
            role: message.role === "assistant" ? "model" : "user",
            parts: [{ text: message.content }],
        }));

        console.log("[Gemini] Model:", modelId);
        console.log("[Gemini] Contents:", JSON.stringify(contents, null, 2));

        const result = await model.generateContent({ contents });
        const reply = result.response.text().trim();

        return Response.json({
            reply: reply || "මචං, මට ඒකට හොඳ උත්තරයක් හදන්න බැරි වුණා. ආයෙ try කරලා බලන්න.",
        } satisfies ChatApiResponse);
    } catch (error: unknown) {
        console.error("[Gemini] ERROR:", error);

        const message = error instanceof Error ? error.message : String(error);
        const isQuota = isLikelyQuotaError(message);

        if (isQuota) {
            return Response.json(
                {
                    reply: "මචං, Gemini free-tier quota එක reach වෙලා තියෙනවා. Billing enable කරලා හෝ quota reset වුණාම ආයෙ try කරලා බලන්න.",
                    fallback: true,
                    error: "Gemini free-tier quota reached",
                    details: message,
                } satisfies ChatApiResponse,
                { status: 429 },
            );
        }

        return Response.json(
            {
                error: "Unexpected Gemini request failure",
                details: message,
            },
            { status: 500 },
        );
    }
}
