import { $Enums, PrismaClient, comment, notification } from "@prisma/client";
import { Notification } from "./notification.services";

const prisma = new PrismaClient;

interface commentsInterface {
    userId: string;
    text: string;
    media: string[];
    postId: string;
    commentType: $Enums.COMMENTTYPES;
    mentionMail: string | null;
    parentCommentId: string | null;
}

export class Comment {
    readonly commentDB;
    readonly userDB;
    readonly postDB;
    constructor() {
        this.commentDB = prisma.comment;
        this.userDB = prisma.users;
        this.postDB = prisma.post;
    }

    async createComment(data: any, mentionId: string | null, picture: string, name: string) {
        if (mentionId) {
            const userEmail = await this.userDB.findUnique({
                where: {
                    userId: mentionId
                },
                select: {
                    email: true
                }
            });
            if (userEmail?.email == null) throw new Error("User does not exists");
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
            })
            const notification = new Notification;
            const notificationBody: any = {
                userId: userId?.userId,
                redirectId: data.userId,
                notificationType: 'COMMENT',
                name: name,
                picture: picture,
                read: false
            }
            if (userId?.userId != data.userId) await notification.createNotification(notificationBody)
        }


        return this.commentDB.create({ data });
    }

    async getComment(postId: any) {
        return this.commentDB.findMany({
            where: {
                postId: postId
            }
        });
    }

    async getCommentCount(postId: any) {
        return this.commentDB.count({
            where: {
                postId: postId
            }
        })
    }

    async getGeneralizedComments(postId: string | null, commentId: string | null, page: number, pageSize: number) {
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
        })
    }

}