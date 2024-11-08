import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken"

import Database from "@services/database";
import routes from "@routes";
import { errorHandeler } from "@utils/error";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWTSECRET || "jwt-test-token";

/// Parser
app.use(express.json());

/*
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Cors
app.use(cors());
*/

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
      console.log(`[server]: 🗄️ Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
