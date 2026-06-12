"use server";

import { DEFAULT_CATEGORY_ICON, NEW_CATEGORY_VALUE } from "@/lib/shop-categories";
import { slugify } from "@/lib/shop-hours";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { Database, Json, ShopStatus } from "@/lib/supabase/types";

type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
type ShopRow = Database["public"]["Tables"]["shops"]["Row"];

export type ShopWithCategory = ShopRow & { categories: { name: string; icon: string } | null };

export type CreateShopInput = {
    name: string;
    categoryId: string;
    newCategoryName: string;
    description: string | null;
    district: string;
    address: string;
    phone: string;
    priceMin: number | null;
    priceMax: number | null;
    status: ShopStatus;
    hours: Record<string, string>;
    socialLinks: Record<string, string> | null;
    menuItems: { name: string; price: number | null; category: string | null }[];
};

export type CreateShopResult =
    | { shop: ShopWithCategory; categories: CategoryRow[]; menuWarning?: string }
    | { error: string };

async function isAdmin(): Promise<boolean> {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return false;

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", userData.user.id).single();

    return profile?.role === "admin";
}

/**
 * Creates a shop listing on behalf of a merchant. Runs with the service-role
 * client so admins can always publish listings regardless of their own
 * browser session state - re-checks the admin role server-side first.
 */
export async function createShopListing(input: CreateShopInput): Promise<CreateShopResult> {
    if (!(await isAdmin())) {
        return { error: "You must be signed in as an admin to add a listing." };
    }

    const admin = createAdminClient();

    const { data: existingCategories, error: categoriesError } = await admin.from("categories").select("*").order("name");

    if (categoriesError || !existingCategories) {
        return { error: categoriesError?.message ?? "Could not load categories." };
    }

    let categories = existingCategories;
    let categoryId = input.categoryId;

    if (categoryId === NEW_CATEGORY_VALUE) {
        const trimmedName = input.newCategoryName.trim();
        const existing = categories.find((category) => category.name.toLowerCase() === trimmedName.toLowerCase());

        if (existing) {
            categoryId = existing.id;
        } else {
            const baseSlug = slugify(trimmedName) || "category";
            let slug = baseSlug;
            let attempt = 1;
            while (categories.some((category) => category.slug === slug)) {
                slug = `${baseSlug}-${attempt}`;
                attempt += 1;
            }

            const { data: inserted, error } = await admin
                .from("categories")
                .insert({ name: trimmedName, icon: DEFAULT_CATEGORY_ICON, slug })
                .select()
                .single();

            if (error || !inserted) {
                return { error: error?.message ?? "Could not create the new category." };
            }

            categories = [...categories, inserted].sort((a, b) => a.name.localeCompare(b.name));
            categoryId = inserted.id;
        }
    }

    const { data: shop, error: shopError } = await admin
        .from("shops")
        .insert({
            name: input.name,
            category_id: categoryId,
            district: input.district,
            address: input.address,
            phone: input.phone,
            description: input.description,
            price_range_min: input.priceMin,
            price_range_max: input.priceMax,
            status: input.status,
            hours: input.hours as Json,
            social_links: input.socialLinks as Json | null,
            owner_id: null,
            is_active: true,
        })
        .select("*, categories(name, icon)")
        .single();

    if (shopError || !shop) {
        return { error: shopError?.message ?? "Could not create the shop listing." };
    }

    let menuWarning: string | undefined;

    if (input.menuItems.length > 0) {
        const { error: menuError } = await admin.from("menu_items").insert(
            input.menuItems.map((item) => ({
                shop_id: shop.id,
                name: item.name,
                price: item.price,
                category: item.category,
            })),
        );

        if (menuError) {
            menuWarning = `Shop created, but menu items failed to save: ${menuError.message}`;
        }
    }

    return { shop: shop as ShopWithCategory, categories, menuWarning };
}
