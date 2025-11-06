import { validationResult } from "express-validator";
import { unlinkSync } from "fs";

export const checkValidationErrors = async (req, res, next) => {
    const validation = validationResult(req);
    if(validation.errors.length > 0){
        if(req?.file){
            const uploaded = req.file;
            unlinkSync(uploaded.path);
        }
        return res.status(400).json({ message: validation.errors[0].msg });
    }
    next();
}

export const checkFileUpload = async (err, req, res, next) => {
    if (err)
        return res.status(400).json({ message: err.message });
    if(!req.file)
        return res.status(404).json({ message: 'No file found!' });
    next();
}

export const checkError = async (err, req, res, next) => {
    if(err) return res.status(400).json({ message: err.message });
    next();
}