"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimelineEventsValidationSchema = exports.addTimelineEventValidationSchema = exports.getFollowingValidationSchema = exports.unfollowValidationSchema = exports.getFollowerCountValidationSchema = exports.getFollowersValidationSchema = exports.followValidationSchema = exports.userLoginValidationSchema = exports.deleteUserByIdValidationSchema = exports.userRegisterValidationSchema = void 0;
const zod_1 = require("zod");
const nameRequiredErrorMsg = "name is required";
const passwordRequiredErrorMsg = "password is required";
const adminStatusRequiredErrorMsg = "admin status is required";
const userIdRequiredErrorMsg = "userID is required";
const emailRequiredErrorMsg = "email is required";
const purposeRequiredErrorMsg = "purpose is required";
const dateRequiredErrorMsg = "date is required";
const descRequiredErrorMsg = "desc is required";
const invalidEmailErrorMsg = "invalid email entered";
const invalidUUIDErrorMsg = "invalid uuid entered";
const invalidDateErrorMsg = "invalid date entered";
const phoneRegex = new RegExp("^\\d{10}$");
const phoneCodeRegex = new RegExp("^\\+\\d{2}$");
exports.userRegisterValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: nameRequiredErrorMsg })
        .trim()
        .min(1, nameRequiredErrorMsg),
    email: zod_1.z.string().email({ message: invalidEmailErrorMsg }).trim(),
    password: zod_1.z.string({ required_error: passwordRequiredErrorMsg }),
    isAdmin: zod_1.z.boolean({ required_error: adminStatusRequiredErrorMsg }),
    phone: zod_1.z.string().regex(phoneRegex).optional(),
    phoneCode: zod_1.z.string().regex(phoneCodeRegex).optional(),
    city: zod_1.z.string().max(20).optional(),
    purpose: zod_1.z.enum(["ENTREPRENEUR", "STUDENT", "STARTUP", "LEGALITIES", "EMPLOYEE", "RECRUITER", "INVESTOR", "INFLUENCER", "MARKETING"], {
        required_error: purposeRequiredErrorMsg,
    }),
    githubURL: zod_1.z.string().optional(),
    linkedInURL: zod_1.z.string().optional(),
    aboutYou: zod_1.z.string().max(300).optional(),
    aboutJobTitle: zod_1.z.string().max(300).optional(),
    bio: zod_1.z.string().max(300).optional(),
    aspirations: zod_1.z.string().max(300).optional(),
});
exports.deleteUserByIdValidationSchema = zod_1.z
    .string({ required_error: userIdRequiredErrorMsg })
    .uuid({ message: invalidUUIDErrorMsg });
exports.userLoginValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: emailRequiredErrorMsg })
        .email({ message: invalidEmailErrorMsg })
        .trim(),
    password: zod_1.z.string({ required_error: passwordRequiredErrorMsg }),
});
exports.followValidationSchema = zod_1.z.object({
    followerUserId: zod_1.z
        .string({
        required_error: "follower" + userIdRequiredErrorMsg,
    })
        .uuid({ message: invalidUUIDErrorMsg }),
    followeeUserId: zod_1.z
        .string({
        required_error: "followee" + userIdRequiredErrorMsg,
    })
        .uuid({ message: invalidUUIDErrorMsg }),
});
exports.getFollowersValidationSchema = zod_1.z
    .string({ required_error: userIdRequiredErrorMsg })
    .uuid({ message: invalidUUIDErrorMsg });
exports.getFollowerCountValidationSchema = zod_1.z
    .string({ required_error: userIdRequiredErrorMsg })
    .uuid({ message: invalidUUIDErrorMsg });
exports.unfollowValidationSchema = zod_1.z.object({
    unfollowerUserId: zod_1.z
        .string({
        required_error: "unfollower" + userIdRequiredErrorMsg,
    })
        .uuid({ message: invalidUUIDErrorMsg }),
    unfolloweeUserId: zod_1.z
        .string({
        required_error: "unfollowee" + userIdRequiredErrorMsg,
    })
        .uuid({ message: invalidUUIDErrorMsg }),
});
exports.getFollowingValidationSchema = zod_1.z
    .string({ required_error: userIdRequiredErrorMsg })
    .uuid({ message: invalidUUIDErrorMsg });
exports.addTimelineEventValidationSchema = zod_1.z.object({
    userId: zod_1.z
        .string({
        required_error: userIdRequiredErrorMsg,
    })
        .uuid({ message: invalidUUIDErrorMsg }),
    startDate: zod_1.z.date({
        required_error: dateRequiredErrorMsg,
        message: invalidDateErrorMsg,
    }),
    endDate: zod_1.z.date({ message: invalidDateErrorMsg }).optional(),
    desc: zod_1.z.string({ required_error: descRequiredErrorMsg }),
});
exports.getTimelineEventsValidationSchema = zod_1.z
    .string({ required_error: userIdRequiredErrorMsg })
    .uuid({ message: invalidUUIDErrorMsg });
