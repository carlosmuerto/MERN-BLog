import { categories, toIPostObj } from "@s/models/post.model";
import PostService from "@s/services/post";
import { BadRequestError } from "@s/utils/error";
import { NextFunction, Request, Response } from "express";

// "title","content","image","category"

const create = (req: Request, res: Response, next: NextFunction) => PostService
	.create({
		author: res.locals.authenticatedUserDoc,
		...req.body,
		category: categories.uncategorized
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


const findPostAndDelete = (req: Request, res: Response, next: NextFunction) => PostService
	.findAndDelete(req.params.PostId)
	.then((post) => res.status(200).json({
		status: 200,
		success: true,
		message: `Delete post success`,
		post: toIPostObj(post)
	}))
	.catch((err) => next(err));

const findPostAndUpdate = (req: Request, res: Response, next: NextFunction) => PostService
	.findAndUpdate(
		req.params.PostId,
		{ ...req.body }
	)
	.then((post) => res.status(200).json({
		status: 200,
		success: true,
		message: "post updated successfully",
		post: toIPostObj(post)
	}))
	.catch((err) => next(err));

const queryAllPosts = (req: Request, res: Response, next: NextFunction) => {
	const page = Number(req.query.page ?? "1")
	const pageSize = Number(req.query.pageSize ?? "5")
	const queryError = new Map<string, string>()
	if (!page || page < 0)  queryError.set("page", "invalid") 
	if (!pageSize || pageSize < 0) queryError.set("pageSize", "invalid")
	if (queryError.size > 0) return  next(new BadRequestError("Bad Request", queryError))

	Promise.all([
		PostService.estimatedCount(),
		PostService.queryAll(page, pageSize)
	]).then(([count, posts]) => res.status(200).json({
		status: 200,
		success: true,
		page,
		count,
		pages:  Math.trunc(count / pageSize) + (count % pageSize ? 1 : 0),
		posts: posts.map((post) => toIPostObj(post)),
		//post: savedPost
	}))
		.catch((err) => next(err))

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
	queryOnePost,
	findPostAndUpdate,
	findPostAndDelete
};

export default controllers;