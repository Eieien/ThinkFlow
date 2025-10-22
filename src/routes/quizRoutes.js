import { Router } from "express";
import { body } from "express-validator";

import QuizController from "../controllers/quizController.js";
import { checkValidationErrors } from "../middleware/errorHandler.js";

const quizRouter = Router();

quizRouter.post('/generate',
    body('noteId').notEmpty().withMessage('No note ID!'),
    checkValidationErrors,
    QuizController.createQuiz);
quizRouter.route('/:id')
    .get(QuizController.getQuizByNoteId)
    .put(QuizController.updateQuiz)
    .delete(QuizController.deleteQuiz)

export default quizRouter;