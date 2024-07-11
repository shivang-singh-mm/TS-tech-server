import { PrismaClient, likePost } from "@prisma/client";
import { UUID } from "crypto";

const prisma = new PrismaClient;

interface likesInterface extends likePost {

}

export class Like {
    readonly likePostDB;
    constructor() {
        this.likePostDB = prisma.likePost;
    }

    async createPostLike(data: likesInterface) {
        return this.likePostDB.create({ data })
    }

    async getPostLike(postId: UUID) {
        return this.likePostDB.count({
            where: {
                postId: postId
            }
        })
    }

    // async createCommentLike(data: likesInterface) {
    //     return this.likePostDB.create({ data })
    // }

    // async getCommentLike(postId: UUID) {
    //     return this.likePostDB.count({
    //         where: {
    //             postId: postId
    //         }
    //     })
    // }

} 