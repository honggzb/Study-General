[Angular 4依赖注入-study](#top)

- [1. 依赖注入简介](#1-%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5%E7%AE%80%E4%BB%8B)
- [2. Angular依赖注入体系](#2-angular%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5%E4%BD%93%E7%B3%BB)
  - [2.1 Injectors](#21-injectors)
  - [2.2 Provider](#22-provider)
  - [2.3 Token](#23-token)
  - [2.4 Configuring Dependency Injection in Angular](#24-configuring-dependency-injection-in-angular)
- [3. 注入服务Provide的使用](#3-%E6%B3%A8%E5%85%A5%E6%9C%8D%E5%8A%A1provide%E7%9A%84%E4%BD%BF%E7%94%A8)
  - [3.1 ClassProvider的使用](#31-classprovider%E7%9A%84%E4%BD%BF%E7%94%A8)
  - [3.2 FactoryProvider的使用](#32-factoryprovider%E7%9A%84%E4%BD%BF%E7%94%A8)
  - [3.3 ValueProvider的使用](#33-valueprovider%E7%9A%84%E4%BD%BF%E7%94%A8)
  - [3.4 InjectToken的使用](#34-injecttoken%E7%9A%84%E4%BD%BF%E7%94%A8)
- [3. 服务注入](#3-%E6%9C%8D%E5%8A%A1%E6%B3%A8%E5%85%A5)
  - [3.1 组件服务注入](#31-%E7%BB%84%E4%BB%B6%E6%9C%8D%E5%8A%A1%E6%B3%A8%E5%85%A5)
  - [3.2 在服务中注入服务](#32-%E5%9C%A8%E6%9C%8D%E5%8A%A1%E4%B8%AD%E6%B3%A8%E5%85%A5%E6%9C%8D%E5%8A%A1)
  - [3.3 在模块中注入服务](#33-%E5%9C%A8%E6%A8%A1%E5%9D%97%E4%B8%AD%E6%B3%A8%E5%85%A5%E6%9C%8D%E5%8A%A1)
  - [3.4 注入到派生组件](#34-%E6%B3%A8%E5%85%A5%E5%88%B0%E6%B4%BE%E7%94%9F%E7%BB%84%E4%BB%B6)
  - [3.5 限定方式的依赖注入](#35-%E9%99%90%E5%AE%9A%E6%96%B9%E5%BC%8F%E7%9A%84%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5)

-------------------------

## 1. 依赖注入简介

```javascript
// 车身类
export default class Body { }
//车引擎类
export default class Engine {
  start() {
    console.log('?开动鸟~~~');
  }
}
// 汽车类
import Engine from './engine';
import Body from './body';
export default class Car {
    engine: Engine;
    body: Body;

    constructor() {
      this.engine = new Engine();
      this.body = new Body();
    }

    run() {
      this.engine.start();
    }
}
//具体应用： 造辆车
let engine = new NewEngine();
let body = new Body();
this.car = new Car(engine, body);
this.car.run();
//angular中
// 汽车类
@Injectable()
export default class Car {
  constructor(
    private engine: Engine, 
    private body: Body, 
    private doors: Doors) {}
    
   run() {
     this.engine.start();
   }
};
//具体应用： 造辆车
import { ReflectiveInjector } from '@angular/core';
let injector = ReflectiveInjector.resolveAndCreate([Car, Engine, Body]);
let car = injector.get(Car);
car.run();
```

[back to top](#top)

## 2. Angular依赖注入体系

- **注入器(Inject)**:  就像制造工厂，提供了一些列的接口用于创建依赖对象的实例
- **Provider**：用于配置注入器，注入器通过它来创建被依赖对象的实例，Provider把标识映射到工厂方法中，被依赖的对象就是通过该方法创建的。
- **依赖(Dependence)**：指定了被依赖对象的类型，注入器会根据此类型创建对应的对象

**The DI framework in Angular consists of 4 concepts working together**

- Token: uniquely identifies something that we want injected. A token can be either a string, a class or an instance of InjectionToken.
- Dependancy: The actual code we want injected.
- Provider:  a map between a token and a list of dependancies.
- Injector: a function which when passed a token returns a dependancy (or a list of dependencies)

![](https://i.imgur.com/FsETSCu.png)

- 在组件的构造函数视图注入某个服务的时候，Angular会先从当前组件的注入器中查找，找不到就继续往父组件的注入器查找，直到根组件注入器，最后到应用根注入器，此时找不到的话就会报错。

### 2.1 Injectors

- At the core of the DI framework is an injector
- An injector is passed a token and returns a dependency (or list of)
- an injector resolves a token into a dependency
- Normally we never need to implement an injector. Angular handles low level injectable implementation details for us and typically we just configure it to give us to behaviour we want
- Dependency caching:  dependencies returned from injectors are cached. So multiple calls to the same injector for the same token will return the same instance
  - A different injector for the same token might return a different instance of a dependency but the same injector will always return the same instance

```javascript
import { ReflectiveInjector } from '@angular/core';   // import our injector class
//create two service classes
class MandrillService {}; 
class SendGridService {};
//configure our injector by providing an array of classes
let injector = ReflectiveInjector.resolveAndCreate([   
  MandrillService,
  SendGridService
]);
//pass in a token, the class name, into our injector and ask it to resolve to a dependency.
let emailService = injector.get(MandrillService); 
console.log(emailService);
// Dependency caching
let emailService1 = injector.get(MandrillService);
let emailService2 = injector.get(MandrillService);
console.log(emailService1 === emailService2);     // true
```

[back to top](#top)

### 2.2 Provider

- we can configure injectors with providers and a provider links a token to a dependency(Angular中通过Provider来描述与Token相关联的依赖对象的创建方式)
- **Provider 的分类**
  - TypeProvider
  - ClassProvider
  - ValueProvider
  - ExistingProvider
  - FactoryProvider
- 对应的，在Angular中依赖对象的创建方式分为以下四种：
  - useClass
  - useValue
  - useExisting
  - useFactory

```javascript
let injector = ReflectiveInjector.resolveAndCreate([
  { provide: MandrillService, useClass: MandrillService },
  { provide: SendGridService, useClass: SendGridService },
]);
//short 
let injector = ReflectiveInjector.resolveAndCreate([
  MandrillService,
  SendGridService
]);
```

### 2.3 Token

- A token can be either a string, a class or an instance of InjectionToken
  - String tokens
  - Type tokens
  - InjectionToken
- String tokens can cause name clashes so we prefer to use InjectionTokens instead.

```javascript
//String tokens
import { ReflectiveInjector } from '@angular/core';
class MandrillService {};
class SendGridService {};
let injector = ReflectiveInjector.resolveAndCreate([
  { provide: "EmailService", useClass: MandrillService }      //String tokens: "EmailService"
]);
let emailService = injector.get("EmailService");
console.log(emailService); // new MandrillService()
//Type tokens
class EmailService {};
class MandrillService extends EmailService {};
class SendGridService extends EmailService {};
let injector = ReflectiveInjector.resolveAndCreate([
  { provide: EmailService, useClass: SendGridService }   //class EmailService as the token
]);
let emailService = injector.get(EmailService);
console.log(emailService);
//InjectionToken
import { ReflectiveInjector } from '@angular/core';
import { InjectionToken } from '@angular/core';
class MandrillService {};
class SendGridService {};
let EmailService = new InjectionToken<string>("EmailService");  //an instance of InjectionToken and store it in a variable
/*
*Note: 
The string "EmailService" that pass to InjectionToken is only used to print a meaningful message to the developer when there is an error. It doesn’t need to be unique
*/
let injector = ReflectiveInjector.resolveAndCreate([
  { provide: EmailService, useClass: SendGridService }  //use the instance of InjectionToken as the token in our provider
]);
let emailService = injector.get(EmailService);
console.log(emailService);
```

[back to top](#top)

### 2.4 Configuring Dependency Injection in Angular

- **component tree && injector tree**
  - There is one top level injector(**root injector**) created for each NgModule and then for each component in our app, from the root component down, there is a tree of injectors created which map to the component tree
- `@Injectable` versus `@Component` versus `@Directive`
  - `@Inject` parameter decorator to instruct Angular we want to resolve a token and inject a dependency into a constructor
  - `@Injectable` class decorators to automatically resolve and inject all the parameters of class constructor
  - don’t need to use the `@Injectable` class decorator on classes which are already decorated with one of the other Angular decorators, such as `@Component`
- `NgModule.providers` vs `Component.providers` vs `Component.viewProviders`

|configure a provider position| ex1|ex2|
| :------------- | :------------- |:------------- |
|providers on NgModule|an instance of a dependency to be shared globally and share state across the application| 作用于所有的根组件和其子组件|
|providers on Components and Directives|a separate instance of a dependency to be shared across each instance of a component and it’s children|作用于该组件和其子组件|
|viewProviders on Components| a separate instance of a dependency to be shared across each instance of a component and only it’s view children |仅作用于该组件的实例，不作用于其子组件|

```javascript
@Component({
 selector: 'parent',
 template: `...`,
 viewProviders: [SimpleService ]
})
class ParentComponent {
  constructor(private service: SimpleService) { }
}
```

[back to top](#top)

## 3. 注入服务Provide的使用

### 3.1 ClassProvider的使用

```javascript
@NgModule({
 //使用 MockHeroService服务
 providers: [provide: HeroService, useClass: MockHeroService], 
})
// 创建创建一个新的数据服务， MockHeroService, 不必修改HeroService
export class MockHeroService {
    heros: Array<{ id: number; name: string }> = [
        { id: 16, name: 'RubberMan' },
        { id: 17, name: 'Dynama' },
        { id: 18, name: 'Dr IQ' },
        { id: 19, name: 'Magma' },
        { id: 20, name: 'Tornado' }
    ];
    getHeros() {
        return this.heros;
    }
}
```

- 方便地验证模拟数据，同时保持较小的改动量
- 易于进行本地单元测试

[back to top](#top)

### 3.2 FactoryProvider的使用

- FactoryProvider用于告诉Injector(注入器)，通过调用useFactory对应的函数，返回Token对应的依赖对象
- FactoryProvider接口

```javascript
export interface FactoryProvider {
  // 用于设置与依赖对象关联的Token值，Token值可能是Type、InjectionToken、
  // OpaqueToken的实例或字符串
  provide: any;
  // 设置用于创建对象的工厂函数
  useFactory: Function;
  // 依赖对象列表
  deps?: any[];
  // 用于标识是否multiple providers，若是multiple类型，则返回与Token关联的依赖
  // 对象列表
  multi?: boolean;
}
```

**场景： 如果多个组件都使用HeroService去获取英雄数据，创建一个LoggerService来统一调用，输出的调试信息**

```javascript
/*用于跨平台开发: console.log()存在兼容性问题 */
//ConsoleService服务: 实现统一的Console接口
// 1） 创建 ConsoleService 服务
import { Injectable } from '@angular/core';
@Injectable()
export class ConsoleService {
    constructor(private enable: boolean) { }
    log(message) {
        console.log(`ConsoleService: ${message}`);
    }
}
//3) 使用ConsoleService服务
export class HeroComponent implements OnInit {
  heros: Array<{ id: number; name: string }>;
  constructor(private heroService: HeroService, private consoleService: ConsoleService) { }
    ngOnInit() {
        this.loggerService.log('Fetching heros...');
        this.heros = this.heroService.getHeros();
    }
}
// 2) 配置ConsoleService服务
// 创建ConsoleService对象时，需要设置enable参数的值, 此时使用FactoryProvider
@NgModule({
 //...,
 providers: [
   HeroService,
   ConsoleService,
   { 
     provide: ConsoleService, 
     useFactory: () => { return new ConsoleService(true) }, //如果enable为true
     deps: [consoleService]
    }
  ],
 bootstrap: [AppComponent]
})
export class AppModule { }
```

[back to top](#top)

### 3.3 ValueProvider的使用

- ValueProvider 用于告诉Injector，但使用Token获取依赖对象时，则返回useValue指定的值

```javascript
@NgModule({
 //...,
 providers: [
   {
     provide: 'apiUrl',
     useValue: 'http://localhost:4200/heros'    //优点是:该userValue值可以一次改变，处处使用
   }
 ],
export class AppModule { }
//在HeroService服务
@Injectable()
export class HeroService {
 constructor(
    private loggerService: LoggerService,
    private http: Http,
    @Inject('apiUrl') private apiUrl) { }       //注入 apiUrl 该 Token 对应的依赖对象，即 'http://localhost:4200/heros'
 getHeros(): Observable<Array<{ id: number; name: string }>> {
 this.loggerService.log('Fetching heros...');
 return this.http.get(this.apiUrl)
  .map(res => res.json())
 }
}
```

[back to top](#top)

### 3.4 InjectToken的使用

- ValueProvider(String tokens) can cause name clashes so we prefer to use InjectionTokens instead
- `GET http://localhost:4200/Other%20value 404 (Not Found)`

```javascript
//app.tokens.ts- 保存应用中的 Token 信息
import { InjectionToken } from '@angular/core';
export const API_URL = new InjectionToken<string>('apiUrl');
// AppModule.ts
import { API_URL } from './app.tokens';
import { THIRD_PARTY_PROVIDERS } from './third-party';
@NgModule({
 //...,
 providers: [
   {
     provide: API_URL,
     useValue: 'http://localhost:4200/heros'
   },
  THIRD_PARTY_PROVIDERS
 ],
 bootstrap: [AppComponent]
})
export class AppModule { }
//HeroService 服务
import { API_URL } from './app.tokens';
@Injectable()
export class HeroService {
 constructor(
    private loggerService: LoggerService,
    private http: Http,
    @Inject(API_URL) private apiUrl) { }

}
```

```javascript
// InjectionToken类的使用
import { ReflectiveInjector } from '@angular/core';
var t = new InjectionToken<string>("value");
var injector = ReflectiveInjector.resolveAndCreate([
 {provide: t, useValue: "bindingValue"}
]);
injector.get(t); // "bindingValue"
```

[back to top](#top)

## 3. 服务注入

### 3.1 组件服务注入

- 通过import导入被依赖对象的服务 
- 在组建中配置注入器。在启动组件时，Angular会读取@Component装饰器里的providers元数据，它是一个数组，配置了该组件需要使用到的所有依赖，Angular的依赖注入框架就会根据这个列表去创建对应对象的实例。 
- 在组件构造函数中声明所注入的依赖。注入器就会根据构造函数上的声明，在组件初始化时通过第二步中的providers元数据配置依赖，为构造函数提供对应的依赖服务，最终完成注入过程
- 每个组件可以拥有一个或多个依赖对象的注入，每个依赖对象对于注入器而言都是单例

```javascript
import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';       // 导入 HeroService 服务
@Component({
  selector: 'app-hero',
  template: `
    <ul>
      <li *ngFor="let hero of heros">
        ID: {{hero.id}} - Name: {{hero.name}}
      </li>
    </ul>
  `,
  providers: [HeroService]                           //声明 HeroService 服务
})
export class HeroComponent implements OnInit {
  constructor(private heroService: HeroService) { }   // 注入 HeroService 服务
  heros: Array<{ id: number; name: string }>;
  ngOnInit() {
    this.heros = this.heroService.getHeros();     
  }
}
```

[back to top](#top)

### 3.2 在服务中注入服务

```javascript
//logger.service.ts
import {Injectable} from "@angular/core";
@Injectable()
export class LoggerService{
  log(message:string){
    console.log(message);
  }
}
//contact.service.ts
import {Injectable} from "@angular/core";
import {LoggerService} from "./logger.service";
@Injectable()                       //添加装饰器@Injectable()
export class ContactService{
  //构造函数中注入所依赖服务
  constructor(private _logger:LoggerService){}
  getCollections(){
    this._logger.log('获取联系人...')
  }
}
//在组件的providers元数据中注册服务
providers:[LoggerService,ContactService]
```

[back to top](#top)

### 3.3 在模块中注入服务

- 在根组件中注入服务，所有子组件都能共享这个服务
- Angular在启动程序时会启动一个根模块，并加载它所依赖的其他模块，此时会生成一个全局的根注入器，由该注入器创建的依赖注入对象在整个应用程序级别可见，并共享一个实例。同时根模块会指定一个根组件并启动，由该根组件添加的依赖注入对象是组件树级别可见，在根组件以及子组件中共享一个实例

```javascript
@NgModule({
  //...
  providers: [ContactService, UtilService],
})
```

[back to top](#top)

### 3.4 注入到派生组件

-对于有继承关系的组件，当父类组件和派生类组件有相同的依赖注入时，如果父类组件注入了这些依赖，派生组件也需要注入这些相同的依赖，并在派生类组件的构造函数中通过super()往上传递

```javascript
import {Component, OnInit} from "@angular/core";
import {ContactService} from "./contact.service";
@Component({
  selector:'contact-app',
  providers:[ContactService],      //注入ContactService
  templateUrl:'./app/contact-app.html'
})
export class ContactAppComponent implements OnInit{
  collections:any={};
  constructor(protected _contatcService:ContactService){}
  ngOnInit(): void {
    this._contatcService.getCollections().subscribe(data=>{
      this.collections=data;
      this.afterGetContacts();
    });
  }
  protected afterGetContacts(){}
}
import {Component, OnInit} from "@angular/core";
import {ContactService} from "./contact.service";
import {ContactAppComponent} from "./contactApp.component";
@Component({
  selector:'contact-app',
  providers:[ContactService],
  templateUrl:'./app/contact-app.html'
})
export class SortedContactComponent extends ContactAppComponent{    //SortedContactComponent继承ContactAppComponent
  protected afterGetContacts() {
    this.collections=this.collections.sort((h1,h2)=>{
      return h1.name<h2.name?-1:(h1.name>h2.name?1:0);
    })
  }
  constructor(protected _contatcService:ContactService){     //注入ContactService
    super(_contatcService);       //使用super())往上传递
  }

}
```

### 3.5 限定方式的依赖注入

Angular的限定注入方式使得开发者能够修改默认的额依赖查找规则，Angular依赖注入框架提供了`@Optional`和`@Host`装饰器来实现可选注入，在宿主组件的构造函数中增加装饰器即可

- @Optional可以兼容依赖不存在的情况，提高系统的健壮性
- @Host可以限定查找规则，明确实例初始化位置，避免一些莫名的共享对象问题: 依赖查找的规则是按照注入器从当前组件向父组件查找，直到找到要注入的依赖为止。但有时候想限制默认的查找规则，@Host装饰器将把往上搜索的行为截止在宿主组件

```javascript
import {Injectable, Optional} from "@angular/core";
import {LoggerService} from "./logger.service";
@Injectable()
export class ContactService{
  constructor(@Optional()private _logger:LoggerService){    //@Optional
    if(this._logger){
      this._logger.log("ContactService")
    }
  }
  getCollections(){
    this._logger.log('获取联系人...')
  }
}
```

[back to top](#top)

> Reference
> - [Angular 4 依赖注入教程系列](https://segmentfault.com/a/1190000009612113)
> - [Angular 2 DI - IoC & DI - 1]()
> - [Angular 5 Dependency Injection & Providers](https://codecraft.tv/courses/angular/dependency-injection-and-providers/overview/)
