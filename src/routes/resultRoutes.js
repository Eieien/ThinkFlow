import { Router } from "express";

import ResultController from "../controllers/resultController.js";

const resultRouter = Router();

resultRouter.get('/:id', ResultController.getResultsByQuizId);
resultRouter.post('/post', ResultController.postResult);

export default resultRouter;