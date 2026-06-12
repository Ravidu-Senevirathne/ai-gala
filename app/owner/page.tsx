import { redirect } from "next/navigation";

import { ShopOwnerDashboard } from "@/components/owner/shop-owner-dashboard";
import { createClient } from "@/lib/supabase/server";

export default async function OwnerPage() {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
        redirect("/auth");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userData.user.id)
        .single();

    if (profile?.role !== "owner" && profile?.role !== "admin") {
        redirect("/auth");
    }

    return <ShopOwnerDashboard />;
}
