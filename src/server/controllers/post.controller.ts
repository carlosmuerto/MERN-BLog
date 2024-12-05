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
	})
		.then((savedPost) => res.status(200).json({
			status: 200,
			success: true,
			message: "post create successfully",
			post: toIPostObj(savedPost)
			//post: savedPost
		})
		)
		.catch((err) => next(err));
};

const findPostAndDelete = (req: Request, res: Response, next: NextFunction) => {

}

// const findPostAndUpdate = (req: Request, res: Response, next: NextFunction) => PostService.findAndUpdate()

const queryAllPosts = (req: Request, res: Response, next: NextFunction) => {
	const page = Number(req.query.page ?? "1")
	if (!page) return next(new BadRequestError("Bad Request", new Map<string, string>([["page", "invalid"]])))
	PostService
		.queryAll(page)
		.then((posts) => res.status(200).json({
			status: 200,
			success: true,
			page,
			posts: posts.map((post) => toIPostObj(post)),
			//post: savedPost
		}))
		.catch((err) => next(err));
};

const queryOnePost = (req: Request, res: Response, next: NextFunction) => {
	PostService
		.queryOne(req.params.PostId)
		.then((post) => res.status(200).json({
			status: 200,
			success: true,
			post: toIPostObj(post)
		}))
		.catch((err) => next(err));
};


const controllers = {
	create,
	queryAllPosts,
	queryOnePost
};

export default controllers;