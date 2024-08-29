import fs from 'fs';

export async function loadPreset(preset) {
    if (!preset) {
        throw new Error('No preset provided');
    }
    if (!fs.existsSync(new URL(`../presets/${preset}.config.mjs`, import.meta.url))) {
        throw new Error(`Preset ${preset} not found`);
    }

    return (await import(`./../presets/${preset}.config.mjs`)).default;
}
