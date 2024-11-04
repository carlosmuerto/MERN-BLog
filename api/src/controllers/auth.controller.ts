import { Request, Response } from "express";

const signIn = (req: Request, res: Response) => {
	const {} = res
	res.json({
    message: "api is auth"
  });
}

const controllers = { signIn }

export default controllers