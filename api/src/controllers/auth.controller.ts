import userModel from "@models/user.model";
import { BaseError, ValidationError } from "@utils/error";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const newUser = new userModel(req.body);
  await new Promise(f => setTimeout(f, 1000));
  newUser
    .save()
    .then((user) => {
      console.log(`[mongodb]: ${user.username} saved successfully`);

      const {username, email, _id } = user

      res.json({
        message: "Sign Up successfully",
        user: {username, email, _id }
      });
    })
    .catch((err:mongoose.Error.ValidationError) => {
      // handle validation Errors
      console.log(`[mongodb]: ValidationError`)
      const errorMessages:Map<string, String> = new Map()
      for(const errKey in err.errors) {
        errorMessages.set(errKey, err.errors[errKey].message)
      }

      next(new ValidationError( err.message.split(":")[0],errorMessages))
    })
    .catch((err) => {
      console.log(`[mongodb]: UNHANDLE ERROR at SignUp User !!!!!`);
      console.log(err);

      res.status(500).json({
        message: "UNHANDLE ERROR at SignUp User !!!!!",
      });
    });
};

const controllers = { signUp };

export default controllers;
