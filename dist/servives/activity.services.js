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
            console.log(typeof check.sectors[0]);
            if (check.sectors.length == 3) {
                let ar = [check.sectors[1], check.sectors[2], data.sectors];
                return this.activityDB.update({
                    where: {
                        userId: data.userId
                    },
                    data: {
                        sectors: ar
                    }
                });
            }
            else {
                let ar = [...check.sectors, data.sectors];
                return this.activityDB.update({
                    where: {
                        userId: data.userId
                    },
                    data: {
                        sectors: ar
                    }
                });
            }
        }
        var body = {
            userId: data.userId,
            sectors: [data.sectors]
        };
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
            const purpose = await this.userDB.findUnique({
                where: {
                    userId: userId
                },
                select: {
                    purpose: true
                }
            });
            return this.userDB.findMany({
                // where: {
                //     purpose: purpose.purpose
                // },
                take: 9
            });
        }
        else {
            const queries = check.sectors.map(sector => ({
                where: { purpose: sector },
                take: 3,
            }));
            return await Promise.all(queries.map((query) => this.userDB.findMany(query)));
        }
    }
}
exports.Activity = Activity;
