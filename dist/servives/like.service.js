"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient;
class Like {
    constructor() {
        this.likeDB = prisma.like;
    }
    async createLike(data) {
        if (await this.likeDB.findFirst({
            where: {
                postId: data.postId,
                commentId: data.commentId,
                userId: data.userId
            }
        }) != null)
            throw new Error("Like already Exists");
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
