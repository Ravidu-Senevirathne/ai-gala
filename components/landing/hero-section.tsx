"use client";

import { AiGalaChatInterface } from "./ai-gala-chat-interface";

type HeroSectionProps = {
    subtitle: string;
};

export function HeroSection({ subtitle }: HeroSectionProps) {
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
                    <p className="max-w-2xl text-lg leading-8 text-white/75 sm:text-xl">{subtitle}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    {["Live business status", "Sinhala + English AI", "Fast local discovery"].map((item) => (
                        <div key={item} className="rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-sm text-white/75">
                            {item}
                        </div>
                    ))}
                </div>

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
                <div className="absolute inset-0 rounded-4xl bg-[radial-gradient(circle_at_top,rgba(255,101,0,0.15),transparent_55%)]" />
                <div className="float-gentle relative w-full max-w-xl">
                    <AiGalaChatInterface variant="hero" />
                </div>
            </div>
        </section>
    );
}
