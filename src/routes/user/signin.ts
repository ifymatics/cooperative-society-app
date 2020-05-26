import express, { Request, Response } from 'express';
import { body } from 'express-validator';



import { validateRequest } from '../../middlewares/validate-request';
import { UserController } from '../../controllers/user-controller'


const router = express.Router();



router.post(
    '/api/users/signin',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().notEmpty().withMessage('You must supply a password'),


    ],
    validateRequest,

    UserController.signIn

);

export { router as signinRouter };




