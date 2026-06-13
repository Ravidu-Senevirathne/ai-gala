"use client";

import { useEffect, useMemo, useState } from "react";

import { type ShopWithCategory } from "@/app/admin/shop-actions";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

import { ShopForm } from "./shop-form";

type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
type MenuItemInput = { name: string; price: number | null; category: string | null };

type EditShopFormProps = {
    shop: ShopWithCategory;
    categories: CategoryRow[];
    onCategoriesChange: (categories: CategoryRow[]) => void;
    onShopUpdated: (shop: ShopWithCategory) => void;
    onCancel: () => void;
};

export function EditShopForm({ shop, categories, onCategoriesChange, onShopUpdated, onCancel }: EditShopFormProps) {
    const supabase = useMemo(() => createClient(), []);

    const [isLoading, setIsLoading] = useState(true);
    const [menuItems, setMenuItems] = useState<MenuItemInput[]>([]);

    useEffect(() => {
        let active = true;

        async function loadMenuItems() {
            const { data } = await supabase
                .from("menu_items")
                .select("name, price, category")
                .eq("shop_id", shop.id)
                .order("category")
                .order("name");

            if (!active) return;

            setMenuItems(data ?? []);
            setIsLoading(false);
        }

        void loadMenuItems();

        return () => {
            active = false;
        };
    }, [shop.id, supabase]);

    if (isLoading) {
        return (
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-sm text-white/60 backdrop-blur-xl">
                Loading shop details...
            </div>
        );
    }

    return (
        <ShopForm
            mode="edit"
            shop={shop}
            initialMenuItems={menuItems}
            categories={categories}
            onCategoriesChange={onCategoriesChange}
            onShopUpdated={onShopUpdated}
            onCancel={onCancel}
        />
    );
}
