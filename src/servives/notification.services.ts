import { PrismaClient } from "@prisma/client";
import { io } from "..";

const prisma = new PrismaClient;

export class Notification {
    notificationDb;
    constructor() {
        this.notificationDb = prisma.notification;
    }
    async createNotification(data: any) {
        return this.notificationDb.create({ data });
    }

    async getNotification(userId: any) {
        return this.notificationDb.findMany({
            where: {
                userId: userId
            },
            include: {
                redirect: true
            },
            orderBy: {
                time: 'desc'
            }
        })
    }

    async markReadNotification(notiId: string) {
        return this.notificationDb.update({
            where: {
                id: notiId
            },
            data: {
                read: true
            }
        })
    }

}
