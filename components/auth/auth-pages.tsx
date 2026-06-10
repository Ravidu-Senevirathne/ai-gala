"use client";

import { useMemo, useState } from "react";

type AuthMode = "login" | "signup";
type Role = "user" | "owner";

const roleTabs = [
    { id: "user" as const, label: "I am a User" },
    { id: "owner" as const, label: "I am a Shop Owner" },
];

function GlassField({
    label,
    placeholder,
    type = "text",
    value,
    onChange,
}: {
    label: string;
    placeholder: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <label className="block space-y-2">
            <span className="text-sm font-medium text-white/80">{label}</span>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="min-h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#FF6500]/50 focus:ring-2 focus:ring-[#FF6500]/20"
            />
        </label>
    );
}

export function AuthPages() {
    const [mode, setMode] = useState<AuthMode>("login");
    const [role, setRole] = useState<Role>("user");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                <div className="absolute left-[-10rem] top-[-8rem] h-80 w-80 rounded-full bg-[#FF6500]/18 blur-3xl" />
                <div className="absolute right-[-9rem] top-24 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="absolute bottom-[-10rem] left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
            </div>

            <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.1fr_0.9fr]">
                <section className="flex items-center px-4 py-10 sm:px-6 lg:px-8">
                    <div className="max-w-xl space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/60">
                            Secure access
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                                AI-GALA access for users, shop owners, and operators.
                            </h1>
                            <p className="max-w-lg text-base leading-7 text-white/70 sm:text-lg">
                                A split-screen auth experience with role-aware entry, glassmorphism surfaces, and a clean path into the right workspace.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            {[
                                ["Verified listings", "Safe discovery across the directory."],
                                ["Owner onboarding", "Fast entry for shop management."],
                                ["Admin oversight", "Track content and activity centrally."],
                            ].map(([title, description]) => (
                                <article key={title} className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                                    <h2 className="text-sm font-semibold text-white">{title}</h2>
                                    <p className="mt-2 text-sm leading-6 text-white/65">{description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="flex items-center px-4 pb-12 sm:px-6 lg:px-8 lg:py-10">
                    <div className="w-full rounded-[2rem] border border-white/10 bg-white/8 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:p-6">
                        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.35em] text-white/45">Access portal</p>
                                <h2 className="mt-2 text-2xl font-semibold text-white">
                                    {mode === "login" ? "Welcome back" : "Create your account"}
                                </h2>
                            </div>
                            <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
                                {(["login", "signup"] as AuthMode[]).map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => setMode(item)}
                                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${mode === item ? "bg-[#FF6500] text-white shadow-[0_0_24px_rgba(255,101,0,0.35)]" : "text-white/65 hover:text-white"}`}
                                    >
                                        {item === "login" ? "Login" : "Signup"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5 flex gap-3 rounded-2xl border border-white/10 bg-[#081321]/70 p-1">
                            {roleTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setRole(tab.id)}
                                    className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition ${role === tab.id ? "bg-white/10 text-white shadow-[0_0_24px_rgba(255,101,0,0.12)]" : "text-white/55 hover:text-white"}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <form className="mt-6 space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <GlassField label="Email" placeholder="owner@ai-gala.lk" type="email" value={email} onChange={setEmail} />
                                <GlassField label="Password" placeholder="••••••••" type="password" value={password} onChange={setPassword} />
                            </div>

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
                                                        className="h-12 w-full rounded-xl border border-white/10 bg-white/5 text-center text-lg font-semibold text-white outline-none focus:border-[#FF6500]/50 focus:ring-2 focus:ring-[#FF6500]/20"
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
                                    className="inline-flex min-h-14 flex-1 items-center justify-center rounded-2xl bg-[#FF6500] px-6 text-sm font-semibold text-white shadow-[0_0_24px_rgba(255,101,0,0.35)] transition duration-300 hover:scale-[1.01] hover:shadow-[0_0_34px_rgba(255,101,0,0.55)]"
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
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}
