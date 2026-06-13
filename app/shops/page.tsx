import type { Metadata } from "next";

import { navLinks } from "@/components/landing/landing-data";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { ShopsDirectory, type ShopWithCategory } from "@/components/shops/shops-directory";
import { getLiveShopStatus } from "@/lib/shop-hours";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Browse Shops | AI-GALA",
    description: "Search and filter every active business in Kurunegala by category and live status, with directions and contact details.",
};

type ShopsPageProps = {
    searchParams: Promise<{ category?: string }>;
};

export default async function ShopsPage({ searchParams }: ShopsPageProps) {
    const { category } = await searchParams;
    const supabase = await createClient();

    const [{ data: shops }, { data: categories }] = await Promise.all([
        supabase
            .from("shops")
            .select("*, categories(name, icon, slug)")
            .eq("is_active", true)
            .order("name"),
        supabase.from("categories").select("*").order("name"),
    ]);

    const now = new Date();
    const liveShops = (shops ?? []).map((shop) => ({
        ...shop,
        status: getLiveShopStatus(shop, now),
    })) as ShopWithCategory[];

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#0B192C] text-[#F1F1F1]">
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-[#FF6500]/20 blur-3xl" />
                <div className="absolute right-[-7rem] top-20 h-80 w-80 rounded-full bg-cyan-400/12 blur-3xl" />
                <div className="absolute bottom-[-10rem] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
            </div>

            <SiteHeader navLinks={navLinks} />

            <main>
                <ShopsDirectory shops={liveShops} categories={categories ?? []} initialCategorySlug={category} />
            </main>

            <SiteFooter navLinks={navLinks} />
        </div>
    );
}
