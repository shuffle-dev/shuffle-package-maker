import path from 'path';
import fs from 'fs';

export function componentsPaths(baseDirectory, paths) {
    let destinationPaths = [];
    if (Array.isArray(paths)) {
        destinationPaths = paths.map(p => path.join(baseDirectory, p));
    } else {
        destinationPaths = [path.join(baseDirectory, paths)];
    }

    destinationPaths.forEach((p) => {
        if (!fs.existsSync(p) || !fs.lstatSync(p).isDirectory()) {
            throw new Error(`Path ${p} not found`);
        }
    });

    return destinationPaths;
}
