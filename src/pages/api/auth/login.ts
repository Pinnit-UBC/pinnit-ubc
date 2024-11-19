import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectMongo from '@/lib/db';
import User from '@/models/User';
import Session from '@/models/Session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Connect to MongoDB
  try {
    await connectMongo();
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    return res.status(500).json({ error: 'Failed to connect to database' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.error('Invalid email:', email);
      return res.status(401).json({ error: 'Invalid login credentials' });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.error('Invalid password for user:', email);
      return res.status(401).json({ error: 'Invalid login credentials' });
    }

    // Create session
    const sessionToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'default_secret', {
      expiresIn: '1h',
    });

    await Session.create({
      session_token: sessionToken,
      user_id: user._id,
      expires_at: new Date(Date.now() + 3600 * 1000), // 1 hour
    });

    // Set cookie
    res.setHeader(
      'Set-Cookie',
      `sessionToken=${sessionToken}; HttpOnly; Path=/; Max-Age=3600`
    );

    console.log('User logged in successfully:', email);
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
