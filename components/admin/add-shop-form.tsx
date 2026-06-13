"use client";

import { type ShopWithCategory } from "@/app/admin/shop-actions";
import type { Database } from "@/lib/supabase/types";

import { ShopForm } from "./shop-form";

export type { ShopWithCategory } from "@/app/admin/shop-actions";

type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];

type AddShopFormProps = {
    categories: CategoryRow[];
    onCategoriesChange: (categories: CategoryRow[]) => void;
    onShopCreated: (shop: ShopWithCategory) => void;
};

export function AddShopForm({ categories, onCategoriesChange, onShopCreated }: AddShopFormProps) {
    return (
        <ShopForm
            mode="create"
            categories={categories}
            onCategoriesChange={onCategoriesChange}
            onShopCreated={onShopCreated}
        />
    );
}
