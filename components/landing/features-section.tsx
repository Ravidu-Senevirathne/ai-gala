import type { FeatureCard } from "./types";

type FeaturesSectionProps = {
    featureCards: FeatureCard[];
};

export function FeaturesSection({ featureCards }: FeaturesSectionProps) {
    return (
        <section id="features" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            <div className="mb-8 max-w-2xl" data-reveal>
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">Features</p>
                <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Built for fast decisions and local trust.</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
                {featureCards.map((feature, index) => (
                    <article
                        key={feature.title}
                        data-reveal
                        style={{ transitionDelay: `${index * 90}ms` }}
                        className="group rounded-[1.75rem] border border-white/20 bg-white/10 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-[#FF6500]/35 hover:bg-white/15"
                    >
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-sm font-semibold text-[#FFB27A] transition duration-300 group-hover:shadow-[0_0_28px_rgba(255,101,0,0.25)]">
                            0{index + 1}
                        </div>
                        <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
                        <p className="mt-4 leading-7 text-white/70">{feature.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
