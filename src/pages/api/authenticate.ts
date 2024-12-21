import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectMongo from '@/lib/db'; // Updated to ensure correct import
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Authenticating...'); // Debugging: Log start of authentication process

  if (req.method !== 'POST') {
    console.log('Invalid HTTP method:', req.method); // Debugging: Log invalid method
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;
  console.log('Received email and password:', { email, password: !!password }); // Debugging: Log received inputs

  if (!email || !password) {
    console.log('Missing email or password'); // Debugging: Log missing input
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    console.log('Connecting to MongoDB...'); // Debugging: Log MongoDB connection attempt
    await connectMongo(); // Ensure DB connection
    console.log('MongoDB connected successfully!'); // Debugging: Log successful connection

    console.log('Finding user by email:', email); // Debugging: Log user lookup
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found for email:', email); // Debugging: Log user not found
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Comparing passwords...'); // Debugging: Log password comparison
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Invalid password for email:', email); // Debugging: Log invalid password
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('Generating JWT token...'); // Debugging: Log JWT generation
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    console.log('Setting session token cookie...'); // Debugging: Log cookie setting
    res.setHeader('Set-Cookie', `sessionToken=${token}; HttpOnly; Path=/; Max-Age=3600`);

    console.log('Authentication successful'); // Debugging: Log successful authentication
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error in authenticate API:', error); // Debugging: Log error
    return res.status(500).json({ message: 'Internal server error' });
  }
}
