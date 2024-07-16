import { PrismaClient, comment } from "@prisma/client";

const prisma = new PrismaClient;

interface commentsInterface {
    userId: string;
    text: string;
    media: string[];
    postId: string;
    commentType: any;
    mentionMail: any
}

export class Comment {
    readonly commentDB;
    readonly userDB;
    constructor() {
        this.commentDB = prisma.comment;
        this.userDB = prisma.users;
    }

    async createPostComment(data: commentsInterface, mentionId: any) {
        const userEmail = await this.userDB.findUnique({
            where: {
                userId: mentionId
            },
            select: {
                email: true
            }
        })
        if (userEmail?.email == null) throw new Error("User does not exists");
        data.mentionMail = userEmail;
        return this.commentDB.create({ data })
    }

    async getComment(postId: any) {
        return this.commentDB.findMany({
            where: {
                postId: postId
            }
        })
    }

    async getCommentCount(postId: any) {
        return this.commentDB.count({
            where: {
                postId: postId
            }
        })
    }

    async getGeneralizedComments(postId: any) {
        const page = 1, pageSize = 10
        const skip = (page - 1) * pageSize;
        return this.commentDB.findMany({
            where: {
                postId: postId
            },
            orderBy: {
                date: 'desc',
            },
            skip: skip,
            take: pageSize,
            include: {
                _count: {
                    select: {
                        comment: true,
                        like: true
                    },
                },
            },
        })
    }

}