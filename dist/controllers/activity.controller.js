"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendationAPI = void 0;
const activity_services_1 = require("../servives/activity.services");
const recommendationAPI = async (req, res) => {
    const data = {
        userId: req.params.userId
    };
    try {
        if (!data.userId || data.userId == " ")
            return res.status(409).json({ success: false, message: "Enter valid inputs" });
        const activity = new activity_services_1.Activity;
        const body = await activity.recommendationBasedOnActivity(data.userId);
        return res.status(200).json({ success: true, message: "Successfully fetched recommendation", body: body });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Error in fetching recommendations" });
    }
};
exports.recommendationAPI = recommendationAPI;
