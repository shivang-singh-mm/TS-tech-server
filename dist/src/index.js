"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const connectRedis_1 = require("../redis/connectRedis");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const errorHandler_1 = require("./errorHandlerMiddleware/errorHandler");
const app = (0, express_1.default)();
const PORT = process.env.PORT;
(0, connectRedis_1.activateRedis)(connectRedis_1.redisClient);
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, express_session_1.default)({
    store: new connect_redis_1.default({ client: connectRedis_1.redisClient }),
    secret: "my_secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 365 * 86400 * 1000,
    },
}));
app.use("/api/v1/users", userRoutes_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api/v1/users`);
});
