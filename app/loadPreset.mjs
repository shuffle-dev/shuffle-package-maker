import fs from 'fs';
import path from 'path';

export async function loadPreset(preset) {
    if (!preset) {
        throw new Error('No preset provided');
    }
    if (!fs.existsSync(path.join(import.meta.dirname, `../presets/${preset}.config.mjs`))) {
        throw new Error(`Preset ${preset} not found`);
    }

    return (await import(`./../presets/${preset}.config.mjs`)).default;
}
