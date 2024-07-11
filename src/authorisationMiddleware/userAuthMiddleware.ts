import { Request, Response, NextFunction } from "express";

import { StatusCodes } from "http-status-codes";

export const checkLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "You are not logged in" });
  }
};

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.admin) {
    next();
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "You are not an admin" });
  }
};
