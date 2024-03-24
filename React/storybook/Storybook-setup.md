[StoryBook setup](#top)

- [Storybook for React \& Vite](#storybook-for-react--vite)
- [add tailwindcss](#add-tailwindcss)
- [TSDX+rollup setup](#tsdxrollup-setup)
- [Bundling component](#bundling-component)

--------------------------------

## Storybook for React & Vite

- create React by vite: `npm create vite@latest`
- method 1:
  - In a project without Storybook: `npx storybook@latest init`
  - In a project with Storybook: `npx storybook@latest upgrade`
  - https://storybook.js.org/docs/get-started/react-vite
- method 2: `npx sb init --builder @storybook/builder-vite`
  - https://storybook.js.org/blog/storybook-for-vite/

[⬆ back to top](#top)

## add tailwindcss

- `npm i -d tailwindcss postcss autoprefixer @storybook/addon-postcss rollup-plugin-postcss`
- `npx tailwindcss init -p`
  - modify 'tailwind.config.js'
  - `content: ['./src/**/*.{html,js,ts,jsx,tsx}'],`
- add following code at top of 'src/index.css' directory

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

[⬆ back to top](#top)

## TSDX+rollup setup

- using [TSDX](https://tsdx.io/)
- `npx tsdx create mylib`
  - choose `react-with-storybook`
- `npm i -d tailwindcss postcss autoprefixer @storybook/addon-postcss rollup-plugin-postcss`
- `npx tailwindcss init -p`
  - modify 'tailwind.config.js'
  - `content: ['./src/**/*.{html,js,ts,jsx,tsx}'],`
- handle postcss
  - create `tsdx.config.js' in root directory
  - modify '.storybook\main.js'
  - create 'tailwind.css' in src directory

```js
//tsdx.config.js
const postcss = require('rollup-plugin-postcss');
module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        config: {
          path: './postcss.config.js',
        },
        extensions: ['.css'],
        minimize: true,
        inject: {
          insertAt: 'top',
        },
      })
    );
    return config;
  },
};
//.storybook\main.js
addons: [
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
//tailwind.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [issue](https://stackoverflow.com/questions/69954986/start-storybook-is-not-recognized-as-an-internal-or-external-command): 'start-storybook' is not recognized as an internal or external command
  - `npx sb init`
  - modify package.json
    - `"storybook": "sb dev",`
    - `"build-storybook": "sb build"`

[⬆ back to top](#top)

## Bundling component

- `npm i --save-dev rollup @rollup/plugin-node-resolve @rollup/plugin-babel rollup-plugin-uglify rollup-plugin-postcss rollup-plugin-typescript2 rollup-plugin-peer-deps-external`

|rollup| Main module bundler library|
|---|---|
|@rollup/plugin-node-resolve | Used to locate third-party modules used inside our project (we don’t have any third-party modules in our app currently, but this might change in the future).|
|@rollup/plugin-babel| To integrate with babel.|
|rollup-plugin-uglify |To minify your final bundle.|
|rollup-plugin-postcss | Includes the CSS that we created as separate files in our bundle. It does this by generating minified CSS from the *.css files and includes them via the <head> tag wherever used in our components.|
|rollup-plugin-typescript2 | This plugin compiles the TypeScript code to JavaScript for our final bundle and generates the type declarations for the types key in package.json.|
|rollup-plugin-peer-deps-external | This plugin will externalize our peerDependencies (react and react-dom in our case) in the final bundle as these will be provided by the consumer application.|

[⬆ back to top](#top)
