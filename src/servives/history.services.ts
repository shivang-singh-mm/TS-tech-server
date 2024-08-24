import { $Enums, PrismaClient, history } from "@prisma/client";

const prsima = new PrismaClient;

interface historyInterface {
    startDate: Date;
    endDate: Date | null;
    title: string;
    description: string;
    userId: string;
    tags: string[];
    purpose: $Enums.PURPOSE;
}

export class History {
    readonly historyDB;
    constructor() {
        this.historyDB = prsima.history;
    }

    async createHistory(data: historyInterface) {
        console.log(data);
        return this.historyDB.create({ data })
    }

    async getHistory(userId: string) {
        return this.historyDB.findMany({
            where: {
                userId: userId
            }
        })
    }

    async deleteHistory(id: string) {
        return this.historyDB.delete({
            where: {
                id: id
            }
        })
    }

}