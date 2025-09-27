import { Router } from "express";
import { body } from "express-validator";

import * as notes from "../controllers/notesController.js";
import verifyToken from "../middleware/verifyToken.js";
import { checkValidationErrors, checkFileUpload} from "../middleware/checkErrors.js";
import { noteUploader } from "../config/multerConfig.js";

const notesRouter = Router();

notesRouter.get('/', notes.getPublicNotes);
notesRouter.use(verifyToken);
notesRouter.post('/create',
  body('creator').notEmpty().withMessage('Creator ID must be set!'),
  body('title').notEmpty().withMessage('Title must be set!'),
  checkValidationErrors,
  notes.createNote);
notesRouter.route('/:id')
  .get(notes.getNotesByUserId)
  .put(notes.updateNote)
  .delete(notes.deleteNote);
notesRouter.post('/import',
  noteUploader.single('content'),
  checkFileUpload,
  body('creator').notEmpty().withMessage('Creator ID must be set!'),
  body('title').notEmpty().withMessage('Title must be set!'),
  checkValidationErrors,
  notes.importNote);

export default notesRouter;