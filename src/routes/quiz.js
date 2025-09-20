import { Router } from "express";

import * as quiz from "../controllers/quizController.js";

const quizRouter = Router();

quizRouter.post('/generate', quiz.createQuiz);
quizRouter.route('/:id')
    .get(quiz.getOneQuiz)
    .put(quiz.updateQuiz)
    .delete(quiz.deleteQuiz)

export default quizRouter;