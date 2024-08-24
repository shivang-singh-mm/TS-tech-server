"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const client_1 = require("@prisma/client");
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
                history: true,
                timelineOfEvents: true,
                post: true
            }
        });
    }
    async getFiltereduser(userId, name, city, purpose, experience, jobTitle) {
        // var wname = name;
        var whereClause;
        if (name) {
            whereClause = {
                name: {
                    contains: name,
                    mode: 'insensitive', // This makes the search case-insensitive
                },
            };
        }
        // var sectors: any = PURPOSE[purpose];
        if (city)
            whereClause.city = city;
        // if (experience)
        //     whereClause.experience = experience;
        // if (jobTitle)
        //     whereClause.jobTitle = jobTitle
        // if (purpose) {
        //     whereClause.purpose = purpose;
        //     const activity = new Activity;
        //     const body: activity = {
        //         userId: userId,
        //         sectors: purpose
        //     }
        //     await activity.createActivity(body)
        // }
        return this.user.findMany({
            where: whereClause
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
}
exports.User = User;
