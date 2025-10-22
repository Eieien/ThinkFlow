import { Router } from "express";
import { body } from "express-validator";

import NotesController from "../controllers/notesController.js";
import verifyToken from "../middleware/verifyToken.js";
import { checkValidationErrors, checkFileUpload} from "../middleware/errorHandler.js";
import { noteUploader } from "../config/multerConfig.js";

const notesRouter = Router();

notesRouter.get('/', NotesController.getPublicNotes);
// notesRouter.use(verifyToken);
notesRouter.post('/create',
  body('userId').notEmpty().withMessage('User ID must be set!'),
  body('title').notEmpty().withMessage('Title must be set!'),
  checkValidationErrors,
  NotesController.createNote);
notesRouter.route('/:id')
  .get(NotesController.getNotesByUserId)
  .put(NotesController.updateNote)
  .delete(NotesController.deleteNote);
notesRouter.post('/import',
  noteUploader.single('content'),
  checkFileUpload,
  body('userId').notEmpty().withMessage('User ID must be set!'),
  body('title').notEmpty().withMessage('Title must be set!'),
  checkValidationErrors,
  NotesController.importNote);

export default notesRouter;