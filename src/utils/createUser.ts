import bcrypt from 'bcrypt';
import connectMongo from '../lib/db';
import User from '../models/User';

async function createUser() {
  try {
    await connectMongo();

    const email = 'test@example.com'; // Replace with your desired email
    const plainPassword = 'password123'; // Replace with your desired password

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`User with email ${email} already exists.`);
      return;
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = await User.create({ email, password: hashedPassword });
    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createUser();
