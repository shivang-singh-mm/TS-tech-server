import { PrismaClient } from "@prisma/client";
import { io } from "..";

const prisma = new PrismaClient;

export class Notification {
    notificationDb;
    constructor() {
        this.notificationDb = prisma.notification;
    }
    async createNotification(data: any) {
        await this.notificationDb.create(data);
        io.to(`user_123456`).emit('updateNotifications', "data12");
        return this.notificationDb.create({ data });
    }
}
