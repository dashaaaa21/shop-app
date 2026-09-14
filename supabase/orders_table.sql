-- ══════════════════════════════════════════════════════════════
-- Orders table for Supabase
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ══════════════════════════════════════════════════════════════

create table if not exists public.orders (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  
  status          text not null default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  
  subtotal        numeric(10,2) not null default 0,
  tax             numeric(10,2) not null default 0,
  shipping        numeric(10,2) not null default 0,
  total           numeric(10,2) not null default 0,
  
  shipping_address jsonb default null,
  payment_method   text default null,
  
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Indexes for performance
create index if not exists idx_orders_user_id     on public.orders (user_id);
create index if not exists idx_orders_status      on public.orders (status);
create index if not exists idx_orders_created_at  on public.orders (created_at);

-- Auto-update updated_at on row change
create or replace function public.set_orders_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_orders_updated_at on public.orders;
create trigger trg_orders_updated_at
  before update on public.orders
  for each row execute function public.set_orders_updated_at();

-- Row Level Security: users can only see their own orders
alter table public.orders enable row level security;

drop policy if exists "Users can view own orders" on public.orders;
create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

drop policy if exists "Service role can manage orders" on public.orders;
create policy "Service role can manage orders"
  on public.orders for all
  using (auth.role() = 'service_role');

-- Comments for documentation
comment on table public.orders is 'Customer orders with status and pricing';
comment on column public.orders.user_id is 'References auth.users(id) - customer who placed the order';
comment on column public.orders.status is 'Order status: pending, processing, shipped, delivered, cancelled';
comment on column public.orders.subtotal is 'Sum of item prices before tax and shipping';
comment on column public.orders.tax is 'Tax amount (typically 10%)';
comment on column public.orders.shipping is 'Shipping cost';
comment on column public.orders.total is 'Final total including tax and shipping';
comment on column public.orders.shipping_address is 'JSON object with delivery address details';
comment on column public.orders.payment_method is 'Payment method used (e.g., card, paypal)';
