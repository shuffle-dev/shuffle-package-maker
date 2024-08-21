import fs from 'fs';
import { findHTMLFiles } from '../app/componentsFiles.mjs';
import { parse } from 'node-html-parser';
import { componentsPaths } from '../app/componentsPaths.mjs';

const ASSETS_DIRECTORY = 'assets';
const COMPONENTS_PATHS = './';

const readCssFilesCallback = (dirs, componentsExcludedPaths) => {
    const files = findHTMLFiles(dirs).filter((file) => {
        return null !== file && !componentsExcludedPaths.some((excludedPath) => file.includes(excludedPath));
    });
    let styles = [];
    files.forEach((file) => {
        const content = fs.readFileSync(file, 'utf8');
        const matches = content.matchAll(/link.+href\=(?:\"|\')(.+?)(?:\"|\')(?:.+?|\n)/igm);
        Array.from(matches).forEach((match) => {
            if (
                !match[1].startsWith('http:')
                && !match[1].startsWith('https:')
                && match[1].includes('.css')
                && !match[1].includes('bootstrap.min.css')
            ) {
                let cssPath = match[1];
                let slice = -2;
                if (cssPath.includes('scss')) {
                    slice = -3;
                }
                cssPath = cssPath.split('/').slice(slice).join('/')
                cssPath = cssPath.replaceAll('assets/', '');
                styles.push('assets/' + cssPath);
            }
        });
    });
    styles = styles.filter((value, index, self) => self.indexOf(value) === index);
    return styles;
};

export default {
    name: "AyroUI Bootstrap UI Components",
    description: "AyroUI Bootstrap UI Components",
    framework: "bootstrap",
    componentsPaths: COMPONENTS_PATHS,
    componentsExcludedPaths: [
        'assets',
    ],
    assetsPaths: {
        "assets/css": "/css",
        "assets/fonts": "/fonts",
        "assets/images": "/images",
        "assets/js": "/js",
        "assets/scss": "/scss",
    },
    sassVariables: '',
    preValidation: (directory) => {
        return true;
    },
    bodyClasses: [],
    assetsConfigurationCallback: (baseDirectory, componentsExcludedPaths) => {
        return {
            assetsPath: ASSETS_DIRECTORY,
            css: {
                files: readCssFilesCallback(
                    componentsPaths(baseDirectory, COMPONENTS_PATHS),
                    componentsExcludedPaths,
                )
            }
        };
    },
    componentCallback: (component) => {
        let content = fs.readFileSync(component.filePath, 'utf8');
        content = content.replace(/<!--====== Bootstrap js ======-->(.|\n)*<script src="\.\.\/assets\/js\/bootstrap\.bundle\.min\.js"><\/script>/g, '');
        const pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
        const array_matches = pattern.exec(content);
        if (array_matches[1]) {
            let fileContent = parse(`<div>\n${array_matches[1].trim()}\n</div>`);
            fileContent.querySelectorAll('img').forEach((element) => {
                element.setAttribute('src', element.getAttribute('src').replace('../', '').replaceAll('./', ''));
            });
            fs.writeFileSync(component.filePath, fileContent.toString());
        }
    },
}
