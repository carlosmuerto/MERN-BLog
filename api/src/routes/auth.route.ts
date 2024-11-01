import { Router } from 'express';
import AuthController from '@controllers/auth.controller'

export const authRoute = Router();

authRoute.get('/signIn', AuthController.signIn);