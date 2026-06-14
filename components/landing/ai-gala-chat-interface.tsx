"use client";

import { useEffect, useRef, useState } from "react";

import { defaultChatSuggestionChips } from "./chat-assistant";

type ChatVariant = "hero" | "floating";

type ChatMessage = {
    id: number;
    role: "user" | "assistant";
    content: string;
};

type AiGalaChatInterfaceProps = {
    userName?: string | null;
    variant?: ChatVariant;
    onClose?: () => void;
};

type RecognitionInstance = {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    start: () => void;
    stop: () => void;
    abort: () => void;
    onstart: ((event: Event) => void) | null;
    onend: ((event: Event) => void) | null;
    onerror: ((event: RecognitionErrorEvent) => void) | null;
    onresult: ((event: RecognitionResultEvent) => void) | null;
};

type RecognitionErrorEvent = Event & {
    error?: string;
};

type RecognitionAlternative = {
    transcript: string;
};

type RecognitionResult = {
    0: RecognitionAlternative;
    length: number;
    isFinal: boolean;
    [index: number]: RecognitionAlternative;
};

type RecognitionResultEvent = Event & {
    resultIndex: number;
    results: {
        length: number;
        [index: number]: RecognitionResult;
    };
};

type WindowWithSpeech = Window & {
    SpeechRecognition?: new () => RecognitionInstance;
    webkitSpeechRecognition?: new () => RecognitionInstance;
};

let nextId = 0;

function createId() {
    nextId += 1;
    return nextId;
}

function isSinhalaText(text: string) {
    return /[\u0D80-\u0DFF]/.test(text);
}

function getRecognitionConstructor() {
    if (typeof window === "undefined") {
        return null;
    }

    const browserWindow = window as WindowWithSpeech;
    return browserWindow.SpeechRecognition ?? browserWindow.webkitSpeechRecognition ?? null;
}

function getWelcomeMessage(userName?: string | null) {
    const district = process.env.NEXT_PUBLIC_DEFAULT_DISTRICT ?? "Kurunegala";

    if (userName) {
        return `Ayubowan ${userName.split(" ")[0]} machan, I’m AI-GALA for ${district}. Ask me in Sinhala, Singlish, or English.`;
    }

    return `Ayubowan machan, I’m AI-GALA for ${district}. Ask me in Sinhala, Singlish, or English.`;
}

function pickVoiceForLang(voices: SpeechSynthesisVoice[], lang: string) {
    // Exact match first, then prefix match, then default, then first available
    return (
        voices.find((v) => v.lang === lang) ??
        voices.find((v) => v.lang.toLowerCase().startsWith(lang.split("-")[0].toLowerCase())) ??
        voices.find((v) => v.default) ??
        voices[0] ??
        null
    );
}

function ChatSkeleton() {
    return (
        <div className="space-y-3 rounded-3xl border border-[#FF6500]/20 bg-[#081321]/90 p-4 shadow-[0_0_36px_rgba(255,101,0,0.08)] backdrop-blur-xl">
            <div className="flex items-center gap-3 text-sm text-white/80">
                <span className="flex items-center gap-2" aria-hidden="true">
                    <span className="typing-node h-2.5 w-2.5 rounded-full bg-[#FF6500] shadow-[0_0_12px_rgba(255,101,0,0.7)]" />
                    <span className="typing-node h-2.5 w-2.5 rounded-full bg-[#FFB27A] shadow-[0_0_12px_rgba(255,178,122,0.4)] [animation-delay:180ms]" />
                    <span className="typing-node h-2.5 w-2.5 rounded-full bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.3)] [animation-delay:360ms]" />
                </span>
                <span className="font-medium text-white">මචං හිතනවා... 🧠</span>
            </div>

            <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                <div className="space-y-3">
                    <div className="h-3 w-2/3 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.14)_50%,rgba(255,255,255,0.05)_100%)] bg-size-[200%_100%] animate-shimmer" />
                    <div className="h-3 w-full rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.14)_50%,rgba(255,255,255,0.05)_100%)] bg-size-[200%_100%] animate-shimmer" />
                    <div className="h-3 w-5/6 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.14)_50%,rgba(255,255,255,0.05)_100%)] bg-size-[200%_100%] animate-shimmer" />
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/45">
                    <span className="h-2 w-2 rounded-full bg-[#FF6500] shadow-[0_0_18px_rgba(255,101,0,0.7)] typing-node" />
                    Buffering the response safely
                </div>
            </div>
        </div>
    );
}

