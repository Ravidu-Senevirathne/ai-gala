"use client";

import { type FormEvent, type ReactNode, useState } from "react";

import { createShopListing, type ShopWithCategory } from "@/app/admin/shop-actions";
import { DEFAULT_CATEGORY_ICON, NEW_CATEGORY_VALUE } from "@/lib/shop-categories";
import { type DayHours, type DayKey, DAY_LABELS, DAY_ORDER, defaultHours, serializeHours } from "@/lib/shop-hours";
import { SOCIAL_LINK_META, type SocialLinkKey } from "@/lib/social-links";
import type { Database, ShopStatus } from "@/lib/supabase/types";

export type { ShopWithCategory } from "@/app/admin/shop-actions";

type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];

type MenuItemDraft = {
    name: string;
    price: string;
    category: string;
};

type SocialLinks = Record<SocialLinkKey, string>;

const STATUS_OPTIONS: { value: ShopStatus; label: string }[] = [
    { value: "open", label: "Open" },
    { value: "busy", label: "Busy" },
    { value: "closed", label: "Closed" },
];

const DEFAULT_DISTRICT = process.env.NEXT_PUBLIC_DEFAULT_DISTRICT ?? "Kurunegala";

const fieldInputClass =
    "min-h-12 w-full rounded-2xl border border-white/10 bg-[#081321]/80 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#FF6500]/50 focus:ring-2 focus:ring-[#FF6500]/20";

function emptyMenuItem(): MenuItemDraft {
    return { name: "", price: "", category: "" };
}

function emptySocialLinks(): SocialLinks {
    return { facebook: "", instagram: "", tiktok: "", whatsapp: "", website: "" };
}

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <label className="block space-y-2">
            <span className="text-sm font-medium text-white/80">{label}</span>
            {children}
        </label>
    );
}

type AddShopFormProps = {
    categories: CategoryRow[];
    onCategoriesChange: (categories: CategoryRow[]) => void;
    onShopCreated: (shop: ShopWithCategory) => void;
};

