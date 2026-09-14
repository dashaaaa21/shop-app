/**
 * Seed script — uploads all products from client data to Supabase.
 * Run: node src/scripts/seedProducts.js
 */
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../../.env') });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

// ── Read products from the TS data file (transpiled to JSON inline) ──
// We define them directly here to avoid TS compilation in seed script

const womenProducts = JSON.parse(readFileSync(resolve(__dirname, './data/womenProducts.json'), 'utf-8'));
const menProducts = JSON.parse(readFileSync(resolve(__dirname, './data/menProducts.json'), 'utf-8'));
const collectionProducts = JSON.parse(readFileSync(resolve(__dirname, './data/collectionProducts.json'), 'utf-8'));

const mapProduct = (p, gender = null, collection = null) => ({
  external_id: p.id,
  name: p.name,
  price: p.price,
  discount_price: p.discountPrice ?? null,
  images: p.images,
  category: p.category,
  gender: gender ?? p.gender ?? null,
  collection: collection ?? p.collection ?? null,
  is_new_arrival: p.isNewArrival ?? false,
  is_featured: p.isFeatured ?? false,
  description: p.description,
  stock: p.stock,
  rating: p.rating,
  specifications: p.specifications ?? {},
});

const allProducts = [
  ...womenProducts.map((p) => mapProduct(p, 'women', null)),
  ...menProducts.map((p) => mapProduct(p, 'men', null)),
  ...collectionProducts.map((p) => mapProduct(p, null, p.collection)),
];

console.log(`Seeding ${allProducts.length} products...`);

const { data, error } = await supabase
  .from('products')
  .upsert(allProducts, { onConflict: 'external_id' })
  .select('id, external_id, name');

if (error) {
  console.error(' Seed error:', error.message);
  process.exit(1);
}

console.log(` Seeded ${data.length} products successfully`);
