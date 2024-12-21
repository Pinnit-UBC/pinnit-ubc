import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';
import connectMongo from '@/lib/db';
import Session from '@/models/Session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('--- Logout Debugging ---');

  if (req.method !== 'POST') {
    console.log('Invalid method:', req.method);
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const sessionToken = req.cookies?.sessionToken;
  console.log('Session Token from Cookie:', sessionToken);

  try {
    await connectMongo();
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }

  // Delete session from database
  try {
    const result = await Session.deleteOne({ session_token: sessionToken });
    console.log('Session Deletion Result:', result);
  } catch (error) {
    console.error('Error deleting session from MongoDB:', error);
  }

  // Clear the session cookie
  setCookie('sessionToken', '', {
    req,
    res,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: -1, // Immediately expire the cookie
  });

  console.log('Session cookie cleared.');
  res.status(200).json({ message: 'Logged out successfully' });
}
