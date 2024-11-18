import mongoose, { Schema, Document, model, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password_hash: string;
  role: string; // Add role field
  created_at: Date;
}

const userSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Define role field
  created_at: { type: Date, default: Date.now },
});

const User: Model<IUser> = mongoose.models.User || model<IUser>('User', userSchema);
export default User;
