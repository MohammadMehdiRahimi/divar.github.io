import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URL = process.env.MONGO_URL;

try {
  mongoose.connect(MONGO_URL);
  console.log("Connect to db is done");
} catch (error) {
  console.log(error.message);
}
