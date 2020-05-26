import express, { Request, Response, NextFunction } from "express";
import { currentUser } from "../../middlewares/is-authorized";




const router = express.Router();

router.post('/api/users/is-authorized', currentUser, (req: Request, res: Response, nex: NextFunction) => {
    res.status(200).send({
        authorization: true,
        message: 'Your token is still valid'
    })
});
export { router as isAuthorizedRouter }