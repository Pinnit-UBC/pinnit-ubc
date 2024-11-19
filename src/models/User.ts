import { Schema, model, models, Model } from 'mongoose';

interface IUser {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Use an existing model if it exists, otherwise create a new one
const User: Model<IUser> = models.User || model<IUser>('User', userSchema);

export default User;
