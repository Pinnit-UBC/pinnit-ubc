import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '@/lib/db'; // Ensure this points to your MongoDB connection file
import UserProfile from '@/models/UserProfile'; // Ensure the path matches your UserProfile model

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Connect to MongoDB
    await connectMongo();

    // Fetch all profiles
    const profiles = await UserProfile.find({});
    res.status(200).json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
}
