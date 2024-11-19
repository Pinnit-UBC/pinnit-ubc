import bcrypt from 'bcrypt';
import connectMongo from '@/lib/db';
import User from '@/models/User';
import UserProfile from '@/models/UserProfile';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function registerHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    yearLevel,
    faculty,
    eventCategories,
    preferredEventDays,
    clubsOrganizations,
  } = req.body;

  if (!email || !password || !confirmPassword || !firstName || !lastName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    await connectMongo();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    // Create user profile
    const userProfile = await UserProfile.create({
      userId: user._id,
      firstName,
      lastName,
      yearLevel,
      faculty,
      eventCategories,
      preferredEventDays,
      clubsOrganizations,
    });

    res.status(201).json({ message: 'User registered successfully', user, userProfile });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
