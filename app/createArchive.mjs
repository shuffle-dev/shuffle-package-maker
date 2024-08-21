import archiver from 'archiver';
import fs from 'fs';

export async function createArchive(outputDir, zipFilename = '') {
    console.log('Creating archive');
    const output = fs.createWriteStream(`${outputDir}/${zipFilename}`);
    const archive = archiver('zip', {
        zlib: { level: 9 },
    });

    archive.pipe(output);
    archive.directory(outputDir, '/', (data) => {
        if (data.name === zipFilename) {
            return false;
        }

        return data;
    });

    return archive.finalize();
}
