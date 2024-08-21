import fs from 'fs';

export async function loadPreset(preset) {
    if (!preset) {
        throw new Error('No preset provided');
    }
    if (!fs.existsSync(`./presets/${preset}.config.mjs`)) {
        throw new Error(`Preset ${preset} not found`);
    }

    return (await import(`./../presets/${preset}.config.mjs`)).default;
}
