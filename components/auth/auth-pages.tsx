"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";

type AuthMode = "login" | "signup";
type Role = "user" | "owner";

const roleTabs = [
    { id: "user" as const, label: "I am a User", icon: <UserIcon /> },
    { id: "owner" as const, label: "I am a Shop Owner", icon: <StoreIcon /> },
];

function ArrowLeftIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5" />
            <path d="M11 18l-6-6 6-6" />
        </svg>
    );
}

function MailIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
            <path d="M3 6.5l9 6 9-6" />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4" y="10.5" width="16" height="10" rx="2.5" />
            <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
        </svg>
    );
}

function EyeIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function EyeOffIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 3l18 18" />
            <path d="M10.6 5.2A9.9 9.9 0 0 1 12 5c6.5 0 10 7 10 7a17.5 17.5 0 0 1-3.1 3.9M6.2 6.2C3.7 7.8 2 12 2 12s3.5 7 10 7a9.7 9.7 0 0 0 4.2-.9" />
            <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
        </svg>
    );
}

function UserIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
        </svg>
    );
}

function StoreIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 9.5 4.5 4h15L21 9.5" />
            <path d="M3 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" />
            <path d="M5 11v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8" />
            <path d="M10 20v-4a2 2 0 0 1 4 0v4" />
        </svg>
    );
}

function ShieldIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2 4 5v6c0 5 4 9 8 11 4-2 8-6 8-11V5l-8-3Z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}

function GlassField({
    label,
    placeholder,
    type = "text",
    value,
    onChange,
    icon,
    rightElement,
}: {
    label: string;
    placeholder: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    icon?: ReactNode;
    rightElement?: ReactNode;
}) {
    return (
        <label className="block space-y-2">
            <span className="text-sm font-medium text-white/80">{label}</span>
            <div className="relative">
                {icon ? (
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35">
                        {icon}
                    </span>
                ) : null}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className={`min-h-14 w-full rounded-2xl border border-white/10 bg-white/5 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#FF6500]/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-[#FF6500]/20 ${icon ? "pl-12" : "pl-4"} ${rightElement ? "pr-12" : "pr-4"}`}
                />
                {rightElement ? (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</span>
                ) : null}
            </div>
        </label>
    );
}

type SocialProvider = "google" | "facebook" | "apple";

const socialProviders: { id: SocialProvider; label: string; icon: ReactNode; hover: string }[] = [
    {
        id: "google",
        label: "Google",
        hover: "hover:border-[#4285F4]/50 hover:bg-[#4285F4]/10",
        icon: (
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                    fill="#4285F4"
                    d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3.01h3.86c2.26-2.09 3.56-5.17 3.56-8.87z"
                />
                <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.86-3c-1.07.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11C3.26 21.3 7.31 24 12 24z"
                />
                <path
                    fill="#FBBC05"
                    d="M5.27 14.28A7.18 7.18 0 0 1 4.91 12c0-.79.14-1.56.36-2.28V6.61H1.27A11.96 11.96 0 0 0 0 12c0 1.93.46 3.76 1.27 5.39l4-3.11z"
                />
                <path
                    fill="#EA4335"
                    d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.27 6.61l4 3.11C6.22 6.88 8.87 4.77 12 4.77z"
                />
            </svg>
        ),
    },
    {
        id: "facebook",
        label: "Facebook",
        hover: "hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10",
        icon: (
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                    fill="#1877F2"
                    d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 5.4 3.66 9.93 8.62 11.21v-7.71H6.41V12.1h2.21V9.93c0-2.19 1.3-3.4 3.27-3.4.95 0 1.94.17 1.94.17v2.36h-1.1c-1.08 0-1.42.68-1.42 1.38v1.66h2.43l-.39 2.47h-2.04v7.71C20.34 22 24 17.47 24 12.07z"
                />
            </svg>
        ),
    },
    {
        id: "apple",
        label: "Apple",
        hover: "hover:border-white/40 hover:bg-white/10",
        icon: (
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
                <path d="M16.36 1.43c.1 1.01-.27 2-.86 2.74-.62.78-1.65 1.39-2.66 1.31-.12-.99.32-2.02.9-2.7.65-.78 1.74-1.36 2.62-1.35zM20.5 17.2c-.36.83-.78 1.6-1.27 2.31-.66.97-1.34 1.94-2.43 1.96-1.07.02-1.42-.63-2.64-.63-1.22 0-1.6.61-2.62.65-1.05.04-1.85-.97-2.52-1.93-1.38-1.97-2.45-5.57-1.02-8.01.7-1.2 1.96-1.96 3.33-1.98 1.05-.02 1.74.64 2.62.64.88 0 1.46-.66 2.62-.64.93.01 1.92.47 2.62 1.27-2.31 1.36-1.94 4.78.31 6.36z" />
            </svg>
        ),
    },
];

