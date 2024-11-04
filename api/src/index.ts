import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import Database from "@services/database";
import routes from "@routes";
import { BaseError } from "@utils/error";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// routes
app.use("/api", routes);

// base route warning
app.get("/", (_: Request, res: Response) => {
  res.status(404).json({
    message: "api Routes is in /api",
  });
});

//MiddleWare
app.use(express.json())
app.use((err:BaseError, req:Request, res: Response, next: NextFunction) => {
  
})

// Conect to db
Database.run()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
