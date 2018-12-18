- [Angular代码规范-en](http://bguiz.github.io/js-standards/angularjs/single-responsibility/)
- [Angular代码规范-中文](https://www.reqianduan.com/1722.html)

```
├── AngularJS-study
│
│   ├──  angular-translate-study/
│   │    ├── simple-sample /
│   │    └── readme.md
│   │
│   ├──  angular-material-study /
│   │    ├── mdSwitch.md
│   │    ├── mdToast-study.md
│   │    └── 
│   │
│   ├──  lib /
│   │    ├── angular /
│   │    └── bootstraps3 /
│   │
│   ├──  plugin /
│   │    ├── agGrid /
│   │    │     ├──  Group-rowGroup-sample.html
│   │    │     ├──  Group-sample.html
│   │    │     ├──  Simple-sample.html
│   │    │     ├──  column-fixed-sample.html
│   │    │     ├──  column-type+group-sample.html
│   │    │     ├──  external-filter-sample.html
│   │    │     ├──  filter-sample.html
│   │    │     ├──  header-Template-sample.html
│   │    │     ├──  sorting-sample.html
│   │    │     ├──  style-cell-sample.html
│   │    │     └──  style-row-sample.html
│   │    ├── ngInfiniteScroll的使用方法- 滚动触底加载.md
│   │    └── 
│   │
│   ├──  public /    #学习案例
│   │    ├── 001-controller.html 
│   │    ├── 002-controller-multi.html 
│   │    ├── 003-ng-bind.html 
│   │    ├── 004-$scope中的$apply.html 
│   │    ├── 005-$scope中的$watch.html 
│   │    ├── 006-cart.html 
│   │    ├── 007-module.html 
│   │    ├── 008-provide.provide.html 
│   │    ├── 009-provide.factory.html 
│   │    ├── 010-provide.shareDate.in.multi.controller.html 
│   │    ├── 011-filter.html 
│   │    ├── 012-filter-usr-defined.html 
│   │    ├── 013-controller.DI.html 
│   │    ├── 014-build-in.directive.html 
│   │    ├── 015-self-defined.directive-restrict.html 
│   │    ├── 016-self-defined.directive-transclude-priority-terminal.html 
│   │    ├── 017-self-defined.directive-compile-link.html 
│   │    ├── 018-self-defined.directive-controller.html 
│   │    ├── 019-self-defined.directive-scope.html 
│   │    ├── 020-self-defined.directive-accordion.html 
│   │    ├── 021-module-constant-value-run.html 
│   │    ├── 022-form.html 
│   │    ├── 023-form-user-defined.html 
│   │    ├── kittercupCollapse.html 
│   │    └── other.html
│   │ 
│   ├──  Sample /
│   │    ├── directive /
│   │    │    ├── 滚屏加载.html
│   │    │    ├── AngularJS内置服务总览.md
│   │    │    ├── angular之ng-model-options指令.md
│   │    │    ├── angular之ng-options用法详解.md
│   │    │    ├── ng-class in AngularJS.md
│   │    │    ├── ng-repeat in AngularJS.md
│   │    │    ├── 自定义一个表格.js
│   │    │    └── 
│   │    └── service /
│   │         ├── AngularJs中$http再次封装.md
│   │         └──
│   │ 
│   ├──  ui-bootstrap-study
│   │    ├── typeahead /
│   │    └── ui-Bootstrap之Typeahead.md
│   │ 
│   ├── $timeout和$interval的用法.md
│   ├── $watch详解.md
│   ├── AngularJS+angularjs作用域的生命周期.md
│   ├── AngularJS学习之Cache-缓存.md
│   ├── AngularJS学习之Factory vs Service vs Provider.md
│   ├── AngularJS学习之directive详解.md
│   ├── AngularJS学习之表单验证.md
│   ├── AngularJS给动态生成的元素绑定事件.md
│   ├── Angularjs Controller间通信机制.md
│   ├── Angularjs directive通信案例.md
│   ├── Angularjs使用jQuery-jqLite.md
│   ├── Angularjs工具方法.md
│   ├── Angularjs的前端拦截器-interceptor.md
│   ├── Angular声明注入依赖的方法和自动化插件.md
│   ├── Smooth transition for scrolled view amd Modal.md
│   ├── UI-Router for AngularJS 1.x.md 
│   ├── angularJS-debug-skill.md 
│   ├── angularjs的directive和component的参数传递问题.md
│   ├── http拦截器介绍与使用.md
│   ├── resources.md
│   ├── tip.md
│   └── 常见问题和技巧.md
```

## Setup AngularJS Project in Visual Studio

- AngularJS Library:
    - angularjs.org
    - CDN: https://ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular.min.js
- http-server
  `npm i http-server --save`, `npm start`

- Plugin
    - Debugger for Chrome
    - Prettier Code Formatter
    - Angular Language Service
    - TS Lint {for typescript}

## Creating Debug Configuration for VS Code - Debugger for Chrome

**Debugger for Chrome in VS Code**

- install plugin: Debugger for Chrome
- open the debug panel: 'Ctrl+Shift+D'
- Click a gear icon -> choose chrome -> launch.json will show
- update the port from 8080 to 4200
- add a breakpoint inside of the component and run `ng serve`
- launch the debugger -> 'F5' / green arrow
- Refresh the page and you should hit your breakpoint

> References
> - [Using Angular in Visual Studio Code](https://code.visualstudio.com/docs/nodejs/angular-tutorial)
> - [AngularJS Tutorials-VS+Asp.net](http://www.tutorialsteacher.com/angularjs/angularjs-development-environment)

**Chrome Debugger extension**

1. ng-inspect for AngularJS
    - $s -> scope
    - $is -> isolateScope
    - $rs -> rootScope
    - $el -> jQuery element
    - $events -> the events associated with the jQuery element
    - $get function -> Services/Factories/Constants

## Angular in Visual Studio Code

- open Angular application in VS Code, open another terminal
    - `cd my-app`
    - `code .`
- IntelliSense  ->  hover mouse over text in the file
- Go to Definition -> F12
- Peek Definition  -> Ctrl+Shift+F12  <- 'Escape' to close the Peek window

------------

[angular.js中文教学视频教程](http://www.php.cn/course/644.html)

AngularJS的模块

- AngularJS本身的一个默认模块是ng，她提供了$http, $scope等服务
- AngularJS的服务是需要显式申明依赖（引入）关系的，让ng自动地做注入
- 第三方代码可以作为可复用的module打包到angularJS中
- 模块可以任何先后或并行的顺序加载（模块的本身本身是延迟的）
- 通过ng-app指定对应的模块应用启动, AngularJS中只能有一个ng-app

`angular.module(name[, requires], configFn);`

- ConfigFn 会在模块初始化时执行，可以在里面配置模块的服务
- configFn 参见 angular.config()

------------

> temparory

- [js高手之路]Node.js+jade+express+mongodb+mongoose+promise实现todolist](https://www.cnblogs.com/ghostwu/p/7565328.html)
- [https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd004]()
- [廖雪峰的官方网站-nodeJS](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434501245426ad4b91f2b880464ba876a8e3043fc8ef000)
- [Angular4 后台管理系统搭建](http://www.cnblogs.com/Vetkdf/p/7080893.html)
- [React 基础实例教程](https://www.cnblogs.com/imwtr/p/6278968.html)
- [移动端Web组件-Dialog对话框-video](https://www.imooc.com/learn/709)
- [Creating a Responsive Dashboard in Angular 5 From Scratch](https://medium.com/@nima_ap/creating-a-responsive-dashboard-in-angular-5-from-scratch-147f6a493d9e)
- [迁移到webpack4](https://blog.csdn.net/github_36487770/article/details/80228147#comments)
- [RxJS入门](https://blog.csdn.net/tianjun2012/article/details/51351823)
- https://rxjs-cn.github.io/rxjs5-ultimate-cn/content/recipes-infinte-scroll.html
- [A Simple React Router v4 Tutorial](https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf)
- [angularjs执行流程](https://www.cnblogs.com/Leo_wl/p/3771304.html)
- [AngularJS + Webpack Production Setup](https://www.cnblogs.com/Answer1215/p/4796048.html)


上学堂2018Web开发视频教程

```
1、链接: 点此下载 密码: e8s9     html css       https://pan.baidu.com/s/1P8FApoXxkTP5BcO4D5YTwQ
2、链接: 点此下载 密码: ey8e    javascript      https://pan.baidu.com/s/1t_XbllCOlpfuZ1_yY2gg9g
3、链接: 点此下载 密码: sayf    angular         https://pan.baidu.com/s/1FAWg6DR64o22pO1hItJS4g
4、链接: 点此下载 密码: avuw    react vue less  https://pan.baidu.com/s/1OO7n3r3jCVYpo-XaQwro2Q    null
5、链接: 点此下载 密码: vgdm    微信小程序      https://pan.baidu.com/s/1BsRxPLex4xTft3o9uc2FTg
```

2018年达内web开发视频教程

```
1、链接: 点此下载 密码: p4n6    https://pan.baidu.com/s/1JRX3MrAWsvj5KUh8CBj0Lw    jquery angular h5
2、链接: 点此下载 密码: uaae    https://pan.baidu.com/s/1Myxib4By_zTf2pSZEBO_DQ    vue angular 
3、链接: 点此下载 密码: vw7e    https://pan.baidu.com/s/1V-3IKLRJVF7SgDGolXzJzg
```

https://learn.utoronto.ca/courses-programs/business-professionals/certificates
https://learn.utoronto.ca/courses-programs/business-professionals/certificates/cyber-security-management
