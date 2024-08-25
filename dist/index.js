"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express = __importStar(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorHandler_1 = require("./errorHandlerMiddleware/errorHandler");
const socketio = __importStar(require("socket.io"));
// import { CorsOptions }, cors from "cors";
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = express.default();
const PORT = process.env.PORT;
// activateRedis(redisClient);
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// app.use(
//   session({
//     store: new RedisStore({ client: redisClient }),
//     secret: "my_secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 365 * 60 * 60 * 60 * 1000
//       // parseInt(sessionDuration),
//     },
//   })
// );
app.use((0, cors_1.default)({
    origin: 'https://starlit-lollipop-0f4e22.netlify.app', // Your frontend's origin
    credentials: true // Allow cookies to be sent with requests
}));
app.use("/api/v1/users", userRoutes_1.default);
app.use(errorHandler_1.errorHandler);
const server = http_1.default.createServer(app);
exports.io = new socketio.Server(server);
exports.io.on('connection', (socket) => {
    console.log('New client connected', socket.id);
    socket.on('joinRoom', (userId) => {
        socket.join(`user_${userId}`);
        console.log(`User ${userId} joined room`);
    });
    socket.on('newNotification', (notification) => {
        exports.io.to('user_12346').emit('updateNotifications', "notification");
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api/v1/users`);
});
