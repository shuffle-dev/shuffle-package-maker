import fs from 'fs';
import Module from "module";

export default {
    name: "Flowbite Publisher UI",
    description: "Flowbite Publisher UI components",
    framework: "tailwind",
    componentsPaths: [
        "src/",
    ],
    componentsExcludedPaths: [],
    componentCallback: (component) => {
        const content = fs.readFileSync(component.filePath, 'utf8');
        const pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
        const array_matches = pattern.exec(content);
        if (array_matches[1]) {
            fs.writeFileSync(component.filePath, `<div>\n${array_matches[1].trim()}\n</div>`);
        }
    },
    assetsPaths: false,
    tailwindConfig: (directory) => {
        if (!fs.existsSync(`${directory}/tailwind.config.js`)) {
            return {};
        }
        let content = fs.readFileSync(`${directory}/tailwind.config.js`, 'utf8');
        if (!content) {
            return {};
        }

        const m = new Module('tailwind/config');
        m.paths = [`${directory}/node_modules/`];
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
        '@tailwindcss/typography'
    ],
    preValidation: (directory) => {
        if (!fs.existsSync(`${directory}/node_modules`)) {
            throw new Error(`Please run 'npm install' in the directory ${directory} before running this script.`);
        }
    },
}
