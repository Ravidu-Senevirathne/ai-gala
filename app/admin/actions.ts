"use server";

import { ADMIN_EMAIL, MIN_ADMIN_PASSWORD_LENGTH } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function adminAccountExists(): Promise<boolean> {
    const adminClient = createAdminClient();
    const { data, error } = await adminClient.auth.admin.listUsers();
    if (error) return false;
    return data.users.some((user) => user.email === ADMIN_EMAIL);
}

export async function setupAdminAccount(password: string): Promise<{ error?: string }> {
    const trimmed = password.trim();
    if (trimmed.length < MIN_ADMIN_PASSWORD_LENGTH) {
        return { error: `Password must be at least ${MIN_ADMIN_PASSWORD_LENGTH} characters.` };
    }

    const adminClient = createAdminClient();
    const { data: existing, error: listError } = await adminClient.auth.admin.listUsers();
    if (listError) {
        return { error: listError.message };
    }
    if (existing.users.some((user) => user.email === ADMIN_EMAIL)) {
        return { error: "An admin account already exists. Please sign in instead." };
    }

    const { error: createError } = await adminClient.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: trimmed,
        email_confirm: true,
        user_metadata: { role: "admin", full_name: "Admin" },
    });

    if (createError) {
        return { error: createError.message };
    }

    return loginAdminAccount(trimmed);
}

export async function loginAdminAccount(password: string): Promise<{ error?: string }> {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: password.trim(),
    });

    if (error) {
        return { error: "Incorrect admin password." };
    }

    return {};
}

export async function signOutAdmin(): Promise<void> {
    const supabase = await createClient();
    await supabase.auth.signOut();
}
