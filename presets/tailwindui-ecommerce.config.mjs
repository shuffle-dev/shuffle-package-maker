import fs from "fs";
import { parse } from 'node-html-parser';

export default {
    name: "Tailwind UI Ecommerce",
    description: "Tailwind UI ecommerce components",
    framework: "tailwind",
    componentsPaths: "./ecommerce/components/",
    componentsExcludedPaths: [
    ],
    componentCallback: (component) => {
        let content = fs.readFileSync(component.filePath, 'utf8');
        let root = parse(`<div>${content}</div>`);
        let changed = false;
        const pattern = /<!--[\s\S]*?<html class="[^"]*?(bg-[a-zA-Z0-9\-]+)[^"]*?".*?[\s\S]*?-->/;
        const bgClass = pattern.exec(content);

        root.firstChild.removeWhitespace();
        if (root.firstChild.childNodes.length > 1) {
            content = root.toString();
            changed = true;
        }
        if (bgClass) {
            if (changed) {
                root = parse(content);
            }
            root.firstChild.classList.add(bgClass[1]);
            content = root.toString();
            changed = true;
        }
        if (content.includes('<!-- Content goes here -->')) {
            content = content.replaceAll('<!-- Content goes here -->', `<bucket></bucket>`);
            root = parse(content);
            root.querySelectorAll('bucket').forEach((bucket, index) => {
                bucket.parentNode.setAttribute('data-bucket', index + 1);
                bucket.remove();
            });
            content = root.toString();
            changed = true;
        }
        if (changed) {
            fs.writeFileSync(component.filePath, root.toString());
        }
    },
    assetsPaths: {},
    tailwindConfig: {},
    preValidation: (directory) => {
        return true;
    },
    bodyClasses: ['h-full'],
    tailwindPlugins: [
        '@tailwindcss/forms',
        '@tailwindcss/aspect-ratio',
        '@tailwindcss/typography',
    ],
}
