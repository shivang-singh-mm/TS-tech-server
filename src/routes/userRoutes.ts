import { Router, Request, Response } from "express";
import { io } from "..";

import {
  LoginUser,
  RegisterUser,
  addTimelineEvent,
  checkFollow,
  deleteUserById,
  followUserById,
  getAllUsers,
  getFiltereduser,
  getFollowersById,
  getFollowersCountById,
  getFollowingById,
  getGeneralizeduser,
  getTimelineEvents,
  unfollowUserById,
  updateUSerInfo,
  updateUerProfile,
} from "../controllers/userController";

import {
  addTimelineEventValidation,
  deleteUserByIdValidation,
  followValidation,
  getFollowerCountValidation,
  getFollowersValidation,
  getFollowingValidation,
  getTimelineEventsValidation,
  unfollowValidation,
  userLoginValidation,
  userRegisterValidation,
} from "../validationMiddleware/userValidationMiddleware";

import {
  checkAdmin,
  checkLoggedIn,
} from "../authorisationMiddleware/userAuthMiddleware";
import { jwtVerify } from "../authorisationMiddleware/jwt.auth";
import {
  getGeneralizedFeed,
  getUserFeed,
  postCreate,
} from "../controllers/post.controller";
import {
  createLike,
  deleteLike,
  getLike,
} from "../controllers/like.controller";
import { createComment, getComment } from "../controllers/comment.controller";
import {
  createHistory,
  deleteHistory,
  getHistory,
} from "../controllers/history.controller";
import { recommendationAPI } from "../controllers/activity.controller";
import { createView, getView } from "../controllers/profile.view.controller";
import { sendEmailForOtp } from "../controllers/send.email";
import { getNotification } from "../controllers/notification.controller";

import {
  getMsgs,
  deleteMsg,
  getChatrooms,
} from "../controllers/messageController";

const router: Router = Router();

router.post("/register", userRegisterValidation, RegisterUser);
router.post("/login", userLoginValidation, LoginUser);
router.post("/getUsers", getAllUsers); //checkAdmin, jwtVerify,
router.delete("/deleteUser/:userId", deleteUserByIdValidation, deleteUserById);
router.post("/follow", jwtVerify, followValidation, followUserById);
router.get(
  "/getFollowers/:userId",
  jwtVerify,
  getFollowersValidation,
  getFollowersById
);

router.get(
  "/getFollowing/:userId",
  jwtVerify,
  getFollowingValidation,
  getFollowingById
);

router.get(
  "/followCount/:userId",
  jwtVerify,
  getFollowerCountValidation,
  getFollowersCountById
);

router.post("/unfollow", jwtVerify, unfollowValidation, unfollowUserById);

router.post(
  "/timelineEvent/create",
  jwtVerify,
  addTimelineEventValidation,
  addTimelineEvent
);

router.get(
  "/timelineEvent/get/:userId",
  jwtVerify,
  getTimelineEventsValidation,
  getTimelineEvents
);

router.get("/healthCheck", (req: Request, res: Response) => {
  // io.emit('updateNotifications2', "This is notification pannel2");
  res.send({ Health: "Prod Healt Check Fine", Version: "v0.0" });
});

router.get("/checkAuth", jwtVerify, (req: Request, res: Response) => {
  // io.emit('updateNotifications2', "This is notification pannel2");
  res.send({ Health: "Prod Healt Check Fine", Version: "v0.0" });
});

// Post Routes

router.post("/post/create", jwtVerify, postCreate);
router.get("/post/get/:userId/:page/:pageSize", jwtVerify, getGeneralizedFeed);
router.get("/post/get/user/:userId/:page/:pageSize", jwtVerify, getUserFeed);

// Like Routes

router.post("/like/create", jwtVerify, createLike);
router.delete("/like/delete/:userId/", jwtVerify, deleteLike);
router.get("/like/get", jwtVerify, getLike);

// Comment Routes

router.post("/comment/create", jwtVerify, createComment);
router.get("/comment/get/:page/:pageSize", jwtVerify, getComment);

// User Routes

router.get("/get/general", jwtVerify, getGeneralizeduser);
router.get("/get/filter/:userId", jwtVerify, getFiltereduser);
router.get("/get/recommendation/:userId", jwtVerify, recommendationAPI);
router.put("/update/info", jwtVerify, updateUSerInfo);
router.put("/update/profile", jwtVerify, updateUerProfile);
router.post("/check/follow", jwtVerify, checkFollow);

// Histoy Routes

router.post("/history/create", jwtVerify, createHistory);
router.get("/history/get/:userId", jwtVerify, getHistory);
router.delete("/history/delete/:historyId", jwtVerify, deleteHistory);

// Profile View Routes
router.post("/profile/view/create", jwtVerify, createView);
router.get("/profile/view/get/:email", jwtVerify, getView);

router.get("/otp", sendEmailForOtp);

// Notification
router.get("/notification/:userId", jwtVerify, getNotification);

router.get("/noti", (req: Request, res: Response) => {
  io.emit("updateNotifications", "This is notification pannel");
  res.send({ Health: "Prod Healt Check Fine", Version: "v0.0" });
});

router.get("/msgs/:chatRoomId", getMsgs);
router.post("/delete/msg/:messageId", deleteMsg);
router.get("/chatroom/:userId", getChatrooms);

export default router;
