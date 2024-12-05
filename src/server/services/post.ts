import postModel, { categories, IPost, PostJSONObJ } from "@s/models/post.model";
import { NotFoundError, ValidationError } from "@s/utils/error";
import mongoose from "mongoose";

const create = (post: PostJSONObJ): Promise<IPost> => {
	const newPost = new postModel(post);
	return newPost.save().then((savedPost) => {
		if (savedPost) {
			return savedPost
		} else {
			return Promise.reject(new ValidationError("Post cant be"));
		}
	}).catch((err: mongoose.Error.ValidationError) => {
		// handle validation Errors
		const errorMessages: Map<string, string> = new Map();
		for (const errKey in err.errors) {
			errorMessages.set(errKey, err.errors[errKey].message);
		}
		return Promise.reject(new ValidationError(err.message.split(":")[0], errorMessages))
	});
}

interface postUpdatableField {
	title?: string;
	content?: string;
	image?: string;
	category?: categories,
}

const findAndUpdate = (id:string, post:postUpdatableField): Promise<IPost> => {
	return postModel.findByIdAndUpdate(id, post).then((postDoc) => postDoc ?? Promise.reject(new NotFoundError("Post Not Found")) )
}

const findAndDelete = (id: String): Promise<IPost> => {
	return postModel
    .findByIdAndDelete(id)
    .exec()
    .then((deletedUserDoc) => deletedUserDoc ?? Promise.reject(new ValidationError("Post Not Found")));
}

const queryAll = (page = 1, pageSize = 5): Promise<IPost[]> => {
	return postModel.find().limit(pageSize).skip((page - 1) * pageSize).populate("author").exec()
}

const queryOne = (id: String): Promise<IPost> => {
	return postModel.findById(id).populate("author").exec().then((postDoc) => postDoc ?? Promise.reject(new NotFoundError("Post Not Found")))
}

const PostService = {
	create,
	queryAll,
	queryOne,
	findAndUpdate,
	findAndDelete
}

export default PostService
