"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient;
class Post {
    constructor() {
        this.postDB = prisma.post;
        this.followDB = prisma.follow;
    }
    async createPost(data) {
        return this.postDB.create({ data });
    }
    async getPost(data) {
        return this.postDB.findMany(data);
    }
    async getGeneralisedFeed(userId) {
        const page = 1, pageSize = 10;
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
    async getFollowedPosts(userId, page, pageSize) {
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
        });
        var followeeUserId = users.map(item => {
            return item.followerUserId;
        });
        console.log(followeeUserId);
        followeeUserId.push(userId);
        if (followeeUserId.length == 0)
            throw new Error("No User");
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
    async getUserPosts(userId, page, pageSize) {
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
exports.Post = Post;
