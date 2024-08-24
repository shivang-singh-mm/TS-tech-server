"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const library_1 = require("@prisma/client/runtime/library");
const errorHandler = (error, req, res, next) => {
    if (error instanceof zod_1.ZodError) {
        const errorMessages = error.errors.map((issue) => ({
            message: `${issue.message} at ${issue.path.join(".")}`,
        }));
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ error: "Invalid data", details: errorMessages });
    }
    if (error instanceof library_1.PrismaClientKnownRequestError) {
        return res
            .status(http_status_codes_1.StatusCodes.CONFLICT)
            .json({ message: "existing user or data" });
    }
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
};
exports.errorHandler = errorHandler;
