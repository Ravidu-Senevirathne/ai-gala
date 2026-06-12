import type { SupabaseClient } from "@supabase/supabase-js";

import { slugify } from "./shop-hours";
import type { Database } from "./supabase/types";

type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];

export const NEW_CATEGORY_VALUE = "__new__";
export const DEFAULT_CATEGORY_ICON = "🏬";

/**
 * Resolves a category select value to a category id, creating a new
 * category row first if the admin/owner chose "+ Add a new category".
 */
export async function resolveCategory(
    supabase: SupabaseClient<Database>,
    categories: CategoryRow[],
    categoryId: string,
    newCategoryName: string,
): Promise<{ categoryId: string; categories: CategoryRow[] } | { error: string }> {
    if (categoryId !== NEW_CATEGORY_VALUE) {
        return { categoryId, categories };
    }

    const trimmed = newCategoryName.trim();
    const existing = categories.find((category) => category.name.toLowerCase() === trimmed.toLowerCase());

    if (existing) {
        return { categoryId: existing.id, categories };
    }

    const baseSlug = slugify(trimmed) || "category";
    let slug = baseSlug;
    let attempt = 1;
    while (categories.some((category) => category.slug === slug)) {
        slug = `${baseSlug}-${attempt}`;
        attempt += 1;
    }

    const { data: inserted, error } = await supabase
        .from("categories")
        .insert({ name: trimmed, icon: DEFAULT_CATEGORY_ICON, slug })
        .select()
        .single();

    if (error || !inserted) {
        return { error: error?.message ?? "Could not create the new category." };
    }

    return {
        categoryId: inserted.id,
        categories: [...categories, inserted].sort((a, b) => a.name.localeCompare(b.name)),
    };
}
