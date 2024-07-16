import { Request, Response } from "express";
import { Like } from "../servives/like.service";

enum enums {
    COMMENT,
    POST
}

export const createLike = async (req: Request, res: Response) => {
    var data: any = {
        userId: req.body.userId,
        postId: req.body.postId,
        commentId: req.body.commentId,
        likeType: req.body.likeType
    }
    try {
        if ((data.postId == "" || data.postId == " ") && (data.commentId == "" || data.commentId == " "))
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        const like = new Like;
        const body = await like.createLike(data);
        return res.status(200).json({ success: true, message: "Successfully created like", body: body })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to create like" });
    }
}

export const getLike = async (req: Request, res: Response) => {
    const data = {
        postId: req.body.postId,
        commentId: req.body.commentId
    }
    try {
        if ((data.postId == "" || data.postId == " ") && (data.commentId == "" || data.commentId == " "))
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        const like = new Like;
        const body = await like.getPostLike(data.postId);
        return res.status(200).json({ success: true, message: "Successfully retrieved likes", body: body })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to get like" });
    }
}

export const getLikeCount = async (req: Request, res: Response) => {
    const data = {
        postId: req.body.postId,
        commentId: req.body.commentId
    }
    try {
        if ((data.postId == "" || data.postId == " ") && (data.commentId == "" || data.commentId == " "))
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        const like = new Like;
        const body = await like.getPostLikeCount(data.postId);
        return res.status(200).json({ success: true, message: "Successfully retrieved like counts", body: body })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to get like counts" });
    }
}



