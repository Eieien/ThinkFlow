import { Router } from "express";

import * as root from "../controllers/rootController.js";
import { pfpUploader } from "../config/multerConfig.js";
import { checkFileUpload } from "../middleware/checkErrors.js";

const rootRouter = Router();

rootRouter.get('/', root.getUsers);
rootRouter.route('/pfp/:id')
    .put(pfpUploader.single('pfp'),
        checkFileUpload,
        root.updatePfp)
    .delete(root.deletePfp)

export default rootRouter;