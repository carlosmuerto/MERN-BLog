import { Router } from 'express';
import UserController from '@s/controllers/user.controller'

export const userRoute = Router();

// userRoute.get('/', UserController.currentUser);