[Angular Pipe](#top)

- [1. Angular内建管道及分类](#Angular内建管道及分类)
  - 内建管道
  - 管道链
- [2. Angular自定义管道](#自定义管道)
- [3. 管道分类](#管道分类)
- [4. Async管道](#Async管道)
- [5. 案例1- 管道实现autocomplete](#管道实现autocomplete)

**一些概念**

- Angular中 Pipe(管道)与 AngularJS中的 filter(过滤器) 的作用的是一样的
- 管道分为两种
  - 纯管道 Pure Pipe: Angular只有检查到输入值发生纯变更时，才会执行纯管道。纯变更指的是，原始类型值(String,Number,Boolean,Symbol)的改变，或者对象引用的改变(对象值改变不是纯变更，不会执行)
  - 非纯管道 Impure Pipe: Angular会在每个组件的变更检测周期执行非纯管道。所以，如果使用非纯管道，我们就得注意性能问题了
  - 默认情况下，管道都是纯的，在自定义管道的时候，如果把pure标志为false,就是非纯管道了
  
```javascript
 @Pipe({ 
  name: 'format'
  pure: false
})
 ```

<h2 id="Angular内建管道及分类">1. Angular内建管道及分类</h2>

- 内建管道可以将数据格式化显示，但是不改变源数据，所以是一个深复制，比如日期的显示

| Angular内建管道分类 | Header Two |
| :------------- | :------------- |
|String -> String|uppercase, lowercase, TitleCasePipe|
|Number -> String|decimal, percent, currency|
|Object -> String|json, date|
|Tools|slice, async, i18nplural, i18nselect|

**DecimalPipe**

`expression | number[:{minIntegerDigits}.{minFractionDigits}-{maxfractionDigits}]`
`<p>{{ number | number: '3.1-2'}}</p>`

- minIntegerDigits：整数部分保留最小的位数，默认值为1
- minFractionDigits：小数部分保留最小的位数，默认值为0
- maxFractionDigits：小数部分保留最大的位数，默认值为3

**SlicePipe-裁剪数组或字符串，返回裁剪后的目标子集**

`expression | slice: start[: end]`

**CurrentPipe-将数值进行货币格式化处理**

`expression | currency[: currencyCode[: symbolDisplay[: digitInfo]]]`

- currentcyCode：表示要格式化的目标货币格式，值为ISO 4217货币码，如CNY人民币、USD美元、EUR欧元等
- symbolDisplay：表示以该类型货币的哪种格式显示，值为布尔值，true表示显示货币符号如￥、$等，false表示显示ISO 4217货币码如CNY、USD等
- digitInfo, 参考DecimalPipe管道


**内建管道使用示例**

<table border="1">
<tr>
<th>Pipe</th><th>Usage</th><th>Example</th>
</tr>
<tr>
<td>DatePipe</td><td>date</td><td>`{{ dateObj | date }} // output is 'Jun 15, 2015'`</td>
</tr>
<tr>
<td>UpperCasePipe</td><td>uppercase</td><td>`{{ value | uppercase }} // output is 'SOMETEXT'`</td>
</tr>
<tr>
<td>LowerCasePipe</td><td>lowercase</td><td>`{{ value | lowercase }} // output is 'some text'`</td>
</tr>
<tr>
<td>CurrencyPipe</td><td>currency</td><td>`{{ 31.00 | currency:'USD':true }} // output is '$31'`</td>
</tr>
<tr>
<td>PercentPipe</td><td>percent</td><td>`{{ 0.03 | percent }} //output is %3`</td>
</tr>
<tr>
<td>I18nSelectPipe</td><td>i18nSelect</td><td>`<div>{{gender | i18nSelect: inviteMap}} </div>`</td>
</tr>
</table>

- 数值格式化: `<p>{{ 3.14159265 | number: '1.4-4' }}</p> <!-- Output: 3.1416 -->`
- 日期格式化: `<p>{{ today | date: 'shortTime' }}</p> <!-- Output: 以当前时间为准，输出格式：10:40 AM -->`
- JavaScript对象序列化: `<p>{{ { name: 'semlinker' } | json }}</p> <!-- Output: { "name": "semlinker" } -->`
- 字符串截取： `<p>{{ 'semlinker' | slice:0:3 }}</p> <!-- Output: sem -->`
- I18nSelectPipe: 将输入值，依照一个map来转换，显示匹配值

```javascript
@Component(
    {selector: 'i18n-select-pipe', template: `<div>{{gender | i18nSelect: inviteMap}} </div>`})
export class I18nSelectPipeComponent {
  gender: string = 'male';
  inviteMap: any = {'male': 'Invite him.', 'female': 'Invite her.', 'other': 'Invite them.'};
}
```

**管道链**: 将多个管道连接在一起，组成管道链对数据进行处理

`<p>{{ 'semlinker' | slice:0:3 | uppercase }}</p> <!-- Output: SEM -->`

[back to top](#top)

<h2 id="自定义管道">2. Angular自定义管道</h2>

- 使用 @Pipe 装饰器定义Pipe的metadata信息，如Pipe的名称 - 即name属性
- 实现 PipeTransform 接口中定义的 transform 方法

```javascript
//defination
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'repeat'})
export class RepeatPipe implements PipeTransform {
    transform(value: any, times: number) {
        return value.repeat(times);
    }
}
//in use
<p>{{ 'lo' | repeat:3 }}</p> <!-- Output: lololo -->
```

[back to top](#top)

<h2 id="管道分类">3. 管道分类</h2>

- **pure管道**：仅当管道输入值变化的时候，才执行转换操作，默认的类型是pure类型。(备注：输入值变化是指原始数据类型如：string、number、boolean 等的数值或对象的引用值发生变化), **默认是pure**
- **impure管道**：在每次变化检测期间都会执行，如鼠标点击或移动都会执行impure管道

```javascript
@Pipe({
  name: 'myCustomPipe', 
  pure: false/true        // <----- here (default is `true`)
})
export class MyCustomPipe {}
```

- `<p> {{'Hello' | translate }}<p>`
- `<p> {{'World' | translate }}<p>`

- If pipe is pure: there will be only one instance of the pipe. The transform method will be called twice but on the same instance.
- If pipe is impure: there will be two instances of the pipe.

[back to top](#top)

<h2 id="Async管道">4. Async管道</h2>

**Promise vs. Observables**

- Promise
  - 返回单个值
  - 不可取消的
- Observable
  - 随着时间的推移发出多个值
  - 可以取消的
  - 支持 map、filter、reduce 等操作符
  - 延迟执行，当订阅的时候才会开始执行

**可在模板使用asyn管道，它可以接受一个流作为输入并自动订阅流**

- 使用AsyncPipe可以直接在模板中使用Promise和Observable对象，而不用通过定义一个类的成员属性来存储返回的结果

[back to top](#top)

<h2 id="管道实现autocomplete">5. 案例1- 管道实现autocomplete</h2>

```javascript
// structure of class product
class Product {
  constructor(
    public id:number,
    public title:string,
    public price:number,
    public rating:number,
    public desc:string,
    public categories:Array<string>
  ){}
}
//\pipe\filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {
  transform(list: any[], filterField: string, keyword: string): any {
    if(!filterField || !keyword){ return list; }
    return list.filter(item => {
      let filterValue = item[filterField];
      return filterValue.indexOf(keyword)>=0;
    });
  }
}
//product.component.html
<input class="form-control" placeholder="请输入商品名称" [formControl]="titleFilter">
<div *ngFor="let product of products | filter: 'title': keyword">
//product.component.ts
private keyword: string;
private titleFilter: FormControl = new FormControl();
constructor() {
    this.titleFilter.valueChanges
                    .debounceTime(500)
                    .subscribe(value => this.keyword = value);
}
```
