import { Router } from "express";

import ResultController from "../controllers/resultController.js";
import verifyOptionalToken from "../middleware/verifyOptionalToken.js";
import verifyToken from "../middleware/verifyToken.js";

const resultRouter = Router();

resultRouter.use(verifyOptionalToken);
resultRouter.get('/:id', ResultController.getResults);
// resultRouter.use(verifyToken);
resultRouter.post('/submit', ResultController.postResult);

export default resultRouter;