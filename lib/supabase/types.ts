export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type ShopStatus = "open" | "closed" | "busy";
export type ProfileRole = "user" | "owner" | "admin";

export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    role: ProfileRole;
                    full_name: string | null;
                    phone: string | null;
                    phone_verified: boolean;
                    shop_verification_code: string | null;
                    created_at: string;
                };
                Insert: {
                    id: string;
                    role?: ProfileRole;
                    full_name?: string | null;
                    phone?: string | null;
                    phone_verified?: boolean;
                    shop_verification_code?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    role?: ProfileRole;
                    full_name?: string | null;
                    phone?: string | null;
                    phone_verified?: boolean;
                    shop_verification_code?: string | null;
                    created_at?: string;
                };
                Relationships: [];
            };
            categories: {
                Row: {
                    id: string;
                    name: string;
                    icon: string;
                    slug: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    icon: string;
                    slug: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    icon?: string;
                    slug?: string;
                };
                Relationships: [];
            };
            shops: {
                Row: {
                    id: string;
                    owner_id: string | null;
                    name: string;
                    category_id: string | null;
                    district: string;
                    address: string | null;
                    lat: number | null;
                    lng: number | null;
                    price_range_min: number | null;
                    price_range_max: number | null;
                    status: ShopStatus;
                    hours: Json | null;
                    phone: string | null;
                    description: string | null;
                    social_links: Json | null;
                    google_location_url: string | null;
                    google_rating: number | null;
                    google_review_count: number | null;
                    cover_image_url: string | null;
                    is_active: boolean;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    owner_id?: string | null;
                    name: string;
                    category_id?: string | null;
                    district?: string;
                    address?: string | null;
                    lat?: number | null;
                    lng?: number | null;
                    price_range_min?: number | null;
                    price_range_max?: number | null;
                    status?: ShopStatus;
                    hours?: Json | null;
                    phone?: string | null;
                    description?: string | null;
                    social_links?: Json | null;
                    google_location_url?: string | null;
                    google_rating?: number | null;
                    google_review_count?: number | null;
                    cover_image_url?: string | null;
                    is_active?: boolean;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    owner_id?: string | null;
                    name?: string;
                    category_id?: string | null;
                    district?: string;
                    address?: string | null;
                    lat?: number | null;
                    lng?: number | null;
                    price_range_min?: number | null;
                    price_range_max?: number | null;
                    status?: ShopStatus;
                    hours?: Json | null;
                    phone?: string | null;
                    description?: string | null;
                    social_links?: Json | null;
                    google_location_url?: string | null;
                    google_rating?: number | null;
                    google_review_count?: number | null;
                    cover_image_url?: string | null;
                    is_active?: boolean;
                    created_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "shops_owner_id_fkey";
                        columns: ["owner_id"];
                        isOneToOne: false;
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "shops_category_id_fkey";
                        columns: ["category_id"];
                        isOneToOne: false;
                        referencedRelation: "categories";
                        referencedColumns: ["id"];
                    },
                ];
            };
            discounts: {
                Row: {
                    id: string;
                    shop_id: string;
                    title: string;
                    offer: string;
                    meta: string | null;
                    valid_until: string | null;
                    is_active: boolean;
                };
                Insert: {
                    id?: string;
                    shop_id: string;
                    title: string;
                    offer: string;
                    meta?: string | null;
                    valid_until?: string | null;
                    is_active?: boolean;
                };
                Update: {
                    id?: string;
                    shop_id?: string;
                    title?: string;
                    offer?: string;
                    meta?: string | null;
                    valid_until?: string | null;
                    is_active?: boolean;
                };
                Relationships: [
                    {
                        foreignKeyName: "discounts_shop_id_fkey";
                        columns: ["shop_id"];
                        isOneToOne: false;
                        referencedRelation: "shops";
                        referencedColumns: ["id"];
                    },
                ];
            };
            menu_items: {
                Row: {
                    id: string;
                    shop_id: string;
                    name: string;
                    price: number | null;
                    category: string | null;
                    description: string | null;
                    is_active: boolean;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    shop_id: string;
                    name: string;
                    price?: number | null;
                    category?: string | null;
                    description?: string | null;
                    is_active?: boolean;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    shop_id?: string;
                    name?: string;
                    price?: number | null;
                    category?: string | null;
                    description?: string | null;
                    is_active?: boolean;
                    created_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "menu_items_shop_id_fkey";
                        columns: ["shop_id"];
                        isOneToOne: false;
                        referencedRelation: "shops";
                        referencedColumns: ["id"];
                    },
                ];
            };
            jobs: {
                Row: {
                    id: string;
                    shop_id: string | null;
                    posted_by: string | null;
                    title: string;
                    field: string;
                    district: string;
                    salary_min: number | null;
                    salary_max: number | null;
                    description: string | null;
                    requirements: string | null;
                    is_active: boolean;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    shop_id?: string | null;
                    posted_by?: string | null;
                    title: string;
                    field: string;
                    district?: string;
                    salary_min?: number | null;
                    salary_max?: number | null;
                    description?: string | null;
                    requirements?: string | null;
                    is_active?: boolean;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    shop_id?: string | null;
                    posted_by?: string | null;
                    title?: string;
                    field?: string;
                    district?: string;
                    salary_min?: number | null;
                    salary_max?: number | null;
                    description?: string | null;
                    requirements?: string | null;
                    is_active?: boolean;
                    created_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "jobs_shop_id_fkey";
                        columns: ["shop_id"];
                        isOneToOne: false;
                        referencedRelation: "shops";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "jobs_posted_by_fkey";
                        columns: ["posted_by"];
                        isOneToOne: false;
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    },
                ];
            };
            chat_conversations: {
                Row: {
                    id: string;
                    user_id: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string | null;
                    created_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "chat_conversations_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    },
                ];
            };
            chat_messages: {
                Row: {
                    id: string;
                    conversation_id: string;
                    role: "user" | "assistant";
                    content: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    conversation_id: string;
                    role: "user" | "assistant";
                    content: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    conversation_id?: string;
                    role?: "user" | "assistant";
                    content?: string;
                    created_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "chat_messages_conversation_id_fkey";
                        columns: ["conversation_id"];
                        isOneToOne: false;
                        referencedRelation: "chat_conversations";
                        referencedColumns: ["id"];
                    },
                ];
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
        CompositeTypes: Record<string, never>;
    };
};
