import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

interface likesInterface {
    userId: string;
    postId: string;
    commentId: string;
    likeType: any
}

export class Like {
    readonly likeDB;
    constructor() {
        this.likeDB = prisma.like;
    }

    async createLike(data: likesInterface) {
        if (await this.likeDB.findFirst({
            where: {
                postId: data.postId,
                commentId: data.commentId,
                userId: data.userId
            }
        }) != null) throw new Error("Like already Exists");

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