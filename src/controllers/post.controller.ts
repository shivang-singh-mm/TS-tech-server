import { Response, Request } from "express"
import { Post } from "../servives/post.service"

export const postCreate = async (req: Request, res: Response) => {

    const data = {
        mediaLink: req.body.mediaLink,
        caption: req.body.caption,
        description: req.body.description,
        tags: req.body.tags != "" ? JSON.parse(req.body.tags) : " ",
        landmark: req.body.landmark,
        postedBy: req.body.userId
    }

    try {
        if (!data.mediaLink || !data.postedBy || data.mediaLink == " " || data.postedBy == " ") {
            console.log("Data not provided");
            return res.status(422).json({ success: false, message: "Data Incomplete" })
        }
        const post = new Post;
        await post.createPost(data);

    }
    catch (err) {

    }

}