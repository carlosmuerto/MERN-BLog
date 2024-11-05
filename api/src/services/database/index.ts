import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongodbURL = process.env.MONGODB || "";

async function run() {
	// 4. Connect to MongoDB
	await mongoose.connect(mongodbURL)
		.then(() => console.log(`[mongodb]: 🛢️ Connected To Mongodb database`))
		.catch(() => console.log(`[mongodb]: ⚠️ Mongodb can NOT connent to "${mongodbURL}"`))
		;
}

const Database = { run }
export default Database
