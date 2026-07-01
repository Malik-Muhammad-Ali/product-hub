-- Product Hub — blogs table, RLS, storage policies.
-- Paste this whole file into the Supabase Dashboard SQL Editor and run once.

create extension if not exists "pgcrypto";

create table public.blogs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  images jsonb not null,
  external_link text not null,
  price numeric(12, 2),
  currency text not null default 'USD',
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint blogs_title_not_blank check (btrim(title) <> ''),
  constraint blogs_description_not_blank check (btrim(description) <> ''),
  constraint blogs_external_link_not_blank check (btrim(external_link) <> ''),
  constraint blogs_images_is_array check (jsonb_typeof(images) = 'array'),
  constraint blogs_images_min_two check (jsonb_array_length(images) >= 2),
  constraint blogs_price_nonnegative check (price is null or price >= 0)
);

comment on table public.blogs is 'Blog posts for Product Hub, admin-managed via Supabase Auth.';
comment on column public.blogs.images is 'Array of {url, alt, width, height} matching the PostImage shape.';

create index blogs_created_at_idx on public.blogs (created_at desc);
create index blogs_featured_idx on public.blogs (featured) where featured = true;

-- Keep updated_at current on every row update.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger blogs_set_updated_at
  before update on public.blogs
  for each row
  execute function public.set_updated_at();

-- Row Level Security: public read, single-admin write.
alter table public.blogs enable row level security;

create policy "blogs_select_public"
  on public.blogs
  for select
  to anon, authenticated
  using (true);

-- Writes are scoped to the one admin account by email, not a blanket
-- "any authenticated user" policy — Supabase projects allow public signup
-- by default, and the anon key is public by design, so a blanket policy
-- would let anyone who signs up write to the table.
create policy "blogs_insert_admin_only"
  on public.blogs
  for insert
  to authenticated
  with check ((auth.jwt() ->> 'email') = 'admin@gmail.com');

create policy "blogs_update_admin_only"
  on public.blogs
  for update
  to authenticated
  using ((auth.jwt() ->> 'email') = 'admin@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'admin@gmail.com');

create policy "blogs_delete_admin_only"
  on public.blogs
  for delete
  to authenticated
  using ((auth.jwt() ->> 'email') = 'admin@gmail.com');

-- Storage policies for the 'blog-images' bucket.
-- The bucket itself is created via the Storage API in scripts/create-admin.mjs
-- (a REST call, not DDL) — these policies just need to exist ahead of time.
create policy "blog_images_select_public"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'blog-images');

create policy "blog_images_insert_admin_only"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'blog-images'
    and (auth.jwt() ->> 'email') = 'admin@gmail.com'
  );

create policy "blog_images_delete_admin_only"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'blog-images'
    and (auth.jwt() ->> 'email') = 'admin@gmail.com'
  );
