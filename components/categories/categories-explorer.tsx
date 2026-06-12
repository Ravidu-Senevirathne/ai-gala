"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { useRevealOnScroll } from "@/components/landing/use-reveal-on-scroll";

export type CategoryWithStats = {
    id: string;
    name: string;
    icon: string;
    slug: string;
    totalShops: number;
    openShops: number;
};

type CategoriesExplorerProps = {
    categories: CategoryWithStats[];
    totalShops: number;
    totalOpen: number;
};

function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}

function ArrowRightIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
        </svg>
    );
}

export function CategoriesExplorer({ categories, totalShops, totalOpen }: CategoriesExplorerProps) {
    useRevealOnScroll();

    const [query, setQuery] = useState("");

    const filteredCategories = useMemo(() => {
        const term = query.trim().toLowerCase();
        if (!term) {
            return categories;
        }
        return categories.filter((category) => category.name.toLowerCase().includes(term));
    }, [categories, query]);

    return (
        <>
            <section className="mx-auto max-w-7xl px-4 pb-6 pt-12 sm:px-6 lg:px-8 lg:pt-16">
                <div data-reveal className="max-w-3xl">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/50">Categories</p>
                    <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                        Every Kurunegala business, sorted by what you need.
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
                        Pick a category to see live status, pricing, and contact details for every verified listing &mdash; from late-night
                        pharmacies to trusted repair shops.
                    </p>
                </div>

                <div data-reveal className="mt-8 grid gap-4 rounded-[1.75rem] border border-white/15 bg-white/5 p-6 backdrop-blur-md sm:grid-cols-3">
                    <div className="text-center sm:text-left">
                        <div className="bg-gradient-to-r from-white to-[#FFB27A] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
                            {categories.length}
                        </div>
                        <div className="mt-1 text-sm text-white/60">Service categories</div>
                    </div>
                    <div className="text-center sm:text-left">
                        <div className="bg-gradient-to-r from-white to-[#FFB27A] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
                            {totalShops}
                        </div>
                        <div className="mt-1 text-sm text-white/60">Active listings</div>
                    </div>
                    <div className="text-center sm:text-left">
                        <div className="bg-gradient-to-r from-white to-[#FFB27A] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
                            {totalOpen}
                        </div>
                        <div className="mt-1 text-sm text-white/60">Open right now</div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
                <div data-reveal className="relative max-w-md">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                        <SearchIcon />
                    </span>
                    <input
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search categories..."
                        aria-label="Search categories"
                        className="w-full rounded-full border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#FF6500]/50 focus:ring-2 focus:ring-[#FF6500]/20"
                    />
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:pb-20">
                {filteredCategories.length === 0 ? (
                    <div data-reveal className="rounded-[1.75rem] border border-white/10 bg-white/5 p-10 text-center text-white/60">
                        No categories match &ldquo;{query}&rdquo;.
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {filteredCategories.map((category, index) => (
                            <Link
                                key={category.id}
                                href={`/shops?category=${category.slug}`}
                                data-reveal
                                style={{ transitionDelay: `${index * 60}ms` }}
                                className="group relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/5 p-6 transition duration-300 hover:-translate-y-1.5 hover:border-[#FF6500]/35 hover:bg-white/10 hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)]"
                            >
                                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#FF6500]/10 blur-3xl transition duration-300 group-hover:bg-[#FF6500]/20" />

                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-[#07111f]/60 text-3xl transition duration-300 group-hover:shadow-[0_0_30px_rgba(255,101,0,0.22)]">
                                        {category.icon}
                                    </div>
                                    {category.openShops > 0 && (
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                            {category.openShops} open now
                                        </span>
                                    )}
                                </div>

                                <h3 className="mt-5 text-xl font-semibold text-white">{category.name}</h3>
                                <p className="mt-1.5 text-sm text-white/55">
                                    {category.totalShops} {category.totalShops === 1 ? "listing" : "listings"}
                                </p>

                                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#FFB27A] transition-all duration-300 group-hover:gap-3">
                                    Browse shops
                                    <ArrowRightIcon />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                <div data-reveal className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-white/15 bg-white/5 p-8 backdrop-blur-md sm:flex-row sm:items-center">
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-white/50">Not sure where to start?</p>
                        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Ask AI-GALA in Sinhala or English.</h2>
                        <p className="mt-2 max-w-xl text-white/65">
                            Tell our assistant what you need and we&apos;ll point you to the right shop, open right now.
                        </p>
                    </div>
                    <Link
                        href="/#home"
                        className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#FF6500] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(255,101,0,0.35)] transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,101,0,0.55)]"
                    >
                        Chat with AI-GALA
                    </Link>
                </div>
            </section>
        </>
    );
}
