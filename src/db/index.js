import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`Hostname: ${connectionInstance.connection.host}`);
    console.log("Database connnected");
  } catch (error) {
    console.log("Error while connecting DB", error);
  }
};
