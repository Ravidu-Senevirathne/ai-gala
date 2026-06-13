import type { CategoryCard, ChatSuggestionChip, FeatureCard, MarqueeDeal, NavigationLink, ShopCard, StatItem, StepCard, Testimonial } from "./types";

export const navLinks: NavigationLink[] = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Contact", href: "#contact" },
];

export const stats: StatItem[] = [
    { value: "300+", label: "Verified listings" },
    { value: "40+", label: "Service categories" },
    { value: "2", label: "Languages supported" },
    { value: "24/7", label: "AI assistant uptime" },
];

export const categories: CategoryCard[] = [
    { icon: "💊", name: "Pharmacies", image: "https://i.pinimg.com/736x/da/46/95/da4695808f92eacb92d83519480f7a0b.jpg" },
    { icon: "🍛", name: "Food & Cafes", image: "https://i.pinimg.com/736x/54/92/2d/54922dd7b732dc69b31b001fd2bac63b.jpg" },
    { icon: "🔧", name: "Repairs & Services", image: "https://i.pinimg.com/736x/12/15/0d/12150d678b3f018e53f9dc5a3228ba42.jpg" },
    { icon: "🛒", name: "Groceries", image: "https://i.pinimg.com/736x/46/06/43/460643ae55a724edfc299efcf0de6973.jpg" },
    { icon: "📱", name: "Electronics", image: "https://i.pinimg.com/736x/b5/6d/41/b56d41e871f6bfe418ff0dff7b92cb7b.jpg" },
    { icon: "👕", name: "Fashion & Tailoring", image: "https://i.pinimg.com/736x/1a/4a/87/1a4a8742d2868edcad1be281287d4bf4.jpg" },
    { icon: "🏠", name: "Home & Hardware", image: "https://i.pinimg.com/736x/99/a4/f9/99a4f9dd4ab09138f60bfab952c17a9c.jpg" },
    { icon: "🚗", name: "Vehicle Services", image: "https://i.pinimg.com/736x/ae/62/34/ae6234302e5c7bc85492acdcf8e7cd57.jpg" },
];

export const testimonials: Testimonial[] = [
    {
        quote:
            "මට රෑ 9 ටත් open pharmacy එකක් හොයාගන්න ඕන වුණා. AI-GALA එක තත්පර කිහිපයකින්ම හරියටම ලගම තියෙන තැන කිව්වා.",
        name: "Nimal Perera",
        role: "Resident, Kurunegala Town",
    },
    {
        quote:
            "I listed my hardware shop and started getting walk-ins the same week. Updating my open status takes seconds.",
        name: "Samanthi Fernando",
        role: "Owner, Fernando Hardware",
    },
    {
        quote:
            "Searching in Sinhala just works. No more scrolling through outdated Facebook groups to find what's open.",
        name: "Ashan Jayasuriya",
        role: "University Student",
    },
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
