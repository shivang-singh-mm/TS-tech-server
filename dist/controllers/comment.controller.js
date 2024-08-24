"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentCount = exports.getComment = exports.createComment = void 0;
const comment_service_1 = require("../servives/comment.service");
const createComment = async (req, res) => {
    var data = {
        userId: req.body.userId,
        text: req.body.text,
        media: req.body.media,
        postId: req.body.postId,
        parentCommentId: req.body.parentCommentId,
        commentType: req.body.commentType,
        mentionMail: null
    };
    try {
        if (data.text == "" || data.text == " ")
            return res.status(409).json({ success: false, message: "Enter valid inputs" });
        if (((data.postId == "" || data.postId == " ") && (data.parentCommentId == " " || data.parentCommentId == " ")) || (data.postId?.length && data.parentCommentId?.length))
            return res.status(409).json({ success: false, message: "Enter valid inputs" });
        const comment = new comment_service_1.Comment;
        const body = await comment.createComment(data, req.body.mentionId);
        return res.status(200).json({ success: true, message: "Successfully created comment", body: body });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to create comment" });
    }
};
exports.createComment = createComment;
const getComment = async (req, res) => {
    const data = {
        postId: req.query.postId ? req.query.postId?.toString().trim() : null,
        commentId: req.query.parentCommentId ? req.query.parentCommentId.toString().trim() : null,
        page: parseInt(req.params.page),
        pageSize: parseInt(req.params.pageSize)
    };
    try {
        if ((data.postId == "" || data.postId == " ") && (data.commentId == "" || data.commentId == " "))
            return res.status(409).json({ success: false, message: "Enter valid inputs" });
        const comment = new comment_service_1.Comment;
        const body = await comment.getGeneralizedComments(data.postId, data.commentId, data.page, data.pageSize);
        return res.status(200).json({ success: true, message: "Successfully retrieved comment", body: body });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to get comment" });
    }
};
exports.getComment = getComment;
const getCommentCount = async (req, res) => {
    const data = {
        postId: req.body.postId,
        commentId: req.body.commentId
    };
    try {
        if (data.postId == "" || data.postId == " ") {
            return res.status(409).json({ success: false, message: "Enter valid inputs" });
        }
        const comment = new comment_service_1.Comment;
        const body = await comment.getCommentCount(data.postId);
        return res.status(200).json({ success: true, message: "Successfully retrieved comment counts", body: body });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to get comment counts" });
    }
};
exports.getCommentCount = getCommentCount;
