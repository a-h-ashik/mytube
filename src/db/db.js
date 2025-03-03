import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`MongoDB connected...\nDB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(`MongoDB connection faile! ${error}`);
    process.exit(1); //Study
  }
}


export default connectDB;