import postModel, { IPost, PostJSONObJ } from "@s/models/post.model";
import { ValidationError } from "@s/utils/error";
import mongoose from "mongoose";

const create = async (post: PostJSONObJ): Promise<IPost> => {
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


const queryAll = (page = 0, limit = 10, pageSize = 5): Promise<IPost[]> => {
	return postModel.find().skip(page * pageSize).limit(limit).populate("author").exec()
}

const PostService = {
	create,
	queryAll,
}

export default PostService
