import { Request, Response } from "express";
import { Activity } from "../servives/activity.services";


export const recommendationAPI = async (req: Request, res: Response) => {
    const data = {
        userId: req.params.userId
    }
    try {
        if (!data.userId || data.userId == " ")
            return res.status(409).json({ success: false, message: "Enter valid inputs" });
        const activity = new Activity;
        const body = await activity.recommendationBasedOnActivity(data.userId);
        return res.status(200).json({ success: true, message: "Successfully fetched recommendation", body: body })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Error in fetching recommendations" });
    }
}