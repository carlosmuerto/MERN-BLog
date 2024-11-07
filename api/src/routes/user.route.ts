import { Router } from 'express';
import UserController from '@controllers/user.controller'

export const userRoute = Router();

userRoute.get('/', UserController.currentUser);