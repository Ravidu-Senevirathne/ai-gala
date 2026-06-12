"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { useRevealOnScroll } from "@/components/landing/use-reveal-on-scroll";
import { GetDirectionsButton } from "@/components/shared/get-directions-button";
import type { Database, ShopStatus } from "@/lib/supabase/types";

type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];

export type ShopWithCategory = Database["public"]["Tables"]["shops"]["Row"] & {
    categories: { name: string; icon: string; slug: string } | null;
};

type ShopsDirectoryProps = {
    shops: ShopWithCategory[];
    categories: CategoryRow[];
    initialCategorySlug?: string;
};

const STATUS_STYLES: Record<ShopStatus, string> = {
    open: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    busy: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    closed: "border-red-400/30 bg-red-400/10 text-red-300",
};

const STATUS_DOT: Record<ShopStatus, string> = {
    open: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
    busy: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
    closed: "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]",
};

const STATUS_FILTERS: { label: string; value: ShopStatus | "all" }[] = [
    { label: "All statuses", value: "all" },
    { label: "Open now", value: "open" },
    { label: "Busy", value: "busy" },
    { label: "Closed", value: "closed" },
];

function formatPriceRange(min: number | null, max: number | null) {
    if (min === null && max === null) {
        return "Pricing not listed";
    }
    if (min !== null && max !== null) {
        return `Rs. ${min.toLocaleString()} - ${max.toLocaleString()}`;
    }
    const value = min ?? max;
    return `Rs. ${value!.toLocaleString()}`;
}

function chipClass(active: boolean) {
    return `inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition duration-300 ${
        active
            ? "border-[#FF6500]/50 bg-[#FF6500]/15 text-white shadow-[0_0_18px_rgba(255,101,0,0.25)]"
            : "border-white/10 bg-white/5 text-white/65 hover:border-white/25 hover:text-white"
    }`;
}

function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}

function XIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="M6 6l12 12" />
        </svg>
    );
}

function ArrowLeftIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5" />
            <path d="M11 18l-6-6 6-6" />
        </svg>
    );
}

