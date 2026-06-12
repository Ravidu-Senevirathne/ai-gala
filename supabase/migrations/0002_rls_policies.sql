-- Row Level Security for AI-GALA tables.

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.shops enable row level security;
alter table public.discounts enable row level security;
alter table public.jobs enable row level security;
alter table public.chat_conversations enable row level security;
alter table public.chat_messages enable row level security;

-- security-definer helper to avoid recursive RLS lookups on profiles
create function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
    select exists (
        select 1 from public.profiles where id = auth.uid() and role = 'admin'
    );
$$;

-- ---------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------
create policy "Users can view own profile"
    on public.profiles for select
    using (auth.uid() = id or public.is_admin());

create policy "Users can update own profile"
    on public.profiles for update
    using (auth.uid() = id)
    with check (auth.uid() = id);

-- ---------------------------------------------------------------------
-- categories (public read-only)
-- ---------------------------------------------------------------------
create policy "Categories are publicly readable"
    on public.categories for select
    using (true);

-- ---------------------------------------------------------------------
-- shops
-- ---------------------------------------------------------------------
create policy "Active shops are publicly readable"
    on public.shops for select
    using (is_active = true or owner_id = auth.uid() or public.is_admin());

create policy "Owners can insert own shops"
    on public.shops for insert
    with check (owner_id = auth.uid());

create policy "Owners can update own shops"
    on public.shops for update
    using (owner_id = auth.uid() or public.is_admin())
    with check (owner_id = auth.uid() or public.is_admin());

create policy "Owners can delete own shops"
    on public.shops for delete
    using (owner_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------
-- discounts
-- ---------------------------------------------------------------------
create policy "Active discounts on active shops are publicly readable"
    on public.discounts for select
    using (
        (is_active = true and exists (
            select 1 from public.shops
            where shops.id = discounts.shop_id and shops.is_active = true
        ))
        or exists (
            select 1 from public.shops
            where shops.id = discounts.shop_id and shops.owner_id = auth.uid()
        )
        or public.is_admin()
    );

create policy "Shop owners manage own discounts"
    on public.discounts for all
    using (
        exists (
            select 1 from public.shops
            where shops.id = discounts.shop_id and shops.owner_id = auth.uid()
        )
        or public.is_admin()
    )
    with check (
        exists (
            select 1 from public.shops
            where shops.id = discounts.shop_id and shops.owner_id = auth.uid()
        )
        or public.is_admin()
    );

-- ---------------------------------------------------------------------
-- jobs
-- ---------------------------------------------------------------------
create policy "Active jobs are publicly readable"
    on public.jobs for select
    using (is_active = true or posted_by = auth.uid() or public.is_admin());

create policy "Owners can insert own jobs"
    on public.jobs for insert
    with check (posted_by = auth.uid());

create policy "Owners can update own jobs"
    on public.jobs for update
    using (posted_by = auth.uid() or public.is_admin())
    with check (posted_by = auth.uid() or public.is_admin());

create policy "Owners can delete own jobs"
    on public.jobs for delete
    using (posted_by = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------
-- chat history (owner-only)
-- ---------------------------------------------------------------------
create policy "Users manage own chat conversations"
    on public.chat_conversations for all
    using (user_id = auth.uid() or public.is_admin())
    with check (user_id = auth.uid());

create policy "Users manage own chat messages"
    on public.chat_messages for all
    using (
        exists (
            select 1 from public.chat_conversations
            where chat_conversations.id = chat_messages.conversation_id
              and (chat_conversations.user_id = auth.uid() or public.is_admin())
        )
    )
    with check (
        exists (
            select 1 from public.chat_conversations
            where chat_conversations.id = chat_messages.conversation_id
              and chat_conversations.user_id = auth.uid()
        )
    );
