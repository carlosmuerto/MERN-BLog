import express from 'express';
import { defaultRoute } from './default.route';
import { userRoute } from './user.route';

const routes = express.Router();

routes.use(defaultRoute);
routes.use(userRoute);

export default routes;