import type { Testimonial } from "./types";

type TestimonialsSectionProps = {
    testimonials: Testimonial[];
};

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
    return (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            <div className="mb-8 max-w-2xl" data-reveal>
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">Community</p>
                <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Loved by locals and shop owners alike.</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                    <article
                        key={testimonial.name}
                        data-reveal
                        style={{ transitionDelay: `${index * 90}ms` }}
                        className="flex flex-col justify-between rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#FF6500]/30"
                    >
                        <p className="leading-7 text-white/80">&ldquo;{testimonial.quote}&rdquo;</p>
                        <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FF6500]/30 bg-[#FF6500]/10 text-sm font-semibold text-[#FFB27A]">
                                {testimonial.name.charAt(0)}
                            </span>
                            <div>
                                <div className="text-sm font-semibold text-white">{testimonial.name}</div>
                                <div className="text-xs text-white/55">{testimonial.role}</div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
