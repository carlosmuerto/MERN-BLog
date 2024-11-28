import mongoose, { Document, Schema } from "mongoose";
import UserSchema, { IUser } from "@s/models/user.model";

// Ipost OBject Interface
export interface PostJSONObJ {
	author: {
		id: string;
		username: string;
		email: string;
		profileImg: string | null;
	},
	title: string;
	content: string;
	image: string | null;
	category: String,
	slug: String,

}

// 1. Create an interface representing a document in MongoDB.
export interface IPost extends Document {
	author: IUser;
	title: string;
	content: string;
	image: string | null;
	category: String,
	slug: String,
}

// 2. Create a Schema corresponding to the document interface.
const postSchema = new Schema<IPost>(
	{
		author: {
			type: UserSchema,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
			unique: true,
		},
		image: {
			type: String,
			default:
				'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
		},
		category: {
			type: String,
			default: 'uncategorized',
		},
		slug: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);


// export interface comatible object
const toIPostObj = (postdoc: IPost):PostJSONObJ  => ({
	author: {
		id: postdoc.author.id,
		username: postdoc.author.username,
		email: postdoc.author.email,
		profileImg: postdoc.author.profileImg,
	},
	title: postdoc.title,
	content: postdoc.content,
	image: postdoc.image,
	category: postdoc.category,
	slug: postdoc.slug,
});

export default mongoose.model<IPost>("Post", postSchema);

export { toIPostObj };