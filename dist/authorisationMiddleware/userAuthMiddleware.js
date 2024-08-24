"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = exports.checkLoggedIn = void 0;
const http_status_codes_1 = require("http-status-codes");
const checkLoggedIn = (req, res, next) => {
    if (req.session.loggedIn) {
        next();
    }
    else {
        res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ error: "You are not logged in" });
    }
};
exports.checkLoggedIn = checkLoggedIn;
const checkAdmin = (req, res, next) => {
    if (req.session.admin) {
        next();
    }
    else {
        res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ error: "You are not an admin" });
    }
};
exports.checkAdmin = checkAdmin;
