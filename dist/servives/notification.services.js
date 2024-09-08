"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient;
class Notification {
    constructor() {
        this.notificationDb = prisma.notification;
    }
    async createNotification(data) {
        return this.notificationDb.create({ data });
    }
    async getNotification(userId) {
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
        });
    }
    async markReadNotification(notiId) {
        return this.notificationDb.update({
            where: {
                id: notiId
            },
            data: {
                read: true
            }
        });
    }
}
exports.Notification = Notification;
