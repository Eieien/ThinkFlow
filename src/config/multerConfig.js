import multer from "multer";
import { randomBytes } from "crypto";
import { extname } from "path";

const MB = 1024 * 1024;
const validDetails = [
  {
    url: '/import',
    validExts: ['.txt', '.md', '.pdf', '.jpg', '.jpeg', '.png'],
    uploads_folder: 'notes'
  },
  {
    url: '/pfp',
    validExts: ['.jpg', '.jpeg', '.png'],
    uploads_folder: 'pfps'
  }
]

const noteStorage = multer.diskStorage({
  destination: 'src/uploads/notes',
  filename: (_req, file, cb) => {
    const randomName = randomBytes(16).toString("hex");
    const fileExt = extname(file.originalname);
    cb(null, randomName + fileExt);
  }
});
const pfpStorage = multer.diskStorage({
  destination: 'src/uploads/pfps',
  filename: (_req, file, cb) => {
    const randomName = randomBytes(16).toString("hex");
    const fileExt = extname(file.originalname);
    cb(null, randomName + fileExt);
  }
});

const validateFile = (req, file, cb) => {
  const [{ validExts }] = validDetails.filter(valid => req.url === valid.url);
  const extName = extname(file.originalname);

  console.log(validExts);

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