import userModel from "@models/user.model";
import dotenv from "dotenv";
import { ValidationError } from "@utils/error";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

dotenv.config();

const signUp = (req: Request, res: Response, next: NextFunction) => {
  const newUser = new userModel(req.body);

  // await new Promise((f) => setTimeout(f, 1000));
  newUser
    .save()
    .then((user) => {
      console.log(`[mongodb]: ${user.username} signed Up successfully`);

      const jwtSecret = process.env.JWTSECRET || "jwt-test-token";

        // ** This is our JWT Token
        const token = jwt.sign(
          { id: user._id, email: user.email, username: user.username },
          jwtSecret,
          {
            expiresIn: "1d",
          }
        );
        res.status(200).header({
          "Authorization": `Bearer ${token}`
        }).json({
          status: 200,
          success: true,
          message: "Sign Up successfully",
          token: token,
        });
    })
    .catch((err: mongoose.Error.ValidationError) => {
      // handle validation Errors
      console.log(`[mongodb]: ValidationError`);
      const errorMessages: Map<string, String> = new Map();
      for (const errKey in err.errors) {
        errorMessages.set(errKey, err.errors[errKey].message);
      }

      next(new ValidationError(err.message.split(":")[0], errorMessages));
    })
    .catch((err) => {
      console.log(`[mongodb]: UNHANDLE ERROR at SignUp User !!!!!`);
      console.log(err);

      res.status(500).json({
        message: "UNHANDLE ERROR at SignUp User !!!!!",
      });
    });
};

const signIn = (req: Request, res: Response, next: NextFunction) => {
  // ** Get The User Data From Body ;
  const user = req.body;

  // ** destructure the information from user;
  const { email, password } = user;

  // ** Check the (email/user) exist  in database or not ;
  userModel
    .findOne({
      email,
    })
    .exec()
    .then(async (userDoc) => {
      if (userDoc && (await userDoc.validatePassword(password))) {

        const jwtSecret = process.env.JWTSECRET || "jwt-test-token";

        // ** This is our JWT Token
        const token = jwt.sign(
          { id: userDoc._id, email: userDoc.email, username: userDoc.username },
          jwtSecret,
          {
            expiresIn: "1d",
          }
        );
        res.status(200).header({
          "Authorization": `Bearer ${token}`
        }).json({
          status: 200,
          success: true,
          message: "login success",
          token: token,
        });
      } else {
        return Promise.reject(new ValidationError("Email or Password Incorrect"));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const controllers = { signUp, signIn };

export default controllers;
