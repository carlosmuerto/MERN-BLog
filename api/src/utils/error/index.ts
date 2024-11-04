import { NextFunction, Request, Response } from "express";

// base error class
export class BaseError extends Error {
  statusCode: number;
  messageStack:  Map<string, String> ;
  constructor(
    message: string = "[server]: UNHANDLE ERROR",
    statusCode: number = 500,
    messageStack: Map<string, String> = new Map()
  ) {
    super(message);
    this.statusCode = statusCode;
    this.messageStack = messageStack;
  }
}

// 404 error class
export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404);
  }
}

// validation error class
export class ValidationError extends BaseError {
  constructor(message: string, messageStack: Map<string, String> = new Map()) {
    super(message, 400);
    this.messageStack = messageStack;
  }
}

export const errorHandeler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BaseError) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      messageStack: Object.fromEntries(err.messageStack),
    });
  } else {
    res.status(500).json({
      message: "UNKNOW UNHNADLE ERROR",
    });
  }
};
