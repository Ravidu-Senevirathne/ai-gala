import Link from "next/link";
import { notFound } from "next/navigation";

import { DetailPageHeader } from "@/components/shared/detail-page-header";
import { GetDirectionsButton } from "@/components/shared/get-directions-button";
import { createClient } from "@/lib/supabase/server";

function formatSalaryRange(min: number | null, max: number | null) {
    if (min === null && max === null) {
        return "Salary not listed";
    }
    if (min !== null && max !== null) {
        return `Rs. ${min.toLocaleString()} - ${max.toLocaleString()} / month`;
    }
    const value = min ?? max;
    return `Rs. ${value!.toLocaleString()} / month`;
}

type JobPageProps = {
    params: Promise<{ id: string }>;
};

export default async function JobPage({ params }: JobPageProps) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: job } = await supabase
        .from("jobs")
        .select("*, shops(id, name, address, lat, lng, phone)")
        .eq("id", id)
        .eq("is_active", true)
        .single();

    if (!job) {
        notFound();
    }

    const shop = job.shops as { id: string; name: string; address: string | null; lat: number | null; lng: number | null; phone: string | null } | null;

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#0B192C] text-[#F1F1F1]">
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-[#FF6500]/20 blur-3xl" />
                <div className="absolute right-[-7rem] top-20 h-80 w-80 rounded-full bg-cyan-400/12 blur-3xl" />
            </div>

            <DetailPageHeader />

            <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="space-y-6 rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/45">{job.field}</p>
                        <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{job.title}</h1>
                        <p className="mt-1 text-sm text-white/50">
                            {job.district} District{shop ? ` · ${shop.name}` : ""}
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/45">Salary</p>
                            <p className="mt-2 text-sm text-white/80">{formatSalaryRange(job.salary_min, job.salary_max)}</p>
                        </div>
                        {shop?.address && (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-xs uppercase tracking-[0.3em] text-white/45">Location</p>
                                <p className="mt-2 text-sm text-white/80">{shop.address}</p>
                            </div>
                        )}
                        {shop?.phone && (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-xs uppercase tracking-[0.3em] text-white/45">Contact</p>
                                <a href={`tel:${shop.phone}`} className="mt-2 inline-block text-sm text-[#FFB27A] hover:text-white">
                                    {shop.phone}
                                </a>
                            </div>
                        )}
                    </div>

                    {job.description && (
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-white/45">Description</p>
                            <p className="mt-2 text-sm leading-7 text-white/75">{job.description}</p>
                        </div>
                    )}

                    {job.requirements && (
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-white/45">Requirements</p>
                            <p className="mt-2 text-sm leading-7 text-white/75">{job.requirements}</p>
                        </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        {shop?.lat !== null && shop?.lng !== null && shop !== null && (
                            <GetDirectionsButton lat={shop.lat!} lng={shop.lng!} />
                        )}
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 transition hover:border-[#FF6500]/40 hover:text-white"
                        >
                            Back to AI-GALA
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
