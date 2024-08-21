import fs from 'fs';
import Module from "module";

export default {
    name: "Flowbite Marketing UI",
    description: "Flowbite marketing components",
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
        '@tailwindcss/typography'
    ],
}