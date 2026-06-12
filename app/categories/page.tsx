import type { Metadata } from "next";

import { CategoriesExplorer, type CategoryWithStats } from "@/components/categories/categories-explorer";
import { navLinks } from "@/components/landing/landing-data";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Categories | AI-GALA",
    description: "Browse every business category in Kurunegala with live open-now counts, from pharmacies to electronics to repairs.",
};

export default async function CategoriesPage() {
    const supabase = await createClient();

    const [{ data: categories }, { data: shops }] = await Promise.all([
        supabase.from("categories").select("*").order("name"),
        supabase.from("shops").select("category_id, status").eq("is_active", true),
    ]);

    const statsByCategory = new Map<string, { total: number; open: number }>();
    for (const shop of shops ?? []) {
        if (!shop.category_id) {
            continue;
        }
        const entry = statsByCategory.get(shop.category_id) ?? { total: 0, open: 0 };
        entry.total += 1;
        if (shop.status === "open") {
            entry.open += 1;
        }
        statsByCategory.set(shop.category_id, entry);
    }

    const categoriesWithStats: CategoryWithStats[] = (categories ?? []).map((category) => ({
        id: category.id,
        name: category.name,
        icon: category.icon,
        slug: category.slug,
        totalShops: statsByCategory.get(category.id)?.total ?? 0,
        openShops: statsByCategory.get(category.id)?.open ?? 0,
    }));

    const totalShops = categoriesWithStats.reduce((sum, category) => sum + category.totalShops, 0);
    const totalOpen = categoriesWithStats.reduce((sum, category) => sum + category.openShops, 0);

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#0B192C] text-[#F1F1F1]">
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-[#FF6500]/20 blur-3xl" />
                <div className="absolute right-[-7rem] top-20 h-80 w-80 rounded-full bg-cyan-400/12 blur-3xl" />
                <div className="absolute bottom-[-10rem] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
            </div>

            <SiteHeader navLinks={navLinks} />

            <main>
                <CategoriesExplorer categories={categoriesWithStats} totalShops={totalShops} totalOpen={totalOpen} />
            </main>

            <SiteFooter navLinks={navLinks} />
        </div>
    );
}
