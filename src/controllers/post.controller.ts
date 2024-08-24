import { Response, Request } from "express"
import { Post } from "../servives/post.service"

export const postCreate = async (req: Request, res: Response) => {

    const data = {
        mediaLink: req.body.mediaLink,
        caption: req.body.caption,
        description: req.body.description,
        tags: req.body.tags,
        landmark: req.body.landmark,
        userId: req.body.userId
    }

    try {
        if (!data.mediaLink || !data.userId || data.mediaLink == " " || data.userId == " ") {
            console.log("Data not provided");
            return res.status(422).json({ success: false, message: "Data Incomplete" })
        }
        const post = new Post;
        const body = await post.createPost(data);
        return res.status(200).json({ success: true, message: "Successfully created post", body: body })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to create post" });
    }

}


export const getGeneralizedFeed = async (req: Request, res: Response) => {

    const data = {
        userId: req.params.userId,
        page: parseInt(req.params.page),
        pageSize: parseInt(req.params.pageSize)
    }

    try {
        if (!data.userId || data.userId == " ") {
            console.log("UserId not provided");
            return res.status(422).json({ success: false, message: "Data Incomplete" })
        }
        const post = new Post;
        const body = await post.getFollowedPosts(data.userId, data.page, data.pageSize);

        return res.status(200).json({ success: true, message: "Successfully fetched post", body: body })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to get post" });
    }

}

export const getUserFeed = async (req: Request, res: Response) => {

    const data = {
        userId: req.params.userId,
        page: parseInt(req.params.page),
        pageSize: parseInt(req.params.pageSize)
    }

    try {
        if (!data.userId || data.userId == " ") {
            console.log("UserId not provided");
            return res.status(422).json({ success: false, message: "Data Incomplete" })
        }
        const post = new Post;
        const body = await post.getUserPosts(data.userId, data.page, data.pageSize);

        return res.status(200).json({ success: true, message: "Successfully fetched post", body: body })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to get post" });
    }

}

