[RxJS笔记之switchMap, concatMap, mergeMap和exhaustMap](#top)

- [switchMap](#switchmap)
- [concatMap](#concatmap)
- [mergeMap](#mergemap)
  - [mergeMap的第三参数](#mergemap%E7%9A%84%E7%AC%AC%E4%B8%89%E5%8F%82%E6%95%B0)
- [exhaustMap](#exhaustmap)
- [第二个参数： resultSelector callback](#%E7%AC%AC%E4%BA%8C%E4%B8%AA%E5%8F%82%E6%95%B0-resultselector-callback)

**use sample**

- both are transformation Operators, no need to use Rx.Observable.from

```javascript
function getPostData() {
    return fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => res.json())
}
var source = Rx.Observable.fromEvent(document.body, 'click');
var example = source.concatMap(     // switchMap, mergeMap,
                    e => Rx.Observable.from(getPostData()));
example.subscribe({
    next: (value) => { console.log(value); },  //此时的value是整个res
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
```

[back to top](#top)

## switchMap

- **Cancels** the current subscription/request and can **cause race condition**
- Use for get requests or cancelable requests like searches
- 每次点击页面就会送出一个HTTP request
- 如果快速的连续点击，每次发送都会退订前一个未处理完的observable，故最后只返回一个log
- [Sample on Jsfiddle](https://jsfiddle.net/t2zxtuh0/4/)

[back to top](#top)

## concatMap

- Runs subscriptions/requests **in order** and is less performant
- Use for get, post and put requests when order is **important**
- 每次点击页面就会送出一个HTTP request
- concatMap先处理前一个送出的observable再处理下一个observable
- 如果快速的连续点击，每个request是等到前一个request完成才会送出下一个request
- 每次点击返回一个response，每个点击都有返回一个log
  - 默认情况下返回整个response
  - 加入参数会选择内容返回
- [Sample on Jsfiddle](https://jsfiddle.net/t2zxtuh0/2/)

[back to top](#top)

## mergeMap

- Runs subscriptions/requests **in parallel**
- Use for put, post and delete methods when order is not important
- 每次点击页面就会送出一个HTTP request
- 如果快速的连续点击, 发送的时间点是有机会重叠的
- [Sample on Jsfiddle](https://jsfiddle.net/t2zxtuh0/5/)

[back to top](#top)

### mergeMap的第三参数

- 來限制並行處理的數量
- 下面例子中，如果快速的连续点击, 第4次点击是在第一次点击完成后发送的

```javascript
function getPostData() {
    return fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => res.json())
}
var source = Rx.Observable.fromEvent(document.body, 'click');
var example = source.mergeMap(
                e => Rx.Observable.from(getPostData()),
                (e, res, eIndex, resIndex) => res.title, 3);
                //并行数是3， 最多只能同時送出3個，並且要等其中一個完成在處理下一個
example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
```

[back to top](#top)

## exhaustMap

- **Ignores** all subsequent subscriptions/requests until it completes
- Use for login when you do not want more requests until the initial one is complete
- 不是每次点击页面点都会送出一个HTTP request
- 如果快速的连续点击，在第一个发送未完成之前的其他点击均无效（不发送request）

[back to top](#top)

## 第二个参数： resultSelector callback

```javascript
public concatMap/switchMap(
    project: function(value: T, ?index: number): ObservableInput,
    resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any
    ): Observable`
```

這個callback會傳入四個參數，分別是:

- 外部 observable 送出的元素
- 內部 observable 送出的元素
- 外部 observable 送出元素的 index
- 內部 observable 送出元素的 index
- 非常适合用在response要取的值跟前一个时间或index相关时候
- [Sample on Jsfiddle](https://jsfiddle.net/t2zxtuh0/3/)

```javascript
function getPostData() {
    return fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => res.json())
}
var source = Rx.Observable.fromEvent(document.body, 'click');
var example = source.concatMap(
                e => Rx.Observable.from(getPostData()),
                (e, res, eIndex, resIndex) => res.title);
example.subscribe({
    next: (value) => { console.log(value); },   //此时的value是res.title
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
```

[back to top](#top)

> reference
> - [30 天精通 RxJS(18): Observable Operators - switchMap, mergeMap, concatMap](https://ithelp.ithome.com.tw/articles/10188387)
