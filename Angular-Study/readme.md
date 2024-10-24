|Observable|Promise|
|---|---|
|Emit multiple values over a period of time|Emit a single value at a time|
|Are Lazy<br>they're not executed until using subscribe()|Are not lazy<br>execute immediately after creation|
|Have subscriptions that are cancellable using unsubscribe(),<br> which stops the listener from receiving further values|are not cancellable|
|provide the map for `forEach`, `filter`, `reduce`, `retry`, `retryWhen` operators|don't provide any operations|
|Deliver error to the subscribers|Push errors to the child promises|

|Operations|Observable|Promise|
|---|---|---|
|Creation|`const obs = new Observable((observer) =>{observer.next(7)});`|`const promise = new Promise(() => { resolve(7);});`|
|Transform|`obs.pipe(map(value) => value*7);`|`promise.then(value => value*7);`|
|subscribe|`const sub = obs.subscribe((value) => console.log(value))`|`promise.then((value)=>console.log(value))`|
|Unsubscribe|`sub.unsubscribe()`|can't unsubscribe|
```
├── 📂Angular-Study
│   ├── 📂Angular Advanced学习笔记/
│   │   ├── 📂sample-codes/
│   │   ├── 📄Angular Advanced学习笔记之--Micro Frontend.md
│   │   ├── 📄Angular Advanced学习笔记之--Service Workers.md
│   │   ├── 📄Angular Advanced学习笔记之--web workers.md
│   │   └── 📄
│   ├── 📂Angular Architecture
│   │   ├── 📂Angular Architecture- Dan Wahlin
│   │   │   ├── 📂Angular-JumpStart-master/
│   │   │   ├── 📂creating-an-observable-service/
│   │   │   ├── 📂demos/
│   │   │   ├── 📂routing-guards-and-preload-strategies/
│   │   │   ├── 📂rxjs-subjects/
│   │   │   ├── 📂shared-library-example/
│   │   │   ├── 📂state-management/
│   │   │   └── 📄readme.md
│   │   ├── 📄Angular PWA架构
│   │   ├── 📄Angular Scalable Architecture-The PRPL Pattern.md
│   │   ├── 📄Angular优化策略.md
│   │   ├── 📄metholody for project management.md
│   │   └── 📄从应用程序的角度探讨Angular的性能优化.md
│   ├── 📂Angular-Upgrade/
│   │   ├── 📄Angular 10 New Features.md
│   │   ├── 📄Angular 12 New Features.md
│   │   ├── 📄Angular 13 to Angular 14.md
│   │   ├── 📄Angular 14 New Features.md       -standalone component
│   │   ├── 📄Angular 14 to Angular 15.md
│   │   ├── 📄Angular 17 New Features.md       -defering view, new Dev tools, new build in statement
│   │   ├── 📄Angular 8 to Angular 9.md
│   │   ├── 📄Angular 9 to Angular 10.md
│   │   ├── 📄Angular Material每个版本的不同.md
│   │   ├── 📄angular-downgrade.md
│   │   └── 📄Angular Update Note.md
│   ├── 📂Angular-material/
│   │   ├── 📂dialog/
│   │   │    ├── 📄AngularMaterial-dialog.md 
│   │   │    └── 📦dialog.rar 
│   │   ├── 📂material++flexLayout+ngrx
│   │   │    ├── 📄01-optimizations/ 
│   │   │    ├── 📄02-ngrx/ 
│   │   │    └── 
│   │   ├── 📄Angular Material学习笔记之datepicker自定义日期格式
│   │   ├── 📄angular-material-datepicker-format-1.jpg
│   │   ├── 📄angular-material-datepicker-format.zip
│   │   └──
│   ├── 📂Angular17+学习笔记
│   │   ├── 📂codes/
│   │   │     ├── 📂Loading Indicator/
│   │   │     └── 📂signal/
│   │   ├── 📄Angular学习笔记17--1-Loading Indicator.md
│   │   ├── 📄Angular学习笔记17--2-Localization.md
│   │   ├──  📄Angular学习笔记17--3-Signal.md
│   │   └── 📄Angular学习笔记17--5-Angular Performance playbook.md
│   ├── 📂Angular学习笔记/
│   │   ├── 📂sample-project/
│   │   │     ├── 📄ng-interceptors-main.zip    -Angular学习笔记之--HttpInterceptor拦截器.md
│   │   │     └── 
│   │   ├── 📄Angular学习笔记之--Animation.md
│   │   ├── 📄Angular学习笔记之--DI decorators.md
│   │   ├── 📄Angular学习笔记之--DI依赖注入.md
│   │   ├── 📄Angular学习笔记之--Dynamic Importing Large Libraries.md
│   │   ├── 📄Angular学习笔记之--Dynamic components.md
│   │   ├── 📄Angular学习笔记之--Loading Interceptor + ngx-spinner.md
│   │   ├── 📄Angular学习笔记之--HttpInterceptor拦截器.md
│   │   ├── 📄Angular学习笔记之--Nested Component.md
│   │   ├── 📄Angular学习笔记之--Pipe.md
│   │   ├── 📄Angular学习笔记之--directive指令.md
│   │   ├── 📄Angular学习笔记之--lazy loading-angular15.md          #useful
│   │   ├── 📄Angular学习笔记之--lazy loading-使用angular-cli.md   #old version
│   │   ├── 📄Angular学习笔记之--ngClass例子.md
│   │   ├── 📄Angular学习笔记之--styling in Angular.md
│   │   ├── 📄Angular学习笔记之--two-way binding.md
│   │   ├── 📄Angular学习笔记之--使用ng2-file-upload文件上传.md
│   │   ├── 📄Angular学习笔记之--包格式.md
│   │   ├── 📄Angular学习笔记之--变化检测.md
│   │   ├── 📄Angular学习笔记之--性能优化之Compression.md
│   │   ├── 📄Angular学习笔记之--Angular学习笔记之--数据实时变化.md
│   │   ├── 📄Angular学习笔记之--数据绑定、响应式编程.md
│   │   ├── 📄Angular学习笔记之--模板ng-template, ng-content, ng-container and ngTemplateOutlet.md
│   │   ├── 📄ngular学习笔记之--父子组件生命周期钩子(lifecycle hooks).md
│   │   ├── 📄Angular学习笔记之--组件间通信方式.md
│   │   ├── 📄Angular学习笔记之--集成三方UI框架.md
│   │   └── 
│   ├── 📂Build Angular library/
│   │   ├── 📂au-input/                                        ##带有图标的输入框input
│   │   └──
│   ├── 📂Configuration/
│   │   ├── 📂angular-itself-multi-config/
│   │   │    ├── 📄AngularMaterial-dialog.md 
│   │   │    └── 📦dialog.rar   
│   │   ├── 📄aot-config.md
│   │   ├── 📄jit-vs-aot.jpeg
│   │   └──
│   ├── 📂Migration/
│   │   ├── 📂Migration from AngularJS 1.x to Angular 2+- Joe Eames/
│   │   │   │   ├── 📂codeFinished/
│   │   │   ├── 📂codeInit/
│   │   │   ├── 📂codePreparedFinished/
│   │   │   ├── 📦Migration from AngularJS 1.x to Angular 2+.zip
│   │   │   ├── 📦Preparing for Migration from AngularJS (1.x) to Angular (2+).zip
│   │   │   └── 📄prepare.md
│   │   ├── 📄using Angular in AngularJS.md
│   │   └── 📄Upgrade AngularJS to Angular-Dual Booting.md
│   ├── 📂Mockup-server/
│   │   ├── 📄angular-in-memory-web-api.md
│   │   ├── 📄liverload-mockup+gulp.md
│   │   ├── 📄mocking-backend -API.md
│   │   └── 📄node+express创建服务器.md
│   ├── 📂NgRx
│   │   ├── 📂Angular NgRx Getting started/
│   │   │     ├── 📂Demo-1/
│   │   │     ├── 📂Demo-2/
│   │   │     ├── 📂Demo-3/
│   │   │     ├── 📂Demo-initial/
│   │   │     └── project.md
│   │   ├── 📂angular2-redux-Hendrik Swanepoel/
│   │   │   ├── 📂projectSample/
│   │   │   └── 📄readme.md
│   │   ├── 📄Tips-use-rxjs-in-Angular.md
│   │   └──
│   ├── 📂RxJs
│   │   ├── 📂RxJS in Angular-Reactive Development-Deborah Kurata/
│   │   │   └── 📄readme.md
│   │   ├── 📄Observable之Subject.md
│   │   ├── 📄RxJS笔记-Reactive Extensions for JavaScript (RxJS).md
│   │   ├── 📄RxJS笔记之Subject.md
│   │   ├── 📄RxJS笔记之switchMap, concatMap, mergeMap和exhaustMap.md
│   │   ├── 📄SwitchMap之call another observable with parameter
│   │   ├── 📄避免多次调用之Rxjs subject to avoid multiple calling.md
│   │   └── 📄避免多次调用之share+shareReplay.md
│   ├── 📂Sample-Project+course/
│   │   ├── 📂Angular Fundamentals- Jim Cooper/
│   │   │   ├── 📂myEventFundamentals/ 
│   │   │   ├── 📄Angular_Content_Projection_Guide.pdf
│   │   │   └── 📦ng-fundamentals.zip
│   │   ├── 📂Angular Http Communication- Brice Wilson/
│   │   ├── 📂Angular Reactive Forms-Deborah Kurata/
│   │   │   ├── 📂Demo0/ 
│   │   │   ├── 📂Demo1/
│   │   │   └── 📄summary.pdf
│   │   ├── 📂Angular Routing- Deborah Kurata/
│   │   │   └── 📂Angular component commnication- Deborah Kurata/
│   │   ├── 📂Building Your First App with Spring Boot and Angular- Dan Bunker/
│   │   ├── 📂DaMo-Angular Workshop/
│   │   ├── 📂communication/
│   │   │   ├── 📂brother/ 
│   │   │   ├── 📂local-storage/
│   │   │   ├── 📂parent-and-child/
│   │   │   ├── 📄app.module.ts
│   │   │   └── 
│   │   ├── 📄Angular打造股票管理网站.md
│   │   ├── 📄可复用的全局设置- Paul D. Sheriff.md
│   │   ├── 📄大漠的Angular Workshop.md
│   │   └── 
│   ├── 📂Sample-general/
│   │   ├── 📂Drag-Drop-Dashboard/
│   │   │    ├── 📂dashboard-sample1/
│   │   │    ├── 📂dashboard-sample2/
│   │   │    └── 📂dashboard-sample3/
│   │   ├── 📂angular-bootstrap/
│   │   │    ├── 📄use user-defined directive in Tooltips.md
│   │   │    └── 
│   │   ├── 📂directive/
│   │   │    ├── 📄input-radio.md
│   │   │    └── 
│   │   ├── 📂elements/
│   │   │    ├── 📄project/
│   │   │    └── 📄Angular学习笔记之elements.md
│   │   ├── 📂ngTemplete+ng-content/
│   │   │    ├── 📂modal/
│   │   │    └── 📂tabs/
│   │   ├── 📄Angular 4学习- Angular 4.0从入门到实战 打造股票管理网站.md
│   │   ├── 📄Angular 4学习-todo_list.md
│   │   ├── 📄Angular Loading Spinner.md
│   │   ├── 📄Download file using file-save with Angular.md
│   │   ├── 📄add-loading-screen.md
│   │   ├── 📄auction-Angular 4.0从入门到实战-打造股票管理网站+mockServer+websock.rar
│   │   ├── 📄auction-Angular 4.0从入门到实战-打造股票管理网站+mockServer.rar
│   │   ├── 📄todo-app.rar
│   │   ├── 📄案例之星级评价.md
│   │   └──  
│   ├── 📂Testing/
│   │   ├── 📂E2E Test/ 
│   │   │   ├── 📂Cucumber+AngularCLI project/                                         ## angular8 CLI project
│   │   │   ├── 📂Learn Protractor(Angular Testing) from scratch+Framework - Udemy/    ## General non-angularCLI8 project
│   │   │   ├── 📦Angular 2_WithScreenshot.zip                                         ## General non-angularCLI2 project
│   │   │   ├── 📄Cucumber+Protractor Tidbits.md
│   │   │   ├── 📄Cucumber and Protractor in Angular CLI project.md
│   │   │   ├── 📄Jasmine and Protractor in Angular CLI project.md
│   │   │   ├── 📄protractor-cucumber.conf.js
│   │   │   ├── 📄protractor-jasmine.conf.js
│   │   │   ├── 📄sconfig.sample.js
│   │   │   └── 
│   │   ├── 📂Unit-Test/
│   │   │   ├── 📄Unit Testing in Angular Course -Joe Eames/
│   │   │   ├── 📄NgRx-test-sample.md
│   │   │   ├── 📄ng-mocks学习笔记.md
│   │   │   ├── 📄wallaby-setup.md
│   │   │   ├── 📄unit testing for Angular $localize.md
│   │   │   ├── 📄unit testing for Angular services with dependencies.md
│   │   │   ├── 📄unit testing for static property and method.md
│   │   │   └── 
│   │   ├── 📄Unit test-Karma performance improve.md
│   │   ├── 📄principle of unit testing.md
│   │   └──
│   ├── 📂redux/
│   │   ├── 📄redux-angular.gif
│   │   ├── 📄redux.png
│   │   └── 📄redux.doc
│   ├── 📂some-tip/
│   │   ├── 📄AutomumericSetting for Currency.md                                             ## Automumeric librery
│   │   ├── 📄Create Prevent closing of modal Dialog in Angular Dialog component.md
│   │   └──
│   ├── 📄Angular CLI的使用(new).md     # useful
│   ├── 📄Angular_CLI的使用.md           
│   ├── 📄Angular2+Accessibility.md
│   ├── 📄Angular 2,4 + google map      # Google map在angular>2中的应用
│   ├── 📄Angular_Content_Projection_Guide.pdf
│   ├── 📄Angular中Error汇总.md
│   ├── 📄Angular响应式表单之更新表单的值.md
│   ├── 📄Angular打造股票管理网站.md      #useful
│   ├── 📄Angular系列之Decorators.md
│   ├── 📄Angular系列之变化检测.md
│   ├── 📄Dynamically add version number to application based on grunt
│   ├── 📄change-detection-default.gif
│   ├── 📄change-detection-onpush.gif
│   └── 📄大漠的Angular Workshop.md
```

