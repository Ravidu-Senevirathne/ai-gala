import Link from "next/link";

import type { CategoryCard } from "./types";

type CategoriesSectionProps = {
    categories: CategoryCard[];
};

function ArrowRightIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
        </svg>
    );
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
    return (
        <section id="categories" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6" data-reveal>
                <div className="max-w-2xl">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/50">Categories</p>
                    <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Whatever you need, just ask.</h2>
                    <p className="mt-4 leading-7 text-white/70">
                        From medicine to dinner to a quick repair, AI-GALA understands what you&apos;re looking for and points you to the right place in Kurunegala.
                    </p>
                </div>
                <Link
                    href="/categories"
                    className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 transition duration-300 hover:border-[#FF6500]/40 hover:text-white"
                >
                    View all categories
                    <ArrowRightIcon />
                </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((category, index) => (
                    <article
                        key={category.name}
                        data-reveal
                        style={{ transitionDelay: `${index * 70}ms` }}
                        className="group relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/15 transition duration-300 hover:-translate-y-1 hover:border-[#FF6500]/40 hover:shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={category.image}
                            alt={category.name}
                            className="absolute inset-0 h-full w-full scale-105 object-cover transition duration-500 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/55 to-[#07111f]/5 transition duration-300 group-hover:from-[#07111f]/95 group-hover:via-[#07111f]/45" />

                        <div className="relative flex h-full flex-col justify-between p-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-sm backdrop-blur-md transition duration-300 group-hover:border-[#FF6500]/50 group-hover:bg-[#FF6500]/20">
                                {category.icon}
                            </div>
                            <div className="flex items-end justify-between gap-2">
                                <h3 className="text-base font-semibold leading-snug text-white drop-shadow-sm">{category.name}</h3>
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:bg-[#FF6500] group-hover:border-[#FF6500] translate-x-1">
                                    <ArrowRightIcon />
                                </span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
