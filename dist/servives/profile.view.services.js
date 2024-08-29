"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileView = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient;
class ProfileView {
    constructor() {
        this.profileViewDB = prisma.profileViewed;
        this.user = prisma.users;
    }
    async createViews(data) {
        const result = await this.profileViewDB.findMany({
            where: {
                viewEmail: data.email,
                userId: data.userId
            }
        });
        if (result.length
            != 0) {
            return this.profileViewDB.updateMany({
                where: {
                    viewEmail: data.email,
                    userId: data.userId
                },
                data: {
                    date: data.date
                }
            });
        }
        return this.profileViewDB.create({ data });
    }
    async getViews(email) {
        return this.profileViewDB.findMany({
            where: {
                viewEmail: email
            },
            orderBy: {
                date: 'desc'
            },
            include: {
                user: true
            }
        });
    }
}
exports.ProfileView = ProfileView;
