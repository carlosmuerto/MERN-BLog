import userModel, { IUser, toIuserObj } from "@s/models/user.model";
import { UnAuthenticatedError, ValidationError } from "@s/utils/error";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ExtractIdFromJWT = (req: Request) => {
  const jwtSecret = process.env.VITE_JWTSECRET || "jwt-test-token";

  if (!req.headers.authorization) return null;

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return null;

  let result: string | JwtPayload | null = null;
  try {
    result = jwt.verify(token, jwtSecret);
  } catch {
    return null;
  }

  if (typeof result === "string") return null;
  
  if (!result.userData.id) return null;

  return result.userData.id;
};

const generateUserWithToken = (userDoc: IUser) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userData } = toIuserObj(userDoc);

  const jwtSecret = process.env.VITE_JWTSECRET || "jwt-test-token";

  const expiresIn = "7d";
  // ** This is our JWT Token
  const token = jwt.sign({ userData }, jwtSecret, {
    expiresIn,
  });

  return {
    user: userData,
    token,
    expiresIn
  };
};

const signUp = (req: Request, res: Response, next: NextFunction) => {
  const newUser = new userModel(req.body);

  // await new Promise((f) => setTimeout(f, 1000));
  newUser
    .save()
    .then((userDoc) => {
      console.log(`[mongodb]: ${userDoc.username} signed Up successfully`);

      const {user, token} = generateUserWithToken(userDoc)

      res
        .status(200)
        .header({
          Authorization: `Bearer ${token}`,
        })
        .json({
          status: 200,
          success: true,
          message: "Sign Up successfully",
          user,
          token,
        });
    })
    .catch((err: mongoose.Error.ValidationError) => {
      // handle validation Errors
      console.log(`[mongodb]: ValidationError`);
      const errorMessages: Map<string, string> = new Map();
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
        const {user, token} = generateUserWithToken(userDoc)

        res
          .status(200)
          .header({
            Authorization: `Bearer ${token}`,
          })
          .json({
            status: 200,
            success: true,
            message: "login success",
            user,
            token,
          });
      } else {
        return Promise.reject(
          new ValidationError("Email or Password Incorrect")
        );
      }
    })
    .catch((err) => {
      next(err);
    });
};

const signOut = (req: Request, res: Response, next: NextFunction) => {
  const JWTuId = ExtractIdFromJWT(req);
  if (!JWTuId) return next(new UnAuthenticatedError("invalid token"));

  // ** Check the (email/user) exist  in database or not ;
  userModel
    .findById(JWTuId)
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
};

const currentUser = (req: Request, res: Response, next: NextFunction) => {
  const JWTuId = ExtractIdFromJWT(req);
  if (!JWTuId) return next(new UnAuthenticatedError("invalid token"));
  // ** Check the ID exist  in database or not ;
  userModel
    .findById(JWTuId)
    .exec()
    .then((userDoc) => {
      if (userDoc) {
        const {user, token, expiresIn} = generateUserWithToken(userDoc)
        res
          .status(200)
          .header({
            Authorization: `Bearer ${token}`,
          })
          .json({
            status: 200,
            success: true,
            message: "token User time expires In " + expiresIn,
            user,
            token,
          });
      } else {
        return Promise.reject(new ValidationError("User Not Found"));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const UpdateAuthCredentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const JWTuId = ExtractIdFromJWT(req);
  if (!JWTuId) return next(new UnAuthenticatedError("invalid token"));
  // ** Check the ID exist  in database or not ;
  userModel
    .findById(JWTuId)
    .exec()
    .then((userDoc) => {
      if (userDoc) {
        userModel
          .findByIdAndUpdate(
            userDoc._id,
            {
              $set: {
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password,
              },
            },
            { new: true }
          )
          .then((updatedUser) => {
            if (updatedUser) {
              const {user, token, expiresIn} = generateUserWithToken(updatedUser)
              res
                .status(200)
                .header({
                  Authorization: `Bearer ${token}`,
                })
                .json({
                  status: 200,
                  success: true,
                  message: "token User time expires In " + expiresIn,
                  user,
                  token,
                });
            } else {
              return Promise.reject(new ValidationError("User Not Found"));
            }
          })
          .catch((err) => {
            next(err);
          });
      } else {
        return Promise.reject(new ValidationError("User Not Found"));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const controllers = {
  signUp,
  signIn,
  signOut,
  UpdateAuthCredentials,
  currentUser,
};

export default controllers;
