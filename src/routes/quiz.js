import { Router } from "express";
import { body, param } from "express-validator";

import * as quiz from "../controllers/quizController.js";
import { checkValidationErrors } from "../middleware/checkErrors.js";

const quizRouter = Router();

quizRouter.post('/generate',
    body('noteId').notEmpty().withMessage('No note ID!'),
    checkValidationErrors,
    quiz.createQuiz);
quizRouter.route('/:id')
    .get(quiz.getQuizByNoteId)
    .put(quiz.updateQuiz)
    .delete(quiz.deleteQuiz)

export default quizRouter;