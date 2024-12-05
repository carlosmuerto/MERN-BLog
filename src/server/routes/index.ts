import express from 'express';
import { authRoute } from './auth.route';
import { postRoute } from './post.route';

const routes = express.Router();
routes.use("/auth", authRoute)
routes.use("/post", postRoute)

export default routes;