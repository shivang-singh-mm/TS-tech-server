"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = void 0;
const sendOtp = async (req, res) => {
    var data = {
        email: req.body.email,
    };
    try {
        if (data.email == "" || data.postId == " ")
            return res.status(409).json({ success: false, message: "Enter valid inputs" });
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        return res.status(200).json({ success: true, message: "Successfully sent otp", body: randomNumber });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Error in sending otp" });
    }
};
exports.sendOtp = sendOtp;
