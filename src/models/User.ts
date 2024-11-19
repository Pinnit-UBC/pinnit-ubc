import { Schema, model, Model, Document } from 'mongoose';

// Define the user interface for TypeScript
interface IUser extends Document {
  email: string;
  password: string;
}

// Define the schema
const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Export the model
const User: Model<IUser> = model<IUser>('User', userSchema, 'users'); // 'users' is the collection name
export default User;
