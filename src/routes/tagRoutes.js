import { Router } from "express";
import { body } from "express-validator";

import { checkValidationErrors } from "../middleware/errorHandlers.js";
import TagController from "../controllers/tagController.js";

const tagRouter = Router();

tagRouter.get('/user/:id', TagController.getUserTags);
tagRouter.post('/create',
    body('userId').notEmpty().withMessage('User id must be set!'),
    body('name').notEmpty().withMessage('Tag name not set!'),
    body('color').isHexColor().withMessage('Color must be a valid hex color!'),
    checkValidationErrors,
    TagController.createTag);
tagRouter.route('/:id')
    .get(TagController.getOneTag)
    .put(
        body('name').notEmpty().withMessage('You cannot have an empty tag name!'),
        body('color').exists().withMessage('Color must be set!')
            .isHexColor().withMessage('Color must be a valid hex color!'),
        checkValidationErrors,
        TagController.updateTag)
    .delete(TagController.deleteTag);

export default tagRouter;