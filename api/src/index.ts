import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import Database from "@services/database";
import routes from "@routes";
import { BaseError, errorHandeler } from "@utils/error";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// most go first
app.use(express.json())

// routes
app.use("/api", routes);

// base route warning
app.get("/", (_: Request, res: Response) => {
  res.status(404).json({
    message: "api Routes is in /api",
  });
});

//MiddleWare

app.use(errorHandeler)

// Conect to db
Database.run()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
