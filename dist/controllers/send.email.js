"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailForOtp = void 0;
const ses_email_1 = require("../utils/ses.email");
const sendEmailForOtp = async (req, res) => {
    const data = {
        recipent: req.body.email,
    };
    try {
        const otp = '3456';
        await (0, ses_email_1.sendEmail)('shivangsingh2240@gmail.com', 'shivangsingh2240@gmail.com', otp);
        res.status(200).json({ mesage: "Otp sent sucessfully", otp: otp });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error in sending data" });
    }
};
exports.sendEmailForOtp = sendEmailForOtp;
