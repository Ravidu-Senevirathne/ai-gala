-- AI-GALA core schema: profiles, categories, shops, discounts, jobs, chat history.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------
create table public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    role text not null default 'user' check (role in ('user', 'owner', 'admin')),
    full_name text,
    phone text,
    phone_verified boolean not null default false,
    shop_verification_code text,
    created_at timestamptz not null default now()
);

-- Auto-create a profile row whenever a new auth user signs up.
-- `role`, `full_name`, `phone` are read from signUp({ options: { data: {...} } }).
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.profiles (id, role, full_name, phone)
    values (
        new.id,
        coalesce(new.raw_user_meta_data ->> 'role', 'user'),
        new.raw_user_meta_data ->> 'full_name',
        new.raw_user_meta_data ->> 'phone'
    );
    return new;
end;
$$;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------
-- categories
-- ---------------------------------------------------------------------
create table public.categories (
    id uuid primary key default gen_random_uuid(),
    name text not null unique,
    icon text not null,
    slug text not null unique
);

-- ---------------------------------------------------------------------
-- shops
-- ---------------------------------------------------------------------
create table public.shops (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid references public.profiles (id) on delete set null,
    name text not null,
    category_id uuid references public.categories (id) on delete set null,
    district text not null default 'Kurunegala',
    address text,
    lat double precision,
    lng double precision,
    price_range_min int,
    price_range_max int,
    status text not null default 'closed' check (status in ('open', 'closed', 'busy')),
    hours jsonb,
    phone text,
    description text,
    is_active boolean not null default true,
    created_at timestamptz not null default now()
);

create index shops_category_id_idx on public.shops (category_id);
create index shops_district_idx on public.shops (district);
create index shops_is_active_idx on public.shops (is_active);
create index shops_owner_id_idx on public.shops (owner_id);

-- ---------------------------------------------------------------------
-- discounts
-- ---------------------------------------------------------------------
create table public.discounts (
    id uuid primary key default gen_random_uuid(),
    shop_id uuid not null references public.shops (id) on delete cascade,
    title text not null,
    offer text not null,
    meta text,
    valid_until timestamptz,
    is_active boolean not null default true
);

create index discounts_shop_id_idx on public.discounts (shop_id);

-- ---------------------------------------------------------------------
-- jobs
-- ---------------------------------------------------------------------
create table public.jobs (
    id uuid primary key default gen_random_uuid(),
    shop_id uuid references public.shops (id) on delete set null,
    posted_by uuid references public.profiles (id) on delete set null,
    title text not null,
    field text not null,
    district text not null default 'Kurunegala',
    salary_min int,
    salary_max int,
    description text,
    requirements text,
    is_active boolean not null default true,
    created_at timestamptz not null default now()
);

create index jobs_field_idx on public.jobs (field);
create index jobs_district_idx on public.jobs (district);
create index jobs_is_active_idx on public.jobs (is_active);
create index jobs_shop_id_idx on public.jobs (shop_id);

-- ---------------------------------------------------------------------
-- chat history (optional persistence for /api/chat)
-- ---------------------------------------------------------------------
create table public.chat_conversations (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.profiles (id) on delete cascade,
    created_at timestamptz not null default now()
);

create table public.chat_messages (
    id uuid primary key default gen_random_uuid(),
    conversation_id uuid not null references public.chat_conversations (id) on delete cascade,
    role text not null check (role in ('user', 'assistant')),
    content text not null,
    created_at timestamptz not null default now()
);

create index chat_messages_conversation_id_idx on public.chat_messages (conversation_id);
