import { categories, toIPostObj } from "@s/models/post.model";
import PostService from "@s/services/post";
import { BadRequestError } from "@s/utils/error";
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



const queryAllPosts = (req: Request, res: Response, next: NextFunction) => {
	const page = Number(req.query.page ?? "1")
	if (!page) return next(new BadRequestError("Bad Request", new Map<string,string>([["page","invalid"]])))
	PostService
		.queryAll(page)
		.then((posts) => {
			const postsJSONS = posts.map((post) => toIPostObj(post));

			res
				.status(200).json({
					status: 200,
					success: true,
					posts: postsJSONS,
					page
					//post: savedPost
				});
		})
		.catch((err) => next(err));
};

const queryOnePost = (req: Request, res: Response, next: NextFunction) => {
	PostService
	.queryOne("6749eca43411b0f3a03565a2")
	.then((post) => {
		res.status(200).json({
			status: 200,
					success: true,
					post: toIPostObj(post)
		})
	})
	.catch((err) => next(err));
};


const controllers = {
	create,
	queryAllPosts,
	queryOnePost
};

export default controllers;