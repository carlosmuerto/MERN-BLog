import userModel, { IUser, toIuserObj } from "@s/models/user.model";
import { UnAuthenticatedError, ValidationError } from "@s/utils/error";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ExtractIdFromJWT = (req: Request) => {
  const jwtSecret = process.env.VITE_JWTSECRET || "jwt-test-token";

  if (!req.cookies?.access_token) return null;

  const token = req.cookies.access_token;
  if (!token) return null;

  let result: string | JwtPayload | null = null;
  try {
    result = jwt.verify(token, jwtSecret);
  } catch {
    return null;
  }
  if (typeof result === "string") return null;

  if (!result.id) return null;

  return result.id;
};

const generateUserWithToken = (userDoc: IUser) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userData } = toIuserObj(userDoc);

  const jwtSecret = process.env.VITE_JWTSECRET || "jwt-test-token";

  const expiresIn = "7d";
  // ** This is our JWT Token
  const token = jwt.sign({ ...userData }, jwtSecret, {
    expiresIn,
  });

  return {
    user: userData,
    token,
    expiresIn,
  };
};

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const JWTuId = ExtractIdFromJWT(req);
  if (!JWTuId) return next(new UnAuthenticatedError("invalid token"));

  // ** Check the (email/user) exist  in database or not ;
  userModel
    .findById(JWTuId)
    .exec()
    .then((userDoc) => {
      if (userDoc) {
        res.locals.authenticatedUserDoc = userDoc
        next();
      } else {
        return Promise.reject(new ValidationError("User Not Found"));
      }
    })
    .catch((err) => {
      next(err);
    });
}

export {authenticateUser, generateUserWithToken}