import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Explicitly load `.env.local` if not already loaded
dotenv.config({ path: '.env.local' });

const connectMongo = async () => {
  const mongoUri = process.env.MONGO_URI;

  // Debug the MONGO_URI value
  console.log('MONGO_URI:', mongoUri);

  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in .env file.');
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('MongoDB connection failed');
  }
};

export default connectMongo;
