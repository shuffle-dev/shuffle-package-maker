import { confirm } from '@inquirer/prompts';
import fs from 'fs-extra';

export async function prepareOutputDir(outputDir) {
    console.log('Preparing the output directory');
    if (fs.existsSync(outputDir) && fs.readdirSync(outputDir).length > 0) {
        const overwrite = await confirm({
            message: 'The output directory is not empty. Do you want to overwrite it?',
        });

        if (!overwrite) {
            console.log('Exiting');
            process.exit(0);
        }

        fs.emptyDirSync(outputDir);
    }
}
