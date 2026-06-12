import type { ShopStatus } from "@/lib/supabase/types";

export type ChatRole = "user" | "assistant";

export type ChatApiMessage = {
    role: ChatRole;
    content: string;
};

export type UserLocation = {
    lat: number;
    lng: number;
};

export type ChatApiRequest = {
    messages: ChatApiMessage[];
    userLocation: UserLocation | null;
    localTime: string;
};

export type SearchDirectoryInput = {
    intent: "shop" | "job";
    category?: string;
    max_distance_km?: number;
    budget_min?: number;
    budget_max?: number;
    user_lat?: number;
    user_lng?: number;
};

export type ShopResult = {
    type: "shop";
    id: string;
    name: string;
    category: string | null;
    status: ShopStatus;
    address: string | null;
    district: string;
    priceRangeMin: number | null;
    priceRangeMax: number | null;
    distanceKm: number | null;
    lat: number | null;
    lng: number | null;
    phone: string | null;
    description: string | null;
};

export type JobResult = {
    type: "job";
    id: string;
    title: string;
    field: string;
    district: string;
    salaryMin: number | null;
    salaryMax: number | null;
    description: string | null;
    requirements: string | null;
    shopName: string | null;
};

export type ChatApiResponse = {
    reply: string;
    results?: ShopResult[] | JobResult[];
    resultType?: "shop" | "job";
};
