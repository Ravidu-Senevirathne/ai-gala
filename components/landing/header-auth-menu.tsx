"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

type HeaderAuthMenuProps = {
    email: string;
    role: "user" | "owner" | "admin" | null;
};

export function HeaderAuthMenu({ email, role }: HeaderAuthMenuProps) {
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const dashboardHref = role === "admin" ? "/admin" : role === "owner" ? "/owner" : null;

    async function handleSignOut() {
        setIsSigningOut(true);
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    }

    return (
        <div className="flex items-center gap-3">
            {dashboardHref ? (
                <Link
                    href={dashboardHref}
                    className="hidden text-sm text-white/70 transition hover:text-white sm:inline"
                >
                    Dashboard
                </Link>
            ) : null}
            <span className="hidden max-w-[10rem] truncate text-sm text-white/60 sm:inline">{email}</span>
            <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-[#FF6500]/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSigningOut ? "..." : "Log out"}
            </button>
        </div>
    );
}
