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


![](https://i.imgur.com/3jA6FYD.png)


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



[back to top](#top)

<h3 id="组件生命周期以及angular的变化发现机制">5.3 组件生命周期以及angular的变化发现机制- 组件间互相通讯技术</h3>

[back to top](#top)

> Reference
- https://angular.io/tutorial
- https://github.com/angular/angular-cli/wiki
- https://blog.angular.io/
