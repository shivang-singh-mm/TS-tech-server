"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateRedis = exports.redisClient = void 0;
const ioredis_1 = require("ioredis");
exports.redisClient = new ioredis_1.Redis({
    host: "localhost",
    port: 6379,
});
const activateRedis = async (redisObj) => {
    redisObj.on("error", () => {
        console.log("Error connecting to redis");
    });
    redisObj.on("connect", () => {
        console.log("Successfully connected to redis");
    });
};
exports.activateRedis = activateRedis;
