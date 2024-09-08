import { PrismaClient } from "@prisma/client";
import { Notification } from "./notification.services";

const prisma = new PrismaClient;

interface likesInterface {
    userId: string;
    postId: string;
    commentId: string;
    likeType: any,
}

export class Like {
    readonly likeDB;
    readonly postDB;
    constructor() {
        this.likeDB = prisma.like;
        this.postDB = prisma.post;
    }

    async createLike(data: likesInterface, picture: string, name: string) {
        if (await this.likeDB.findFirst({
            where: {
                postId: data.postId,
                commentId: data.commentId,
                userId: data.userId
            }
        }) != null) throw new Error("Like already Exists");

        if (data.postId) {
            const userId = await this.postDB.findUnique({
                where: {
                    id: data.postId
                }
            })
            const notification = new Notification;
            const notificationBody: any = {
                userId: userId?.userId,
                redirectId: data.userId,
                name: name,
                picture: picture,
                notificationType: 'LIKE',
                read: false
            }
            if (userId?.userId != data.userId) await notification.createNotification(notificationBody)
        }

        return this.likeDB.create({ data })
    }

    async getLike(postId: string | null, commentId: string | null) {
        return this.likeDB.findMany({
            where: {
                postId: postId,
                commentId: commentId
            },
            include: {
                user: true
            }
        })
    }

    async getPostLikeCount(postId: string) {
        return this.likeDB.count({
            where: {
                postId: postId
            }
        })
    }


    async deleteLike(postId: string | null, userId: string, commentId: string | null) {
        return this.likeDB.deleteMany({
            where: {
                postId: postId,
                userId: userId,
                commentId: commentId
            }
        })
    }

} 