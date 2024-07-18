import * as express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import router from "./routes/userRoutes";
import { redisClient, activateRedis } from "../redis/connectRedis";
import session from "express-session";
import RedisStore from "connect-redis";
import { errorHandler } from "./errorHandlerMiddleware/errorHandler";
import * as socketio from "socket.io";
// import { CorsOptions }, cors from "cors";
import cors from 'cors';
import http from 'http'

const app = express.default();
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

app.use(cors())

app.use("/api/v1/users", router);

app.use(errorHandler);

const server = http.createServer(app);


export const io = new socketio.Server(server)


io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  socket.on('joinRoom', (userId: number) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined room`);
  });

  socket.on('newNotification', (notification: any) => {

    io.to('user_12346').emit('updateNotifications', "notification");
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api/v1/users`);
});




