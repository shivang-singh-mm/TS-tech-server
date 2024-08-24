import { Request, Response } from "express"
import { History } from "../servives/history.services"

export const createHistory = async (req: Request, res: Response) => {
    var data = {
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId,
        tags: req.body.tags,
        purpose: req.body.purpose
    }
    try {
        if (data.title == "" || data.title == " ")
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        if ((data.userId == "" || data.userId == " ") || (!data.startDate))
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        const history = new History;
        const body = await history.createHistory(data);
        return res.status(200).json({ success: true, message: "Successfully created history", body: body })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to create history" });
    }
}



export const getHistory = async (req: Request, res: Response) => {
    var data = {
        userId: req.params.userId,
    }
    try {
        if (data.userId == "" || data.userId == " ")
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        const history = new History;
        const body = await history.getHistory(data.userId);
        return res.status(200).json({ success: true, message: "Successfully retrieved history", body: body })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to get history" });
    }
}

export const deleteHistory = async (req: Request, res: Response) => {
    var data = {
        id: req.params.historyId,
    }
    try {
        if (data.id == "" || data.id == " ")
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        const history = new History;
        const body = await history.deleteHistory(data.id);
        return res.status(200).json({ success: true, message: "Successfully deleted history", body: body })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to delete history" });
    }
}