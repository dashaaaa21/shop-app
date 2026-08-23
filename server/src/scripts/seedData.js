import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

dotenv.config();

const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports & Outdoors',
  'Toys & Games',
  'Health & Beauty',
  'Automotive',
  'Food & Beverage',
  'Office Supplies',
];

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality.',
    price: 149.99,
    discountPrice: 119.99,
    category: 'Electronics',
    stock: 50,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e'],
  },
  {
    name: 'Smart Watch Series 7',
    description: 'Advanced fitness tracking, heart rate monitoring, GPS, and water resistance up to 50m. Compatible with iOS and Android.',
    price: 399.99,
    category: 'Electronics',
    stock: 30,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30'],
  },
  {
    name: 'Premium Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe, brew strength control, and auto-shutoff feature.',
    price: 89.99,
    discountPrice: 69.99,
    category: 'Home & Garden',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6'],
  },
  {
    name: 'Yoga Mat Pro',
    description: 'Extra thick exercise mat with carrying strap, non-slip surface, and eco-friendly materials.',
    price: 34.99,
    category: 'Sports & Outdoors',
    stock: 100,
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f'],
  },
  {
    name: 'Leather Messenger Bag',
    description: 'Genuine leather laptop bag with multiple compartments, adjustable strap, and vintage style.',
    price: 129.99,
    discountPrice: 99.99,
    category: 'Clothing',
    stock: 40,
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62'],
  },
  {
    name: 'The Complete JavaScript Guide',
    description: 'Comprehensive guide to modern JavaScript, covering ES6+, async programming, and best practices.',
    price: 39.99,
    category: 'Books',
    stock: 75,
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f'],
  },
  {
    name: 'Wireless Gaming Mouse',
    description: 'High-precision gaming mouse with customizable RGB lighting, 16000 DPI, and programmable buttons.',
    price: 79.99,
    discountPrice: 59.99,
    category: 'Electronics',
    stock: 60,
    images: ['https://images.unsplash.com/photo-1527814050087-3793815479db'],
  },
  {
    name: 'Organic Green Tea Set',
    description: 'Premium organic green tea collection with 6 different flavors, 100% natural ingredients.',
    price: 24.99,
    category: 'Food & Beverage',
    stock: 150,
    images: ['https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9'],
  },
  {
    name: 'Professional Chef Knife Set',
    description: 'High-carbon stainless steel knife set with ergonomic handles and protective sheaths.',
    price: 159.99,
    discountPrice: 129.99,
    category: 'Home & Garden',
    stock: 35,
    images: ['https://images.unsplash.com/photo-1593618998160-e34014e67546'],
  },
  {
    name: 'Kids Building Blocks Set',
    description: 'Educational building blocks set with 500 pieces, compatible with major brands, encourages creativity.',
    price: 49.99,
    category: 'Toys & Games',
    stock: 80,
    images: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b'],
  },
  {
    name: 'Natural Skincare Gift Set',
    description: 'Luxury skincare collection with cleanser, toner, serum, and moisturizer. Paraben-free and cruelty-free.',
    price: 89.99,
    discountPrice: 69.99,
    category: 'Health & Beauty',
    stock: 45,
    images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571'],
  },
  {
    name: 'Car Phone Mount',
    description: 'Universal smartphone holder with 360-degree rotation and strong suction cup for dashboard mounting.',
    price: 19.99,
    category: 'Automotive',
    stock: 200,
    images: ['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b'],
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'Adjustable office chair with lumbar support, breathable mesh back, and smooth-rolling casters.',
    price: 249.99,
    discountPrice: 199.99,
    category: 'Office Supplies',
    stock: 20,
    images: ['https://images.unsplash.com/photo-1580480055273-228ff5388ef8'],
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof speaker with 360-degree sound, 12-hour battery life, and built-in microphone.',
    price: 69.99,
    category: 'Electronics',
    stock: 90,
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1'],
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof.',
    price: 29.99,
    category: 'Sports & Outdoors',
    stock: 120,
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8'],
  },
];

const sampleUsers = [
  {
    email: 'admin@shop.com',
    password: 'Admin123!',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
  },
  {
    email: 'customer@shop.com',
    password: 'Customer123!',
    firstName: 'John',
    lastName: 'Doe',
    role: 'customer',
  },
  {
    email: 'jane@example.com',
    password: 'Jane123!',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'customer',
  },
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Create users
    console.log('👥 Creating users...');
    const users = await User.create(sampleUsers);
    console.log(`✅ Created ${users.length} users\n`);

    // Create products
    console.log('📦 Creating products...');
    const products = await Product.create(sampleProducts);
    console.log(`✅ Created ${products.length} products\n`);

    // Create sample orders
    console.log('🛒 Creating sample orders...');
    const customer = users.find((u) => u.role === 'customer');
    
    const sampleOrders = [
      {
        userId: customer._id,
        items: [
          {
            product: products[0]._id,
            quantity: 1,
            price: products[0].discountPrice || products[0].price,
          },
          {
            product: products[6]._id,
            quantity: 2,
            price: products[6].discountPrice || products[6].price,
          },
        ],
        subtotal: 239.97,
        tax: 23.99,
        shipping: 0,
        total: 263.96,
        status: 'delivered',
        shippingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
          phone: '+1234567890',
        },
        paymentMethod: 'credit_card',
      },
    ];

    const orders = await Order.create(sampleOrders);
    console.log(`✅ Created ${orders.length} sample orders\n`);

    console.log('🎉 Database seeding completed successfully!\n');
    console.log('📋 Summary:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Products: ${products.length}`);
    console.log(`   Orders: ${orders.length}\n`);
    console.log('🔑 Test Credentials:');
    console.log('   Admin: admin@shop.com / Admin123!');
    console.log('   Customer: customer@shop.com / Customer123!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed
connectDB().then(() => seedDatabase());
