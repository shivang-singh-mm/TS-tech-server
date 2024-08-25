"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUerProfile = exports.updateUSerInfo = exports.getFiltereduser = exports.getGeneralizeduser = exports.getTimelineEvents = exports.addTimelineEvent = exports.unfollowUserById = exports.getFollowersCountById = exports.getFollowingById = exports.getFollowersById = exports.followUserById = exports.deleteUserById = exports.getAllUsers = exports.LoginUser = exports.RegisterUser = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const user_services_1 = require("../servives/user.services");
const prisma = new client_1.PrismaClient();
const privatekey = process.env.PRIVATE_KEY;
const RegisterUser = async (req, res, next) => {
    try {
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const user = await prisma.users.create({ data: req.body });
        if (req.body.isAdmin == false) {
            const userFollow = new user_services_1.User;
            await userFollow.followOfficialAccounts(user.userId);
        }
        var token = (0, jsonwebtoken_1.sign)({ uuid: user.userId }, privatekey);
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({ user, token });
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
            var token = (0, jsonwebtoken_1.sign)({ uuid: loginUser.userId }, privatekey);
            return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({ loginUser, token });
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
        const Title = req.body.title;
        const timelineTransaction = await prisma.timeline.create({
            data: {
                userRefId: userId,
                startDate: StartDate,
                endDate: EndDate,
                description: Description,
                title: Title
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
const getGeneralizeduser = async (req, res) => {
    const data = {
        userId: req.query.userId ? req.query.userId.toString().trim() : null,
        email: req.query.email ? req.query.email.toString().trim() : null
    };
    try {
        if ((data.userId && data.email) || ((!data.userId && !data.email)))
            return res.status(409).json({ success: false, message: "Enter either email or id of user" });
        const user = new user_services_1.User;
        const body = await user.getGeneralisedUser(data.userId, data.email);
        return res.status(200).json({ success: true, message: "Successfully retrieved generalized user", body: body });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to get generalizedUser" });
    }
};
exports.getGeneralizeduser = getGeneralizeduser;
const getUserProfile = async (req, res) => {
};
const getFiltereduser = async (req, res) => {
    const data = {
        userId: req.params.userId,
        name: req.query.name ? req.query.name.toString().trim() : null,
        sector: req.query.sector ? req.query.sector.toString().trim() : null,
        city: req.query.city ? req.query.city.toString().trim() : null,
        jobTitle: req.query.jobTitle ? req.query.jobTitle.toString().trim() : null,
        experience: req.query.experience ? req.query.experience.toString().trim() : null
    };
    try {
        // if ((data.userId && data.email) || ((!data.userId && !data.email)))
        //   return res.status(409).json({ success: false, message: "Enter either email or id of user" })
        const user = new user_services_1.User;
        const body = await user.getFiltereduser(data.userId, data.name, data.city, data.sector, data.experience, data.jobTitle);
        return res.status(200).json({ success: true, message: "Successfully retrieved filtered user", body: body });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to get filteredUser" });
    }
};
exports.getFiltereduser = getFiltereduser;
const updateUSerInfo = async (req, res) => {
    const data = {
        githubURL: req.body.githubURL,
        companyId: req.body.companyId,
        purpose: req.query.sector,
        city: req.body.city,
        jobTitle: req.body.jobTitle,
        aboutJobTitle: req.body.aboutJobTitle,
        linkedInURL: req.body.linkedInURL,
        experience: req.query.experience
    };
    const userId = req.body.userId;
    try {
        if (!userId || userId == " ")
            return res.status(409).json({ success: false, message: "Enter id of user" });
        const user = new user_services_1.User;
        const body = await user.updateUserInfo(data, userId);
        return res.status(200).json({ success: true, message: "Successfully updated user", body: body });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to update user" });
    }
};
exports.updateUSerInfo = updateUSerInfo;
const updateUerProfile = async (req, res) => {
    const data = {
        bio: req.body.bio,
        aspirations: req.body.aspirations,
        profilePic: req.body.profilePic
    };
    const userId = req.body.userId;
    try {
        if (!userId || userId == " ")
            return res.status(409).json({ success: false, message: "Enter id of user" });
        const user = new user_services_1.User;
        const body = await user.updateUserInfo(data, userId);
        return res.status(200).json({ success: true, message: "Successfully updated user", body: body });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to update user" });
    }
};
exports.updateUerProfile = updateUerProfile;
