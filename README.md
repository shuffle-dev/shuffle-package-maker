# Shuffle Package Maker

[Shuffle](https://shuffle.dev) is a visual editor for developers. It works with Tailwind CSS, Bootstrap, Bulma, and MUI.

This tool simplifies the process of creating a UI library package for Shuffle. You can upload your favorite purchased UI library (e.g., Tailwind UI, Flowbite) or one you made. For more details, see the [Shuffle library upload documentation](https://shuffle.dev/docs/library-upload).

## Installation

### Install from github

1. Clone this repository.
2. Run `npm install` in the root directory.

### Install via npm

1. Install `shuffle-library-maker` via your package manager (eg., `npm install shuffle-library-maker`).
2. Run `npm install` in the root directory.

## Usage

You can use presets to build packages for Tailwind UI and Flowbite components.

1. Run `node generate.mjs DIRECTORY_NAME --preset PRESET_NAME` where `DIRECTORY_NAME` is the directory you want to scan for components and `PRESET_NAME` is name of the preset you want to use.
2. Follow the instructions in the terminal.
3. Use the generated ZIP package and upload as new library in Shuffle.

## Already available presets

### Tailwind UI

- `tailwindui` - Tailwind UI components for all categories.
- `tailwindui-marketing` - Tailwind UI marketing components.
- `tailwindui-ecommerce` - Tailwind UI ecommerce components.
- `tailwindui-application-ui` - Tailwind UI application UI components.

> [!TIP]
> More details in [Tailwind UI preset documentation](presets/TAILWINDUI.md).

> [!IMPORTANT]
> [Tailwind UI](https://tailwindui.com) requires additional license which can be purchased from their website.

### Flowbite

- `flowbite-marketing-ui` - Flowbite marketing UI components.
- `flowbite-publisher-ui` - Flowbite publisher UI components.
- `flowbite-admin-dashboard` - Flowbite admin dashboard components.

> [!TIP]
> More details in [Flowbite preset documentation](presets/FLOWBITE.md).

> [!IMPORTANT] 
> [Flowbite](https://flowbite.com) requires additional license which can be purchased from their website.

### Ayro UI

- `ayroui-bootstrap-ui-components` - Ayro UI Bootstrap UI components.

> [!TIP]
> More details in [Ayro UI preset documentation](presets/AYROUI.md).

### Other

You can also create your own preset by creating a new file in `presets` directory. For details see [PRESETS.md](presets/PRESETS.md).

> [!TIP]
> If you want share your preset with others, please feel free to create a pull request.

## Additional

Run `npm start` to see help
