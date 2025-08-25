import { Router } from "express";

const rootRouter = Router();

rootRouter.get("/", 
    (req, res) => {
        return res.status(200).json({
            msg: "hello world"
        });
    }
);

export default rootRouter;