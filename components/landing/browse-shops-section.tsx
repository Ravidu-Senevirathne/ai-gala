import type { ShopCard } from "./types";

type BrowseShopsSectionProps = {
    browseShops: ShopCard[];
};

export function BrowseShopsSection({ browseShops }: BrowseShopsSectionProps) {
    return (
        <section id="browse-shops" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div data-reveal className="rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-md">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/50">Browse Shops</p>
                    <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Browse local businesses that feel active, current, and relevant.</h2>
                    <p className="mt-4 max-w-xl leading-7 text-white/70">AI-GALA surfaces live shop status, quick context, and useful actions so local discovery never feels static.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    {browseShops.map((shop, index) => (
                        <article
                            key={shop.name}
                            data-reveal
                            style={{ transitionDelay: `${index * 90}ms` }}
                            className="rounded-[1.5rem] border border-white/15 bg-[#07111f]/75 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#FF6500]/35 hover:shadow-[0_20px_45px_rgba(0,0,0,0.26)]"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <span className="h-3 w-3 rounded-full bg-[#FF6500] shadow-[0_0_12px_rgba(255,101,0,0.8)]" />
                                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">{shop.status}</span>
                            </div>
                            <h3 className="mt-5 text-lg font-semibold text-white">{shop.name}</h3>
                            <p className="mt-2 text-sm leading-6 text-white/65">{shop.note}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
