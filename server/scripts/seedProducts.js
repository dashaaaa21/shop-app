#!/usr/bin/env node

import { supabaseAdmin } from '../src/config/supabase.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

// ══════════════════════════════════════════════════════════════
// Product Data (from client/src/data/products.data.ts)
// ══════════════════════════════════════════════════════════════

// Convert camelCase to snake_case for Supabase
const transformProduct = (product, type = 'general') => ({
  external_id: product.id,
  name: product.name,
  price: product.price,
  discount_price: product.discountPrice || null,
  images: product.images,
  category: product.category,
  gender: product.gender || null,
  collection: product.collection || null,
  is_new_arrival: product.isNewArrival || false,
  is_featured: product.isFeatured || false,
  description: product.description,
  stock: product.stock,
  rating: product.rating,
  specifications: product.specifications
});

// Women Products (30 products w1-w30)
const womenProducts = [
  {
    id: 'w1', name: 'Elegant Silk Blouse', price: 189, discountPrice: 149,
    images: ['https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=1000&fit=crop&q=85'],
    category: 'Blouses', gender: 'women', isNewArrival: false, isFeatured: true,
    description: 'A timeless silk blouse crafted from the finest 100% pure silk. The fluid drape and lustrous finish make it perfect for both day-to-night dressing. Features mother-of-pearl buttons and a relaxed, elegant cut that flatters every silhouette.',
    stock: 12, rating: 4.8,
    specifications: { Material: '100% Pure Silk', Fit: 'Relaxed', Care: 'Dry clean only', Origin: 'Made in Italy', Closure: 'Mother-of-pearl buttons' }
  },
  {
    id: 'w2', name: 'Luxe Cashmere Cardigan', price: 299,
    images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=1000&fit=crop&q=85'],
    category: 'Knitwear', gender: 'women', isNewArrival: false, isFeatured: true,
    description: 'Indulge in pure luxury with this fine-gauge cashmere cardigan. Sourced from the finest Mongolian cashmere, it offers unmatched softness and warmth. The classic open-front design pairs effortlessly with everything in your wardrobe.',
    stock: 8, rating: 4.9,
    specifications: { Material: '100% Grade-A Cashmere', Gauge: 'Fine (12 GG)', Care: 'Hand wash cold', Origin: 'Made in Scotland', Closure: 'Open front' }
  },
  {
    id: 'w3', name: 'Tailored Wool Blazer', price: 359,
    images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop&q=85'],
    category: 'Outerwear', gender: 'women', isNewArrival: false, isFeatured: true,
    description: 'A sharp, contemporary blazer cut from premium Italian wool. The slim-fit silhouette features strong shoulders, a single-button closure, and clean lines that transition seamlessly from office to evening.',
    stock: 15, rating: 4.7,
    specifications: { Material: '100% Italian Wool', Fit: 'Slim fit', Care: 'Dry clean only', Origin: 'Made in Italy', Closure: 'Single button' }
  },
  {
    id: 'w4', name: 'Cashmere Turtleneck Dress', price: 349, discountPrice: 279,
    images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1000&fit=crop&q=85'],
    category: 'Dresses', gender: 'women', isNewArrival: false, isFeatured: true,
    description: 'The dress that replaces everything else. Knitted in a fine-gauge cashmere with a flattering long silhouette, this turtleneck dress is cut slightly fitted through the body and flows to a midi length. Wear with knee-high boots for an effortlessly polished look.',
    stock: 7, rating: 4.9,
    specifications: { Material: '100% Grade-A Cashmere', Gauge: 'Fine (12 GG)', Length: 'Midi', Care: 'Dry clean only', Neckline: 'Roll neck' }
  },
  // Add remaining women products (w5-w30) - truncated for space
];

// Men Products (42 products m1-m42) 
const menProducts = [
  {
    id: 'm1', name: 'Tailored Wool Suit', price: 599, discountPrice: 499,
    images: ['https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=600&fit=crop&q=80'],
    category: 'Suits', gender: 'men', isNewArrival: false, isFeatured: true,
    description: 'A masterpiece of modern tailoring. This two-piece suit is crafted from a Super 120s wool, offering an exceptionally smooth hand feel and natural drape.',
    stock: 8, rating: 4.9,
    specifications: { Material: '100% Super 120s Wool', Lining: '100% Viscose', Fit: 'Slim fit', Care: 'Dry clean only', Origin: 'Made in Italy' }
  },
  {
    id: 'm2', name: 'Premium Oxford Shirt', price: 129,
    images: ['https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&h=600&fit=crop&q=80'],
    category: 'Shirts', gender: 'men', isNewArrival: false, isFeatured: true,
    description: 'The cornerstone of any well-dressed gentleman\'s wardrobe. Woven from a two-ply Oxford cotton, this shirt offers a subtle texture and exceptional durability.',
    stock: 22, rating: 4.7,
    specifications: { Material: '100% Two-ply Oxford Cotton', Fit: 'Classic fit', Care: 'Machine wash 40°C', Collar: 'Button-down', Origin: 'Made in Portugal' }
  },
  // Add remaining men products (m3-m42) - truncated for space
];

// Collection Products (18 products: wc1-wc6, pc1-pc6, hc1-hc6)
const collectionProducts = [
  {
    id: 'wc1', name: 'Ivory Satin Bridal Gown', price: 1290,
    images: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop&q=90'],
    category: 'Dresses', collection: 'wedding-collection',
    description: 'A timeless bridal gown in lustrous ivory satin. The structured bodice and fluid skirt create an effortlessly elegant silhouette.',
    stock: 4, rating: 5.0,
    specifications: { Material: '100% Silk Satin', Length: 'Floor-length', Fit: 'Structured bodice, A-line skirt', Care: 'Dry clean only', Origin: 'Made in France' }
  },
  // Add remaining collection products - truncated for space
];

// ══════════════════════════════════════════════════════════════
// Seed Function
// ══════════════════════════════════════════════════════════════

async function seedProducts() {
  console.log('Starting product seeding...');
  
  try {
    // Clear existing products
    console.log('Clearing existing products...');
    const { error: deleteError } = await supabaseAdmin
      .from('products')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
    
    if (deleteError) {
      console.error('Error clearing products:', deleteError);
      return;
    }

    // Prepare all products for insertion
    const allProducts = [
      ...womenProducts.map(p => transformProduct(p, 'women')),
      ...menProducts.map(p => transformProduct(p, 'men')),
      ...collectionProducts.map(p => transformProduct(p, 'collection'))
    ];

    console.log(`Inserting ${allProducts.length} products...`);
    
    // Insert in batches of 50 to avoid payload limits
    const batchSize = 50;
    for (let i = 0; i < allProducts.length; i += batchSize) {
      const batch = allProducts.slice(i, i + batchSize);
      
      const { data, error } = await supabaseAdmin
        .from('products')
        .insert(batch)
        .select('external_id');
        
      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
        return;
      }
      
      console.log(`Inserted batch ${i / batchSize + 1}: ${data.length} products`);
    }

    // Verify insertion
    const { count, error: countError } = await supabaseAdmin
      .from('products')
      .select('*', { count: 'exact' });
      
    if (countError) {
      console.error('Error counting products:', countError);
      return;
    }

    console.log(`Successfully seeded ${count} products!`);
    console.log('Summary:');
    console.log(`   - Women products: ${womenProducts.length}`);
    console.log(`   - Men products: ${menProducts.length}`);
    console.log(`   - Collection products: ${collectionProducts.length}`);
    console.log(`   - Total: ${allProducts.length}`);
    
  } catch (error) {
    console.error('Seed failed:', error);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedProducts()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { seedProducts };