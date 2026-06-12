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
                        className="group rounded-[1.5rem] border border-white/15 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#FF6500]/35 hover:bg-white/10 hover:shadow-[0_20px_45px_rgba(0,0,0,0.26)]"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-[#07111f]/60 text-2xl transition duration-300 group-hover:shadow-[0_0_28px_rgba(255,101,0,0.2)]">
                            {category.icon}
                        </div>
                        <h3 className="mt-5 text-lg font-semibold text-white">{category.name}</h3>
                        <p className="mt-2 text-sm text-white/55">{category.count}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
