import { Router } from "express";
import { body } from "express-validator";

import NotesController from "../controllers/notesController.js";
import verifyToken from "../middleware/verifyToken.js";
import verifyOptionalToken from "../middleware/verifyOptionalToken.js";
import { checkValidationErrors, checkFileUpload} from "../middleware/errorHandlers.js";
import { noteUploader } from "../config/multerConfig.js";

const notesRouter = Router();

notesRouter.use(verifyOptionalToken);
notesRouter.get('/', NotesController.getPublicNotes);
notesRouter.get('/:id', NotesController.getOneNote);
notesRouter.use(verifyToken);
notesRouter.get('/user/:id', NotesController.getNotesByUserId)
notesRouter.post('/create',
  body('title').notEmpty().withMessage('You must have a title to create a note!'),
  checkValidationErrors,
  NotesController.createNote);
notesRouter.route('/:id')
  .put(
    body('title').notEmpty().withMessage('Title must be set!'),
    body('description').exists().withMessage('Description must be set!'),
    body('options.isPublic').notEmpty().withMessage('Public option must be set!'),
    body('options.bookmarked').notEmpty().withMessage('Bookmark option must be set!'),
    body('tags').notEmpty().withMessage('Tags must be set!')
      .isArray().withMessage('Invalid type for tags!'),
    checkValidationErrors,
    NotesController.updateNote)
  .delete(NotesController.deleteNote);
notesRouter.post('/import',
  noteUploader.single('content'),
  checkFileUpload,
  NotesController.importNote);

export default notesRouter;