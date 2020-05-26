import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { UserDoc } from '../models/user';
interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserDoc
        }
    }
}
export const currentUser = (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization)
        throw new NotAuthorizedError
    // return next();

    try {
        if (/\s/.test(req.headers.authorization.trim())) {

            req.headers.authorization = req.headers.authorization.split(' ')[1];
        }

        const payLoad = jwt.verify(req.headers.authorization, process.env.JWT_KEY!) as UserDoc;
        req.currentUser = payLoad;


    } catch (err) {

        throw new NotAuthorizedError
    }
    next();
}