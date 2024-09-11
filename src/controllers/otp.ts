import { Request, Response } from "express";

export const sendOtp = async (req: Request, res: Response) => {
    var data: any = {
        email: req.body.email,
    }
    try {
        if (data.email == "" || data.postId == " ")
            return res.status(409).json({ success: false, message: "Enter valid inputs" })
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        return res.status(200).json({ success: true, message: "Successfully sent otp", body: randomNumber })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Error in sending otp" });
    }
}