import { Redis } from "ioredis";

export const redisClient: Redis = new Redis({
  host: "localhost",
  port: 6379,
});

export const activateRedis = async (redisObj: Redis) => {
  redisObj.on("error", () => {
    console.log("Error connecting to redis");
  });

  redisObj.on("connect", () => {
    console.log("Successfully connected to redis");
  });
};
