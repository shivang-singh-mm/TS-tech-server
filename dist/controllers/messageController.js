"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMsg = exports.getChatrooms = exports.getMsgs = void 0;
const http_status_codes_1 = require("http-status-codes");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getMsgs = async (req, res, next) => {
    const chatRoomId = req.params.chatRoomId;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    try {
        const messages = await prisma.message.findMany({
            where: { chatRoomId },
            include: {
                from: {
                    select: {
                        userId: true,
                        name: true,
                    },
                },
                to: {
                    select: {
                        userId: true,
                        name: true,
                    },
                },
            },
            orderBy: {
                timeStamp: "asc",
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
        const serializedMessages = messages.map((message) => ({
            ...message,
            id: message.id.toString(),
        }));
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(serializedMessages);
    }
    catch (error) {
        next(error);
    }
};
exports.getMsgs = getMsgs;
const getChatrooms = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const rooms = await prisma.chatRoom.findMany({
            where: {
                participants: {
                    some: {
                        userId: userId,
                    },
                },
            },
            include: {
                participants: true,
            },
        });
        res.status(http_status_codes_1.StatusCodes.OK).json(rooms);
    }
    catch (error) {
        next(error);
    }
};
exports.getChatrooms = getChatrooms;
const deleteMsg = async (req, res, next) => {
    const { messageId } = req.params;
    try {
        const existingMessage = await prisma.message.findUnique({
            where: { id: BigInt(messageId) },
        });
        if (!existingMessage) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Message not found",
            });
        }
        await prisma.message.delete({
            where: { id: BigInt(messageId) },
        });
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            success: true,
            message: "Message deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteMsg = deleteMsg;
