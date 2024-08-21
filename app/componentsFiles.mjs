import fs from 'fs-extra';
import _ from 'lodash-es';
import path from 'path';

export function copyFilesToOutput(dirs, destination, componentsExcludedPaths, componentCallback) {
    console.log('Copying components HTML files to output directory');
    const files = findHTMLFiles(dirs).filter((file) => {
        return null !== file && !componentsExcludedPaths.some((excludedPath) => file.includes(excludedPath));
    });
    const imported = importFiles(
        files,
        destination,
        dirs,
        componentCallback,
    );

    return categoriesFromImportedFiles(imported, destination);
}

export function findHTMLFiles(paths, currentDepth = 1, maxDepth = 4) {
    let htmlFiles = [];

    for (const currentPath of paths) {
        try {
            const dirItems = fs.readdirSync(currentPath);

            for (const item of dirItems) {
                const itemPath = path.join(currentPath, item);
                const itemStat = fs.statSync(itemPath);

                if (itemStat.isDirectory()) {
                    if (currentDepth < maxDepth) {
                        htmlFiles = htmlFiles.concat(findHTMLFiles([itemPath], currentDepth + 1, maxDepth));
                    }
                } else if (itemStat.isFile() && path.extname(itemPath).toLowerCase() === '.html') {
                    htmlFiles.push(itemPath);
                }
            }
        } catch (err) {
            throw new Error(`Error reading path ${currentPath}: ${err.message}`);
        }
    }

    if (htmlFiles.length === 0) {
        return null;
    }

    return htmlFiles;
}

function importFiles(files, destination, dirs, componentCallback) {
    const filesWithCategories = {};

    files.forEach((file) => {
        const parentDir = dirs.find((dir) => file.includes(dir));
        const relativePath = path.relative(parentDir, file);
        const categories = relativePath
            .split(path.sep)
            .slice(-4, -1)
            .map((category) => category.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_'));
        const destinationPath = path.join(destination, ...categories, path.basename(file));
        fs.ensureDirSync(path.dirname(destinationPath), { recursive: true });
        fs.copyFileSync(file, destinationPath);
        if (componentCallback) {
            componentCallback(new File(destinationPath));
        }
        _.set(filesWithCategories, categories, _.get(filesWithCategories, categories, [])
            .concat(new File(path.join(...categories, path.basename(file)))));
    });

    return filesWithCategories;
}

class File {
    constructor(filePath) {
        this.filePath = filePath;
    }
}

function hashCode(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        const chr = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return `h${hash}`;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function humanize(string) {
    return string.split('_').map(capitalizeFirstLetter).join(' ');
}

function categoriesFromImportedFiles(input) {
    const createComponent = (file) => {
        const fileName = path.basename(file.filePath, path.extname(file.filePath));
        return {
            id: hashCode(fileName),
            name: humanize(fileName),
            // description: `${humanize(fileName)} description`,
            html_file: `components/${file.filePath}`,
        };
    };

    const transform = (obj, parentKey = '') => {
        return Object.keys(obj).map(key => {
            const currentKey = parentKey ? `${parentKey} / ${key}` : key;
            const item = {
                id: hashCode(currentKey),
                name: humanize(key),
                // description: `${humanize(key)} description`
            };

            if (Array.isArray(obj[key])) {
                item.components = obj[key].map(createComponent);
            } else {
                item.subcategories = transform(obj[key], currentKey);
            }

            return item;
        });
    };

    return transform(input);
}
