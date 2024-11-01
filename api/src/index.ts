import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import UserService from '@services/UserService';
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const mongodbURL = process.env.MONGODB || "";

async function run() {
  // 4. Connect to MongoDB
  await mongoose.connect(mongodbURL)
    .then(() => console.log(`[mongodb]: Mongodb connented to "${mongodbURL}"`))
    .catch(() => console.log(`[mongodb]: Mongodb cant connent to "${mongodbURL}"`))
  ;
}

run().catch(err => console.log(err));

app.get("/", (_: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
	console.log(UserService)
  console.log(`[server]: Server is running at http://localhost:${port}`);
});