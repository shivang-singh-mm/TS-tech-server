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
    readonly followDB;
    constructor() {
        this.postDB = prisma.post
        this.followDB = prisma.follow
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
                user: true
            },
        });
    }

    async getFollowedPosts(userId: any, page: number, pageSize: number) {
        // const page = 1, pageSize = 10
        const skip = (page - 1) * pageSize;
        var users = await this.followDB.findMany({
            where: {
                followeeUserId: userId
                // followerUserId: userId
            },
            // select: {
            //     // followeeUserId: true
            // }
        })
        var followeeUserId: any = users.map(item => {
            return item.followerUserId
        })
        console.log(followeeUserId)
        followeeUserId.push(userId)
        if (followeeUserId.length == 0) throw new Error("No User");
        return this.postDB.findMany({
            where: {
                userId: {
                    in: followeeUserId
                }
            },
            skip: skip,
            take: pageSize,
            orderBy: {
                date: 'desc',
            },
            include: {
                like: {
                    where: {
                        userId: userId
                    }
                },
                _count: {
                    select: {
                        comment: true,
                        like: true,
                    },
                },
                user: true
            },
        });
    }

    async getUserPosts(userId: any, page: number, pageSize: number) {
        // const page = 1, pageSize = 10
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
                user: true
            },
        });
    }

}