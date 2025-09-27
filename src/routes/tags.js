import { Router } from "express";
import { body } from "express-validator";

import * as tag from "../controllers/tagController.js";
import { checkValidationErrors } from "../middleware/checkErrors.js";

const tagRouter = Router();

tagRouter.post('/create',
    body('creator').notEmpty().withMessage('Creator ID not set!'),
    body('name').notEmpty().withMessage('Tag name not set!'),
    body('color').optional().isHexColor().withMessage('Color must be a valid hex color!'),
    checkValidationErrors,
    tag.createTag);
tagRouter.route('/:id')
    .get(tag.getUserTags)
    .delete(tag.deleteTag);

export default tagRouter;