[Angular学习笔记之--组件间通信方式](#top)

- [父组件 =\> 子组件](#父组件--子组件)
  - [setter](#setter)
  - [@ViewChild()](#viewchild)
  - [局部变量](#局部变量)
- [子组件 =\> 父组件](#子组件--父组件)
  - [@output()](#output)
- [sibling组件 =\> sibling组件](#sibling组件--sibling组件)
  - [使用service和RxJS的Subject实现组件间消息通信](#使用service和rxjs的subject实现组件间消息通信)
  - [复用service](#复用service)
  - [Output eventEmitter+Service](#output-eventemitterservice)
  - [路由参数](#路由参数)

---------------------------------------------------------------------

|父组件 => 子组件|子组件 => 父组件|sibling => sibling|
|---|---|---|
|输入属性`@Input`,通过属性绑定|输出属性`@Output`, 通过事件绑定，子组件可以发送事件给父组件，并传递数据||
|setters (本质上还是@input)|注入父组件||
|局部变量| | |
|`@ViewChild()`,`@ContentChild()` 装饰器直接访问子组件或模板中的元素| | |
|服务共享Service, 组件可以注入该服务来存储和获取数据|Service |Service |
|	RxJS `Subject` 和 `Observable`, 使用 RxJS 中的 `Subject` 和 `Observable` 来实现组件之间的消息传递, sibling => sibling|Observable |Observable |
|`localStorage`,`sessionStorage`|`localStorage`,`sessionStorage`|`localStorage`,`sessionStorage`|
|Angular 路由参数	, 通过路由参数在不同组件之间传递数据|路由参数|路由参数|
|使用 NgRx 状态管理库来实现更复杂的组件间通信和数据共享|NgRx|NgRx|

## 父组件 => 子组件

### setter

- setter 是拦截@input 属性,因为在组件通信的时候,常常需要对输入的属性处理下,就需要setter了,setter和getter常配套使用

```js
//
@Component({
 selector: 'app-parent',
 template: '<div>childText:<app-child [textContent] = "varString"></app-child></div>',
 styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
 varString: string;
 constructor() { }
 ngOnInit() {
  this.varString = '从父组件传过来的' ;
 }
}
//child.component.ts
// 1) using @Input()
import { Component, OnInit, Input } from '@angular/core';
@Component({
 selector: 'app-child',
 template: '<h1>{{textContent}}</h1>',
 styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
 @Input() public textContent: string ;
 constructor() { }
 ngOnInit() {
 }
}
// 2) using set, get
@Component({
 selector: 'app-child',
 template: '<h1>{{textContent}}</h1>',
 styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  _textContent:string;
  @Input()
  set textContent(text: string){
    this._textContent = !text: "啥都没有给我" ? text ;
  } ;
  get textContent(){
    return this._textContent;
  }
  constructor() { }
  ngOnInit() { }
}
```

[⬆ back to top](#top)

### @ViewChild()

- `@ViewChild()` 一般用在调用子组件非私有的方法

```js
//parent component
@Component({
   selector: 'app-parent',
   templateUrl: './parent.component.html',
   styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
   varString: string;
   @ViewChild(ViewChildChildComponent)
   viewChildChildComponent: ViewChildChildComponent;
   constructor() { }
   ngOnInit() {
    this.varString = '从父组件传过来的' ;
   }
   clickEvent(clickEvent: any) {
    console.log(clickEvent);
    this.viewChildChildComponent.myName(clickEvent.value);
   }
}
//ViewChildChildComponent
 @Component({
   selector: 'app-view-child-child',
   templateUrl: './view-child-child.component.html',
   styleUrls: ['./view-child-child.component.css']
})
export class ViewChildChildComponent implements OnInit {
   constructor() { }
   name: string;
   myName(name: string) {
     console.log(name);
     this.name = name ;
   }
   ngOnInit() {
   }
}
```

[⬆ back to top](#top)

### 局部变量

- 局部变量和viewChild类似,只能用在html模板里,修改parent.component.html,通过#viewChild这个变量来表示子组件,就能调用子组件的方法

```js
<div class="panel-body">
  <input class="form-control" type="text" #viewChildInputName >
  <button class=" btn btn-primary" (click)="viewChild.myName(viewChildInputName.value)">局部变量传值</button>
  <app-view-child-child #viewChild></app-view-child-child>
</div>
//child component
@Component({
 selector: 'app-view-child-child',
 templateUrl: './view-child-child.component.html',
 styleUrls: ['./view-child-child.component.css']
})
export class ViewChildChildComponent implements OnInit {
 constructor() { }
 name: string;
 myName(name: string) {
   console.log(name);
   this.name = name ;
 }
 ngOnInit() { }
}
```

[⬆ back to top](#top)

## 子组件 => 父组件

### @output()

- 本质是给子组件传入一个function,在子组件里执行完某些方法后,再执行传入的这个回调function,将值传给父组件

```js
// parent.component.ts
@Component({
 selector: 'app-child-to-parent',
 template: `
  <div class="panel-body">
  <p>output方式 childText:{{childName}}</p> <br>
  <app-output-child (childNameEventEmitter)="showChildName($event)"></app-output-child>
  </div>
  `,
 styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
 childName: string;
 childNameForInject: string;
 constructor( ) { }
 ngOnInit() {
 }
 showChildName(name: string) {
  this.childName = name;
 }
}
 // child.component.ts
 export class ChildComponent implements OnInit {
 // 传入的回调事件
 @Output() public childNameEventEmitter: EventEmitter<any> = new EventEmitter();
 constructor() { }
 ngOnInit() { }
 showMyName(value) {
  //这里就执行,父组件传入的函数
  this.childNameEventEmitter.emit(value);
 }
}
```

[⬆ back to top](#top)

## sibling组件 => sibling组件

### 使用service和RxJS的Subject实现组件间消息通信

- angular中service是单例的,所以三种通信类型都可以通过service
- SenderComponent发送的消息通过MessageService传递给ReceiverComponent，并显示在ReceiverComponent中

```js
// message.service.ts - 消息中专服务, 类似广播
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'    // 全局可用的单例服务, MessageService将成为整个应用程序中所有组件共享的单一实例
})
export class MessageService {
  private messageSubject = new Subject<string>();  
  /**
   * 获得消息
   * @returns {Observable<any>} 返回消息监听
   */ 
  message$ = this.messageSubject.asObservable();
  sendMessage(message: string) {
    this.messageSubject.next(message);
  }
  clearMessage() {
    this.messageSubject.next();
  }
}
// sender.component.ts
import { Component } from '@angular/core';
import { MessageService } from './message.service';
@Component({
  selector: 'app-sender',
  template: `
    <input type="text" [(ngModel)]="message" />
    <button (click)="sendMessage()">发送消息</button>
  `,
})
export class SenderComponent {
  message: string;
  constructor(private messageService: MessageService) {}
  sendMessage() {
    this.messageService.sendMessage(this.message);
    this.message = '';                // 清空输入框
  }
}
// receiver.component.ts
import { Component } from '@angular/core';
import { MessageService } from './message.service';
@Component({
  selector: 'app-receiver',
  template: ` <div>接收到的消息: {{ receivedMessage }}</div> `,
})
export class ReceiverComponent extend ngOnDestroy {
  public subscription: Subscription;
  receivedMessage: string;
  constructor(private messageService: MessageService) {
    this.subscription = this.messageService.message$.subscribe(message => {
      this.receivedMessage = message;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
```

[⬆ back to top](#top)

### 复用service

- 引入了一个注册表，用来存储对应每个消息事件的 Subject 对象
- `getListener`方法用于订阅消息，并在接收到消息时更新ReceiverComponent中的receivedMessage属性
- `cancelSubscription`方法用于取消订阅，并在不再有监听者时从注册表中移除监听器

```js
//
// dataService.service.ts
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
@Injectable({providedIn: 'root'})
export class DataService<T> {
  // 创建注册表，用于存放监听器
  private events = new Map();
  /**
   * 发送消息
   *
   * @param {string} event 事件。用于区别不同的监听
   * @param {T} value 消息内容
   * @returns {void}
   * @memberof DataService
   */
  sendMessage(event: string, value: T): void {
    if (!this.events.has(event)) {
      return;
    }
    this.events.get(event).subject.next(value);
  }
  /**
   * 获取监听器
   *
   * 监听器其实就是一个rxjs Subject对象，通过订阅来获取数据。
   *
   * 注意：
   * 1.getListener()应该在sendMessage()之前，否则sendMessage()中获取不到监听器，无法发消息
   * 2.getListener()应放在ngOnInit()、ngAfterViewInit()等只会执行一次的生命周期函数中
   *
   * @param {string} event 事件。用于区别不同的监听
   * @returns {Subject<T>}
   * @memberof DataService
   */
  getListener(event: string): Subject<T> {
    // 多处监听时会走到此分支
    if (this.events.has(event)) {
      const current = this.events.get(event);
      current.count++;
      return current.subject;
    }
    const listener = {
      count: 1, // 该字段用于记录监听（订阅）者个数
      subject: new Subject<T>(),
    };
    /**
     * 创建监听器，并将其加入注册表
     *
     * 所在函数在创建监听（订阅）时调用，监听发生在发送消息之前，所以在监听这里将监听器加入注册表
     */
    this.events.set(event, listener);
    return listener.subject;
  }
  /**
   * 取消订阅
   *
   * 必须手动取消订阅。
   * 取消时检查监听者个数。如果没有监听者了，就移除监听器。
   *
   * @param {string} event
   * @param {Subscription} subscription
   * @returns
   * @memberof DataService
   */
   cancelSubscription(event: string, subscription: Subscription) {
    if (!this.events.has(event)) {
      return;
    }
    const current = this.events.get(event);
    current.count--;
    if (current.count === 0) {
      // 没有监听者了，就移除监听器
      this.events.delete(event);
    }
    subscription.unsubscribe();
  }
}
// sender.component.ts
import { Component } from '@angular/core';
import { DataService } from './data.service';
@Component({
  selector: 'app-sender',
  template: `
    <input type="text" [(ngModel)]="message" />
    <button (click)="sendMessage()">发送消息</button>
  `,
})
export class SenderComponent {
  message: string;
  constructor(private dataService: DataService<string>) {}
  sendMessage() {
    this.dataService.sendMessage('customEvent', this.message);
    this.message = ''; // 清空输入框
  }
}
// receiver.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './data.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-receiver',
  template: ` <div>接收到的消息: {{ receivedMessage }}</div> `,
})
export class ReceiverComponent implements OnInit, OnDestroy {
  receivedMessage: string;
  subscription: Subscription;
  constructor(private dataService: DataService<string>) {}
  ngOnInit() {
  // 接收传递过来的消息 -- 创建监听
    this.subscription = this.dataService.getListener('customEvent').subscribe(message => {
      this.receivedMessage = message;
    });
  }
  ngOnDestroy() {
    this.dataService.cancelSubscription('customEvent', this.subscription);
  }
}
// receiver.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './data.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-receiver',
  template: ` <div>接收到的消息: {{ receivedMessage }}</div> `,
})
export class ReceiverComponent implements OnInit, OnDestroy {
  receivedMessage: string;
  subscription: Subscription;
  constructor(private dataService: DataService<string>) {}
  ngOnInit() {
    this.subscription = this.dataService.getListener('customEvent').subscribe(message => {
      this.receivedMessage = message;
    });
  }
  ngOnDestroy() {
    this.dataService.cancelSubscription('customEvent', this.subscription);
  }
}
```

[⬆ back to top](#top)

### Output eventEmitter+Service

```js
//app.component.html
<div class="container">
  app component<br><br>
  <app-side-bar-toggle></app-side-bar-toggle>
  <app-side-bar></app-side-bar>
</div>
//side-bar.service.ts
@Injectable()
export class SideBarService {
  isOpen = false;
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }
}
//side-bar-toggle.component.ts
@Component({
  selector: 'app-side-bar-toggle',
  template: `<div>toggle side bar component</div>`,
  styleUrls: ['./side-bar-toggle.component.css']
})
export class SideBarToggleComponent {
  constructor(private sideBarService: SideBarService) { }
  @HostListener('click')
  click() {
    this.sideBarService.toggle();
  }
}
// side-bar.component.ts
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  @HostBinding('class.is-open')
  isOpen = false;
  constructor(
    private sideBarService: SideBarService
  ) { }
  ngOnInit() {
    this.sideBarService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }
}
```

[⬆ back to top](#top)

### 路由参数

- A组件通过routerLink或router.navigate或router.navigateByUrl进行页面跳转到B组件
- B组件接受这些参数
- 此方法只适用于参数传递，组件间的参数一旦接收就不会变化

```js
// 1) 传递方式
// routerLink
<a routerLink=["/exampledetail",id]></a>
routerLink=["/exampledetail",{queryParams:object}]
routerLink=["/exampledetail",{queryParams:'id':'1','name':'yxman'}];
// router.navigate
this.router.navigate(['/exampledetail',id]);
this.router.navigate(['/exampledetail'],{queryParams:{'name':'yxman'}});
// router.navigateByUrl
this.router.navigateByUrl('/exampledetail/id');
this.router.navigateByUrl('/exampledetail',{queryParams:{'name':'yxman'}});
// 2)接收方式
// snapshot
import { ActivateRoute } from '@angular/router';
public data: any;
export class ExampledetailComponent implements OnInit { 
  constructor( public route: ActivateRoute ) { };
  ngOnInit(){
    this.data = this.route.snapshot.params['id'];
  };
}
// queryParams
import { ActivateRoute } from '@angular/router';
export class ExampledetailComponent implements OnInit { 
  public data: any;
  constructor( public activeRoute:ActivateRoute ) { };
  ngOnInit(){
    this.activeRoute.queryParams.subscribe(params => {
    this.data = params['name'];
  });
};
```

[⬆ back to top](#top)

> references
- [Angular组件间通信的新解决方案详解](https://www.jb51.net/javascript/2952718rf.htm)
- [angular 组件通信的几种实现方式](https://www.jb51.net/article/143698.htm)
- [Angular 组件通信的三种方式](https://www.cnblogs.com/magicg/p/15122684.html)
