export type NavigationLink = {
    label: string;
    href: string;
};

export type FeatureCard = {
    title: string;
    description: string;
};

export type ChatSuggestionChip = {
    label: string;
    tone?: "budget" | "status" | "urgency";
};

export type MarqueeDeal = {
    brand: string;
    title: string;
    offer: string;
    meta: string;
};

export type StepCard = {
    title: string;
    description: string;
};

export type ShopCard = {
    name: string;
    status: string;
    note: string;
};

export type CategoryCard = {
    icon: string;
    name: string;
    image: string;
};

export type StatItem = {
    value: string;
    label: string;
};

export type Testimonial = {
    quote: string;
    name: string;
    role: string;
};
