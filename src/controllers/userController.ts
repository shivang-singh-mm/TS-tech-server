import { NextFunction, Request, Response } from "express";

import { PrismaClient, follow, users } from "@prisma/client";

import { StatusCodes } from "http-status-codes";

import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { User } from "../servives/user.services";
import { Notification } from "../servives/notification.services";

const prisma = new PrismaClient();
const privatekey: any = process.env.PRIVATE_KEY;

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
    if (req.body.isAdmin == false) {
      const userFollow = new User;
      await userFollow.followOfficialAccounts(user.userId);
    }
    var token = sign({ uuid: user.userId }, privatekey)
    res.status(StatusCodes.ACCEPTED).json({ user, token });
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
      var token = sign({ uuid: loginUser.userId }, privatekey)
      return res.status(StatusCodes.ACCEPTED).json({ loginUser, token });
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
    const picture = req.body.picture
    const name = req.body.name
    const followTransaction: follow = await prisma.follow.create({
      data: {
        followeeUserId: followeeUserId,
        followerUserId: followerUserId,
        status: true,
      },
    });
    const notification = new Notification;
    const notiBody = {
      userId: followerUserId,
      redirectId: followeeUserId,
      notificationType: 'FOLLOW',
      name: name,
      picture: picture,
      read: false
    }
    await notification.createNotification(notiBody)
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
    const Title: string = req.body.title;
    const timelineTransaction = await prisma.timeline.create({
      data: {
        userRefId: userId,
        startDate: StartDate,
        endDate: EndDate,
        description: Description,
        title: Title
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



export const getGeneralizeduser = async (req: Request, res: Response) => {
  const data = {
    userId: req.query.userId ? req.query.userId.toString().trim() : null,
    email: req.query.email ? req.query.email.toString().trim() : null
  }
  try {
    if ((data.userId && data.email) || ((!data.userId && !data.email)))
      return res.status(409).json({ success: false, message: "Enter either email or id of user" })
    const user = new User;
    const body = await user.getGeneralisedUser(data.userId, data.email);
    return res.status(200).json({ success: true, message: "Successfully retrieved generalized user", body: body })
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: "Unable to get generalizedUser" });
  }
}

const getUserProfile = async (req: Request, res: Response) => {

}

export const getFiltereduser = async (req: Request, res: Response) => {
  const data = {
    userId: req.params.userId,
    name: req.query.name ? req.query.name.toString().trim() : null,
    sector: req.query.sector ? req.query.sector.toString().trim() : null,
    city: req.query.city ? req.query.city.toString().trim() : null,
    tag: req.query.tag ? req.query.tag.toString().trim() : null,
    experience: req.query.experience ? req.query.experience.toString().trim() : null
  }
  try {
    // if ((data.userId && data.email) || ((!data.userId && !data.email)))
    //   return res.status(409).json({ success: false, message: "Enter either email or id of user" })
    console.log(req.query)
    const user = new User;
    const body = await user.getFiltereduser(data.userId, data.name, data.city, data.sector, data.experience, data.tag);
    return res.status(200).json({ success: true, message: "Successfully retrieved filtered user", body: body })
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: "Unable to get filteredUser" });
  }
}


export const updateUSerInfo = async (req: Request, res: Response) => {
  const data = {
    githubURL: req.body.githubURL,
    companyId: req.body.companyId,
    purpose: req.body.purpose,
    city: req.body.city,
    jobTitle: req.body.jobTitle,
    aboutJobTitle: req.body.aboutJobTitle,
    linkedInURL: req.body.linkedInURL,
    experience: req.body.experience,
    tags: req.body.tags
  }
  const userId = req.body.userId;
  try {
    if (!userId || userId == " ")
      return res.status(409).json({ success: false, message: "Enter id of user" })
    const user = new User;
    const body = await user.updateUserInfo(data, userId);
    return res.status(200).json({ success: true, message: "Successfully updated user", body: body })
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: "Unable to update user" });
  }
}


export const updateUerProfile = async (req: Request, res: Response) => {
  const data = {
    bio: req.body.bio,
    aspirations: req.body.aspirations,
    profilePic: req.body.profilePic
  }
  const userId = req.body.userId;
  try {
    if (!userId || userId == " ")
      return res.status(409).json({ success: false, message: "Enter id of user" })
    const user = new User;
    const body = await user.updateUserInfo(data, userId);
    return res.status(200).json({ success: true, message: "Successfully updated user", body: body })
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: "Unable to update user" });
  }
}

export const checkFollow = async (req: Request, res: Response) => {
  const data = {
    userId: req.body.userId,
    foreignId: req.body.foreignId
  }
  try {
    if (!data.userId || data.userId == " " || !data.foreignId || data.foreignId == " ")
      return res.status(409).json({ success: false, message: "Enter id of user" })
    const user = new User;
    const body = await user.checkFollow(data.userId, data.foreignId);
    return res.status(200).json({ success: true, message: "Successfully checked follow", body: body })
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: "Unable to check follow" });
  }
}