import { Router } from "express";

import * as notes from "../controllers/notesController.js";

const notesRouter = Router();

notesRouter.get('/', notes.getAllNotes);
notesRouter.post('/create', notes.createNote);
notesRouter.route('/:id')
  .get(notes.getOneNote)
  .patch(notes.updateNote)
  .delete(notes.deleteNote);

export default notesRouter;