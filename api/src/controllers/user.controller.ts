import { UnAuthenticatedError, ValidationError } from "@utils/error";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken"
import userModel from "@models/user.model";

const currentUser = (req: Request, res: Response, next: NextFunction) => {
  const jwtSecret = process.env.JWTSECRET || "jwt-test-token";


  if (!req.headers.authorization) return next(new UnAuthenticatedError('invalid token'))
  const result: string | JwtPayload = jwt.verify(req.headers.authorization?.split(' ')[1], jwtSecret)
  if ((typeof result === "string")) return next(new UnAuthenticatedError('invalid token'))
  if (!result.email) return next(new UnAuthenticatedError('invalid token')) 
  
  // ** Check the (email/user) exist  in database or not ;
  userModel
    .findOne({
      email: result.email,
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


const controllers = { currentUser }

export default controllers