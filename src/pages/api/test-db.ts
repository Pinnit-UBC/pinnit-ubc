import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo();
    res.status(200).json({ message: 'MongoDB connection successful!' });
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    res.status(500).json({ error: 'Failed to connect to MongoDB' });
  }
}