export function AddShopForm({ categories, onCategoriesChange, onShopCreated }: AddShopFormProps) {
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [newCategoryName, setNewCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [district, setDistrict] = useState(DEFAULT_DISTRICT);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [status, setStatus] = useState<ShopStatus>("open");
    const [hours, setHours] = useState<Record<DayKey, DayHours>>(() => defaultHours());
    const [socialLinks, setSocialLinks] = useState<SocialLinks>(() => emptySocialLinks());
    const [menuItems, setMenuItems] = useState<MenuItemDraft[]>(() => [emptyMenuItem()]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const previewCategory =
        categoryId === NEW_CATEGORY_VALUE
            ? newCategoryName.trim()
                ? { icon: DEFAULT_CATEGORY_ICON, name: newCategoryName.trim() }
                : null
            : categories.find((category) => category.id === categoryId) ?? null;

    function updateDay(day: DayKey, patch: Partial<DayHours>) {
        setHours((current) => ({ ...current, [day]: { ...current[day], ...patch } }));
    }

    function updateSocialLink(key: keyof SocialLinks, value: string) {
        setSocialLinks((current) => ({ ...current, [key]: value }));
    }

    function updateMenuItem(index: number, patch: Partial<MenuItemDraft>) {
        setMenuItems((current) => current.map((item, i) => (i === index ? { ...item, ...patch } : item)));
    }

    function addMenuItem() {
        setMenuItems((current) => [...current, emptyMenuItem()]);
    }

    function removeMenuItem(index: number) {
        setMenuItems((current) => (current.length > 1 ? current.filter((_, i) => i !== index) : current));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        const trimmedName = name.trim();
        const trimmedAddress = address.trim();
        const trimmedPhone = phone.trim();
        const trimmedDistrict = district.trim() || DEFAULT_DISTRICT;
        const usingNewCategory = categoryId === NEW_CATEGORY_VALUE;
        const trimmedNewCategory = newCategoryName.trim();

        if (!trimmedName) {
            setError("Business name is required.");
            return;
        }
        if (!categoryId) {
            setError("Select a category.");
            return;
        }
        if (usingNewCategory && !trimmedNewCategory) {
            setError("Enter a name for the new category.");
            return;
        }
        if (!trimmedAddress) {
            setError("Address is required.");
            return;
        }
        if (!trimmedPhone) {
            setError("At least one phone number is required.");
            return;
        }

        setIsSubmitting(true);

        try {
            const links: Record<string, string> = {};
            for (const field of SOCIAL_LINK_META) {
                const trimmed = socialLinks[field.key].trim();
                if (trimmed) {
                    links[field.key] = trimmed;
                }
            }

            const validMenuItems = menuItems
                .map((item) => ({ ...item, name: item.name.trim() }))
                .filter((item) => item.name.length > 0);

            const result = await createShopListing({
                name: trimmedName,
                categoryId,
                newCategoryName: trimmedNewCategory,
                description: description.trim() || null,
                district: trimmedDistrict,
                address: trimmedAddress,
                phone: trimmedPhone,
                priceMin: priceMin ? Number(priceMin) : null,
                priceMax: priceMax ? Number(priceMax) : null,
                status,
                hours: serializeHours(hours),
                socialLinks: Object.keys(links).length > 0 ? links : null,
                menuItems: validMenuItems.map((item) => ({
                    name: item.name,
                    price: item.price ? Number(item.price) : null,
                    category: item.category.trim() || null,
                })),
            });

            if ("error" in result) {
                setError(result.error);
                return;
            }

            onCategoriesChange(result.categories);
            onShopCreated(result.shop);

            setName("");
            setCategoryId("");
            setNewCategoryName("");
            setDescription("");
            setDistrict(DEFAULT_DISTRICT);
            setAddress("");
            setPhone("");
            setPriceMin("");
            setPriceMax("");
            setStatus("open");
            setHours(defaultHours());
            setSocialLinks(emptySocialLinks());
            setMenuItems([emptyMenuItem()]);

            if (result.menuWarning) {
                setError(result.menuWarning);
            } else {
                setSuccess(`"${trimmedName}" was added to the AI-GALA directory.`);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
            <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/45">Admin · Add Listing</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Add a shop, restaurant, or service</h2>
                <p className="mt-2 text-sm leading-6 text-white/65">
                    Create a full AI-GALA listing on behalf of a merchant &mdash; category, menu &amp; prices, hours, contact details, and social links.
                </p>
            </div>

            {error && <div className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</div>}
            {success && <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">{success}</div>}

            <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Business name">
                    <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="e.g. Lake View Cafe"
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
            </div>

            {categoryId === NEW_CATEGORY_VALUE && (
                <Field label="New category name">
                    <input
                        value={newCategoryName}
                        onChange={(event) => setNewCategoryName(event.target.value)}
                        placeholder="e.g. Bakery"
                        className={fieldInputClass}
                    />
                    {previewCategory && (
                        <span className="block text-xs text-white/45">
                            Will be added as {previewCategory.icon} {previewCategory.name}
                        </span>
                    )}
                </Field>
            )}

            <Field label="Description">
                <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Short description shown in search and AI chat results"
                    rows={2}
                    className="rounded-2xl border border-white/10 bg-[#081321]/80 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#FF6500]/50 focus:ring-2 focus:ring-[#FF6500]/20"
                />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Address">
                    <input
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        placeholder="e.g. Kandy Rd, Kurunegala"
                        className={fieldInputClass}
                    />
                </Field>
                <Field label="District">
                    <input
                        value={district}
                        onChange={(event) => setDistrict(event.target.value)}
                        placeholder="e.g. Kurunegala"
                        className={fieldInputClass}
                    />
                </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Phone number(s)">
                    <input
                        type="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="+9437XXXXXXX, +947XXXXXXXX"
                        className={fieldInputClass}
                    />
                </Field>
                <Field label="Live status">
                    <select
                        value={status}
                        onChange={(event) => setStatus(event.target.value as ShopStatus)}
                        className={`${fieldInputClass} appearance-none capitalize`}
                    >
                        {STATUS_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value} className="bg-[#081321] text-white capitalize">
                                {option.label}
                            </option>
                        ))}
                    </select>
                </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Price range - minimum (Rs)">
                    <input
                        type="number"
                        min="0"
                        value={priceMin}
                        onChange={(event) => setPriceMin(event.target.value)}
                        placeholder="e.g. 500"
                        className={fieldInputClass}
                    />
                </Field>
                <Field label="Price range - maximum (Rs)">
                    <input
                        type="number"
                        min="0"
                        value={priceMax}
                        onChange={(event) => setPriceMax(event.target.value)}
                        placeholder="e.g. 5000"
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

            <div>
                <p className="text-sm font-medium text-white/80">Social media &amp; links</p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    {SOCIAL_LINK_META.map((field) => (
                        <Field key={field.key} label={field.label}>
                            <input
                                type="url"
                                value={socialLinks[field.key]}
                                onChange={(event) => updateSocialLink(field.key, event.target.value)}
                                placeholder={field.placeholder}
                                className={fieldInputClass}
                            />
                        </Field>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-white/80">Menu &amp; prices (optional)</p>
                    <button
                        type="button"
                        onClick={addMenuItem}
                        className="rounded-full border border-[#FF6500]/35 bg-[#FF6500]/10 px-4 py-2 text-xs font-semibold text-[#FFB07C] transition hover:bg-[#FF6500]/20 hover:text-white"
                    >
                        + Add item
                    </button>
                </div>

                <div className="mt-3 space-y-3">
                    {menuItems.map((item, index) => (
                        <div key={index} className="grid gap-3 rounded-2xl border border-white/10 bg-[#081321]/80 p-4 sm:grid-cols-[1.6fr_0.8fr_0.8fr_auto]">
                            <input
                                value={item.name}
                                onChange={(event) => updateMenuItem(index, { name: event.target.value })}
                                placeholder="Item / service name (e.g. Chicken Kottu)"
                                className={fieldInputClass}
                            />
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={item.price}
                                onChange={(event) => updateMenuItem(index, { price: event.target.value })}
                                placeholder="Price (Rs)"
                                className={fieldInputClass}
                            />
                            <input
                                value={item.category}
                                onChange={(event) => updateMenuItem(index, { category: event.target.value })}
                                placeholder="Section (e.g. Mains)"
                                className={fieldInputClass}
                            />
                            <button
                                type="button"
                                onClick={() => removeMenuItem(index)}
                                disabled={menuItems.length === 1}
                                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 text-xs font-medium text-white/60 transition hover:border-red-400/40 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#FF6500] px-5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(255,101,0,0.35)] transition hover:scale-[1.01] hover:shadow-[0_0_34px_rgba(255,101,0,0.55)] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? "Adding..." : "Add to directory"}
            </button>
        </form>
    );
}
