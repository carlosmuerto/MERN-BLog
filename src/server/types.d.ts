import mongoose from "mongoose";
import { IUser } from "./models/user.model";

declare global {
  namespace Express {
    interface Locals {
      authenticatedUserDoc: mongoose.Document<unknown, {}, IUser> & IUser & Required<{
				_id: unknown;
		}> & {
				__v: number;
		}
    }
  }
}