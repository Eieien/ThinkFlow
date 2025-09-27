import { validationResult } from "express-validator";
import { unlink } from "fs/promises";

export const checkValidationErrors = async (req, res, next) => {
    const validation = validationResult(req);
    if(validation.errors.length > 0){
        if(req?.file){
            const uploaded = req.file;
            try {
                await unlink(uploaded.path);
            } catch (err){
                console.log('Upload NOT deleted: ' + err.message);
            }
        }
        return res.status(400).json({ error: validation.errors[0].msg });
    }
    next();
}

export const checkFileUpload = async (err, req, res, next) => {
    if (err)
        return res.status(400).json({ error:  err.message });
    if(!req.file)
        return res.status(400).json({ error: 'No file found!' });
    next();
}

export const checkError = async (err, req, res, next) => {
    if(err) return res.status(400).json({ error:  err.message });
    next();
}