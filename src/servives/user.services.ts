import { $Enums, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;


export class User {
    readonly user;
    readonly follow;
    readonly history;
    constructor() {
        this.user = prisma.users;
        this.follow = prisma.follow;
        this.history = prisma.history;
    }

    async getGeneralisedUser(userId: string, email: string) {
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
                history: true,
                timelineOfEvents: true
            }
        })
    }

    async getFiltereduser(comapny: string, name: string, city: string, purpose: $Enums.PURPOSE) {
        const whereClause: any = {
            name: {
                contains: name,
                mode: 'insensitive', // This makes the search case-insensitive
            },
        };

        if (city)
            whereClause.city = city;
        if (comapny)
            whereClause.comapny = comapny;
        if (purpose)
            whereClause.purpose = purpose;
        return this.user.findMany({
            where: whereClause
        })
    }

}