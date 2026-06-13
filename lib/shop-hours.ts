import type { Json, ShopStatus } from "@/lib/supabase/types";

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export type DayHours = { closed: boolean; open: string; close: string };

export const DAY_ORDER: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export const DAY_LABELS: Record<DayKey, string> = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
};

export const DEFAULT_DAY_HOURS: DayHours = { closed: false, open: "09:00", close: "18:00" };

export function defaultHours(): Record<DayKey, DayHours> {
    return DAY_ORDER.reduce((acc, day) => {
        acc[day] = { ...DEFAULT_DAY_HOURS };
        return acc;
    }, {} as Record<DayKey, DayHours>);
}

export function parseHours(value: Json | null): Record<DayKey, DayHours> {
    const result = defaultHours();

    if (value && typeof value === "object" && !Array.isArray(value)) {
        for (const day of DAY_ORDER) {
            const raw = (value as Record<string, Json | undefined>)[day];
            if (typeof raw !== "string") {
                continue;
            }
            if (raw.toLowerCase() === "closed") {
                result[day] = { ...result[day], closed: true };
                continue;
            }
            const [open, close] = raw.split("-").map((part) => part.trim());
            if (open && close) {
                result[day] = { closed: false, open, close };
            }
        }
    }

    return result;
}

export function serializeHours(hours: Record<DayKey, DayHours>): Record<string, string> {
    const result: Record<string, string> = {};
    for (const day of DAY_ORDER) {
        const entry = hours[day];
        result[day] = entry.closed ? "closed" : `${entry.open}-${entry.close}`;
    }
    return result;
}

export function slugify(value: string) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-+|-+$)/g, "");
}

// Shops operate on Sri Lanka time regardless of where the server runs.
const SHOP_TIME_ZONE = "Asia/Colombo";

const WEEKDAY_TO_DAY_KEY: Record<string, DayKey> = {
    Mon: "mon",
    Tue: "tue",
    Wed: "wed",
    Thu: "thu",
    Fri: "fri",
    Sat: "sat",
    Sun: "sun",
};

function getColomboTime(now: Date): { dayKey: DayKey; minutes: number } {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: SHOP_TIME_ZONE,
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    }).formatToParts(now);

    const lookup = new Map(parts.map((part) => [part.type, part.value]));
    const dayKey = WEEKDAY_TO_DAY_KEY[lookup.get("weekday") ?? "Mon"] ?? "mon";
    const minutes = Number(lookup.get("hour")) * 60 + Number(lookup.get("minute"));

    return { dayKey, minutes };
}

function timeToMinutes(value: string): number | null {
    const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
    if (!match) {
        return null;
    }
    return Number(match[1]) * 60 + Number(match[2]);
}

/**
 * Whether a shop is within its configured opening hours right now, based on
 * Sri Lanka (Asia/Colombo) time. `now` must come from the server clock.
 */
export function isShopOpenNow(hours: Json | null, now: Date): boolean {
    const parsed = parseHours(hours);
    const { dayKey, minutes: nowMinutes } = getColomboTime(now);
    const dayHours = parsed[dayKey];

    if (dayHours.closed) {
        return false;
    }

    const openMinutes = timeToMinutes(dayHours.open);
    const closeMinutes = timeToMinutes(dayHours.close);
    if (openMinutes === null || closeMinutes === null) {
        return false;
    }

    if (closeMinutes <= openMinutes) {
        // Overnight hours, e.g. "18:00-02:00"
        return nowMinutes >= openMinutes || nowMinutes < closeMinutes;
    }

    return nowMinutes >= openMinutes && nowMinutes < closeMinutes;
}

/**
 * Resolves the status that should be shown to visitors: the owner's manual
 * "closed" always wins, otherwise the shop falls back to "closed" once it's
 * outside its configured opening hours for the current Colombo time.
 */
export function getLiveShopStatus(shop: { status: ShopStatus; hours: Json | null }, now: Date): ShopStatus {
    if (shop.status === "closed") {
        return "closed";
    }

    return isShopOpenNow(shop.hours, now) ? shop.status : "closed";
}
