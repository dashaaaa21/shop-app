#!/usr/bin/env node

import { supabaseAdmin } from '../src/config/supabase.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

console.log('Creating Supabase tables...\n');

// Read SQL files
const productsSQL = readFileSync(resolve(__dirname, '../../supabase/products_table.sql'), 'utf-8');
const cartSQL = readFileSync(resolve(__dirname, '../../supabase/cart_table.sql'), 'utf-8');
const ordersSQL = readFileSync(resolve(__dirname, '../../supabase/orders_table.sql'), 'utf-8');
const orderItemsSQL = readFileSync(resolve(__dirname, '../../supabase/order_items_table.sql'), 'utf-8');

async function createTables() {
  try {
    console.log('1. Creating products table...');
    const { error: productsError } = await supabaseAdmin.rpc('exec_sql', { sql: productsSQL });
    if (productsError) {
      console.error('❌ Products table error:', productsError.message);
    } else {
      console.log('✅ Products table created');
    }

    console.log('\n2. Creating cart_items table...');
    const { error: cartError } = await supabaseAdmin.rpc('exec_sql', { sql: cartSQL });
    if (cartError) {
      console.error('❌ Cart table error:', cartError.message);
    } else {
      console.log('✅ Cart table created');
    }

    console.log('\n3. Creating orders table...');
    const { error: ordersError } = await supabaseAdmin.rpc('exec_sql', { sql: ordersSQL });
    if (ordersError) {
      console.error('❌ Orders table error:', ordersError.message);
    } else {
      console.log('✅ Orders table created');
    }

    console.log('\n4. Creating order_items table...');
    const { error: orderItemsError } = await supabaseAdmin.rpc('exec_sql', { sql: orderItemsSQL });
    if (orderItemsError) {
      console.error('❌ Order items table error:', orderItemsError.message);
    } else {
      console.log('✅ Order items table created');
    }

    console.log('\n✨ All tables created successfully!');
    console.log('\nNext steps:');
    console.log('1. Go to Supabase Dashboard → SQL Editor');
    console.log('2. Run the SQL scripts manually from /supabase/*.sql files');
    console.log('   - products_table.sql');
    console.log('   - cart_table.sql');
    console.log('   - orders_table.sql');
    console.log('   - order_items_table.sql');
    
  } catch (error) {
    console.error('❌ Error creating tables:', error);
  }
}

createTables()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
