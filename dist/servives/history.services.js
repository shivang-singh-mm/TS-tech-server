"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = void 0;
const client_1 = require("@prisma/client");
const prsima = new client_1.PrismaClient;
class History {
    constructor() {
        this.historyDB = prsima.history;
    }
    async createHistory(data) {
        return this.historyDB.create({ data });
    }
    async getHistory(userId) {
        return this.historyDB.findMany({
            where: {
                userId: userId
            }
        });
    }
    async deleteHistory(id) {
        return this.historyDB.delete({
            where: {
                id: id
            }
        });
    }
}
exports.History = History;