export function AiGalaChatInterface({ userName, variant = "hero", onClose }: AiGalaChatInterfaceProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: createId(), role: "assistant", content: getWelcomeMessage(userName) },
    ]);
    const [draft, setDraft] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [recognitionLanguage, setRecognitionLanguage] = useState<"si-LK" | "en-US">("si-LK");
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(false);
    const recognitionRef = useRef<RecognitionInstance | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const lastTranscriptRef = useRef("");
    const retryEnglishRef = useRef(false);

    const speechSynthesisSupported = typeof window !== "undefined" && "speechSynthesis" in window;

    const subtitle = variant === "floating" ? "Sinhala, Singlish, English" : "Text chat + voice chat with Gemini";

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages, isSending, isListening]);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setSpeechRecognitionSupported(Boolean(getRecognitionConstructor()));
        }, 0);

        return () => window.clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!speechSynthesisSupported) {
            return;
        }

        const syncVoices = () => {
            setVoices(window.speechSynthesis.getVoices());
        };

        syncVoices();
        window.speechSynthesis.addEventListener("voiceschanged", syncVoices);

        return () => {
            window.speechSynthesis.removeEventListener("voiceschanged", syncVoices);
        };
    }, [speechSynthesisSupported]);

    useEffect(() => {
        return () => {
            recognitionRef.current?.abort();

            if (speechSynthesisSupported) {
                window.speechSynthesis.cancel();
            }
        };
    }, [speechSynthesisSupported]);

    function speakReply(text: string) {
        if (!speechSynthesisSupported) {
            return;
        }

        // Choose language based on whether the reply contains Sinhala script.
        // If it's Sinhala, keep si-LK so the browser at least attempts it.
        // If it's Latin/Singlish/English, use en-US so words are actually spoken.
        const hasSinhala = isSinhalaText(text);
        const lang = hasSinhala ? "si-LK" : "en-US";

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        const voice = pickVoiceForLang(voices, lang);
        if (voice) {
            utterance.voice = voice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    }

    function stopListening() {
        recognitionRef.current?.stop();
    }

    function startListening(language: "si-LK" | "en-US" = recognitionLanguage) {
        const Recognition = getRecognitionConstructor();
        if (!Recognition || isSending) {
            return;
        }

        if (recognitionRef.current) {
            recognitionRef.current.abort();
        }

        retryEnglishRef.current = false;
        lastTranscriptRef.current = "";

        const recognition = new Recognition();
        recognition.lang = language;
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            let transcript = "";

            for (let index = event.resultIndex; index < event.results.length; index += 1) {
                const result = event.results[index];
                transcript += result[0]?.transcript ?? "";
            }

            const trimmed = transcript.trim();
            if (trimmed) {
                lastTranscriptRef.current = trimmed;
                setDraft(trimmed);
            }
        };

        recognition.onerror = (event) => {
            if (!retryEnglishRef.current && language === "si-LK" && event?.error !== "aborted") {
                retryEnglishRef.current = true;
                setRecognitionLanguage("en-US");
                recognitionRef.current = null;
                window.setTimeout(() => startListening("en-US"), 120);
                return;
            }

            setIsListening(false);
            recognitionRef.current = null;
        };

        recognition.onend = () => {
            setIsListening(false);
            recognitionRef.current = null;

            const transcript = lastTranscriptRef.current.trim();
            if (transcript) {
                setDraft(transcript);
                setRecognitionLanguage(isSinhalaText(transcript) ? "si-LK" : "en-US");
                return;
            }

            if (!retryEnglishRef.current && language === "si-LK") {
                retryEnglishRef.current = true;
                setRecognitionLanguage("en-US");
                window.setTimeout(() => startListening("en-US"), 120);
            }
        };

        recognitionRef.current = recognition;
        recognition.start();
    }

    async function submitMessage(nextDraft = draft) {
        const content = nextDraft.trim();
        if (!content || isSending) {
            return;
        }

        recognitionRef.current?.abort();
        setDraft("");

        const userMessage: ChatMessage = {
            id: createId(),
            role: "user",
            content,
        };

        const nextMessages = [...messages, userMessage];
        setMessages(nextMessages);
        setIsSending(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: nextMessages.map((message) => ({ role: message.role, content: message.content })),
                    localTime: new Date().toISOString(),
                    userLocation: null,
                }),
            });

            const data = (await response.json()) as { reply?: string; error?: string; details?: string; fallback?: boolean };

            if (!response.ok) {
                console.error("ACTUAL GEMINI ERROR:", {
                    status: response.status,
                    statusText: response.statusText,
                    error: data.error,
                    details: data.details,
                });

                let uiMessage = "මචං, Gemini request failed.";

                if (response.status === 429) {
                    uiMessage = data.reply?.trim() || data.error || "මචං, Gemini එක මේ වෙලාවේ busy. ටිකක් පස්සේ ආයෙ try කරලා බලන්න.";
                } else if (response.status === 401 || response.status === 403 || data.error?.toLowerCase().includes("api key")) {
                    uiMessage = "API Key configuration error";
                } else if (data.error) {
                    uiMessage = data.error;
                }

                throw new Error(uiMessage);
            }

            const reply = data.reply?.trim() || "මචං, මට ඒකට හොඳ උත්තරයක් හදන්න බැරි වුණා. ආයෙ try කරලා බලන්න.";

            const assistantMessage: ChatMessage = {
                id: createId(),
                role: "assistant",
                content: reply,
            };

            setMessages((current) => [...current, assistantMessage]);
            speakReply(reply);
        } catch (error) {
            if (!(error instanceof Error && error.message === "Gemini free-tier quota reached for this key/project")) {
                console.error("ACTUAL GEMINI ERROR:", error);
            }

            const message = error instanceof Error ? error.message : "Unknown chat error";
            setMessages((current) => [
                ...current,
                {
                    id: createId(),
                    role: "assistant",
                    content: message === "API Key configuration error"
                        ? "API Key configuration error"
                        : message,
                },
            ]);
        } finally {
            setIsSending(false);
        }
    }

    return (
        <section className="relative overflow-hidden rounded-4xl border border-white/12 bg-[#0B192C]/90 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,101,0,0.14),transparent_45%)]" />

            <div className="relative flex flex-col">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-semibold text-white">AI-GALA Chat Companion</p>
                            <span className="rounded-full border border-[#FF6500]/20 bg-[#FF6500]/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.3em] text-[#FFB27A]">
                                AI-GALA
                            </span>
                        </div>
                        <p className="mt-1 text-xs text-white/55">{subtitle}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div
                            className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${isListening
                                ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-200"
                                : isSpeaking
                                    ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                                    : "border-white/10 bg-white/5 text-white/60"
                                }`}
                        >
                            <span className={`h-2 w-2 rounded-full ${isListening ? "bg-cyan-300" : isSpeaking ? "bg-emerald-300" : "bg-[#FF6500]"}`} />
                            {isListening ? "Recording" : isSpeaking ? "Speaking" : "Online"}
                        </div>

                        {onClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close chat"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition duration-300 hover:border-[#FF6500]/50 hover:bg-[#FF6500]/10 hover:text-white"
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
                        )}
                    </div>
                </div>

                <div className={`space-y-4 overflow-y-auto px-5 py-5 sm:px-6 ${variant === "hero" ? "min-h-105" : "min-h-90 max-h-[58vh]"}`}>
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`max-w-[88%] whitespace-pre-line rounded-[1.35rem] px-4 py-3 text-sm leading-6 shadow-[0_14px_30px_rgba(0,0,0,0.18)] ${message.role === "user"
                                    ? "rounded-br-md border border-[#FF6500]/20 bg-[#FF6500] text-white"
                                    : "rounded-bl-md border border-white/10 bg-white/6 text-white/88"
                                    }`}
                            >
                                {message.content}
                            </div>
                        </div>
                    ))}

                    {isSending && (
                        <div className="flex justify-start">
                            <ChatSkeleton />
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {messages.length <= 1 && (
                    <div className="flex flex-wrap gap-2 px-5 pb-1 sm:px-6">
                        {defaultChatSuggestionChips.map((chip) => (
                            <button
                                key={chip.label}
                                type="button"
                                disabled={isSending}
                                onClick={() => void submitMessage(chip.label)}
                                className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs text-white/70 transition duration-300 hover:border-[#FF6500]/50 hover:bg-[#FF6500]/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {chip.label}
                            </button>
                        ))}
                    </div>
                )}

                <form
                    className="border-t border-white/10 px-5 py-4 sm:px-6"
                    onSubmit={(event) => {
                        event.preventDefault();
                        void submitMessage();
                    }}
                >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                        <div className="flex-1 space-y-2">
                            <label className="block text-[11px] uppercase tracking-[0.35em] text-white/45">Type or speak</label>
                            <input
                                value={draft}
                                onChange={(event) => setDraft(event.target.value)}
                                aria-label="AI-GALA chat input"
                                placeholder="මචං, අද කුරුණෑගල open තියෙන තැනක් කියපන්..."
                                className="min-h-14 w-full rounded-2xl border border-white/10 bg-[#1E293B] px-4 text-base text-white outline-none placeholder:text-white/35 focus:border-[#FF6500]/60 focus:ring-2 focus:ring-[#FF6500]/20"
                            />
                            <div className="flex flex-wrap items-center gap-2 text-xs text-white/45">
                                <span>Supports Sinhala, Singlish, and English</span>
                                <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:inline-block" />
                                <span>{speechRecognitionSupported ? `Voice ready · ${recognitionLanguage}` : "Voice not supported in this browser"}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    if (!speechRecognitionSupported) {
                                        return;
                                    }

                                    if (isListening) {
                                        stopListening();
                                        return;
                                    }

                                    startListening();
                                }}
                                aria-label={isListening ? "Stop recording" : "Start recording"}
                                disabled={!speechRecognitionSupported || isSending}
                                className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${isListening
                                    ? "border-cyan-300/30 bg-cyan-400/15 text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.18)]"
                                    : "border-white/10 bg-white/5 text-white/80 hover:border-[#FF6500]/50 hover:bg-[#FF6500]/10 hover:text-white"
                                    }`}
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
                                    <path d="M12 18a4 4 0 0 0 4-4V8a4 4 0 0 0-8 0v6a4 4 0 0 0 4 4Z" />
                                    <path d="M19 11v1a7 7 0 0 1-14 0v-1" />
                                    <path d="M12 18v4" />
                                    <path d="M8 22h8" />
                                </svg>
                            </button>

                            <button
                                type="submit"
                                disabled={isSending || !draft.trim()}
                                aria-label="Send message"
                                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6500] text-white shadow-[0_0_24px_rgba(255,101,0,0.34)] transition duration-300 hover:scale-105 hover:shadow-[0_0_34px_rgba(255,101,0,0.6)] disabled:cursor-not-allowed disabled:opacity-50"
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
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3 text-xs text-white/45">
                        <span>Response is spoken automatically after Gemini replies.</span>
                        {isListening && (
                            <span className="inline-flex items-center gap-2 text-cyan-200">
                                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                                Recording...
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
}