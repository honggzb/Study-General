## $interval的用法

`$interval(fn,delay,[count],[invokeApply],[Pass]);`

- Fn是每次延迟时间后被执行的函数
- delay：每次调用的间隔毫秒数值
- count：循环次数的数值，如果没设置，则无限制循环
- invokeApply：如果设置为false，则避开脏值检查，否则将调用$apply
- Pass：函数的附加参数
- $interval函数的返回值是一个Promise

```javascript
$scope.timer = $interval( function(){
    $scope.backup("1");
  }, 10000);
//循环3次就自动停止循环
$scope.timer = $interval( function(){
    $scope.backup("1");
  }, 10000,3) 
//终止定时器, 执行完这项服务后应该把它销毁。
//特别是当controller或者directive元素被销毁时而$interval未被销毁。应该考虑到在适当的时候取消interval事件
$interval.cancel($scope.timer);
```

## $timeout的用法

`$timeout(fn,[delay],[invokeApply]);`

- Fn是每次延迟时间后被执行的函数
- delay：延迟的时间（毫秒）
- invokeApply：如果设置为false，则跳过脏值检测，否则将调用$apply
- 回值是一个promise，当到达设置的超时时间时，这个承诺将被解决，并执行timeout函数
  
```javascript
$scope.timer = $timeout(function(){
    $scope.backup("1");
  }, 10000);
//终止定时器, 执行完这项服务后应该把它销毁
$timeout.cancel($scope.timer);
```
