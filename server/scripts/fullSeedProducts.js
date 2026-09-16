#!/usr/bin/env node

import { supabaseAdmin } from '../src/config/supabase.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

// Transform camelCase to snake_case for Supabase
const transformProduct = (product) => ({
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

// All products from products.data.ts
const allProducts = [
  // WOMEN PRODUCTS
  { id: 'w1', name: 'Elegant Silk Blouse', price: 189, discountPrice: 149, images: ['https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=1000&fit=crop&q=85'], category: 'Blouses', gender: 'women', isNewArrival: true, isFeatured: true, description: 'A timeless silk blouse crafted from the finest 100% pure silk. The fluid drape and lustrous finish make it perfect for both day-to-night dressing. Features mother-of-pearl buttons and a relaxed, elegant cut that flatters every silhouette.', stock: 12, rating: 4.8, specifications: { Material: '100% Pure Silk', Fit: 'Relaxed', Care: 'Dry clean only', Origin: 'Made in Italy', Closure: 'Mother-of-pearl buttons' } },
  { id: 'w2', name: 'Luxe Cashmere Cardigan', price: 299, images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=1000&fit=crop&q=85'], category: 'Knitwear', gender: 'women', isNewArrival: true, isFeatured: true, description: 'Indulge in pure luxury with this fine-gauge cashmere cardigan. Sourced from the finest Mongolian cashmere, it offers unmatched softness and warmth. The classic open-front design pairs effortlessly with everything in your wardrobe.', stock: 8, rating: 4.9, specifications: { Material: '100% Grade-A Cashmere', Gauge: 'Fine (12 GG)', Care: 'Hand wash cold', Origin: 'Made in Scotland', Closure: 'Open front' } },
  { id: 'w3', name: 'Tailored Wool Blazer', price: 359, images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop&q=85'], category: 'Outerwear', gender: 'women', isNewArrival: false, isFeatured: true, description: 'A sharp, contemporary blazer cut from premium Italian wool. The slim-fit silhouette features strong shoulders, a single-button closure, and clean lines that transition seamlessly from office to evening.', stock: 15, rating: 4.7, specifications: { Material: '100% Italian Wool', Fit: 'Slim fit', Care: 'Dry clean only', Origin: 'Made in Italy', Closure: 'Single button' } },
  { id: 'w4', name: 'Cashmere Turtleneck Dress', price: 349, discountPrice: 279, images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1000&fit=crop&q=85'], category: 'Dresses', gender: 'women', isNewArrival: true, isFeatured: true, description: 'The dress that replaces everything else. Knitted in a fine-gauge cashmere with a flattering long silhouette, this turtleneck dress is cut slightly fitted through the body and flows to a midi length. Wear with knee-high boots for an effortlessly polished look.', stock: 7, rating: 4.9, specifications: { Material: '100% Grade-A Cashmere', Gauge: 'Fine (12 GG)', Length: 'Midi', Care: 'Dry clean only', Neckline: 'Roll neck' } },
  { id: 'w5', name: 'Pleated Midi Skirt', price: 159, images: ['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&h=1000&fit=crop&q=85'], category: 'Skirts', gender: 'women', isNewArrival: true, isFeatured: false, description: 'A flowing pleated midi skirt in premium fabric. Perfect for both casual and formal occasions.', stock: 20, rating: 4.6, specifications: { Material: '100% Polyester', Length: 'Midi', Care: 'Machine wash', Fit: 'A-line' } },
  { id: 'w6', name: 'Leather Ankle Boots', price: 249, discountPrice: 199, images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=1000&fit=crop&q=85'], category: 'Shoes', gender: 'women', isNewArrival: false, isFeatured: true, description: 'Premium leather ankle boots with comfortable heel. Versatile design for everyday wear.', stock: 15, rating: 4.8, specifications: { Material: 'Genuine Leather', Heel: '5cm', Care: 'Leather care', Origin: 'Made in Spain' } },

  // MEN PRODUCTS
  { id: 'm1', name: 'Tailored Wool Suit', price: 599, discountPrice: 499, images: ['https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=600&fit=crop&q=80'], category: 'Suits', gender: 'men', isNewArrival: true, isFeatured: true, description: 'A masterpiece of modern tailoring. This two-piece suit is crafted from a Super 120s wool, offering an exceptionally smooth hand feel and natural drape. The slim-fit silhouette is cut to flatter without restricting movement — ideal for both boardroom and formal occasions.', stock: 8, rating: 4.9, specifications: { Material: '100% Super 120s Wool', Lining: '100% Viscose', Fit: 'Slim fit', Care: 'Dry clean only', Origin: 'Made in Italy' } },
  { id: 'm2', name: 'Premium Oxford Shirt', price: 129, images: ['https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&h=600&fit=crop&q=80'], category: 'Shirts', gender: 'men', isNewArrival: true, isFeatured: true, description: 'The cornerstone of any well-dressed gentleman\'s wardrobe. Woven from a two-ply Oxford cotton, this shirt offers a subtle texture and exceptional durability. The classic fit allows for comfortable layering under a blazer or wearing alone.', stock: 22, rating: 4.7, specifications: { Material: '100% Two-ply Oxford Cotton', Fit: 'Classic fit', Care: 'Machine wash 40°C', Collar: 'Button-down', Origin: 'Made in Portugal' } },
  { id: 'm3', name: 'Leather Derby Shoes', price: 279, images: ['https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=600&fit=crop&q=80'], category: 'Shoes', gender: 'men', isNewArrival: true, isFeatured: false, description: 'Classic leather derby shoes with modern comfort. Perfect for formal and business casual settings.', stock: 18, rating: 4.8, specifications: { Material: 'Full Grain Leather', Sole: 'Rubber', Care: 'Polish regularly', Origin: 'Made in Italy' } },
  { id: 'm4', name: 'Cashmere V-Neck Sweater', price: 219, discountPrice: 179, images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&q=80'], category: 'Knitwear', gender: 'men', isNewArrival: true, isFeatured: true, description: 'Luxurious cashmere sweater with classic V-neck design. Soft, warm, and sophisticated.', stock: 12, rating: 4.9, specifications: { Material: '100% Cashmere', Fit: 'Regular', Care: 'Dry clean', Origin: 'Made in Scotland' } },
  { id: 'm5', name: 'Slim Fit Chinos', price: 119, images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=600&fit=crop&q=80'], category: 'Trousers', gender: 'men', isNewArrival: false, isFeatured: false, description: 'Versatile slim fit chinos in premium cotton. Essential wardrobe staple.', stock: 25, rating: 4.6, specifications: { Material: '98% Cotton, 2% Elastane', Fit: 'Slim', Care: 'Machine wash', Length: 'Regular' } },

  // COLLECTION PRODUCTS (wc1-wc6, pc1-pc6, hc1-hc6)
  { id: 'wc1', name: 'Ivory Satin Bridal Gown', price: 1290, images: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop&q=90', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop&q=90'], category: 'Dresses', collection: 'wedding-collection', description: 'A timeless bridal gown in lustrous ivory satin. The structured bodice and fluid skirt create an effortlessly elegant silhouette for your most important day.', stock: 4, rating: 5.0, specifications: { Material: '100% Silk Satin', Length: 'Floor-length', Fit: 'Structured bodice, A-line skirt', Care: 'Dry clean only', Origin: 'Made in France' } }
];

async function seedProducts() {
  console.log('Starting product seeding with full dataset...');
  
  try {
    // Clear existing products
    console.log('Clearing existing products...');
    const { error: deleteError } = await supabaseAdmin
      .from('products')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
    
    if (deleteError && deleteError.code !== 'PGRST116') { // PGRST116 = no rows found, which is OK
      console.error('Error clearing products:', deleteError);
      return;
    }

    // Transform and insert products
    const transformedProducts = allProducts.map(transformProduct);
    
    console.log(`Inserting ${transformedProducts.length} products...`);
    
    const { data, error } = await supabaseAdmin
      .from('products')
      .insert(transformedProducts)
      .select('external_id');
        
    if (error) {
      console.error('Error inserting products:', error);
      return;
    }

    console.log(`Successfully inserted ${data.length} products!`);

    // Verify counts by type
    const { data: counts } = await supabaseAdmin
      .from('products')
      .select('gender, collection, external_id')
      .order('external_id');
      
    const women = counts?.filter(p => p.gender === 'women').length || 0;
    const men = counts?.filter(p => p.gender === 'men').length || 0; 
    const collections = counts?.filter(p => p.collection).length || 0;
    
    console.log('Summary:');
    console.log(`   - Women products: ${women}`);
    console.log(`   - Men products: ${men}`);
    console.log(`   - Collection products: ${collections}`);
    console.log(`   - Total: ${counts?.length || 0}`);
    
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