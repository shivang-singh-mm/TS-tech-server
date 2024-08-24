"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getView = exports.createView = void 0;
const profile_view_services_1 = require("../servives/profile.view.services");
const createView = async (req, res) => {
    var data = {
        date: new Date(req.body.date),
        userId: req.body.userId,
        viewEmail: req.body.email
    };
    try {
        if (data.userId == "" || data.userId == " ")
            return res.status(409).json({ success: false, message: "Enter valid inputs" });
        const view = new profile_view_services_1.ProfileView;
        const body = await view.createViews(data);
        return res.status(200).json({ success: true, message: "Successfully created view", body: body });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to create view" });
    }
};
exports.createView = createView;
const getView = async (req, res) => {
    var data = {
        viewEmail: req.params.email
    };
    try {
        if (data.viewEmail == "" || data.viewEmail == " ")
            return res.status(409).json({ success: false, message: "Enter valid inputs" });
        const view = new profile_view_services_1.ProfileView;
        const body = await view.getViews(data.viewEmail);
        return res.status(200).json({ success: true, message: "Successfully fetched view", body: body });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to fetch view" });
    }
};
exports.getView = getView;
