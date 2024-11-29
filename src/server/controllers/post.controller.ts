import { categories, toIPostObj } from "@s/models/post.model";
import PostService from "@s/services/post";
import { NextFunction, Request, Response } from "express";


const create = (req: Request, res: Response, next: NextFunction) => {
	const AdminUserDoc = res.locals.authenticatedUserDoc;

	PostService.create({
		author: AdminUserDoc,
		title: "title",
		content: "content",
		category: categories.test
	}).then((savedPost) => {
		res
			.status(200).json({
				status: 200,
				success: true,
				message: "post create successfully",
				post: toIPostObj(savedPost)
				//post: savedPost
			});
	}).catch((err) => next(err));

};

const queryPosts = (req: Request, res: Response, next: NextFunction) => PostService
	.queryAll()
	.then((posts) => {
		const postsJSONS = posts.map((post) => toIPostObj(post))

		res
			.status(200).json({
				status: 200,
				success: true,
				message: "post create successfully",
				posts: postsJSONS
				//post: savedPost
			});
	})
	.catch((err) => next(err));


const controllers = {
	create,
	queryPosts,
};

export default controllers;