"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const client_1 = require("@prisma/client");
const notification_services_1 = require("./notification.services");
const prisma = new client_1.PrismaClient;
class Like {
    constructor() {
        this.likeDB = prisma.like;
        this.postDB = prisma.post;
    }
    async createLike(data, picture, name) {
        if (await this.likeDB.findFirst({
            where: {
                postId: data.postId,
                commentId: data.commentId,
                userId: data.userId
            }
        }) != null)
            throw new Error("Like already Exists");
        if (data.postId) {
            const userId = await this.postDB.findUnique({
                where: {
                    id: data.postId
                }
            });
            const notification = new notification_services_1.Notification;
            const notificationBody = {
                userId: userId?.userId,
                redirectId: data.userId,
                name: name,
                picture: picture,
                notificationType: 'LIKE',
                read: false
            };
            await notification.createNotification(notificationBody);
        }
        return this.likeDB.create({ data });
    }
    async getLike(postId, commentId) {
        return this.likeDB.findMany({
            where: {
                postId: postId,
                commentId: commentId
            },
            include: {
                user: true
            }
        });
    }
    async getPostLikeCount(postId) {
        return this.likeDB.count({
            where: {
                postId: postId
            }
        });
    }
    async deleteLike(postId, userId, commentId) {
        return this.likeDB.deleteMany({
            where: {
                postId: postId,
                userId: userId,
                commentId: commentId
            }
        });
    }
}
exports.Like = Like;
