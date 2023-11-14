[Build Angular libraries Note](#top)

[Build, test, and lint the project with CLI commands](#create-new-library-build-test-and-lint-the-project-with-cli-commands)
- [Publishing your library](#publishing-your-library)
- [project files structure](#project-files-structure)
- [Managing assets in a library](#managing-assets-in-a-library)
- [Peer dependencies同级依赖](#peer-dependencies同级依赖)
- [Using your own library in applications](#using-your-own-library-in-applications)
  - [Building and rebuilding your library](#building-and-rebuilding-your-library)
- [Publishing libraries](#publishing-libraries)
  - [Ensuring library version compatibility](#ensuring-library-version-compatibility)
  - [在 Angular CLI 之外使用部分 Ivy 代码](#在-angular-cli-之外使用部分-ivy-代码)

------------------------------------------------

## create new library, build, test, and lint the project with CLI commands

```shell
ng new my-workspace --no-create-application
cd my-workspace
ng generate library my-lib
# Build, test, and lint the project with CLI commands
# This builder, among other things, ensures that the library is always built with the AOT compiler
ng build my-lib --configuration development
ng test my-lib
ng lint my-lib
```

- When you generate a new library, the workspace configuration file, `angular.json`, is updated with a project of type `library`

```javascript
"projects": {
  …
  "my-lib": {
    "root": "projects/my-lib",
    "sourceRoot": "projects/my-lib/src",
    "projectType": "library",                 // library project type
    "prefix": "lib",
    "architect": {
      "build": {
        "builder": "@angular-devkit/build-angular:ng-packagr",
        //…
```

- To make library code reusable you must define a public API for it. This "user layer" defines what is available to consumers of your library. A user of your library should be able to access public functionality (such as NgModules, service providers and general utility functions) through a single import path.
- The public API for your library is maintained in the public-api.ts file in your library folder. Anything exported from this file is made public when your library is imported into an application. Use an NgModule to expose services and components.
  
[⬆ back to top](#top)

## Publishing your library

- Angular CLI uses a tool called **[ng-packagr](https://github.com/ng-packagr/ng-packagr/blob/master/README.md)** to create packages from your compiled code that can be published to npm
- 应该总是使用 ​production ​配置来构建用于分发的库。这样可以确保所生成的输出对 npm 使用了适当的优化和正确的软件包格式

```shell
ng build my-lib
cd dist/my-lib
npm publish
```
  
[⬆ back to top](#top)

## project files structure

- [Library project files](https://angular.io/guide/file-structure#library-project-files)

```shell
└── src/
   ├── lib/  	        #library project's logic and data.  Like an application project, a library project can contain components, services, modules, directives, and pipes
   ├── public-api.ts   #Specifies all files that are exported from your library
   ├── ng-package.json #Configuration file used by ng-packagr for building your library.
   ├── tsconfig.lib.json	#Library-specific TypeScript configuration, including TypeScript and Angular template compiler options. See [TypeScript Configuration](https://angular.io/guide/typescript-configuration).
   ├── tsconfig.lib.prod.json	#Library-specific TypeScript configuration that is used when building the library in production mode.
   └── tsconfig.spec.json	   #TypeScript configuration for the library tests. See [TypeScript Configuration](https://angular.io/guide/typescript-configuration)
```  

[⬆ back to top](#top)


## Managing assets in a library

- 对于 Angular 库，可分发文件中可包含一些额外的资产，如主题文件、Sass mixins 或文档（如变更日志）。欲知详情，请参见在构建时将[资产复制到库中](https://github.com/ng-packagr/ng-packagr/blob/main/docs/copy-assets.md)和[将资产嵌入到组件样式中](https://github.com/ng-packagr/ng-packagr/blob/main/docs/embed-assets-css.md)
- 如[@angular/material](https://unpkg.com/browse/@angular/material@14.0.5/package.json)中当包含额外的资产（如 Sass mixins 或预编译的 CSS）时，你需要将这些手动添加到主入口点的 ​package.json​ 中的条件化 ​"exports"​ 部分。​ng-packagr​ 会将手写的 ​"exports"​ 与自动生成的 ​"exports"​ 合并，以便让库作者配置额外的导出子路径或自定义条件

```javascript
"exports": {
  ".": {
    "sass": "./_index.scss",
  },
  "./theming": {
    "sass": "./_theming.scss"
  },
  "./prebuilt-themes/indigo-pink.css": {
    "style": "./prebuilt-themes/indigo-pink.css"
  }
}
```
  
[⬆ back to top](#top)

## Peer dependencies同级依赖

- 各种 Angular 库应该把自己依赖的所有 ​@angular/*​ 都列为同级依赖。这确保了当各个模块请求 Angular 时，都会得到完全相同的模块。如果某个库在 ​dependencies ​列出 ​@angular/core​ 而不是用 ​peerDependencies​，它可能会得到一个不同的 Angular 模块，这会破坏你的应用

## Using your own library in applications

- 如果要在同一个工作空间中使用某个库，你不必把它发布到 npm 包管理器，但你还是得先构建它。
- 要想在应用中使用你自己的库：
  - 构建该库。在构建之前，无法使用库。`ng build my-lib`
  - 在你的应用中，按名字从库中导入：`import { myExport } from 'my-lib';`
  
[⬆ back to top](#top)

### Building and rebuilding your library

- 原理：
  - 当在 Angular 应用中从某个库导入一些东西时，Angular 就会寻找库名和磁盘上某个位置之间的映射关系。当你用 npm 包安装该库时，它就映射到 ​node_modules ​目录下。当你自己构建库时，它就会在 ​tsconfig ​路径中查找这个映射
  - 用 Angular CLI 生成库时，会自动把它的路径添加到 ​tsconfig ​文件中。Angular CLI 使用 ​tsconfig ​路径告诉构建系统在哪里寻找这个库
- 命令： `ng build my-lib --watch`
  - 如果发现库中的更改没有反映到应用中，那么你的应用很可能正在使用这个库的旧版本。
  - 每当你对它进行修改时，都可以重建你的库，但这个额外的步骤需要时间。增量构建功能可以改善库的开发体验。每当文件发生变化时，都会执行局部构建，并修补一些文件。
  - 增量构建可以作为开发环境中的后台进程运行。要启用这个特性，可以在构建命令中加入 ​--watch​ 标志
- 命令解释：
  - CLI 的 ​build ​命令为库使用与应用不同的构建器，并调用不同的构建工具。
  - 应用的构建体系（​@angular-devkit/build-angular​）基于 ​webpack​，并被包含在所有新的 Angular CLI 项目中。
  - 库的构建体系基于 ​ng-packagr​。只有在使用 ​ng generate library my-lib​ 添加库时，它才会添加到依赖项中。
  - 这两种构建体系支持不同的东西，即使它们支持相同的东西，它们的执行方式也不同。这意味着同一套 TypeScript 源码在生成库时生成的 JavaScript 代码可能与生成应用时生成的 JavaScript 代码也不同。
  - 因此，依赖于库的应用应该只使用指向内置库的 TypeScript 路径映射。TypeScript 的路径映射不应该指向库的 ​.ts​ 源文件
  
[⬆ back to top](#top)

## Publishing libraries

- 发布库时可以使用两种分发格式
- 对于发布到 npm 的库，请使用 partial-Ivy 格式，因为它在 Angular 的各个补丁版本之间是稳定的
- 如果要发布到 npm，请避免使用完全 Ivy 的方式编译库，因为生成的 Ivy 指令不属于 Angular 公共 API 的一部分，因此在补丁版本之间可能会有所不同

|详情|分发格式|
|---|---|
|部分 Ivy（推荐）|包含可移植代码，从 v12 开始，使用任何版本的 Angular 构建的 Ivy 应用都可以使用这些可移植代码|
|完全 Ivy|包含专用的 Angular Ivy 指令，不能保证它们可在 Angular 的不同版本中使用。这种格式要求库和应用使用完全相同的 Angular 版本构建。这种格式对于直接从源代码构建所有库和应用代码的环境很有用|
  
[⬆ back to top](#top)

### Ensuring library version compatibility

- 用于构建应用的 Angular 版本应始终与用于构建其任何依赖库的 Angular 版本相同或更大。比如，如果你有一个使用 Angular 13 版的库，则依赖于该库的应用应该使用 Angular 13 版或更高版本。Angular 不支持为该应用使用早期版本
- 如果打算将库发布到 npm，请通过在 ​tsconfig.prod.json​ 的 ​"compilationMode": "partial"​ 来使用部分 Ivy 代码进行编译。这种部分格式在不同版本的 Angular 之间是稳定的，因此可以安全地发布到 npm。这种格式的代码在应用程序构建期间会使用相同版本的 Angular 编译器进行处理，以确保应用程序及其所有库使用的是同一个版本的 Angular
- 如果要发布到 npm，请避免使用完全 Ivy 代码来编译库，因为生成的 Ivy 指令不属于 Angular 公共 API 的一部分，因此在补丁版本之间可能会有所不同
- 如果你以前从未在 npm 中发布过软件包，则必须创建一个用户帐户。在[发布 npm 程序包](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)中了解更多信息
  
[⬆ back to top](#top)

### 在 Angular CLI 之外使用部分 Ivy 代码

- 应用将 npm 中的许多 Angular 库安装到其 ​node_modules ​目录中。但是，这些库中的代码不能与已编译的应用直接捆绑在一起，因为它尚未完全编译。要完成编译，可以使用 Angular 链接器
- 对于不使用 Angular CLI 的应用程序，此链接器可用作 Babel 插件。该插件要从 ​@angular/compiler-cli/linker/babel​ 导入
- Angular 链接器的 Babel 插件支持构建缓存，这意味着链接器只需一次处理库，而与其他 npm 操作无关
- 下面的例子借助 babel-loader 把此链接器注册为 Babel 插件，从而将此插件集成到自定义 Webpack 构建中

```javascript
import linkerPlugin from '@angular/compiler-cli/linker/babel';
export default {
  // ...
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [linkerPlugin],
            compact: false,
            cacheDirectory: true,
          }
        }
      }
    ]
  }
  // ...
}
```
  
[⬆ back to top](#top)

> References
- [官方教程](https://angular.io/guide/creating-libraries)
- [Angular 创建库](https://www.w3cschool.cn/angular13/angular13-pvc13p71.html)
