> [!IMPORTANT]
> Read how to use presets in [README.md](../README.md#usage).

# TailwindUI presets

## Basic information
You need access to [Taiwind UI](https://tailwindui.com) components to use these presets (additional license is required and can be purchased from their website).

Following presets are available to automate work with TailwindUI components:

- `tailwindui-application-ui`
- `tailwindui-ecommerce`
- `tailwindui-marketing`

Each preset is prepared to generate a library package with the necessary configuration, that can be used to upload into Shuffle editor.
When using each preset, you should also set path to directory with downloaded TailwindUI components as one of parameters.

After use of command with preset, an `output` directory will be created with library files and with zip file for [Shuffle library uploader](https://shuffle.dev/docs/library-upload).

## How to use
1. Having TailwindUI license, download all HTML components using [Tailwind UI Crawler](https://github.com/kiliman/tailwindui-crawler)
2. Use our [config file](https://shuffle.dev/tailwind/tailwindui-import/env.txt) with Tailwind UI Crawler.
3. Once you have downloaded TailwindUI components, and they contain html/components directory with HTML files grouped by categories, run this command in terminal - in the Shuffle Package Maker directory:
```bash
node generate.mjs DIRECTORY_NAME --preset PRESET_NAME
```
> [!IMPORTANT]
> Replace `DIRECTORY_NAME` with the path to the directory with downloaded TailwindUI components.  
> Replace `PRESET_NAME` with one of the available presets: `tailwindui-application-ui`, `tailwindui-ecommerce`, `tailwindui-marketing`.
4. After the script is done running, `output` directory will be created with library files and with zip file for library uploader.

## Examples

```bash
node generate.mjs ../tailwind-ui-complete/ --preset tailwindui-application-ui
```
```bash
node generate.mjs ../tailwind-ui-complete/ --preset tailwindui-ecommerce
```
```bash
node generate.mjs ../tailwind-ui-complete/ --preset tailwindui-marketing
```
