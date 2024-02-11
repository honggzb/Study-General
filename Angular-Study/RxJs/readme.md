```
│   ├── 📂RxJs
│   │   ├── 📂RxJS in Angular-Reactive Development-Deborah Kurata/
│   │   │   └──📄readme.md
│   │   ├── 📄Observable之Subject.md
│   │   ├── 📄RxJS笔记-Reactive Extensions for JavaScript (RxJS).md
│   │   ├── 📄RxJS笔记之Subject.md
│   │   ├── 📄RxJS笔记之switchMap, concatMap, mergeMap和exhaustMap.md
│   │   ├── 📄SwitchMap之call another observable with parameter
│   │   ├── 📄避免多次调用之Rxjs subject to avoid multiple calling.md
│   │   └── 📄避免多次调用之share+shareReplay.md
```

|Obseevable|Promise|
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

> Resources

- http://reactivex.io/rxjs/manual/overview.html
- [rxjs官网](https://rxjs-dev.firebaseapp.com/)
- [rxjs官网Sample](https://github.com/Reactive-Extensions/RxJS/tree/master/examples)
- RxJS sample Animation
  - [Animated playground for Rx Observables](https://rxviz.com/)
  - [Interactive diagrams of Rx Observables](https://rxmarbles.com/)
- [30天精通RxJS系列](https://ithelp.ithome.com.tw/articles/10188387)
