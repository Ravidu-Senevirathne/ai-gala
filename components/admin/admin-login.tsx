"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { loginAdminAccount, setupAdminAccount } from "@/app/admin/actions";

const fieldInputClass =
    "min-h-12 w-full rounded-2xl border border-white/10 bg-[#081321]/80 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#FF6500]/50 focus:ring-2 focus:ring-[#FF6500]/20";

type AdminLoginProps = {
    setupNeeded: boolean;
};

export function AdminLogin({ setupNeeded }: AdminLoginProps) {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);

        if (setupNeeded && password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsSubmitting(true);
        const result = setupNeeded ? await setupAdminAccount(password) : await loginAdminAccount(password);
        setIsSubmitting(false);

        if (result.error) {
            setError(result.error);
            return;
        }

        router.refresh();
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B192C] px-4 text-[#F1F1F1]">
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[-10rem] top-[-7rem] h-80 w-80 rounded-full bg-[#FF6500]/16 blur-3xl" />
                <div className="absolute right-[-8rem] top-28 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
                <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/45">Master control room</p>
                    <h1 className="mt-2 text-2xl font-semibold text-white">{setupNeeded ? "Create admin password" : "Admin sign-in"}</h1>
                    <p className="mt-2 text-sm leading-6 text-white/65">
                        {setupNeeded
                            ? "No admin account exists yet. Set a password to create one — separate from regular user and shop owner logins."
                            : "Enter the admin password to access the master control room."}
                    </p>
                </div>

                {error && <div className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</div>}

                <label className="block space-y-2">
                    <span className="text-sm font-medium text-white/80">Password</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className={fieldInputClass}
                        autoFocus
                        required
                    />
                </label>

                {setupNeeded && (
                    <label className="block space-y-2">
                        <span className="text-sm font-medium text-white/80">Confirm password</span>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            className={fieldInputClass}
                            required
                        />
                    </label>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-[#FF6500] px-5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(255,101,0,0.35)] transition hover:scale-[1.01] hover:shadow-[0_0_34px_rgba(255,101,0,0.55)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? "Please wait..." : setupNeeded ? "Create admin account" : "Sign in"}
                </button>
            </form>
        </div>
    );
}
