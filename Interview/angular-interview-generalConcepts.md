[Angular some concepts](#top)

- [Component Lifecycle](#component-lifecycle)
- [Interceptors and HTTPClient](#interceptors-and-httpclient)
- [Lazy Loading](#lazy-loading)
- [General concept](#general-concept)
- [RxJS](#rxjs)
- [Observable四个生命周期](#observable四个生命周期)
- [Subject](#subject)
- [NgRx](#ngrx)


## <mark>Component Lifecycle</mark>

|Phase|	Method	|Summary|
|---|---|---|
|Creation	|`constructor`|Standard JavaScript class constructor, Runs when Angular instantiates the component|
||`ngOnInit`|Runs once after Angular has initialized all the component's inputs.|
||`ngOnChanges`	|Runs every time the component's inputs have changed.|
||`ngDoCheck`	|Runs every time this component is checked for changes.|
|Change Detection|`ngAfterContentInit`|	Runs once after the component's content has been initialized.|
||`ngAfterContentChecked`|	Runs every time this component content has been checked for changes.|
||`ngAfterViewInit`|	Runs once after the component's view has been initialized.|
||`ngAfterViewChecked`|	Runs every time the component's view has been checked for changes.|
|Rendering|`afterNextRender`|Runs once the next time that all components have been rendered to the DOM.|
||`afterRender`|Runs every time all components have been rendered to the DOM.|
|Destruction|	`ngOnDestroy`|Runs once before the component is destroyed|

[⬆ back to top](#top)

## Interceptors and HTTPClient

Interceptors are generally functions which you can run for each request, and have broad capabilities to affect the contents and overall flow of requests and responses. You can install multiple interceptors, which form an interceptor chain where each interceptor processes the request or response before forwarding it to the next interceptor in the chain

You can use interceptors to implement a variety of common patterns, such as:

- Adding authentication headers to outgoing requests to a particular API
- Retrying failed requests with exponential backoff
- Caching responses for a period of time, or until invalidated by mutations
- Customizing the parsing of responses
- Measuring server response times and log them
- Driving UI elements such as a loading spinner while network operations are in progress
- Collecting and batch requests made within a certain timeframe
- Automatically failing requests after a configurable deadline or timeout
- Regularly polling the server and refreshing results

[⬆ back to top](#top)

## Lazy Loading

```js
// v18
const routes: Routes = [
  {
    path: 'items',
    loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)
  }
];
// before v15
const routes: Routes = [
  {
    path: '',     //note: this path must be '', otherwise can not load whole lazy module
    component: LazyComponent,
    children: [
      { path: 'lazypage', component: LazyPageComponent }
    ]
  }
];
```

[⬆ back to top](#top)

## General concept

|||
|---|---|
|Template|a template is a chunk of HTML. Use special syntax within a template to leverage many of Angular's features|
|Directives|classes that add additional behavior to elements in your Angular applications|
|Pipe|Pipes are a special operator in Angular template expressions that allows you to transform data declaratively|
|DI|"DI" is a design pattern and mechanism for creating and delivering some parts of an app to other parts of an app that require them|
|Routing|In a single-page app, you change what the user sees by showing or hiding portions of the display that correspond to particular components, rather than going out to the server to get a new page|
|Reactive forms|provide a model-driven approach to handling form inputs whose values change over time|

[⬆ back to top](#top)

## RxJS

- RxJS is a library for composing **asynchronous** and **event-based** programs by using observable sequences<br>
- RxJS combines the Observer pattern with the Iterator pattern and functional programming with collections to fill the need for an ideal way of managing sequences of events

## Observable四个生命周期

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

```js
var source = Rx.Observable.fromEvent(document.body, 'click');
var example = source.concatMap(     // switchMap, mergeMap,
                    e => Rx.Observable.from(getPostData()));
example.subscribe({
    next: (value) => { console.log(value); },  //此时的value是整个res
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
```

[⬆ back to top](#top)

## Subject

- An RxJS Subject is a special type of Observable that allows values to be **multicast** to many Observers
- Subject是微信公众号，Observable是微信用户
- 1个Subject可以对应n个不同的Observable，Observable只要向Subject要求接收，每次Subject的更新都能即时收到

```js
//------------------Observables are unicast-----------------
    //observable
    let observable = new Observable<number>(ele =>
      ele.next(Math.random()))
    //first subscriber
    observable.subscribe(result => {
      this.first_subscriber_observable = result;
      console.log(result)
    })
    //second subscriber
    observable.subscribe(result => {
      this.second_subscriber_observable = result;
      console.log(result)
    })
//------------------Subjects are multicast-----------------
    //subject
    let subject = new Subject<number>()
    //first subscriber
    subject.subscribe(result => {
      this.first_subscriber_subject = result;
      console.log(result)
    })
    //second subscriber
    subject.subscribe(result => {
      this.second_subscriber_subject = result;
      console.log(result)
    })
    subject.next(Math.random())
    //--------------------------------------------------------
```

## NgRx

![NgRx](./inmages/NgRx.png)
