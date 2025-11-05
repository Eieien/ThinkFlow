import { Router } from "express";
import { body, cookie } from "express-validator";

import AuthController from "../controllers/authController.js";
import { checkValidationErrors } from "../middleware/errorHandlers.js";

const authRouter = Router();

authRouter.post('/signup',
    body('username').notEmpty().withMessage('Username is empty!'),
    body('email').notEmpty().withMessage('Email is empty!')
        .isEmail().withMessage('Invalid email!'),
    body('password').notEmpty().withMessage('Password is empty!')
        .isLength(8).withMessage('Password must be at least 8 characters long!'),
    body('confirmPassword').notEmpty().withMessage('Confirm password is empty!'),
    checkValidationErrors,
    AuthController.signup);
authRouter.post('/login',
    body('email').notEmpty().withMessage('Email not found!')
        .isEmail().withMessage('Invalid email!'),
    body('password').notEmpty().withMessage('Password not found!'),
    cookie('jwt').isEmpty().withMessage('You are already logged in!'),
    checkValidationErrors,
    AuthController.login);
authRouter.put('/change-password',
    body('email').notEmpty().withMessage('Email must be set!'),
    body('password').notEmpty().withMessage('New password not set!'),
    body('confPassword').notEmpty().withMessage('Must confirm password!'),
    checkValidationErrors,
    AuthController.changePassword);
authRouter.use(cookie('jwt').notEmpty().withMessage('You are not logged in!'), checkValidationErrors)
authRouter.get('/refresh', AuthController.refresh);
authRouter.delete('/logout', AuthController.logout);

export default authRouter;