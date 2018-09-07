Array的几个遍历的方法各有千秋

- map是为了返回值的，
- forEach是为了处理但不返回值的，
- filter是过滤值的
- jQuery中each

## 跳出循环

- for:  `continue`, `break`
- forEach:  该方法无法一次结束所有循环，需要一次性结束所有循环，还是老老实实使用for方法
    - `return fasle;`或`return;`  -> continue
    - no无跳出循环方法             -> break（参见下面，forEach的break异常跳出）
- jQuery中each:  JQuery是对象链，所以$(..).each()返回的还是对象集合。each(function(){})：是回调函数，在回调函数里不能返回结果到回调函数each外面
    - `return true`   -> continue
    - `return false`  -> break
- angular.forEach

```javascript
//https://github.com/angular/angular.js/issues/263
var keepGoing = true;
angular.forEach([0,1,2], function(count){
    if(keepGoing) {
        if(count == 1){
             keepGoing = false;
        }
     }
```

**扩展1**: for跳出多层循环

- for循环如果是多层循环 可以将循环命名，跳出指定的循环

```javascript
 first:     //需要将循环命名
  for(var i=0;i<10;i++){
    for(var j=0;j<5;j++){
         if(i==3 && j==4){
            break first;     //跳出循环first
         }
    }
```

**扩展2**: forEach的break异常跳出- 使用try-catch

```javascript
var myerror = null;
try{
    arr.forEach(function(el,index){
    if (el==20) {
        console.log("try中遇到20,能退出吗?");//
        foreach.break=new Error("StopIteration");
    }else{
        console.log(el);
    }
    });
}catch(e){
    console.log(e.message);
    if(e.message==="foreach is not defined") {
        console.log("跳出来了?");//
    return;
    }else throw e;
}
```
