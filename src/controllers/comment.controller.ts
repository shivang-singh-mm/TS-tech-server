import { Request, Response } from "express";
import { Comment } from "../servives/comment.service";


export const createCommentOnPost = async (req: Request, res: Response) => {
    var data = {
        userId: req.body.userId,
        text: req.body.text,
        media: req.body.media ? JSON.parse(req.body.media) : null,
        postId: req.body.postId,
        parentCommentId: req.body.parentCommentId,
        commentType: req.body.commentType,
        mentionMail: ''
    }
    try {
        if (data.text == "" || data.text == " ")
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        if ((data.postId == "" || data.postId == " ") && (data.parentCommentId == " " || data.parentCommentId == " "))
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        const comment = new Comment;
        const body = await comment.createPostComment(data, req.body.mentionId);
        return res.status(200).json({ success: true, message: "Successfully created comment", body: body })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to create comment" });
    }
}

export const getComment = async (req: Request, res: Response) => {
    const data = {
        postId: req.body.postId,
        commentId: req.body.commentId
    }
    try {
        if ((data.postId == "" || data.postId == " ") && (data.commentId == "" || data.commentId == " "))
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        const comment = new Comment;
        const body = await comment.getComment(data.postId);
        return res.status(200).json({ success: true, message: "Successfully retrieved comment", body: body })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to get comment" });
    }
}

export const getCommentCount = async (req: Request, res: Response) => {
    const data = {
        postId: req.body.postId,
        commentId: req.body.commentId
    }
    try {
        if (data.postId == "" || data.postId == " ") {
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        }
        const comment = new Comment;
        const body = await comment.getCommentCount(data.postId);
        return res.status(200).json({ success: true, message: "Successfully retrieved comment counts", body: body })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to get comment counts" });
    }
}
