import fs from 'fs';
import Module from "module";

const ASSETS_DIRECTORY = 'assets';

export default {
    name: "Flowbite Admin Dashboard",
    description: "Flowbite admin dashboard components",
    framework: "tailwind",
    componentsPaths: [
        "src/html/",
    ],
    componentsExcludedPaths: [],
    componentCallback: (component) => {
        const content = fs.readFileSync(component.filePath, 'utf8');
        const pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
        const array_matches = pattern.exec(content);
        if (array_matches[1]) {
            let fileContent = `<div>\n${array_matches[1].trim()}\n</div>`;
            const matches = fileContent.matchAll(/\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?|\n)/igm);
            Array.from(matches).forEach((match) => {
                if (!match[1].startsWith('http:') && !match[1].startsWith('https:')) {
                    let newPath = match[1];
                    newPath = newPath.replaceAll('../', '').replaceAll('./', '');
                    fileContent = fileContent.replaceAll(match[1], `${ASSETS_DIRECTORY}/${newPath}`);
                }
            });
            fs.writeFileSync(component.filePath, fileContent);
        }
    },
    assetsPaths: {
        "src/images/": "images/",
    },
    tailwindConfig: (directory) => {
        if (!fs.existsSync(`${directory}/tailwind.config.js`)) {
            return {};
        }
        let content = fs.readFileSync(`${directory}/tailwind.config.js`, 'utf8');
        if (!content) {
            return {};
        }

        const m = new Module('tailwind/config');
        m.paths = [`${process.env.PWD}/node_modules/`];
        m._compile(content, 'tailwind/config');
        const cfg = m.exports.default || m.exports;
        if (cfg.plugins) {
            delete cfg.plugins;
        }
        return JSON.parse(JSON.stringify(cfg, null, 2));
    },
    bodyClasses: [],
    tailwindPlugins: [
        'flowbite/plugin',
    ],
    assetsDirectory: ASSETS_DIRECTORY,
}
