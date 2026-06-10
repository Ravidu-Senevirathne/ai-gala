"use client";

import { useMemo, useState } from "react";

type AdminTab = "shops" | "chat" | "ads";

const shops = [
    { name: "Maliyadeva Pharmacy", category: "Pharmacy", bracket: "Rs 500 - 2,000", status: "Pending" },
    { name: "Lake View Cafe", category: "Food & Beverage", bracket: "Rs 1,000 - 5,000", status: "Verified" },
    { name: "Kurunegala Tech Hub", category: "Electronics", bracket: "Rs 2,000 - 15,000", status: "Pending" },
    { name: "City Spare Parts", category: "Automotive", bracket: "Rs 3,000 - 20,000", status: "Pending" },
];

const logs = [
    { prompt: "open pharmacies near me", response: "Matched 4 verified pharmacies within 2 km." },
    { prompt: "cheap lunch in Kurunegala", response: "Recommended 3 budget food spots and 1 lunch combo offer." },
    { prompt: "hardware shop open now", response: "Found 2 open hardware stores with map links." },
    { prompt: "late night cafe", response: "Suggested 1 open cafe and 2 nearby dessert spots." },
];

const promoIdeas = [
    { shop: "Lake View Cafe", reason: "Featured in weekend dining queries." },
    { shop: "Maliyadeva Pharmacy", reason: "High urgency intent for late-night search." },
    { shop: "Kurunegala Tech Hub", reason: "Strong demand in electronics category." },
];

