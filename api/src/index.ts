import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import UserService from '@services/UserService';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (_: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
	console.log(UserService)
  console.log(`[server]: Server is running at http://localhost:${port}`);
});