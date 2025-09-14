const validateFileUpload = (req, res, next) => {
    if(!req.file){
        return res.status(400).json({ error: 'No file found!' });
    } else {
        // add genAI check here
    }
    next();
}

export default validateFileUpload;