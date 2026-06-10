"use client";

import { useEffect, useRef, useState } from "react";
import { buildAssistantResponse, defaultChatSuggestionChips } from "./chat-assistant";
import type { AssistantResponse, ChatSuggestionChip } from "./types";

type BudgetMatcherChatProps = {
    suggestionChips?: ChatSuggestionChip[];
};

const defaultChips = defaultChatSuggestionChips;

function ThinkingState() {
    return (
        <div className="space-y-4 rounded-[1.35rem] border border-[#FF6500]/25 bg-[#081321]/85 p-4 shadow-[0_0_36px_rgba(255,101,0,0.08)] backdrop-blur-xl">
            <div className="flex items-center gap-3 text-sm text-white/80">
                <span className="flex items-center gap-2" aria-hidden="true">
                    <span className="typing-node h-2.5 w-2.5 rounded-full bg-[#FF6500] shadow-[0_0_12px_rgba(255,101,0,0.7)]" />
                    <span className="typing-node h-2.5 w-2.5 rounded-full bg-[#FFB27A] shadow-[0_0_12px_rgba(255,178,122,0.4)] [animation-delay:180ms]" />
                    <span className="typing-node h-2.5 w-2.5 rounded-full bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.3)] [animation-delay:360ms]" />
                </span>
                <span className="font-medium text-white">Gemini is thinking...</span>
            </div>

            <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                <div className="space-y-3">
                    <div className="h-3 w-2/3 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.14)_50%,rgba(255,255,255,0.05)_100%)] bg-[length:200%_100%] animate-shimmer" />
                    <div className="h-3 w-full rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.14)_50%,rgba(255,255,255,0.05)_100%)] bg-[length:200%_100%] animate-shimmer" />
                    <div className="h-3 w-5/6 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.14)_50%,rgba(255,255,255,0.05)_100%)] bg-[length:200%_100%] animate-shimmer" />
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/45">
                    <span className="h-2 w-2 rounded-full bg-[#FF6500] shadow-[0_0_18px_rgba(255,101,0,0.7)] typing-node" />
                    Buffering the response safely
                </div>
            </div>
        </div>
    );
}

function ResponseCard({ response, query }: { response: AssistantResponse; query: string }) {
    return (
        <div className="space-y-4 rounded-[1.35rem] border border-[#FF6500]/25 bg-[#081321]/85 p-4 shadow-[0_0_36px_rgba(255,101,0,0.08)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/45">AI-GALA result</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{response.headline}</h3>
                </div>
                <span className="rounded-full border border-[#FF6500]/25 bg-[#FF6500]/10 px-3 py-1 text-xs text-[#FFB27A]">
                    Live buffer cleared
                </span>
            </div>

            <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[#FFB27A]">{response.label}</p>
                <p className="mt-3 text-sm leading-7 text-white/78">{response.details}</p>
            </div>

            <div className="rounded-[1.25rem] border border-white/10 bg-[#0E1C31] p-4 text-sm text-white/70">
                <span className="text-white/45">Query:</span> {query}
            </div>
        </div>
    );
}

export function BudgetMatcherChat({ suggestionChips = defaultChips }: BudgetMatcherChatProps) {
    const defaultQuery = suggestionChips[0]?.label ?? "";
    const [query, setQuery] = useState(defaultQuery);
    const [response, setResponse] = useState<AssistantResponse>(() => buildAssistantResponse(defaultQuery));
    const [isProcessing, setIsProcessing] = useState(false);
    const cooldownRef = useRef<number | null>(null);
    const responseRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (cooldownRef.current !== null) {
                window.clearTimeout(cooldownRef.current);
            }

            if (responseRef.current !== null) {
                window.clearTimeout(responseRef.current);
            }
        };
    }, []);

    function runQuery(nextQuery: string) {
        if (isProcessing) {
            return;
        }

        setQuery(nextQuery);
        setIsProcessing(true);

        if (cooldownRef.current !== null) {
            window.clearTimeout(cooldownRef.current);
        }

        if (responseRef.current !== null) {
            window.clearTimeout(responseRef.current);
        }

        responseRef.current = window.setTimeout(() => {
            setResponse(buildAssistantResponse(nextQuery));
            responseRef.current = null;
        }, 2100);

        cooldownRef.current = window.setTimeout(() => {
            setIsProcessing(false);
            cooldownRef.current = null;
        }, 5000);
    }

    return (
        <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">AI-GALA concierge</p>
                    <h2 className="mt-1 text-xl font-semibold text-white">Budget-aware smart search</h2>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                    Live buffer
                </div>
            </div>

            <form
                className="mt-5 space-y-4"
                onSubmit={(event) => {
                    event.preventDefault();
                    runQuery(query.trim() || defaultQuery);
                }}
            >
                <label className="block text-xs uppercase tracking-[0.35em] text-white/55">
                    Ask in Sinhala, Singlish, or English
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        aria-label="Budget matcher chat input"
                        className="min-h-14 flex-1 rounded-2xl border border-white/10 bg-[#07111f]/80 px-4 text-base text-white outline-none placeholder:text-white/35 focus:border-[#FF6500]/50 focus:ring-2 focus:ring-[#FF6500]/20"
                        placeholder="මචං, 2000ට රෑට කන්න තැනක් කියපන්"
                    />
                    <button
                        type="submit"
                        disabled={isProcessing}
                        className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#FF6500] px-6 text-sm font-semibold text-white shadow-[0_0_24px_rgba(255,101,0,0.35)] transition duration-300 hover:scale-105 hover:shadow-[0_0_34px_rgba(255,101,0,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isProcessing ? "Buffering..." : "Ask AI-GALA"}
                    </button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {suggestionChips.map((chip) => (
                        <button
                            key={chip.label}
                            type="button"
                            disabled={isProcessing}
                            onClick={() => runQuery(chip.label)}
                            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70 transition duration-300 hover:scale-105 hover:border-[#FF6500]/50 hover:bg-[#FF6500]/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-55"
                        >
                            {chip.label}
                        </button>
                    ))}
                </div>
            </form>

            <div className="mt-5 min-h-[240px]">{isProcessing ? <ThinkingState /> : <ResponseCard response={response} query={query} />}</div>
        </div>
    );
}
