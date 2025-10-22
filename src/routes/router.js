import { Router } from "express";

import authRoutes from "./authRoutes.js";
import rootRoutes from "./rootRoutes.js";
import notesRoutes from "./notesRoutes.js";
import quizRoutes from "./quizRoutes.js";
import resultRoutes from "./resultRoutes.js";
import tagsRoutes from "./tagsRoutes.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.use('/auth', authRoutes);
router.use('/notes', notesRoutes);
// router.use(verifyToken);
router.use('/', rootRoutes);
router.use('/tags', tagsRoutes);
router.use('/quiz', quizRoutes);
router.use('/results', resultRoutes);

export default router;