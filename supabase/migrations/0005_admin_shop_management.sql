-- Admin shop management: per-shop menu/service items, social media links,
-- and admin-created shop listings (owner_id may be null).

-- ---------------------------------------------------------------------
-- shops: social media links
-- ---------------------------------------------------------------------
alter table public.shops
    add column social_links jsonb;

-- ---------------------------------------------------------------------
-- menu_items (menu entries / services & prices for a shop)
-- ---------------------------------------------------------------------
create table public.menu_items (
    id uuid primary key default gen_random_uuid(),
    shop_id uuid not null references public.shops (id) on delete cascade,
    name text not null,
    price numeric(10, 2),
    category text,
    description text,
    is_active boolean not null default true,
    created_at timestamptz not null default now()
);

create index menu_items_shop_id_idx on public.menu_items (shop_id);

alter table public.menu_items enable row level security;

create policy "Active menu items on active shops are publicly readable"
    on public.menu_items for select
    using (
        (is_active = true and exists (
            select 1 from public.shops
            where shops.id = menu_items.shop_id and shops.is_active = true
        ))
        or exists (
            select 1 from public.shops
            where shops.id = menu_items.shop_id and shops.owner_id = auth.uid()
        )
        or public.is_admin()
    );

create policy "Shop owners manage own menu items"
    on public.menu_items for all
    using (
        exists (
            select 1 from public.shops
            where shops.id = menu_items.shop_id and shops.owner_id = auth.uid()
        )
        or public.is_admin()
    )
    with check (
        exists (
            select 1 from public.shops
            where shops.id = menu_items.shop_id and shops.owner_id = auth.uid()
        )
        or public.is_admin()
    );

-- ---------------------------------------------------------------------
-- shops: allow admins to create listings on behalf of merchants
-- (owner_id can be left null until the merchant claims the listing).
-- ---------------------------------------------------------------------
drop policy "Owners can insert own shops" on public.shops;

create policy "Owners and admins can insert shops"
    on public.shops for insert
    with check (owner_id = auth.uid() or public.is_admin());
