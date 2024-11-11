import { UnAuthenticatedError, ValidationError } from "@s/utils/error";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken"
import userModel from "@s/models/user.model";

const controllers = { }

export default controllers