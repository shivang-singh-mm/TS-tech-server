import { ZodError } from "zod";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const validationErrorHandler = (error: unknown, res: Response) => {
  if (error instanceof ZodError) {
    const errorMessages = error.errors.map((issue: any) => ({
      message: `${issue.message} at ${issue.path.join(".")}`,
    }));
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid data", details: errorMessages });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
