"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = jwtVerify;
const jsonwebtoken_1 = require("jsonwebtoken");
const privatekey = process.env.PRIVATE_KEY;
function jwtVerify(req, res, next) {
    const authorization = req.headers.authorization;
    try {
        if (!authorization) {
            return res.status(401).send({ message: "Not Authorized" });
        }
        const token = authorization.replace("Bearer ", "");
        (0, jsonwebtoken_1.verify)(token, privatekey, (err, payload) => {
            if (err) {
                return res.status(401).send({ mesage: "Your auth token is not valid" });
            }
            next();
        });
    }
    catch (e) {
        console.log(e);
        return res.status(400).send({ message: "Error in authenticating token" });
    }
}
