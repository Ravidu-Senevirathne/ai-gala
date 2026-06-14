import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import type { ChatApiRequest, ChatApiResponse } from "@/lib/ai/types";

type GeminiResponse = {
    candidates?: Array<{
        content?: {
            parts?: Array<{ text?: string }>;
        };
    }>;
};

function isLikelyQuotaError(errorText: string) {
    const normalized = errorText.toLowerCase();
    return normalized.includes("quota") || normalized.includes("rate limit") || normalized.includes("resource_exhausted") || normalized.includes("limit exceeded");
}

function getGeminiErrorMessage(status: number, errorText: string) {
    if (status === 401 || status === 403) {
        return "API Key configuration error";
    }

    if (status === 429 && isLikelyQuotaError(errorText)) {
        return "Gemini free-tier quota reached for this key/project";
    }

    return `Gemini request failed with status ${status}`;
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
            return Response.json({ error: "API Key configuration error", details: "GEMINI_API_KEY is missing" }, { status: 500 });
        }

        const system = buildSystemPrompt(localTime ?? new Date().toISOString());
        const model = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{ text: system }],
                    },
                    contents: messages.map((message) => ({
                        role: message.role === "assistant" ? "model" : "user",
                        parts: [{ text: message.content }],
                    })),
                    generationConfig: {
                        temperature: 0.7,
                        topP: 0.95,
                        maxOutputTokens: 512,
                    },
                }),
            },
        );

        if (!response.ok) {
            const errorText = await response.text();
            const errorMessage = getGeminiErrorMessage(response.status, errorText);

            if (response.status === 429 && isLikelyQuotaError(errorText)) {
                return Response.json(
                    {
                        reply: "මචං, Gemini free-tier quota එක reach වෙලා තියෙනවා. Billing enable කරලා හෝ quota reset වුණාම ආයෙ try කරලා බලන්න.",
                        fallback: true,
                        error: errorMessage,
                        details: errorText,
                    } satisfies ChatApiResponse,
                    { status: 429 },
                );
            }

            return Response.json(
                {
                    error: errorMessage,
                    details: errorText,
                },
                { status: response.status === 401 || response.status === 403 ? response.status : 500 },
            );
        }

        const data = (await response.json()) as GeminiResponse;
        const reply = data.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text ?? "").join("\n").trim() ?? "";

        return Response.json({
            reply: reply || "මචං, මට ඒකට හොඳ උත්තරයක් හදන්න බැරි වුණා. ආයෙ try කරලා බලන්න.",
        } satisfies ChatApiResponse);
    } catch (error) {
        console.error("ACTUAL GEMINI ERROR:", error);

        return Response.json(
            {
                error: "Unexpected Gemini request failure",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 },
        );
    }
}
