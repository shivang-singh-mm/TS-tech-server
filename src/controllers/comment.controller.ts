import { Request, Response } from "express";
import { Comment } from "../servives/comment.service";


export const createComment = async (req: Request, res: Response) => {
    var data: any = {
        userId: req.body.userId,
        text: req.body.text,
        media: req.body.media,
        postId: req.body.postId,
        parentCommentId: req.body.parentCommentId,
        commentType: req.body.commentType,
        mentionMail: null,
    }
    const picture = req.body.picture
    const name = req.body.name
    try {
        if (data.text == "" || data.text == " ")
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        if (((data.postId == "" || data.postId == " ") && (data.parentCommentId == " " || data.parentCommentId == " ")) || (data.postId?.length && data.parentCommentId?.length))
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        const comment = new Comment;
        const body = await comment.createComment(data, req.body.mentionId, picture, name);
        return res.status(200).json({ success: true, message: "Successfully created comment", body: body })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to create comment" });
    }
}

export const getComment = async (req: Request, res: Response) => {
    const data = {
        postId: req.query.postId ? req.query.postId?.toString().trim() : null,
        commentId: req.query.parentCommentId ? req.query.parentCommentId.toString().trim() : null,
        page: parseInt(req.params.page),
        pageSize: parseInt(req.params.pageSize)
    }
    try {
        if ((data.postId == "" || data.postId == " ") && (data.commentId == "" || data.commentId == " "))
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        const comment = new Comment;
        const body = await comment.getGeneralizedComments(data.postId, data.commentId, data.page, data.pageSize);
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
