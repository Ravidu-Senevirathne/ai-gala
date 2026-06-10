import type { AssistantResponse, ChatSuggestionChip } from "./types";

export const defaultChatSuggestionChips: ChatSuggestionChip[] = [
    { label: "මචං, 2000ට රෑට කන්න තැනක් කියපන්", tone: "budget" },
    { label: "අද කුරුණෑගල තියෙන සිරාම Discounts මොනවාද?", tone: "status" },
    { label: "Open Pharmacies right now", tone: "urgency" },
];

export function buildAssistantResponse(query: string): AssistantResponse {
    const normalized = query.toLowerCase();
    const budgetMatch = query.match(/(\d{3,5})/);
    const budget = budgetMatch ? Number(budgetMatch[1]) : null;

    if (normalized.includes("discount")) {
        return {
            label: "Live deals detected",
            headline: "3 local promotions are active right now",
            details: "Nolimit, Burger Hunt, and Softlogic are surfacing limited-time offers across Kurunegala.",
        };
    }

    if (normalized.includes("pharmacy")) {
        return {
            label: "Open-now results",
            headline: "Open pharmacies are ready in your area",
            details: "We are prioritizing nearby pharmacies with live hours, quick call actions, and fast directions.",
        };
    }

    if (budget !== null && (normalized.includes("kanna") || normalized.includes("eat") || normalized.includes("food") || normalized.includes("dinner"))) {
        return {
            label: "Budget matched",
            headline: `Found places that fit a Rs. ${budget} dinner range`,
            details: "Try small eats, rice and curry spots, and takeaway counters that keep the bill under control.",
        };
    }

    if (normalized.includes("open")) {
        return {
            label: "Live availability",
            headline: "Open shops are being prioritized in real time",
            details: "AI-GALA is filtering businesses by current status, urgency, and category before it shows results.",
        };
    }

    return {
        label: "Smart directory response",
        headline: "Tell AI-GALA the budget, category, or urgency",
        details: "You can ask in Sinhala, Singlish, or English and the directory will shape the results instantly.",
    };
}
