"use client";

import { type FormEvent, useMemo, useState } from "react";

type Offer = {
    title: string;
    discount: string;
    validUntil: string;
};

export function ShopOwnerDashboard() {
    const [isEmergencyClosed, setIsEmergencyClosed] = useState(false);
    const [offerTitle, setOfferTitle] = useState("");
    const [discountPercent, setDiscountPercent] = useState("");
    const [validUntil, setValidUntil] = useState("");
    const [offers, setOffers] = useState<Offer[]>([
        { title: "Lunch Combo Upgrade", discount: "15%", validUntil: "2026-06-18" },
        { title: "Weekend Service Deal", discount: "10%", validUntil: "2026-06-14" },
    ]);

    const stats = useMemo(
        () => [
            { label: "AI Profile Views", value: "1,284", trend: "+12% this week" },
            { label: "Clicks to Maps", value: "642", trend: "+8% this week" },
        ],
        [],
    );

    const submitOffer = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!offerTitle.trim() || !discountPercent.trim() || !validUntil.trim()) {
            return;
        }

        setOffers((current) => [
            { title: offerTitle.trim(), discount: `${discountPercent.trim()}%`, validUntil },
            ...current,
        ]);
        setOfferTitle("");
        setDiscountPercent("");
        setValidUntil("");
    };

    return (
        <div className="min-h-screen bg-[#0B192C] text-[#F1F1F1]">
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[-10rem] top-[-6rem] h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
                <div className="absolute right-[-10rem] top-24 h-96 w-96 rounded-full bg-[#FF6500]/15 blur-3xl" />
            </div>

            <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
                <header className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/45">Owner workspace</p>
                    <h1 className="mt-2 text-3xl font-semibold text-white">Shop Owner Dashboard</h1>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">
                        Manage live availability, publish discounts, and track visibility signals without touching the public landing page.
                    </p>
                </header>

                <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                    <article className={`rounded-[2rem] border p-6 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 ${isEmergencyClosed ? "border-red-400/35 bg-red-500/10 shadow-[0_0_42px_rgba(127,29,29,0.2)]" : "border-emerald-400/20 bg-emerald-500/10 shadow-[0_0_42px_rgba(16,185,129,0.16)]"}`}>
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="max-w-2xl space-y-3">
                                <p className="text-xs uppercase tracking-[0.35em] text-white/45">Live Status Card</p>
                                <h2 className="text-3xl font-semibold text-white">Emergency Close</h2>
                                <p className="text-sm leading-7 text-white/70">
                                    අද දින හදිස්සියකට කඩය වසා ඇත
                                </p>
                            </div>

                            <button
                                type="button"
                                role="switch"
                                aria-checked={isEmergencyClosed}
                                onClick={() => setIsEmergencyClosed((current) => !current)}
                                className={`group relative inline-flex h-20 w-36 items-center rounded-full border p-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6500]/30 ${isEmergencyClosed ? "border-red-300/30 bg-[#2b0f12] shadow-[0_0_36px_rgba(239,68,68,0.22)]" : "border-emerald-300/30 bg-[#062217] shadow-[0_0_36px_rgba(16,185,129,0.18)]"}`}
                            >
                                <span className={`inline-flex h-16 w-16 items-center justify-center rounded-full text-xs font-semibold uppercase tracking-[0.25em] transition duration-300 ${isEmergencyClosed ? "translate-x-16 bg-red-300 text-[#2b0f12] shadow-[0_0_24px_rgba(252,165,165,0.65)]" : "translate-x-0 bg-[#FF6500] text-white shadow-[0_0_24px_rgba(255,101,0,0.75)]"}`}>
                                    {isEmergencyClosed ? "Close" : "Open"}
                                </span>
                            </button>
                        </div>

                        <div className={`mt-6 rounded-[1.5rem] border p-5 ${isEmergencyClosed ? "border-red-300/20 bg-red-500/10" : "border-emerald-300/20 bg-emerald-500/10"}`}>
                            <div className="flex items-center gap-3">
                                <span className={`h-3 w-3 rounded-full ${isEmergencyClosed ? "bg-red-300 shadow-[0_0_16px_rgba(252,165,165,0.9)]" : "bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.8)]"}`} />
                                <p className="text-sm font-medium text-white">
                                    {isEmergencyClosed ? "Emergency close is active and the shop is marked unavailable." : "Shop is open and visible in live discovery."}
                                </p>
                            </div>
                        </div>
                    </article>

                    <div className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                            {stats.map((stat) => (
                                <article key={stat.label} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                                    <p className="text-sm text-white/60">{stat.label}</p>
                                    <div className="mt-3 flex items-end justify-between gap-4">
                                        <h3 className="text-4xl font-semibold text-white">{stat.value}</h3>
                                        <span className="text-xs uppercase tracking-[0.3em] text-[#FF6500]">{stat.trend}</span>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <form onSubmit={submitOffer} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                            <p className="text-xs uppercase tracking-[0.35em] text-white/45">Discount Manager</p>
                            <h2 className="mt-2 text-2xl font-semibold text-white">Add a new deal</h2>

                            <div className="mt-5 grid gap-4">
                                <input
                                    value={offerTitle}
                                    onChange={(event) => setOfferTitle(event.target.value)}
                                    placeholder="Offer Title"
                                    className="min-h-12 rounded-2xl border border-white/10 bg-[#081321]/80 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#FF6500]/50 focus:ring-2 focus:ring-[#FF6500]/20"
                                />
                                <input
                                    value={discountPercent}
                                    onChange={(event) => setDiscountPercent(event.target.value)}
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="Discount %"
                                    className="min-h-12 rounded-2xl border border-white/10 bg-[#081321]/80 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#FF6500]/50 focus:ring-2 focus:ring-[#FF6500]/20"
                                />
                                <input
                                    value={validUntil}
                                    onChange={(event) => setValidUntil(event.target.value)}
                                    type="date"
                                    className="min-h-12 rounded-2xl border border-white/10 bg-[#081321]/80 px-4 text-sm text-white outline-none focus:border-[#FF6500]/50 focus:ring-2 focus:ring-[#FF6500]/20"
                                />
                                <button
                                    type="submit"
                                    className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#FF6500] px-5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(255,101,0,0.35)] transition hover:scale-[1.01] hover:shadow-[0_0_34px_rgba(255,101,0,0.55)]"
                                >
                                    Publish Offer
                                </button>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/45">My Active Offers</h3>
                                <div className="mt-3 space-y-3">
                                    {offers.map((offer) => (
                                        <article key={`${offer.title}-${offer.validUntil}`} className="rounded-2xl border border-white/10 bg-[#081321]/80 p-4">
                                            <div className="flex items-center justify-between gap-3">
                                                <h4 className="font-medium text-white">{offer.title}</h4>
                                                <span className="rounded-full border border-[#FF6500]/20 bg-[#FF6500]/10 px-3 py-1 text-xs font-semibold text-[#FFB07C]">
                                                    {offer.discount}
                                                </span>
                                            </div>
                                            <p className="mt-2 text-sm text-white/55">Valid until {offer.validUntil}</p>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
}
