> [!IMPORTANT]
> Read how to use Shuffle Package Maker in [README.md](../README.md#usage).
# Custom presets

## Basic information
Here you can find information about preset configuration options.
Preset file is ready to use configuration object created to transform given group of data into custom library package, ready to import into [Shuffle](https://shuffle.dev) editor.

## Configuration options (preset object properties)

### `name`

- **Type**: `string`
- **Description**: The name of the application or project.
- **Example**: "My Project"

### `description`

- **Type**: `string`
- **Description**: A brief description of the project.
- **Example**: "A project to demonstrate the use of Shuffle Package Maker."

### `framework`

- **Type**: `string`
- **Description**: The CSS framework being used.
- **Valid values**: `tailwind`, `bootstrap` or `bulma`

### `componentsPaths`

- **Type**: `string | Array<string>`
- **Description**: The relative path to the directory containing the UI components to be processed.
- **Example**: `src/components` or `["src/components", "src/other-components"]`

### `sassVariables`

- **Type**: `string`
- **Description**: The list of SASS variables to be used in the project.
- **Important**: This option is only available when using the `bootstrap` or `bulma` framework.
- **Example**: `$primary-color: #3490dc;`

### `componentsExcludedPaths`

- **Type**: `Array<string>`
- **Description**: Paths to directories or files that should be excluded from processing.
- **Example**: `["src/components/excluded", "src/components/excluded-file.html"]`

### `assetsPaths`

- **Type**: `object`
- **Description**: List of paths to assets used in components where key is current path to asset and value is path to output dir asset.
- **Example**: `{ "src/images/": "images/" }`

### `componentCallback`

- **Type**: `function`
- **Returns**: `void`
- **Description**: A callback function executed for each component file. The function is called after component is copied and with the component file path as an argument.
- **Constructor arguments**:
  - `File` object from app/componentsFiles.mjs
- **Example**: current presets are the best example of usage (see [presets](../presets))

### `assetsConfigurationCallback`

- **Type**: `function`
- **Returns**: `object`
- **Description**: A callback function executed for each component file that will read component html and return object with assets paths.
- **Constructor arguments**:
  - `directory` - path provided while generate.mjs execution
  - `excludedPaths` - paths provided in preset's componentsExcludedPaths
- **Example**:  
```
return {
  assetsPath: ASSETS_DIRECTORY,
    css: {
      files: readCssFiles(
        componentsPaths(directory, './'),
        excludedPaths,
      )
    }
};
```

### `tailwindConfig`

- **Type**: `object`
- **Description**: An object for defining Tailwind configuration options. It should be an JSON object. It can be also a function that returns JSON object (e.g. read from the file).
- **Important**: This option is only available when using the `tailwind` framework.
- **Example**: `{"content": ["./src/**/*.{html,js}"]}`

### `preValidation`

- **Type**: `function`
- **Returns**: `boolean`
- **Description**: A function that runs before processing the components and can be used to ensure that the directory is valid.
- **Example**:  
```
preValidation: () => {
  return true;
}
```

### `assetsDirectory`

- **Type**: `string`
- **Description**: Overwrites default output directory (`assets`) for assets.
- **Example**: `project_assets`

### `bodyClasses`

- **Type**: `Array<string>`
- **Description**: Classes to be applied to the body element in the resulting HTML files.
- **Example**: `['h-full']`

### `tailwindPlugins`

- **Type**: `Array<string>`
- **Description**: Tailwind CSS plugins to be used in the project.
- **Important**: This option is only available when using the `tailwind` framework.
- **Example**:  
  ```
  '@tailwindcss/forms'  
  '@tailwindcss/aspect-ratio'  
  '@tailwindcss/typography'
  ```
