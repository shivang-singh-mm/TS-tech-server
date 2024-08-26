"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const __1 = require("..");
const userController_1 = require("../controllers/userController");
const userValidationMiddleware_1 = require("../validationMiddleware/userValidationMiddleware");
const userAuthMiddleware_1 = require("../authorisationMiddleware/userAuthMiddleware");
const jwt_auth_1 = require("../authorisationMiddleware/jwt.auth");
const post_controller_1 = require("../controllers/post.controller");
const like_controller_1 = require("../controllers/like.controller");
const comment_controller_1 = require("../controllers/comment.controller");
const history_controller_1 = require("../controllers/history.controller");
const activity_controller_1 = require("../controllers/activity.controller");
const profile_view_controller_1 = require("../controllers/profile.view.controller");
const send_email_1 = require("../controllers/send.email");
const router = (0, express_1.Router)();
router.post("/register", userValidationMiddleware_1.userRegisterValidation, userController_1.RegisterUser);
router.post("/login", userValidationMiddleware_1.userLoginValidation, userController_1.LoginUser);
router.post("/getUsers", userAuthMiddleware_1.checkAdmin, jwt_auth_1.jwtVerify, userController_1.getAllUsers);
router.delete("/deleteUser/:userId", userValidationMiddleware_1.deleteUserByIdValidation, userController_1.deleteUserById);
router.post("/follow", jwt_auth_1.jwtVerify, userValidationMiddleware_1.followValidation, userController_1.followUserById);
router.get("/getFollowers/:userId", jwt_auth_1.jwtVerify, userValidationMiddleware_1.getFollowersValidation, userController_1.getFollowersById);
router.get("/getFollowing/:userId", jwt_auth_1.jwtVerify, userValidationMiddleware_1.getFollowingValidation, userController_1.getFollowingById);
router.get("/followCount/:userId", jwt_auth_1.jwtVerify, userValidationMiddleware_1.getFollowerCountValidation, userController_1.getFollowersCountById);
router.post("/unfollow", jwt_auth_1.jwtVerify, userValidationMiddleware_1.unfollowValidation, userController_1.unfollowUserById);
router.post("/timelineEvent/create", jwt_auth_1.jwtVerify, userValidationMiddleware_1.addTimelineEventValidation, userController_1.addTimelineEvent);
router.get("/timelineEvent/get/:userId", jwt_auth_1.jwtVerify, userValidationMiddleware_1.getTimelineEventsValidation, userController_1.getTimelineEvents);
router.get("/healthCheck", (req, res) => {
    // io.emit('updateNotifications2', "This is notification pannel2");
    res.send({ Health: "Prod Healt Check Fine", Version: "v0.0" });
});
router.get("/checkAuth", jwt_auth_1.jwtVerify, (req, res) => {
    // io.emit('updateNotifications2', "This is notification pannel2");
    res.send({ Health: "Prod Healt Check Fine", Version: "v0.0" });
});
// Post Routes
router.post('/post/create', jwt_auth_1.jwtVerify, post_controller_1.postCreate);
router.get('/post/get/:userId/:page/:pageSize', jwt_auth_1.jwtVerify, post_controller_1.getGeneralizedFeed);
router.get('/post/get/user/:userId/:page/:pageSize', jwt_auth_1.jwtVerify, post_controller_1.getUserFeed);
// Like Routes
router.post('/like/create', jwt_auth_1.jwtVerify, like_controller_1.createLike);
router.delete('/like/delete/:userId/', jwt_auth_1.jwtVerify, like_controller_1.deleteLike);
router.get('/like/get', jwt_auth_1.jwtVerify, like_controller_1.getLike);
// Comment Routes
router.post('/comment/create', jwt_auth_1.jwtVerify, comment_controller_1.createComment);
router.get('/comment/get/:page/:pageSize', jwt_auth_1.jwtVerify, comment_controller_1.getComment);
// User Routes
router.get('/get/general', jwt_auth_1.jwtVerify, userController_1.getGeneralizeduser);
router.get('/get/filter/:userId', jwt_auth_1.jwtVerify, userController_1.getFiltereduser);
router.get('/get/recommendation/:userId', jwt_auth_1.jwtVerify, activity_controller_1.recommendationAPI);
router.put('/update/info', jwt_auth_1.jwtVerify, userController_1.updateUSerInfo);
router.put('/update/profile', jwt_auth_1.jwtVerify, userController_1.updateUerProfile);
router.post('/check/follow', jwt_auth_1.jwtVerify, userController_1.checkFollow);
// Histoy Routes
router.post('/history/create', jwt_auth_1.jwtVerify, history_controller_1.createHistory);
router.get('/history/get/:userId', jwt_auth_1.jwtVerify, history_controller_1.getHistory);
router.delete('/history/delete/:historyId', jwt_auth_1.jwtVerify, history_controller_1.deleteHistory);
// Profile View Routes
router.post('/profile/view/create', jwt_auth_1.jwtVerify, profile_view_controller_1.createView);
router.get('/profile/view/get/:email', jwt_auth_1.jwtVerify, profile_view_controller_1.getView);
router.get('/otp', send_email_1.sendEmailForOtp);
router.get('/noti', (req, res) => {
    __1.io.emit('updateNotifications', "This is notification pannel");
    res.send({ Health: "Prod Healt Check Fine", Version: "v0.0" });
});
exports.default = router;
