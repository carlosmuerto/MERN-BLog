import express from 'express';
import { authRoute } from './auth.route';

const routes = express.Router();
routes.use("/auth", authRoute)

export default routes;