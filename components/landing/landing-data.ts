import type { ChatSuggestionChip, FeatureCard, MarqueeDeal, NavigationLink, ShopCard, StepCard } from "./types";

export const navLinks: NavigationLink[] = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Browse Shops", href: "#browse-shops" },
    { label: "Contact", href: "#contact" },
];

export const subtitlePhrases = [
    "Ask in Sinhala or English and get a verified answer in seconds.",
    "Discover open shops, updated hours, and trusted contact details near you.",
    "Turn local intent into instant discovery for every customer in Kurunegala.",
];

export const quickPrompts = [
    "මචං, මේ වෙලාවේ open pharmacy එකක් කියපන්",
    "Find a hardware shop open now near Kurunegala",
    "Best coffee place that is open late tonight",
];

export const budgetSuggestionChips: ChatSuggestionChip[] = [
    { label: "මචං, 2000ට රෑට කන්න තැනක් කියපන්", tone: "budget" },
    { label: "අද කුරුණෑගල තියෙන සිරාම Discounts මොනවාද?", tone: "status" },
    { label: "Open Pharmacies right now", tone: "urgency" },
];

export const liveDiscountDeals: MarqueeDeal[] = [
    { brand: "Nolimit", title: "Storewide Sale", offer: "20% Off Storewide", meta: "Ends tonight • Fashion" },
    { brand: "Burger Hunt", title: "Combo Alert", offer: "Buy 1 Get 1 Free", meta: "Limited time • Food" },
    { brand: "Softlogic", title: "Clearance Wave", offer: "Clearance Sale", meta: "Up to 40% off • Tech" },
];

export const featureCards: FeatureCard[] = [
    {
        title: "Real-time Status",
        description:
            "Surface open-now shops, current hours, and live availability so people can decide in seconds.",
    },
    {
        title: "Bilingual AI",
        description:
            "Support Sinhala and English queries naturally, so the experience feels local, fast, and accessible.",
    },
    {
        title: "Zero Training Cost",
        description:
            "Shop owners can join with a lightweight listing flow and update their profile without technical overhead.",
    },
];

export const userSteps: StepCard[] = [
    {
        title: "Ask naturally",
        description:
            "Type a request in Sinhala or English and let the directory understand intent, urgency, and context.",
    },
    {
        title: "See verified results",
        description:
            "Browse curated listings with open status, categories, ratings, and contact details in one clean view.",
    },
    {
        title: "Navigate instantly",
        description:
            "Call, message, or open directions without jumping through extra steps or scattered search tabs.",
    },
];

export const ownerSteps: StepCard[] = [
    {
        title: "Claim your shop",
        description:
            "Create a listing with your business details, opening hours, and service category in minutes.",
    },
    {
        title: "Update live status",
        description:
            "Switch availability, special hours, or temporary closures so customers always see accurate information.",
    },
    {
        title: "Grow local discovery",
        description:
            "Get discovered by nearby customers searching for exactly what you offer, when they need it most.",
    },
];

export const browseShops: ShopCard[] = [
    { name: "City Care Pharmacy", status: "Open now", note: "Late-night medicine, quick pickup" },
    { name: "Kurunegala Digital Mart", status: "Busy", note: "Electronics, accessories, support" },
    { name: "Green Table Cafe", status: "Open now", note: "Study-friendly cafe with Wi-Fi" },
];
