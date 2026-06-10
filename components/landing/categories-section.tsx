import type { CategoryCard } from "./types";

type CategoriesSectionProps = {
    categories: CategoryCard[];
};

export function CategoriesSection({ categories }: CategoriesSectionProps) {
    return (
        <section id="categories" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            <div className="mb-8 max-w-2xl" data-reveal>
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">Categories</p>
                <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Whatever you need, just ask.</h2>
                <p className="mt-4 leading-7 text-white/70">
                    From medicine to dinner to a quick repair, AI-GALA understands what you&apos;re looking for and points you to the right place in Kurunegala.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((category, index) => (
                    <article
                        key={category.name}
                        data-reveal
                        style={{ transitionDelay: `${index * 70}ms` }}
                        className="group rounded-[1.5rem] border border-white/15 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#FF6500]/35 hover:bg-white/10 hover:shadow-[0_20px_45px_rgba(0,0,0,0.26)]"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-[#07111f]/60 text-2xl transition duration-300 group-hover:shadow-[0_0_28px_rgba(255,101,0,0.2)]">
                            {category.icon}
                        </div>
                        <h3 className="mt-5 text-lg font-semibold text-white">{category.name}</h3>
                        <p className="mt-2 text-sm text-white/55">{category.count}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
