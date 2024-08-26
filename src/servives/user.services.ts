import { $Enums, follow, PrismaClient, PURPOSE } from "@prisma/client";
import { Activity } from "./activity.services"

const prisma = new PrismaClient;
interface activity {
    userId: string;
    sectors: string
}


export class User {
    readonly user;
    readonly follow;
    readonly history;
    constructor() {
        this.user = prisma.users;
        this.follow = prisma.follow;
        this.history = prisma.history;
    }

    async getGeneralisedUser(userId: any, email: string | null) {
        var whereClause: any;
        if (email) {
            whereClause = {
                email: email
            };
        }
        else {
            whereClause = {
                userId: userId
            }
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
        })
    }

    async getFiltereduser(userId: string, name: string | null, city: string | null, purpose: string | null, experience: string | null, jobTitle: string | null) {
        // var wname = name;
        var whereClause: any;
        if (name) {
            whereClause = {
                userId: {
                    not: userId
                },
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
            where: whereClause,
            include: {
                followers: {
                    where: {
                        followeeUserId: userId
                    }
                }
            }
        })
    }

    async followOfficialAccounts(followerId: string) {
        var data = await this.user.findMany({
            where: {
                isAdmin: true
            },
            select: {
                userId: true
            }
        })

        var body = data.map(followee => ({
            followeeUserId: followerId,
            followerUserId: followee.userId,
            status: true
        }))
        return this.follow.createMany({
            data: body
        })
    }

    async updateUserInfo(data: any, userId: string) {
        return this.user.update({
            data: data,
            where: {
                userId: userId
            }
        })
    }

    async checkFollow(userId: any, foreignId: any) {
        return this.follow.findMany({
            where: {
                followeeUserId: userId,
                followerUserId: foreignId
            }
        })
    }

}

