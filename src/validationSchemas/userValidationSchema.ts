import { z } from "zod";

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

const phoneRegex: RegExp = new RegExp("^\\d{10}$");
const phoneCodeRegex: RegExp = new RegExp("^\\+\\d{2}$");

export const userRegisterValidationSchema = z.object({
  name: z
    .string({ required_error: nameRequiredErrorMsg })
    .trim()
    .min(1, nameRequiredErrorMsg),

  email: z.string().email({ message: invalidEmailErrorMsg }).trim(),

  password: z.string({ required_error: passwordRequiredErrorMsg }),

  isAdmin: z.boolean({ required_error: adminStatusRequiredErrorMsg }),

  phone: z.string().regex(phoneRegex).optional(),

  phoneCode: z.string().regex(phoneCodeRegex).optional(),

  city: z.string().max(20).optional(),

  purpose: z.enum(["ENTREPRENEUR", "STUDENT", "BUSINESS", "SERVICE_PROVIDER", "FREELANCER", "EMPLOYEE", "RECRUITER", "INVESTOR", "NETWORK"], {
    required_error: purposeRequiredErrorMsg,
  }),

  githubURL: z.string().optional(),

  linkedInURL: z.string().optional(),

  aboutYou: z.string().max(300).optional(),

  aboutJobTitle: z.string().max(300).optional(),

  bio: z.string().max(300).optional(),

  aspirations: z.string().max(300).optional(),
});

export const deleteUserByIdValidationSchema = z
  .string({ required_error: userIdRequiredErrorMsg })
  .uuid({ message: invalidUUIDErrorMsg });

export const userLoginValidationSchema = z.object({
  email: z
    .string({ required_error: emailRequiredErrorMsg })
    .email({ message: invalidEmailErrorMsg })
    .trim(),

  password: z.string({ required_error: passwordRequiredErrorMsg }),
});

export const followValidationSchema = z.object({
  followerUserId: z
    .string({
      required_error: "follower" + userIdRequiredErrorMsg,
    })
    .uuid({ message: invalidUUIDErrorMsg }),

  followeeUserId: z
    .string({
      required_error: "followee" + userIdRequiredErrorMsg,
    })
    .uuid({ message: invalidUUIDErrorMsg }),
});

export const getFollowersValidationSchema = z
  .string({ required_error: userIdRequiredErrorMsg })
  .uuid({ message: invalidUUIDErrorMsg });

export const getFollowerCountValidationSchema = z
  .string({ required_error: userIdRequiredErrorMsg })
  .uuid({ message: invalidUUIDErrorMsg });

export const unfollowValidationSchema = z.object({
  unfollowerUserId: z
    .string({
      required_error: "unfollower" + userIdRequiredErrorMsg,
    })
    .uuid({ message: invalidUUIDErrorMsg }),

  unfolloweeUserId: z
    .string({
      required_error: "unfollowee" + userIdRequiredErrorMsg,
    })
    .uuid({ message: invalidUUIDErrorMsg }),
});

export const getFollowingValidationSchema = z
  .string({ required_error: userIdRequiredErrorMsg })
  .uuid({ message: invalidUUIDErrorMsg });

export const addTimelineEventValidationSchema = z.object({
  userId: z
    .string({
      required_error: userIdRequiredErrorMsg,
    })
    .uuid({ message: invalidUUIDErrorMsg }),

  startDate: z.date({
    required_error: dateRequiredErrorMsg,
    message: invalidDateErrorMsg,
  }),
  endDate: z.date({ message: invalidDateErrorMsg }).optional(),
  desc: z.string({ required_error: descRequiredErrorMsg }),
});

export const getTimelineEventsValidationSchema = z
  .string({ required_error: userIdRequiredErrorMsg })
  .uuid({ message: invalidUUIDErrorMsg });
