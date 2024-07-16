import { PrismaClient } from "@prisma/client";

const prsima = new PrismaClient;

interface historyInterface {

}

export class History {
    readonly historyDB;
    constructor() {
        this.historyDB = prsima.history;
    }

    async createHistory(data:)

}