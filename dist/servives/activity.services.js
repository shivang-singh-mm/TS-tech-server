"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient;
class Activity {
    constructor() {
        this.activityDB = prisma.activity;
        this.userDB = prisma.users;
    }
    async createActivity(data) {
        let check = await this.activityDB.findUnique({
            where: {
                userId: data.userId
            }
        });
        if (check != null) {
            if (!check.sectors.includes(data.sectors)) {
                let sector = check.sectors ? check.sectors : [];
                let location = check.location ? check.location : [];
                let tags = check.tags ? check.tags : [];
                if (data.sectors) {
                    if (sector?.length === 3)
                        sector.shift();
                    sector?.push(data.sectors);
                }
                if (data.location) {
                    if (location?.length === 4)
                        location?.shift();
                    location?.push(data.location);
                }
                if (data.tags) {
                    if (tags?.length === 6)
                        tags.shift();
                    tags?.push(data.tags);
                }
                return this.activityDB.update({
                    where: {
                        userId: data.userId
                    },
                    data: {
                        sectors: sector ? sector : [],
                        location: location ? location : [],
                        tags: tags ? tags : []
                    }
                });
            }
        }
        var body = {
            userId: data.userId,
            sectors: data.sectors ? [data.sectors] : [],
            location: data.location ? [data.location] : [],
            tags: data.tags ? [data.tags] : []
        };
        // if(this)
        return this.activityDB.create({
            data: body
        });
    }
    async recommendationBasedOnActivity(userId) {
        var check = await this.activityDB.findUnique({
            where: {
                userId: userId
            }
        });
        if (check == null) {
            return this.userDB.findMany({
                where: {
                    userId: {
                        not: userId
                    },
                },
                take: 9,
                include: {
                    followers: {
                        where: {
                            followeeUserId: userId
                        }
                    }
                }
            });
        }
        else {
            const queries = check.sectors.map(sector => ({
                where: {
                    purpose: sector,
                    userId: {
                        not: userId
                    },
                    ...(check?.tags?.length && {
                        tags: {
                            hasSome: check.tags // Assuming 'tags' is an array field in the database
                        }
                    }),
                    ...(check?.location && {
                        city: {
                            in: check.location
                        } // Adjust field name as per your database schema
                    })
                },
                take: 3,
                include: {
                    followers: {
                        where: {
                            followeeUserId: userId
                        }
                    }
                }
            }));
            const result = Promise.all(queries.map((query) => this.userDB.findMany(query)));
            var flatResult = (await result).flat();
            const sectors = check.sectors;
            var combineResult = [];
            if (flatResult.length < 9) {
                combineResult = await this.userDB.findMany({
                    where: {
                        purpose: {
                            notIn: sectors
                        },
                        userId: {
                            not: userId
                        }
                    },
                    take: 9 - flatResult.length,
                    include: {
                        followers: {
                            where: {
                                followeeUserId: userId
                            }
                        }
                    }
                });
            }
            flatResult = [...flatResult, ...combineResult];
            return flatResult;
        }
    }
}
exports.Activity = Activity;
