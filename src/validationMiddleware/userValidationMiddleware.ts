import { Request, Response, NextFunction } from "express";
import {
  addTimelineEventValidationSchema,
  deleteUserByIdValidationSchema,
  followValidationSchema,
  getFollowerCountValidationSchema,
  getFollowersValidationSchema,
  getFollowingValidationSchema,
  getTimelineEventsValidationSchema,
  unfollowValidationSchema,
  userLoginValidationSchema,
  userRegisterValidationSchema,
} from "../validationSchemas/userValidationSchema";

export const userRegisterValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userRegisterValidationSchema.parseAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const userLoginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userLoginValidationSchema.parseAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const deleteUserByIdValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.userId;
    await deleteUserByIdValidationSchema.parseAsync(userId);
    next();
  } catch (error) {
    next(error);
  }
};

export const followValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await followValidationSchema.parseAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const getFollowersValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.userId;
    await getFollowersValidationSchema.parseAsync(userId);
    next();
  } catch (error) {
    next(error);
  }
};

export const getFollowerCountValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.userId;
    await getFollowerCountValidationSchema.parseAsync(userId);
    next();
  } catch (error) {
    next(error);
  }
};

export const unfollowValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await unfollowValidationSchema.parseAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const getFollowingValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.userId;
    await getFollowingValidationSchema.parseAsync(userId);
    next();
  } catch (error) {
    next(error);
  }
};

export const addTimelineEventValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    req.body.startDate = startDate;
    req.body.endDate = endDate;
    await addTimelineEventValidationSchema.parseAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const getTimelineEventsValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.userId;
    await getTimelineEventsValidationSchema.parseAsync(userId);
    next();
  } catch (error) {
    next(error);
  }
};
