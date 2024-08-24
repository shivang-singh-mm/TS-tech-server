"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const client_1 = require("@prisma/client");
const __1 = require("..");
const prisma = new client_1.PrismaClient;
class Notification {
    constructor() {
        this.notificationDb = prisma.notification;
    }
    async createNotification(data) {
        await this.notificationDb.create(data);
        __1.io.to(`user_123456`).emit('updateNotifications', "data12");
        return this.notificationDb.create({ data });
    }
}
exports.Notification = Notification;
