import { Router } from "express";

import * as root from "../controllers/rootController.js";
import { pfpUploader } from "../config/multerConfig.js";
import { body } from "express-validator";
import { checkValidationErrors, checkFileUpload } from "../middleware/checkErrors.js";

const rootRouter = Router();

rootRouter.get('/', root.getUsers);
rootRouter.put('/pfp', 
    pfpUploader.single('pfp'),
    checkFileUpload,
    body('user').notEmpty().withMessage('User ID must be set!'),
    checkValidationErrors,
    root.updatePfp);
rootRouter.post('/tag', 
    body('user').notEmpty().withMessage('User ID must be set!'),
    body('tags').notEmpty().withMessage('Tags must be set!'),
    checkValidationErrors,
    root.createTag);

export default rootRouter;