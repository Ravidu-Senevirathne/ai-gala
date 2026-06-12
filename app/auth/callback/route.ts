import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const requestedRole = searchParams.get("role");

    if (code) {
        const supabase = await createClient();
        const { data } = await supabase.auth.exchangeCodeForSession(code);

        if (data.user) {
            const { data: profile } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", data.user.id)
                .single();

            let role = profile?.role;

            // OAuth sign-ins don't carry a "role" through Supabase's
            // raw_user_meta_data, so handle_new_user() always defaults new
            // profiles to 'user'. If the visitor chose "Shop Owner" before
            // continuing with Google, upgrade that default once here.
            if (requestedRole === "owner" && role === "user") {
                const { data: updated } = await supabase
                    .from("profiles")
                    .update({ role: "owner" })
                    .eq("id", data.user.id)
                    .select("role")
                    .single();

                role = updated?.role ?? role;
            }

            if (role === "admin") {
                return Response.redirect(`${origin}/admin`);
            }

            if (role === "owner") {
                return Response.redirect(`${origin}/owner`);
            }
        }

        return Response.redirect(`${origin}/?welcome=1`);
    }

    return Response.redirect(origin);
}
