import type { Tool } from "@anthropic-ai/sdk/resources/messages";

export const searchDirectoryTool: Tool = {
    name: "search_directory",
    description:
        "Search the AI-GALA directory for shops/services or jobs that match the user's request. " +
        "Call this only once you have enough information from the user: for shops, you need at least " +
        "a budget (or 'no limit') and a category/food type; for jobs, you need at least a field/category. " +
        "Travel distance and exact coordinates are optional extras.",
    input_schema: {
        type: "object",
        properties: {
            intent: {
                type: "string",
                enum: ["shop", "job"],
                description: "Whether the user wants to find a shop/service or a job.",
            },
            category: {
                type: "string",
                description:
                    "The category, food type, or job field the user is interested in (e.g. 'cafe', 'pharmacy', 'mobile repair technician').",
            },
            max_distance_km: {
                type: "number",
                description: "Maximum travel distance in kilometers the user is willing to go. Omit if not specified.",
            },
            budget_min: {
                type: "number",
                description: "Minimum budget in LKR (for shops) or minimum salary expectation (for jobs). Omit if not specified.",
            },
            budget_max: {
                type: "number",
                description: "Maximum budget in LKR (for shops) or maximum salary expectation (for jobs). Omit if not specified.",
            },
            user_lat: {
                type: "number",
                description: "The user's current latitude, if known.",
            },
            user_lng: {
                type: "number",
                description: "The user's current longitude, if known.",
            },
        },
        required: ["intent"],
    },
};
