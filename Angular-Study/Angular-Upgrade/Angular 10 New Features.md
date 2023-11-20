[Angular 10 New Features](#top)

- [支持 TypeScript 3.9.x](#支持-typescript-39x)
- [可选的严格设置](#可选的严格设置)
- [新的TypeScript配置结构](#新的typescript配置结构)
- [Bazel](#bazel)
- [@angular-devkit/build-angular 0.1000.0](#angular-devkitbuild-angular-010000)
- [增量式模板类型检查](#增量式模板类型检查)
- [CanLoad](#canload)
- [I18N/L10N](#i18nl10n)
- [Service Workers](#service-workers)
- [Angular Material](#angular-material)
- [大量的缺陷修复](#大量的缺陷修复)
- [废弃特性](#废弃特性)
- [不带Angular装饰器的class不再支持Angular的特性](#不带angular装饰器的class不再支持angular的特性)
- [ModuleWithProviders强制使用泛型](#modulewithproviders强制使用泛型)
- [其他重大变更](#其他重大变更)

--------------------------------------------------------

## 支持 TypeScript 3.9.x

- 基于编译CLI的升级和对TS3.9的支持，Angular 10 的类型检查比以往的版本都要快，这对于大多数项目来说是个好消息，尤其是大型项目。
- Angular 10还升级到了 TSLib 2.0。TSLib简单地说就是一个提供TypeScript运行时支持方法的官方库，它要结合“tsconfig.json”里的importHelpers标记生效，当importHelpers开启的时候，编译器可以生成更紧凑、更具可读性的代码。总之不用担心，TSLib没有太大变化

## 可选的严格设置

- 运行下面的命名可以创建一个严格设置的项目: `ng new --strict`
  - 开启TypeScript的严格模式（建议总是开启！），以及严格的Angular模板类型检测
  - 大大降低了“angular.json”的空间预算，鼓励新用户关注应用打包的大小
  - 强制使用更严格的TSLint配置，禁止使用“any”类型（“no-any”为true），还开启了codelyzer提供的几个有趣的规则。虽然这样做很严格，但TSLint可以让你走得更远

##  新的TypeScript配置结构

- 新版本提供的默认TS配置有点变化，现在是同时提供了 “tsconfig.base.json” 、 “tsconfig.json”、“tsconfig.app.json” 和“tsconfig.spec.json”。
- “tsconfig.json” 只包含TypeScript项目引用，这样可以提升编译时性能，而且更严格地隔离项目的不同部分：
- “tsconfig.app.json”管应用代码；
- “tsconfig.spec.json”管测试；
- “tsconfig.base.json” 里面的TypeScript配置只配置TypeScript编译器和Angular编译器选项，没有配置指定/排除编译哪些文件。那指定/排除编译哪些文件在哪里配置呢？答案是在“tsconfig.app.json”文件里面

[⬆ back to top](#top)

## Bazel

- Angular项目基本上不会再支持Bazel，Bazel再也不是Angular CLI的默认构建工具

## @angular-devkit/build-angular 0.1000.0

- 如果你用SASS，build-angular会重新定义资源的相对路径。之前的版本里，在样式文件里引用或导入 url(./foo.png) 这样的路径，都会保留准确的URL，当引入的样式文件不在同一个目录下的时候就会崩掉。现在所有使用相对资源的路径都能找到了
- build-angular可以去掉Webpack无法处理的重复模块，这是通过自定义Webpack解析插件实现的

## 增量式模板类型检查

新版的编译器CLI可以实现增量式模板类型检查

## CanLoad

以前，CanLoad guard 只能返回boolean值，现在可以返回 UrlTree 类型的值，匹配CanActivate 守卫的行为。注意，这不会影响预加载

## I18N/L10N

以前本地只能支持一个翻译文件。现在本地可以指定多个文件了，然后通过message id来合并。

## Service Workers

默认的SwRegistrationStrategy有所优化。避免了之前可能会出现的 Service Worker从未注册的情况（比如有interval或递归timeout这样的长时间运行任务存在时）

## Angular Material
Angular Material 10 也跟着发布了，变化挺多的

## 大量的缺陷修复

Angular团队投入了大量的时间和精力去修复了积压的bug，解决了超过700个issue

[⬆ back to top](#top)

## 废弃特性

- Angular打包格式不再支持ESM5/FESM5，因为构建过程的最后都会降级为ES5。如果你不用Angular CLI打包，你要自己想办法把Angular代码降级到es5。
- IE 9、IE 10和移动端IE浏览器都不支持了。

## 不带Angular装饰器的class不再支持Angular的特性

- 直到Angular 9，都可以在没有使用装饰器（比如 @Component，@Derective等）的类里面使用Angular的特性。Angular 10里面不行了，你必须加装饰器。如果你有用到组件继承，父子组件类里的其中一个没有加装饰器，就会有问题
- 为什么要强制变更？简单来讲，Ivy编译器需要装饰器
  - 如果没有装饰器，Angular的编译器就不会添加依赖注入的额外代码
  - 如果父组件缺少了装饰器，那子类就会继承父类的constructor，但编译器不会生成对应的constructor信息（因为没装饰）。当Angular试图创建这个子类时，就没有正确的信息去创建了。在View引擎里面，编译器可以在全局范围里查找缺失的数据，但Ivy编译器会单独处理每个指令，这意味着更快的编译速度，但就没法像以前那样自动找到缺失的constructor信息了，只有显式添加装饰器才能提供这个信息
  - 如果子类缺少了装饰器，那它就会继承父类但是没有自己的装饰器，编译器也没法知道这个类是个@Derective还是个@Component，所以没法生成对应的指令信息
  - 这个变更带来的好处就是增强了Angular世界的一致性。如果你想用Angular特性，那就加上Angular装饰器

[⬆ back to top](#top)

## ModuleWithProviders强制使用泛型

- 以前ModuleWithProviders也接受泛型，但不是强制的。NG 10里面，泛型参数是必需的，这样有利于类型安全。如果你遇到第三方库的报错：
- go复制代码error TS2314: Generic type 'ModuleWithProviders<T>' requires 1 type argument(s).
- 建议联系作者修复，因为NGCC也没法处理。也可以先把skipLibChecks设为 false来跳过

## 其他重大变更

- Resolver：返回EMPTY的会取消导航，如果你想让导航顺利完成，必须保证resolver有返回值。
- Service worker：依赖不同header的资源的Service worker实现跟之前不一样了，不同的header会被忽略。建建议避免缓存这样的资源，可能会引起user agent不可预测的行为。由此，即使资源的header不用也可以检。缓存匹配选项可以在VGSW的配置文件里面配置。
- 属性绑定：比如[foo]=(bar$ | async).fubar这样，如果fubar的值跟之前一样，就不会触发变化检测。如果你想要触发变化检测，变通的方法就是让整个引用发生变化。
- 时间日期格式化：formatDate()和DatePipe 的格式化代码改了，之前的实现对于跨午夜的日期范围有问题
- UrlMatcher背后的方法utility type现在的返回类似可以是null
- ExpressionChangedAfterItHasBeenChecked 的报错新增了之前没检测到的场景
- Angular日志：模板里的未知元素/属性绑定从以前的warning输出级别提升到error输出级别
- 响应式表单：valueChanges 绑定到number类型的input时有个表单控制的bug，现在number的输入框不再监听change事件，而是监听input事件。记得修改你的测试样例。这个还打破了IE9的兼容性，不过也不影响了
- minLength 和maxLength验证器：它的值保证包含数值类型的length属性，以前没有length属性的falsy值会引起验证错误

[⬆ back to top](#top)

- [译文-深入探索Angular 10](https://juejin.cn/post/6861887624206876679?searchId=202311202327311BF21FFE4A51D938E4D0)
- [原文地址](https://medium.com/javascript-in-plain-english/angular-10-in-depth-a48a3a7dd1a7)
- [官方迁移指南](https://update.angular.io/#9.0:10.0l3)
