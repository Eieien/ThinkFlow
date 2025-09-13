import { validationResult } from "express-validator";

const handleValidation = (req, res, next) => {
    const validation = validationResult(req);
    if(validation.errors.length > 0) return res.status(400).json({ error: validation.errors[0].msg });
    next();
}

export default handleValidation;