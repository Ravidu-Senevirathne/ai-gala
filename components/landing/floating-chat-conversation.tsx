"use client";

import { useEffect, useRef, useState } from "react";

import { ChatResultCards } from "./chat-result-cards";
import { defaultChatSuggestionChips } from "./chat-assistant";
import type { JobResult, ShopResult } from "@/lib/ai/types";

type ChatMessage = {
    id: number;
    role: "user" | "assistant";
    text: string;
    results?: ShopResult[] | JobResult[];
    resultType?: "shop" | "job";
};

let messageId = 0;

function nextId() {
    messageId += 1;
    return messageId;
}

function TypingBubble() {
    return (
        <div className="flex items-center gap-2 self-start rounded-2xl rounded-bl-sm border border-white/10 bg-white/5 px-4 py-3">
            <span className="typing-node h-2 w-2 rounded-full bg-[#FF6500] shadow-[0_0_10px_rgba(255,101,0,0.7)]" />
            <span className="typing-node h-2 w-2 rounded-full bg-[#FFB27A] shadow-[0_0_10px_rgba(255,178,122,0.4)] [animation-delay:180ms]" />
            <span className="typing-node h-2 w-2 rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.3)] [animation-delay:360ms]" />
        </div>
    );
}

export function FloatingChatConversation() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: nextId(),
            role: "assistant",
            text: "Ayubowan! Ask me about budgets, open shops, or live discounts in Kurunegala — Sinhala, Singlish, or English all work.",
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const userLocationRef = useRef<{ lat: number; lng: number } | null>(null);
    const locationRequestedRef = useRef(false);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, isTyping]);

    function requestLocation() {
        if (locationRequestedRef.current || !navigator.geolocation) {
            return;
        }
        locationRequestedRef.current = true;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocationRef.current = { lat: position.coords.latitude, lng: position.coords.longitude };
            },
            () => {
                userLocationRef.current = null;
            },
        );
    }

    async function sendMessage(text: string) {
        const trimmed = text.trim();
        if (!trimmed || isTyping) {
            return;
        }

        requestLocation();

        const history = [...messages, { id: nextId(), role: "user" as const, text: trimmed }];
        setMessages(history);
        setInput("");
        setIsTyping(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: history.map((message) => ({ role: message.role, content: message.text })),
                    userLocation: userLocationRef.current,
                    localTime: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error("Chat request failed");
            }

            const data = (await response.json()) as { reply: string; results?: ShopResult[] | JobResult[]; resultType?: "shop" | "job" };

            setMessages((current) => [
                ...current,
                {
                    id: nextId(),
                    role: "assistant",
                    text: data.reply || "Here's what I found.",
                    results: data.results,
                    resultType: data.resultType,
                },
            ]);
        } catch {
            setMessages((current) => [
                ...current,
                {
                    id: nextId(),
                    role: "assistant",
                    text: "Sorry, something went wrong while reaching AI-GALA. Please try again.",
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    }

    return (
        <div className="flex h-full flex-col">
            <div ref={scrollRef} className="flex max-h-[50vh] min-h-[260px] flex-col gap-3 overflow-y-auto p-4">
                {messages.map((message) => (
                    <div key={message.id} className="flex flex-col gap-3">
                        <div
                            className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 ${
                                message.role === "user"
                                    ? "self-end rounded-br-sm bg-[#FF6500] text-white shadow-[0_0_20px_rgba(255,101,0,0.3)]"
                                    : "self-start rounded-bl-sm border border-white/10 bg-white/5 text-white/85"
                            }`}
                        >
                            {message.text}
                        </div>
                        {message.results && message.resultType && (
                            <ChatResultCards results={message.results} resultType={message.resultType} />
                        )}
                    </div>
                ))}
                {isTyping && <TypingBubble />}
            </div>

            {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 px-4 pb-2">
                    {defaultChatSuggestionChips.map((chip) => (
                        <button
                            key={chip.label}
                            type="button"
                            disabled={isTyping}
                            onClick={() => sendMessage(chip.label)}
                            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition duration-300 hover:border-[#FF6500]/50 hover:bg-[#FF6500]/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-55"
                        >
                            {chip.label}
                        </button>
                    ))}
                </div>
            )}

            <form
                className="flex items-center gap-2 border-t border-white/10 p-3"
                onSubmit={(event) => {
                    event.preventDefault();
                    void sendMessage(input);
                }}
            >
                <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    aria-label="Chat message"
                    placeholder="Type a message..."
                    className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-[#07111f]/80 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#FF6500]/50 focus:ring-2 focus:ring-[#FF6500]/20"
                />
                <button
                    type="submit"
                    disabled={isTyping || !input.trim()}
                    aria-label="Send message"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FF6500] text-white shadow-[0_0_20px_rgba(255,101,0,0.35)] transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,101,0,0.6)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                        aria-hidden="true"
                    >
                        <path d="m22 2-7 20-4-9-9-4Z" />
                        <path d="M22 2 11 13" />
                    </svg>
                </button>
            </form>
        </div>
    );
}
