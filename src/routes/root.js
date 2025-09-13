import { Router } from "express";

import verifyToken from "../middleware/verifyToken.js";

const rootRouter = Router();

rootRouter.get("/", (req, res) => {
    return res.status(200).json({ message: "hello world!" });
});

export default rootRouter;