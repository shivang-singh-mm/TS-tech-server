"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHistory = exports.getHistory = exports.createHistory = void 0;
const history_services_1 = require("../servives/history.services");
const createHistory = async (req, res) => {
    var data = {
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId,
        tags: req.body.tags,
        purpose: req.body.purpose
    };
    try {
        if (data.title == "" || data.title == " ")
            return res.status(409).json({ success: false, message: "Enter valid inputs" });
        if ((data.userId == "" || data.userId == " ") || (!data.startDate))
            return res.status(409).json({ success: false, message: "Enter valid inputs" });
        const history = new history_services_1.History;
        const body = await history.createHistory(data);
        return res.status(200).json({ success: true, message: "Successfully created history", body: body });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to create history" });
    }
};
exports.createHistory = createHistory;
const getHistory = async (req, res) => {
    var data = {
        userId: req.params.userId,
    };
    try {
        if (data.userId == "" || data.userId == " ")
            return res.status(409).json({ success: false, message: "Enter valid inputs" });
        const history = new history_services_1.History;
        const body = await history.getHistory(data.userId);
        return res.status(200).json({ success: true, message: "Successfully retrieved history", body: body });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to get history" });
    }
};
exports.getHistory = getHistory;
const deleteHistory = async (req, res) => {
    var data = {
        id: req.params.historyId,
    };
    try {
        if (data.id == "" || data.id == " ")
            return res.status(409).json({ success: false, message: "Enter valid inputs" });
        const history = new history_services_1.History;
        const body = await history.deleteHistory(data.id);
        return res.status(200).json({ success: true, message: "Successfully deleted history", body: body });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Unable to delete history" });
    }
};
exports.deleteHistory = deleteHistory;
