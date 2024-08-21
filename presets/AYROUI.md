> [!IMPORTANT]
> Read how to use presets in [README.md](../README.md#usage).
# Ayro UI Bootstrap UI preset

## Basic information
You can download Free Bootstrap UI Components - Core Version of Ayro UI from [GitHub](https://github.com/ayroui/bootstrap-ui-components).

`ayroui-bootstrap-ui-components` preset is available to automate work with Ayro UI Bootstrap UI components.

This preset is prepared to generate a library package with the necessary configuration, that can be used to upload into Shuffle editor.
When using this preset, you should also set path to directory with downloaded Ayro UI components as one of parameters.

After use of command with preset, an `output` directory will be created with library files and with zip file for [Shuffle library uploader](https://shuffle.dev/docs/library-upload).

## How to use
1. Download Free Bootstrap UI Components - Core Version of Ayro UI from [GitHub](https://github.com/ayroui/bootstrap-ui-components), e.g. by using `git clone` command:
```bash
git clone https://github.com/ayroui/bootstrap-ui-components.git
```
2. Run the following command in terminal - in the Shuffle Package Maker directory:
```bash
node generate.mjs DIRECTORY_NAME --preset ayroui-bootstrap-ui-components
```
> [!IMPORTANT]
> Replace `DIRECTORY_NAME` with the path to the directory with downloaded Ayro UI components.
3. After the script is done running, `output` directory will be created with library files and with zip file for library uploader.

## Basic command example

```bash
node generate.mjs ../ayro/bootstrap-ui-components/ --preset ayroui-bootstrap-ui-components
```
