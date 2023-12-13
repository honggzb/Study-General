[Angular 12 New Features](#top)

- [自动内联字体](#自动内联字体)
- [Component Test Harnesses](#component-test-harnesses)
- [热模块替换（HMR）支持更新](#热模块替换hmr支持更新)
- [实验性 Webpack 5 支持](#实验性-webpack-5-支持)
- [Linting](#linting)
- [IE11是Angular 11还在支持的唯一IE版本](#ie11是angular-11还在支持的唯一ie版本)

-----------------------------------------------------------

## 自动内联字体

- 引入了自动字体内联。在编译时，Angular CLI 将下载和内联在应用程序中使用和链接的字体。会在使用版本 11 构建的应用中默认启用此功能。要利用这一优化，需要做的就是更新自己的应用！

## Component Test Harnesses

- 在 Angular v9 中，我们引入了 Component Test Harnesses（组件测试带）。它们提供了健壮易读的 API 表面，可以帮助大家更好地测试 Angular Material 组件。它为开发人员提供了一种在测试过程中使用受支持的 API 与 Angular Material 组件交互的方法。
- Angular v11 的发布，为所有组件都加上了测试带！现在，开发人员可以创建更加健壮的测试套件了
- Angular v11还纳入了性能改进和新的 API。parallel（并行）函数允许开发人员与组件并行运行多个异步交互，从而简化测试中的异步动作。manualChangeDetection 函数可以用来禁用单元测试中的自动更改检测，使开发人员可以更精细地控制更改检测。
- 有关这些 API 和其他新特性的更多细节和示例，请务必查看[Angular Material Test Harnesses](http://material.angular.io/cdk/test-harnesses/overview)的文档

## 热模块替换（HMR）支持更新

- Angular 提供了对 HMR（Hot Module Replacement）的支持，但启用它需要一些配置和代码更改操作，所以不方便快速添加到 Angular 项目中。
- 在版本 11 中我们更新了 CLI，允许开发人员在使用 ng serve 启动应用程序时启用 HMR。只需运行以下命令：`ng serve --hmr`
  - 本地服务器启动后，控制台将显示一条消息，确认 HMR 处于活跃 5 状态：'NOTICE: Hot Module Replacement (HMR) is enabled for the dev server.'
- 关于 HMR for webpack 的信息，请参见：https://webpack.js.org/guides/hot-module-replacement

## 实验性 Webpack 5 支持

- Angular v11可以选择加入 Webpack v5 了。当前，可以使用模块联邦这一实验特性。将来，webpack v5 会带来：
  - 持久磁盘缓存，以加快构建速度
  - cjs 摇树，减小包体积
- 想试用webpack5 需要在项目中启用它，请将以下部分添加到 package.json 文件中：
  - 目前，需要使用 yarn 进行测试，因为 npm 尚不支持 resolutions 属性

```
"resolutions": {
 "webpack": "5.4.0"
}
```

## Linting

- 在以前的 Angular 版本中，我们提供了 linting（TSLint）的一个默认实现。现在，TSLint 的项目创建者已经弃用它了，并建议大家迁移到 ESLint。James Henry 与开源社区的伙伴们一起开发了 typescript-eslint、angular-eslint 和 tslint-to-eslint-config，提供了一个第三方解决方案和迁移路径！我们一直在密切合作，确保 Angular 开发人员顺利过渡到受支持的 linting 栈。
- Angular v11 中弃用了 TSLint 和 Codelyzer。这意味着在将来的版本中，linting Angular 项目的默认实现会不可用转至官方项目页面获取在项目中引入 angular-eslint，并从 [TSLint 迁移的指南](https://github.com/angular-eslint/angular-eslint#migrating-from-codelyzer-and-tslint)

## IE11是Angular 11还在支持的唯一IE版本

- 移除了对 IE9/IE10 和 IE mobile 的支持。IE11是Angular 11还在支持的唯一IE 版本

[⬆ back to top](#top)

> [Angular 11 正式发布：加入 webpack 5，升级至 TS 4.0，不再支持 IE 9 和 10](https://cloud.tencent.com/developer/news/729240?&from=15431)
