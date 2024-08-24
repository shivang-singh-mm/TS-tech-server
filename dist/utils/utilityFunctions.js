"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrorHandler = void 0;
const zod_1 = require("zod");
const http_status_codes_1 = require("http-status-codes");
const validationErrorHandler = (error, res) => {
    if (error instanceof zod_1.ZodError) {
        const errorMessages = error.errors.map((issue) => ({
            message: `${issue.message} at ${issue.path.join(".")}`,
        }));
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ error: "Invalid data", details: errorMessages });
    }
    else {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Internal Server Error" });
    }
};
exports.validationErrorHandler = validationErrorHandler;
