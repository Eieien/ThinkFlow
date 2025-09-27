import { Router } from "express";

import auth from "./auth.js";
import root from "./root.js";
import notes from "./notes.js";
import quiz from "./quiz.js";
import result from "./result.js";
import tag from "./tags.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.use('/auth', auth);
router.use('/notes', notes);
// router.use(verifyToken);
router.use('/', root);
router.use('/tags', tag);
router.use('/quiz', quiz);
router.use('/results', result);

export default router;