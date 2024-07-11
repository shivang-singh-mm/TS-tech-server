import { Router, Request, Response } from "express";

import {
  LoginUser,
  RegisterUser,
  addTimelineEvent,
  deleteUserById,
  followUserById,
  getAllUsers,
  getFollowersById,
  getFollowersCountById,
  getFollowingById,
  getTimelineEvents,
  unfollowUserById,
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
import { any } from "zod";

const router: Router = Router();

router.post("/register", userRegisterValidation, RegisterUser);
router.post("/login", userLoginValidation, LoginUser);
router.post("/getUsers", checkAdmin, checkLoggedIn, getAllUsers);
router.delete("/deleteUser/:userId", deleteUserByIdValidation, deleteUserById);
router.post("/follow", checkLoggedIn, followValidation, followUserById);
router.get(
  "/getFollowers/:userId",
  checkLoggedIn,
  getFollowersValidation,
  getFollowersById
);

router.get(
  "/getFollowing/:userId",
  checkLoggedIn,
  getFollowingValidation,
  getFollowingById
);

router.get(
  "/followCount/:userId",
  checkLoggedIn,
  getFollowerCountValidation,
  getFollowersCountById
);

router.post("/unfollow", checkLoggedIn, unfollowValidation, unfollowUserById);

router.post(
  "/addTimelineEvent",
  checkLoggedIn,
  addTimelineEventValidation,
  addTimelineEvent
);

router.get(
  "/getTimelineEvents/:userId",
  checkLoggedIn,
  getTimelineEventsValidation,
  getTimelineEvents
);

router.get("/healthCheck", (req: Request, res: Response) => {
  res.send({ Health: "Prod Healt Check Fine", Version: "v0.0" })
})

export default router;
