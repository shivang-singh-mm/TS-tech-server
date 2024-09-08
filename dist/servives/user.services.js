"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const client_1 = require("@prisma/client");
const activity_services_1 = require("./activity.services");
const prisma = new client_1.PrismaClient;
class User {
    constructor() {
        this.user = prisma.users;
        this.follow = prisma.follow;
        this.history = prisma.history;
    }
    async getGeneralisedUser(userId, email) {
        var whereClause;
        if (email) {
            whereClause = {
                email: email
            };
        }
        else {
            whereClause = {
                userId: userId
            };
        }
        return this.user.findUnique({
            where: whereClause,
            include: {
                _count: {
                    select: {
                        followers: true,
                        following: true
                    }
                },
                followers: {
                    where: {
                        followeeUserId: userId
                    }
                },
                history: true,
                timelineOfEvents: true,
                post: {
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
                }
            }
        });
    }
    async getFiltereduser(userId, name, city, purpose, experience, tags) {
        var whereClause = {
            userId: {
                not: userId
            }
        };
        if (name) {
            whereClause = {
                name: {
                    contains: name,
                    mode: 'insensitive', // This makes the search case-insensitive
                },
            };
        }
        if (city)
            whereClause.city = city;
        if (experience)
            whereClause.experience = experience;
        if (tags)
            whereClause.tags = {
                has: tags
            };
        if (purpose && purpose != 'All')
            whereClause.purpose = purpose;
        if (tags || city || purpose) {
            const activity = new activity_services_1.Activity;
            const body = {
                userId: userId,
                sectors: purpose ? purpose : null,
                tags: tags ? tags : null,
                location: city ? city : null
            };
            await activity.createActivity(body);
        }
        return this.user.findMany({
            where: whereClause,
            include: {
                followers: {
                    where: {
                        followeeUserId: userId
                    }
                }
            }
        });
    }
    async followOfficialAccounts(followerId) {
        var data = await this.user.findMany({
            where: {
                isAdmin: true
            },
            select: {
                userId: true
            }
        });
        var body = data.map(followee => ({
            followeeUserId: followerId,
            followerUserId: followee.userId,
            status: true
        }));
        return this.follow.createMany({
            data: body
        });
    }
    async updateUserInfo(data, userId) {
        return this.user.update({
            data: data,
            where: {
                userId: userId
            }
        });
    }
    async checkFollow(userId, foreignId) {
        return this.follow.findMany({
            where: {
                followeeUserId: userId,
                followerUserId: foreignId
            }
        });
    }
}
exports.User = User;
