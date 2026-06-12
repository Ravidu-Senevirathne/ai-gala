import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");

    if (code) {
        const supabase = await createClient();
        const { data } = await supabase.auth.exchangeCodeForSession(code);

        if (data.user) {
            const { data: profile } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", data.user.id)
                .single();

            if (profile?.role === "admin") {
                return Response.redirect(`${origin}/admin`);
            }

            if (profile?.role === "owner") {
                return Response.redirect(`${origin}/owner`);
            }
        }

        return Response.redirect(`${origin}/?welcome=1`);
    }

    return Response.redirect(origin);
}
