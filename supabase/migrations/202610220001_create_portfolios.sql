create extension if not exists pgcrypto;

create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 120),
  description text not null check (char_length(description) between 1 and 3000),
  work_date date not null,
  location text not null check (char_length(location) between 1 and 200),
  image_path text not null,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now()
);

alter table public.portfolios enable row level security;

create policy "Public can view portfolios"
on public.portfolios
for select
to anon, authenticated
using (true);

create policy "Admins can create portfolios"
on public.portfolios
for insert
to authenticated
with check (
  auth.uid() = created_by
  and auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-images',
  'portfolio-images',
  true,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public can view portfolio images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'portfolio-images');

create policy "Admins can upload portfolio images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'portfolio-images'
  and auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
);

