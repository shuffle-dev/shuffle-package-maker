import fs from 'fs';
import _ from 'lodash';
import path from 'path';

export async function importAssets(assetsConfiguration, outputDir, packageDirectory) {
    console.log('Importing assets');

    if (_.isEmpty(assetsConfiguration)) {
        return;
    }

    fs.mkdirSync(outputDir, { recursive: true });
    Object.keys(assetsConfiguration).forEach((source) => {
        const assetSource = path.join(packageDirectory, source);
        const assetPath = assetsConfiguration[source];
        const assetDestination = `${outputDir}/${assetPath}`;
        if (!fs.existsSync(assetSource)) {
            throw new Error(`Asset ${assetPath} not found`);
        }
        if (fs.lstatSync(assetSource).isDirectory()) {
            fs.mkdirSync(assetDestination, { recursive: true });
            fs.readdirSync(assetSource).forEach((file) => {
                fs.cpSync(`${assetSource}/${file}`, `${assetDestination}/${file}`, { recursive: true });
            });
        } else {
            fs.copyFileSync(assetSource, assetDestination);
        }
    });
}
