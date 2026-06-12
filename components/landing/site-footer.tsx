import type { ReactNode } from "react";

import type { NavigationLink } from "./types";

type SiteFooterProps = {
    navLinks: NavigationLink[];
};

const businessLinks: NavigationLink[] = [
    { label: "List your shop", href: "/auth" },
    { label: "Owner dashboard", href: "/owner" },
    { label: "Admin console", href: "/admin" },
    { label: "Pricing", href: "#features" },
];

const supportLinks: NavigationLink[] = [
    { label: "Help center", href: "#contact" },
    { label: "Privacy policy", href: "#contact" },
    { label: "Terms of service", href: "#contact" },
    { label: "Report a listing", href: "#contact" },
];

const socialLinks: { label: string; href: string; icon: ReactNode }[] = [
    {
        label: "Facebook",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
                <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 5.4 3.66 9.93 8.62 11.21v-7.71H6.41V12.1h2.21V9.93c0-2.19 1.3-3.4 3.27-3.4.95 0 1.94.17 1.94.17v2.36h-1.1c-1.08 0-1.42.68-1.42 1.38v1.66h2.43l-.39 2.47h-2.04v7.71C20.34 22 24 17.47 24 12.07z" />
            </svg>
        ),
    },
    {
        label: "Instagram",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        label: "X",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
                <path d="M18.9 1.5h3.3l-7.2 8.2 8.5 11.3h-6.6l-5.2-6.8-5.9 6.8H2.5l7.7-8.8L2 1.5h6.8l4.7 6.2 5.4-6.2z" />
            </svg>
        ),
    },
    {
        label: "WhatsApp",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
                <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.8-2.1-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.2.3-.9 1-.9 2.3 0 1.3 1 2.6 1.1 2.8.1.2 1.9 2.9 4.6 4 2.7 1 2.7.7 3.2.6.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.6-.3z" />
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.1 8.1 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
            </svg>
        ),
    },
];

function MailIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
            <path d="M3 6.5l9 6 9-6" />
        </svg>
    );
}

function PhoneIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
        </svg>
    );
}

function PinIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 21s-7-5.1-7-11a7 7 0 0 1 14 0c0 5.9-7 11-7 11Z" />
            <circle cx="12" cy="10" r="2.5" />
        </svg>
    );
}

function ArrowUpIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
        </svg>
    );
}

function FooterLinkGroup({ title, links }: { title: string; links: NavigationLink[] }) {
    return (
        <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/45">{title}</h3>
            <ul className="space-y-3 text-sm">
                {links.map((link) => (
                    <li key={link.label}>
                        <a href={link.href} className="group inline-flex items-center gap-2 text-white/65 transition hover:text-white">
                            <span className="h-1 w-1 rounded-full bg-[#FF6500]/0 transition group-hover:bg-[#FF6500]" />
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function SiteFooter({ navLinks }: SiteFooterProps) {
    return (
        <footer id="contact" className="relative overflow-hidden border-t border-white/10 bg-black/20">
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF6500]/50 to-transparent" />
                <div className="absolute left-[-6rem] bottom-[-8rem] h-72 w-72 rounded-full bg-[#FF6500]/10 blur-3xl" />
                <div className="absolute right-[-6rem] top-[-6rem] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                <div data-reveal className="grid gap-12 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr]">
                    <div className="space-y-5">
                        <div className="flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-[0_0_30px_rgba(255,101,0,0.18)]">
                                <span className="h-4 w-4 rounded-full border-2 border-[#FF6500]" />
                            </span>
                            <div>
                                <div className="text-lg font-semibold tracking-[0.3em] text-white">AI-GALA</div>
                                <div className="text-xs uppercase tracking-[0.3em] text-white/45">Business directory for Kurunegala</div>
                            </div>
                        </div>
                        <p className="max-w-sm leading-7 text-white/65">
                            AI-GALA helps customers find the right shop faster and gives local businesses a modern way to stay visible, accurate, and discoverable.
                        </p>
                        <div className="space-y-3 text-sm text-white/65">
                            <a href="mailto:hello@ai-gala.lk" className="flex items-center gap-3 transition hover:text-white">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition group-hover:text-white">
                                    <MailIcon />
                                </span>
                                hello@ai-gala.lk
                            </a>
                            <a href="tel:+94370000000" className="flex items-center gap-3 transition hover:text-white">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60">
                                    <PhoneIcon />
                                </span>
                                +94 37 000 0000
                            </a>
                            <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60">
                                    <PinIcon />
                                </span>
                                Kurunegala, Sri Lanka
                            </div>
                        </div>
                    </div>

                    <FooterLinkGroup title="Explore" links={navLinks} />
                    <FooterLinkGroup title="For Businesses" links={businessLinks} />

                    <div className="space-y-5 rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-md">
                        <p className="text-xs uppercase tracking-[0.35em] text-white/50">Newsletter</p>
                        <h3 className="text-2xl font-semibold text-white">Get launch updates and local product news.</h3>
                        <form className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="min-h-14 flex-1 rounded-2xl border border-white/10 bg-[#07111f]/80 px-4 text-base text-white outline-none placeholder:text-white/35 focus:border-[#FF6500]/50 focus:ring-2 focus:ring-[#FF6500]/20"
                            />
                            <button
                                type="submit"
                                className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#FF6500] px-6 text-sm font-semibold text-white shadow-[0_0_24px_rgba(255,101,0,0.35)] transition duration-300 hover:scale-105 hover:shadow-[0_0_34px_rgba(255,101,0,0.6)]"
                            >
                                Subscribe
                            </button>
                        </form>
                        <p className="text-xs leading-5 text-white/40">
                            No spam — just new shop listings, feature drops, and community highlights.
                        </p>
                    </div>
                </div>

                <div data-reveal className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-white/50">
                        © {new Date().getFullYear()} AI-GALA. All rights reserved. Built for the Kurunegala community.
                    </p>

                    <div className="flex items-center gap-3">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                aria-label={social.label}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition duration-300 hover:-translate-y-0.5 hover:border-[#FF6500]/40 hover:text-[#FF6500] hover:shadow-[0_0_20px_rgba(255,101,0,0.25)]"
                            >
                                {social.icon}
                            </a>
                        ))}

                        <a
                            href="#home"
                            aria-label="Back to top"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition duration-300 hover:-translate-y-0.5 hover:border-[#FF6500]/40 hover:text-[#FF6500] hover:shadow-[0_0_20px_rgba(255,101,0,0.25)]"
                        >
                            <ArrowUpIcon />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
