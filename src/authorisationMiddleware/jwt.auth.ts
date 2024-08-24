import { verify } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

const privatekey: any = process.env.PRIVATE_KEY

export function jwtVerify(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    try {
        if (!authorization) {
            return res.status(401).send({ message: "Not Authorized" })
        }
        const token = authorization.replace("Bearer ", "");
        verify(token, privatekey, (err: any, payload: any) => {
            if (err) {
                return res.status(401).send({ mesage: "Your auth token is not valid" });
            }
            next();
        });
    }
    catch (e) {
        console.log(e);
        return res.status(400).send({ message: "Error in authenticating token" })
    }
}