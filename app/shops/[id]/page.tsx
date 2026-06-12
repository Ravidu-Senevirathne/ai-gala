import Link from "next/link";
import { notFound } from "next/navigation";

import { DetailPageHeader } from "@/components/shared/detail-page-header";
import { GetDirectionsButton } from "@/components/shared/get-directions-button";
import { createClient } from "@/lib/supabase/server";
import type { ShopStatus } from "@/lib/supabase/types";

const STATUS_STYLES: Record<ShopStatus, string> = {
    open: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    busy: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    closed: "border-red-400/30 bg-red-400/10 text-red-300",
};

const DAY_LABELS: Record<string, string> = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
};

const DAY_ORDER = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

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

type ShopPageProps = {
    params: Promise<{ id: string }>;
};

export default async function ShopPage({ params }: ShopPageProps) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: shop } = await supabase
        .from("shops")
        .select("*, categories(name, icon, slug)")
        .eq("id", id)
        .eq("is_active", true)
        .single();

    if (!shop) {
        notFound();
    }

    const { data: discounts } = await supabase
        .from("discounts")
        .select("*")
        .eq("shop_id", id)
        .eq("is_active", true);

    const category = shop.categories as { name: string; icon: string; slug: string } | null;
    const hours = (shop.hours ?? null) as Record<string, string> | null;

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#0B192C] text-[#F1F1F1]">
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-[#FF6500]/20 blur-3xl" />
                <div className="absolute right-[-7rem] top-20 h-80 w-80 rounded-full bg-cyan-400/12 blur-3xl" />
            </div>

            <DetailPageHeader />

            <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="space-y-6 rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            {category && (
                                <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                                    {category.icon} {category.name}
                                </p>
                            )}
                            <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{shop.name}</h1>
                            <p className="mt-1 text-sm text-white/50">{shop.district} District</p>
                        </div>
                        <span className={`shrink-0 rounded-full border px-3 py-1.5 text-sm capitalize ${STATUS_STYLES[shop.status]}`}>
                            {shop.status}
                        </span>
                    </div>

                    {shop.description && <p className="text-sm leading-7 text-white/75">{shop.description}</p>}

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/45">Address</p>
                            <p className="mt-2 text-sm text-white/80">{shop.address ?? "Not provided"}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/45">Price range</p>
                            <p className="mt-2 text-sm text-white/80">{formatPriceRange(shop.price_range_min, shop.price_range_max)}</p>
                        </div>
                        {shop.phone && (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-xs uppercase tracking-[0.3em] text-white/45">Phone</p>
                                <a href={`tel:${shop.phone}`} className="mt-2 inline-block text-sm text-[#FFB27A] hover:text-white">
                                    {shop.phone}
                                </a>
                            </div>
                        )}
                        {hours && (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-xs uppercase tracking-[0.3em] text-white/45">Hours</p>
                                <ul className="mt-2 space-y-1 text-sm text-white/70">
                                    {DAY_ORDER.filter((day) => hours[day]).map((day) => (
                                        <li key={day} className="flex justify-between gap-4">
                                            <span>{DAY_LABELS[day]}</span>
                                            <span>{hours[day]}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {discounts && discounts.length > 0 && (
                        <div className="space-y-3">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/45">Live discounts</p>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {discounts.map((discount) => (
                                    <div key={discount.id} className="rounded-2xl border border-[#FF6500]/25 bg-[#FF6500]/10 p-4">
                                        <p className="text-sm font-semibold text-white">{discount.title}</p>
                                        <p className="mt-1 text-sm text-[#FFB27A]">{discount.offer}</p>
                                        {discount.meta && <p className="mt-1 text-xs text-white/55">{discount.meta}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        {shop.lat !== null && shop.lng !== null && <GetDirectionsButton lat={shop.lat} lng={shop.lng} />}
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 transition hover:border-[#FF6500]/40 hover:text-white"
                        >
                            Back to AI-GALA
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
