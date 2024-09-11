"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const client_1 = require("@prisma/client");
const notification_services_1 = require("./notification.services");
const prisma = new client_1.PrismaClient;
class Comment {
    constructor() {
        this.commentDB = prisma.comment;
        this.userDB = prisma.users;
        this.postDB = prisma.post;
    }
    async createComment(data, mentionId, picture, name) {
        if (mentionId) {
            const userEmail = await this.userDB.findUnique({
                where: {
                    userId: mentionId
                },
                select: {
                    email: true
                }
            });
            if (userEmail?.email == null)
                throw new Error("User does not exists");
            data.mentionMail = userEmail.email;
        }
        if (data.postId) {
            const userId = await this.postDB.findUnique({
                where: {
                    id: data.postId
                },
                include: {
                    user: true
                }
            });
            const notification = new notification_services_1.Notification;
            const notificationBody = {
                userId: userId?.userId,
                redirectId: data.userId,
                notificationType: 'COMMENT',
                name: name,
                picture: picture,
                read: false
            };
            if (userId?.userId != data.userId)
                await notification.createNotification(notificationBody);
        }
        return this.commentDB.create({ data });
    }
    async getComment(postId) {
        return this.commentDB.findMany({
            where: {
                postId: postId
            }
        });
    }
    async getCommentCount(postId) {
        return this.commentDB.count({
            where: {
                postId: postId
            }
        });
    }
    async getGeneralizedComments(postId, commentId, page, pageSize) {
        const skip = (page - 1) * pageSize;
        return this.commentDB.findMany({
            where: {
                postId: postId,
                parentCommentId: commentId
            },
            skip: skip,
            take: pageSize,
            orderBy: {
                date: 'desc',
            },
            include: {
                like: true,
                _count: {
                    select: {
                        comment: true,
                        like: true
                    },
                },
                user: true
            },
        });
    }
}
exports.Comment = Comment;
