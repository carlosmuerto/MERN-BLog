import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

const HASH_ROUNDS = 10;

// Mongoose used to define this before mongoose 6. For backward's compatibility, we will now just define it ourselves.
interface HookNextFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error?: Error): any;
}

// 1. Create an interface representing a document in MongoDB.
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profileImg: string;
  isAdmin: boolean
  validatePassword(password: string): boolean;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImg: { type: String },
    isAdmin:  { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

// user schema pre-save hook implementation
userSchema.pre("save", async function (next: HookNextFunction) {
  // here we need to retype 'this' because by default it is
  // of type Document from which the 'IUser' interface is inheriting
  // but the Document does not know about our password property
  const thisObj = this as IUser;

  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(HASH_ROUNDS);
    thisObj.password = await bcrypt.hash(thisObj.password, salt);
    return next();
  } catch (e) {
    return next(e as Error);
  }
});

// password validation method
userSchema.methods.validatePassword = async function (pass = "") {
  return await bcrypt.compare(pass, this.password);
};

// export interface comatible object
const toIuserObj = (
  userdoc: IUser
): {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  profileImg: string;
} => ({
  id: userdoc.id,
  username: userdoc.username,
  email: userdoc.email,
  password: userdoc.password,
  isAdmin: userdoc.isAdmin,
  profileImg: userdoc.profileImg,
});

export default mongoose.model<IUser>("User", userSchema);

export { toIuserObj };
