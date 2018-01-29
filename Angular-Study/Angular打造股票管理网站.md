[Angular 4学习- Angular 4.0从入门到实战 打造股票管理网站](#top)

- [1. 基本概念](#基本概念)
  - [1.1 组件](#组件)
  - [1.2 Angular启动过程](#Angular启动)
  - [1.3 使用第三方库](#使用第三方库)
- [2. 路由](#路由)
  - [2.1 路由相关对象](#路由相关对象)
  - [2.2 路由传递数据](#路由传递数据)
  - [2.3 子路由](#子路由)
  - [2.4 辅助路由（兄弟路由）](#辅助路由)
  - [2.5 路由守卫](#路由守卫)
- [3. Service - 依赖注入](#依赖注入)
  - [3.1 注入器和提供器](#注入器和提供器)
  - [3.2 工厂和值声明提供器](#工厂和值声明提供器)
  - [3.3 注入器的层级](#注入器的层级)
- [4. 数据绑定和管道](#数据绑定)
  - [4.1 事件绑定](#事件绑定)
  - [4.2 数据绑定之DOM属性绑定和HTML属性绑定](#数据绑定)
  - [4.3 双向绑定](#双向绑定)
  - [4.4 响应式编程- 即异步数据流编程](#响应式编程)
  - [4.5 管道](#管道)
- [5. 组件](#组件)
  - [5.1 组件的输入输出属性- 父子组件间传递数据](#组件的输入输出属性)
  - [5.2 中间人模式传递数据- 非父子组件间传递数据](#中间人模式传递数据)
  - [5.3 组件生命周期以及angular的变化发现机制- 组件间互相通讯技术](#组件生命周期以及angular的变化发现机制)
- [6. 表单处理](#表单处理)
  - [6.1 模板式表单](#模板式表单)
  - [6.2 响应式表单](#响应式表单)
  - [6.3 表单验证](#表单验证)
    - 6.3.1 Angular的效验器
    - 6.3.2 效验响应式表单和错误信息处理- 预设效验器 + 自定义效验器 + 错误信息处理 + 异步效验器 + 状态字段
    - 6.3.3 效验模板式表单
- [7. 与服务器通讯](#与服务器通讯)
  - [7.1 模板式表单](#模板式表单)
  - [7.2 Http通讯](#Http通讯)
    - 配置angular使用express服务器
    - asyn管道
    - 处理http请求头（HttpHeader)
  - [7.3 Angular的WebSocket通讯](#WebSocket通讯)
    - [7.3.1 商品关注功能- 使用websocket协议通讯](#商品关注功能)
- [8. 构建和部署](#构建和部署)
  - [8.1 构建： 编译和合并](#编译和合并)
  - [8.2 部署：与服务器整合](#与服务器整合)
  - [8.3 多环境支持](#多环境支持)

<hr>

![](https://i.imgur.com/3jA6FYD.png)

<hr>

<h2 id="基本概念">1. 基本概念</h2>

<h3 id="组件">1.1 组件</h3>

![](https://i.imgur.com/Rv9KMMZ.png)

```javascript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {     //controller
  title = 'app';                //属性
}
```

![本项目的组件](https://i.imgur.com/3urmQ9X.png)

[back to top](#top)

<h3 id="Angular启动">1.2 Angular启动过程</h3>

1. angular-cli.json
2. main.ts

```javascript
import { enableProdMode } from '@angular/core';     //关闭开发者模式
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';  //使用哪个模块来启动
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';   //环境设置
if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
```

[back to top](#top)

<h3 id="使用第三方库">1.3 使用第三方库</h3>

```shell
# 安装
npm install jquery --save
npm install bootstrap --save
# 设置，修改angular-cli.json
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.css",
  "styles.css"
],
"scripts": [
  "../node_modules/jquery/dist/jquery.js",
  "../node_modules/bootstrap/dist/js/bootstrap.js"
],
# 安装类型描述文件
npm install @types/jquery --save-dev
npm install @types/bootstrap --save-dev
```

[back to top](#top)

<h2 id="路由">2. 路由</h2>

`ng new router --routing`

<h3 id="路由相关对象">2.1 路由相关对象</h3>

名称|简介
---|---
Routes|路由配置，保存哪个url对于哪个组件，以及在哪个RouterOutlet中展示组件
RouterOutlet|在HTML中标记路由内容呈现位置的占位符指令
Router|在运行时执行路由的对象，可通过调用其navigate()和navigateByUrl()方法来导航到一个指定的路由
RouterLink|在HTML中声明路由导航用的指令，注意其值是一个数组
ActivatedRoute|当前激活的路由对象，保存着当前路由的信息，如路由地址、路由参数等

![](https://i.imgur.com/6fxStVp.png)

[back to top](#top)

<h3 id="路由导航">2.2 路由导航</h3>

- 在html中， `<a [routerLink]="['/product']">product</a>`
- 在js中， `this.router.navigate(['/product'])`

<h3 id="路由传递数据">2.2 路由传递数据</h3>

路由传递数据方法|代码
---|---
在查询参数中传递数据|`/product?id=1&name=2`<br>`<a [routerLink]="['/product']" [queryParams]="{id: 1}">product</a>`<br>   =>  `ActivatedRoute.queryParams[id]`
在路由路径中传递数据| `{path:/product/:id}`<br>`<a [routerLink]="['/product', 1]">product</a>`<br>  =>  `/product/1`<br>  => `ActivatedRoute.params[id]`
在路由配置中传递数据|`{path:/product， component: ProductComponent, data: [{isProd:true},{prodNum:5}]}`<br>  =>  `ActivatedRoute.data[0][isProd]`

**参数快照(静止)**和**参数订阅(需要重新加载组件的参数)**

```
//product.component.ts
ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => {
      this.productId = params['id'];
    });
    //this.productId = this.routeInfo.snapshot.queryParams["id"];   //在查询参数中传递数据
    this.productId = this.routeInfo.snapshot.params["id"];   //在路由路径中取参数
  }
```

[back to top](#top)

<h3 id="子路由">2.3 子路由</h3>

```javascript
//app-routing.module.ts
path: 'product/:id', component: ProductComponent, 
    children: [
      { path: '', component: ProductDescComponent },
      { path: 'seller/:id', component: SellerInfoComponent },
  ]},
//product.component.html
<p>商品ID是： {{ productId}} </p>
// <!--  注: 这里应该使用相对路径'./', 而不能使用根路径'/' -->
<a [routerLink]="['./']">Product Description</a> | 
<a [routerLink]="['./seller', 99]">Seller Information</a>
<router-outlet></router-outlet>       //注:  在组件内部加入router-outlet
//seller-info.component.ts
private sellerId: number;
constructor(private routeInfo: ActivatedRoute) { }
ngOnInit() {
  this.sellerId = this.routeInfo.snapshot.params["id"];
}
```

[back to top](#top)

<h3 id="辅助路由">2.4 辅助路由（兄弟路由）</h3>

```javascript
//1. 在组件内部
<router-outlet></router-outlet>
<router-outlet name="aux"></router-outlet>
//2. 在路由
{ path: 'xxx', component: XXXComponent, outlet: "aux" },
{ path: 'yyy', component: YYYComponent, outlet: "aux" }s
//3. 导航
<a [routerLink]="['/home', {outlet:{aux: 'xxx'}}]">XXX</a>
<a [routerLink]="['/product', {outlet:{aux: 'yyy'}}]">YYY</a>
```

[back to top](#top)

<h3 id="路由守卫">2.5 路由守卫</h3>

- 用户登录的验证
- 表单，如注册流程，用户只要在当前路由的组件中填写了满足要求的信息才能导航到下一个路由
- 当用户未执行保存操作而试图离开当前导航时候提醒用户

| 路由守卫的类型 | 说明|
| :------------- | :------------- |
|CanActivate|处理导航到某个路由的情况|
|CanDeactivate|处理从当前路由离开的情况|
|Resolve|在路由激活之前获取路由数据，在进入路由时候就可以将数据展示给用户|

[back to top](#top)

<h2 id="依赖注入">3. Service - 依赖注入</h2>

<h3 id="注入器和提供器">3.1 注入器和提供器</h3>

| DI |说明|
| :------------- | :------------- |
|注入器|`constructor(productService: ProductService){}`|
|提供器|`providers: [ProductService]`<br>`providers: [{provide: ProductService, useClass: ProductService}]`<br>`providers: [{provide: ProductService, useClass: AnotherProductService}]`<br>`providers: [{provide: ProductService, useFactory:()=> {}}]`|

```javascript
@NgModule({
  //1) 提供器： [{token, 要实例化的类}]
  providers: [{provide: ProductService, useClass: ProductService}]
  // loose-couple： 如果在另一个项目中可使用AnotherProductService
  //providers: [{provide: ProductService, useClass: AnotherProductService}]
})
export class AppModule {}
@component({
  //...
})
export class ProductComponent{
  product: Product;
  constructor(productService: ProductService){   //2) 注入器
    this.product = this.productService.getProduct();
  }
}
```

[back to top](#top)

<h3 id="工厂和值声明提供器">3.2 工厂和值声明提供器</h3>

```javascript
//需要判断，或需要传递参数
providers: [{
  provide: ProductService, 
  /*ProductService需要
  1) LoggerService, 注入另一个服务
  2) 对象appConfig
  */
  useFactory: (logger:LoggerService, appConfig)=> {
      //let logger = new LoggerService();
      //let dev = Math.random()>0.5;
      if(appConfig.isDev){
        return new ProductService(logger);
      }else{
        return new AnotherProductService(logger);
      }
    },
    //deps:[LoggerService, "IS_DEV_ENV"]
    deps: [LoggerService, "APP_CONFIG"]
  }, 
  LoggerService, 
  {
    // provide: "IS_DEV_ENV", useValue: false
    provide: "APP_CONFIG", useValue: {isDev: false}
  }
],
```

<h3 id="注入器的层级">3.3 注入器的层级</h3>

[back to top](#top)

<h2 id="数据绑定">4. 数据绑定和管道</h2>

| 绑定方法   |代码 | 说明 |
| :------------- | :------------- |:------------- |
|插值表达式 {{ }} |`<h1>{{ productTitle }}</h1>`|将一个表达式的值显示在模板上|
|方括号 []- 属性绑定|`<img [src]="imgUrl">`|将HTML标签的一个属性绑定到一个 表达式上|
|小括号()- 事件绑定 |`<button (click)="toProductDetail()">商品详情</button>`|将组件控制器的一个方法绑定为模板上一个事件的处理器|

<h3 id="事件绑定">4.1 事件绑定</h3>

![事件绑定](https://i.imgur.com/QT5qYOY.png)

<h3 id="数据绑定">4.2  数据绑定之DOM属性绑定和HTML属性绑定</h3>

- **DOM属性和HTML属性**
  - DOM属性是变化的，表示当前值
  - HTML属性没有变化，其值指定了初始值，HTML属性初始化DOM属性
- **button的disable属性**
  - `<button disable>click me</button>` - 添加disable后，button的DOM属性disable就赋值为true
  - `<button disable="false">click me</button>` - button的HTML属性设置是无关紧要的（无效），button仍然无法点击
  - 只能通过设置button的DOM属性来禁用或启用按钮
- **DOM属性和HTML属性的关系**
  - 少量HTML属性和DOM属性直接有1:1的映射，如id
  - 有些HTML属性没有对应的DOM属性，如colspan
  - 有些DOM属性没有对应的HTML属性，如textContent
  - 就算是名字相同，HTML属性和DOM属性也不是同一样东西
  - DOM属性的值可改变，HTML属性的值不能改变
  - **模板绑定是通过DOM属性和事件来工作的，而不是HTML属性**
- **插值表达式 == DOM属性绑定**  `<img [src]="imgUrl">`  == `<img src="{{imgUrl}}">`

```javascript
<input value="Tom" (input)="doOnInput($event)">
//
doOnInput(event:any){
  console.log(event.target.value);                  //DOM属性
  console.log(event.target.getAttribute('value'));  //HTML属性
}
```

**DOM属性绑定**

![DOM属性绑定](https://i.imgur.com/WLEEBav.png)

**HTML属性绑定**

![](https://i.imgur.com/6duC1Ga.png)

**和样式相关的数据绑定- 特殊的HTML属性绑定**

|和样式相关的数据绑定| 代码|
| :------------- | :------------- |
|CSS类绑定 |`<div class="aaa bbb" [class]="expression">Sth</div>`<br>`<div [class.special]="isSpecial">Sth</div>`<br>`<div [ngClass]="{aaa:isA, bbb:isB}">Sth</div>`|
|样式绑定| `<button [style.font-size.em]="idDev?3:1">RED</button>`<br>`<div [ngStyle]="{'font-style':this.canSave?'italic':'normal'}">`|

<h3 id="双向绑定">4.3 双向绑定</h3>

`<input [(ngModel)]="name">`

[back to top](#top)

<h3 id="响应式编程">4.4 响应式编程- 即异步数据流编程</h3>

```javascript
Observable.from([1,2,3,4])
  .filter(e => e%2==0)
  .map(e => e*e)
  .subscribe(                      //observer, 包含三个方法，后两个可以省略
    e => console.log(e),           // 1) 处理流中发射出来的数据
    err => console.log(err),       // 2) 处理流中错误
    () => console.log("finished")  // 3) 在流结束的时候被调用
  )
```

- 浏览器中每个事件在JavaScript中都被封装为一个event对象， event对象包含了所有事件相关的属性和方法
- Angular提供了一种模板本地变量机制（`<input #myField (keyup)="onkey(myField.value)">`）来方便提供对HTML的引用
- Angular将事件看成一个永无结束的流来处理
- Angular的另一个响应式编程应用是和Server通讯

```javascript
//template
<input [formControl]="searchInput">
//component
export class BindComponent {
  searchInput: formControl = new FormsControl();   //定义一个流
  contructor(){
    this.searchInput.valueChanges
                    .debounceTime(500)
                    .subscribe(stockCode => this.getStockInfo(stockCode));
  }
  getStockInfo(value:string){ console.log(value); }
}
```

[back to top](#top)

<h3 id="管道">4.5 管道- 格式输出</h3>

```html
<p>日期{{birthday | date: 'yyyy-MM-dd HH:mm:ss'}}</p>
<p>数{{pi | number: '2.1-4'}}</p>   <!-- 整数部分显示为2位，小数位：最少1位小数，最多4位小数-->
```

[back to top](#top)

<h2 id="组件">5. 组件</h2>

<h3 id="组件的输入输出属性">5.1 组件的输入输出属性- 父子组件间传递数据</h3>

| 组件的输入输出属性| Header Two     |
| :------------- | :------------- |
|输出属性 - `@input()`| 从父组件给子组件传递参数|
|输出属性 - `@Output()+EventEmitter`| 从子组件给父组件传递参数(通过事件绑定方式)  |

```javascript
//child.component.html
<div>
  <p>子组件</p>
  <p>股票代码{{ stockCode }}</p>
  <p>股票价格{{ price | number: "2.2-2"}}</p>
</div>
//child.component.ts
export class PriceQuoteComponent implements OnInit {
  private stockCode: string = 'IBM';
  private price:number;
  @Output()
  //@Output(pricechange)
  lastPrice:EventEmitter<PriceQuote> = new EventEmitter();   //定义中的泛型和发射的类型应该一致
  constructor() {
    setInterval(() => {
      let priceQuote:PriceQuote = new PriceQuote(this.stockCode, 100*Math.random()); //随机生成价格
      this.price = priceQuote.lastPrice;
      this.lastPrice.emit(PriceQuote);     //发射事件
    }, 1000);
   }
  ngOnInit() {}
}
export class PriceQuote {
  constructor(public stockCode:string, public lastPrice: number){}
}
//parent.component.html
<app-price-quote (lastPrice)="priceQuoteHandler($event)"></app-price-quote>
<!-- <app-price-quote (pricechange)="priceQuoteHandler($event)"></app-price-quote> -->
<div>
  <p>父组件</p>
  <p>股票代码{{ priceQuote.stockCode }}</p>
  <p>股票价格{{ priceQuote.lastPrice | number: "2.2-2"}}</p>
</div>
//parent.component.ts
export class PriceQuoteComponent{
  private stock: string = '';
  private priceQuote:PriceQuote = new PriceQuote("",0);
  priceQuoteHandler(event: PriceQuote){
    this.priceQuote = event;
  }
}
```

[back to top](#top)

<h3 id="中间人模式传递数据">5.2 中间人模式传递数据- 非父子组件间传递数据</h3>

```javascript
/*child.component.html- 报价组件*/
<div>
  <p>报价组件</p>
  <p>股票代码{{ stockCode }}，  股票价格{{ price | number: "2.2-2"}}</p>
</div>
<div>
  <input type="button" value="立即购买" (click)="buyStock($event)">
</div>
//child.component.ts - 报价组件
export class PriceQuoteComponent implements OnInit {
  private stockCode: string = 'IBM';
  private price:number;
  @Output()
  lastPrice:EventEmitter<PriceQuote> = new EventEmitter();   //定义中的泛型和发射的类型应该一致
  @Output()
  buy: EventEmitter<PriceQuote> = new EventEmitter();
  constructor() {
    setInterval(() => {
      let priceQuote:PriceQuote = new PriceQuote(this.stockCode, 100*Math.random()); //随机生成价格
      this.price = priceQuote.lastPrice;
      this.lastPrice.emit(PriceQuote);     //发射事件
    }, 1000);
  }
  buyStock(event){
    this.buy.emit(new PriceQuote(this.stockCode, this.price));
  }
}
export class PriceQuote {
  constructor(public stockCode:string, public lastPrice: number){}
}
/*parent.component.html - 中间人组件*/
<app-price-quote (buy)="buyHandler($event)"></app-price-quote>    //
<app-order [priceQuote]="priceQuote"></app-order>                 //通过属性绑定，将priceQuote传给下单组件
<div>
  <p>父组件</p>
  <p>股票代码{{ priceQuote.stockCode }}</p>
  <p>股票价格{{ priceQuote.lastPrice | number: "2.2-2"}}</p>
</div>
//parent.component.ts - 中间人组件
export class PriceQuoteComponent{
  private stock: string = '';
  private priceQuote:PriceQuote = new PriceQuote("",0);
  buyHandler(event: PriceQuote){
    this.priceQuote = event;
  }
}
/*order.component.html- 下单组件*/
<div>下单组件</div>
<div>买100手{{ priceQuote.stockCode }}股票，买入价格是{{ priceQuote.price | number: "2.2-2"}}</div>
//order.component.ts- 下单组件
export class OrderComponent{
  @Input()
  priceQuote: PriceQuote;
  constructor(){}
}
```

- 本例中报价组件和下单组件使用父组件作为中间人, 报价组件只用发射priceQuote，下单组件只需要定义需要输入的priceQuote
- 如果两个组件无公共的父组件或不在同一时间显示，可以使用一个服务作为中间人

[back to top](#top)

<h3 id="组件生命周期以及angular的变化发现机制">5.3 组件生命周期以及angular的变化发现机制(Change Detection)- 组件间互相通讯技术</h3>

 **5.3.1 组件生命周期和变化阶段**

![组件生命周期和变化阶段](https://i.imgur.com/PHEbDKr.png)

**5.3.2 OnChanges钩子**

- Mutable(可变)和Immutable(不可变)
  - 可变对象, 如变量和对象, 在JavaScript中默认所有的对象都是可变的，即我们可以任意修改对象内的属性
  - 不可变对象，如字符串
- OnChanges钩子

**5.3.3 Angular的变更检测机制(Change Detection)和DoChecked钩子**

变化检测(Change Detection)就是Angular用来检测视图与模型之间绑定的值是否发生了改变，当检测到模型中绑定的值发生改变时，则同步到视图上，反之，当检测到视图上绑定的值发生改变时，则回调对应的绑定函数。有如下几种情况可能也改变数据

- 用户输入操作，比如点击，提交等
- 请求服务端数据(XHR)
- 定时事件，比如setTimeout，setInterval

**AngularJS vs Angular 2/4**

- 在AngularJS中是由代码$scope.$apply()或者$scope.$digest触发
- Angular 2/4使用ZoneJS来监听了Angular所有的异步事件： 实际上Zone有一个叫猴子补丁的东西。在Zone.js运行时，就会为这些异步事件做一层代理包裹，也就是说Zone.js运行后，调用setTimeout、addEventListener等浏览器异步事件时，不再是调用原生的方法，而是被猴子补丁包装过后的代理方法。代理里setup了钩子函数, 通过这些钩子函数, 可以方便的进入异步任务执行的上下文

**Angular变化检测的过程**

- Angular应用程序是一颗组件树，Angular的变化检测可以分组件进行，每一个Component都对应有一个changeDetector， 应用程序也是一颗变化检测器(changeDetector)树
- 变化检测总是从根组件开始: Angular的数据流是自顶而下，从父组件到子组件单向流动。单向数据流向保证了高效、可预测的变化检测。尽管检查了父组件之后，子组件可能会改变父组件的数据使得父组件需要再次被检查，这是不被推荐的数据处理方式。在开发模式下，Angular会进行二次检查，如果出现上述情况，二次检查就会报错：Expression Changed After It Has Been Checked Error。而在生产环境中，脏检查只会执行一次
  - 相比之下，AngularJS采用的是双向数据流，错综复杂的数据流使得它不得不多次检查，使得数据最终趋向稳定。理论上，数据可能永远不稳定。AngularJS给出的策略是，脏检查超过10次，就认为程序有问题，不再进行检查
- Angular编译器为每个组件自动创建变化检测器，而且最终生成的这些代码JavaScript VM友好代码

**变化检测策略** - Angular有两种变化检测策略

- defalut策略: Default是Angular默认的变化检测策略，也就是上述提到的脏检查,只要有值发生变化，就全部从父组件到所有子组件进行检查,
- OnPush策略:  就是只有当输入数据(即@Input)的引用发生变化或者有事件触发时，组件才进行变化检测, 当使用OnPush策略的时候，若输入属性没有发生变化，组件的变化检测将会被跳过

> 总结:  Angular应用是一个响应系统，变化检测总是从根组件到子组件这样一个从上到下的顺序开始执行，它是一棵线性的有向树，默认情况下，变化检测系统将会走遍整棵树，但可以使用OnPush变化检测策略，在结合Observables对象，进而利用ChangeDetectorRef实例提供的方法，来实现局部的变化检测，最终提高系统的整体性能

```javascript
@Component({
    selector: 'profile-card',
    template: `
       <div>
         <profile-name [name]='profile.name'></profile-name>
         <profile-age [age]='profile.age'></profile-age>
       </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush      //OnPush策略, ProfileCardComponent中的profile输入属性没有发生变化，是没有必要再执行变化检测
})
export class ProfileCardComponent {
    @Input() profile: { name: string; age: number };
}
```

**5.3.4 Observables机制**

使用Observables机制提升性能和不可变的对象类似，但当发生变化的时候，Observables不会创建新的模型，但我们可以通过订阅 Observables对象，在变化发生之后，进行视图更新。使用Observables机制的时候，同样需要设置组件的变化检测策略为OnPush

```javascript
//counter.component.ts
import { Component, Input, OnInit, ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
@Component({
    selector: 'exe-counter',
    template: `<p>当前值: {{ counter }}</p>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit {
    counter: number = 0;
    @Input() addStream: Observable<any>;
    constructor(private cdRef: ChangeDetectorRef) { }
    ngOnInit() {
        this.addStream.subscribe(() => {
            this.counter++;
            this.cdRef.markForCheck();
        });
    }
}
//app.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'exe-app',
  template: `<exe-counter [addStream]='counterStream'></exe-counter>`
})
export class AppComponent implements OnInit {
  counterStream: Observable<any>;
  ngOnInit() {
     this.counterStream = Observable.timer(0, 1000); 
  }
}
```

[back to top](#top)

<h2 id="表单处理">6. 表单处理</h2>

- 表单的**数据模型**用来存储表单的数据，它不是一个任意的对象，它是一个由angular/forms模块中的一些特定的类，如FormControl、FormGroup、FormArray等组成的
- `import { FormsModule, ReactiveFormsModule } from "@angular/forms";`

<h3 id="模板式表单">6.1 模板式表单</h3>

- 表单的数据模型是通过组件模板中的相关指令来隐形创建的，该方法定义数据模型时候，会受限于HTML的语法，只使用于一些简单的场景
- 模板式表单中无法直接访问angular/forms模块中的一些特定的类
- 模板式表单的指令： 
  - `NgForm`指令：        
    - 代表整个表单，自动添加到每个form表单上
    - 会隐式创建一个`FormGroup`的实例来代表该表单数据类型，会自动查找带有NgModel指令的子元素并将其值添加到FormGroup数据模型中
    - 会拦截标准HTML表单的数据提交事件，阻止表单的自动提交（防止页面自动刷新），使用ngSubmit自定义事件来提交表单
    - ngForm可以用在其他HTML tag上， 如`<div ngForm>`等同于`<form>`
  - `NoNoForm`指令:     不使用angular处理表单， 如`<form action="/regist" method="POST" ngNoForm>`
  - `NgModel`指令：     代表表单的一个字段，会隐式创建一个`FormControl`的实例来代表其数据类型，并用FormControl对象类型来储存字段的值  
  - `NgModelGroup`指令：会隐式创建一个`FormGroup`的实例, 嵌套使用


```html
<!-- 定义一个模板本地变量来指向ngForm实例对象FormGroup -->
<form #myForm="ngForm" (ngSubmit)="onSubmit(myForm.value)">
  <div>用户名： <input name="username" #username="ngModel" type="text"></div> <!-- 声明一个模板本地变量来指向NgModel实例对象FormControl -->
  <div>手机号： <input ngModel name="phonenumber" type="number"></div>        <!-- ngModel不用写成[(ngModel)], 必须同时定义一个name属性 -->
  <div ngModelGroup="passwordGroup">
    <div>密码： <input ngModel name="password" type="password"></div>
    <div>确认密码： <input ngModel name="pconfirm" type="password"></div>
  </div>
  <button type="submit">注册</button>
</form>
<div>{{ myForm.value | json}}</div>
<div>{{ username.value }}</div>
```

[back to top](#top)

<h3 id="响应式表单">6.2 响应式表单</h3>

- 通过编写Typescript代码而不是HTML代码来明确的创建一个底层的数据模型，再通过一些特定的指定，将模板上的HTML元素和底层的数据模型连接在一起
- 响应式表单不会替你生成HTML，模板仍然需要编写

| 类名 | 响应式表单指令|
| :------------- | :------------- |
|FormGroup |formGroup(属性), formGroupName(字符串)|
|FormControl|formControl(属性), formControlName(字符串)|
|FormArray | formArrayName(字符串)|

```javascript
@Component({
    selector: 'app-reactiveForm',
    template: `
      <form [formGroup]="formModel" (submit)="onSubmit()">  <!-- formGroup(属性) -->
        <div formGroupName="dateRange">    <!-- formControlName(字符串) -->
          起始日期：<input type="date" formControlName="from">
          截止日期：<input type="date" formControlName="to">
        </div>
        <div>
          <ul formArrayName="emails">  <!-- formArrayName(字符串) -->
            <li *ngFor="let email of this.formModel.get('emails').controls; let i=index;">
              <input type="text" [formControlName]="i">  <!-- 这里是属性绑定 -->
            </li>
          </ul>
          <button type="button" (click)="addEmail()">增加email</button>
        </div>
        <div><button type="submit">保存</button></div>
      </form>
    `,
})
export class ReactiveFormComponent {
  formModel: FormGroup = new FormGroup({
    dateRange: new FormGroup({
      from: new FormControl(),
      to: new FormControl
    }),
    emails:new FormArray([
      new FormControl('a@a.com'),
      new FormControl('b@b.com')
    ]);
  });
  onSubmit() {
    console.log(this.formModel.value);
  }
  addEmail(){
    let emails = this.formModel.get('emails') as FormArray;
    emails.push(new FormControl());
  }
}
```

使用Formbuilder简化响应式表单数据模型的构建

```javascript 
export class ReactiveFormComponent {
  formModel: FormGroup;
  constructor(fb: FormBuilder){
    this.formModel = fb.group({
      dateRange: fb.group({
        from: [''],    //['',校验方法,异步的校验方法]， formControl可用一个数组表示，其包含三个值，第一个是默认值，校验方法,异步的校验方法为可选项
        to: ['']
      }),
      emails:fb.array([
        'a@a.com',
        'b@b.com'
      ]);
    }, {校验方法});    //校验方法为可选项
  } 
  onSubmit() {
    console.log(this.formModel.value);
  }
}
```

[back to top](#top)

<h3 id="表单验证">6.3 表单验证</h3>

**6.3.1 Angular的效验器**

- Angular的效验器是一个普通方法
  - 该方法接收一个AbstractControl类型的参数
  - 该方法必须有一个返回值，该返回值必须是对象类型，该返回值的key必须是string类型，其值可以是任意类型
- Angular内部预效验器： Validators.required, Validators.minLength

```javascript
//Angular的效验器的定义
xxx(control: AbstractControl): {[key:string]: any}{
  return null;
}
```

**6.3.2 效验响应式表单和错误信息处理**

```javascript
//案例： Angular效验器
// Validators.ts
//为FormControl自定义效验器
export function mobileValidator(control: FormControl){    //AbstractControl为FormControl
  let mvreg = /^((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8}$/;
  let valid = myreg.test(control.value);
  console.log("mobile的效验结果是："+valid);
  //如果校验通过，返回值为null， 如果校验没通过，返回false
  return valid? null: {mobile: true};   //mobileValidator未通过时候返回一个字符串mobile，其值为true
}
//为FormGroup自定义效验器
export function equalPasswordValidator(group: FormGroup):any{   //AbstractControl为FormGroup
  let password: FormControl = group.get('password') as FormControl;
  let pconfirm: FormControl = group.get('pconfirm') as FormControl;
  let valid:boolean = (password.value === pconfirm.value);
  console.log("password的效验结果是："+valid);
  return valid? null: {equal: true};
  // return valid? null: {equal: {descxxx: '密码和确认密码不匹配'}};   //可以在效验器中定义错误信息，此时html中应改为
  //<div [hidden]="!formModel.getError('equal', 'passwordGroup')">{{ formModel.getError('equal', 'passwordGroup')?.descxxx }}</div>
}
//xxx.component.html
<form [formGroup]="formModel" (submit)="onSubmit()">
  <div>用户名： <input formControlName="username" type="text"></div>
  //formModel.hasError的第一个参数是key，第二个参数是效验的字段名
  <div [hidden]="!formModel.hasError('required', 'username')">用户名是必填项</div>
  <div [hidden]="!formModel.hasError('minlength', 'username')">用户名最小长度是6</div>
  <div>手机号： <input formControlName="mobile" type="number"></div>
  <div [hidden]="!formModel.hasError('mobile', 'mobile')">请输入正确的手机号码</div>
  <div formGroupName="passwordGroup">
    <div>密码： <input formControlName="password" type="password"></div>
    //如果有嵌套，formModel.hasError的第二个参数是一个数组
    <div [hidden]="!formModel.hasError('minlength', ['passwordGroup', 'password'])">密码最小长度是6</div>
    <div>确认密码： <input formControlName="pconfirm" type="password"></div>
    <div [hidden]="!formModel.hasError('equal', 'passwordGroup')">密码和确认密码不匹配</div>
  </div>
  <button type="submit">注册</button>
</form>
//xxx.component.ts
this.formModel = fb.group({
  username: ['', [Validators.required, Validators.minLength(6)]],
  mobile: ['', mobileValidator],
  passwordGroup: fb.group({
    password: ['', Validators.minLength(6)],
    pconfirm: ['']
  }, {validator: equalPasswordValidator})
}); 
//...
onSubmit() {
  let isValid:boolean = this.FormsModel.get('username').valid;
  console.log("username的效验结果是："+isValid);
  let error:any = this.formModel.get('username').errors;
  console.log("username的错误信息是："+JSON.stringify(error));
  if(this.formModel.valid){   //如果表单所有的验证都通过
    console.log(this.formModel.value);
  }
}
```

[back to top](#top

**Angular的异步效验器**

- Angular的异步效验器可以调用远程的服务来效验表单
- 其返回值是一个可观测的流

```javascript
export function mobileAsyncValidator(control: FormControl){    //AbstractControl为FormControl
  let mvreg = /^((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8}$/;
  let valid = myreg.test(control.value);
  console.log("mobile的效验结果是："+valid);
  return Observable.of(valid? null: {mobile: true}).delay(5000);
}
//数据模型
this.formModel = fb.group({
  username: ['', [Validators.required, Validators.minLength(6)]],
  mobile: ['', mobileValidator, mobileAsyncValidator],   //作为第三个参数
  passwordGroup: fb.group({
    password: ['', Validators.minLength(6)],
    pconfirm: ['']
  }, {validator: equalPasswordValidator})
}); 
//模板上显示异步调用的状态， 如PENDING, VALID
<div>{{ formModel.status }}</div>
```

**状态字段和样式**

- touched, untouched： 是否获取了焦点
- pristine, dirty：    字段是否修改过
- pending:             字段是否正处在异步校验

```html
<form [formGroup]="formModel" (submit)="onSubmit()">
  <div>用户名： <input [class.hasError]="formModel.get('username').invalid && formModel.get('username').touched" formControlName="username" type="text"></div>
  <div [hidden]="formModel.get('username').valid || formModel.get('username').untouched)">
    <div [hidden]="!formModel.hasError('required', 'username')">用户名是必填项</div>
    <div [hidden]="!formModel.hasError('minlength', 'username')">用户名最小长度是6</div>
  </div>
  <div>手机号： <input formControlName="mobile" type="number"></div>
  <div [hidden]="formModel.get('mobile').valid || formModel.get('mobile').pristine)">
    <div [hidden]="!formModel.hasError('mobile', 'mobile')">请输入正确的手机号码</div>
  </div>
  <div [hidden]="!formModel.get('mobile').pending">正校验手机号码的合法性</div>
  <!--  ... -->
</form>
<!-- xxx.component.css -->
<!--系统预定义class-->
<style>
.ng-invalid{border: 1px solid red;}
.ng-valid{ }
.ng-pristine{ }
.ng-untouched{ }
// 自定义class
.hasError{ border: 1px solid red; }
</style>
```

[back to top](#top)

**6.3.3 效验模板式表单**

- 自定义的效验方法包装为指令才能应用到模板式表单中, 因为模板式表单无显式的数据模型，并且指令是作为属性应用到模板上的

```javascript
/* xxx.component.html */
<form #myForm="ngForm" (ngSubmit)="onSubmit(myForm.value, myForm.valid)" novalidate>   //1）novalidate表明不启用浏览器默认的校验
  <div>用户名： <input name="username" #username="ngModel" type="text" required minlength="6"></div>
  //2）模板式表单的错误信息处理， 无显示数据模型，所以使用 myForm.form.
  <div [hidden]="!myForm.form.hasError('required', 'username')">用户名是必填项</div>
  <div [hidden]="!myForm.form.hasError('minlength', 'username')">用户名最小长度是6</div>
  <div>手机号： <input ngModel name="mobile" type="number" appMobileValidator></div>  //directive是作为属性来使用的
  <div [hidden]="myForm.form.get('mobile').valid || formModel.get('mobile').pristine)">
    <div [hidden]="!myForm.form.hasError('mobile', 'mobile')">请输入正确的手机号码</div>
  </div>
  <div ngModelGroup="passwordGroup" appPasswordValidator>                                 //directive是作为属性来使用的
    <div>密码： <input ngModel name="password" type="password" minlength="6"></div>
    <div [hidden]="!myForm.form.hasError('minlength', ['passwordGroup', 'password'])">密码最小长度是6</div>
    <div>确认密码： <input ngModel name="pconfirm" type="password"></div>
    <div [hidden]="!myForm.form.hasError('equal', 'passwordGroup')">密码和确认密码不匹配</div>
  </div>
  <button type="submit">注册</button>
</form>
/*xxx.component.ts*/
//...
onSubmit() {
  let isValid:boolean = this.FormsModel.get('username').valid;
  console.log("username的效验结果是："+isValid);
  let error:any = this.formModel.get('username').errors;
  console.log("username的错误信息是："+JSON.stringify(error));
  if(this.formModel.valid){   //如果表单所有的验证都通过
    console.log(this.formModel.value);
  }
}
/*mobileValidator.directive.ts - directive相当于没有模板的组件*/
@Directive({
  selector: '[appMobileValidator]',    //[]符号表明appMobileValidator这个指令要作为属性使用的
  providers: [{provide: NG_VALIDATORS, useValue: mobileValidator, multi: true}]
  /* 
   providers： 三个参数， 1）token： 这里固定为NG_VALIDATORS，2）useValue: 自定义效验器名称, 3) multi:true 表示一个token下可以挂多个值
  */
})
export class mobileValidatorDirective {
  constructor(){ }
}
/*equalValidator.directive.ts */
@Directive({
  selector: '[appPasswordValidator]',
  providers: [{provide: NG_VALIDATORS, useValue: equalPasswordValidator, multi: true}]
})
export class EqualValidatorDirective {
  constructor(){  }
}
```

- 模板式表单中模型的值和状态变更之间是异步的，比较难以控制， 所以在模板式表单中使用状态字段必须添加input事件, 并在事件函数中处理状态

```javascript
/* xxx.component.html */
<form #myForm="ngForm" (ngSubmit)="onSubmit(myForm.value, myForm.valid)" novalidate> 
  <div>用户名： <input name="username" #username="ngModel" type="text" required minlength="6" (input)="onMobileInput(myform)"></div>
  <div [hidden]="mobileValid || mobileUntouched">
    <div [hidden]="!myForm.form.hasError('required', 'username')">用户名是必填项</div>
    <div [hidden]="!myForm.form.hasError('minlength', 'username')">用户名最小长度是6</div>
  </div>
  //...
</form>
/*xxx.component.ts*/
//...
mobileValid:boolean = true;
mobileUntouched:boolean = true;
onMobileInput(form: ngForm){
  if(form){
    this.mobileValid = form.form.get('mobile').valid;
    this.mobileUntouched = form.form.get('mobile').untouched;
  }
}
```

[back to top](#top)

<h2 id="与服务器通讯">7. 与服务器通讯</h2>

- http服务，来自HttpModule， 只有在调subscribe时才发请求
- Websocket协议，双向通讯

<h3 id="Node+express创建服务器">7.1 Node+express创建Web服务器</h3>

- 参见https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md
- https://stackoverflow.com/questions/39809008/angular-cli-proxy-to-backend-doesnt-work

[back to top](#top)

<h3 id="Http通讯">7.2 Http通讯</h3>

- Angular使用响应式编程(Observable)处理http服务

**配置angular使用express服务器**

- 在根目录创建proxy.conf.json
- 修改package.json, `"start": "ng serve --proxy-config proxy.conf.json",`

```javascript
//proxy.conf.json
{
  "/api": {
    "target":"http://localhost:8000"
  }
}
//package.json
"scripts": {
  "ng": "ng",
  "start": "ng serve --proxy-config proxy.conf.json",
  //...
},
```

**asyn管道**

- http请求的发送是subscribe来触发的（手工订阅流）
- 可在模板使用asyn管道，它可以接受一个流作为输入并自动订阅流

```javascript
/* http请求的发送是subscribe来触发的- 无asyn管道 */
//xxx.component.html
<ul>
  <li #ngFor="let product of products">{{ product }}</li>
</ul>
//xxx.component.ts
dataSource: Observable<any>;
products: Array<any> = [];
constructor(private http: Http){
  this.dataSource = this.http.get('/api/products').map((res)=> this.products=data );  //get方法只是定义了一个http请求
}
ngOnInit(){
  this.dataSource.subscribe( (data) => this.products = data );   //http请求的发送是subscribe来触发的
}
/*asyn管道*/
//xxx.component.html
<ul>
  <li #ngFor="let product of products | asyn">{{ product }}</li>
</ul>
//xxx.component.ts
products: Observable<any>;    //product直接定义为流
constructor(private http: Http){
  this.products = this.http.get('/api/products').map((res)=> reg.json());
}
ngOnInit(){}    //不需要subscribe方法啦
```

**处理http请求头（HttpHeader)**

```javascript
//xxx.component.ts
products: Observable<any>;    //product直接定义为流
constructor(private http: Http){
  let myHeaders: Headers = new Headers();
  myHeaders.append("authorization","Basic 123456");
  this.products = this.http.get('/api/products', {headers: myHeaders}).map((res)=> reg.json());
}
ngOnInit(){}
```

[back to top](#top)

<h3 id="WebSocket通讯">7.3 Angular的WebSocket通讯</h3>

- websocket是html5规范中的一个部分，它借鉴了socket这种思想，为web应用程序客户端和服务端之间（注意是客户端服务端）提供了一种全双工通信机制
- websocket协议是为了提供web应用程序和服务端全双工通信而专门制定的一种应用层协议，通常它表示为：`ws://echo.websocket.org/?encoding=text HTTP/1.1`

![](https://i.imgur.com/vdXmWgI.png)


```shell
npm i ws --save
npm i @types/ws --save-dev
```

<h3 id="websocket服务器">7.3.1 websocket服务器</h3>

```javascript
//定义websocket服务器
import {Server} from 'ws';
const wsServer = new Server({port: 8085});
//只有websocket服务器连接上后才发送
wsServer.on("connection", websocket => {
  websocket.send("这个消息的服务器主动推送的。");
  websocket.on("message", message => {
    console.log("接受到的客户端的消息是："+message);
  });
});
//定时推送
setInterval(() => {
  if(wsServer.clients){   //如果有客户连到websocket服务器
    wsServer.clients.forEach(client => {
      client.send("这是定时推送");
    })
  }
}, 2000);
//web-socket.service.ts --定义一个Observable的流的服务
import { Injectable } from '@angular/core';
@Injectable()
export class WebSocketService {
  ws: WebSocket;
  constructor(){}
  createObservableSocket(url: string):Observable<any>{
    this.ws = new WebSocket(url);
    return new Observable(
      observer => {   //一个Observable stream的三要素
        this.ws.onmessage = (event) => observer.next(event.data);  //1） 什么时候发射下一个元素
        this.ws.onerror = (event) => observer.error(event);        //2） 出现问题流抛出一个异常
        this.ws.onclose = (event) => observer.complete();          //3） 什么时候流发出结束信号
      }
    );
  }
  sendMessage(message: string){
    this.ws.send(message);
  }
}
//web-socket.component.ts  --订阅web-socket.service.ts中定义一个Observable的流
export class WebSocketComponent implements OnInit {
  constructor(private wsService:WebSocketService){}
  ngOnInit(){
    this.wsService.createObservableSocket("ws://localhost:8085").subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log("流已经结束")
    );
  }
  //向服务器发送消息
  sendMessageToServer(){
    this.wsService.sendMessage("The message from client.");
  }
}
```

[back to top](#top)

<h3 id="商品关注功能">7.3.2 商品关注功能- 使用websocket协议通讯</h3>

![](https://i.imgur.com/3pWeU4V.png)

- 使用productService作为中间人: 
  - 定义了search方法
  - 定义一个事件流： searchEvent, 并在product组件中订阅该事件流，在搜索组件中发射该事件流

```javascript
/* product.service.ts */
searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();  //搜索时间流
//...
search(params: ProductSearchParams): Observable<Product[]>{
  return this.http.get("/api/products/",{search: this.encodeParams(params)}).map(res => res.json());
}
private encodeParams(params:ProductSearchParams){
  let result: URLSearchParams;
  result = Object.keys(params)
                 .filter(key => params[key])
                 .reduce((sum:URLSearchParams,key:string) => {
                   sum.append(key, params[key]);
                   return sum;
                 }, new URLSearchParams());
  console.log(result);
  return result;
}
/* product.component.ts */
ngOnInit() {
  this.products = this.productService.getProducts();
  //订阅搜索事件流
  this.productService.searchEvent.subscribe(
    params => this.products = this.productService.search(params)
  )
}
/* search.component.ts */
onSearch(){
  if(this.formModel.valid){
    console.log(this.formModel.valid);
    //发射搜索事件流
    this.productService.searchEvent.emit(this.formModel.value);
  }
}
/* server */
app.get('/api/products', (req, res)=> {
  let result = products;
  let params = req.query;
  if(params.title){
    result = result.filter((p) => p.title.indexOf(params.title) !== -1);
  }
  if(params.price && result.length>0){
    result = result.filter((p) => p.price <= parseInt(params.price));
  }
  if(params.category!="-1" && result.length>0){
    result = result.filter((p) => p.categories.indexOf(params.categories) != -1);
  }
  res.json(result)
});
```

[back to top](#top)

<h2 id="构建和部署">8. 构建和部署</h2>

<h3 id="编译和合并">8.1 构建： 编译和合并</h3>

`ng build   #编译, 会生成dist目录`

<h3 id="与服务器整合">8.2 部署：与服务器整合</h3>

1. 将编译后的dist拷贝到node Server的client目录
2. 编写auction_server.js
3. 修改app.module.ts, 加入地址策略， 保证浏览器刷新后使用angular的路由，其url变为，如: `localhost:8000/#/product/1`

```javascript
//２) 服务器端： 访问根目录时候，访问的是当前目录的上一级父目录下面的client目录
import * as path from 'path';
app.use('/', express.static(path.join(__dirname, '..', 'client')));
//３) 客户端：　修改app.module.ts, 加入地址策略， 保证浏览器刷新后使用angular的路由，其url变为，如: localhost:8000/#/product/1
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
providers: [
  ProductService, WebsocketService,
  {provide: LocationStrategy, useClass: HashLocationStrategy}
],
```

<h3 id="多环境支持">8.3 多环境支持</h3>

- `src\environments\environment.ts`文件中的`production: false`表示默认是dev环境， 如想改变默认环境：
  - package.json:   `"start": "ng serve --env=prod --proxy-config proxy.conf.json",`
  - 如在`src\environments\`各个配置中定义一个`weixinNumber`属性，则在`\src\app\app.component.ts`组件中就可以引入该环境对象的属性了 `environment.weixinNumber`
- 在根目录下的.angular-cli.json中增加代码
- 在`\src\main.ts`文件中设置使用场景
- 新建 `src\environments\environment.test.ts`文件

```javascript
//1) .angular-cli.json
"environments": {
  "dev": "environments/environment.ts",
  "prod": "environments/environment.prod.ts",
  "test": "environments/environment.test.ts"
}
```

- `ng build --env=prod`, 使用生产环境来构建部署文件

[back to top](#top)

> Reference
- https://angular.io/tutorial
- https://github.com/angular/angular-cli/wiki
- https://blog.angular.io/
- [详解ANGULAR2组件中的变化检测机制（对比ANGULAR1的脏检测）](https://www.cnblogs.com/shitoupi/p/6731575.html)
- [Angular系列之变化检测(Change Detection)](https://segmentfault.com/a/1190000010928087)
