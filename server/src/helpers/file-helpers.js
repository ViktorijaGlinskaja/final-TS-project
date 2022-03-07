import path from 'path';
import fs from 'fs';

export const deleteFile = (filePath) => {
    const fullPath = path.join(process.cwd(), filePath);
    try {
        fs.unlinkSync(fullPath);
    } catch (err) {
        console.error(err)
    }
}
