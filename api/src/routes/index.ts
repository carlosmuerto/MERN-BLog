import express from 'express';
import { defaultRoute } from './default.route';
import { userRoute } from './user.route';
import { authRoute } from './auth.route';

const routes = express.Router();

routes.use(defaultRoute);
routes.use(userRoute);
routes.use(authRoute)

export default routes;