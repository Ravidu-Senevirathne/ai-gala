-- Shop listing extras: Google Maps location, Google review stats, and an
-- optional cover photo for each shop.

alter table public.shops
    add column google_location_url text,
    add column google_rating numeric(2, 1) check (google_rating is null or (google_rating >= 0 and google_rating <= 5)),
    add column google_review_count int check (google_review_count is null or google_review_count >= 0),
    add column cover_image_url text;

-- ---------------------------------------------------------------------
-- storage: shop cover photos (public bucket, uploaded via admin actions)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('shop-covers', 'shop-covers', true)
on conflict (id) do nothing;
