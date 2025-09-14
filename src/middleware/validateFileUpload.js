import { extname } from "path";
import { unlink } from "fs";
import path from "path";

const validateFileUpload = async (req, res, next) => {
    if(!req.file){
        return res.status(400).json({ error: 'No file found!' });
    } else {
        const validExts = ['.txt', '.pdf', '.jpg', '.jpeg', '.png'];
        const uploaded = req.file;
        const extUploaded = extname(uploaded.originalname);

        let isValidExt = false;
        for(let validExt of validExts){
            if(extUploaded !== validExt){
                isValidExt = true;
                break;
            }
        }
        if(isValidExt){
            const filePath = path.join(process.cwd(), 'src', 'uploads', 'imported_notes', uploaded.filename);
            unlink(filePath, (err) => {
                if(err) console.log('Error deleting file: ' + err);
                else console.log('file was deleted');
            });
            return res.status(400).json({ error: 'Invalid file type!' });
        }

        // add genAI check here
    }
    next();
}

export default validateFileUpload;