import { Request, Response } from "express";
import { Like } from "../servives/like.service";

enum enums {
    COMMENT,
    POST
}

export const createLike = async (req: Request, res: Response) => {
    var data: any = {
        userId: req.body.userId,
        postId: req.body.postId ? req.body.postId : null,
        commentId: req.body.commentId ? req.body.commentId : null,
        likeType: req.body.likeType,
    }
    const picture = req.body.picture
    const name = req.body.name
    try {
        if ((data.postId == "" || data.postId == " ") && (data.commentId == "" || data.commentId == " "))
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        const like = new Like;
        const body = await like.createLike(data, picture, name);
        return res.status(200).json({ success: true, message: "Successfully created like", body: body })
    }
    catch (err) {
        console.log(err);
        if (err = "Like already Exists")
            return res.status(400).json({ success: false, message: "Like already exists" });
        return res.status(400).json({ success: false, message: "Unable to create like" });
    }
}

export const getLike = async (req: Request, res: Response) => {
    const data = {
        postId: req.query.postId ? req.query.postId.toString().trim() : null,
        commentId: req.query.commentId ? req.query.commentId.toString().trim() : null
    }
    try {
        if (((data.postId == "" || data.postId == " ") && (data.commentId == "" || data.commentId == " ")) || (data.postId?.length && data.commentId?.length))
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        const like = new Like;
        const body = await like.getLike(data.postId, data.commentId);
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


export const deleteLike = async (req: Request, res: Response) => {
    var data = {
        postId: req.query.postId ? req.query.postId.toString() : null,
        commentId: req.query.commentId ? req.query.commentId.toString() : null,
        userId: req.params.userId
    }
    try {
        if ((data.postId == "" || data.postId == " ") && (data.commentId == "" || data.commentId == " "))
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        if (data.postId) data.postId = data.postId.trim()
        else if (data.commentId) data.commentId = data.commentId.trim();
        const like = new Like;
        const body = await like.deleteLike(data.postId, data.userId, data.commentId);
        if (body.count == 0) return res.status(400).json({ success: false, message: "No such like exists" });
        return res.status(200).json({ success: true, message: "Successfully deleted likes", body: body })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to delete like counts" });
    }
}

