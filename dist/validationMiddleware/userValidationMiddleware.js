"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimelineEventsValidation = exports.addTimelineEventValidation = exports.getFollowingValidation = exports.unfollowValidation = exports.getFollowerCountValidation = exports.getFollowersValidation = exports.followValidation = exports.deleteUserByIdValidation = exports.userLoginValidation = exports.userRegisterValidation = void 0;
const userValidationSchema_1 = require("../validationSchemas/userValidationSchema");
const userRegisterValidation = async (req, res, next) => {
    try {
        await userValidationSchema_1.userRegisterValidationSchema.parseAsync(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.userRegisterValidation = userRegisterValidation;
const userLoginValidation = async (req, res, next) => {
    try {
        await userValidationSchema_1.userLoginValidationSchema.parseAsync(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.userLoginValidation = userLoginValidation;
const deleteUserByIdValidation = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        await userValidationSchema_1.deleteUserByIdValidationSchema.parseAsync(userId);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUserByIdValidation = deleteUserByIdValidation;
const followValidation = async (req, res, next) => {
    try {
        await userValidationSchema_1.followValidationSchema.parseAsync(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.followValidation = followValidation;
const getFollowersValidation = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        await userValidationSchema_1.getFollowersValidationSchema.parseAsync(userId);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.getFollowersValidation = getFollowersValidation;
const getFollowerCountValidation = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        await userValidationSchema_1.getFollowerCountValidationSchema.parseAsync(userId);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.getFollowerCountValidation = getFollowerCountValidation;
const unfollowValidation = async (req, res, next) => {
    try {
        await userValidationSchema_1.unfollowValidationSchema.parseAsync(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.unfollowValidation = unfollowValidation;
const getFollowingValidation = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        await userValidationSchema_1.getFollowingValidationSchema.parseAsync(userId);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.getFollowingValidation = getFollowingValidation;
const addTimelineEventValidation = async (req, res, next) => {
    try {
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        req.body.startDate = startDate;
        req.body.endDate = endDate;
        await userValidationSchema_1.addTimelineEventValidationSchema.parseAsync(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.addTimelineEventValidation = addTimelineEventValidation;
const getTimelineEventsValidation = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        await userValidationSchema_1.getTimelineEventsValidationSchema.parseAsync(userId);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.getTimelineEventsValidation = getTimelineEventsValidation;
