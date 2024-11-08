import { UnAuthenticatedError, ValidationError } from "@utils/error";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken"
import userModel from "@models/user.model";

const controllers = { }

export default controllers