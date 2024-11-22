import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import connectMongo from '@/lib/db';
import User from '@/models/User';
import UserProfile from '@/models/UserProfile';

export default async function userRegistration(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Connect to MongoDB
    await connectMongo();

    // Extract data from request body
    const {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      username,
      year_level: yearLevel,
      faculty,
      keywords, // Extracting selected keywords
    } = req.body;

    // Debugging: log received data
    console.log('Received form data:', req.body);

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !username || !yearLevel) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the User collection
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // Create the user profile in the UserProfile collection
    await UserProfile.create({
      userId: user._id, // Use user._id to link profiles to users
      firstName,
      lastName,
      username,
      yearLevel,
      faculty,
      keywords, // Store keywords as an array
    });

    // Respond with success
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
