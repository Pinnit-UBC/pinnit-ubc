import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import connectMongo from '../src/lib/db'; // Correct path to db.ts
import User from '../src/models/User'; // Correct path to User model

// Load environment variables
dotenv.config({ path: '.env.local' });

async function createUser() {
  try {
    await connectMongo();

    const email = 'testing2@example.com'; // Replace with your desired email
    const plainPassword = 'password123'; // Replace with your desired password

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', existingUser);
      return;
    }

    const user = await User.create({ email, password: hashedPassword });
    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createUser();
