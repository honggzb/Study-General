[Compression Using Brotli and Gzip](#top)

## quick way

-  add a `post-build` script to your package.json
  
```json
"scripts": {
    "ng": "ng",`
    "start": "ng serve",
    "build": "ng build",
    "postbuild": "for i in $(find dist/my-application/ -type f -print); do brotli $i; done",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  }
```

## Elegant way

- Method
  - “brotli-webpack-plugin” for Brotli files
  - “compression-webpack-plugin” for Gzip files
- `npm install -D compression-webpack-plugin brotli-webpack-plugin`
- creating the 'custom-webpack.config.js' in the src directory
- run this install in the builder, which would allow us to add the additional webpack configuration, 
  - `npm i -D @angular-builders/custom-webpack`
- modify 'angular.json' file under the build
- If it runs successfully, go into the dist/projectName folder. You should find .br and .gz versions of all .js files, which should be significantly smaller.

```javascript
//custom-webpack.config.js
var BrotliPlugin = require('brotli-webpack-plugin');
module.exports = {
    plugins: [
        new BrotliPlugin({
            asset: '[path].br',
            threshold: 0,
            minRatio: 0.8,
        })
    ]
}
//angular.json
"architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.js"
            },
          }
          ...
       }
```
[⬆ back to top](#top)
