import Link from "next/link";

function ArrowLeftIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5" />
            <path d="M11 18l-6-6 6-6" />
        </svg>
    );
}

export function DetailPageHeader() {
    return (
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 pt-5 sm:px-6 sm:pt-6 lg:px-8">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
                <ArrowLeftIcon />
                Back to home
            </Link>
            <Link href="/" className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-[0_0_24px_rgba(255,101,0,0.18)] sm:h-10 sm:w-10">
                    <span className="h-4 w-4 rounded-full border-2 border-[#FF6500]" />
                </span>
                <span className="hidden text-sm font-semibold tracking-[0.35em] text-white sm:inline">AI-GALA</span>
            </Link>
        </div>
    );
}
