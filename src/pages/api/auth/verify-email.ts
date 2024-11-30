import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import User, { IUser } from '@/models/User';

// Define a type for the decoded JWT payload
interface JwtPayload {
  userId: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed');
  }

  const { token } = req.query;

  // Ensure token exists
  if (!token || typeof token !== 'string') {
    return res.status(400).send('Token is required');
  }

  // Ensure JWT_SECRET is defined
  if (!process.env.JWT_SECRET) {
    return res.status(500).send('JWT_SECRET is not defined in the environment variables');
  }

  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    // Find the user by ID and type it as IUser
    const user = await User.findById(decoded.userId) as IUser;

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if the email is already verified
    if (user.isVerified) {
      return res.status(400).send('Email already verified');
    }

    // Verify the user's email
    user.isVerified = true;
    await user.save();

    return res.status(200).send('Email verified successfully');
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(400).send('Invalid or expired token');
  }
}
