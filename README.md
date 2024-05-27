# jorge-hernandez-05-2024

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### SASS Pattern 7 - 1

Each folder must contain a file named \_module.scss with the imports of the existing files in that folder, the structure for the creation of new files will be the following, where, as its name indicates the files will be stored in its respective folder.

- 01_variables
- 02_mixins
- 03_functions
- 04_common
- 05_components
- 06_views
- 07_layout

Now, in the root of the assets/scss/ folder a file called main.scss must be created, in this file the imports of the \_module.scss existing in the previously mentioned folders must be made, this must be done in the established order, this to avoid problems with the styles of the components.

> [!CAUTION]
> Remember to only create the folder if you are going to save files in it.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
