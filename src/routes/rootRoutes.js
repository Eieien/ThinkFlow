import { Router } from "express";

import RootController from "../controllers/rootController.js";
import { pfpUploader } from "../config/multerConfig.js";
import { checkFileUpload } from "../middleware/errorHandler.js";

const rootRouter = Router();

rootRouter.get('/', RootController.getUsers);
rootRouter.route('/pfp/:id')
    .put(pfpUploader.single('pfp'),
        checkFileUpload,
        RootController.updatePfp)
    .delete(RootController.deletePfp)
rootRouter.get('/pfp/:img', RootController.getPfp)

export default rootRouter;