## [Reactive Extensions for JavaScript (RxJS)](#top)

- [1. Reactive Extensions介绍](#Reactive-Extensions介绍)
- [2. rxjs的操作-Observable](#实例方法Operators)
  - [2.1 创建](#创建)
  - [2.2 转换](#转换)
  - [2.3 过滤](#过滤)
  - [2.4 组合](#组合)
  - [2.5 判断](#判断)
  - [2.6 错误处理](#错误处理)
  - [2.7 工具](#工具)
  - [2.8 计算](#计算)
  - [2.1 其他](#其他)
- [3. 案例](#案例)
    - [案例1：包装ajax调用](#案例1)
    - [案例2：包装语音音频 API](#案例2)

<h2 id="Reactive-Extensions介绍">1. Reactive Extensions介绍</h2>

Promises 欠缺如下能力：

- 不能生产多个值
- 不能重试
- 不能真正地玩转其它异步思想

Reactive Extensions（Rx）是对LINQ的一种扩展，他的目标是对异步的集合进行操作，也就是说，集合中的元素是异步填充的，比如说从Web或者云端获取数据然后对集合进行填充。Rx起源于Microsoft DevLabs小组的研究，他扩展了LINQ的一些特性，目前Rx支持多种平台如JavaScript，Windows Phone，ios，Android 。随着数据处理变得复杂，LINQ使得我们的处理逻辑变得简单清晰，同样地，随着越来越多的数据通过从云端异步获取，Rx使得这种异步数据处理操作变得简单和容易维护。

在处理静态集合数据方面，LINQ使用类似SQL的语法来操作和使用不同来源的数据。相反，Rx被设计出来用来处理将来才会填充好的集合，也就是说，集合类型定义好了，但是集合中的元素可能在未来的某一时刻才会被填充。

LINQ和Rx在技术上有很多相似的地方。在LINQ对集合进行一系列操作如添加，移除，修改，提取后，会得到一个新的集合，新集合只是原始集合的一个修改版本。Rx也是一样，集合和数据流看起来非常不同，但是他们在很多关键的地方有联系，这就是我们将数据流称之为未来的集合的原因。集合和数据流都是多数据按某种顺序进行排列。LINQ和Rx可以这些序列进行一系列操作然后得到一个新的序列。

Rx提供了一种新的组织和协调异步事件的方式，例如协调多个从云端返回的多个异步的数据流。Rx能够是的我们用一个简单的方式来处理这些数据流，极大的简化了代码的编写。例如，.NET中传统的Begin/End异步编程模式在处理单个异步操作时可以应付，但是如果同时多个异步调用时，线程控制就会使得代码变得比较复杂。使用Rx，Begin/End模式就变成了一条简单的方法，这使得代码更加清晰和容易理解。

Reactive Extensions（Rx）is a library for composing **asynchromous** and **event-based** programs using observable sequences and LINQ-style query operators.

Rx最显著的特性是使用可观察集合(Observable Collection)来达到集成异步(composing asynchronous)和基于事件(event-based)的编程的效果。Rx有一些几个特性。

- 组合(Composing): Reactive Extension的首要目标之一就是将多种异步操作组合起来是的代码更加简单。要做到这一点，数据流必须定义清楚，这样代码就很清晰集中，使得异步操作代码异步处理代码不会充斥整个应用程序。
- 异步(Asynchronous): 虽然Rx不仅仅能处理异步操作，但是使用Rx，大大简化了异步操作的实现，并且代码容易理解进而容易维护。
- 基于事件(Event-based): Rx简化了传统的异步编程方式
- 可观察集合(Observable collections): Obervable Collection是Rx的核心，它是一种集合，集合的元素在第一次访问的时候肯能还没有填充。它对与Rx的重要性类始于enumerable集合对LINQ的重要性

**rxjs介绍**

rxjs全名Reactive Extensions for JavaScript，Javascript的响应式扩展, 响应式的思路是把随时间不断变化的数据、状态、事件等等转成可被观察的序列(Observable Sequence)，然后订阅序列中那些Observable对象的变化，一旦变化，就会执行事先安排好的各种转换和操作

rxjs适用于异步场景，即前端交互中接口请求、浏览器事件以及自定义事件。

- 统一异步编程的规范，不管是Promise、ajax还是事件，通通封装成序列(Observable Sequence)，一旦有异步环节发生变更，观察序列即可截获发生变更的信息
- 前端业务层和展现层解耦，比如展现层不需要关系指定事件触发时和DOM无关的处理逻辑。同时业务层也能组装异步操作中多个异步逻辑之间的关系，无需暴露给展现层。展现层关心的是：异步操作其中环节的数据变化
- rxjs开发业务层具有高弹性，高稳定性，高实时性等特点
- Rxjs的基础就是observer观察这模式，但是单个数据的流确是Iterator模式（这个包装转化也可以转化为observer模式）,也就是说rxjs的基础的Observable其实是observer模式和Iterator模式的混合

[back to top](#top)

<h2 id="实例方法Operators">2. rxjs的操作-Observable</h2>

![](http://i.imgur.com/ZYUr0YG.png)

**rxjs的几个实例概念**

- **Observable**: 可观察的数据序列.
- **Observer**: 观察者实例，用来决定何时观察指定数据.
- **Subscription**: 观察数据序列返回订阅实例.
- **Operators**: Observable的操作方法，包括转换数据序列，过滤等，所有的Operators方法接受的参数是上一次发送的数据变更的值，而方法返回值我们称之为发射新数据变更.
- **Subject**: 被观察对象.
- **Schedulers**: 控制调度并发，即当Observable接受Subject的变更响应时，可以通过scheduler设置响应方式，目前内置的响应可以调用Object.keys(Rx.Subject)查看。

**Observable四个生命周期**

- **创建**:  创建Obervable，返回被观察的序列源实例，该实例不具备发送数据的能力，相比之下通过new Rx.Subject创建的观察对象实例具备发送数据源的能力
- **订阅**:  通过序列源实例可以订阅序列发射新数据变更时的响应方法（回调方法）
- **执行**:  响应的动作实际上就是Observable的执行
- **销毁**:  通过序列源实例可以销毁，而当订阅方法发生错误时也会自动销毁

方法|说明
---|---
创建|`Rx.Observable.create`，通常还使用创建操作符, <br>如 `of，from， interval`, 等来创建Observable
订阅|`observable.subscribe(x => console.log(x));`
执行|只有在被订阅之后Observable才会执行，<br>执行的逻辑在`Observable.create(function subscribe(observer) {...})`中描述，<br>执行后将会在特定时间段内，同步或者异步地成产多个数据值
终止|Observable的执行可能是无限的，作为观察者需要主动中断执行, <br>`subscription.unsubscribe();`

- **订阅:**
  - 调用subscribe的观察者并不会共享同一个Observable。观察者调用`observable.subscribe` 时，`Observable.create(function subscribe(observer) {...})`中的subscribe会在调用它的观察者作用域中执行。每一次observable.subscribe的调用，都是彼此独立的
  - 订阅Observable如同调用函数，需要提供相应的回调方法
  - 订阅机制与处理事件的`addEventListener` / `removeEventListenerAPI`完全不同。通过`observable.subscribe`，观察者并不需要在Observable中进行注册，Observable也不需要维护订阅者的列表
  - 订阅后便进入了Observable的执行阶段，在执行阶段值和事件将会被传递给观察者供其消费
- **Observable在执行过程中**，可以推送三种类型的值：
  - "Next" 通知： 实际产生的数据，包括数字、字符串、对象等
  - "Error" 通知：一个JavaScript错误或者异常
  - "Complete" 通知：一个不带有值的事件
  - "Next"会在执行阶段推送多个，但"Error"和"Complete"仅会在执行阶段推送其一，并不会同时推送错误和完成通知

序列源实例的catch方法可以捕获订阅方法发生的错误，同时序列源实例可以接受从catch方法返回值，作为新的序列源实例

> 未使用Observable的案例

```javascript
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-authetication',
  templateUrl: `<input type="text" id="search" class="form-control" />`,
})
export class AppComponent implements OnInit {
  constructor() {
    //防止用户输入过快，导致发送请求过于频繁，send too many request
    var debounced = _.debounce(function(text) {
      var url="...";
      $.getJSON(url, function(artists){ console.log(artists);})
    }, 400);
    $("#search").keyup(function(e) {
      var text = e.target.value;
      if(text.length < 3) return;    //防止用户还未输入完毕就发送请求
      debounce(text);
    });
  }
}
```

> 缺点： 过多的callback

```javascript
//使用Observable后
import Observable from 'rxjs/Observable';
var keyups = Observable.fromEvent($("#search"),"keyup")
                       .map(e => e.target.value)
                       .filter(text => text,length>=3)
                       .debounceTime(400)
                       .distinctUntilChanged()         //erase duplicate word
                       .flatMap(searchItem => {        // switch to another stream
                          var url ="http://....";
                          var promise = $.getJSON(url);            //wrap to promise
                          return Observable.fromPromise(promise);  //wrap promise to Observable
                       });
var subscription = keyups.subscribe(data => console.log(data));     //subscribe data, handle with data
subscription.unsubscribe();                                         //
//最简单的例子 2 - how to use Ajax in angular 2
export class PostService{
  private url ="...";
  constructor(private _http:Http){}
  getPost(){
    return this._http.get(this.url).map(res => res.json());
  }
}
//use in component
import { HTTP_PROVIDERS } from 'angular2/http';
import {PostService } from './post.service';
@Component({
  //...
  providers: [PostService, HTTP_PROVIDERS]
})
export class AppComponent implement OnInit {
  constructor(private _postService: PostService){ }
  ngOnInit(){     // usually put in OnInit trigger
    this._postService.getPosts()
                     .subscribe(posts => console.log(posts));
  }
}
//最简单的例子 3
const source = Rx.Observable.fromPromise(new Promise(resolve => resolve(1)));   //emit 1 from promise
const example = source.map(val => val + 10);  //add 10 to the value
const subscribe = example.subscribe(val => console.log(val));  //output: 11
/*2) Rx.Observable是Observable
  Rx.Observable.create创建序列源source，创建source的方法有多个，比如of, from, fromPromise等
  observer是Observer观察者，只有在Rx.Observable.create创建方法可以获取，其他创建方法内置了observer且不可访问
  observer.next发射数据更新
  source.map其中map就是Operators的其中一个方法，方法调用返回新的source1
  source1.subscribe是订阅，即数据更新时的响应方法。同时返回订阅实例Subscription
  subscription.next立即响应（不同于发射）静态数据，此时不会经过`Operators`处理
  ! Rx.Observable.create或者Rx.Subject.create创建的source不会自动关闭，其他方式则当检测到没有序列发生变更会自动销毁source.
*/
import Rx from 'rxjs';
const source = Rx.Observable.create(observer => {    //创建
  observer.next('foo');
  setTimeout(() => observer.next('bar'), 1000);
});
const source1 = source.map(val => `hello ${val}`);
const subscription = source1.subscribe(value => console.log(value));
subscription.next('foo1');
const promise = source1.forEach(value => console.log(value)); // forEach和subscribe相似，同是实现订阅效果，等到promise可以监控subscription完成和失败的异常。
promise.then(() => console.log('complete'), (err) => console.log(err));  // 日志打印并没有comlete, 因为source并没有完成关闭，触发调用observer.complete()
/**
  output:
  hello foo
  foo1
  hello foo
  hello bar
  hello bar
*/
/*new Subject创建被观察者实例，同source一样都具备subscribe方法，表示的含义和作用也一样，即发射数据变更时响应方法。
  subject.next立即发射数据变更，作用同observer.next
  注意foo1是最后输出的，是因为在创建source时指定了Rx.Scheduler.async，是异步的调度器，表示在响应数据处理时是异步执行的
*/
 Rx.Observable.of('foo1', Rx.Scheduler.async).subscribe(value => console.log(value));
 const subject = new Subject();
 const source2 = subject.map(val => `hello ${val}`);
 const subscription = source1.subscribe(value => console.log(value));
 subject.next('foo');
 subscription.next('bar');
 /**
   output:
   hello foo
   bar
   foo1
 */
```

[back to top](#top)

<h2 id="实例方法Operators">2. 实例方法Operators</h2>

Operators方法调用时，接收的参数是source，返回新的source, 以下是个人学习使用过程中，简单总结的rxjs各方法用法。

<h3 id="创建">2.1 创建</h3>

- 发射完数据更新自动关闭：from, fromPromise, of, from, range
- 不发射直接关闭：empty
- 抛出异常后关闭：throw
- 不发射数据也不关闭：never
- 保持发射数据且不自动关闭：timer, interval, fromEvent
- 需要手动发射数据且不自动关闭：create, (还有Rx.Subject.create)

<h3 id="转换">2.2 转换</h3>

![](http://i.imgur.com/DNJ7xDf.png)

- 1:1效果：map, mapTo, flatMap, scan, expand, pluck
  - map，source = source1.map(func)表示source1每次发射数据时经过func函数处理，返回新的值作为source发射的数据
  - mapTo，不同于map，func改为静态值
  - flatMap，当发射的数据是一个source时，在订阅的响应方法中接收到的也是一个source（这是合理的，发射什么数据就响应什么数据嘛，但是如果我们想在响应方法收到的是source的发射数据），flatMap就是可以允许发射数据是一个source，同时在响应的时候接收的是source的发送数据，后面我们称之为**source打平**
  - scan，source = source1.scan(func, initialValue), source每次发射的数据是source前次发射数据和source1当前发射的数据 的组合结果（取决于func，一般是相加), initialValue第一次发射，source前次没发射过，采用initialValue作为前次发射的数据
  - expand|，和scan不同的是当func返回值是一个source时，在func接收到的数据是source打平后的发射数据。**特别适用于polling长轮询**
  - pluck，每次发射数据时，获取数据中的指定属性的值作为source的发射数据
- 1:N效果：concat, concatAll, concatMap, concatMapTo, merge, mergeAll, mergeMap, mergeMapTo, switchMap, switchMapTo
  - concat, concatAll和merge, mergeAll属于组合类型，放在这讲更好体现其效果。
  - concat，source = source1.concat(source2)表示source发射数组的顺序是，当source1或source2发射数据，source就发射。但是只有当source1发射完且关闭(source1不在发送数据)后，才触发source2发射数据。
  - concatAll，不同于concat，会把所有的发射的数据打平（如果数据为source时），然后在决定下次发射哪个数据。
  - concatMap，source = source1.concatMap(source2)表示source1每次发射数据时，获取source2的所有发射数据，map返回多个待发射数据，按顺序发射第一个数据变更。
  - concatMapTo, 不同于concatMap, map处理以source2的数据为返回结果
  - switchMap, 和concatMap不同的是在map之后的待发射数据排序上，concatMap中source1每次发射时source2的所有发射数据都接收，作为source1下一次发射前，之间的所有发射数据。switchMap则会判断source2的所有发射数据是否有数据的发射时间比source1下一次发射的时间晚，找出来去除掉。
  - switchMapTo对switchMap就好比concatMap对concatMapTo, mergeMap对比mergeMapTo的关系也是如此。
  - mergeMap相比于switchMap，找出的数据会打平到source中，不丢弃。
- N:1效果：buffer, bufferCount, bufferTime, bufferWhen
  - buffer，source = source1.buffer(source2)表示source1以source2为参考，在source2的2次发射数据之间为时间段，source才发射一次数据，数据为该时间段内source1本该发射的数据的组合。
比如source1原先每隔1秒发射一次数据，source2是每个2秒发射数据，source = source1.buffer(source2), 那么source会每隔2秒发射数据（source1的2秒内发射的2个数值组成的数组）
  - bufferCount，source = source1.bufferCount(count, start), count表示source1毎3次发射数据作为source的一次发射数据，发射完后，以source1当前组合的发射数据的第start个开始算下次发射数据需要组合的起始数据。
  - bufferTime，一段时间内的source1发射数据作为source的一次发射数据
  - bufferWhen, 以默认结果为准分成2段，分别作为source的每次发射数据
- 1:source效果：groupBy, window, windowCount, windowTime, windowWhen
  - groupBy, source = source1.groupBy(func), 表示source1的所有发射数据，按func分成多段，每段作为source的每次发送的数据（这里数据只是新的source，你可以理解为inner Observable实例)
  - window和buffer不同的时，source每次发送的是innerObservable
  - window vs windowCount vs windowTime vs windowWhen 同 buffer相似
- 1:sources效果：partition
  - partition，sources = source1.partition(func), 根据func吧所有的source1发射数据分段，每段组成一个source，最终得到sources数组

**switchMap, flatMap, concatMap 的区别**

三个操作符都可以传入第二个selector callback 参数，flatMap还可以传第三个参数限制并行处理的数量。

```javascript
//前一个完成后，第二个才会发出，有顺序
concatMap = .map(fn).concatAll()
//下一个发出，则退订前一个。前一个成功也好，失败也好，不会造成任何side-effect了
switchMap = .map(fn).switch()
// 其实就是mergeMap, mergeAll(), 有摊平的observable的效果，并行处理多个流。可能重叠
flatMap = .map(fn).flatAll()

source : -----------c--c------------------...
        concatMap(c => Rx.Observable.interval(100).take(3))
example: -------------0-1-2-0-1-2---------...

source : -----------c--c-----------------...
        concatMap(c => Rx.Observable.interval(100).take(3))
example: -------------0--0-1-2-----------...

source : -----------c-c------------------...
        concatMap(c => Rx.Observable.interval(100).take(3))
example: -------------0-(10)-(21)-2----------...
```

[back to top](#top)

<h3 id="过滤">2.3 过滤</h3>

source的过滤不会对发射数据做任何改变，只是减少source的发射次数，所以理解起来会简单很多，这里只做个简单分类

- 防抖动（一段时间内只取最新数据作为一次发射数据，其他数据取消发射）：debounce, debounceTime, throttle(和debounce唯一区别是debounce取一段时间内最新的，而throttle忽略这段时间后，发现新值才发送）, throttleTime
- 去重（重叠的发射数据只去第一数据作为发射数据，其他相同数据取消发射）：distinct, distinctUntilChanged
- 定位（根据条件值去一个或部分几个数据作为对应发射数据，其他取消发射）：elementAt, first, last, filter, take, takeLatst, takeUntil, takeWhile,
- 跳过（根据条件去除符合条件的，取剩下的值作为每次发射数据）：skip, skipUntil, skipWhile, ignoreElements(忽略所有的，等同于empty)
- 样本：sample, source=source1.sample(source2), 以source2发射数据时来发现最新一次source1发射的数据，作为source的发射数据，个人觉得应该属于**转换**分类，官网放到了**过滤**

[back to top](#top)

<h3 id="组合">2.4 组合</h3>

做个source组合成新的souce

- concat, concatAll和merge, mergeAll，在**转换**分类讲过了
- combineLastest，source = source1.combineLastest(source2, func)，source1和source2一旦发射数据，func会触发，拿到source1和source2最新的发射数据，返回新的数据，作为source的发射数据。
- combineAll，同combineLastest，，source = sources.combineAll()
- forkJoin，source = Rx.Observable.forkJoin(sources), 所有的sources都关闭后，获取各自最新的发射数组组合为数组，作为source的发射数据
- zip和forkJoin的区别是，zip是sources都有发送数据时，组合为一个数组作为source的发送数据，而sources任一source关闭了，则取source最后发射的数值。
- zipAll，同concat对concatAll
- startWith，source = source1.startWith(value), 表示在source1的最前面注入第一次发射数据
- withLastestFrom, soruce = source1.withLastestFrom(source2, func), 表示source1每次发射数据时，获取source2最新发射的数据，如果存在则func处理得到新的数组作为source的发射数据

[back to top](#top)

<h3 id="判断">2.5 判断</h3>

- find和findIndex分别是指定发射数据和发射数据的下标（第几次发送的），应该放到**过滤**分类才合理
- isEmpty, every, include等，判断是否为真，判断的结果当做是source的发射数据

[back to top](#top)

<h3 id="错误处理">2.6 错误处理</h3>

- catch，source在Operators调用过程中出现的异常，都可以在catch捕获到，同时可以返回新的source，因为出现异常的当前source会自动销毁掉。
- retry，source = source.retry(times), source的所有发射，重复来几遍。
- retryWhen，根据条件来决定来几遍，只有当条件为false时才跳出循环。

[back to top](#top)

<h3 id="工具">2.7 工具</h3>

- do，在每次响应订阅前，可以通过source.do(func)，做一些提前处理等任何动作，比如打印一下发射的数据等。
- delay, delayWhen，每次发送数据时，都延迟一定时间间隔后再发送。
- observeOn, 设置scheduler,即发射数据的响应方式，Schedulers详细查看地址, 这里不讲解了，项目中应用得不多。
- subcribeOn, timeInterval设置sheduler
- toPromise, source转成promise，可以通过promise.then达到source.subscribe的效果
- toArray，把source所有发射的数据，组成数组输出。

[back to top](#top)

<h3 id="计算">2.8 计算</h3>

把source的所有发射数据进行指定计算后，得出的数据作为新source的发射数据，计算方法分别有：max, min, count, reduce, average等

[back to top](#top)

<h3 id="其他">2.9 其他</h3>

- cache, source = source1.cache(1);共享source1的订阅结果，即不管source订阅几回，响应方法接收到的发射数据都是同一份。
- 共享source订阅结果很重要，因为**组合**等方法组合多个source时，其中包含sourceA，同时sourceA还需要单独订阅其结果，在不用cache情况下，sourceA会产生2个subscription，即2个订阅实例，但是我们更希望是能达到sourceA发生变化时，都能通知到所有的组合sourceA的source。
- publish，publishSource = source.publish(),让source的订阅的工作延后，即source不会发射数据，而是等到publishSource.connect()调用后才开发发射数据。效果和delay很相似，不同的是可以控制合适发射。
- share，当source订阅多次，那么每次响应时do都会调用多次，通过share合并响应，则source发射一次数据更新，多次响应当当一次响应处理，do也调用一次。

[back to top](#top)

<h2 id="案例">3. 案例</h2>

<h3 id="案例1">案例1：包装ajax调用</h3>

```javascript
let stream = Rx.Observable.create((observer) => {
   let request = new XMLHttpRequest();
   request.open('GET', 'url');
   request.onload = () => {
    if(request.status === 200) {    //1)发出数据
        observer.next( request.response );   //1)发出数据
        observer.complete();          //3)关闭流
     }else {
        observer.error('error happened');   //2)处理潜在的错误
     }
   }
   request.onerror = () => {
       observer.error('error happened')     //2)处理潜在的错误
   }
   request.send();    //1)发出数据
})
stream.subscribe(    //使用数据
   (data) => console.log(data)
)
```

[back to top](#top)

<h3 id="案例2">案例2：包装语音音频 API</h3>

- 点击按钮激活`heyClick$`
- `speechRecognition$`监听我们说了什么并把结果发送给`heyClick$`的转换逻辑
- 转换逻辑的结果将由`say Observable`发出声音

```javascript
console.clear();
const { Observable } = Rx;
const speechRecognition$ = new Observable(observer => {   //激活浏览器的麦克风并记录我们的语音
   const speech = new webkitSpeechRecognition();
   speech.onresult = (event) => {
     observer.next(event);
     observer.complete();
   };
   speech.start();
   return () => {
     speech.stop();  //清理
   }
});
const say = (text) => new Observable(observer => {   //语音合成, say
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.onend = (e) => {
    observer.next(e);
    observer.complete();
  };
  speechSynthesis.speak(utterance);
});
const button = document.querySelector("button");
const heyClick$ = Observable.fromEvent(button, 'click');
heyClick$                                    //主体流 hey$
  .switchMap(e => speechRecognition$)
  .map(e => e.results[0][0].transcript)
  .map(text => {
    switch (text) {
      case 'I want':
        return 'candy';
      case 'hi':
      case 'ice ice':
        return 'baby';
      case 'hello':
        return 'Is it me you are looking for';
      case 'make me a sandwich':
      case 'get me a sandwich':
        return 'do it yo damn self';
      case 'why are you being so sexist':
        return 'you made me that way';
      default:
        return `I don't understand: "${text}"`;
    }
  })
  .concatMap(say)
  .subscribe(e => console.log(e));
```

> Reference

- [rxjs官网]https://rxjs-dev.firebaseapp.com/)
- [rxjs官网Sample](https://github.com/Reactive-Extensions/RxJS/tree/master/examples)
- [rxjs官网的github，在reactiveX下面，已经到6版本了 RxJS: Reactive Extensions For JavaScript](https://github.com/reactivex/rxjs)
- [Reactive Extensions介绍](http://www.cnblogs.com/shanyou/p/3233894.html)
- [rxjs简单入门](https://yq.aliyun.com/articles/65027)
- [常用rxjs方法的交互图](http://rxmarbles.com/)
- [rxhjs教程](http://xgrommx.github.io/rx-book/content/observable/observable_instance_methods/toarray.html)
- [rxjs5的中文gitbook，略老但排版好看，适合入门](https://rxjs-cn.github.io/rxjs5-ultimate-cn)
- [rxjs 英文官网，关于如何迁移到版本6](https://rxjs-dev.firebaseapp.com/guide/v6/migration)
- [rxjs 中文翻译官方文档 比较全，翻译的一般般吧。。。](https://cn.rx.js.org/manual/usage.html)
- [一个博客上关于rxjs的系列入门文章，英文的](https://alligator.io/rxjs)
- [hot-cold-observables，什么是热的观察对象，什么是冷的observable，怎么warm up](https://alligator.io/rxjs/hot-cold-observables/)
- [30 天精通 RxJS 系列](https://ithelp.ithome.com.tw/users/20103367/ironman/1199)
