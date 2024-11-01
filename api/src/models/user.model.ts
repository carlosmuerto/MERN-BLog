import mongoose, { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
	name: string;
	email: string;
	passworld: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
	{
		name: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		passworld: { type: String, required: true },
	},
	{
		timestamps: true
	}
);

const User = mongoose.model('User', userSchema)

export default User