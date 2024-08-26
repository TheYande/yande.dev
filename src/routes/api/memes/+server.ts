import { json } from "@sveltejs/kit";
import { readdirSync, readFileSync, type PathOrFileDescriptor, type PathLike } from 'node:fs';
import { join, extname } from 'node:path';
//@ts-nocheck
// Function to convert a file to a base64 data URL
const fileToBase64 = (filePath: PathOrFileDescriptor) => {
    const fileData = readFileSync(filePath);
    const mimeType = `image/${extname(`${filePath}`).slice(1)}`;
    return `data:${mimeType};base64,${fileData.toString('base64')}`;
};

 let images: {[id:string]:string} = {}                    
let id = 0
// Function to read directories and files
const readMemesDirectory = (dirPath: any) => {
    const memes = {};
    const directories = readdirSync(dirPath, { withFileTypes: true });

    directories.forEach((dirent) => {
        if (dirent.isDirectory()) {
            const dirName = dirent.name;
            const files = readdirSync(join(dirPath, dirName));
//@ts-ignore
            memes[dirName] = files
                .filter(file => /\.(png|jpg|jpeg|gif|webp)$/.test(file))  // Filter to only include image files
                .map(file => {
                    id++
                    images[id] = fileToBase64(join(dirPath, dirName, file))
                    return id
                });
        }
    });

    return memes;
};
export const _imgs = images
// Usage
const memesDir = './memes';
const memes = readMemesDirectory(memesDir);
export async function GET() {

    return json(                                
        memes
    )
}
