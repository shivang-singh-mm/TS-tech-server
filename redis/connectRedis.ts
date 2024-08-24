import { Redis } from "ioredis";

const host: any = process.env.REDIS_HOST;
const port: any = process.env.REDIS_PORT

export const redisClient: Redis = new Redis({
  host: host,
  port: port
});

export const activateRedis = async (redisObj: Redis) => {
  redisObj.on("error", (err) => {
    console.log("Error connecting to redis", err);
  });

  redisObj.on("connect", () => {
    console.log("Successfully connected to redis");
  });
};
