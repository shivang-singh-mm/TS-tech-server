import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

export class ProfileView {
    readonly profileViewDB;
    readonly user;
    constructor() {
        this.profileViewDB = prisma.profileViewed;
        this.user = prisma.users;
    }

    async createViews(data: any) {
        const result = await this.profileViewDB.findMany({
            where: {
                viewEmail: data.email,
                userId: data.userId
            }
        })
        if (result.length
            != 0) {
            console.log(await this.profileViewDB.findMany({
                where: {
                    viewEmail: data.email,
                    userId: data.userId
                }
            }));
            return this.profileViewDB.updateMany({
                where: {
                    viewEmail: data.email,
                    userId: data.userId
                },
                data: {
                    date: data.date
                }
            })
        }

        return this.profileViewDB.create({ data })
    }

    async getViews(email: string) {
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
        })
    }

}