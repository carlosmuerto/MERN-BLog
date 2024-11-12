import { NextFunction, Request, Response } from "express";

// base error class
export class BaseError extends Error {
  statusCode: number;
  messageStack:  Map<string, string> ;
  constructor(
    message: string = "[server]: UNHANDLE ERROR",
    statusCode: number = 500,
    messageStack: Map<string, string> = new Map()
  ) {
    super(message);
    this.statusCode = statusCode;
    this.messageStack = messageStack;
  }
}

// 404 error class
export class UnAuthenticatedError extends BaseError {
  constructor(message: string) {
    super(message, 401);
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
  constructor(message: string, messageStack: Map<string, string> = new Map()) {
    super(message, 400);
    this.messageStack = messageStack;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandeler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof BaseError) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      messageStack: Object.fromEntries(err.messageStack),
    });
  } else {
    console.log('[server] "UNKNOW UNHNADLE ERROR')
    console.log(err)
    res.status(500).json({
      message: "UNKNOW UNHNADLE ERROR",
    });
  }
};
