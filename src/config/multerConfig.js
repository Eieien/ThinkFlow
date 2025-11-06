import multer from "multer";
import { randomBytes } from "crypto";
import { extname } from "path";

const MB = 1024 * 1024;
const validDetails = [
  {
    path: '/import',
    validExts: ['.txt', '.md', '.pdf', '.jpg', '.jpeg', '.png'],
  },
  {
    path: '/pfp/:id',
    validExts: ['.jpg', '.jpeg', '.png'],
  }
]

const noteStorage = multer.diskStorage({
  destination: 'uploads/notes/imports',
  filename: (_req, file, cb) => {
    const randomName = randomBytes(16).toString("hex");
    const fileExt = extname(file.originalname);
    cb(null, randomName + fileExt);
  }
});
const pfpStorage = multer.diskStorage({
  destination: 'uploads/images/pfps',
  filename: (_req, file, cb) => {
    const randomName = randomBytes(16).toString("hex");
    const fileExt = extname(file.originalname);
    cb(null, randomName + fileExt);
  }
});

const validateFile = (req, file, cb) => {
  const [{ validExts }] = validDetails.filter(valid => req.route.path === valid.path);
  const extName = extname(file.originalname);

  if(!validExts.includes(extName)){
    cb(new Error('Invalid file type!'), false);
  } else {
    cb(null, true);
  }
}

export const noteUploader = multer({ 
  storage: noteStorage,
  fileFilter: validateFile,
  limits: { fileSize: MB * 5 } // 5 MB
});
export const pfpUploader = multer({ 
  storage: pfpStorage, 
  fileFilter: validateFile,
  limits: { fileSize: MB * 5 } // 5 MB
});