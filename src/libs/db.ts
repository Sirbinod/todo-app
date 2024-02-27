import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
  const MONGODB_URI = process.env.MONGODB_URI as string;

  try {
    await mongoose.connect(MONGODB_URI);

    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export { connectToDatabase };
