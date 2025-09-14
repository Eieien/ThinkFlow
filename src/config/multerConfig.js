import multer from "multer";
import { randomBytes } from "crypto";
import { extname } from "path";

const noteStorage = multer.diskStorage({
  destination: 'src/uploads/imported_notes',
  filename: (_req, file, cb) => {
    const randomName = randomBytes(16).toString("hex");
    const fileExt = extname(file.originalname);
    cb(null, randomName + fileExt);
  }
});
const pfpStorage = multer.diskStorage({
  destination: 'src/uploads/pfps',
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  }
});

export const noteUploader = multer({ storage: noteStorage });
// export const pfpUploader = multer({ storage: pfpStorage });