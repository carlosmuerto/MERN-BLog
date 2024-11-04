import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { defaultRoute } from '@routes/default.route';
import Database from "@services/database";
import routes from "@routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;


Database.run().catch(err => console.log(err));

// routes
app.use('/api', routes);

// base route wardning
app.get("/", (_: Request, res: Response) => {
  res.status(404).json({
    message: "api Routes is in /api"
  });;
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});