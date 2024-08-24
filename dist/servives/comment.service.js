"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient;
class Comment {
    constructor() {
        this.commentDB = prisma.comment;
        this.userDB = prisma.users;
    }
    async createComment(data, mentionId) {
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
