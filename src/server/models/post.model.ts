import mongoose, { Document, Schema } from "mongoose";
import UserSchema, { IUser } from "@s/models/user.model";
import userModel from "@s/models/user.model";
import { BaseError } from "@s/utils/error";

export enum categories {
	uncategorized = "uncategorized",
	test = "test",
	project = "project"
}

// Ipost OBject Interface
export interface PostJSONObJ {
	author?: {
		id?: string;
		username?: string;
		profileImg?: string;
	},
	id?: string;
	title?: string;
	content?: string;
	image?: string;
	category?: categories,
	createdAt?: Date,
	updatedAt?: Date;
	// slug?: String,
}

// 1. Create an interface representing a document in MongoDB.
interface IPost extends Document {
	author: IUser;
	title: string;
	content: string;
	image: string;
	category: categories,
	
	// slug: String,
}

// 2. Create a Schema corresponding to the document interface.
const postSchema = new Schema<IPost>(
	{
		author: {
			type: mongoose.Types.ObjectId, 
			ref: "User",
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
			// unique: true,
		},
		image: {
			type: String,
		},
		category: {
			type: String,
			required: true,
			enum: categories,
			default: categories.uncategorized,
		},
		/*
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		*/
	},
	{
		timestamps: true,
	}
);



// export JSON object
const toIPostObj = (postdoc: PostDocument):PostJSONObJ  => ({
	author: {
		id: postdoc.author.id,
		username: postdoc.author.username,
		profileImg: postdoc.author.profileImg,
	},
	id: postdoc.id,
	title: postdoc.title,
	content: postdoc.content,
	image: postdoc.image,
	category: postdoc.category,
	createdAt: postdoc.createdAt,
	updatedAt: postdoc.updatedAt
});

export default mongoose.model<IPost>("Post", postSchema);



export type PostDocument = mongoose.Document<unknown, {}, IPost> & IPost & Required<{
	_id: unknown;
}> & {
	__v: number;
} & {updatedAt?: Date, createdAt?: Date}

export { toIPostObj };