```
│   ├── 📂RxJs
│   │   ├── 📂RxJS in Angular-Reactive Development-Deborah Kurata/
│   │   │   └──📄readme.md
│   │   ├── 📄Observable之Subject.md
│   │   ├── 📄RxJS笔记-Reactive Extensions for JavaScript (RxJS).md
│   │   ├── 📄RxJS笔记之Subject.md
│   │   ├── 📄RxJS笔记之switchMap, concatMap, mergeMap和exhaustMap.md
│   │   ├── 📄SwitchMap之call another observable with parameter.md
│   │   ├── 📄Tips-use-rxjs-in-Angular.md
│   │   ├── 📄避免多次调用之Rxjs subject to avoid multiple calling.md
│   │   └── 📄避免多次调用之share+shareReplay.md
```

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

|Observable|Subject|
|---|---|
|unicast<br>each subscribed Observer owns an independent execution of the Observable|multicast<br>can be multicast to many Observers|
||like Event Emitters: they maintain a registry of many listeners|
|each subscribed observer has its own execution of the obsevable.<br>When you subscribe to an observable|maintain a list of observables(subscribed) <br> and notify all of them whenever a new value is emitted|
|Declarative, they represent a blueprint for a data stream<br>but not produce values until a subscriber subscribes to them|Imperative,they can produce values independently of whether there are any subscribers|
|do not have initial value.<br>They start emitting values only whne a subscriber is listenting|Some subjects, like BehaviorSubject, have initial value.<br>When subscribe to a BehaviorSubject, it will immediately emit the last value it received <br>or the initial value if no vlaue has been emitted yet to the subscriber|
|need to be explicitly subscribed to in order to start receiving data.<br>Subscriptions need to be managed carefully to avoid memory leaks by unscubscribing when no longer needed|require subscription management just like regular Observable<br>Properly unsubscribe from subjects when they are no longer needed to prevent memory leaks|
|Are genereally used when u want ot produce data in a lazy and declarative way, <br>such as handling HTTP requests, user input events, or other asynchronous data sources|Sre commonly used in secnarios where u want to multicast events or share data between subscribers,<br>such as inter-componentn communication or event broadcasting|

> Resources

- http://reactivex.io/rxjs/manual/overview.html
- [rxjs官网](https://rxjs-dev.firebaseapp.com/)
- [rxjs官网Sample](https://github.com/Reactive-Extensions/RxJS/tree/master/examples)
- RxJS sample Animation
  - [Animated playground for Rx Observables](https://rxviz.com/)
  - [Interactive diagrams of Rx Observables](https://rxmarbles.com/)
- [30天精通RxJS系列](https://ithelp.ithome.com.tw/articles/10188387)
