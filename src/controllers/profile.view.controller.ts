import { Request, Response } from "express"
import { ProfileView } from "../servives/profile.view.services"

export const createView = async (req: Request, res: Response) => {
    var data = {
        date: new Date(req.body.date),
        userId: req.body.userId,
        viewEmail: req.body.email
    }
    try {
        if (data.userId == "" || data.userId == " ")
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        const view = new ProfileView;
        const body = await view.createViews(data);
        return res.status(200).json({ success: true, message: "Successfully created view", body: body })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to create view" });
    }
}

export const getView = async (req: Request, res: Response) => {
    var data = {
        viewEmail: req.params.email
    }
    try {
        if (data.viewEmail == "" || data.viewEmail == " ")
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        const view = new ProfileView;
        const body = await view.getViews(data.viewEmail);
        return res.status(200).json({ success: true, message: "Successfully fetched view", body: body })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to fetch view" });
    }
}