import { Router } from "express";

import * as auth from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/signup', auth.signup);
authRouter.post('/login', auth.login);
authRouter.get('/refresh', auth.refresh);
authRouter.delete('/logout', auth.logout);

export default authRouter;