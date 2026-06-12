"use client";

import { useEffect, useState, type ReactNode } from "react";
import { BrowseShopsSection } from "./browse-shops-section";
import { CategoriesSection } from "./categories-section";
import { FeaturesSection } from "./features-section";
import { FloatingChatbot } from "./floating-chatbot";
import { HeroSection } from "./hero-section";
import { HowItWorksSection } from "./how-it-works-section";
import { LiveDiscountsMarquee } from "./live-discounts-marquee";
import {
    browseShops,
    categories,
    featureCards,
    liveDiscountDeals,
    navLinks,
    ownerSteps,
    stats,
    subtitlePhrases,
    testimonials,
    userSteps,
} from "./landing-data";
import { SiteFooter } from "./site-footer";
import { StatsSection } from "./stats-section";
import { TestimonialsSection } from "./testimonials-section";
import { useRevealOnScroll } from "./use-reveal-on-scroll";

type LandingPageProps = {
    header: ReactNode;
};

export function LandingPage({ header }: LandingPageProps) {
    useRevealOnScroll();

    const [subtitleIndex, setSubtitleIndex] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setSubtitleIndex((current) => (current + 1) % subtitlePhrases.length);
        }, 3200);

        return () => window.clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#0B192C] text-[#F1F1F1]">
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-[#FF6500]/20 blur-3xl" />
                <div className="absolute right-[-7rem] top-20 h-80 w-80 rounded-full bg-cyan-400/12 blur-3xl" />
                <div className="absolute bottom-[-10rem] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
            </div>

            {header}

            <main id="home">
                <HeroSection subtitle={subtitlePhrases[subtitleIndex]} />
                <LiveDiscountsMarquee discounts={liveDiscountDeals} />
                <StatsSection stats={stats} />
                <CategoriesSection categories={categories} />
                <FeaturesSection featureCards={featureCards} />
                <BrowseShopsSection browseShops={browseShops} />
                <HowItWorksSection userSteps={userSteps} ownerSteps={ownerSteps} />
                <TestimonialsSection testimonials={testimonials} />
            </main>

            <SiteFooter navLinks={navLinks} />

            <FloatingChatbot />
        </div>
    );
}
