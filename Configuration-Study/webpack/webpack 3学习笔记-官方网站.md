[webpack 3学习笔记-官方网站](#top)

- [1. Basic setup - using `webpack.config.js`](#Basic-setup)
  - [1.1 basic](#basic)
  - [1.2 development setup](#development)
- [2. Core Concepts](#Core-Concepts)
  - [2.1 Entry](#Entry)
  - [2.2 Output](#output)
  - [2.3 Loaders](#loaders)
  - [2.4 Plugins](#plugins)
  - [2.5 Configuration](#configuration)
  - [2.6 Modules](#modules)
  - [2.7 Targets](#Targets)
  - [2.8 Hot Module Replacement模块热替换](#模块热替换)
- [3. Asset Management](#Asset-Management)
- [4. 添加link转入不同语言](#加link转入不同语言)
- [5. i18n after ejection](#i18n after ejection)

<h3 id="Basic-setup">1. Basic setup - using `webpack.config.js`</h3>

<h4 id="basic">1.1 basic</h4>

1) install

```shell
#locally
npm install --save-dev webpack
npm install --save-dev webpack@<version>
#global
npm install --global webpack
```

2) package.json

```json
"scripts": {
    "start": "webpack --config webpack.config.js"
}
```

3) webpack.config.js

```javascript
var path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

[back to top](#top)

<h4 id="development">1.2 development setup</h4>

**1) webpack Watch Mode** - watch mode watches files for changes

```shell
# client side
webpack --progress --watch
# server side - need to use serve
npm install --save-dev serve
# in package.JSON
"scripts": {
  "start": "serve"
}
```

**2) Watch Mode with Chrome DevTools Workspaces**[Webpack your Chrome DevTools Workspaces](https://medium.com/@rafaelideleon/webpack-your-chrome-devtools-workspaces-cb9cca8d50da)

**3)[webpack-dev-server](https://webpack.js.org/configuration/dev-server)** -provides you with a server and live reloading

```shell
npm install --save-dev webpack-dev-server
webpack-dev-server --open
# 或in package.JSON
"scripts": {
  "start": "webpack-dev-server"
}
```

[back to top](#top)

<h3 id="Core-Concepts">2. Core Concepts</h3>

Webpack is a module bundler for modern JavaScript applications. The four core concepts: 

```shell
npm install webpack@3.0.0 --save-dev
yarn add webpack@3.0.0 --dev
```

concept | description
---|---
entry|入口, contextual root(根上下文)或app第一个启动文件
output|出口 
loaders|加载器, webpack 把每个文件(.css, .html, .scss, .jpg, etc.)都作为模块处理, loader 会将这些文件转换为模块，而转换后的文件会被添加到依赖图表中
plugins|插件, [list of plugins插件列表](https://webpack.js.org/plugins/)

```JavaScript
var path = require('path');
const config = {
  entry: './path/to/my/entry/file.js',     //entry, 可是文件路径(file path)数组
  output: {                                //output
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {      //加载器
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}   //在require()/import语句中被解析为.js或.jsx的路径时，在把它们添加并打包之前，要先使用babel-loader去转换
    ]
  },
  plugins: [    //插件
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
module.exports = config;
```

[back to top](#top)

<h4 id="Entry">2.1 Entry</h4>

- Single entry: `entry: string|Array<string>`
- Object Syntax: `entry: {[entryChunkName: string]: string|Array<string>}`

```javascript
//实际用例
//1) 分离应用程序(app)和公共库(vendor) 入口
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
//2) 多个页面应用程序
const config = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
```

[back to top](#top)

<h4 id="output">2.2 Output</h4>

**可以存在多个入口起点，但只指定一个输出配置**

```javascript
//1) minimum requirements: output filename && absolute path to your preferred output directory
const config = {
  output: {
    filename: 'bundle.js',
    path: '/home/proj/public/assets'
  }
};
module.exports = config;
//2) Multiple Entry Points
{
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',   //writes to disk: ./dist/app.js, ./dist/search.js
    path: __dirname + '/dist'
  }
}
//3) using a CDN and hashes for assets
output: {
 path: "/home/proj/cdn/assets/[hash]",
 publicPath: "http://cdn.example.com/assets/[hash]/"   
 //when the eventual publicPath of output files isn't known at compile time, it can be left blank and set dynamically at runtime in the entry point file
}
//如果你在编译时不知道 publicPath，你可以先忽略它，并且在入口起点设置 __webpack_public_path__
__webpack_public_path__ = myRuntimePublicPath
// ... 其他的应用程序入口
```

[back to top](#top)

<h4 id="loaders">2.3 Loaders</h4>

There are three ways to use loaders in your application

Way | description|Syntax
---|---|---
Configuration(**recommended**)|Specify them in your `webpack.config.js` file|`module.rules`
Inline|Specify them explicitly in each import statement|`import Styles from 'style-loader!css-loader?modules!./styles.css';`
CLI|Specify them within a shell command|`webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'`

**Loader Features特性**

- loader 支持链式传递。能够对资源使用管道流(pipeline)。loader链式地按照先后顺序进行编译。loader链中的第一个loader返回值给下一个loader。在最后一个loader，返回webpack所预期的JavaScript
- loader 可以是同步或异步函数
- loader 运行在Node.js中，并且能够执行任何可能的操作
- loader 接收查询参数。用于loader间传递配置
- loader 也能够使用options对象进行配置
- 除了使用package.json常见的main属性，还可以将普通的npm模块导出为loader，做法是在package.json 里定义一个loader 字段
- 插件(plugin)可以为loader带来更多特性
- loader 能够产生额外的任意文件

**Resolving Loaders**

See "[How to Write a Loader?](https://webpack.js.org/development/how-to-write-a-loader)" for more information

[back to top](#top)

<h4 id="plugins">2.4 Plugins</h4>

- webpack 插件是一个具有apply属性的JavaScript对象。 apply属性(apply方法可把任意函数作为插件传递-this将指向compiler)会被webpack compiler调用，并且compiler对象可在整个compilation生命周期访问
- plugin可以携带参数/选项，必须在wepback配置中，向plugins属性传入new实例

```JavaScript
plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
```

- In the Node API, users should pass plugins via the plugins property in the configuration. Using compiler.apply should not be the recommended way

```JavaScript
//some-node-script.js
const webpack = require('webpack');           //to access webpack runtime
const configuration = require('./webpack.config.js');
let compiler = webpack(configuration);
compiler.apply(new webpack.ProgressPlugin());
compiler.run(function(err, stats) {
   // ...
});
```

[back to top](#top)

<h4 id="configuration">2.5 Configuration</h4>

- webpack 的配置文件是 JavaScript 文件导出的一个对象。此对象，由 webpack 根据对象定义的属性进行解析。
- webpack 配置是标准的 Node.js CommonJS 模块，可以:
  - 通过 require(...) 导入其他文件
  - 通过 require(...) 使用 npm 的工具函数
  - 使用 JavaScript 控制流表达式，例如 ?: 操作符
  - 对常用值使用常量或变量
  - 编写并执行函数来生成部分配置

```JavaScript
//最简单的配置
var path = require('path');
module.exports = {
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  }
};
//多个 Target(这个是webpack2的例子，是否兼容webpack3????)
var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var baseConfig = {
  target: 'async-node',
  entry: {
    entry: './entry.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'inline',
      filename: 'inline.js',
      minChunks: Infinity
    }),
    new webpack.optimize.AggressiveSplittingPlugin({
        minSize: 5000,
        maxSize: 10000
    }),
  ]
};
let targets = ['web', 'webworker', 'node', 'async-node', 'node-webkit', 'electron-main'].map((target) => {
  let base = webpackMerge(baseConfig, {
    target: target,
    output: {
      path: path.resolve(__dirname, 'dist/' + target),
      filename: '[name].' + target + '.js'
    }
  });
  return base;
});
module.exports = targets;
```

**Using other Configuration Languages**, [The list of supported file extensions](https://github.com/js-cli/js-interpret) can be found at the node-interpret package

```javascript
//1) TypeScript
`npm install --save-dev typescript ts-node @types/node @types/webpack`
import * as webpack from 'webpack';
import * as path from 'path';
declare var __dirname;
const config: webpack.Configuration = {
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  }
};
export default config;
//2) Babel and JSX
`npm install --save-dev babel-register jsxobj babel-preset-es2015`
//.babelrc
{
  "presets": [ "es2015" ]
}
//webpack.config.babel.js
import jsxobj from 'jsxobj';
const CustomPlugin = config => ({   // example of an imported plugin
  ...config,
  name: 'custom-plugin'
});
export default (
  <webpack target="web" watch>
    <entry path="src/index.js" />
    <resolve>
      <alias {...{
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      }} />
    </resolve>
    <plugins>
      <uglify-js opts={{
        compression: true,
        mangle: false
      }} />
      <CustomPlugin foo="bar" />
    </plugins>
  </webpack>
);
```

[back to top](#top)

<h4 id="configuration">2.6 Modules</h4>

- webpack modules can express their dependencies in a variety of ways.
  - An ES2015 `import` statement
  - A CommonJS `require()` statement
  - An AMD define and require statement
  - An `@import` statement inside of a css/sass/less file.
  - An image url in a stylesheet (`url(...)`) or html (`<img src=...>`) file.
- webpack通过loader可以支持各种语言和预处理器编写模块

[back to top](#top)

<h4 id="Targets">1.7 Targets</h4>

```javascript
//webpack会编译为用于类Node.js环境(使用 Node.js的require ，而不是使用任意内置模块(如fs或path来加载chunk)
module.exports = {
  target: 'node'
};
//多个Target, will create a lib.js and lib.node.js file in your dist folder
var path = require('path');
var serverConfig = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.node.js'
  }
  //…
};
var clientConfig = {
  target: 'web', // <=== can be omitted as default is 'web'
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.js'
  }
  //…
};
module.exports = [ serverConfig, clientConfig ];
```

[back to top](#top)

<h4 id="模块热替换">2.8 Hot Module Replacement(HMR)模块热替换</h4>

模块热替换功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载页面

```javascript
//1) Enabling HMR
const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: './index.js',
  plugins: [
    new webpack.HotModuleReplacementPlugin()    // Enable HMR
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    hot: true,                                  // Tell the dev-server we're using HMR
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};
//index.js- testing HMR
import Library from './library';
if (module.hot) {
  module.hot.accept('./library', function() {
    console.log('Accepting the updated library module!');
    Library.log();
  })
}
//library.js
export default {
  log() {
    console.log('Initial log...');  // Change this after the server is started to test
  }
}
//Start changing the console.log statement in library.js
//2) HMR with Stylesheets, 通过style-loader实现
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  // ...
}
//index.js
import Lib from './library';
import './styles.css';
```

- [React Hot Loader](https://github.com/gaearon/react-hot-loader): Tweak react components in real time.
- [Vue Loader](https://github.com/vuejs/vue-loader): This loader supports HMR for vue components out of the box.
- [Redux HMR](https://survivejs.com/webpack/appendices/hmr-with-react/#configuring-hmr-with-redux)

[back to top](#top)

<h3 id="Asset-Management">3. Asset Management</h3>

`npm install --save-dev style-loader css-loader`

**project - webpack-demo**

```
 ├── /node_modules
 ├── dist
 │   ├── bundle.js
 │   └── index.html
 ├── src
 │   ├── data.xml
 │   ├── my-font.woff
 │   ├── my-font.woff2
 │   ├── icon.png
 │   ├── style.css
 │   └── index.js
 ├── package.json
 └── webpack.config.js
```

```javascript
//webpack.config.js
var path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader','css-loader']     //1) loading css
        },
        {
          test: /\.(png|svg|jpg|gif)$/,          //2) loading images
          use: [ 'file-loader' ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,   //3) loading fonts
          use: ['file-loader']
        },
        {
          test: /\.(csv|tsv)$/,        //4) loading data
          use: [  'csv-loader' ]
        },
        {
          test: /\.xml$/,              //4) loading data
          use: [ 'xml-loader' ]
        }
      ]
    }
};
// src/index.js
import _ from 'lodash';
import './style.css';           //1) loading css
import Icon from './icon.png';  //2) loading images
import Data from './data.xml';  //4) loading data
function component() {
    var element = document.createElement('div');
    // Lodash, now imported by this script
    element.classList.add('hello');
    // Add the image to our existing div.
    var myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);
    console.log(Data);      //4) loading data
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
  }
document.body.appendChild(component());
```

```css
@font-face {
    font-family: 'MyFont';
     /*3) loading fonts*/
    src:  url('./my-font.woff2') format('woff2'), url('./my-font.woff') format('woff'); 
  }
  .hello {
    color: red;
    font-family: 'MyFont';
    background: url('./icon.png');
  }
```

[back to top](#top)

<h3 id="Output-Management">4. Output Management</h3>

```javascript
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');   //Auto-Generated HTML
module.exports = {
  entry: {
    app: './src/index.js',
    vendor: [ 'react', 'react-dom' ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'Output Management', favicon: './favicon.ico'})
  ]
};
```

将生成一个文件 dist/index.html

```html
<!doctype html>
<html>
  <head>
    <title>Output Management</title>
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="stylesheet" href="/styles.min.css" />
    <script src="/vendor.bundle.js"></script>
  </head>
  <body>
    <script src="/app.bundle.js"></script>
  </body>
</html>
```

- **[Multiple HTML Files](https://github.com/mutualofomaha/multipage-webpack-plugin)**: to generate an HTML file per entry point
- **The Manifest**:  to track how all modules map to the output bundles
  - [WebpackManifestPlugin](https://github.com/danethurber/webpack-manifest-plugin)
  - [ChunkManifestPlugin](https://github.com/soundcloud/chunk-manifest-webpack-plugin)

[back to top](#top)

- [webpack2.2中文文档](http://www.css88.com/doc/webpack2/)
- https://webpack.js.org
- https://devopen.club/course/webpack2.html
- [使用可视化图表对 Webpack 2 的编译与打包进行统计分析](http://www.cnblogs.com/parry/p/webpack2-Statistics.html)
