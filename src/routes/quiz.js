import { Router } from "express";

import * as quiz from "../controllers/quizController.js";
import { pfpUploader } from "../config/multerConfig.js";

const quizRouter = Router();

quizRouter.post('/generate', pfpUploader.single('upload'), quiz.createQuiz);
quizRouter.get('/', quiz.getQuiz);

export default quizRouter;