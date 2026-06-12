export type SocialLinkKey = "facebook" | "instagram" | "tiktok" | "whatsapp" | "website";

export const SOCIAL_LINK_META: { key: SocialLinkKey; label: string; placeholder: string }[] = [
    { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/yourshop" },
    { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/yourshop" },
    { key: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@yourshop" },
    { key: "whatsapp", label: "WhatsApp", placeholder: "https://wa.me/94XXXXXXXXX" },
    { key: "website", label: "Website", placeholder: "https://yourshop.com" },
];

export function parseSocialLinks(value: unknown): Partial<Record<SocialLinkKey, string>> {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        return {};
    }

    const result: Partial<Record<SocialLinkKey, string>> = {};
    for (const meta of SOCIAL_LINK_META) {
        const raw = (value as Record<string, unknown>)[meta.key];
        if (typeof raw === "string" && raw.trim()) {
            result[meta.key] = raw.trim();
        }
    }
    return result;
}
