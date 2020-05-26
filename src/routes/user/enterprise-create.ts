import express, { Request, Response } from 'express';
import { body } from 'express-validator';



import { validateRequest } from '../../middlewares/validate-request';
import { UserController } from '../../controllers/user-controller'


const router = express.Router();



router.post(
    '/api/users/enterprise-create',
    [
        body('userEmail')
            .isEmail()
            .withMessage('Email must be valid'),
        body('ety')
            .trim()
            .notEmpty()
            .withMessage('You must supply a ety')
    ],
    validateRequest,

    UserController.createEnterprise

);

export { router as enterpriseCreateRouter };




