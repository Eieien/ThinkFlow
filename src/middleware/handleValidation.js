import { validationResult } from "express-validator";
import { unlink } from "fs/promises";

const handleValidation = async (req, res, next) => {
    const validation = validationResult(req);
    if(validation.errors.length > 0){
        if(req?.file){
            const uploaded = req.file;
            try {
                await unlink(uploaded.path);
                console.log('Upload deleted');
            } catch (err){
                console.log('Upload NOT deleted: ' + err.message);
            }
        }
        return res.status(400).json({ error: validation.errors[0].msg });
    }
    next();
}

export default handleValidation;