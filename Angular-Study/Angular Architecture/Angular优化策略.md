[Angular项目优化之按需加载模块和组件](#top)

- 通过路由形式的按需加载、使用DLL等方式来优化Angular项目-[Angular 项目过大？合理拆分它](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Fjuejin.cn%2Fpost%2F7124565429288173576)
- [不通过路由的形式来实现按需加载模块和组件](https://www.nowcoder.com/discuss/519558987398807552)
  - https://github.com/Vibing/angular-webpack

## Angular项目一些优化

- 合理拆分
  - 整个项目包括：强依赖库(Angular框架本身)、UI组件库及第三方库、业务代码部分；
    - 强依赖库和几乎不会变动的库打包成一个 `vendor_library`，里面可以包含`@angular/common`、`@angular/core`、`@angular/forms`、`@angular/router`等类似的包
  - 用户行为维度：用户的所有访问基于路由，一个路由一个页面
    - 基于路由的 code spliting来打包。思路很简单，用户访问哪个页面，就把该页面对应的 js 下载下来，没必要把没访问的页面一起打包
- 页面级代码分割: 将每个路由对应的页面进行模块化。也就是一个页面就是一个module
- 组件级代码分割
- 使用 webpack: 
  - 使用 webpack的 DLL来把Angular相关的库比如 rxjs、router 等缓存起来，因为这些库几乎不会跟着业务版本迭代去变化
  - 可以把这些库集中到一个 js 文件中，而且不会每次打包都变更这个 js 文件，这样打包时只打包业务代码，缩小打包时间，用户除了第一次访问时要拉取 dll ，以后再访问会直接从缓存里拉取，减少页面加载时间，提升用户体验
- 使用 service 配合 rxjs 做状态管理及状态共享
- 按需加载模块和组件

```javascript

```

- [Angular的14种优化策略](https://juejin.cn/post/7213307113111994427)

## Angular优化策略

- 启用生产模式
- AOT
- Minification
- 避免视图中的函数调用和 getter
- 纯管道
- 懒加载module
- 代码拆分
- onpush变更检测
- 异步管道
- ngDoCheck
- 函数追踪
- Zone.js
- 取消订阅 observables
- web workers

## 性能分析工具webpack-bundle-analyzer

- [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)
