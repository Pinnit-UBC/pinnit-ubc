import jwt from 'jsonwebtoken';
import User from '@/models/User';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).send('Method not allowed');

  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).send('User not found');
    if (user.isVerified) return res.status(400).send('Email already verified');

    user.isVerified = true;
    await user.save();

    res.status(200).send('Email verified successfully');
  } catch (error) {
    res.status(400).send('Invalid or expired token');
  }
}
