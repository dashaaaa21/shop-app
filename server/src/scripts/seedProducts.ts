/**
 * Seed script — uploads all products to Supabase.
 * Run from /server: npx tsx src/scripts/seedProducts.ts
 */
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../../.env') });

// ── Import product data directly from client ──────────────────
const { womenProducts, menProducts, collectionProducts } = await import(
  resolve(__dirname, '../../../client/src/data/products.data.ts')
);

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

// ── Map to DB schema ──────────────────────────────────────────
const allProducts = [
  ...womenProducts.map((p: any) => ({
    external_id: p.id,
    name: p.name,
    price: p.price,
    discount_price: p.discountPrice ?? null,
    images: p.images,
    category: p.category,
    gender: 'women',
    collection: null,
    is_new_arrival: p.isNewArrival,
    is_featured: p.isFeatured,
    description: p.description,
    stock: p.stock,
    rating: p.rating,
    specifications: p.specifications ?? {},
  })),
  ...menProducts.map((p: any) => ({
    external_id: p.id,
    name: p.name,
    price: p.price,
    discount_price: p.discountPrice ?? null,
    images: p.images,
    category: p.category,
    gender: 'men',
    collection: null,
    is_new_arrival: p.isNewArrival,
    is_featured: p.isFeatured,
    description: p.description,
    stock: p.stock,
    rating: p.rating,
    specifications: p.specifications ?? {},
  })),
  ...collectionProducts.map((p: any) => ({
    external_id: p.id,
    name: p.name,
    price: p.price,
    discount_price: p.discountPrice ?? null,
    images: p.images,
    category: p.category,
    gender: null,
    collection: p.collection,
    is_new_arrival: false,
    is_featured: false,
    description: p.description,
    stock: p.stock,
    rating: p.rating,
    specifications: p.specifications ?? {},
  })),
];

console.log(`\nSeeding ${allProducts.length} products to Supabase...\n`);

// Upsert in batches of 20
const BATCH = 20;
let seeded = 0;

for (let i = 0; i < allProducts.length; i += BATCH) {
  const batch = allProducts.slice(i, i + BATCH);
  const { data, error } = await supabase
    .from('products')
    .upsert(batch, { onConflict: 'external_id' })
    .select('id, external_id, name');

  if (error) {
    console.error(`Error in batch ${i / BATCH + 1}:`, error.message);
    process.exit(1);
  }
  seeded += data?.length ?? 0;
  console.log(`  Batch ${i / BATCH + 1}: ${data?.length} products`);
}

console.log(`\nDone! Seeded ${seeded} products total.\n`);
