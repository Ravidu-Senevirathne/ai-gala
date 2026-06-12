import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

import { HeaderAuthMenu } from "./header-auth-menu";
import type { NavigationLink } from "./types";

type SiteHeaderProps = {
    navLinks: NavigationLink[];
};

export async function SiteHeader({ navLinks }: SiteHeaderProps) {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();

    let role: "user" | "owner" | "admin" | null = null;
    if (userData.user) {
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", userData.user.id)
            .single();
        role = profile?.role ?? "user";
    }

    return (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B192C]/70 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-[0_0_30px_rgba(255,101,0,0.18)]">
                        <span className="h-5 w-5 rounded-full border-2 border-[#FF6500]" />
                    </span>
                    <span>
                        <span className="block text-lg font-semibold tracking-[0.35em] text-white">
                            AI-GALA
                        </span>
                        <span className="block text-xs uppercase tracking-[0.35em] text-white/50">
                            Smart Directory
                        </span>
                    </span>
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) =>
                        link.href.startsWith("#") ? (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm text-white/70 transition hover:text-white"
                            >
                                {link.label}
                            </a>
                        ) : (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm text-white/70 transition hover:text-white"
                            >
                                {link.label}
                            </Link>
                        )
                    )}
                    {userData.user ? (
                        <HeaderAuthMenu email={userData.user.email ?? ""} role={role} />
                    ) : (
                        <Link
                            href="/auth"
                            className="inline-flex items-center justify-center rounded-full border border-[#FF6500]/40 bg-[#FF6500] px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(255,101,0,0.35)] transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,101,0,0.55)]"
                        >
                            Get Started
                        </Link>
                    )}
                </nav>

                {userData.user ? (
                    <div className="md:hidden">
                        <HeaderAuthMenu email={userData.user.email ?? ""} role={role} />
                    </div>
                ) : (
                    <Link
                        href="/auth"
                        className="inline-flex items-center justify-center rounded-full border border-[#FF6500]/40 bg-[#FF6500] px-4 py-2 text-sm font-medium text-white shadow-[0_0_24px_rgba(255,101,0,0.35)] transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,101,0,0.55)] md:hidden"
                    >
                        Start
                    </Link>
                )}
            </div>
        </header>
    );
}
