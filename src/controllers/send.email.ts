import { Response, Request } from "express"
import { sendEmail } from "../utils/ses.email"


export const sendEmailForOtp = async (req: Request, res: Response) => {

    const data = {
        recipent: req.body.email,
    }

    try {
        const otp = '3456';
        await sendEmail('shivangsingh2240@gmail.com', 'shivangsingh2240@gmail.com', otp);
        res.status(200).json({ mesage: "Otp sent sucessfully", otp: otp });
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ message: "Error in sending data" });
    }
}