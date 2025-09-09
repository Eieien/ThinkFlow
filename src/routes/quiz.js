import { Router } from "express";
import multer from "multer";
import crypto from "crypto";
import path from "path";

import * as quiz from "../controllers/quizController.js";

const quizRouter = Router();
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

quizRouter.post('/generate', upload.single('notes'), quiz.createQuiz);
quizRouter.get('/', quiz.getQuiz);

export default quizRouter;