'use strict';

const webpack = require('webpack');
const path = require('path');
var WebpackPreBuildPlugin = require('pre-build-webpack');
const fs = require('fs');
var mkdirp = require('mkdirp'); // required to do file system actions

module.exports = {
  mode: 'development',
  entry: {
    polyfills: './app/polyfills.js',
    vendor: './app/vendor.js',
    main: './.tmp/app/app.js'
  },
  output: {
    path: path.resolve(__dirname, '.tmp/vendor/scripts'),
    filename: '[name].bundle.js'
  },
  module: {
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filename: 'vendor.bundle.js'
    // }),
    new webpack.ProvidePlugin({
    }),
    new WebpackPreBuildPlugin(function () {
      const pathToLocales = './app/assets/json/locales';
      fs.readdirSync(pathToLocales).forEach(function (localeName) {
        const output = {};
        const pathToTranslations = pathToLocales + '/' + localeName;
        fs.readdirSync(pathToTranslations).forEach(function (filename) {
          const filePath = pathToTranslations + '/' + filename;
          const contents = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          Object.assign(output, contents);
        });
        mkdirp('./.tmp/locales', function (err) {
          fs.writeFileSync('./.tmp/locales/' + localeName + '.json', JSON.stringify(output), 'utf8');
        });

      });
    }),
  ]
};

/*using in project such as app.ts
import { cgiTranslationModule} from './modules/translation';
angular.module('cgiW360App', [
... 
])
*/
