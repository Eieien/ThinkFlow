import { Router } from "express";
import { body } from "express-validator";

import UserController from "../controllers/userController.js";
import { pfpUploader } from "../config/multerConfig.js";
import { checkValidationErrors, checkFileUpload } from "../middleware/errorHandlers.js";
import verifyToken from "../middleware/verifyToken.js";

const userRouter = Router();

// userRouter.use(verifyToken);
userRouter.get('/', UserController.getUsers);
userRouter.route('/:id')
    .get(UserController.getOneUser)
    .put(body('username').notEmpty().withMessage('Username must be set!'),
        body('email').notEmpty().withMessage('Email must be set!')
            .isEmail().withMessage('Invalid email!'),
        body('deactivated').notEmpty().withMessage('Deactivated must be set!')
            .isBoolean().withMessage('Deactivated must be boolean value!'),
        checkValidationErrors,
        UserController.updateUser);
userRouter.route('/pfp/:id')
    .get(UserController.getPfp)
    .put(pfpUploader.single('pfp'),
        checkFileUpload,
        UserController.updatePfp)
    .delete(UserController.deletePfp)

export default userRouter;