| Plugins | Header Two     |
| :------------- | :------------- |
|[chalk](https://github.com/chalk/chalk)|Terminal string styling|
|[sw-precache-webpack-plugin](https://github.com/goldhand/sw-precache-webpack-plugin)|using service workers to cache your external project dependencies|
|[gulp-postcss](https://github.com/postcss/gulp-postcss)|pipe CSS through several plugins|
|[autoprefixer](#autoprefixer)|parse CSS and add vendor prefixes to CSS rules using values from CanIUse|
|[postcss-flexbugs-fixes](#postcss-flexbugs-fixes)|fix all of flexbug's issues|
|[whatwg-fetch](https://github.com/github/fetch)|fetch() function is a Promise-based mechanism for programmatically making web requests in the browser|
|[webpack-manifest-plugin](#webpack-manifest-plugin)|simple plugin for generation manifest file|


<h3 id="autoprefixer">[autoprefixer](https://github.com/postcss/autoprefixer)</h3>

**Gulp**

```javascript
gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');    
    return gulp.src('./src/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dest'));
});
```

**Webpack** - use postcss-loader

```javascript
//webpack.config.js
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            }
        ]
    }
}
//postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

<h3 id="postcss-flexbugs-fixes">[postcss-flexbugs-fixes](https://github.com/postcss/autoprefixer)</h3>

**Gulp**

```javascript
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var nested = require('postcss-nested');
var sugarss = require('sugarss');
var fix = require('postcss-flexbugs-fixes')

gulp.task('css', function () {
    var plugins = [nested];
    return gulp.src('./src/*.css')
               .pipe(postcss(fix))
               .pipe(postcss(plugins, { parser: sugarss }))
               .pipe(gulp.dest('out'));
});
```

<h3 id="webpack-manifest-plugin">[webpack-manifest-plugin](https://github.com/iptpv/manifest-webpack-plugin)</h3>

```javascript
var path = require('path');
var Manifest = require('manifest-webpack-plugin');
module.exports = {
    module: {
      loaders: [
        { test: /\.(gif|svg)$/,  loader: 'file-loader' }
      ]
    },
    plugins: [
      new Manifest(path.join('build', 'manifest.json')) // path to manifest file 
    ]
  };
```
