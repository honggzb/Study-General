[AngularJS学习之Promise复习](#top)

- [Promise的三种状态](#promise的三种状态)
- [promise状态转换](#promise状态转换)
- [promise方法](#promise方法)

-------------------------------------------------------------------

- Promise对象用于标识一个异步操作的最终完成（或失败）及其结果值, 这样使得异步方法可以像同步方法那样返回值：异步方法并不会立即返回最终的值，而是会返回一个 promise，以便在未来某个时候把值交给使用者。

## Promise的三种状态

一个Promise必然处于以下几种状态之一：

- 待定(pending)：初始状态，既没有被兑现，也没有被拒绝。
- 已兑现(fullfilled)：操作成功完成。
- 已拒绝(rejected)：操作失败
- ![promise状态转换](promise状态转换.png)

## promise状态转换

- `Promise.prototype.then()`、`Promise.prototype.catch()` 和 `Promise.prototype.finally()` 这些方法将进一步的操作与一个变为已敲定状态的`promise`关联起来
- `.then()` 方法需要两个参数，第一个参数作为处理已兑现状态的回调函数，而第二个参数则作为处理已拒绝状态的回调函数。每一个 .then() 方法还会返回一个新生成的 promise 对象，这个对象可被用作链式调用
- `.catch()` 其实只是没有给处理已兑现状态的回调函数预留参数位置的 `.then()` 而已
  - Promise 对象的 catch（） 方法调度在 promise 被拒绝时要调用的函数。它会立即返回一个等效的 Promise 对象，允许您将调用链接到其他 promise 方法。
  - catch()是then(null,失败调的函数)的别名,用于指定发生错误时的回调函数
- `.finally（` 方法调度在 promise 结算（履行或拒绝）时调用的函数。它会立即返回一个等效的 Promise 对象，允许您将调用链接到其他 promise 方法。`finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作

```js
function asyncMethod(){
    return new Promise((resolve,reject)=>{
      console.log("异步方法");
    })
}
asyncMethod.then(res=>{
                console.log(res);})
           .catch(rej=>{
                console.log(rej);})
           .finally(fina=>{
                console.log();
}});
```

## promise方法

|方法|说明|
|---|---|
|`Promise.all（）`|将承诺的迭代对象作为输入并返回单个 [Promise]。当输入的所有 [Promise]都实现时（包括传递空可迭代对象时），此返回的 [Promise]将满足，并具有实现值数组。当任何输入的 [Promise]被拒绝时，它会拒绝，这是第一个拒绝原因|
|Promise.allSettled（）|将承诺的可迭代对象作为输入并返回单个 [Promise]。当所有输入的[Promise]都稳定时（包括传递空的可迭代对象时），此返回的[Promise]将实现，其中包含描述每个[Promise]结果的对象数组<br>用于接受一组 Promise 实例作为参数，该方法返回的新的 Promise 实例，一旦结束，状态总是成功的。新的promise实例是一个数组，里面包含了多个对象，只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束<br>当不关心异步操作的结果，只关心这些操作有没有结束时，all()方法就不能实现|
|Promise.any（）|将 promise 的可迭代对象作为输入并返回单个 [Promise]。当输入的任何承诺实现时，此返回的承诺将实现，并具有第一个履行值。当输入的所有承诺都拒绝时（包括传递空可迭代对象时），它拒绝，并且 [AggregateError]包含一系列拒绝原因<br>该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态|
|Promise.race（）|将承诺的迭代对象作为输入并返回单个 [Promise]。这个返回的承诺随着第一个承诺的最终状态而解决<br>Promise.race就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态|
