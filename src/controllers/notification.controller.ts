import { Request, Response } from "express";
import { Activity } from "../servives/activity.services";
import { Notification } from "../servives/notification.services";


export const getNotification = async (req: Request, res: Response) => {
    const data = {
        userId: req.params.userId
    }
    try {
        if (!data.userId || data.userId == " ")
            return res.status(409).json({ success: false, message: "Enter valid inputs" });
        const notification = new Notification;
        const body = await notification.getNotification(data.userId);
        return res.status(200).json({ success: true, message: "Successfully fetched notifications", body: body })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Error in fetching notifications" });
    }
}