import mongoose, { Schema, Document, model, Model } from 'mongoose';

export interface ISession extends Document {
  user_id: mongoose.Types.ObjectId;
  session_token: string;
  expires_at: Date;
}

const sessionSchema: Schema<ISession> = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  session_token: { type: String, required: true },
  expires_at: { type: Date, required: true },
});

const Session: Model<ISession> = mongoose.models.Session || model<ISession>('Session', sessionSchema);
export default Session;
