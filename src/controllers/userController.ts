import { NextFunction, Request, Response } from "express";

import { PrismaClient, follow, users } from "@prisma/client";

import { StatusCodes } from "http-status-codes";

import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const RegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const user: users = await prisma.users.create({ data: req.body });
    res.status(StatusCodes.ACCEPTED).json(user);
  } catch (error) {
    next(error);
  }
};

export const LoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userEmail: string = req.body.email;
    const loginUser: users | null = await prisma.users.findUnique({
      where: { email: userEmail },
    });
    if (!loginUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User not found" });
    }
    if (loginUser) {
      const isMatch = await bcrypt.compare(
        req.body.password,
        loginUser.password
      );
      if (!isMatch) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Invalid password" });
      }
      req.session.loggedIn = true;
      req.session.admin = loginUser.isAdmin;
      return res.status(StatusCodes.ACCEPTED).json(loginUser);
    }
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const searchPrefix = req.body.searchPrefix;
    console.log(searchPrefix);
    const users: users[] = await prisma.users.findMany({
      where: {
        name: {
          search: searchPrefix,
        },
      },
    });
    res.status(StatusCodes.ACCEPTED).json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.userId;
    const user: users = await prisma.users.delete({
      where: {
        userId: userId,
      },
    });
    res.status(StatusCodes.ACCEPTED).json(user);
  } catch (error) {
    next(error);
  }
};

export const followUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const followeeUserId: string = req.body.followeeUserId;
    const followerUserId: string = req.body.followerUserId;
    const followTransaction: follow = await prisma.follow.create({
      data: {
        followeeUserId: followeeUserId,
        followerUserId: followerUserId,
        status: true,
      },
    });
    res.status(StatusCodes.ACCEPTED).json(followTransaction);
  } catch (error) {
    next(error);
  }
};

export const getFollowersById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const UserId: string = req.params.userId;
    const followTransactions = await prisma.follow.findMany({
      where: {
        followeeUserId: UserId,
        status: true,
      },
      include: {
        follower: true,
      },
    });

    const followers = followTransactions.map(
      (transaction) => transaction.follower
    );
    res.status(StatusCodes.ACCEPTED).json(followers);
  } catch (error) {
    next(error);
  }
};

export const getFollowingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.userId;
    const followTransactions = await prisma.follow.findMany({
      where: {
        followerUserId: userId,
        status: true,
      },
      include: {
        followee: true,
      },
    });
    const following = followTransactions.map(
      (transaction) => transaction.followee
    );
    res.status(StatusCodes.ACCEPTED).json(following);
  } catch (error) {
    next(error);
  }
};

export const getFollowersCountById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.userId;
    const result: Array<{ followersCount: bigint; followingCount: bigint }> =
      await prisma.$queryRaw`
      SELECT
        (SELECT COUNT(*) FROM "follow" WHERE "followeeUserId" = ${userId} AND status = true) AS "followersCount",
        (SELECT COUNT(*) FROM "follow" WHERE "followerUserId" = ${userId} AND status = true) AS "followingCount";
    `;
    const { followersCount, followingCount } = result[0];
    const response = {
      followersCount: Number(followersCount),
      followingCount: Number(followingCount),
    };
    res.status(StatusCodes.ACCEPTED).json(response);
  } catch (error) {
    next(error);
  }
};

export const unfollowUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const unfolloweeUserId: string = req.body.unfolloweeUserId;
    const unfollowerUserId: string = req.body.unfollowerUserId;
    const followTransaction = await prisma.follow.deleteMany({
      where: {
        followeeUserId: unfolloweeUserId,
        followerUserId: unfollowerUserId,
      },
    });
    res.status(StatusCodes.ACCEPTED).json(followTransaction);
  } catch (error) {
    next(error);
  }
};

export const addTimelineEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.body.userId;
    const StartDate: string = req.body.startDate;
    const EndDate: string = req.body.endDate;
    const Description: string = req.body.desc;
    const timelineTransaction = await prisma.timeline.create({
      data: {
        userRefId: userId,
        startDate: StartDate,
        endDate: EndDate,
        description: Description,
      },
    });
    res.status(StatusCodes.ACCEPTED).json(timelineTransaction);
  } catch (error) {
    next(error);
  }
};

export const getTimelineEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.userId;
    const timelineTransactions = await prisma.timeline.findMany({
      where: {
        userRefId: userId,
      },
      orderBy: {
        startDate: "asc",
      },
    });
    res.status(StatusCodes.ACCEPTED).json(timelineTransactions);
  } catch (error) {
    next(error);
  }
};
