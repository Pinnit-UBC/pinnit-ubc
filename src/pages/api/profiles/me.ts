import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '@/lib/db';
import UserProfile from '@/models/UserProfile';
import { authenticateUser } from '@/lib/authMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo(); // Connect to MongoDB
  
  // Authenticate user
  await new Promise((resolve) => authenticateUser(req, res, resolve));
  const userId = (req as any).userId; // Extract the userId from the authenticated request

  if (req.method === 'GET') {
    // Fetch user profile
    try {
      const profile = await UserProfile.findOne({ userId });

      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      res.status(200).json(profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  } else if (req.method === 'PUT') {
    // Update user profile
    const { keywords, following } = req.body;

    try {
      const updatedProfile = await UserProfile.findOneAndUpdate(
        { userId },
        { keywords, following },
        { new: true } // Return the updated document
      );

      if (!updatedProfile) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      res.status(200).json(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ error: 'Method not allowed' });
  }
}
