#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import _ from 'lodash-es';
import { copyFilesToOutput } from './app/componentsFiles.mjs';
import { componentsPaths } from './app/componentsPaths.mjs';
import { createArchive } from './app/createArchive.mjs';
import { importAssets } from './app/importAssets.mjs';
import { loadPreset } from './app/loadPreset.mjs';
import { prepareOutputDir } from './app/prepareOutputDir.mjs';

const OUTPUT_DIR = 'output';
const ASSETS_DIRECTORY = 'assets';
const basicExcludedPaths = [
    '.git',
    '.DS_store',
];

const program = new Command();
program
    .name('Shuffle Library Package Generator')
    .argument('[directory]', 'Directory to scan for components')
    .requiredOption('-p, --preset <preset>', 'Preset to use')
    .action(async function (directory) {
        try {
            const options = program.opts();
            const config = JSON.parse(
                fs.readFileSync(
                    new URL('data/config.json', import.meta.url),
                    'utf8'
                )
            );
            const preset = await loadPreset(options.preset);
            const assetsDirectory = preset.assetsDirectory ?? ASSETS_DIRECTORY;
            const excludedPaths = _.concat(basicExcludedPaths, preset.componentsExcludedPaths ?? []);

            if (preset.preValidation && typeof preset.preValidation === 'function') {
                preset.preValidation(directory);
            }

            _.assign(
                config,
                _.pick(preset, ['name', 'description', 'framework', 'icon', 'iconDarkMode', 'bodyClasses']),
            );

            await prepareOutputDir(OUTPUT_DIR);

            config.categories = copyFilesToOutput(
                componentsPaths(directory, preset.componentsPaths),
                `${OUTPUT_DIR}/components`,
                excludedPaths,
                preset.componentCallback
            );

            await importAssets(preset.assetsPaths, `${OUTPUT_DIR}/${assetsDirectory}`, directory);

            if (preset.framework === 'tailwind') {
                config.tailwindConfig = typeof preset.tailwindConfig === 'function'
                    ? preset.tailwindConfig(directory)
                    : preset.tailwindConfig;
                config.tailwindPlugins = preset.tailwindPlugins;
            }

            if (preset.framework === 'bootstrap') {
                config.sassVariables = preset.sassVariables;
                config.assetsConfiguration = preset.assetsConfigurationCallback(directory, excludedPaths);
            }

            fs.writeFileSync(
                `${OUTPUT_DIR}/shuffle.config.json`,
                JSON.stringify(config, null, 2),
            );

            const zipFilename = `output.zip`;
            await createArchive(OUTPUT_DIR, zipFilename);

            console.log(`Zip file created in the output directory: ${OUTPUT_DIR}/${zipFilename}`);
        } catch (error) {
            console.error(error.message);
        }
    });

program.addHelpText('after', `list of available presets:
- tailwindui - Tailwind UI components for all categories
- tailwindui-marketing - Tailwind UI marketing components
- tailwindui-ecommerce - Tailwind UI ecommerce components
- tailwindui-application-ui - Tailwind UI application UI components
- flowbite-marketing-ui - Flowbite marketing UI components
- flowbite-publisher-ui - Flowbite publisher UI components
- flowbite-admin-dashboard - Flowbite admin dashboard components
- ayroui-bootstrap-ui-components - AyroUI Bootstrap UI components
`);

program.parse();
