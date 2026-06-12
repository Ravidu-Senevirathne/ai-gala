import type { Json } from "@/lib/supabase/types";

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
