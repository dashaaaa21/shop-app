import mongoose from 'mongoose';

export const connectDB = async () => {
  // MongoDB is optional - only connect if MONGODB_URI is provided
  if (!process.env.MONGODB_URI) {
    console.log('⚠️  MongoDB URI not provided - using Supabase only');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️  MongoDB connection failed (non-blocking): ${error.message}`);
    console.log('Continuing without MongoDB - using Supabase');
  }
};
