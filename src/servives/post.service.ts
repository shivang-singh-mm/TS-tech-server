import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

interface post {
    mediaLink: string[];
    caption: string;
    description: string;
    tags: string[];
    landmark: string;
    postedBy: string;
}

export class Post {
    readonly postDB;
    constructor() {
        this.postDB = prisma.post
    }

    async createPost(data: post) {
        return this.postDB.create({ data });
    }

    async getPost(data: any) {
        return this.postDB.findMany(data)
    }

}