function SocialButton({ provider }: { provider: (typeof socialProviders)[number] }) {
    return (
        <button
            type="button"
            className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 text-sm font-medium text-white/85 transition duration-200 hover:scale-[1.02] hover:text-white active:scale-[0.98] ${provider.hover}`}
        >
            {provider.icon}
            <span className="hidden sm:inline">{provider.label}</span>
        </button>
    );
}

export function AuthPages() {
    const [mode, setMode] = useState<AuthMode>("login");
    const [role, setRole] = useState<Role>("user");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [phoneDigits, setPhoneDigits] = useState(Array(6).fill(""));
    const [verificationCode, setVerificationCode] = useState("");

    const phoneNumber = useMemo(() => phoneDigits.join(""), [phoneDigits]);

    const updateDigit = (index: number, value: string) => {
        const digit = value.replace(/\D/g, "").slice(-1);
        setPhoneDigits((current) => current.map((entry, entryIndex) => (entryIndex === index ? digit : entry)));
    };

    return (
        <div className="min-h-screen bg-[#0B192C] text-[#F1F1F1]">
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[-10rem] top-[-8rem] h-72 w-72 rounded-full bg-[#FF6500]/18 blur-3xl sm:h-80 sm:w-80" />
                <div className="absolute right-[-9rem] top-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
                <div className="absolute bottom-[-10rem] left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-white/5 blur-3xl sm:h-[30rem] sm:w-[30rem]" />
            </div>

            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 pt-5 sm:px-6 sm:pt-6 lg:px-8">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
                    <ArrowLeftIcon />
                    Back to home
                </Link>
                <Link href="/" className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-[0_0_24px_rgba(255,101,0,0.18)] sm:h-10 sm:w-10">
                        <span className="h-4 w-4 rounded-full border-2 border-[#FF6500]" />
                    </span>
                    <span className="hidden text-sm font-semibold tracking-[0.35em] text-white sm:inline">
                        AI-GALA
                    </span>
                </Link>
            </div>

            <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-8 lg:py-14">
                <section className="order-2 lg:order-1">
                    <div className="max-w-xl space-y-6 sm:space-y-8">
                        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/60 sm:inline-flex">
                            <ShieldIcon />
                            Secure access
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                                Welcome to{" "}
                                <span className="bg-gradient-to-r from-[#FF6500] to-[#FFA552] bg-clip-text text-transparent">
                                    AI-GALA
                                </span>{" "}
                                — access for users, shop owners, and operators.
                            </h1>
                            <p className="max-w-lg text-sm leading-7 text-white/70 sm:text-base sm:leading-7 lg:text-lg">
                                A split-screen auth experience with role-aware entry, glassmorphism surfaces, and a clean path into the right workspace.
                            </p>
                        </div>

                        <div className="grid gap-3 sm:gap-4 sm:grid-cols-3">
                            {[
                                ["Verified listings", "Safe discovery across the directory."],
                                ["Owner onboarding", "Fast entry for shop management."],
                                ["Admin oversight", "Track content and activity centrally."],
                            ].map(([title, description]) => (
                                <article key={title} className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition hover:border-[#FF6500]/30 hover:bg-white/[0.07]">
                                    <h2 className="text-sm font-semibold text-white">{title}</h2>
                                    <p className="mt-2 text-sm leading-6 text-white/65">{description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="order-1 lg:order-2">
                    <div className="chat-pop-in w-full rounded-3xl border border-white/10 bg-white/8 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-6 lg:p-8">
                        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.35em] text-white/45">Access portal</p>
                                <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                                    {mode === "login" ? "Welcome back" : "Create your account"}
                                </h2>
                            </div>
                            <div className="inline-flex w-full rounded-full border border-white/10 bg-white/5 p-1 sm:w-auto">
                                {(["login", "signup"] as AuthMode[]).map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => setMode(item)}
                                        className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition sm:flex-none ${mode === item ? "bg-[#FF6500] text-white shadow-[0_0_24px_rgba(255,101,0,0.35)]" : "text-white/65 hover:text-white"}`}
                                    >
                                        {item === "login" ? "Login" : "Signup"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5 flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#081321]/70 p-1 sm:flex-row sm:gap-3">
                            {roleTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setRole(tab.id)}
                                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${role === tab.id ? "bg-white/10 text-white shadow-[0_0_24px_rgba(255,101,0,0.12)]" : "text-white/55 hover:text-white"}`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <form className="mt-6 space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <GlassField
                                    label="Email"
                                    placeholder="owner@ai-gala.lk"
                                    type="email"
                                    value={email}
                                    onChange={setEmail}
                                    icon={<MailIcon />}
                                />
                                <GlassField
                                    label="Password"
                                    placeholder="••••••••"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={setPassword}
                                    icon={<LockIcon />}
                                    rightElement={
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((current) => !current)}
                                            className="text-white/40 transition hover:text-white"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                        </button>
                                    }
                                />
                            </div>

                            {mode === "login" ? (
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 text-white/65">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-white/20 bg-white/5 text-[#FF6500] accent-[#FF6500]"
                                        />
                                        Remember me
                                    </label>
                                    <a href="#" className="font-medium text-[#FF6500] transition hover:text-[#ff7f2e]">
                                        Forgot password?
                                    </a>
                                </div>
                            ) : null}

                            {role === "owner" ? (
                                <div className="space-y-4 rounded-[1.5rem] border border-[#FF6500]/15 bg-[#FF6500]/5 p-4">
                                    <div>
                                        <p className="text-sm font-semibold text-white">Shop owner verification</p>
                                        <p className="mt-1 text-sm leading-6 text-white/65">
                                            Confirm your business before entering the owner workspace.
                                        </p>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
                                        <label className="block space-y-2">
                                            <span className="text-sm font-medium text-white/80">Phone Number</span>
                                            <div className="flex gap-2">
                                                {phoneDigits.map((digit, index) => (
                                                    <input
                                                        key={index}
                                                        inputMode="numeric"
                                                        maxLength={1}
                                                        value={digit}
                                                        onChange={(event) => updateDigit(index, event.target.value)}
                                                        className="h-12 w-full min-w-0 rounded-xl border border-white/10 bg-white/5 text-center text-lg font-semibold text-white outline-none transition focus:border-[#FF6500]/50 focus:ring-2 focus:ring-[#FF6500]/20"
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-xs text-white/45">Mock OTP entry: {phoneNumber || "000000"}</p>
                                        </label>

                                        <GlassField
                                            label="Shop Verification Code"
                                            placeholder="KUR-2048"
                                            value={verificationCode}
                                            onChange={setVerificationCode}
                                        />
                                    </div>
                                </div>
                            ) : null}

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="submit"
                                    className="inline-flex min-h-14 flex-1 items-center justify-center rounded-2xl bg-[#FF6500] px-6 text-sm font-semibold text-white shadow-[0_0_24px_rgba(255,101,0,0.35)] transition duration-300 hover:scale-[1.01] hover:shadow-[0_0_34px_rgba(255,101,0,0.55)] active:scale-[0.99]"
                                >
                                    {mode === "login" ? "Login" : "Create Account"}
                                </button>
                                <a
                                    href="/owner"
                                    className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 text-sm font-medium text-white/75 transition hover:border-[#FF6500]/35 hover:text-white"
                                >
                                    Continue to Owner View
                                </a>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <span className="h-px flex-1 bg-white/10" />
                                <span className="text-xs uppercase tracking-[0.3em] text-white/40">Or continue with</span>
                                <span className="h-px flex-1 bg-white/10" />
                            </div>

                            <div className="flex gap-3">
                                {socialProviders.map((provider) => (
                                    <SocialButton key={provider.id} provider={provider} />
                                ))}
                            </div>

                            <p className="text-center text-sm text-white/55">
                                {mode === "login" ? (
                                    <>
                                        New to AI-GALA?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setMode("signup")}
                                            className="font-semibold text-[#FF6500] transition hover:text-[#ff7f2e]"
                                        >
                                            Create an account
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        Already have an account?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setMode("login")}
                                            className="font-semibold text-[#FF6500] transition hover:text-[#ff7f2e]"
                                        >
                                            Log in
                                        </button>
                                    </>
                                )}
                            </p>

                            {mode === "signup" ? (
                                <p className="text-center text-xs leading-5 text-white/40">
                                    By creating an account, you agree to AI-GALA&apos;s{" "}
                                    <a href="#" className="text-white/60 underline-offset-2 hover:text-white hover:underline">
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="text-white/60 underline-offset-2 hover:text-white hover:underline">
                                        Privacy Policy
                                    </a>
                                    .
                                </p>
                            ) : null}
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}
