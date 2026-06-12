"use client";

import Link from "next/link";
import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import type { Database, Json } from "@/lib/supabase/types";

type ShopRow = Database["public"]["Tables"]["shops"]["Row"];
type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];

type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
type DayHours = { closed: boolean; open: string; close: string };

const DAY_ORDER: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const DAY_LABELS: Record<DayKey, string> = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
};

const DEFAULT_DISTRICT = process.env.NEXT_PUBLIC_DEFAULT_DISTRICT ?? "Kurunegala";
const NEW_CATEGORY_VALUE = "__new__";
const DEFAULT_CATEGORY_ICON = "🏬";
const DEFAULT_DAY_HOURS: DayHours = { closed: false, open: "09:00", close: "18:00" };

const fieldInputClass =
    "min-h-12 w-full rounded-2xl border border-white/10 bg-[#081321]/80 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#FF6500]/50 focus:ring-2 focus:ring-[#FF6500]/20";

function defaultHours(): Record<DayKey, DayHours> {
    return DAY_ORDER.reduce((acc, day) => {
        acc[day] = { ...DEFAULT_DAY_HOURS };
        return acc;
    }, {} as Record<DayKey, DayHours>);
}

function parseHours(value: Json | null): Record<DayKey, DayHours> {
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

function serializeHours(hours: Record<DayKey, DayHours>): Record<string, string> {
    const result: Record<string, string> = {};
    for (const day of DAY_ORDER) {
        const entry = hours[day];
        result[day] = entry.closed ? "closed" : `${entry.open}-${entry.close}`;
    }
    return result;
}

function slugify(value: string) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-+|-+$)/g, "");
}

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <label className="block space-y-2">
            <span className="text-sm font-medium text-white/80">{label}</span>
            {children}
        </label>
    );
}

