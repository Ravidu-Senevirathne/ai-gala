import { haversineDistanceKm } from "@/lib/geo/haversine";
import { createAdminClient } from "@/lib/supabase/admin";

import type { JobResult, SearchDirectoryInput, ShopResult } from "./types";

const DEFAULT_DISTRICT = process.env.NEXT_PUBLIC_DEFAULT_DISTRICT ?? "Kurunegala";
const MAX_RESULTS = 8;

function normalize(value: string) {
    return value.trim().toLowerCase();
}

function textMatchesCategory(category: string, ...fields: (string | null | undefined)[]) {
    const needle = normalize(category);
    const words = needle.split(/\s+/).filter(Boolean);

    return fields.some((field) => {
        if (!field) {
            return false;
        }
        const haystack = normalize(field);
        return haystack.includes(needle) || words.some((word) => haystack.includes(word));
    });
}

function priceRangesOverlap(
    shopMin: number | null,
    shopMax: number | null,
    budgetMin?: number,
    budgetMax?: number,
) {
    if (budgetMin === undefined && budgetMax === undefined) {
        return true;
    }

    const lowerBound = budgetMin ?? 0;
    const upperBound = budgetMax ?? Number.MAX_SAFE_INTEGER;

    const shopLower = shopMin ?? 0;
    const shopUpper = shopMax ?? Number.MAX_SAFE_INTEGER;

    return shopLower <= upperBound && shopUpper >= lowerBound;
}

async function searchShops(input: SearchDirectoryInput): Promise<ShopResult[]> {
    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from("shops")
        .select("*, categories(name, slug)")
        .eq("is_active", true)
        .eq("district", DEFAULT_DISTRICT);

    if (error || !data) {
        return [];
    }

    let results: ShopResult[] = data
        .filter((shop) => {
            if (input.category) {
                const category = shop.categories as { name: string; slug: string } | null;
                if (!textMatchesCategory(input.category, category?.name, category?.slug, shop.name, shop.description)) {
                    return false;
                }
            }

            return priceRangesOverlap(shop.price_range_min, shop.price_range_max, input.budget_min, input.budget_max);
        })
        .map((shop) => {
            const category = shop.categories as { name: string; slug: string } | null;
            let distanceKm: number | null = null;

            if (input.user_lat !== undefined && input.user_lng !== undefined && shop.lat !== null && shop.lng !== null) {
                distanceKm = haversineDistanceKm(input.user_lat, input.user_lng, shop.lat, shop.lng);
            }

            return {
                type: "shop" as const,
                id: shop.id,
                name: shop.name,
                category: category?.name ?? null,
                status: shop.status,
                address: shop.address,
                district: shop.district,
                priceRangeMin: shop.price_range_min,
                priceRangeMax: shop.price_range_max,
                distanceKm,
                lat: shop.lat,
                lng: shop.lng,
                phone: shop.phone,
                description: shop.description,
            };
        });

    if (input.max_distance_km !== undefined) {
        results = results.filter((shop) => shop.distanceKm === null || shop.distanceKm <= input.max_distance_km!);
    }

    results.sort((a, b) => {
        if (a.distanceKm === null && b.distanceKm === null) return 0;
        if (a.distanceKm === null) return 1;
        if (b.distanceKm === null) return -1;
        return a.distanceKm - b.distanceKm;
    });

    return results.slice(0, MAX_RESULTS);
}

async function searchJobs(input: SearchDirectoryInput): Promise<JobResult[]> {
    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from("jobs")
        .select("*, shops(name)")
        .eq("is_active", true)
        .eq("district", DEFAULT_DISTRICT);

    if (error || !data) {
        return [];
    }

    const results: JobResult[] = data
        .filter((job) => {
            if (input.category && !textMatchesCategory(input.category, job.field, job.title, job.description)) {
                return false;
            }

            return priceRangesOverlap(job.salary_min, job.salary_max, input.budget_min, input.budget_max);
        })
        .map((job) => {
            const shop = job.shops as { name: string } | null;

            return {
                type: "job" as const,
                id: job.id,
                title: job.title,
                field: job.field,
                district: job.district,
                salaryMin: job.salary_min,
                salaryMax: job.salary_max,
                description: job.description,
                requirements: job.requirements,
                shopName: shop?.name ?? null,
            };
        });

    return results.slice(0, MAX_RESULTS);
}

export async function searchDirectory(input: SearchDirectoryInput): Promise<ShopResult[] | JobResult[]> {
    if (input.intent === "job") {
        return searchJobs(input);
    }

    return searchShops(input);
}
