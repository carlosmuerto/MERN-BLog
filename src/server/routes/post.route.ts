import { Router } from 'express';
import PostController from '@s/controllers/post.controller'
import { adminUser, authenticateUser } from '@s/services/authentication'

export const postRoute = Router();

postRoute.get('/', PostController.queryPosts);
postRoute.post('/create', authenticateUser, adminUser, PostController.create);