## resource

- [angular style guide](https://angular.io/guide/styleguide)
- https://blog.angular.io/
- [Angular in depth by ag-grid](https://blog.angularindepth.com/)
- https://github.com/PatrickJS/awesome-angular
- [angular style guide](https://angular.io/guide/styleguide)
- [Angular中文文档](https://angular.cn/)
- [Angular 4.x 修仙之路](https://segmentfault.com/a/1190000008754631)
- [Angular4快速入门](https://blog.csdn.net/column/details/17833.html)
- [仿简书nodejs+express+mongodb+vue2+angular4+爬虫](https://github.com/jiayisheji/jianshu)
- [Angular中文社区](http://angular-china.org)
- [Angular中文社区](http://www.iphone3d.cn/)
- [sitepoint angular文章](https://www.sitepoint.com/?s=angular)
- http://angular2-first-look.azurewebsites.net/

## third library
- [Angular Material](https://material.angular.io/)
- [阿里的Angular组件库（ng-zorro-antd）](https://github.com/NG-ZORRO/ng-zorro-antd):  Angular的优秀国内UI组件库
- [Angular 4入门教程系列：15：NG-ZORRO的使用方式](https://blog.csdn.net/liumiaocn/article/details/78526421)
  - 组件和指令都是以nz-打头，比如按钮的nz-button
  - 组件和指令的属性都是nz打头其后驼峰命名，比如nzSize
  - 栅格划为24等分
