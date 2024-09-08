"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotification = void 0;
const notification_services_1 = require("../servives/notification.services");
const getNotification = async (req, res) => {
    const data = {
        userId: req.params.userId
    };
    try {
        if (!data.userId || data.userId == " ")
            return res.status(409).json({ success: false, message: "Enter valid inputs" });
        const notification = new notification_services_1.Notification;
        const body = await notification.getNotification(data.userId);
        return res.status(200).json({ success: true, message: "Successfully fetched notifications", body: body });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Error in fetching notifications" });
    }
};
exports.getNotification = getNotification;
