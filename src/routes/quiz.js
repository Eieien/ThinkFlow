import { Router } from "express";

import * as quiz from "../controllers/quizController.js";

const quizRouter = Router();

quizRouter.post('/generate', quiz.createQuiz);
quizRouter.get('/', quiz.getQuiz);

export default quizRouter;