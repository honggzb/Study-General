- [$apply，$digest，$watch的区别](#applydigestwatch%E7%9A%84%E5%8C%BA%E5%88%AB)
- [$watch, $watchGroup, $watchCollection](#$watch,-$watchGroup,-$watchCollection
- [$watch单一的变量](#watch%E5%8D%95%E4%B8%80%E7%9A%84%E5%8F%98%E9%87%8F)
- [$watch多个变量](#watch%E5%A4%9A%E4%B8%AA%E5%8F%98%E9%87%8F)
- [$watch对象或数组](#watch%E5%AF%B9%E8%B1%A1%E6%88%96%E6%95%B0%E7%BB%84)
- [$watch函数的返回结果](#watch%E5%87%BD%E6%95%B0%E7%9A%84%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C)
- [取消$watch](#%E5%8F%96%E6%B6%88watch)

## $apply，$digest，$watch的区别

- `$apply` （通知）
- `$digest`（循环）
- `$watch`（监听）

angular在监听数据变化并执行双向绑定时一定会做的事情：

- 通知（$apply）angular，告诉他有一个函数test（$apply(test)），需要他帮忙做下脏检查（$digest脏检查），在做脏检查的同时监听数据变化（$watch）并反映到view中
- 当不在angular上下文中的时候，则需要你手动$apply。如果不做$apply虽然angular能够监听数据变化，但他并不会将数据及时更新到view，因为他并不知道你的数据在什么时候是最新的

## $watch, $watchGroup, $watchCollection

`$watch(watchExpression, listener, objectEquality);`

- watchExpression：监听的对象，它可以是一个angular表达式如'name',或函数如function(){return $scope.name}。
- listener:  当watchExpression变化时会被调用的函数或者表达式,它接收3个参数：newValue(新值), oldValue(旧值), scope(作用域的引用)
- objectEquality：是否深度监听，如果设置为true,它告诉Angular检查所监控的对象中每一个属性的变化. 如希望监控数组的个别元素或者对象的属性而不是一个普通的值, 那么应使用它


`$watchGroup(watchExpressions, listener);`

- watchExpressions是数组类型,  **第一个参数要传数组**
- 如果要监听多个变量就要写很多个watch，这显然不是很好的作用。使用$watchGroup可同时监听多个变量，**如果任一一个变量发生变化就会触发listener**
- 要同时监视多个变量并执行同一逻辑使用$watchGroup

`$watchCollection(obj, listener);`

- **第一个参数要传对象**
- 针对对象属性的浅层监视(Shallow Watch)，当属性发生变化时触发(对于数组，指的是监视数组的元素；对于字典对象，指的是监视其属性) 触发listener的回调操作

## $watch单一的变量

```javascript
$scope.count=1;
$scope.$watch('count',function(){
  //...
});
```

## $watch多个变量

```javascript
//将这几个变量转为字符串，以‘+’号隔开来进行监视
$scope.count=1;
$scope.page=1;
$scope.$watch('count + page',function(){   //当count或page变化时，都会执行这个匿名函数
//...
});
```

**优化1**： 上面的方法后续处理比较麻烦， 合理的方式是，**把变量打包成对象模式**

```javascript
$scope.$watch('{a:count, b:page}',function(){   //当count或page变化时，都会执行这个匿名函数
//...
});
```

**优化2**： 使用$watchGroup

```javascript
$scope.$watchGroup(['mselHour','mselMinute','chooseDate.value'],function(){
  if ($scope.timeType == 'm') {
    //...
  }
})
```

## $watch对象或数组

- watch函数其实是有三个变量的，第一个参数是需要监视的对象，第二个参数是在监视对象发生变化时需要调用的函数，实际上watch函数其实是有三个变量的，第一个参数是需要监视的对象，第二个参数是在监视对象发生变化时需要调用的函数，实际上watch还有第三个参数，它在默认情况下是false。 
- 当第三个参数是false时，其实watch函数监视的是数组的地址，

```javascript
$scope.items=[{a:1},{a:2}{a:3}];
$scope.$watch('items',function(){
  //...
},true);
//或将监听返回结果为JSON字符串形式的该对象或数组的的匿名函数
$scope.$watch(function(){
  return JSON.stringify($scope.items);
},function(){
  //...
});
```

## $watch函数的返回结果

```javascript
//未完成的任务个数
$scope.unDoneCount = function() {
    var count = 0;
    angular.forEach($scope.todoList, function(todo) {
        count += todo.done ? 0 : 1;
    });
    return count;
};
//单选影响全选部分
//方法1：监视对象为“函数名()”的字符串
$scope.$watch('unDoneCount()', function(nv) {  //记得加“()”
    $scope.isDoneAll = nv ? false : true;
});
//方法2：在监视对象中设置为匿名函数，返回要监视的函数的返回值
$scope.$watch(function(){
    return $scope.unDoneCount();   //不要忘了(),要执行的啊~
}, function(nv) {
    $scope.isDoneAll = nv ? false : true;
});
```

## 取消$watch

- `$watch`函数会返回一个释放`$watch`绑定的`unbind`函数。所以当我们不再需要watch改变的时候，我们可以easy的调用这个函数释放`$watch`
- `$scope.$watch`函数的返回值就是用于释放这个watcher的函数，如下面的单次绑定实现（one-time）

```javascript
//在chrome的控制台上，断点得到的$watch的返回值
function deregisterWatch() {
    arrayRemove(array, watcher);
    lastDirtyWatch = null;
}
```

一开始将$watch的返回值保存，要取消watch的时候，在调用

```javascript
var count=1;
var unbingWatch = $scope.$watch('todoList',function(){
    console.log('todoList change');
    count++;
    //在第5次todoList改变的时候,就不会输出todoList change
    if(count>4){
        unbingWatch();   //释放这个watcher的函数unbingWatch
    }
});
```
