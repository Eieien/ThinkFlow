import { Router } from "express";
import { body, cookie } from "express-validator";

import * as auth from "../controllers/authController.js";
import { checkValidationErrors } from "../middleware/checkErrors.js";

const authRouter = Router();

authRouter.post('/signup',
    body('username').notEmpty().withMessage('Username not found!'),
    body('email').notEmpty().withMessage('Email not found!')
        .isEmail().withMessage('Invalid email!'),
    body('password').notEmpty().withMessage('Password not found!')
        .isLength(8).withMessage('Password must be at least 8 characters long!'),
    checkValidationErrors, 
    auth.signup);
authRouter.post('/login',
    body('email').notEmpty().withMessage('Email not found!')
        .isEmail().withMessage('Invalid email!'),
    body('password').notEmpty().withMessage('Password not found!'),
    cookie('jwt').isEmpty().withMessage('You are already logged in!'),
    checkValidationErrors, 
    auth.login);
authRouter.put('/change-password',
    body('email').notEmpty().withMessage('Email must be set!'),
    body('password').notEmpty().withMessage('New password not set!'),
    body('confPassword').notEmpty().withMessage('Must confirm password!'),
    checkValidationErrors,
    auth.changePassword);
authRouter.use(cookie('jwt').notEmpty().withMessage('You are not logged in!'), checkValidationErrors)
authRouter.get('/refresh', auth.refresh);
authRouter.delete('/logout', auth.logout);

export default authRouter;