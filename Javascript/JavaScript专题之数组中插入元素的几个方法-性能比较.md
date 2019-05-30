[JavaScript专题之数组中插入元素的几个方法-性能比较](#top)

- [向数组结尾添加元素](#%E5%90%91%E6%95%B0%E7%BB%84%E7%BB%93%E5%B0%BE%E6%B7%BB%E5%8A%A0%E5%85%83%E7%B4%A0)
- [向数组的头部添加元素](#%E5%90%91%E6%95%B0%E7%BB%84%E7%9A%84%E5%A4%B4%E9%83%A8%E6%B7%BB%E5%8A%A0%E5%85%83%E7%B4%A0)
- [向数组中间添加元素](#%E5%90%91%E6%95%B0%E7%BB%84%E4%B8%AD%E9%97%B4%E6%B7%BB%E5%8A%A0%E5%85%83%E7%B4%A0)

## 向数组结尾添加元素

```javascript
arr.push(6);           //修改原始数组
arr[arr.length] = 6;   //修改原始数组
arr2 = arr.concat([6]);
```


手机上的效率|method| 效率
---|---|---
Android (v4.2.2)| arr.push(6);and arr[arr.length] = 6| 性能相同 // 3 319 694 ops/sec
Android (v4.2.2)| arr2 = arr.concat([6]);)|比其他两个方法慢50.61%
Chrome Mobile (v33.0.0)|arr[arr.length] = 6;| 6 125 975 ops/sec
Chrome Mobile (v33.0.0)|arr.push(6);|慢66.74%
Chrome Mobile (v33.0.0)|arr2 = arr.concat([6]);|慢87.63%
Safari Mobile (v9)|arr[arr.length] = 6;| 7 452 898 ops/sec
Safari Mobile (v9)|arr.push(6);|慢40.19%
Safari Mobile (v9)|arr2 = arr.concat([6]);|慢49.78%


桌面上的效率|method| 效率
---|---|---
Chrome (v48.0.2564)|arr[arr.length] = 6;|21 602 722 ops/sec
Chrome (v48.0.2564)|arr.push(6); |慢61.94%
Chrome (v48.0.2564)|arr2 = arr.concat([6]); |慢87.45%
Firefox (v44)|arr.push(6); |// 56 032 805 ops/sec
Firefox (v44)|arr[arr.length] = 6; |慢0.52%
Firefox (v44)|arr2 = arr.concat([6]); |慢87.36%
IE (v11)|arr[arr.length] = 6; |// 67 197 046 ops/sec
IE (v11)|arr.push(6); |慢39.61%
IE (v11)|arr2 = arr.concat([6]); |慢93.41%
Opera (v35.0.2066.68)|arr[arr.length] = 6;|30 775 071 ops/sec
Opera (v35.0.2066.68)|arr.push(6); |慢71.60%
Opera (v35.0.2066.68)|arr2 = arr.concat([6]);|慢83.70%
Safari (v9.0.3)|arr.push(6);|// 42 670 978 ops/sec
Safari (v9.0.3)|arr[arr.length] = 6;|慢0.80%
Safari (v9.0.3)|arr2 = arr.concat([6]); |慢76.07%

## 向数组的头部添加元素

```javascript
arr.unshift(0);   //操作的是原始数组
[0].concat(arr);   //返回一个新数组
```


手机上的效率|method| 效率
---|---|---
Android (v4.2.2)| `[0].concat(arr);` |// 1 808 717 ops/sec
Android (v4.2.2)| `arr.unshift(0);`| 慢97.85%
Chrome Mobile (v33.0.0)|`[0].concat(arr);`| // 1 269 498 ops/sec
Chrome Mobile (v33.0.0)|`arr.unshift(0);` |慢99.86%
Safari Mobile (v9)|`arr.unshift(0);` |// 3 250 184 ops/sec
Safari Mobile (v9)|`[0].concat(arr); `|慢33.67%


桌面上的效率|method| 效率
---|---|---
Chrome (v48.0.2564)|`[0].concat(arr);` |// 2 656 685 ops/sec
Chrome (v48.0.2564)|`arr.unshift(0);` |慢96.77%
Firefox (v44)|`[0].concat(arr);` |// 8 039 759 ops/sec
Firefox (v44)|`arr.unshift(0);`|慢98.31%
IE (v11)|`[0].concat(arr);` |// 3 604 226 ops/sec
IE (v11)|`arr.unshift(0);` |慢98.31%
Opera (v35.0.2066.68)|`[0].concat(arr);`| // 3 604 226 ops/sec
Opera (v35.0.2066.68)|`arr.unshift(0);`| 慢97.44%
Safari (v9.0.3)|`arr.unshift(0);` |// 12 356 477 ops/sec
Safari (v9.0.3)|`[0].concat(arr);`| 慢15.17%


## 向数组中间添加元素

```javascript
var items = ['one', 'two', 'three', 'four'];
items.splice(items.length / 2, 0, 'hello');   //最高效的方法
```

http://www.cnblogs.com/rubylouvre/p/5751564.html
