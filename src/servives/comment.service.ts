import { PrismaClient, commentPost } from "@prisma/client";
import { UUID } from "crypto";

const prisma = new PrismaClient;

interface commentsInterface extends commentPost {

}

export class Comment {
    readonly commentPostDB;
    constructor() {
        this.commentPostDB = prisma.commentPost;
    }

    async createPostComment(data: commentsInterface) {
        return this.commentPostDB.create({ data })
    }

    async getPostComment(postId: UUID) {
        return this.commentPostDB.count({
            where: {
                postId: postId
            }
        })
    }

    // async createCommentLike(data: likesInterface) {
    //     return this.commentPostDB.create({ data })
    // }

    // async getCommentLike(postId: UUID) {
    //     return this.commentPostDB.count({
    //         where: {
    //             postId: postId
    //         }
    //     })
    // }

}