"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimelineEvents = exports.addTimelineEvent = exports.unfollowUserById = exports.getFollowersCountById = exports.getFollowingById = exports.getFollowersById = exports.followUserById = exports.deleteUserById = exports.getAllUsers = exports.LoginUser = exports.RegisterUser = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const RegisterUser = async (req, res, next) => {
    try {
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const user = await prisma.users.create({ data: req.body });
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.RegisterUser = RegisterUser;
const LoginUser = async (req, res, next) => {
    try {
        const userEmail = req.body.email;
        const loginUser = await prisma.users.findUnique({
            where: { email: userEmail },
        });
        if (!loginUser) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: "User not found" });
        }
        if (loginUser) {
            const isMatch = await bcrypt_1.default.compare(req.body.password, loginUser.password);
            if (!isMatch) {
                return res
                    .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                    .json({ message: "Invalid password" });
            }
            req.session.loggedIn = true;
            req.session.admin = loginUser.isAdmin;
            return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(loginUser);
        }
    }
    catch (error) {
        next(error);
    }
};
exports.LoginUser = LoginUser;
const getAllUsers = async (req, res, next) => {
    try {
        const searchPrefix = req.body.searchPrefix;
        console.log(searchPrefix);
        const users = await prisma.users.findMany({
            where: {
                name: {
                    search: searchPrefix,
                },
            },
        });
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(users);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUsers = getAllUsers;
const deleteUserById = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await prisma.users.delete({
            where: {
                userId: userId,
            },
        });
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUserById = deleteUserById;
const followUserById = async (req, res, next) => {
    try {
        const followeeUserId = req.body.followeeUserId;
        const followerUserId = req.body.followerUserId;
        const followTransaction = await prisma.follow.create({
            data: {
                followeeUserId: followeeUserId,
                followerUserId: followerUserId,
                status: true,
            },
        });
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(followTransaction);
    }
    catch (error) {
        next(error);
    }
};
exports.followUserById = followUserById;
const getFollowersById = async (req, res, next) => {
    try {
        const UserId = req.params.userId;
        const followTransactions = await prisma.follow.findMany({
            where: {
                followeeUserId: UserId,
                status: true,
            },
            include: {
                follower: true,
            },
        });
        const followers = followTransactions.map((transaction) => transaction.follower);
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(followers);
    }
    catch (error) {
        next(error);
    }
};
exports.getFollowersById = getFollowersById;
const getFollowingById = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const followTransactions = await prisma.follow.findMany({
            where: {
                followerUserId: userId,
                status: true,
            },
            include: {
                followee: true,
            },
        });
        const following = followTransactions.map((transaction) => transaction.followee);
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(following);
    }
    catch (error) {
        next(error);
    }
};
exports.getFollowingById = getFollowingById;
const getFollowersCountById = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const result = await prisma.$queryRaw `
      SELECT
        (SELECT COUNT(*) FROM "follow" WHERE "followeeUserId" = ${userId} AND status = true) AS "followersCount",
        (SELECT COUNT(*) FROM "follow" WHERE "followerUserId" = ${userId} AND status = true) AS "followingCount";
    `;
        const { followersCount, followingCount } = result[0];
        const response = {
            followersCount: Number(followersCount),
            followingCount: Number(followingCount),
        };
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getFollowersCountById = getFollowersCountById;
const unfollowUserById = async (req, res, next) => {
    try {
        const unfolloweeUserId = req.body.unfolloweeUserId;
        const unfollowerUserId = req.body.unfollowerUserId;
        const followTransaction = await prisma.follow.deleteMany({
            where: {
                followeeUserId: unfolloweeUserId,
                followerUserId: unfollowerUserId,
            },
        });
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(followTransaction);
    }
    catch (error) {
        next(error);
    }
};
exports.unfollowUserById = unfollowUserById;
const addTimelineEvent = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const StartDate = req.body.startDate;
        const EndDate = req.body.endDate;
        const Description = req.body.desc;
        const timelineTransaction = await prisma.timeline.create({
            data: {
                userRefId: userId,
                startDate: StartDate,
                endDate: EndDate,
                description: Description,
            },
        });
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(timelineTransaction);
    }
    catch (error) {
        next(error);
    }
};
exports.addTimelineEvent = addTimelineEvent;
const getTimelineEvents = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const timelineTransactions = await prisma.timeline.findMany({
            where: {
                userRefId: userId,
            },
            orderBy: {
                startDate: "asc",
            },
        });
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(timelineTransactions);
    }
    catch (error) {
        next(error);
    }
};
exports.getTimelineEvents = getTimelineEvents;
