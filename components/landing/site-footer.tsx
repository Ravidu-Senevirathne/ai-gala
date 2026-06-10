import type { NavigationLink } from "./types";

type SiteFooterProps = {
    navLinks: NavigationLink[];
};

export function SiteFooter({ navLinks }: SiteFooterProps) {
    return (
        <footer id="contact" className="border-t border-white/10 bg-black/20">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-16">
                <div data-reveal className="space-y-5">
                    <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                            <span className="h-4 w-4 rounded-full border-2 border-[#FF6500]" />
                        </span>
                        <div>
                            <div className="text-lg font-semibold tracking-[0.3em] text-white">AI-GALA</div>
                            <div className="text-xs uppercase tracking-[0.3em] text-white/45">Business directory for Kurunegala</div>
                        </div>
                    </div>
                    <p className="max-w-xl leading-7 text-white/70">
                        AI-GALA helps customers find the right shop faster and gives local businesses a modern way to stay visible, accurate, and discoverable.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-white/65">
                        {navLinks.map((link) => (
                            <a key={link.label} href={link.href} className="transition hover:text-white">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                <div data-reveal className="rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-md">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/50">Newsletter</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">Get launch updates and local product news.</h3>
                    <form className="mt-5 flex flex-col gap-3 sm:flex-row">
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
                </div>
            </div>
        </footer>
    );
}
