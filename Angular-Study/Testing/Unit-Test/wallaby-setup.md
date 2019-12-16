https://github.com/wallabyjs/ngCliWebpackSample

1. Add the [wallaby.js config file](https://github.com/wallabyjs/ngCliWebpackSample/blob/master/wallaby.js) to the project.
2. Add the [wallabyTest.ts](https://github.com/wallabyjs/ngCliWebpackSample/blob/master/src/wallabyTest.ts) bootstrap file to the project.
3. Exclude the [src/wallabyTest.ts](https://github.com/wallabyjs/ngCliWebpackSample/blob/82d4f43d1a1e701de403a2cdb38986bfb4ddca0b/src/tsconfig.app.json#L20) file in the `tsconfig.json` as it may affect Angular [AOT compilation](https://github.com/angular/angular/issues/13624#issuecomment-281919940).
4. Run `npm install wallaby-webpack angular2-template-loader --save-dev`.
5. using [Chrome (headless) runner](https://wallabyjs.com/docs/integration/chrome.html)