export function AdminPanel() {
    const [tab, setTab] = useState<AdminTab>("shops");
    const [approvedShops, setApprovedShops] = useState<Record<string, boolean>>({ "Lake View Cafe": true });
    const [highlightedShop, setHighlightedShop] = useState("Lake View Cafe");

    const stats = useMemo(
        () => [
            { label: "Pending Verifications", value: "12" },
            { label: "Active Shop Listings", value: "248" },
            { label: "AI Chat Sessions Today", value: "1,068" },
        ],
        [],
    );

    return (
        <div className="min-h-screen bg-[#0B192C] text-[#F1F1F1]">
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[-10rem] top-[-7rem] h-80 w-80 rounded-full bg-[#FF6500]/16 blur-3xl" />
                <div className="absolute right-[-8rem] top-28 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
            </div>

            <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8 lg:py-8">
                <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl lg:sticky lg:top-8 lg:h-fit">
                    <div className="rounded-[1.5rem] border border-white/10 bg-[#081321]/80 p-5">
                        <p className="text-xs uppercase tracking-[0.35em] text-white/45">Master control room</p>
                        <h1 className="mt-2 text-2xl font-semibold text-white">Admin Panel</h1>
                    </div>

                    <nav className="mt-5 space-y-2">
                        {[
                            ["shops", "Shops Overview"],
                            ["chat", "Live Chat Monitor"],
                            ["ads", "Global Ads & Analytics"],
                        ].map(([key, label]) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setTab(key as AdminTab)}
                                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${tab === key ? "border-[#FF6500]/40 bg-[#FF6500]/10 text-white shadow-[0_0_24px_rgba(255,101,0,0.16)]" : "border-white/10 bg-white/5 text-white/65 hover:border-white/20 hover:text-white"}`}
                            >
                                {label}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-5 grid gap-3">
                        {stats.map((stat) => (
                            <div key={stat.label} className="rounded-2xl border border-white/10 bg-[#081321]/80 p-4">
                                <p className="text-xs uppercase tracking-[0.3em] text-white/40">{stat.label}</p>
                                <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </aside>

                <section className="space-y-6">
                    <header className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                        <p className="text-xs uppercase tracking-[0.35em] text-white/45">Platform operator view</p>
                        <h2 className="mt-2 text-3xl font-semibold text-white">
                            {tab === "shops" ? "Shops Overview" : tab === "chat" ? "Live Chat Monitor" : "Global Ads & Analytics"}
                        </h2>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">
                            Track shop approvals, inspect AI search intent, and promote high-value merchants into the context layer that powers discovery.
                        </p>
                    </header>

                    {tab === "shops" ? (
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[760px] border-collapse text-left">
                                    <thead>
                                        <tr className="border-b border-white/10 text-xs uppercase tracking-[0.3em] text-white/45">
                                            <th className="px-4 py-4">Shop</th>
                                            <th className="px-4 py-4">Category</th>
                                            <th className="px-4 py-4">Price Bracket</th>
                                            <th className="px-4 py-4">Status</th>
                                            <th className="px-4 py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {shops.map((shop) => {
                                            const isApproved = approvedShops[shop.name] ?? shop.status === "Verified";

                                            return (
                                                <tr key={shop.name} className="border-b border-white/5 text-sm text-white/80 last:border-0">
                                                    <td className="px-4 py-4 font-medium text-white">{shop.name}</td>
                                                    <td className="px-4 py-4">{shop.category}</td>
                                                    <td className="px-4 py-4">{shop.bracket}</td>
                                                    <td className="px-4 py-4">
                                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isApproved ? "bg-emerald-500/15 text-emerald-200" : "bg-amber-500/15 text-amber-200"}`}>
                                                            {isApproved ? "Verified" : "Pending"}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <button
                                                            type="button"
                                                            onClick={() => setApprovedShops((current) => ({ ...current, [shop.name]: true }))}
                                                            className="rounded-full border border-[#FF6500]/35 bg-[#FF6500]/10 px-4 py-2 text-xs font-semibold text-[#FFB07C] transition hover:bg-[#FF6500]/20 hover:text-white"
                                                        >
                                                            Approve / Verify
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : null}

                    {tab === "chat" ? (
                        <div className="grid gap-4">
                            {logs.map((log, index) => (
                                <article key={log.prompt} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">Log {index + 1}</p>
                                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                                        <div className="rounded-2xl border border-white/10 bg-[#081321]/80 p-4">
                                            <p className="text-xs uppercase tracking-[0.3em] text-white/40">User Prompt</p>
                                            <p className="mt-2 text-sm leading-6 text-white">{log.prompt}</p>
                                        </div>
                                        <div className="rounded-2xl border border-[#FF6500]/20 bg-[#FF6500]/5 p-4">
                                            <p className="text-xs uppercase tracking-[0.3em] text-[#FFB07C]">AI Response</p>
                                            <p className="mt-2 text-sm leading-6 text-white/85">{log.response}</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : null}

                    {tab === "ads" ? (
                        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                            <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <p className="text-xs uppercase tracking-[0.35em] text-white/45">Promote to AI context</p>
                                <h3 className="mt-2 text-2xl font-semibold text-white">Highlight a shop</h3>
                                <div className="mt-5 space-y-3">
                                    {promoIdeas.map((idea) => (
                                        <button
                                            key={idea.shop}
                                            type="button"
                                            onClick={() => setHighlightedShop(idea.shop)}
                                            className={`w-full rounded-2xl border px-4 py-4 text-left transition ${highlightedShop === idea.shop ? "border-[#FF6500]/40 bg-[#FF6500]/10" : "border-white/10 bg-[#081321]/80 hover:border-white/20"}`}
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="font-medium text-white">{idea.shop}</span>
                                                <span className="text-xs uppercase tracking-[0.3em] text-[#FFB07C]">Boost</span>
                                            </div>
                                            <p className="mt-2 text-sm leading-6 text-white/65">{idea.reason}</p>
                                        </button>
                                    ))}
                                </div>
                            </article>

                            <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <p className="text-xs uppercase tracking-[0.35em] text-white/45">Analytics spotlight</p>
                                <h3 className="mt-2 text-2xl font-semibold text-white">Active promotion payload</h3>

                                <div className="mt-5 rounded-[1.5rem] border border-[#FF6500]/20 bg-[#FF6500]/5 p-5">
                                    <p className="text-sm text-white/55">Currently prioritized shop</p>
                                    <p className="mt-2 text-3xl font-semibold text-white">{highlightedShop}</p>
                                    <p className="mt-3 text-sm leading-6 text-white/70">
                                        This merchant is flagged for boosted discovery in the AI context so related prompts can surface it first.
                                    </p>
                                </div>

                                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-2xl border border-white/10 bg-[#081321]/80 p-4">
                                        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Context reach</p>
                                        <p className="mt-2 text-2xl font-semibold text-white">+38%</p>
                                    </div>
                                    <div className="rounded-2xl border border-white/10 bg-[#081321]/80 p-4">
                                        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Featured slots</p>
                                        <p className="mt-2 text-2xl font-semibold text-white">6 live</p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    ) : null}
                </section>
            </div>
        </div>
    );
}
