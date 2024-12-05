import { Router } from 'express';
import PostController from '@s/controllers/post.controller'
import { adminUser, authenticateUser } from '@s/services/authentication'

export const postRoute = Router();

postRoute.get('', PostController.queryAllPosts);
postRoute.get('/:PostId', PostController.queryOnePost);
postRoute.put('/:PostId', authenticateUser, adminUser, PostController.findPostAndUpdate);
postRoute.delete('/:PostId', authenticateUser, adminUser, PostController.findPostAndDelete);
postRoute.post('/create', authenticateUser, adminUser, PostController.create);





