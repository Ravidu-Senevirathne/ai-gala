import Anthropic from "@anthropic-ai/sdk";
import type { MessageParam } from "@anthropic-ai/sdk/resources/messages";

import { searchDirectory } from "@/lib/ai/search-directory";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import { searchDirectoryTool } from "@/lib/ai/tools";
import type { ChatApiRequest, ChatApiResponse, SearchDirectoryInput } from "@/lib/ai/types";

const anthropic = new Anthropic();

export async function POST(request: Request) {
    const body = (await request.json()) as ChatApiRequest;
    const { messages, userLocation, localTime } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
        return Response.json({ error: "messages is required" }, { status: 400 });
    }

    const system = buildSystemPrompt(localTime ?? new Date().toISOString());

    const conversation: MessageParam[] = messages.map((message) => ({
        role: message.role,
        content: message.content,
    }));

    const firstResponse = await anthropic.messages.create({
        model: "claude-opus-4-8",
        max_tokens: 1024,
        thinking: { type: "adaptive" },
        system,
        messages: conversation,
        tools: [searchDirectoryTool],
    });

    const toolUseBlock = firstResponse.content.find((block) => block.type === "tool_use");

    if (!toolUseBlock || toolUseBlock.type !== "tool_use") {
        const reply = firstResponse.content
            .filter((block) => block.type === "text")
            .map((block) => (block.type === "text" ? block.text : ""))
            .join("\n")
            .trim();

        return Response.json({ reply } satisfies ChatApiResponse);
    }

    const toolInput = toolUseBlock.input as SearchDirectoryInput;

    const searchInput: SearchDirectoryInput = {
        intent: toolInput.intent,
        category: toolInput.category,
        max_distance_km: toolInput.max_distance_km,
        budget_min: toolInput.budget_min,
        budget_max: toolInput.budget_max,
        user_lat: toolInput.user_lat ?? userLocation?.lat,
        user_lng: toolInput.user_lng ?? userLocation?.lng,
    };

    const results = await searchDirectory(searchInput);

    const followUpResponse = await anthropic.messages.create({
        model: "claude-opus-4-8",
        max_tokens: 1024,
        thinking: { type: "adaptive" },
        system,
        messages: [
            ...conversation,
            { role: "assistant", content: firstResponse.content },
            {
                role: "user",
                content: [
                    {
                        type: "tool_result",
                        tool_use_id: toolUseBlock.id,
                        content: JSON.stringify({ count: results.length, results }),
                    },
                ],
            },
        ],
        tools: [searchDirectoryTool],
    });

    const reply = followUpResponse.content
        .filter((block) => block.type === "text")
        .map((block) => (block.type === "text" ? block.text : ""))
        .join("\n")
        .trim();

    return Response.json({
        reply,
        results,
        resultType: searchInput.intent,
    } satisfies ChatApiResponse);
}
