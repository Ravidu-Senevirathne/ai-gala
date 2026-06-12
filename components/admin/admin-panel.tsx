"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import type { Database, ProfileRole } from "@/lib/supabase/types";

import { AddShopForm, type ShopWithCategory } from "./add-shop-form";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
type JobRow = Database["public"]["Tables"]["jobs"]["Row"];
type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];

type JobWithShop = JobRow & { shops: { name: string } | null };

type AdminTab = "overview" | "users" | "shops" | "jobs" | "add-shop" | "chat" | "ads";

const NAV_ITEMS: { key: AdminTab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "users", label: "Users" },
    { key: "shops", label: "Shops" },
    { key: "jobs", label: "Jobs" },
    { key: "add-shop", label: "Add Shop / Service" },
    { key: "chat", label: "Live Chat Monitor" },
    { key: "ads", label: "Global Ads & Analytics" },
];

const TAB_COPY: Record<AdminTab, { title: string; description: string }> = {
    overview: {
        title: "Platform Overview",
        description: "Live snapshot of everyone and everything on AI-GALA — users, shop listings, and posted jobs.",
    },
    users: {
        title: "Users",
        description: "Everyone with an AI-GALA account, including shoppers, shop owners, and admins.",
    },
    shops: {
        title: "Shops",
        description: "Every shop, restaurant, and service listed in the directory. Approve pending listings to make them publicly visible.",
    },
    jobs: {
        title: "Jobs",
        description: "All job posts across the platform, including ones posted directly by shop owners.",
    },
    "add-shop": {
        title: "Add Shop / Service",
        description: "Create a full listing on behalf of a merchant — category, menu & prices, hours, contact, and social links.",
    },
    chat: {
        title: "Live Chat Monitor",
        description: "Track shop approvals, inspect AI search intent, and promote high-value merchants into the context layer that powers discovery.",
    },
    ads: {
        title: "Global Ads & Analytics",
        description: "Promote shops into the AI context layer so related prompts surface them first.",
    },
};

const logs = [
    { prompt: "open pharmacies near me", response: "Matched 4 verified pharmacies within 2 km." },
    { prompt: "cheap lunch in Kurunegala", response: "Recommended 3 budget food spots and 1 lunch combo offer." },
    { prompt: "hardware shop open now", response: "Found 2 open hardware stores with map links." },
    { prompt: "late night cafe", response: "Suggested 1 open cafe and 2 nearby dessert spots." },
];

const ROLE_STYLES: Record<ProfileRole, string> = {
    admin: "bg-[#FF6500]/15 text-[#FFB07C]",
    owner: "bg-sky-400/15 text-sky-200",
    user: "bg-white/10 text-white/60",
};

function formatDate(value: string) {
    return new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function formatPriceRange(min: number | null, max: number | null) {
    if (min === null && max === null) {
        return "Not listed";
    }
    if (min !== null && max !== null) {
        return `Rs ${min.toLocaleString()} - ${max.toLocaleString()}`;
    }
    const value = min ?? max;
    return `Rs ${value!.toLocaleString()}`;
}

function formatSalaryRange(min: number | null, max: number | null) {
    if (min === null && max === null) {
        return "Not listed";
    }
    if (min !== null && max !== null) {
        return `Rs ${min.toLocaleString()} - ${max.toLocaleString()}`;
    }
    const value = min ?? max;
    return `Rs ${value!.toLocaleString()}`;
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#081321]/80 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
            {sub && <p className="mt-1 text-xs text-white/45">{sub}</p>}
        </div>
    );
}

