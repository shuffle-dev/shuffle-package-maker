import { confirm } from '@inquirer/prompts';
import fs from 'fs';
import util from 'util';

export const getUserProvidedDirs = async (process) => {
    const dirs = process.argv.slice(2);
    if (dirs.length === 0) {
        console.error('Please provide at least one directory');
        process.exit();
    }

    const existingDirs = dirs.filter((dir) => fs.existsSync(dir));

    if (existingDirs.length === 0) {
        console.error('None of the provided directories exist');
        process.exit();
    }


    const missingDirs = dirs.filter(a => !existingDirs.includes(a));

    if (missingDirs.length > 0) {
        const decision = await confirm({
            type: 'confirm',
            name: 'overwrite',
            message: `The directories ${missingDirs.map(e => {
                return util.styleText(
                    ['underline', 'red'],
                    e,
                );
            }).join(', ')} do not exist. Do you want to continue anyway?`,
            default: false,
        });

        if (!decision) {
            console.error('Aborted');
            process.exit();
        }
    }

    return existingDirs;
}
