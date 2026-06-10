import type { MarqueeDeal } from "./types";

type LiveDiscountsMarqueeProps = {
    discounts?: MarqueeDeal[];
};

export function LiveDiscountsMarquee({ discounts = [] }: LiveDiscountsMarqueeProps) {
    const items = [...discounts, ...discounts];

    return (
        <section aria-label="Live discounts" className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center justify-between gap-4" data-reveal>
                <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/45">Live discounts</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Trending local offers moving in real time.</h2>
                </div>
                <div className="hidden rounded-full border border-[#FF6500]/25 bg-[#FF6500]/10 px-4 py-2 text-xs tracking-[0.3em] text-[#FFB27A] sm:inline-flex">
                    Hover to pause
                </div>
            </div>

            <div className="group overflow-hidden rounded-[2rem] border border-white/15 bg-[#07111f]/85 shadow-[0_24px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl" data-reveal>
                <div className="marquee-track flex w-max gap-4 px-4 py-5 group-hover:[animation-play-state:paused]">
                    {items.map((item, index) => (
                        <article
                            key={`${item.brand}-${index}`}
                            className="min-w-[280px] rounded-[1.5rem] border border-[#FF6500]/20 bg-[#1E293B] p-5 text-white shadow-[0_12px_30px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-1 hover:border-[#FF6500]/40 hover:shadow-[0_18px_40px_rgba(255,101,0,0.12)]"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-semibold tracking-[0.08em] text-white">{item.brand}</span>
                                <span className="h-2.5 w-2.5 rounded-full bg-[#FF6500] shadow-[0_0_14px_rgba(255,101,0,0.75)]" />
                            </div>
                            <h3 className="mt-5 text-xl font-semibold text-white">{item.offer}</h3>
                            <p className="mt-2 text-sm font-medium uppercase tracking-[0.3em] text-[#FFB27A]/90">{item.title}</p>
                            <p className="mt-3 text-sm leading-6 text-white/68">{item.meta}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
