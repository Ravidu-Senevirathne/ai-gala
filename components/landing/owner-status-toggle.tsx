"use client";

import { useState } from "react";

export function OwnerStatusToggle() {
    const [isEmergencyClosed, setIsEmergencyClosed] = useState(false);

    return (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
            <div
                data-reveal
                className={`rounded-[2rem] border p-6 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 sm:p-8 ${isEmergencyClosed
                        ? "border-red-400/35 bg-red-500/10 shadow-[0_0_40px_rgba(239,68,68,0.15)]"
                        : "border-white/15 bg-white/10"
                    }`}
            >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/60">
                            Owner quick actions
                        </div>
                        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Shop Owner Quick Action Dashboard</h2>
                        <p className="max-w-xl leading-7 text-white/72">
                            Switch your live availability instantly. If a shop is temporarily unavailable, AI-GALA hides it from recommendations in real time.
                        </p>
                    </div>

                    <div className={`rounded-[1.5rem] border p-5 transition duration-300 ${isEmergencyClosed ? "border-red-400/30 bg-[#2a1111]" : "border-white/10 bg-[#081321]/80"}`}>
                        <div className="flex items-center justify-between gap-6">
                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-white/45">Emergency Close</p>
                                <p className="mt-2 max-w-sm text-sm leading-6 text-white/72">අද දින හදිස්සියකට කඩය වසා ඇත</p>
                            </div>

                            <button
                                type="button"
                                role="switch"
                                aria-checked={isEmergencyClosed}
                                onClick={() => setIsEmergencyClosed((value) => !value)}
                                className={`relative inline-flex h-12 w-24 items-center rounded-full border transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6500]/30 ${isEmergencyClosed
                                        ? "border-red-400/40 bg-red-500/20 shadow-[0_0_24px_rgba(239,68,68,0.25)]"
                                        : "border-white/15 bg-white/10 shadow-[0_0_24px_rgba(255,101,0,0.15)]"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-9 w-9 transform rounded-full transition duration-300 ${isEmergencyClosed
                                            ? "translate-x-12 bg-red-300 shadow-[0_0_18px_rgba(252,165,165,0.55)]"
                                            : "translate-x-2 bg-[#FF6500] shadow-[0_0_18px_rgba(255,101,0,0.8)]"
                                        }`}
                                />
                            </button>
                        </div>

                        <div className={`mt-5 rounded-[1.25rem] border p-4 transition duration-300 ${isEmergencyClosed ? "border-red-300/30 bg-red-500/10" : "border-white/10 bg-white/5"}`}>
                            <div className="flex items-center gap-3">
                                <span className={`h-2.5 w-2.5 rounded-full ${isEmergencyClosed ? "bg-red-300 shadow-[0_0_14px_rgba(252,165,165,0.9)]" : "bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.8)]"}`} />
                                <p className="text-sm font-medium text-white">
                                    {isEmergencyClosed ? "Shop hidden from live recommendations" : "Shop visible to users right now"}
                                </p>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-white/70">
                                {isEmergencyClosed
                                    ? "The directory will instantly suppress this location from user-facing results until you switch it back on."
                                    : "Customers can still discover your shop in open-now and nearby search results."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
