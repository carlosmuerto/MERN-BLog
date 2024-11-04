import { NextFunction, Request, Response } from "express";

const signUp = (req: Request, res: Response, next:NextFunction) => {
	const userJSON = req.body
  console.log(userJSON)
	res.json({
    message: "api is auth"
  });
}

const controllers = { signUp }

export default controllers