import { randomBytes } from "crypto";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

export function createNoteNameAndPath()
{
    const randomHex = randomBytes(16).toString('hex');
    const fileName = randomHex + '.bin';
    const filePath = join(__dirname, '..', '..', 'uploads', 'notes', fileName);
    return { fileName, filePath };
}

export function getUploadFilePath(uploadsFolder, fileName)
{
    return join(__dirname, '..', '..', 'uploads', uploadsFolder, fileName);
}