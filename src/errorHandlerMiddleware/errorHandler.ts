import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    const errorMessages = error.errors.map((issue: any) => ({
      message: `${issue.message} at ${issue.path.join(".")}`,
    }));
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid data", details: errorMessages });
  }
  if (error instanceof PrismaClientKnownRequestError) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ message: "existing user or data" });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
};
