-- Allow shop owners (and admins) to add a new category from the shop
-- profile form when none of the existing categories fit their business.
-- New categories are publicly readable via the existing select policy,
-- so they immediately appear on the /categories page.

create policy "Owners can add categories"
    on public.categories for insert
    with check (
        exists (
            select 1 from public.profiles
            where profiles.id = auth.uid() and profiles.role in ('owner', 'admin')
        )
    );
