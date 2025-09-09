import { Router } from "express";

import auth from "./auth.js";
import root from "./root.js";
import notes from "./notes.js";
import quiz from "./quiz.js";

import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.use('/auth', auth);
router.use(verifyToken);
router.use('/', root);
router.use('/notes', notes);
router.use('/quiz', quiz)

export default router;