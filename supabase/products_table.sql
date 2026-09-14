-- ══════════════════════════════════════════════════════════════
-- Products table for Supabase
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ══════════════════════════════════════════════════════════════

create table if not exists public.products (
  id              uuid primary key default gen_random_uuid(),
  external_id     text unique not null,           -- original id: 'w1', 'm3', 'wc1' etc.
  name            text not null,
  price           numeric(10,2) not null,
  discount_price  numeric(10,2) default null,
  images          text[] not null default '{}',
  category        text not null,
  gender          text check (gender in ('women','men')) default null,
  collection      text default null,              -- 'wedding-collection' | 'party-collection' | 'halloween-collection'
  is_new_arrival  boolean not null default false,
  is_featured     boolean not null default false,
  description     text not null default '',
  stock           integer not null default 0,
  rating          numeric(3,1) default null,
  specifications  jsonb not null default '{}',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Index for common query patterns
create index if not exists idx_products_gender       on public.products (gender);
create index if not exists idx_products_category     on public.products (category);
create index if not exists idx_products_collection   on public.products (collection);
create index if not exists idx_products_is_featured  on public.products (is_featured);
create index if not exists idx_products_is_new       on public.products (is_new_arrival);
create index if not exists idx_products_price        on public.products (price);
create index if not exists idx_products_external_id  on public.products (external_id);

-- Auto-update updated_at on row change
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- Row Level Security: public read, no anonymous writes
alter table public.products enable row level security;

drop policy if exists "Products are publicly readable" on public.products;
create policy "Products are publicly readable"
  on public.products for select
  using (true);

-- (Optional) Allow service role full access — needed by the Express server
-- The service role key bypasses RLS by default, so no extra policy needed.
