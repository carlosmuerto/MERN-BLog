import userModel, { IUser, toIuserObj } from "@s/models/user.model";
import postModel, { IPost, PostJSONObJ, toIPostObj } from "@s/models/post.model";

const createPost = async (post: PostJSONObJ) => {
	const newPost = new postModel(post);
	console.log(newPost)
}