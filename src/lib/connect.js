import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    const connection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    return error;
  }
};
