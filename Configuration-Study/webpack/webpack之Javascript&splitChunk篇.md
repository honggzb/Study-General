[webpack之Javascript&splitChunk篇](#top)

- [使用babel转换ES6+语法](#%E4%BD%BF%E7%94%A8babel%E8%BD%AC%E6%8D%A2es6%E8%AF%AD%E6%B3%95)
  - [babel polyfill](#babel-polyfill)
  - [babel runtime transform](#babel-runtime-transform)
- [编译typescript](#%E7%BC%96%E8%AF%91typescript)
- [代码分割- optimization.splitChunks](#%E4%BB%A3%E7%A0%81%E5%88%86%E5%89%B2--optimizationsplitchunks)
- [Bundle Analysis](#bundle-analysis)
---------------------------------------------

- 代码编译（TS或ES6代码的编译）
- 脚本合并
- 公共模块识别
- 代码分割
- 代码压缩混淆

## 使用babel转换ES6+语法

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

### babel polyfill

在函数中加入`import "babel-polyfill"`，即可全局引入

### babel runtime transform

使用`.babelrc`文件

```javascript
//.babelrc
{
    "presets":[
        ["env",{
            "targets":{
                "browsers": [">1%", "last 2 versions"]
            }
        }
        ]],
    "plugins": [
         "@babel/transform-runtime"
    ]
}
//webpack.config.js
rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ {loader: 'babel-loader'}]
        //or
//      use: {
//            loader: 'babel-loader',
//            options: {
//                presets: ['@babel/preset-env', {
//                    targets: { browsers: ['>1%', ' last 2 versions'] }
//                }]
//            }
      }
    ]
```

[back to top](#top)

## 编译typescript

```javascript
// 1) install
npm i typescript ts-loader awesome-typescript-loader --save-dev
// 2) 类型声明 - optional
npm install @types/vue --save
// or
npm install typings
typings install vue
// typings.json, typings folder

//webpack.config.js
rules: [
        { test: /\.(ts|tsx)$/, loader: "awesome-typescript-loader" }
]
```

[back to top](#top)

## 代码分割- optimization.splitChunks

webpack4废弃了CommonsChunkPlugin插件，使用optimization.splitChunks和optimization.runtimeChunk来代替

- minSize(默认是30000)：形成一个新代码块最小的体积
- minChunks（默认是1）：在分割之前，这个代码块最小应该被引用的次数（译注：保证代码块复用性，默认配置的策略是不需要多次引用也可以被分割）
- maxInitialRequests（默认是3）：一个入口最大的并行请求数
- maxAsyncRequests（默认是5）：按需加载时候最大的并行请求数。
- chunks (默认是async) ：initial、async和all
- test： 用于控制哪些模块被这个缓存组匹配到。原封不动传递出去的话，它默认会选择所有的模块。可以传递的值类型：RegExp、String和Function
- name(打包的chunks的名字)：字符串或者函数(函数可以根据条件自定义名字)
- priority ：缓存组打包的先后优先级。

作者：乘风gg
链接：https://juejin.im/post/5af1677c6fb9a07ab508dabb
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

```javascript
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',//默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
      minSize: 30000,//合并前模块文件的体积
      minChunks: 1,//最少被引用次数
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',//自动命名连接符
      cacheGroups: {
        // split library code
        vendors: {
          test: /[\\/]node_modules[\\/]/i,
          minChunks:1,
          priority: -10   //优先级更高
        },
        // split common code
        commons: {
          test: /[\\/]src[\\/]js[\\/]/
          minChunks: 2,       //一般为非第三方公共模块
          priority: -20,
          reuseExistingChunk: true
        }
      },
      runtimeChunk:{  // The runtime should be in its own chunk
          name:'runtime'
      }
    }
  }
```

Here are some other useful plugins and loaders provided by the community for splitting code:

- [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin): Useful for splitting CSS out from the main application.
- [bundle-loader](https://webpack.js.org/loaders/bundle-loader): Used to split code and lazy load the resulting bundles.
- [promise-loader](https://github.com/gaearon/promise-loader): Similar to the bundle-loader but uses promises.

[back to top](#top)

## Bundle Analysis

- [official analyze tool](https://github.com/webpack/analyse)
- [webpack-chart](https://alexkuz.github.io/webpack-chart/): Interactive pie chart for webpack stats.
- [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/): Visualize and analyze your bundles to see which modules are taking up space and which are might be duplicates.
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer): A plugin and CLI utility that represents bundle content as a convenient interactive zoomable treemap.
- [webpack bundle optimize helper](https://webpack.jakoblind.no/optimize): This tool will analyze your bundle and give you actionable suggestions on what to improve to reduce your bundle size.

> Reference
- https://webpack.js.org/guides/code-splitting/
- https://developers.google.com/web/fundamentals/performance/optimizing-javascript/code-splitting/
- [webpack4：连奏中的进化](https://www.cnblogs.com/wmhuang/p/8967639.html)
- [一步一步的了解webpack4的splitChunk插件](https://juejin.im/post/5af1677c6fb9a07ab508dabb)
