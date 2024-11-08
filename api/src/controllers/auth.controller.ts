import userModel from "@models/user.model";
import dotenv from "dotenv";
import { UnAuthenticatedError, ValidationError } from "@utils/error";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config();

const ExtractEmailFromJWT = (req: Request) => {
  const jwtSecret = process.env.JWTSECRET || "jwt-test-token";

  if (!req.headers.authorization) return null

  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return null

  const result: string | JwtPayload = jwt.verify(token, jwtSecret)
  
  if ((typeof result === "string")) return null
  if (!result.email) return null

  return result.email
}

const signUp = (req: Request, res: Response, next: NextFunction) => {
  const newUser = new userModel(req.body);

  // await new Promise((f) => setTimeout(f, 1000));
  newUser
    .save()
    .then((userDoc) => {
      console.log(`[mongodb]: ${userDoc.username} signed Up successfully`);

      const jwtSecret = process.env.JWTSECRET || "jwt-test-token";

        // ** This is our JWT Token
        const token = jwt.sign(
          { id: userDoc._id, email: userDoc.email, username: userDoc.username },
          jwtSecret,
          {
            expiresIn: "1d",
          }
        );

        const {password, ...userData} = userDoc

        res.status(200).header({
          "Authorization": `Bearer ${token}`
        }).json({
          status: 200,
          success: true,
          message: "Sign Up successfully",
          user: userData,
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

        const {password, ...userData} = userDoc

        res.status(200).header({
          "Authorization": `Bearer ${token}`
        }).json({
          status: 200,
          success: true,
          message: "login success",
          user: userData,
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

const signOut = (req: Request, res: Response, next: NextFunction) => {
  
  const JWTemail = ExtractEmailFromJWT(req)
  if (!JWTemail) return next(new UnAuthenticatedError('invalid token'))
  
  // ** Check the (email/user) exist  in database or not ;
  userModel
    .findOne({
      email: JWTemail,
    })
    .exec()
    .then((userDoc) => {
      if (userDoc) {
        res.clearCookie("Authorization").status(200).json({
          status: 200,
          success: true,
          message: "logOut success",
        });
      } else {
        return Promise.reject(new ValidationError("User Not Found"));
      }
    })
    .catch((err) => {
      next(err);
    });
}

const currentUser = (req: Request, res: Response, next: NextFunction) => {
  
  const JWTemail = ExtractEmailFromJWT(req)
  if (!JWTemail) return next(new UnAuthenticatedError('invalid token'))
  
  // ** Check the (email) exist  in database or not ;
  userModel
    .findOne({
      email: JWTemail,
    })
    .exec()
    .then((userDoc) => {
      if (userDoc) {

        const jwtSecret = process.env.JWTSECRET || "jwt-test-token";

        const expiresIn = "7d"
        // ** This is our JWT Token
        const token = jwt.sign(
          { id: userDoc._id, email: userDoc.email, username: userDoc.username },
          jwtSecret,
          {
            expiresIn,
          }
        );
        res.status(200).header({
          "Authorization": `Bearer ${token}`
        }).json({
          status: 200,
          success: true,
          message: "token User time expires In " + expiresIn,
          token: token,
        });
      } else {
        return Promise.reject(new ValidationError("User Not Found"));
      }
    })
    .catch((err) => {
      next(err);
    });
}

const controllers = { signUp, signIn, signOut, currentUser };

export default controllers;
