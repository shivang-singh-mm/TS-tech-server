import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

interface post {
    mediaLink: string[];
    caption: string;
    description: string;
    tags: string[];
    landmark: string;
    userId: string;
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

    async getGeneralisedFeed(userId: any) {
        const page = 1, pageSize = 10
        const skip = (page - 1) * pageSize;
        return this.postDB.findMany({
            where: {
                userId: userId
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
                        like: true,
                    },
                },
            },
        });
    }

}