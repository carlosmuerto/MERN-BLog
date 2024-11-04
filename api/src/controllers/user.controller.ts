import { Request, Response } from "express";

const get = (req: Request, res: Response) => {
  res.json({
    message: "api is users"
  });
}

const controllers = { get }

export default controllers