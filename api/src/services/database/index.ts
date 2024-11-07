import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongodbURL = process.env.MONGODB || "";

async function run() {
	// 4. Connect to MongoDB
	await mongoose.connect(mongodbURL)
		.then(() => console.log(`[mongodb]: 🛢️ Connected To Mongodb database`))
		.catch((err) => console.log(`[mongodb]: ⚠️ Mongodb can NOT connent to "${mongodbURL}" 
			${err}`))
		;
}

const Database = { run }
export default Database
