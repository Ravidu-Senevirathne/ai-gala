"use client";

import { useEffect, useState } from "react";
import { BrowseShopsSection } from "./browse-shops-section";
import { FeaturesSection } from "./features-section";
import { HeroSection } from "./hero-section";
import { HowItWorksSection } from "./how-it-works-section";
import {
    browseShops,
    featureCards,
    navLinks,
    ownerSteps,
    quickPrompts,
    subtitlePhrases,
    userSteps,
} from "./landing-data";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import type { AssistantResponse } from "./types";
import { useRevealOnScroll } from "./use-reveal-on-scroll";

const defaultPrompt = quickPrompts[0];

function buildResponse(query: string): AssistantResponse {
    const normalized = query.toLowerCase();

    if (normalized.includes("pharmacy")) {
        return {
            label: "Best live results",
            headline: "3 pharmacies appear open right now",
            details: "City Care Pharmacy, HealthHub, and Medline Store are marked open with quick contact actions.",
        };
    }

    if (normalized.includes("coffee") || normalized.includes("cafe")) {
        return {
            label: "Nearby browse results",
            headline: "2 cafes are currently open and active",
            details: "You can compare hours, walk-in friendliness, and vibe before you head out.",
        };
    }

    return {
        label: "Smart directory response",
        headline: "AI-GALA is ready to refine your search",
        details: "Try asking for a shop type, a neighborhood, or whether a place is open right now.",
    };
}

export function LandingPage() {
    useRevealOnScroll();

    const [prompt, setPrompt] = useState(defaultPrompt);
    const [subtitleIndex, setSubtitleIndex] = useState(0);
    const [response, setResponse] = useState<AssistantResponse>(() => buildResponse(defaultPrompt));

    useEffect(() => {
        const timer = window.setInterval(() => {
            setSubtitleIndex((current) => (current + 1) % subtitlePhrases.length);
        }, 3200);

        return () => window.clearInterval(timer);
    }, []);

    function handlePromptSubmit() {
        setResponse(buildResponse(prompt));
    }

    function handleQuickPrompt(nextPrompt: string) {
        setPrompt(nextPrompt);
        setResponse(buildResponse(nextPrompt));
    }

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#0B192C] text-[#F1F1F1]">
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-[#FF6500]/20 blur-3xl" />
                <div className="absolute right-[-7rem] top-20 h-80 w-80 rounded-full bg-cyan-400/12 blur-3xl" />
                <div className="absolute bottom-[-10rem] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
            </div>

            <SiteHeader navLinks={navLinks} />

            <main id="home">
                <HeroSection
                    promptValue={prompt}
                    response={response}
                    subtitle={subtitlePhrases[subtitleIndex]}
                    quickPrompts={quickPrompts}
                    onPromptChange={setPrompt}
                    onPromptSubmit={handlePromptSubmit}
                    onQuickPromptSelect={handleQuickPrompt}
                />
                <FeaturesSection featureCards={featureCards} />
                <BrowseShopsSection browseShops={browseShops} />
                <HowItWorksSection userSteps={userSteps} ownerSteps={ownerSteps} />
            </main>

            <SiteFooter navLinks={navLinks} />
        </div>
    );
}
