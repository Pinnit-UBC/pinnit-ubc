import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const uri = process.env.MONGODB_URI || '';
let client: MongoClient;

async function connectToDatabase() {
  if (!client) {
    client = await MongoClient.connect(uri);
    console.log('MongoDB connected successfully!');
  }
  return client.db('authentication'); // Adjust the database name if needed
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ message: 'Invalid verification token' });
  }

  try {
    const db = await connectToDatabase();

    // Find user with the given verification token
    const user = await db.collection('users').findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ message: 'Invalid or expired verification token' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'User is already verified' });
    }

    // Update the user document to mark as verified and remove the token
    await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { isVerified: true }, $unset: { verificationToken: '' } }
    );

    return res.status(200).json({ message: 'Email verified successfully! You can now log in.' });
  } catch (error) {
    console.error('Error in email verification endpoint:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
