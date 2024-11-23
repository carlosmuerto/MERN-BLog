import userModel, { IUser } from "@s/models/user.model";
import { UnAuthenticatedError, ValidationError } from "@s/utils/error";
import { generateUserWithToken } from "@s/services/authentication";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const authenticatedUserResponse = (
  res: Response,
  userDoc: IUser,
  message: string
) => {
  const { user, token } = generateUserWithToken(userDoc);

  res
    .status(200)
    .header({
      Authorization: `Bearer ${token}`,
    })
    .cookie("access_token", token, {
      sameSite: "none",
      secure: true,
    })
    .json({
      status: 200,
      success: true,
      message,
      user,
      token,
    });
};

const signUp = (req: Request, res: Response, next: NextFunction) => {
  const newUser = new userModel(req.body);

  // await new Promise((f) => setTimeout(f, 1000));
  newUser
    .save()
    .then((userDoc) => {
      console.log(`[mongodb]: ${userDoc.username} signed Up successfully`);
      authenticatedUserResponse(res, userDoc, "Sign Up successfully");
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
        authenticatedUserResponse(res, userDoc, "Sign In successfully");
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

const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.authenticatedUserDoc)
    return next(new UnAuthenticatedError("invalid token"));
  const userDoc = res.locals.authenticatedUserDoc;

  const { expiresIn } = generateUserWithToken(userDoc);
  authenticatedUserResponse(
    res,
    userDoc,
    "token User time expires In " + expiresIn
  );
};

const UpdateAuthCredentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.authenticatedUserDoc)
    return next(new UnAuthenticatedError("invalid token"));
  const userDoc = res.locals.authenticatedUserDoc;

  if (req.body.username) userDoc.username = req.body.username;
  if (req.body.email) userDoc.email = req.body.email;
  if (req.body.profileImg) userDoc.profileImg = req.body.profileImg;
  if (req.body.password) userDoc.password = req.body.password;
  userDoc
    .save()
    .then((userDocUpdated) => {
      const { expiresIn } = generateUserWithToken(userDocUpdated);
      authenticatedUserResponse(
        res,
        userDocUpdated,
        "Update Success, token User time expires In " + expiresIn
      );
    })
    .catch((err) => {
      next(err);
    });
};

const logOutResponse = (res: Response, message: string) => {

  res
  .status(200)
  .clearCookie("access_token", {
    sameSite: "none",
    secure: true,
  })
  .json({
    status: 200,
    success: true,
    message,
  });
};

const signOut = (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.authenticatedUserDoc)
    return next(new UnAuthenticatedError("invalid token"));
  // const userDoc = res.locals.authenticatedUserDoc

  logOutResponse(res, "logOut success")
};

const DeleteCurrentAccount = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.authenticatedUserDoc)
    return next(new UnAuthenticatedError("invalid token"));
  const userDoc = res.locals.authenticatedUserDoc;
  // ** Check the ID exist  in database or not ;
  userModel
    .findByIdAndDelete(userDoc.id)
    .exec()
    .then((deletedUserDoc) => {
      if (deletedUserDoc) {

        logOutResponse(res, `Delete user: ${deletedUserDoc.username} success`)
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
  DeleteCurrentAccount,
  currentUser,
};

export default controllers;
