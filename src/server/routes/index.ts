import express from 'express';
import { defaultRoute } from './default.route';
import { authRoute } from './auth.route';

const routes = express.Router();

routes.use(defaultRoute);
routes.use("/auth", authRoute)

export default routes;