import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '@/lib/db'; // Ensure this points to your MongoDB connection file
import UserProfile from '@/models/UserProfile'; // Ensure the path matches your UserProfile model

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query; // Extract the user profile ID from the URL
  const { keywords, following } = req.body; // Expect keywords and following to be in the request body

  try {
    // Connect to MongoDB
    await connectMongo();

    // Find and update the profile
    const updatedProfile = await UserProfile.findByIdAndUpdate(
      id,
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
}
