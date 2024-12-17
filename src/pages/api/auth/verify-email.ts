import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '@/lib/db';
import TemporaryUser from '@/models/TemporaryUser';
import User from '@/models/User';
import UserProfile from '@/models/UserProfile';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API Endpoint Hit: /api/verify-email');
  console.log('Request Method:', req.method);

  try {
    await connectMongo();
    console.log('Connected to MongoDB');

    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    // Find the temporary user by token
    const tempUser = await TemporaryUser.findOne({ verificationToken: token });

    if (!tempUser) {
      return res.status(404).json({ message: 'Invalid or expired verification token' });
    }

    const existingUser = await User.findOne({ email: tempUser.email });

    // If the user already exists, update their isVerified status
    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ message: 'Email already verified' });
      }

      existingUser.isVerified = true;
      await existingUser.save();

      // Clean up temporary user
      await TemporaryUser.deleteOne({ email: tempUser.email });

      return res.status(200).json({ message: 'Email verified successfully' });
    }

    // If user doesn't exist, create a new user and profile
    const newUser = await User.create({
      email: tempUser.email,
      password: tempUser.password, // Should already be hashed
      isVerified: true,
    });

    await UserProfile.create({
      userId: newUser._id,
      firstName: tempUser.first_name,   // Map to camelCase
      lastName: tempUser.last_name,
      username: tempUser.username,
      yearLevel: tempUser.year_level,
      faculty: tempUser.faculty,
      keywords: tempUser.keywords,
      following: tempUser.following,
      profilePicture: tempUser.profile_picture,
    });
    

    // Clean up temporary user
    await TemporaryUser.deleteOne({ email: tempUser.email });

    return res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error in email verification endpoint:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