function StatusBadge({ active, activeLabel, inactiveLabel }: { active: boolean; activeLabel: string; inactiveLabel: string }) {
    return (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${active ? "bg-emerald-500/15 text-emerald-200" : "bg-amber-500/15 text-amber-200"}`}>
            {active ? activeLabel : inactiveLabel}
        </span>
    );
}

type AdminPanelProps = {
    users: ProfileRow[];
    shops: ShopWithCategory[];
    jobs: JobWithShop[];
    categories: CategoryRow[];
};

export function AdminPanel({ users, shops: initialShops, jobs: initialJobs, categories: initialCategories }: AdminPanelProps) {
    const supabase = useMemo(() => createClient(), []);
    const router = useRouter();

    const [tab, setTab] = useState<AdminTab>("overview");
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [shops, setShops] = useState<ShopWithCategory[]>(initialShops);
    const [jobs, setJobs] = useState<JobWithShop[]>(initialJobs);
    const [categories, setCategories] = useState<CategoryRow[]>(initialCategories);
    const [highlightedShop, setHighlightedShop] = useState(initialShops[0]?.name ?? "");
    const [togglingShopId, setTogglingShopId] = useState<string | null>(null);
    const [togglingJobId, setTogglingJobId] = useState<string | null>(null);

    const pendingShopCount = useMemo(() => shops.filter((shop) => !shop.is_active).length, [shops]);
    const activeJobCount = useMemo(() => jobs.filter((job) => job.is_active).length, [jobs]);

    const promoIdeas = useMemo(
        () =>
            shops.slice(0, 3).map((shop) => ({
                shop: shop.name,
                reason: shop.categories ? `Strong demand in the ${shop.categories.name} category.` : "Active listing in the AI-GALA directory.",
            })),
        [shops],
    );

    async function toggleShopActive(shop: ShopWithCategory) {
        setTogglingShopId(shop.id);
        const { data, error } = await supabase
            .from("shops")
            .update({ is_active: !shop.is_active })
            .eq("id", shop.id)
            .select("*, categories(name, icon)")
            .single();

        if (!error && data) {
            setShops((current) => current.map((item) => (item.id === shop.id ? (data as ShopWithCategory) : item)));
        }
        setTogglingShopId(null);
    }

    async function toggleJobActive(job: JobWithShop) {
        setTogglingJobId(job.id);
        const { data, error } = await supabase
            .from("jobs")
            .update({ is_active: !job.is_active })
            .eq("id", job.id)
            .select("*, shops(name)")
            .single();

        if (!error && data) {
            setJobs((current) => current.map((item) => (item.id === job.id ? (data as JobWithShop) : item)));
        }
        setTogglingJobId(null);
    }

    function handleShopCreated(shop: ShopWithCategory) {
        setShops((current) => [shop, ...current]);
        setHighlightedShop((current) => current || shop.name);
        setTab("shops");
    }

    async function handleSignOut() {
        setIsSigningOut(true);
        await supabase.auth.signOut();
        router.refresh();
    }

    const copy = TAB_COPY[tab];

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
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.key}
                                type="button"
                                onClick={() => setTab(item.key)}
                                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${tab === item.key ? "border-[#FF6500]/40 bg-[#FF6500]/10 text-white shadow-[0_0_24px_rgba(255,101,0,0.16)]" : "border-white/10 bg-white/5 text-white/65 hover:border-white/20 hover:text-white"}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-5 grid gap-3">
                        <StatCard label="Total Users" value={users.length.toLocaleString()} />
                        <StatCard label="Total Shops" value={shops.length.toLocaleString()} sub={`${pendingShopCount} pending approval`} />
                        <StatCard label="Posted Jobs" value={jobs.length.toLocaleString()} sub={`${activeJobCount} active`} />
                    </div>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="mt-5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/65 transition hover:border-red-400/30 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSigningOut ? "Signing out..." : "Sign out of admin"}
                    </button>
                </aside>

                <section className="space-y-6">
                    <header className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                        <p className="text-xs uppercase tracking-[0.35em] text-white/45">Platform operator view</p>
                        <h2 className="mt-2 text-3xl font-semibold text-white">{copy.title}</h2>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">{copy.description}</p>
                    </header>

                    {tab === "overview" ? (
                        <div className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <StatCard label="Total Users" value={users.length.toLocaleString()} />
                                <StatCard label="Total Shops" value={shops.length.toLocaleString()} sub={`${pendingShopCount} pending approval`} />
                                <StatCard label="Posted Jobs" value={jobs.length.toLocaleString()} sub={`${activeJobCount} active`} />
                                <StatCard label="Categories" value={categories.length.toLocaleString()} />
                            </div>

                            <div className="grid gap-6 lg:grid-cols-3">
                                <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                                    <div className="flex items-center justify-between gap-3">
                                        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/45">Recent Users</h3>
                                        <button type="button" onClick={() => setTab("users")} className="text-xs font-medium text-[#FFB07C] hover:text-white">
                                            View all
                                        </button>
                                    </div>
                                    <div className="mt-4 space-y-3">
                                        {users.length === 0 && <p className="text-sm text-white/50">No users yet.</p>}
                                        {users.slice(0, 5).map((user) => (
                                            <div key={user.id} className="rounded-2xl border border-white/10 bg-[#081321]/80 p-3">
                                                <div className="flex items-center justify-between gap-3">
                                                    <span className="text-sm font-medium text-white">{user.full_name ?? "Unnamed user"}</span>
                                                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${ROLE_STYLES[user.role]}`}>{user.role}</span>
                                                </div>
                                                <p className="mt-1 text-xs text-white/45">Joined {formatDate(user.created_at)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </article>

                                <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                                    <div className="flex items-center justify-between gap-3">
                                        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/45">Recent Shops</h3>
                                        <button type="button" onClick={() => setTab("shops")} className="text-xs font-medium text-[#FFB07C] hover:text-white">
                                            View all
                                        </button>
                                    </div>
                                    <div className="mt-4 space-y-3">
                                        {shops.length === 0 && <p className="text-sm text-white/50">No shops yet.</p>}
                                        {shops.slice(0, 5).map((shop) => (
                                            <div key={shop.id} className="rounded-2xl border border-white/10 bg-[#081321]/80 p-3">
                                                <div className="flex items-center justify-between gap-3">
                                                    <span className="text-sm font-medium text-white">{shop.name}</span>
                                                    <StatusBadge active={shop.is_active} activeLabel="Active" inactiveLabel="Pending" />
                                                </div>
                                                <p className="mt-1 text-xs text-white/45">{shop.categories?.name ?? "Uncategorised"}</p>
                                            </div>
                                        ))}
                                    </div>
                                </article>

                                <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                                    <div className="flex items-center justify-between gap-3">
                                        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/45">Recent Jobs</h3>
                                        <button type="button" onClick={() => setTab("jobs")} className="text-xs font-medium text-[#FFB07C] hover:text-white">
                                            View all
                                        </button>
                                    </div>
                                    <div className="mt-4 space-y-3">
                                        {jobs.length === 0 && <p className="text-sm text-white/50">No jobs posted yet.</p>}
                                        {jobs.slice(0, 5).map((job) => (
                                            <div key={job.id} className="rounded-2xl border border-white/10 bg-[#081321]/80 p-3">
                                                <div className="flex items-center justify-between gap-3">
                                                    <span className="text-sm font-medium text-white">{job.title}</span>
                                                    <StatusBadge active={job.is_active} activeLabel="Active" inactiveLabel="Inactive" />
                                                </div>
                                                <p className="mt-1 text-xs text-white/45">{job.shops?.name ?? "General"} &middot; {job.field}</p>
                                            </div>
                                        ))}
                                    </div>
                                </article>
                            </div>
                        </div>
                    ) : null}

                    {tab === "users" ? (
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[700px] border-collapse text-left">
                                    <thead>
                                        <tr className="border-b border-white/10 text-xs uppercase tracking-[0.3em] text-white/45">
                                            <th className="px-4 py-4">Name</th>
                                            <th className="px-4 py-4">Phone</th>
                                            <th className="px-4 py-4">Role</th>
                                            <th className="px-4 py-4">Phone Verified</th>
                                            <th className="px-4 py-4">Joined</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="px-4 py-6 text-center text-sm text-white/50">
                                                    No users yet.
                                                </td>
                                            </tr>
                                        )}
                                        {users.map((user) => (
                                            <tr key={user.id} className="border-b border-white/5 text-sm text-white/80 last:border-0">
                                                <td className="px-4 py-4 font-medium text-white">{user.full_name ?? "Unnamed user"}</td>
                                                <td className="px-4 py-4">{user.phone ?? "—"}</td>
                                                <td className="px-4 py-4">
                                                    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${ROLE_STYLES[user.role]}`}>{user.role}</span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <StatusBadge active={user.phone_verified} activeLabel="Verified" inactiveLabel="Unverified" />
                                                </td>
                                                <td className="px-4 py-4">{formatDate(user.created_at)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : null}

                    {tab === "shops" ? (
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[860px] border-collapse text-left">
                                    <thead>
                                        <tr className="border-b border-white/10 text-xs uppercase tracking-[0.3em] text-white/45">
                                            <th className="px-4 py-4">Shop</th>
                                            <th className="px-4 py-4">Category</th>
                                            <th className="px-4 py-4">District</th>
                                            <th className="px-4 py-4">Price Bracket</th>
                                            <th className="px-4 py-4">Listing</th>
                                            <th className="px-4 py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {shops.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="px-4 py-6 text-center text-sm text-white/50">
                                                    No shops yet. Use &ldquo;Add Shop / Service&rdquo; to create the first listing.
                                                </td>
                                            </tr>
                                        )}
                                        {shops.map((shop) => (
                                            <tr key={shop.id} className="border-b border-white/5 text-sm text-white/80 last:border-0">
                                                <td className="px-4 py-4 font-medium text-white">{shop.name}</td>
                                                <td className="px-4 py-4">
                                                    {shop.categories ? `${shop.categories.icon} ${shop.categories.name}` : "Uncategorised"}
                                                </td>
                                                <td className="px-4 py-4">{shop.district}</td>
                                                <td className="px-4 py-4">{formatPriceRange(shop.price_range_min, shop.price_range_max)}</td>
                                                <td className="px-4 py-4">
                                                    <StatusBadge active={shop.is_active} activeLabel="Active" inactiveLabel="Pending" />
                                                </td>
                                                <td className="px-4 py-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleShopActive(shop)}
                                                        disabled={togglingShopId === shop.id}
                                                        className={`rounded-full border px-4 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${shop.is_active ? "border-white/10 bg-white/5 text-white/60 hover:border-red-400/40 hover:text-red-200" : "border-[#FF6500]/35 bg-[#FF6500]/10 text-[#FFB07C] hover:bg-[#FF6500]/20 hover:text-white"}`}
                                                    >
                                                        {togglingShopId === shop.id ? "Saving..." : shop.is_active ? "Deactivate" : "Approve / Verify"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : null}

                    {tab === "jobs" ? (
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[860px] border-collapse text-left">
                                    <thead>
                                        <tr className="border-b border-white/10 text-xs uppercase tracking-[0.3em] text-white/45">
                                            <th className="px-4 py-4">Title</th>
                                            <th className="px-4 py-4">Shop</th>
                                            <th className="px-4 py-4">Field</th>
                                            <th className="px-4 py-4">Salary</th>
                                            <th className="px-4 py-4">Status</th>
                                            <th className="px-4 py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jobs.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="px-4 py-6 text-center text-sm text-white/50">
                                                    No jobs posted yet.
                                                </td>
                                            </tr>
                                        )}
                                        {jobs.map((job) => (
                                            <tr key={job.id} className="border-b border-white/5 text-sm text-white/80 last:border-0">
                                                <td className="px-4 py-4 font-medium text-white">{job.title}</td>
                                                <td className="px-4 py-4">{job.shops?.name ?? "General"}</td>
                                                <td className="px-4 py-4">{job.field}</td>
                                                <td className="px-4 py-4">{formatSalaryRange(job.salary_min, job.salary_max)}</td>
                                                <td className="px-4 py-4">
                                                    <StatusBadge active={job.is_active} activeLabel="Active" inactiveLabel="Inactive" />
                                                </td>
                                                <td className="px-4 py-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleJobActive(job)}
                                                        disabled={togglingJobId === job.id}
                                                        className={`rounded-full border px-4 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${job.is_active ? "border-white/10 bg-white/5 text-white/60 hover:border-red-400/40 hover:text-red-200" : "border-[#FF6500]/35 bg-[#FF6500]/10 text-[#FFB07C] hover:bg-[#FF6500]/20 hover:text-white"}`}
                                                    >
                                                        {togglingJobId === job.id ? "Saving..." : job.is_active ? "Deactivate" : "Activate"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : null}

                    {tab === "add-shop" ? (
                        <AddShopForm categories={categories} onCategoriesChange={setCategories} onShopCreated={handleShopCreated} />
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
                                    {promoIdeas.length === 0 && <p className="text-sm text-white/50">Add a shop to start promoting it.</p>}
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
                                    <p className="mt-2 text-3xl font-semibold text-white">{highlightedShop || "None selected"}</p>
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
