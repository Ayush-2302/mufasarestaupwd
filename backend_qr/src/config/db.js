import { mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoURI = process.env.MONGO_URI;
console.log();
const connectToDb = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};
export default connectToDb;
