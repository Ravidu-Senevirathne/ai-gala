import type { StatItem } from "./types";

type StatsSectionProps = {
    stats: StatItem[];
};

export function StatsSection({ stats }: StatsSectionProps) {
    return (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div data-reveal className="grid gap-4 rounded-[1.75rem] border border-white/15 bg-white/5 p-6 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4 lg:p-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="text-center sm:text-left">
                        <div className="bg-gradient-to-r from-white to-[#FFB27A] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
                            {stat.value}
                        </div>
                        <div className="mt-1 text-sm text-white/60">{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
