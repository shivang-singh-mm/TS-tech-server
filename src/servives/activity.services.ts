import { $Enums, PrismaClient, PURPOSE } from "@prisma/client";

const prisma = new PrismaClient;

interface activity {
    userId: string;
    sectors: string
}

export class Activity {
    readonly activityDB;
    readonly userDB;
    constructor() {
        this.activityDB = prisma.activity;
        this.userDB = prisma.users;
    }

    async createActivity(data: activity) {
        let check = await this.activityDB.findUnique({
            where: {
                userId: data.userId
            }
        });
        if (check != null) {
            console.log(typeof check.sectors[0]);
            if (check.sectors.length == 3) {
                let ar: any = [check.sectors[1], check.sectors[2], data.sectors];
                return this.activityDB.update({
                    where: {
                        userId: data.userId
                    },
                    data: {
                        sectors: ar
                    }
                })
            }
            else {
                let ar: any = [...check.sectors, data.sectors];
                return this.activityDB.update({
                    where: {
                        userId: data.userId
                    },
                    data: {
                        sectors: ar
                    }
                })
            }
        }
        var body: any = {
            userId: data.userId,
            sectors: [data.sectors]
        }
        return this.activityDB.create({
            data: body
        });
    }

    async recommendationBasedOnActivity(userId: string) {
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
            })
        }
        else {
            const queries: any = check.sectors.map(sector => ({
                where: { purpose: sector },
                take: 3,
                include: {
                    followers: {
                        where: {
                            followeeUserId: userId
                        }
                    }
                }
            }));
            return await Promise.all(
                queries.map((query: any) => this.userDB.findMany(query))
            );
        }
    }

}