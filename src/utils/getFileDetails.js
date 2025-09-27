import { randomBytes } from "crypto";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

function getFileNameAndPath()
{
    const randomHex = randomBytes(16).toString('hex');
    const fileName = randomHex + '.md';
    const filePath = join(__dirname, '..', 'uploads', 'notes', fileName);
    return { fileName, filePath };
}

export default getFileNameAndPath;