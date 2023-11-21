[Angular 12 New Features](#top)

- [Angular 12 与 Angular 11 有什么不同](#angular-12-与-angular-11-有什么不同)
- [Ivy Everywhere](#ivy-everywhere)
- [标准化消息标识符格式](#标准化消息标识符格式)
- [无效合并](#无效合并)
- [严格默认值](#严格默认值)
- [改进下一代的应用程序编程接口](#改进下一代的应用程序编程接口)
- [Typescript 4.2](#typescript-42)
- [对style的修改](#对style的修改)
- [重大更改](#重大更改)
- [新的弃用](#新的弃用)


## Angular 12 与 Angular 11 有什么不同

 11 | 12 
---|---
只支持 TypeScript 4.0|包含 TypeScript 4.2
只与 Webpack 5.0 兼容|Webpack 5.37
严格检查可被标志启用 | 严格模式会在默认情况下被启用
old | ivy engine

## Ivy Everywhere

- 从版本 12 开始，Angular 的 View Engine，一种遗留的编译和渲染管道，将被弃用。渲染管线将在将来的版本中删除。因此，与 View Engine 兼容的库可以与常春藤一起使用

## 标准化消息标识符格式

- 消息 id 格式得到了极大的改进。以前，空格和翻译失效问题会使以前使用的旧消息 ID 在翻译中变得不一致
- Angular 的基于 View Engine 的 i18n 消息 ID 算法已经弃用
- 新版本向 localize-extract 中添加一种新的格式，名为 legacy-migrate。此格式可用于生成 JSON 文件，进而将旧版消息 ID 映射为规范 ID

## 无效合并

- Angular 12 中的模板可以与无效合并一起使用。干净的代码可以在无效合并运算符的帮助下被创建。开发人员可以使用由无效合并实现的新语法来增强复杂的条件。
- `{{age !== null && age !== undefined ? age : calculateAge() }}`
- `{{age ?? calculateAge() }}`

## 严格默认值

- 在默认情况下启用了CLI的严格模式
- ng update 命令返工是对 Angular 12 严格模式的重要补充。由于这次修订，程序员可以更自信地处理新程序或工作区

## 改进下一代的应用程序编程接口

- ng 故障排除 API 是 Angular 12 中一项强大的新功能，可在执行应用程序时深入了解应用程序的行为。此外，getDirectiveMetada 和 esetProfiler 等新功能将简化和扩展调试 API 的应用程序检查范围。
- 通过使用getDirectiveMetada，您可以获得有关各种组件和指令的信息。另一方面，esetProfile 可用于监视模板生命周期、更改和生命周期挂钩执行

## Typescript 4.2

- 使用增强的运算符，Typescript 4.2 可确保关键变量和其他数据永远不会显示错误。正如新的和增强的 TypeScript 版本将产生更少的重复和不正确的代码示例、有效的别名和正确的类型一样，升级后的 TypeScript 版本也将节省您的时间。
- Typescript 4.2 中的元组增强了可读性和工具支持，这使得包含可选、其余和任意组件成为可能。Angular 12 中的 Typescript 4.2 简化了分类检查，并以类似的方式在构造函数签名中启用抽象修饰符

## 对style的修改

- 除了上述更改外，此版本的 Angular 还对其美观进行了一些增强。首先，组件装饰器样式字段容纳内联 Sass。此外，在Angular Material和Angular CDK内部采用了新的Sass模块结构。除此之外，Angular 12 现在正式支持 Tailwind CSS 预处理器
- 有了一个新的构建选项 inlineStyleLanguage，用来以内联组件样式的形式定义样式表。当前支持的语言选项是 CSS（默认）、Sass、SCSS 和 LESS。 CSS 的默认设置使现有项目能够继续按预期般运行

## 重大更改

- Angular 工具现在使用 Webpack 5 来构建应用。
  - 当启用了 namedChunks 时，Webpack 5 会为开发配置中惰性加载的 JavaScript 文件生成相似但不同名的文件。
Webpack 5 现在包括对 Web Worker 的支持
  - 发出事件选项、HTTP 状态代码和 Webpack 5 支持只是 Angular 12 中包含的一些新功能。其他更改包括缩小的 UMDs、重新定向的源文件、严格的空检查等
- 为 AbstractControl 类方法添加了 emitEvent 选项。
- 支持将 APP_INITIALIZER 与可观察对象一起使用。
- HttpClient 支持指定请求的元数据
  - 在 HttpParams 上实现了 appendAll()方法
- 为了提高编译器cli性能，若存在重新定向的源文件，新版本允许进行增量编译
- 以前，Forms 模块会忽略 `<input type="number">` 上定义的 min 和 max 属性。现在，formControl ，formControlName 或 ngModel 指令都提供了对应的输入属性，这些属性将触发 min 和 max 验证逻辑
- ng build 现在默认情况下会生成针对生产环境的捆绑包
- 可以通过 BrowserAnimationsModulewithConfig 禁用动画

## 新的弃用

- 不建议再使用 Internet Explorer 11。
- 不建议再从 @angular/material/theming 中导入 Sass。请改用基于 `@use` 的新的 Angular Material Sass API。运行迁移脚本 ng g @angular/material:themingApi 将 Angular CDK 和 Angular Material 的所有 Sass 导入都切换到新的 API 和 @use。
- 不建议再使用 View Engine 发布库
- 为了提高性能，新版本删除了 DomAdapter 中的多种未使用方法



- [全新改进的 Angular 12：七个基本变化](https://www.linglei.com.cn/blog/%E8%BD%AF%E4%BB%B6%E7%A8%8B%E5%BA%8F%E5%91%98/%E5%85%A8%E6%96%B0%E6%94%B9%E8%BF%9B%E7%9A%84-angular-12%EF%BC%9A%E4%B8%83%E4%B8%AA%E5%9F%BA%E6%9C%AC%E5%8F%98%E5%8C%96)
- [Angular 学习笔记Angular 12 get started](https://www.cnblogs.com/keatkeat/p/14821676.html)
