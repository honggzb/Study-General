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

## Creating Debug Configuration - Debugger for Chrome

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
