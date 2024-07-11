import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import router from "./routes/userRoutes";
import { redisClient, activateRedis } from "../redis/connectRedis";
import session from "express-session";
import RedisStore from "connect-redis";
import { errorHandler } from "./errorHandlerMiddleware/errorHandler";

const app = express();
const PORT = process.env.PORT;

// activateRedis(redisClient);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(
//   session({
//     store: new RedisStore({ client: redisClient }),
//     secret: "my_secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 365 * 86400 * 1000,
//     },
//   })
// );

app.use("/api/v1/users", router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api/v1/users`);
});
