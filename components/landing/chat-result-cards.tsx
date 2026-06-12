import Link from "next/link";

import { GetDirectionsButton } from "@/components/shared/get-directions-button";
import type { JobResult, ShopResult } from "@/lib/ai/types";

const STATUS_STYLES: Record<ShopResult["status"], string> = {
    open: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    busy: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    closed: "border-red-400/30 bg-red-400/10 text-red-300",
};

function formatPriceRange(min: number | null, max: number | null) {
    if (min === null && max === null) {
        return null;
    }
    if (min !== null && max !== null) {
        return `Rs. ${min.toLocaleString()} - ${max.toLocaleString()}`;
    }
    const value = min ?? max;
    return `Rs. ${value!.toLocaleString()}`;
}

function ShopResultCard({ shop }: { shop: ShopResult }) {
    const priceLabel = formatPriceRange(shop.priceRangeMin, shop.priceRangeMax);

    return (
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <Link href={`/shops/${shop.id}`} className="text-sm font-semibold text-white hover:text-[#FFB27A]">
                        {shop.name}
                    </Link>
                    {shop.category && <p className="mt-0.5 text-xs text-white/50">{shop.category}</p>}
                </div>
                <span className={`shrink-0 rounded-full border px-2.5 py-1 text-xs capitalize ${STATUS_STYLES[shop.status]}`}>
                    {shop.status}
                </span>
            </div>

            {shop.address && <p className="text-xs text-white/60">{shop.address}</p>}

            <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                {priceLabel && <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">{priceLabel}</span>}
                {shop.distanceKm !== null && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">{shop.distanceKm.toFixed(1)} km away</span>
                )}
            </div>

            <div className="flex items-center gap-2 pt-1">
                <Link
                    href={`/shops/${shop.id}`}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 transition hover:border-[#FF6500]/40 hover:text-white"
                >
                    View details
                </Link>
                {shop.lat !== null && shop.lng !== null && <GetDirectionsButton lat={shop.lat} lng={shop.lng} />}
            </div>
        </div>
    );
}

function JobResultCard({ job }: { job: JobResult }) {
    const salaryLabel = formatPriceRange(job.salaryMin, job.salaryMax);

    return (
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div>
                <Link href={`/jobs/${job.id}`} className="text-sm font-semibold text-white hover:text-[#FFB27A]">
                    {job.title}
                </Link>
                <p className="mt-0.5 text-xs text-white/50">
                    {job.field}
                    {job.shopName ? ` · ${job.shopName}` : ""}
                </p>
            </div>

            {salaryLabel && (
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/60">
                    {salaryLabel} / month
                </span>
            )}

            <div className="pt-1">
                <Link
                    href={`/jobs/${job.id}`}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 transition hover:border-[#FF6500]/40 hover:text-white"
                >
                    View details
                </Link>
            </div>
        </div>
    );
}

type ChatResultCardsProps = {
    results: ShopResult[] | JobResult[];
    resultType: "shop" | "job";
};

export function ChatResultCards({ results, resultType }: ChatResultCardsProps) {
    if (results.length === 0) {
        return null;
    }

    return (
        <div className="flex max-w-[92%] flex-col gap-3 self-start">
            {resultType === "shop"
                ? (results as ShopResult[]).map((shop) => <ShopResultCard key={shop.id} shop={shop} />)
                : (results as JobResult[]).map((job) => <JobResultCard key={job.id} job={job} />)}
        </div>
    );
}
