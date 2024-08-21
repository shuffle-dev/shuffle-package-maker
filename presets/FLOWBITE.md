> [!IMPORTANT]
> Read how to use presets in [README.md](../README.md#usage).

# Flowbite presets

## Basic information
You need access to [Flowbite](https://flowbite.com) components to use these presets (additional license is required and can be purchased from their website). You can download Flowbite packages with components from their website in [My downloads](https://flowbite.com/dashboard/downloads/) section.

Following presets are available to automate work with Flowbite components:

- `flowbite-admin-dashboard`
- `flowbite-marketing-ui`
- `flowbite-publisher-ui`

Each preset is prepared to generate a library package with the necessary configuration, that can be used to upload into Shuffle editor.
When using each preset, you should also set path to directory with downloaded Flowbite components as one of parameters.

## How to use
1. Having Flowbite license, download the HTML + JS ZIP package from the Flowbite website available in [My downloads](https://flowbite.com/dashboard/downloads/) section. For now there are three packages available: `Marketing UI Blocks`, `Admin Dashboard`, and `Publisher UI Blocks`.
2. Unpack downloaded ZIP file. Unpacked directory should contain: tailwind configuration file and src directory with HTML files.
3. Run this command in terminal - in the Shuffle Package Maker directory:
```bash
node generate.mjs DIRECTORY_NAME --preset PRESET_NAME
```
> [!IMPORTANT]
> Replace `DIRECTORY_NAME` with the path to the directory with downloaded Flowbite components.  
> Replace `PRESET_NAME` with one of the available presets: `flowbite-admin-dashboard`, `flowbite-marketing-ui`, `flowbite-publisher-ui`.
4. After the script is done running, `output` directory will be created with library files and with zip file for library uploader.

## Examples
```bash
node generate.mjs ../flowbite/flowbite-admin-dashboard-1.1.1/ --preset flowbite-admin-dashboard
```
```bash
node generate.mjs ../flowbite/marketing-ui-v1.0.0/ --preset flowbite-marketing-ui
```
```bash
node generate.mjs ../flowbite/publisher-ui-blocks-v1.0.0/ --preset flowbite-publisher-ui
```
