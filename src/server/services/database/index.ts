import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongodbURL = process.env.VITE_MONGODB || "";

async function run() {
  // 4. Connect to MongoDB
  console.log(`[mongodb]: 🛢️ ...`)
  return mongoose
    .connect(mongodbURL)
    .then(() => console.log(`[mongodb]: 🛢️ Connected To Mongodb database`))
    .catch((err) => {
      console.log(`[mongodb]: ⚠️ Mongodb can NOT connent to "${mongodbURL}"`);
		return Promise.reject(err);
    });
}

const Database = { run };
export default Database;
