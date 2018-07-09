[JavaScript专题之排序](#top)

- [1. Array.prototype.sort()详解](#sort)
- [2. 排序案例1](#简单排序)
- [3. 排序案例2- 对象排序](#对象排序)

<h2 id="sort">1. Array.prototype.sort()详解</h2>

- Array.prototype.sort()不够稳定，所以不能直接使用sort()
- [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

`arr.sort([compareFunction])`

- If compareFunction(a, b) is less than 0, sort a to an index lower than b, i.e. a comes first
- If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements. Note: the ECMAscript standard does not guarantee this behaviour, and thus not all browsers (e.g. Mozilla versions dating back to at least 2003) respect this
- If compareFunction(a, b) is greater than 0, sort b to an index lower than a, i.e. b comes first
compareFunction(a, b) must always return the same value when given a specific pair of elements a and b as its two arguments. If inconsistent results are returned then the sort order is undefined

```javascript
//
function compare(a, b) {
  if (a is less than b by some ordering criterion) {
    return -1;
  }
  if (a is greater than b by the ordering criterion) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
// compareFunction
function compareNumbers(a, b) {
  return a - b;
}
//sample
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);   // [1, 2, 3, 4, 5]
```

[back to top](#top)

<h2 id="简单排序">2. 排序案例1- 简单排序</h2>

```javascript
var arr = [1, 100, 20, 200, 40, 50, 120, 10];
arr.sort(function (obj1,obj2) {
  if(obj1>obj2){
    return 1;     //如果想倒序排列 return -1;
  }else if(obj1==obj2){
    return 0;
  }else{
    return -1;   //如果想倒序排列 return 1;
  }
});
console.log(arr);    // [1, 10, 20, 40, 50, 100, 120, 200]
//字符串也可以用该方法排序
var arr1=["acdef","abcd","bcedf","bced"];
arr1.sort(function (a,b) {
  if(a>b){
    return 1;
  }else if(a==b){
    return 0;
  }else{
    return -1;
  }
});
console.log(arr1);
```

[back to top](#top)

<h2 id="对象排序">3. 排序案例2- 对象排序</h2>

```javascript
//定义对象
function File(name, size, time) {
  this.name = name;//电影名字
  this.size = size;//电影大小
  this.time = time;//电影的上映时间
}
var f1 = new File("jack.avi", "400M", "1997-12-12");
var f2 = new File("tom.avi", "200M", "2017-12-12");
var f3 = new File("xiaosu.avi", "800M", "2010-12-12");
var arr = [f1, f2, f3];
//自定义排序
function fn(attr) {
  //函数作为返回值
  return function getSort(obj1, obj2) {
    if (obj1[attr] > obj2[attr]) {
      return 1;
    } else if (obj1[attr] == obj2[attr]) {
      return 0;
    } else {
      return -1;
    }
  }
}
var fname = fn("name");
var fsize = fn("size");
arr.sort(fname);
//0: File {name: "jack.avi", size: "400M", time: "1997-12-12"}
//1: File {name: "tom.avi", size: "200M", time: "2017-12-12"}
//2: File {name: "xiaosu.avi", size: "800M", time: "2010-12-12"}
arr.sort(fsize);  
//0: File {name: "tom.avi", size: "200M", time: "2017-12-12"}
//1: File {name: "jack.avi", size: "400M", time: "1997-12-12"}
//2: File {name: "xiaosu.avi", size: "800M", time: "2010-12-12"}
arr.sort(fn("time"));
```

> Reference

