import type { StepCard } from "./types";

type HowItWorksSectionProps = {
    userSteps: StepCard[];
    ownerSteps: StepCard[];
};

export function HowItWorksSection({ userSteps, ownerSteps }: HowItWorksSectionProps) {
    return (
        <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            <div className="max-w-2xl" data-reveal>
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">How it works</p>
                <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">A smooth flow for customers and shop owners.</h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
                <article data-reveal className="rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-md">
                    <div className="mb-6 inline-flex rounded-full border border-[#FF6500]/30 bg-[#FF6500]/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#FFB27A]">
                        For users
                    </div>
                    <div className="space-y-5">
                        {userSteps.map((step, index) => (
                            <div key={step.title} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FF6500]/35 bg-[#FF6500]/15 text-sm font-semibold text-white shadow-[0_0_24px_rgba(255,101,0,0.15)]">
                                        0{index + 1}
                                    </div>
                                    {index !== userSteps.length - 1 ? (
                                        <div className="my-2 h-full w-px flex-1 bg-gradient-to-b from-[#FF6500]/50 to-transparent" />
                                    ) : null}
                                </div>
                                <div className="pb-5">
                                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                                    <p className="mt-2 leading-7 text-white/70">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>

                <article data-reveal className="rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-md">
                    <div className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/60">
                        For shop owners
                    </div>
                    <div className="space-y-5">
                        {ownerSteps.map((step, index) => (
                            <div key={step.title} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-semibold text-white">
                                        0{index + 1}
                                    </div>
                                    {index !== ownerSteps.length - 1 ? (
                                        <div className="my-2 h-full w-px flex-1 bg-gradient-to-b from-white/25 to-transparent" />
                                    ) : null}
                                </div>
                                <div className="pb-5">
                                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                                    <p className="mt-2 leading-7 text-white/70">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            </div>
        </section>
    );
}
