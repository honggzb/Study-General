[webpack 4-study](#top)

- [学习准备 - 模块化](#%E5%AD%A6%E4%B9%A0%E5%87%86%E5%A4%87---%E6%A8%A1%E5%9D%97%E5%8C%96)
  - [JS模块化](#js%E6%A8%A1%E5%9D%97%E5%8C%96)
  - [CSS模块化](#css%E6%A8%A1%E5%9D%97%E5%8C%96)
- [Wbpack核心概念](#wbpack%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5)
  - [Sample: different module standard in webpack](#sample-different-module-standard-in-webpack)
- [编译ES6/7](#%E7%BC%96%E8%AF%91es67)
- [编译typescript](#%E7%BC%96%E8%AF%91typescript)
- [常用Loaders](#%E5%B8%B8%E7%94%A8loaders)
- [常用Plugins](#%E5%B8%B8%E7%94%A8plugins)
  - [html-webpack-pluginjs 自动注入html文件](#html-webpack-pluginjs-%E8%87%AA%E5%8A%A8%E6%B3%A8%E5%85%A5html%E6%96%87%E4%BB%B6)
  - [lean-webpack-plugin- 删除指定文件](#lean-webpack-plugin--%E5%88%A0%E9%99%A4%E6%8C%87%E5%AE%9A%E6%96%87%E4%BB%B6)
- [热更新，自动刷新](#%E7%83%AD%E6%9B%B4%E6%96%B0%E8%87%AA%E5%8A%A8%E5%88%B7%E6%96%B0)
- [提取公共代码](#%E6%8F%90%E5%8F%96%E5%85%AC%E5%85%B1%E4%BB%A3%E7%A0%81)
- [代码分割和懒加载](#%E4%BB%A3%E7%A0%81%E5%88%86%E5%89%B2%E5%92%8C%E6%87%92%E5%8A%A0%E8%BD%BD)

![](https://i.imgur.com/naxyjwf.png)

## 学习准备 - 模块化

**Webpack支持AMD（RequireJS），ES Module（推荐），CommonJS**

### JS模块化

- 命名空间
- commonjs:  如nodeJS
  - 一个文件是一个模块
  - 通过module.exports暴露模块接口
  - 通过require引入模块
  - 同步执行
  - http://wiki.commonjs.org/wiki/Modules/1.1.1
  - ![](https://i.imgur.com/1EN3sra.png)
- AMD（Async Module Definition): 服务器端，如RequireJS
  - 通过define定义模块
  - 通过require引入模块
  - 依赖前置，提前执行
  - 在Commonjs 中，所有的模块是同步加载，服务端由于都是本地文件可以承受这样的一个加载开销，而我们的浏览器端呢？如果要求用户来承担这一个同步加载所有模块的开销，一定会影响到用户的浏览网页的速度。AMD 正是为了解决这一点而生
  - https://github.com/amdjs/amdjs-api/wiki/AMD
  - ![](https://i.imgur.com/m7NiU96.png)
- CMD（Common Module Definition): 如SeaJS
  - 一个文件是一个模块
  - 通过require引入模块
  - 尽可能懒执行
  - ![](https://i.imgur.com/dmOAjpA.png)
- UMD（Universal Module Definition)
  - 通用解决方案
  - 三个步骤
    - 判断是否执行AMD
    - 判断是否执行CommonJS
    - 如果都没有，使用全局变量
  - ![](https://i.imgur.com/mN6qBfl.png)
- ES6 Module
  - 一个文件是一个模块
  - export/import
  - ![](https://i.imgur.com/xx64HEE.png)

### CSS模块化

- CSS 设计模式
  - OOCSS
  - SMACSS:
  - Atomatic CSS
  - MCSS
  - AMCSS
  - BEM
- CSS Modules

[back to to](#top)

## Wbpack核心概念

Webpack版本|年|功能进化|
---|---|---
Webpack v1.0.0|2014.2.20|编译、打包<br>HMR (模块热更新)<br>代码分割<br>文件处理
Webpack v2.2.0|2017.1.18|Tree shaking<br>ES module<br>动态Import|新的文档
Webpack v3.0.0 |2017.6.19|Scope Hoisting (作用域提升)<br>Magic Comments （配合动态import使用）
Webpack v4.0.0 beta ||

- 作用域提升（Scope Hositing ）是Webpack 3的标志性特征，老版本 Webpack需要将每个模块包裹在单独的函数闭包中以实现模块系统。而这些封装函数往往会使得浏览器中运行的JavaScript代码性能有所下降；而Closure Compiler、RollupJS这些构建工具则会将代码中所有的模块作用域连接到单一闭包中，从而保证了浏览器中的代码运行速度

```javascript
module.exports = {
    entry: '',               // 入口文件
    output: {},              // 出口文件
    module: {},              // 处理对应模块
    plugins: [],             // 对应的插件
    devServer: {},           // 开发服务器配置
    mode: 'development'      // 模式配置
}
```

### Sample: different module standard in webpack

```javascript
/*webpack.config.js*/
const HtmlWebpackPlugin = require('html-webpack-plugin');   //引入html-webpack-plugin
module.exports = {
    entry: {
        app: './app.js'  //入口文件，若不配置webpack4将自动查找src目录下的index.js文件
    },
    output: {
        filename: '[name].[hash:5].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',     //输出文件名
            template: './index.html',   //以当前目录下的index.html文件为模板生成dist/index.html文件
            hash: true                  // 会在打包好的bundle.js后面加上hash串
        })
    ]
}
/*app.js*/
//es Module
import sum from './sum';
//common.js
var minus = require('./minus');
//amd- async loading, 打包的时候会生成两个bundle
require(['./muti'],function(muti){
    console.log('muti(23,3)=', muti(23,3));
})
console.log('sum(23,3)= ', sum(23,3));
console.log('minus(23,3)=', minus(23,3));
/*sum.js - es Module*/
export default function(a, b){
    return a + b;
}
/*minus.js - commonjs*/
module.exports = function(a, b){
    return a - b;
}
/*muti.js  -- amd*/
define(function(require, factory){
    'use strict';
    return function(a, b){
        return a * b;
    }
})
```

[back to to](#top)

## 编译ES6/7

https://babeljs.io/

```shell
# 1) install
npm install babel-loader@8.0.0-beta.0 @babel/core
# or
npm install –save-dev babel-loader babel-core
# 2) 规范- babel presets
npm install @babel/preset-env --save-dev   #npm install babel-preset-env –save-dev
# plugin- babel py
npm install babel-polyfill -save
npm install @babel/plugin-transform-runtime --save-dev
npm install @babel/runtime -save
```

- 规范- babel presets
  - es2015, es2016, es2017, env, babel-preset-react
  - babel-preset-stage0~3
    - Stage 0 - Strawman: just an idea, possible Babel plugin.
    - Stage 1 - Proposal: this is worth working on.
    - Stage 2 - Draft: initial spec.
    - Stage 3 - Candidate: complete spec and initial browser implementations
- plugin(两者选用一个即可)
  - babel polyfill: 全部垫片, 函数和方法,  `import "babel-polyfill"`
  - babel runtime transform: 局部垫片, 为开发框架准备, 不会污染其他文件， 使用`.babelrc`文件

[back to top](#top)

## 编译typescript

```shell
# 1) install
npm i typescript ts-loader awesome-typescript-loader --save-dev
# 2) 类型声明 - optional
npm install @types/vue --save
# or
npm install typings
typings install vue
# typings.json, typings folder
```

```javascript
//webpack.config.js
rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', {
                            targets: {
                                browsers: ['>1%', ' last 2 versions']
                            }
                        }]
                    }
                },
                exclude: /node_modules/
            }
         ],
//.babelrc
{
    "presets": [
        ["@babel/preset-env",
        {
            "targets": {
                "browsers": [
                    ">1%",
                    " last 2 versions"
                ]
            }
        }]
    ],
    "plugins": [
        ["@babel/transform-runtime"]
    ]
}
```

[back to to](#top)

## 常用Loaders

[back to to](#top)

## 常用Plugins

### html-webpack-pluginjs 自动注入html文件

可以将生成的js自动引入html页面，不用手动添加

### lean-webpack-plugin- 删除指定文件

https://link.juejin.im/?target=http%3A%2F%2Fnpm.taobao.org%2Fpackage%2Fclean-webpack-plugin

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');   //引入html-webpack-plugin
const CleanWebpackPlugin = require('clean-webpack-plugin'); //引入clean-webpack-plugin
 plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',     //输出文件名
            template: './index.html',   //以当前目录下的index.html文件为模板生成dist/index.html文件
        }),
        new CleanWebpackPlugin(['dist']), //传入数组,指定要删除的目录
    ]
```

[back to to](#top)

## 热更新，自动刷新

webpack-dev-server就是一个基于Node.js和webpack的一个小型服务器，它有强大的自动刷新和热替换功能

```javascript
const webpack = require("webpack");
plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
    }),
    new CleanWebpackPlugin(['dist']), //传入数组,指定要删除的目录
    // 热更新，热更新不是刷新
    new webpack.HotModuleReplacementPlugin()
],
devServer: {//配置此静态文件服务器，可以用来预览打包后项目
    inline:true,//打包后加入一个websocket客户端
    hot:true,//热加载
    contentBase: path.resolve(__dirname, 'dist'),//开发服务运行时的文件根目录
    host: 'localhost',//主机地址
    port: 9090,//端口号
    compress: true//开发服务器是否启动gzip等压缩
}
//package.json
"scripts": {
  "dev": "webpack-dev-server --mode development"
}
```

[back to to](#top)

## 提取公共代码

- 在webpack4之前，提取公共代码都是通过一个叫CommonsChunkPlugin的插件来办到的。
- 到了4以后，内置了一个一模一样的功能，而且起了一个好听的名字叫“优化”

```javascript
//webpack 3: 注意：如果entry是单入口，提取公共代码是不起效果的
//多页应用 + 第三方依赖 + webpack生成代码
var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: {  //建立3个entry
        'pageA': './src/pageA',
        'pageB': './src/pageB',
        'vendor': ['lodash']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({  //
            name: 'common',
            minChunks: 2,                //重复两次就提取出来
            chunks: ['pageA', 'pageB']   //指定提取范围
        }),
        new webpack.optimize.CommonsChunkPlugin({ //
            name: ['vendor', 'manifest'],   //注意顺序
            minChunks: Infinity             //直接提取出来
        })
    ]
}
// 结果
/*
 vendor.bundle.js
 common.bundle.js    pageA.js和pageB.js的公共部分
 pageB.bundle.js
 pageA.bundle.js
 manifest.bundle.js
*/
// webpack 4+， 如a.js和b.js都同时引入了jquery.js和一个写好的utils.js
module.exports = {
    entry: {
        a: './src/a.js',
        b: './src/b.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('dist')
    },
    // 提取公共代码
   optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件, vendor
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名
                    priority: 10   // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                },
                utils: { // 抽离自己写的公共代码，utils
                    chunks: 'initial',
                    name: 'utils',  // 打包后的文件名
                    minSize: 0    // 只要超出0字节就生成一个新包
                }
            }
        }
   },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'a.html',
            template: './src/index.html',  // 以index.html为模板
           chunks: ['vendor', 'a']
        }),
        new HtmlWebpackPlugin({
            filename: 'b.html',
            template: './src/index.html',  // 以index.html为模板
           chunks: ['vendor', 'b']
        })
    ]
}
```

[back to to](#top)

## 代码分割和懒加载

- 分离业务代码和业务公共代码 和 第三方依赖
- 分离首次加载和访问后加载的代码(优化)
- webpack methods
  - require.ensure
    - []: dependencies
    - callback
    - errorCallback
    - chunkName
  - require.include
- ES 2015 Loader spec
  - import()
  - import() -> promise -> import().then()

```javascript
import(
	/* webpackChunkName: async-chunk-name */
	/* webpackMode: lazy */
	modulename
)
```

[back to to](#top)

> Reference
- [中文官网](https://doc.webpack-china.org/)
- [官网](https://webpack.js.org/)
- https://www.npmjs.com/package/webpack-war-plugin
- [webpack4-用之初体验，一起敲它十一遍](https://www.cnblogs.com/cangqinglang/p/8964460.html)
- [Webpack 4 和单页应用入门（史上最全webpack4入门教程，看懂了你就入门了）](https://github.com/wallstreetcn/webpack-and-spa-guide)
