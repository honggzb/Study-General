## [webpack优化](#top)

- [1. Decrease Front-end Size](#Decrease)
- [2. Make Use of Long-term Caching](#Make)
- [3. Monitor and analyze the app](#Monitor)
- [4. webpack-visualizer分析webpack](#)

<h2 id="Decrease">1. Decrease Front-end Size</h3>

- Minifiers: 
  - [UglifyJS plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)
    - Note: The UglifyJS plugin can’t compile the ES2015+ (ES6+) code. This means that if your code uses classes, arrow functions or other new language features, and you don’t compile them into ES5, the plugin will throw an error
  - If you need to compile the new syntax, use the uglifyjs-webpack-plugin package. This is the same plugin that’s bundled with webpack, but newer, and it’s able to compile the ES2015+ code
  - loader-specific, such as [css-loader](https://github.com/webpack-contrib/css-loader)
  - Other popular minifiers: [Babel Minify](https://github.com/webpack-contrib/babel-minify-webpack-plugin), [Google Closure Compiler](https://github.com/roman01la/webpack-closure-compiler)
- set the NODE_ENV [environmental variable](https://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them) in code to the value production
- Use [ES modules](https://ponyfoo.com/articles/es6-modules-in-depth): Webpack understands that commentRestEndpoint(did not used module) is not used and doesn’t generate a separate export point in the bundle, refer to [Webpack docs about tree shaking](https://webpack.js.org/guides/tree-shaking/)
- Optimize images: `url-loader`, `svg-url-loader` and `image-webpack-loader` to optimize
- Optimize dependencies:  `ModuleConcatenationPlugin`
- Use externals if it is necessary:  `webpack’s externals option` – it replaces modules with variables or other external imports.

**Minifiers**

```javascript
// webpack.config.js
const webpack = require('webpack');
module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader',{ loader: 'css-loader', options: { minimize: true } },],
      },
    ],
  },
};
```

**production**

```javascript
// webpack.config.js
const webpack = require('webpack');
module.exports = {
  plugins: [ 
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"',}),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
```

**images optimize**

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      { test: /\.(jpe?g|png|gif)$/, loader: 'url-loader', options: { limit: 10*1024, }, // Inline files smaller than 10 kB (10240 bytes)
      },
      { test: /\.svg$/, loader: 'svg-url-loader', options: { limit: 10*1024, noquotes: true,} // Remove the quotes from the url (they’re unnecessary in most cases)
      {test: /\.(jpe?g|png|gif|svg)$/, loader: 'image-webpack-loader', enforce: 'pre',} // This will apply the loader before the other ones
    ],
  }
};
//index.js
import imageUrl from './image.png';
```

**Dependency Optimize**

```javascript
// webpack.config.js
const webpack = require('webpack');
module.exports = {
  plugins: [ new webpack.optimize.ModuleConcatenationPlugin(),],
};
```

**Use externals**: 在实际项目开发过程中，并不需要实时调试各种库的源码，这时候就可以考虑使用external选项了(简单来说external就是把依赖资源声明为一个外部依赖，然后通过script外链脚本引入。)

```javascript
//1) 在页面中加入需要引入的lib地址
<script src="//cdn.bootcss.com/jquery.min.js"></script>
<script src="//cdn.bootcss.com/underscore.min.js"></script>
<script src="/static/common/react.min.js"></script>
<script src="/static/common/react-dom.js"></script>
<script src="/static/common/react-router.js"></script>
<script src="/static/common/immutable.js"></script>
// webpack.config.js - webpack won’t bundle react and react-dom packages
module.exports = {
  externals: {  'react': 'React', 'react-dom': 'ReactDOM', },
};
//If dependencies are loaded as AMD packages
module.exports = {
  output: { libraryTarget: 'amd' },
  externals: {
    'react': { amd: '/libraries/react.min.js' },
    'react-dom': { amd: '/libraries/react-dom.min.js' },
    //or
    'react-router': {
      amd: 'react-router',
      root: 'ReactRouter',
      commonjs: 'react-router',
      commonjs2: 'react-router'
    },
    'react:' {
      amd: 'react',
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react'
    },
    'react-dom': {
      amd: 'react-dom',
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom'
    }
  },
};
```

[back to top](#top)

<h2 id="Make">2. Make Use of Long-term Caching</h3>

[back to top](#top)

<h2 id="Monitor">3. Monitor and analyze the app</h3>

[back to top](#top)

> Reference
> - [A Guide to Web Performance Optimization with Webpack](https://developers.google.com/web/fundamentals/performance/webpack/?utm_source=frontendfocus&utm_medium=email)
> - https://github.com/GoogleChromeLabs/webpack-training-project
> - [Addy Osmani’s guide on image optimization](https://images.guide/)
> - [Webpack docs for the ModuleConcatenationPlugin](https://webpack.js.org/plugins/module-concatenation-plugin/)
> - [Brief introduction to scope hoisting](https://medium.com/webpack/brief-introduction-to-scope-hoisting-in-webpack-8435084c171f)
> - [Webpack docs on externals](https://webpack.js.org/configuration/externals/)
> - [webpack 构建性能优化策略小结](https://segmentfault.com/a/1190000007891318)
> - [webpack externals详解](http://www.tangshuang.net/3343.html)
> - [webpack之前端性能优化（史上最全，不断更新中。。。）](https://www.cnblogs.com/ssh-007/p/7944491.html)
> - [彻底解决Webpack打包性能问题](https://zhuanlan.zhihu.com/p/21748318)
> - [webpack学习笔记—优化缓存、合并、懒加载等](https://www.cnblogs.com/yangmin01/p/6290595.html)
## [webpack优化](#top)

- [1. Decrease Front-end Size](#Decrease)
- [2. Make Use of Long-term Caching](#Make)
- [3. Monitor and analyze the app](#Monitor)
- [4. webpack-visualizer分析webpack](#)

<h2 id="Decrease">1. Decrease Front-end Size</h3>

- Minifiers: 
  - [UglifyJS plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)
    - Note: The UglifyJS plugin can’t compile the ES2015+ (ES6+) code. This means that if your code uses classes, arrow functions or other new language features, and you don’t compile them into ES5, the plugin will throw an error
  - If you need to compile the new syntax, use the uglifyjs-webpack-plugin package. This is the same plugin that’s bundled with webpack, but newer, and it’s able to compile the ES2015+ code
  - loader-specific, such as [css-loader](https://github.com/webpack-contrib/css-loader)
  - Other popular minifiers: [Babel Minify](https://github.com/webpack-contrib/babel-minify-webpack-plugin), [Google Closure Compiler](https://github.com/roman01la/webpack-closure-compiler)
- set the NODE_ENV [environmental variable](https://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them) in code to the value production
- Use [ES modules](https://ponyfoo.com/articles/es6-modules-in-depth): Webpack understands that commentRestEndpoint(did not used module) is not used and doesn’t generate a separate export point in the bundle, refer to [Webpack docs about tree shaking](https://webpack.js.org/guides/tree-shaking/)
- Optimize images: `url-loader`, `svg-url-loader` and `image-webpack-loader` to optimize
- Optimize dependencies:  `ModuleConcatenationPlugin`
- Use externals if it is necessary:  `webpack’s externals option` – it replaces modules with variables or other external imports.

**Minifiers**

```javascript
// webpack.config.js
const webpack = require('webpack');
module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader',{ loader: 'css-loader', options: { minimize: true } },],
      },
    ],
  },
};
```

**production**

```javascript
// webpack.config.js
const webpack = require('webpack');
module.exports = {
  plugins: [ 
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"',}),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
```

**images optimize**

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      { test: /\.(jpe?g|png|gif)$/, loader: 'url-loader', options: { limit: 10*1024, }, // Inline files smaller than 10 kB (10240 bytes)
      },
      { test: /\.svg$/, loader: 'svg-url-loader', options: { limit: 10*1024, noquotes: true,} // Remove the quotes from the url (they’re unnecessary in most cases)
      {test: /\.(jpe?g|png|gif|svg)$/, loader: 'image-webpack-loader', enforce: 'pre',} // This will apply the loader before the other ones
    ],
  }
};
//index.js
import imageUrl from './image.png';
```

**Dependency Optimize**

```javascript
// webpack.config.js
const webpack = require('webpack');
module.exports = {
  plugins: [ new webpack.optimize.ModuleConcatenationPlugin(),],
};
```

**Use externals**: 在实际项目开发过程中，并不需要实时调试各种库的源码，这时候就可以考虑使用external选项了(简单来说external就是把依赖资源声明为一个外部依赖，然后通过script外链脚本引入。)

```javascript
//1) 在页面中加入需要引入的lib地址
<script src="//cdn.bootcss.com/jquery.min.js"></script>
<script src="//cdn.bootcss.com/underscore.min.js"></script>
<script src="/static/common/react.min.js"></script>
<script src="/static/common/react-dom.js"></script>
<script src="/static/common/react-router.js"></script>
<script src="/static/common/immutable.js"></script>
// webpack.config.js - webpack won’t bundle react and react-dom packages
module.exports = {
  externals: {  'react': 'React', 'react-dom': 'ReactDOM', },
};
//If dependencies are loaded as AMD packages
module.exports = {
  output: { libraryTarget: 'amd' },
  externals: {
    'react': { amd: '/libraries/react.min.js' },
    'react-dom': { amd: '/libraries/react-dom.min.js' },
    //or
    'react-router': {
      amd: 'react-router',
      root: 'ReactRouter',
      commonjs: 'react-router',
      commonjs2: 'react-router'
    },
    'react:' {
      amd: 'react',
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react'
    },
    'react-dom': {
      amd: 'react-dom',
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom'
    }
  },
};
```

[back to top](#top)

<h2 id="Make">2. Make Use of Long-term Caching</h3>

[back to top](#top)

<h2 id="Monitor">3. Monitor and analyze the app</h3>

[back to top](#top)

> Reference
> - [A Guide to Web Performance Optimization with Webpack](https://developers.google.com/web/fundamentals/performance/webpack/?utm_source=frontendfocus&utm_medium=email)
> - https://github.com/GoogleChromeLabs/webpack-training-project
> - [Addy Osmani’s guide on image optimization](https://images.guide/)
> - [Webpack docs for the ModuleConcatenationPlugin](https://webpack.js.org/plugins/module-concatenation-plugin/)
> - [Brief introduction to scope hoisting](https://medium.com/webpack/brief-introduction-to-scope-hoisting-in-webpack-8435084c171f)
> - [Webpack docs on externals](https://webpack.js.org/configuration/externals/)
> - [webpack 构建性能优化策略小结](https://segmentfault.com/a/1190000007891318)
> - [webpack externals详解](http://www.tangshuang.net/3343.html)
> - [webpack之前端性能优化（史上最全，不断更新中。。。）](https://www.cnblogs.com/ssh-007/p/7944491.html)
> - [彻底解决Webpack打包性能问题](https://zhuanlan.zhihu.com/p/21748318)
> - [webpack学习笔记—优化缓存、合并、懒加载等](https://www.cnblogs.com/yangmin01/p/6290595.html)