function ShopCard({ shop, index }: { shop: ShopWithCategory; index: number }) {
    const category = shop.categories;

    return (
        <article
            data-reveal
            style={{ transitionDelay: `${(index % 6) * 60}ms` }}
            className="group flex flex-col rounded-[1.75rem] border border-white/15 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#FF6500]/35 hover:bg-white/10 hover:shadow-[0_20px_45px_rgba(0,0,0,0.28)]"
        >
            <div className="flex items-start justify-between gap-3">
                {category ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60">
                        <span>{category.icon}</span> {category.name}
                    </span>
                ) : (
                    <span />
                )}
                <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize ${STATUS_STYLES[shop.status]}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[shop.status]}`} />
                    {shop.status}
                </span>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-white">{shop.name}</h3>
            {shop.address && <p className="mt-1 text-sm text-white/55">{shop.address}</p>}
            {shop.description && <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/65">{shop.description}</p>}

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/60">
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">{formatPriceRange(shop.price_range_min, shop.price_range_max)}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">{shop.district}</span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 pt-1">
                <Link
                    href={`/shops/${shop.id}`}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 transition hover:border-[#FF6500]/40 hover:text-white"
                >
                    View details
                </Link>
                {shop.lat !== null && shop.lng !== null && <GetDirectionsButton lat={shop.lat} lng={shop.lng} />}
                {shop.phone && (
                    <a
                        href={`tel:${shop.phone}`}
                        className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 transition hover:border-[#FF6500]/40 hover:text-white"
                    >
                        Call
                    </a>
                )}
            </div>
        </article>
    );
}

export function ShopsDirectory({ shops, categories, initialCategorySlug }: ShopsDirectoryProps) {
    useRevealOnScroll();

    const [query, setQuery] = useState("");
    const [categorySlug, setCategorySlug] = useState<string>(initialCategorySlug ?? "all");
    const [status, setStatus] = useState<ShopStatus | "all">("all");

    const activeCategory = categories.find((category) => category.slug === categorySlug);

    const categoryShops = useMemo(
        () => (categorySlug === "all" ? shops : shops.filter((shop) => shop.categories?.slug === categorySlug)),
        [shops, categorySlug]
    );
    const categoryOpenCount = useMemo(
        () => categoryShops.filter((shop) => shop.status === "open").length,
        [categoryShops]
    );

    const filteredShops = useMemo(() => {
        const term = query.trim().toLowerCase();
        return shops.filter((shop) => {
            if (categorySlug !== "all" && shop.categories?.slug !== categorySlug) {
                return false;
            }
            if (status !== "all" && shop.status !== status) {
                return false;
            }
            if (term) {
                const haystack = `${shop.name} ${shop.address ?? ""} ${shop.description ?? ""}`.toLowerCase();
                if (!haystack.includes(term)) {
                    return false;
                }
            }
            return true;
        });
    }, [shops, query, categorySlug, status]);

    const hasActiveFilters = query !== "" || categorySlug !== "all" || status !== "all";

    function clearFilters() {
        setQuery("");
        setCategorySlug("all");
        setStatus("all");
    }

    return (
        <>
            <section className="mx-auto max-w-7xl px-4 pb-6 pt-12 sm:px-6 lg:px-8 lg:pt-16">
                <div data-reveal className="max-w-3xl">
                    {activeCategory && (
                        <Link href="/categories" className="mb-4 inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white">
                            <ArrowLeftIcon />
                            All categories
                        </Link>
                    )}
                    <p className="text-xs uppercase tracking-[0.35em] text-white/50">Browse Shops</p>
                    <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                        {activeCategory ? (
                            <>
                                {activeCategory.icon} {activeCategory.name} in Kurunegala
                            </>
                        ) : (
                            "Every local business, live and searchable."
                        )}
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
                        Real-time status, pricing, and contact details for {categoryShops.length} active listing{categoryShops.length === 1 ? "" : "s"}{" "}
                        {activeCategory ? `in ${activeCategory.name}` : "across Kurunegala"} &mdash; {categoryOpenCount} open right now.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
                <div data-reveal className="space-y-4 rounded-[1.75rem] border border-white/15 bg-white/5 p-5 backdrop-blur-md sm:p-6">
                    <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                            <SearchIcon />
                        </span>
                        <input
                            type="text"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search by name, address, or description..."
                            aria-label="Search shops"
                            className="w-full rounded-full border border-white/15 bg-[#07111f]/60 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#FF6500]/50 focus:ring-2 focus:ring-[#FF6500]/20"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => setCategorySlug("all")} aria-pressed={categorySlug === "all"} className={chipClass(categorySlug === "all")}>
                            All categories
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                type="button"
                                onClick={() => setCategorySlug(category.slug)}
                                aria-pressed={categorySlug === category.slug}
                                className={chipClass(categorySlug === category.slug)}
                            >
                                <span>{category.icon}</span> {category.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
                        {STATUS_FILTERS.map((filter) => (
                            <button
                                key={filter.value}
                                type="button"
                                onClick={() => setStatus(filter.value)}
                                aria-pressed={status === filter.value}
                                className={chipClass(status === filter.value)}
                            >
                                {filter.label}
                            </button>
                        ))}

                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-white/50 transition hover:text-white"
                            >
                                <XIcon />
                                Clear filters
                            </button>
                        )}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-2 sm:px-6 lg:px-8">
                <p data-reveal className="text-sm text-white/55">
                    Showing <span className="font-medium text-white">{filteredShops.length}</span> of {shops.length} shops
                </p>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:pb-20">
                {filteredShops.length === 0 ? (
                    <div data-reveal className="space-y-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-10 text-center text-white/60">
                        <p>No shops match your filters right now.</p>
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 transition hover:border-[#FF6500]/40 hover:text-white"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredShops.map((shop, index) => (
                            <ShopCard key={shop.id} shop={shop} index={index} />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}
