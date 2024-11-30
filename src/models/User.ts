import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for a user
export interface IUser extends Document {
  email: string;
  password: string;
  isVerified: boolean;
}

// Define the user schema
const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});

// Define the user model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User; // Default export the model