export function ShopProfileForm() {
    const supabase = useMemo(() => createClient(), []);

    const [isLoading, setIsLoading] = useState(true);
    const [shop, setShop] = useState<ShopRow | null>(null);
    const [categories, setCategories] = useState<CategoryRow[]>([]);

    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [newCategoryName, setNewCategoryName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [hours, setHours] = useState<Record<DayKey, DayHours>>(() => defaultHours());

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        let active = true;

        async function loadData() {
            const [{ data: categoriesData }, { data: userData }] = await Promise.all([
                supabase.from("categories").select("*").order("name"),
                supabase.auth.getUser(),
            ]);

            if (!active) return;

            setCategories(categoriesData ?? []);

            if (!userData.user) {
                setIsLoading(false);
                return;
            }

            const { data: shopData } = await supabase
                .from("shops")
                .select("*")
                .eq("owner_id", userData.user.id)
                .maybeSingle();

            if (!active) return;

            if (shopData) {
                setShop(shopData);
                setName(shopData.name);
                setCategoryId(shopData.category_id ?? "");
                setAddress(shopData.address ?? "");
                setPhone(shopData.phone ?? "");
                setHours(parseHours(shopData.hours));
            }

            setIsLoading(false);
        }

        void loadData();

        return () => {
            active = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const previewCategory = useMemo(() => {
        if (categoryId === NEW_CATEGORY_VALUE) {
            const trimmed = newCategoryName.trim();
            return trimmed ? { icon: DEFAULT_CATEGORY_ICON, name: trimmed } : null;
        }
        return categories.find((category) => category.id === categoryId) ?? null;
    }, [categoryId, newCategoryName, categories]);

    function updateDay(day: DayKey, patch: Partial<DayHours>) {
        setHours((current) => ({ ...current, [day]: { ...current[day], ...patch } }));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        const trimmedName = name.trim();
        const trimmedAddress = address.trim();
        const trimmedPhone = phone.trim();
        const usingNewCategory = categoryId === NEW_CATEGORY_VALUE;
        const trimmedNewCategory = newCategoryName.trim();

        if (!trimmedName) {
            setError("Shop name is required.");
            return;
        }
        if (!categoryId) {
            setError("Select a category for your shop.");
            return;
        }
        if (usingNewCategory && !trimmedNewCategory) {
            setError("Enter a name for the new category.");
            return;
        }
        if (!trimmedAddress) {
            setError("Shop address is required.");
            return;
        }
        if (!trimmedPhone) {
            setError("A contact phone number is required.");
            return;
        }

        setIsSubmitting(true);

        try {
            const { data: userData } = await supabase.auth.getUser();
            if (!userData.user) {
                setError("You must be signed in.");
                return;
            }

            let resolvedCategoryId = categoryId;

            if (usingNewCategory) {
                const existing = categories.find(
                    (category) => category.name.toLowerCase() === trimmedNewCategory.toLowerCase(),
                );

                if (existing) {
                    resolvedCategoryId = existing.id;
                } else {
                    const baseSlug = slugify(trimmedNewCategory) || "category";
                    let slug = baseSlug;
                    let attempt = 1;
                    while (categories.some((category) => category.slug === slug)) {
                        slug = `${baseSlug}-${attempt}`;
                        attempt += 1;
                    }

                    const { data: insertedCategory, error: categoryError } = await supabase
                        .from("categories")
                        .insert({ name: trimmedNewCategory, icon: DEFAULT_CATEGORY_ICON, slug })
                        .select()
                        .single();

                    if (categoryError || !insertedCategory) {
                        setError(categoryError?.message ?? "Could not create the new category.");
                        return;
                    }

                    setCategories((current) => [...current, insertedCategory].sort((a, b) => a.name.localeCompare(b.name)));
                    resolvedCategoryId = insertedCategory.id;
                }
            }

            const payload = {
                name: trimmedName,
                category_id: resolvedCategoryId,
                address: trimmedAddress,
                phone: trimmedPhone,
                hours: serializeHours(hours),
            };

            if (shop) {
                const { data: updated, error: updateError } = await supabase
                    .from("shops")
                    .update(payload)
                    .eq("id", shop.id)
                    .select()
                    .single();

                if (updateError || !updated) {
                    setError(updateError?.message ?? "Could not update shop profile.");
                    return;
                }

                setShop(updated);
                setCategoryId(updated.category_id ?? resolvedCategoryId);
                setSuccess("Shop profile updated.");
            } else {
                const { data: inserted, error: insertError } = await supabase
                    .from("shops")
                    .insert({
                        ...payload,
                        owner_id: userData.user.id,
                        district: DEFAULT_DISTRICT,
                        status: "open",
                        is_active: true,
                    })
                    .select()
                    .single();

                if (insertError || !inserted) {
                    setError(insertError?.message ?? "Could not create shop profile.");
                    return;
                }

                setShop(inserted);
                setCategoryId(inserted.category_id ?? resolvedCategoryId);
                setSuccess("Shop profile created! You're now live in the AI-GALA directory.");
            }

            setNewCategoryName("");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isLoading) {
        return (
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-sm text-white/60 backdrop-blur-xl">
                Loading shop profile...
            </div>
        );
    }

    return (
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
            <form onSubmit={handleSubmit} className="space-y-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
                <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/45">Shop Profile</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                        {shop ? "Update your shop details" : "Set up your shop"}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-white/65">
                        This information powers your AI-GALA listing &mdash; shoppers see it in search, categories, and chat results.
                    </p>
                </div>

                {error && (
                    <div className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</div>
                )}
                {success && (
                    <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">{success}</div>
                )}

                <Field label="Shop name">
                    <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="e.g. Green Table Cafe"
                        className={fieldInputClass}
                    />
                </Field>

                <Field label="Category">
                    <select
                        value={categoryId}
                        onChange={(event) => setCategoryId(event.target.value)}
                        className={`${fieldInputClass} appearance-none`}
                    >
                        <option value="" disabled className="bg-[#081321] text-white">
                            Select a category
                        </option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id} className="bg-[#081321] text-white">
                                {category.icon} {category.name}
                            </option>
                        ))}
                        <option value={NEW_CATEGORY_VALUE} className="bg-[#081321] text-white">
                            + Add a new category
                        </option>
                    </select>
                </Field>

                {categoryId === NEW_CATEGORY_VALUE && (
                    <Field label="New category name">
                        <input
                            value={newCategoryName}
                            onChange={(event) => setNewCategoryName(event.target.value)}
                            placeholder="e.g. Bakery"
                            className={fieldInputClass}
                        />
                        <p className="text-xs text-white/45">
                            This will be added to AI-GALA&apos;s categories list and shown on the Categories page.
                        </p>
                    </Field>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Shop address">
                        <input
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            placeholder="e.g. Kandy Rd, Kurunegala"
                            className={fieldInputClass}
                        />
                    </Field>
                    <Field label="Phone number(s)">
                        <input
                            type="tel"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            placeholder="+9437XXXXXXX, +947XXXXXXXX"
                            className={fieldInputClass}
                        />
                    </Field>
                </div>

                <div>
                    <p className="text-sm font-medium text-white/80">Opening hours</p>
                    <div className="mt-3 space-y-2">
                        {DAY_ORDER.map((day) => (
                            <div key={day} className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-[#081321]/80 px-4 py-3">
                                <span className="w-24 shrink-0 text-sm font-medium text-white/80">{DAY_LABELS[day]}</span>

                                {hours[day].closed ? (
                                    <span className="flex-1 text-sm text-white/40">Closed all day</span>
                                ) : (
                                    <div className="flex min-w-[12rem] flex-1 items-center gap-2">
                                        <input
                                            type="time"
                                            value={hours[day].open}
                                            onChange={(event) => updateDay(day, { open: event.target.value })}
                                            className="min-h-10 flex-1 rounded-xl border border-white/10 bg-[#0B192C] px-3 text-sm text-white outline-none focus:border-[#FF6500]/50 focus:ring-2 focus:ring-[#FF6500]/20"
                                        />
                                        <span className="text-xs text-white/40">to</span>
                                        <input
                                            type="time"
                                            value={hours[day].close}
                                            onChange={(event) => updateDay(day, { close: event.target.value })}
                                            className="min-h-10 flex-1 rounded-xl border border-white/10 bg-[#0B192C] px-3 text-sm text-white outline-none focus:border-[#FF6500]/50 focus:ring-2 focus:ring-[#FF6500]/20"
                                        />
                                    </div>
                                )}

                                <label className="ml-auto flex items-center gap-2 text-xs text-white/55">
                                    <input
                                        type="checkbox"
                                        checked={hours[day].closed}
                                        onChange={(event) => updateDay(day, { closed: event.target.checked })}
                                        className="h-4 w-4 rounded border-white/20 bg-white/5 accent-[#FF6500]"
                                    />
                                    Closed
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#FF6500] px-5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(255,101,0,0.35)] transition hover:scale-[1.01] hover:shadow-[0_0_34px_rgba(255,101,0,0.55)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? "Saving..." : shop ? "Save changes" : "Create shop profile"}
                </button>
            </form>

            <aside className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.35em] text-white/45">Live preview</p>

                <div className="mt-4 rounded-[1.5rem] border border-white/15 bg-[#081321]/70 p-4">
                    <div className="flex items-start justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60">
                            <span>{previewCategory?.icon ?? "🏷️"}</span> {previewCategory?.name ?? "Category"}
                        </span>
                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium capitalize text-emerald-300">
                            {shop?.status ?? "open"}
                        </span>
                    </div>

                    <h3 className="mt-3 text-lg font-semibold text-white">{name || "Your shop name"}</h3>
                    <p className="mt-1 text-sm text-white/55">{address || "Shop address"}</p>
                    {phone && <p className="mt-2 text-sm text-[#FFB27A]">{phone}</p>}
                </div>

                <div className="mt-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/45">Opening hours</p>
                    <ul className="mt-2 space-y-1.5 text-sm text-white/70">
                        {DAY_ORDER.map((day) => (
                            <li key={day} className="flex items-center justify-between gap-4">
                                <span className="text-white/55">{DAY_LABELS[day]}</span>
                                <span>{hours[day].closed ? "Closed" : `${hours[day].open} - ${hours[day].close}`}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {shop && (
                    <Link
                        href={`/shops/${shop.id}`}
                        target="_blank"
                        className="mt-4 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 transition hover:border-[#FF6500]/40 hover:text-white"
                    >
                        View public listing
                    </Link>
                )}
            </aside>
        </div>
    );
}
