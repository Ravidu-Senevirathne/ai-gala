import type { AssistantResponse } from "./types";

type HeroSectionProps = {
    promptValue: string;
    response: AssistantResponse;
    subtitle: string;
    quickPrompts: string[];
    onPromptChange: (value: string) => void;
    onPromptSubmit: () => void;
    onQuickPromptSelect: (value: string) => void;
};

export function HeroSection({
    promptValue,
    response,
    subtitle,
    quickPrompts,
    onPromptChange,
    onPromptSubmit,
    onQuickPromptSelect,
}: HeroSectionProps) {
    return (
        <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-28 lg:pt-24">
            <div className="space-y-8" data-reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70 backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-[#FF6500] shadow-[0_0_12px_rgba(255,101,0,0.7)]" />
                    Kurunegala, reimagined
                </div>

                <div className="space-y-5">
                    <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
                        Kurunegala&apos;s First AI-Powered Smart Directory
                    </h1>
                    <p className="max-w-2xl text-lg leading-8 text-white/75 sm:text-xl">
                        {subtitle}
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    {[
                        "Live business status",
                        "Sinhala + English AI",
                        "Fast local discovery",
                    ].map((item) => (
                        <div key={item} className="rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-sm text-white/75">
                            {item}
                        </div>
                    ))}
                </div>

                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        onPromptSubmit();
                    }}
                    className="rounded-[1.75rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/30 backdrop-blur-md"
                >
                    <label className="mb-3 block text-xs uppercase tracking-[0.35em] text-white/55">
                        Try the live directory assistant
                    </label>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                            value={promptValue}
                            onChange={(event) => onPromptChange(event.target.value)}
                            aria-label="Search or chat prompt"
                            className="min-h-14 flex-1 rounded-2xl border border-white/10 bg-[#07111f]/80 px-4 text-base text-white outline-none placeholder:text-white/35 focus:border-[#FF6500]/50 focus:ring-2 focus:ring-[#FF6500]/20"
                            placeholder="Type a local business request..."
                        />
                        <button
                            type="submit"
                            className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#FF6500] px-6 text-sm font-semibold text-white shadow-[0_0_24px_rgba(255,101,0,0.35)] transition duration-300 hover:scale-105 hover:shadow-[0_0_34px_rgba(255,101,0,0.6)]"
                        >
                            Ask AI-GALA
                        </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {quickPrompts.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => onQuickPromptSelect(item)}
                                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70 transition duration-300 hover:scale-105 hover:border-[#FF6500]/50 hover:bg-[#FF6500]/10 hover:text-white"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </form>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-md">
                        <div className="text-sm text-white/55">Live radius</div>
                        <div className="mt-2 text-2xl font-semibold text-white">1.5 km</div>
                    </div>
                    <div className="rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-md">
                        <div className="text-sm text-white/55">Verified listings</div>
                        <div className="mt-2 text-2xl font-semibold text-white">312</div>
                    </div>
                    <div className="rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-md">
                        <div className="text-sm text-white/55">Avg. response</div>
                        <div className="mt-2 text-2xl font-semibold text-white">&lt; 2s</div>
                    </div>
                </div>
            </div>

            <div className="relative flex items-center justify-center lg:justify-end" data-reveal>
                <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(255,101,0,0.15),transparent_55%)]" />
                <div className="float-gentle relative w-full max-w-xl rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-white/50">AI-GALA concierge</p>
                            <h2 className="mt-1 text-xl font-semibold text-white">Smart directory preview</h2>
                        </div>
                        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                            Live now
                        </div>
                    </div>

                    <div className="mt-5 space-y-4">
                        <div className="rounded-3xl rounded-tl-md border border-white/10 bg-[#07111f]/75 p-4 text-sm text-white/70">
                            {promptValue}
                        </div>
                        <div className="rounded-3xl rounded-tr-md border border-[#FF6500]/30 bg-[#FF6500]/10 p-4 text-sm text-white/85 shadow-[0_0_24px_rgba(255,101,0,0.12)]">
                            <div className="text-xs uppercase tracking-[0.3em] text-[#FFB27A]">{response.label}</div>
                            <p className="mt-2 leading-7 text-white/85">{response.headline}</p>
                            <p className="mt-2 leading-7 text-white/72">{response.details}</p>
                        </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {[
                            "Open pharmacies",
                            "Nearby cafes",
                            "Repair shops",
                            "Late-night delivery",
                        ].map((item) => (
                            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
