import express, { Request, Response } from 'express';
import { body } from 'express-validator';


import { validateRequest } from '../../middlewares/validate-request';
import { UserController } from '../../controllers/user-controller'
const router = express.Router();

router.post(
    '/api/users/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters'),
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().notEmpty().withMessage('You must supply a password'),
        body('firstName').trim().notEmpty().withMessage('You must supply your first name'),
        body('lastName').trim().notEmpty().withMessage('You must supply your last name'),
        body('pin').trim().notEmpty().withMessage('You must supply a pin'),
        body('tel').trim().notEmpty().withMessage('You must supply your tel'),
        body('gender').trim().notEmpty().withMessage('You must supply your gender'),
        body('maritalStatus').trim().notEmpty().withMessage('You must supply your marital status'),
        body('isNigeria').isBoolean().notEmpty().withMessage('You must indicate if you are a nigerian or not'),
        body('isAdmin').isBoolean().notEmpty().withMessage('You must select if you are an admin'),
        body('isAgent').isBoolean().notEmpty().withMessage('You must select if you are an agent'),
        body('isDev').trim().notEmpty().withMessage('Indicate if you are a developer'),
    ],
    validateRequest,
    UserController.signup
);

export { router as signupRouter };