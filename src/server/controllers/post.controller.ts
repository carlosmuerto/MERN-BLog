import { categories, toIPostObj } from "@s/models/post.model";
import PostService from "@s/services/post";
import { BadRequestError, ValidationError } from "@s/utils/error";
import { NextFunction, Request, Response } from "express";
import { isUndefined } from "lodash";
import mongoose from "mongoose";

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
	.catch((err: mongoose.Error.ValidationError) => {
		// handle validation Errors
		const errorMessages: Map<string, string> = new Map();
		for (const errKey in err.errors) {
			errorMessages.set(errKey, err.errors[errKey].message);
		}

		next(new ValidationError(err.message.split(":")[0], errorMessages));
	})
	.catch((err) => next(err));


const findPostAndDelete = (req: Request, res: Response, next: NextFunction) => PostService
	.findAndDelete(req.params.PostId)
	.then((post) => res.status(200).json({
		status: 200,
		success: true,
		message: `Delete post success`,
		post: toIPostObj(post)
	}))
	.catch((err: mongoose.Error.ValidationError) => {
		// handle validation Errors
		const errorMessages: Map<string, string> = new Map();
		for (const errKey in err.errors) {
			errorMessages.set(errKey, err.errors[errKey].message);
		}

		next(new ValidationError(err.message.split(":")[0], errorMessages));
	})
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
	.catch((err: mongoose.Error.ValidationError) => {
		// handle validation Errors
		const errorMessages: Map<string, string> = new Map();
		for (const errKey in err.errors) {
			errorMessages.set(errKey, err.errors[errKey].message);
		}

		next(new ValidationError(err.message.split(":")[0], errorMessages));
	})
	.catch((err) => next(err));

const queryAllPosts = (req: Request, res: Response, next: NextFunction) => {
	const page = Number(req.query.page ?? "1")
	const pageSize = Number(req.query.pageSize ?? "5")
	const queryError = new Map<string, string>()
	const query = new Map<string, any>()

	if (!page || page < 0) queryError.set("page", "invalid")
	if (!pageSize || pageSize < 0) queryError.set("pageSize", "invalid")


	if (req.query.category) {
		if (!((req.query.category.toString().toLocaleLowerCase()) in categories)) {
			queryError.set("category", "invalid")
		} else {
			query.set("category", req.query.category.toString().toLocaleLowerCase())
		}
	}

	if (req.query.title) {
		const regex = new RegExp(req.query.title.toString(), 'i') // i for case insensitive
		query.set("title", {$regex: regex})
	}

	if (queryError.size > 0) return next(new BadRequestError("Bad Request", queryError))

	Promise.all([
		PostService.estimatedCount(),
		PostService.queryAll(page, pageSize, Object.fromEntries(query))
	]).then(([count, posts]) => res.status(200).json({
		status: 200,
		success: true,
		page,
		count,
		pages: Math.trunc(count / pageSize) + (count % pageSize ? 1 : 0),
		posts: posts.map((post) => toIPostObj(post)),
		//post: savedPost
	}))
		.catch((err: mongoose.Error.ValidationError) => {
			// handle validation Errors
			const errorMessages: Map<string, string> = new Map();
			for (const errKey in err.errors) {
				errorMessages.set(errKey, err.errors[errKey].message);
			}

			next(new ValidationError(err.message.split(":")[0], errorMessages));
		})
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
		.catch((err: mongoose.Error.ValidationError) => {
			// handle validation Errors
			const errorMessages: Map<string, string> = new Map();
			for (const errKey in err.errors) {
				errorMessages.set(errKey, err.errors[errKey].message);
			}

			next(new ValidationError(err.message.split(":")[0], errorMessages));
		})
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