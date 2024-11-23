import { Router } from 'express';
import AuthController from '@s/controllers/auth.controller'
import { authenticateUser } from '@s/services/authentication'

export const authRoute = Router();

authRoute.post('/signUp', AuthController.signUp);
authRoute.post('/signIn', AuthController.signIn);
authRoute.post('/signOut', authenticateUser, AuthController.signOut);
authRoute.post('/Update', authenticateUser, AuthController.UpdateAuthCredentials);
authRoute.get('/currentUser', authenticateUser, AuthController.currentUser);
authRoute.delete('/Delete', authenticateUser, AuthController.DeleteCurrentAccount);
