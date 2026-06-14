"use client";

import { useEffect, useState } from "react";
import { AiGalaChatInterface } from "./ai-gala-chat-interface";

type FloatingChatbotProps = {
    userName?: string | null;
};

export function FloatingChatbot({ userName }: FloatingChatbotProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("welcome") !== "1") {
            return;
        }

        window.requestAnimationFrame(() => setIsOpen(true));

        params.delete("welcome");
        const query = params.toString();
        window.history.replaceState({}, "", query ? `${window.location.pathname}?${query}` : window.location.pathname);
    }, []);

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-4 sm:bottom-8 sm:right-8">
            {isOpen && (
                <div className="chat-pop-in w-[calc(100vw-2.5rem)] max-w-sm sm:max-w-md">
                    <AiGalaChatInterface userName={userName} variant="floating" onClose={() => setIsOpen(false)} />
                </div>
            )}

            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-label={isOpen ? "Close AI-GALA assistant" : "Open AI-GALA assistant"}
                aria-expanded={isOpen}
                className={`group relative flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110 ${isOpen
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
