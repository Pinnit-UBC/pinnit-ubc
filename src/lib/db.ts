import mongoose from "mongoose";

const URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI!);
    console.log("Connected to pinnitDb");
  } catch (err) {
    console.log("Can't connect to pinnitdB", err);
  }
};

export default connectDB;
