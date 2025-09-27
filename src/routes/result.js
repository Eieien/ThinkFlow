import { Router } from "express";

import * as result from "../controllers/resultController.js";

const resultRouter = Router();

resultRouter.get('/:id', result.getResultsByQuizId);

export default resultRouter;