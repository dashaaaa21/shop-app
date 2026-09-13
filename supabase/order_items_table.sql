-- ══════════════════════════════════════════════════════════════
-- Order Items table for Supabase
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ══════════════════════════════════════════════════════════════

create table if not exists public.order_items (
  id              uuid primary key default gen_random_uuid(),
  order_id        uuid not null references public.orders(id) on delete cascade,
  product_id      uuid not null references public.products(id) on delete cascade,
  
  -- Product snapshot at time of order
  product_name    text not null,
  product_image   text default null,
  
  quantity        integer not null default 1 check (quantity > 0),
  price           numeric(10,2) not null check (price >= 0),
  
  created_at      timestamptz not null default now()
);

-- Indexes for performance
create index if not exists idx_order_items_order_id     on public.order_items (order_id);
create index if not exists idx_order_items_product_id  on public.order_items (product_id);

-- Row Level Security: users can view order items through their orders
alter table public.order_items enable row level security;

drop policy if exists "Users can view own order items" on public.order_items;
create policy "Users can view own order items"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

drop policy if exists "Service role can manage order items" on public.order_items;
create policy "Service role can manage order items"
  on public.order_items for all
  using (auth.role() = 'service_role');

-- Comments for documentation
comment on table public.order_items is 'Individual items within an order with product snapshots';
comment on column public.order_items.order_id is 'References orders(id) - parent order';
comment on column public.order_items.product_id is 'References products(id) - product at time of order';
comment on column public.order_items.product_name is 'Product name snapshot at time of order';
comment on column public.order_items.product_image is 'Product image URL snapshot at time of order';
comment on column public.order_items.quantity is 'Quantity ordered';
comment on column public.order_items.price is 'Price per item at time of order';
