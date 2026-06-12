import { LandingPage } from "@/components/landing/landing-page";
import { navLinks } from "@/components/landing/landing-data";
import { SiteHeader } from "@/components/landing/site-header";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  let userName: string | null = null;
  if (userData.user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", userData.user.id)
      .single();
    userName = profile?.full_name ?? userData.user.email?.split("@")[0] ?? null;
  }

  return <LandingPage header={<SiteHeader navLinks={navLinks} />} userName={userName} />;
}
