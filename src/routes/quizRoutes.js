import { Router } from "express";
import { body } from "express-validator";

import QuizController from "../controllers/quizController.js";
import { checkValidationErrors } from "../middleware/errorHandlers.js";

const quizRouter = Router();

quizRouter.post('/generate', QuizController.createQuiz);
quizRouter.get('/note/:id', QuizController.getQuizByNoteId);
quizRouter.get('/user/:id', QuizController.getUserQuizzes);
quizRouter.route('/:id')
    .get(QuizController.getOneQuiz)
    .put(
        body('quizTitle').notEmpty().withMessage('Quiz title must be set!'),
        checkValidationErrors,
        QuizController.updateQuiz)
    .delete(QuizController.deleteQuiz)

export default quizRouter;