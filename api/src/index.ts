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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});