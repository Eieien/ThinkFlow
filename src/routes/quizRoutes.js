import { Router } from "express";
import { body } from "express-validator";

import QuizController from "../controllers/quizController.js";
import { checkValidationErrors } from "../middleware/errorHandlers.js";
import verifyToken from "../middleware/verifyToken.js";
import verifyOptionalToken from "../middleware/verifyOptionalToken.js";

const quizRouter = Router();

quizRouter.use(verifyOptionalToken);
quizRouter.get('/', QuizController.getPublicQuizzes)
quizRouter.get('/:id', QuizController.getOneQuiz);
quizRouter.get('/note/:id', QuizController.getQuizByNoteId);
quizRouter.use(verifyToken);
quizRouter.get('/user/:id', QuizController.getUserQuizzes);
quizRouter.post('/generate', QuizController.createQuiz);
quizRouter.route('/:id')
    .put(
        body('quizTitle').notEmpty().withMessage('Quiz title must be set!'),
        checkValidationErrors,
        QuizController.updateQuiz)
    .delete(QuizController.deleteQuiz)
quizRouter.post('/question', QuizController.createQuestion);

export default quizRouter;