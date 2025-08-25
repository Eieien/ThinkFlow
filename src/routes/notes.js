import { Router } from "express";
import multer from "multer";
import crypto from "crypto";
import path from "path";

import * as notes from "../controllers/notesController.js";

const notesRouter = Router();
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'src/uploads');
  },
  filename: (_req, file, cb) => {
    const randomName = crypto.randomBytes(16).toString("hex");
    const fileExt = path.extname(file.originalname);
    cb(null, randomName + fileExt);
  }
});
const upload = multer({ storage });

notesRouter.post('/create-quiz',
    upload.single('notes'),
    notes.createQuiz
);

export default notesRouter;