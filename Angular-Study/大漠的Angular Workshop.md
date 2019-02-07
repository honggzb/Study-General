[大漠的Angular Workshop](#top)

- [Angular核心概念](#angular%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5)
- [UI libraries](#ui-libraries)
- [Sample](#sample)
- [tips](#tips)
    - [去除app前缀](#%E5%8E%BB%E9%99%A4app%E5%89%8D%E7%BC%80)
    - [angular-cli command](#angular-cli-command)
    - [shell command](#shell-command)

## Angular核心概念

**依赖注入**

- 每个html标签上面都会有一个注射器实例
- 注射是通过constructor进行的
- @component是@injectable的子类
- https://github.com/modern-javascript/angular2-data-flow
- 组件树生成工具Augury
- [Dependency Injection in Angular 1 and Angular 2.x](https://vsavkin.com/dependency-injection-in-angular-1-and-angular-2-d69589979c18)

**数据绑定**

- [ANGULAR CHANGE DETECTION EXPLAINED](https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html)
- [Angular 2, 4 — Visualizing Change Detection (Default vs OnPush)](https://hackernoon.com/angular-2-4-visualizing-change-detection-default-vs-onpush-3d7ed1f69f8e)
- [Change And Its Detection In JavaScript Frameworks](http://teropa.info/blog/2015/03/02/change-and-its-detection-in-javascript-frameworks.html)
- [Change Detection in Angular](https://vsavkin.com/change-detection-in-angular-2-4f216b855d4c)

**Change dectection- default vs onPush**

- 默认情况下，Angular会刷新所有节点
    - 也就是说，无论哪个层级上的节点方式了变化，整个组件树都会被检查一次。简单地说：整个组件树里面所有组件的钩子全部都会被执行一次。
    - 如果组件结构比较简单，这样没有问题。但是对于组件结构极其复杂的应用来说，就会成为性能瓶颈。
    - 实例代码：https://embed.plnkr.co/mx3ZnfhfUtQECb4av3MP/
- 在OnPush策略下，只会检测发生了变化的节点
    - 实例代码：https://embed.plnkr.co/qvQIkHaoN51AdbzwGK81/

### UI libraries组件库类

- [PrimeNG](https://www.primefaces.org/primeng/#/): 目前市面上最完善的开源Angular组件库
- [NG-Zorro](https://github.com/NG-ZORRO/ng-zorro-antd)： 阿里云Angular组件库Zorro
- [Jigsaw](https://github.com/rdkmaster/jigsaw)：   来自ZTE中兴通讯的开源组件库Jigsaw（七巧板）
- [Angular-material](https://github.com/angular/material2): 目前（2017-10）一共规划了38个组件
- [Ionic](https://ionic.io/)，专门为移动端打造的组件库，自带周边工具，生态很完善。
- [Element-Angular](https://element-angular.faas.ele.me/guide/install) ，作者来自饿了么团队。
- [Clarity](https://vmware.github.io/clarity/) ，来自Vmware团队。 
- [ng2-admin](https://github.com/akveo/ng2-admin):一个非常完整的Angular新版本模板项目，项目里面有在线演示链接。
- [KendoUI for Angular](http://www.telerik.com/kendo-angular-ui/) ，Telerik的这套组件库的特色是组件的功能比较强大，尤其是Grid，做得非常强，这套组件库是收费的。

### 开源项目类

- [JHipster](https://www.jhipster.tech/)-一个集成了SpringMVC的开源项目，从前端到后端都集成好的
- [NiceFish-系列教学项目](https://gitee.com/mumu-osc/NiceFish), 这是一个系列项目，全面演示了Angular最新版本的各种用法，从桌面端到移动端都有demo
- 一款基于Ionic3的医院挂号系统：https://github.com/stewchicken/hospital-booking
- 一款版聊系统，Angular+SocketIO：http://www.drrr.website:5000/login

### 源类

- [AngularDoc-查看angular工具](https://angulardoc.github.io/#/products) 
- [TypeScript官方网站](http://www.typescriptlang.org/)
- [Angular官方网站](www.angular.io)
- [Angular官方Blog](https://blog.angular.io/)
- [Victor Savkin的Blog](https://vsavkin.com/)一定要看的，他是Router模块的作者，Blog上有很多优质内容

## Angular模板引擎

- 插值语法和表达式 
- 在模板内定义局部变量: `<input #heroInput>`
- 绑定
    - 值绑定    `[ ]`, `<img [src]="imgSrc" />`
    - 事件绑定  `( )`, `<button (click)="btnClick($event)"></button>`
    - 双向绑定  `[()]`
- 内置结构型指令用法：`*ngIf`、`*ngFor`、 `ngSwitch`
- 内置属性型指令用法：`NgClass`、`NgStyle`、`NgModel-另一种双向绑定` 
- 小工具：
    - **管道**:   `{{ currenTime | date: 'yyyy-mm-dd HH:mm:ss' }}`
      - 管道可级联
    - **安全导航**:  `{{ currentValue?.name }}`
    - 非空断言:   

[back to top](#top)

## 组件间通讯

**组件是带有视图的指令** - Angular新版本中指令是不能带有视图的

![](https://i.imgur.com/1gJAJjA.png)

- 父子组件之间： @input\@output\模板变量\@viewChild
- 非父子组件之间： service\localstorage\Cookie
- 还可利用session、路由参数来进行通讯

### 父子组件

- 父组件可直接调用子组件的方法
- 父组件可直接设置子组件属性的值

```html
<div class="panel panel-primary">
    <div class="panel-heading">第一种：父子组件之间通讯</div>
    <div class="panel-body">
        <child #child (follow)="doSomething()" panelTitle="一个新的标题1111"></child>
        <button (click)="child.childFn()" class="btn btn-success">调用子组件方法</button>
    </div>
</div>
<script>
export class ParentAndChildComponent implements OnInit {
  @ViewChild(ChildComponent)
  private childComponent: ChildComponent;
  constructor() { }
  ngOnInit() {}
  ngAfterViewInit() {
    //this.childComponent.childFn();
  }
  public doSomething():void{
    alert("收到了子组件的自定义事件！");
  }
}
</script>
<!--子组件  -->
<div class="panel panel-primary">
  <div class="panel-heading">{{panelTitle}}</div>
  <div class="panel-body">
    <button (click)="emitAnEvent($event)" class="btn btn-success">触发一个事件</button>
  </div>
</div>
<script>
export class ChildComponent implements OnInit {
  private _panelTitle:string="我是子组件";
  @Input()
  set panelTitle(panelTitle:string){
    this._panelTitle="【"+panelTitle+"】";
  }
  get panelTitle():string{
    return this._panelTitle;
  }
  @Output()
  public follow=new EventEmitter<string>();
  constructor() { }
  ngOnInit() { }
  public emitAnEvent(event):void{
    this.follow.emit("follow");
  }
  public childFn():void{
    console.log("子组件的名字是>"+this.panelTitle);
  }
}
</script>
```

### 兄弟组件

利用event-bus.service来进行通信

```html
<div class="panel panel-primary">
  <div class="panel-heading">第二种：没有父子关系的组件间通讯</div>
  <div class="panel-body">
    <child-1></child-1>
    <child-2></child-2>
  </div>
</div>
<script>
//event-bus.service.ts , 用来充当事件总线的Service
@Injectable()
export class EventBusService {
  public eventBus:Subject<string> = new Subject<string>();
  constructor() { }
}
</script>
<!--  -->
<div class="panel panel-primary">
    <div class="panel-heading">第一个组件</div>
    <div class="panel-body">
      <button (click)="triggerEventBus()" class="btn btn-success">触发一个事件</button>
    </div>
  </div>
<script>
//child 1
export class Child1Component implements OnInit {
  constructor(public eventBusService:EventBusService) { }
  ngOnInit() {}
  public triggerEventBus():void{
    this.eventBusService.eventBus.next("第一个组件触发的事件");
  }
}
</script>
<!--  -->
<div class="panel panel-primary">
    <div class="panel-heading">第二个组件</div>
    <div class="panel-body">
        <p *ngFor="let event of events">{{event}}</p>
    </div>
  </div>
<script>
//child 2
export class Child2Component implements OnInit {
  public events:Array<any>=[];
  constructor(public eventBusService:EventBusService) {}
  ngOnInit() {
    this.eventBusService.eventBus.subscribe((value)=>{
      this.events.push(value+"-"+new Date());
    });
  }
}
</script>
```

[back to top](#top)

## 生命周期钩子'

![](https://i.imgur.com/vzV2pfG.png)

- ngOnChanges
  - @Input属性发生变化的时候被调用
  - 非@Input属性改变不会调用ngOnChanges
- ngDoCheck
  - 每发生一次变更检测就会被调用一次！
  - 谁在负责触发变更呢？（Zones，它拦截了所有回调：定时器、事件、Ajax）
  - 不要在ngDoCheck里面做非常消耗性能的事情，会卡死的
  - https://pascalprecht.github.io/slides/angular-2-change-detection-explained/#/
- ngAfterContentInit/ngAfterContentChecked
  - 投影内容装配完成的时候整个模板还没装配完
  - 所以，在这两个钩子里面可以修改被绑定的属性
- ngAfterContentInit/ngAfterContentChecked
- ngAfterViewInit/ngAfterViewChecked
  - 在组件视图装配的时候调用这两个钩子
  - 视图的装配过程是从子组件向父组件依次迚行的
  - 在这两个钩子里面不能再修改组件上被绑定的属性，否则Angular会抛异常
  - ngAfterViewChecked可能会被调用非常多次，如果没有使用OnPush策略，所有实现了这个钩子的组件都会被调用，千万不要在这两个钩子里面做很复杂的事情，会卡死的！
- ngAfterViewInit/ngAfterViewChecked

[back to top](#top)

## angular动效

- 规范： https://drafts.csswg.org/web-animations/
- 不在core中，必须import
- https://jiayihu.github.io/ng-animate/
- angular动效的构成：  `inactive <==> active `

```javascript
state('inactive', style({
  backgroud: '#eee',
  transform: 'scale(1)'
})),
state('active', style({
  backgroud: '#cfd8dc',
  transform: 'scale(1.1)'
})),
//
transition('inactive => active', animate('100ms ease-in')),
transition('active => inactive', animate('100ms ease-out'))
```

## 动态组件

```javascript
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
@Component({
  selector: 'dynamic-comp',
  templateUrl: './dynamic-comp.component.html',
  styleUrls: ['./dynamic-comp.component.scss']
})
export class DynamicCompComponent implements OnInit {
  //这里引用模板里面定义的dyncomp容器标签
  @ViewChild("dyncomp", { read: ViewContainerRef })
  dyncomp: ViewContainerRef;
  comp1: ComponentRef<Child11Component>;
  comp2: ComponentRef<Child11Component>;

  constructor(private resolver: ComponentFactoryResolver) {}
  ngOnInit() {}
  ngAfterContentInit() {
    console.log("动态创建组件的实例...");
    const childComp = this.resolver.resolveComponentFactory(Child11Component);
    this.comp1 = this.dyncomp.createComponent(childComp);
    this.comp1.instance.title = "111";
    //subscribe method
    this.comp1.instance.btnClick.subscribe((param) => {
      console.log("--->" + param);
    });

    //可以创建多个组件实例出来
    // let temp5 = this.dyncomp.createComponent(childComp, 0);
    // temp5.instance.title = "第6个动态子组件";
    /**
     * createComponent方法可以调用很多次，会动态创建出多个组件实例
     * 方法有第二个参数，表示组件渲染的顺序
     */
    this.comp2 = this.dyncomp.createComponent(childComp);
    this.comp2.instance.title = "第二个子组件";
  }
  public destoryChild(): void {
    this.comp1.destroy();
    this.comp2.destroy();
  }
}
//child11
import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'child11',
  templateUrl: './child11.component.html',
  styleUrls: ['./child11.component.scss']
})
export class Child11Component implements OnInit {
  @Input()
  public title:string="默认的标题";
  @Output()
  btnClick:EventEmitter<string>=new EventEmitter<string>();
  constructor() { }
  ngOnInit() {}
  public triggerEvent():void{
    this.btnClick.emit("第一个子组件的点击事件...");
  }
}
```

[back to top](#top)

## Angular渲染组件的3种方式和影子DOM

- emulate-mode: `ViewEncapsulation.Emulated`   - 默认模式
- none-mode: `ViewEncapsulation.None`
- shadow-dom-mode: `ViewEncapsulation.Native`

```javascript
@Component({
  selector: 'shadow-dom-mode',
  encapsulation: ViewEncapsulation.Native,    //turn on shadow DOM
  templateUrl: './shadow-dom-mode.component.html',
  styleUrls: ['./shadow-dom-mode.component.scss']
})
export class ShadowDomModeComponent implements OnInit {
  constructor() { }
  ngOnInit() {}
}
```
 
[back to top](#top)

## 内容投影ng-content

```html
<!-- child-two.component.html -->
<div class="panel panel-primary">
    <div class="panel-heading">
        <ng-content select="h3"></ng-content>
    </div>
    <div class="panel-body">
        <ng-content select="test-child-three"></ng-content>
    </div>
    <div class="panel-footer">
        <ng-content select="p"></ng-content>
    </div>
</div>
<!-- child-three.component.html -->
<div class="panel panel-primary">
  <div class="panel-heading">
    这是被投影的自定义组件
  </div>
  <div class="panel-body">
    <button class="btn btn-success" (click)="sayHello()">sayhello</button>
  </div>
</div>
 <!-- ng-content.component.html 注意： 在最外层调用 sayhello-->
<div class="panel panel-primary">
  <div class="panel-heading">父组件</div>
  <div class="panel-body">
    <test-child-two>
      <h3>这是父层投影进来的内容</h3>
      <test-child-three (sayhello)="doSomething()"></test-child-three>
      <p>这是底部内容</p>
    </test-child-two>
  </div>
</div>
```

- 用`@ContentChild`操作投影的内容
- 用`@ContentChildren`批量操作多块投影内容
- 用`@ViewChild`操作视图子节点
- 用`@ViewChildren`批量操作多个视图子节点
- ngAfterContentInit/ngAfterContentChecked在ngAfterViewInit/ngAfterViewChecked之前执行
 
[back to top](#top)

## 指令

### 组件与指令之间的关系

- 组件继承指令， 组件实际上是指令的特殊化
![](https://i.imgur.com/C7MbnOB.png)
  - 组件
  - 属性型指令
  - 结构型指令

[80行代码为你详解Angular版下拉菜单的实现细节](http://www.ngfans.net/topic/40/post)

### 指令之间交互
 
[back to top](#top)

## 模块和路由

### 模块

- Angular的模块是用来组织业务的
- 每个应用至少有一个根模块
- 每个组件必须属于一个模块，而且只能属于一个模块
- 模块是`@angular/cli`打包的最小单位
- 模块也是Router异步加载时的最小单位
- Angular框架自身的重要模块
![](https://i.imgur.com/Fi8eRke.png)

http://git.oschina.net/mumu-osc/learn-module

### 路由的基本用法

https://gitee.com/learn-angular-series/learn-router

- lazy load
- nest
- shared
- router 监听路由事件
  - `router.events.suscribe((event) => {  })`
- 路由参数传递
  - 单个参数
    - queryParams:   `this.activeRoute.queryParams.subscribe(queryParam) => console.log(queryParam))`
    - params:        `this.activeRoute.params.subscribe()`
  - 矩阵式参数：`<a [routerLink]= "['jokes', {id:111, name: 'demo'}]"></a>`, `localhost:4200/jokes;id=111;name=demo`
- 代码触发路由导航
  - `this.router.navigate(["/jokes"], {queryParams: {page: 1, name: 222}})`
- preload-module: preloadStrategy

## 表单与数据校验niceFish

- 模板驱动型表单： login
- 响应式表单
- 动态表单： 用户个人设置
- 自定义数据校验：equalValidate <- 

## RxJS

![](https://i.imgur.com/20RApO2.png)
![](https://i.imgur.com/d8TJqjx.png)

```javascript
let stream1$ = new Observable(observer => {
  let timeout = setTimeout(() => {
    observer.next('observable timeout'/;)
  },2000);
  return () => {
    clearTimeout(timeout);
  }
});
let disposable = stream1$.subscribe(value => console.log(value));
// 1) observable可以中途取消的， promise不能
// 2) observable可以中可以连续发射很多值， promise只能发射一个值
// 3) observable有多种工具函数
```

- https://buctwbzs.gitbooks.io/rxjs/content/
- http://reactivex.io/
- [Introduction to RxJS Observables and Angular](https://coryrylan.com/blog/introduction-to-rxjs-observables-and-angular)
- [RxJS operator animation](https://github.com/moroshko/rxviz)

## 两个完整的案例（OpenWMS和基于Ionic的PWA）

- Fish
- [Angular+PWA开发跨平台的应用从未如此简单](http://www.ngfans.net/topic/211/post)
  - service-worker.js
  - manifest

第18小节：整体答疑环节

> References
- https://gitbook.cn/gitchat/column/59dae2081e6d652a5a9c3603
- http://www.ngfans.net/topic/242/post
- [大漠的代码仓库](https://gitee.com/mumu-osc)
- [AngularJS实战](http://www.imooc.com/learn/156)
- [Angular开发者论坛](http://www.ngfans.net/)

## tips

### 去除app前缀

在angular.json中去除`"prefix":""`

### angular-cli command

```shell
ng build --prod   #自动AOT
ng build --prod --source-map
```

### shell command

```shell
rmdir foldername /Q /S
```

