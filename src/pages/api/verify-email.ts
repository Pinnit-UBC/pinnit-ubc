import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import connectMongo from '@/lib/db';
import TemporaryUser from '@/models/TemporaryUser';
import User from '@/models/User';
import UserProfile from '@/models/UserProfile';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API Endpoint Hit: /api/verify-email');
  console.log('Request Method:', req.method);

  try {
    // Ensure this is a GET request
    if (req.method !== 'GET') {
      console.log('Invalid method:', req.method);
      return res.setHeader('Allow', ['GET']).status(405).json({
        error: `Method ${req.method} not allowed.`,
      });
    }

    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await connectMongo();

    const { token } = req.query;

    // Token validation
    if (!token || typeof token !== 'string') {
      console.log('Missing or invalid token.');
      return res.status(400).json({ error: 'Invalid or missing verification token' });
    }

    console.log('Finding temporary user...');
    const tempUser = await TemporaryUser.findOne({ verificationToken: { $exists: true } });
    console.log('Temporary User Found:', tempUser);

    if (!tempUser) {
      console.log('Token expired or user not found.');
      return res.status(404).json({ error: 'Invalid or expired verification token' });
    }

    // Compare tokens securely
    const isTokenValid = await bcrypt.compare(token, tempUser.verificationToken);
    if (!isTokenValid) {
      console.log('Invalid token.');
      return res.status(400).json({ error: 'Invalid or expired verification token' });
    }

    // Create a new User document
    console.log('Creating new user...');
    const newUser = await User.create({
      email: tempUser.email,
      password: tempUser.password,
      isVerified: true,
    });

    // Create a user profile
    console.log('Creating user profile...');
    const userProfile = await UserProfile.create({
      userId: newUser._id,
      firstName: tempUser.first_name,   // Correct snake_case mapping
      lastName: tempUser.last_name,
      username: tempUser.username,
      yearLevel: tempUser.year_level,
      faculty: tempUser.faculty,
      keywords: tempUser.keywords || [],
      following: tempUser.following || [],
      profilePicture: tempUser.profile_picture || null,
    });

    console.log('User profile created:', userProfile);

    // Delete the temporary user
    console.log('Deleting temporary user...');
    await TemporaryUser.deleteOne({ _id: tempUser._id });

    console.log('Email verified successfully.');
    return res.status(200).json({ message: 'Email verified successfully.' });
  } catch (error) {
    console.error('Error in email verification:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
