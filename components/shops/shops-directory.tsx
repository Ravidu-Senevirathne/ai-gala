"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { useRevealOnScroll } from "@/components/landing/use-reveal-on-scroll";
import { GetDirectionsButton } from "@/components/shared/get-directions-button";
import { parseSocialLinks } from "@/lib/social-links";
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

function NavigationIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
    );
}

function PhoneIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    );
}

function WhatsAppIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M12.012 2c-5.523 0-10 4.477-10 10 0 1.821.487 3.53 1.34 5.003L2 22l5.084-1.333A9.96 9.96 0 0 0 12.012 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.182a8.16 8.16 0 0 1-4.166-1.142l-.298-.176-3.087.81.823-3.012-.193-.31A8.158 8.158 0 0 1 3.83 12c0-4.512 3.67-8.182 8.182-8.182S20.194 7.488 20.194 12s-3.67 8.182-8.182 8.182z" />
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.732-.867-2.862-1.546-4.001-3.504-.302-.521.302-.484.864-1.61.099-.198.05-.371-.05-.52-.099-.149-.669-1.612-.916-2.207-.241-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.052 3.133 4.974 4.27 2.92 1.137 2.92.759 3.667.71.745-.05 2.424-.989 2.769-1.946.347-.957.347-1.778.247-1.945-.1-.165-.371-.264-.668-.404z" />
        </svg>
    );
}

function GlobeIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );
}

const ICON_BUTTON_BASE =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition duration-300 hover:scale-110";

const ICON_BUTTON_ACCENT: Record<"orange" | "green" | "blue", string> = {
    orange: "hover:border-[#FF6500]/40 hover:bg-[#FF6500]/10 hover:text-[#FFB27A]",
    green: "hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-300",
    blue: "hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-sky-300",
};

function IconLinkButton({
    href,
    label,
    icon,
    accent,
    external,
}: {
    href: string;
    label: string;
    icon: React.ReactNode;
    accent: "orange" | "green" | "blue";
    external?: boolean;
}) {
    return (
        <a
            href={href}
            title={label}
            aria-label={label}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer noopener" : undefined}
            className={`${ICON_BUTTON_BASE} ${ICON_BUTTON_ACCENT[accent]}`}
        >
            {icon}
        </a>
    );
}

function ShopCard({ shop, index }: { shop: ShopWithCategory; index: number }) {
    const category = shop.categories;
    const socialLinks = parseSocialLinks(shop.social_links);
    const hasMapDirections = Boolean(shop.google_location_url) || (shop.lat !== null && shop.lng !== null);
    const hasContactActions = hasMapDirections || Boolean(shop.phone) || Boolean(socialLinks.whatsapp) || Boolean(socialLinks.website);

    return (
        <article
            data-reveal
            style={{ transitionDelay: `${(index % 6) * 60}ms` }}
            className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/5 transition duration-300 hover:-translate-y-1 hover:border-[#FF6500]/35 hover:bg-white/10 hover:shadow-[0_20px_45px_rgba(0,0,0,0.28)]"
        >
            {shop.cover_image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={shop.cover_image_url} alt={shop.name} className="h-36 w-full object-cover" />
            )}

            <div className="flex flex-1 flex-col p-5">
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

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/60">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">{formatPriceRange(shop.price_range_min, shop.price_range_max)}</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">{shop.district}</span>
                    {shop.google_rating !== null && (
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                            ⭐ {shop.google_rating}
                            {shop.google_review_count !== null && ` (${shop.google_review_count.toLocaleString()})`}
                        </span>
                    )}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-end gap-3 pt-1">
                    {hasContactActions && (
                        <div className="flex items-center gap-2">
                            {shop.google_location_url ? (
                                <IconLinkButton href={shop.google_location_url} label="Get directions" icon={<NavigationIcon />} accent="orange" external />
                            ) : (
                                shop.lat !== null && shop.lng !== null && <GetDirectionsButton lat={shop.lat} lng={shop.lng} iconOnly />
                            )}
                            {shop.phone && <IconLinkButton href={`tel:${shop.phone}`} label="Call shop" icon={<PhoneIcon />} accent="orange" />}
                            {socialLinks.whatsapp && (
                                <IconLinkButton href={socialLinks.whatsapp} label="Chat on WhatsApp" icon={<WhatsAppIcon />} accent="green" external />
                            )}
                            {socialLinks.website && <IconLinkButton href={socialLinks.website} label="Visit website" icon={<GlobeIcon />} accent="blue" external />}
                        </div>
                    )}
                </div>
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
