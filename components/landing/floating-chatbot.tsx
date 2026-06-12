"use client";

import { useState } from "react";
import { FloatingChatConversation } from "./floating-chat-conversation";

export function FloatingChatbot() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-4 sm:bottom-8 sm:right-8">
            {isOpen && (
                <div className="chat-pop-in w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#0B192C]/95 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:max-w-md">
                    <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/5 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-white">AI-GALA Assistant</p>
                                <p className="text-xs text-white/50">Online · replies instantly</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close AI-GALA assistant"
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition duration-300 hover:border-[#FF6500]/50 hover:bg-[#FF6500]/10 hover:text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                                aria-hidden="true"
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>

                    <FloatingChatConversation />
                </div>
            )}

            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-label={isOpen ? "Close AI-GALA assistant" : "Open AI-GALA assistant"}
                aria-expanded={isOpen}
                className={`group relative flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110 ${
                    isOpen
                        ? "rotate-90 border-white/15 bg-[#0B192C] text-white shadow-[0_0_24px_rgba(0,0,0,0.5)]"
                        : "border-[#FF6500]/40 bg-[#FF6500] text-white shadow-[0_0_30px_rgba(255,101,0,0.5)] hover:shadow-[0_0_40px_rgba(255,101,0,0.7)]"
                }`}
            >
                {!isOpen && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6500] opacity-30" />
                )}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`relative h-6 w-6 transition-transform duration-300 ${isOpen ? "-rotate-90" : ""}`}
                    aria-hidden="true"
                >
                    {isOpen ? (
                        <>
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </>
                    ) : (
                        <>
                            <path d="M12 3a9 9 0 0 0-8.5 12.05L3 21l5.95-1.5A9 9 0 1 0 12 3Z" />
                            <path d="M8.5 11h.01" />
                            <path d="M12 11h.01" />
                            <path d="M15.5 11h.01" />
                        </>
                    )}
                </svg>
            </button>
        </div>
    );
}
