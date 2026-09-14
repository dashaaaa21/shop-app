-- ══════════════════════════════════════════════════════════════
-- Cart table for Supabase - User-specific shopping carts
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ══════════════════════════════════════════════════════════════

create table if not exists public.cart_items (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  product_id      uuid not null references public.products(id) on delete cascade,
  external_product_id text not null,                     -- 'w1', 'm3' for compatibility
  
  -- Product snapshot at time of adding to cart
  product_name    text not null,
  product_price   numeric(10,2) not null,
  product_discount_price numeric(10,2) default null,
  product_image   text not null,
  product_category text not null,
  
  quantity        integer not null default 1 check (quantity > 0),
  
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Unique constraint: one user can have only one cart item per product
create unique index if not exists idx_cart_user_product 
  on public.cart_items (user_id, product_id);

-- Indexes for performance
create index if not exists idx_cart_user_id     on public.cart_items (user_id);
create index if not exists idx_cart_product_id  on public.cart_items (product_id);
create index if not exists idx_cart_created_at  on public.cart_items (created_at);

-- Auto-update updated_at on row change
create or replace function public.set_cart_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_cart_items_updated_at on public.cart_items;
create trigger trg_cart_items_updated_at
  before update on public.cart_items
  for each row execute function public.set_cart_updated_at();

-- Row Level Security: users can only see/modify their own cart items
alter table public.cart_items enable row level security;

drop policy if exists "Users can view own cart items" on public.cart_items;
create policy "Users can view own cart items"
  on public.cart_items for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own cart items" on public.cart_items;
create policy "Users can insert own cart items"
  on public.cart_items for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own cart items" on public.cart_items;
create policy "Users can update own cart items"
  on public.cart_items for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own cart items" on public.cart_items;
create policy "Users can delete own cart items"
  on public.cart_items for delete
  using (auth.uid() = user_id);

-- Helper view for easy cart querying with totals
create or replace view public.user_cart_summary as
select 
  user_id,
  count(*) as items_count,
  sum(quantity) as total_quantity,
  sum(
    case 
      when product_discount_price is not null 
      then product_discount_price * quantity
      else product_price * quantity
    end
  ) as subtotal,
  -- Tax calculation (10%)
  round(
    sum(
      case 
        when product_discount_price is not null 
        then product_discount_price * quantity
        else product_price * quantity
      end
    ) * 0.10, 2
  ) as tax,
  -- Shipping (free over 150€, otherwise 8€)
  case 
    when sum(
      case 
        when product_discount_price is not null 
        then product_discount_price * quantity
        else product_price * quantity
      end
    ) >= 150 then 0
    else 8
  end as shipping,
  -- Total with tax and shipping
  round(
    sum(
      case 
        when product_discount_price is not null 
        then product_discount_price * quantity
        else product_price * quantity
      end
    ) * 1.10 + 
    case 
      when sum(
        case 
          when product_discount_price is not null 
          then product_discount_price * quantity
          else product_price * quantity
        end
      ) >= 150 then 0
      else 8
    end, 2
  ) as total
from public.cart_items
group by user_id;

-- Grant access to the view
grant select on public.user_cart_summary to authenticated;

-- Comments for documentation
comment on table public.cart_items is 'User-specific shopping cart items with product snapshots';
comment on column public.cart_items.user_id is 'References auth.users(id) - owner of the cart item';
comment on column public.cart_items.product_id is 'References products(id) - current product UUID';
comment on column public.cart_items.external_product_id is 'Product external_id like w1, m3 for compatibility';
comment on column public.cart_items.product_name is 'Product name snapshot at time of adding to cart';
comment on column public.cart_items.product_price is 'Original product price snapshot';
comment on column public.cart_items.product_discount_price is 'Discount price snapshot if applicable';
comment on column public.cart_items.product_image is 'Main product image URL snapshot';
comment on column public.cart_items.quantity is 'Number of items in cart (minimum 1)';