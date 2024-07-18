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
        if (this.likeDB.findFirst({
            where: {
                postId: data.postId,
                commentId: data.commentId,
                userId: data.userId
            }
        }) != null) throw new Error("Like already Exists");

        return this.likeDB.create({ data })
    }

    async getPostLike(postId: any) {
        return this.likeDB.findMany({
            where: {
                postId: postId
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


    async deleteLike(postId: string, userId: string, commentId: string) {
        return this.likeDB.deleteMany({
            where: {
                postId: postId,
                userId: userId,
                commentId: commentId
            }
        })
    }

} 