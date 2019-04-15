![](https://i.imgur.com/hdguRLi.png)

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

- Entry
- Output
- Loaders
- Plugins

> Reference
- [中文官网](https://doc.webpack-china.org/)
- [官网](https://webpack.js.org/)


