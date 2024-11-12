import { Router } from 'express';
import AuthController from '@s/controllers/auth.controller'

export const authRoute = Router();

authRoute.post('/signUp', AuthController.signUp);
authRoute.post('/signIn', AuthController.signIn);
authRoute.post('/signOut', AuthController.signOut);
authRoute.post('/Update', AuthController.UpdateAuthCredentials);
authRoute.get('/currentUser', AuthController.currentUser);