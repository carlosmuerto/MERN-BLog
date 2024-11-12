import express, { Express } from "express";
import ViteExpress from "vite-express";

import Database from "@s/services/database";
import routes from "@s/routes";
import { errorHandeler } from "@s/utils/error";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.VITE_PORT || 3000;

/// Parser
app.use(express.json());

// routes
app.use("/api", routes);

//MiddleWare

app.use(errorHandeler);

// Conect to db
Database.run()
  .then(() => {
    ViteExpress.listen(app, +port, () =>
      console.log(`[server]: 🗄️ Server is running at http://localhost:${port}`)
    );
  })
  .catch((err) => console.log(err));
