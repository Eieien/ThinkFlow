import { Router } from "express";
import { body } from "express-validator";

import TagsController from "../controllers/tagsController.js";
import { checkValidationErrors } from "../middleware/errorHandler.js";

const tagRouter = Router();

tagRouter.post('/create',
    body('creator').notEmpty().withMessage('Creator ID not set!'),
    body('name').notEmpty().withMessage('Tag name not set!'),
    body('color').optional().isHexColor().withMessage('Color must be a valid hex color!'),
    checkValidationErrors,
    TagsController.createTag);
tagRouter.route('/:id')
    .get(TagsController.getUserTags)
    .delete(TagsController.deleteTag);

export default tagRouter;