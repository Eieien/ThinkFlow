import { Router } from "express";
import { body } from "express-validator";

import * as notes from "../controllers/notesController.js";
import verifyToken from "../middleware/verifyToken.js";
import handleValidation from "../middleware/handleValidation.js";
import { noteUploader } from "../config/multerConfig.js";
import validateFileUpload from "../middleware/validateFileUpload.js";

const notesRouter = Router();

notesRouter.get('/', notes.getPublicNotes);
notesRouter.use(verifyToken);
notesRouter.post('/create',
  body('creator').notEmpty().withMessage('Creator ID must be set!'),
  body('title').notEmpty().withMessage('Title must be set!'),
  body('content').exists().withMessage('Must set content field!'),
  handleValidation,
  notes.createNote);
notesRouter.route('/:id')
  .get(notes.getOneNote)
  .patch(notes.updateNote)
  .delete(notes.deleteNote);
notesRouter.post('/import',
  noteUploader.single('content'),
  validateFileUpload,
  body('creator').notEmpty().withMessage('Creator ID must be set!'),
  body('title').notEmpty().withMessage('Title must be set!'),
  handleValidation,
  notes.importNote);
notesRouter.get('/import/:noteFile', notes.getImportedNote);

export default notesRouter;