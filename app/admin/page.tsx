import { AdminLogin } from "@/components/admin/admin-login";
import { AdminPanel } from "@/components/admin/admin-panel";
import { createClient } from "@/lib/supabase/server";

import { adminAccountExists } from "./actions";

export default async function AdminPage() {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();

    let isAdmin = false;
    if (userData.user) {
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", userData.user.id)
            .single();

        isAdmin = profile?.role === "admin";
    }

    if (!isAdmin) {
        const setupNeeded = !(await adminAccountExists());
        return <AdminLogin setupNeeded={setupNeeded} />;
    }

    const [{ data: users }, { data: shops }, { data: jobs }, { data: categories }] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("shops").select("*, categories(name, icon)").order("created_at", { ascending: false }),
        supabase.from("jobs").select("*, shops(name)").order("created_at", { ascending: false }),
        supabase.from("categories").select("*").order("name"),
    ]);

    return (
        <AdminPanel
            users={users ?? []}
            shops={shops ?? []}
            jobs={jobs ?? []}
            categories={categories ?? []}
        />
    );
}
