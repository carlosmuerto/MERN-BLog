import userModel from "@models/user.model";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const signUp = (req: Request, res: Response, next: NextFunction) => {
  const newUser = new userModel( req.body);

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
