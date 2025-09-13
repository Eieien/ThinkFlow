import { Router } from "express";
import { body } from "express-validator";

import * as notes from "../controllers/notesController.js";
import verifyToken from "../middleware/verifyToken.js";
import handleValidation from "../middleware/handleValidation.js";

const notesRouter = Router();

notesRouter.get('/', notes.getPublicNotes);
notesRouter.use(verifyToken);
notesRouter.post('/create',
  body('creator').notEmpty().withMessage('Creator ID not found!'),
  body('title').notEmpty().withMessage('Title must be set!'),
  handleValidation,
  notes.createNote);
notesRouter.route('/:id')
  .get(notes.getOneNote)
  .patch(notes.updateNote)
  .delete(notes.deleteNote);

export default notesRouter;