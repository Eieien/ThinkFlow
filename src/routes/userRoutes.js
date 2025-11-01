import { Router } from "express";
import { body } from "express-validator";

import UserController from "../controllers/userController.js";
import { pfpUploader } from "../config/multerConfig.js";
import { checkFileUpload } from "../middleware/errorHandler.js";
import { checkValidationErrors } from "../middleware/errorHandler.js";

const userRouter = Router();

userRouter.get('/', UserController.getUsers);
userRouter.get('/:id', UserController.getOneUser);

userRouter.route('/pfp/:id')
    .put(pfpUploader.single('pfp'),
        checkFileUpload,
        UserController.updatePfp)
    .delete(UserController.deletePfp)
userRouter.get('/pfp/:img', UserController.getPfp)

userRouter.post('/tags/create',
    body('name').notEmpty().withMessage('Tag name not set!'),
    body('color').optional().isHexColor().withMessage('Color must be a valid hex color!'),
    checkValidationErrors,
    UserController.createTag);
userRouter.route('/tags/:id')
    .get(UserController.getUserTags)
    .delete(UserController.deleteTag);

export default userRouter;