[JavaScript专题之es6数组处理](#top)

方法|说明|返回值|例子
---|---|---|---
**遍历查找**|||
forEach|仅仅只是遍历数组|无返回值，不改变原数组|常用于注册组件、指令等
map|可简单的理解为映射|返回一个新数组，不改变原数组的值|不改变原数组|`[1,2,3,4].map((n)=>n*n));   //[1, 4, 9, 16]`
filter|过滤掉数组中不满足条件的值|返回一个新数组，不改变原数组的值|
find|参数n代表数组里的每一项，然后内部通过遍历数组里的每一项，找到满足条件的项|返回第一个满足条件的元素，没有找到返回-1|`[1, 4, -5, 10].find((n) => n < 0) // -5`
findIndex|findIndex的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组|返回第一个满足条件的索引，没有找到返回-1|`[1, 4, -5, 10].findIndex((value,index,arr) => value < 0)  // 2`
**上面4个方法内部机制都有一个遍历过程**|||
**查找**|||
[some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)|只要其中一个为true就会停止遍历并返回true|返回true、false，不改变原数组|**一真即真**
every|遍历数组每一项，只有所有都返回true才会返回true，哪怕有一个false，就会返回false|返回true、false，不改变原数组|**一假即假**
every和some目的：确定数组的所有成员是否满足指定的测试||返回true、false|
reduce|让数组的前后两项进行某种计算。然后返回其值，并继续计算|不改变原数组，返回计算的最终结果，从数组的第二项开始遍历|
**静态方法**|||
Array.from|让类数组对象变成数组||
Array.of|将一组值转换为数组||

```javascript
/*注意拷贝的数组是浅拷贝 */
let arrLike = {
    0: 10,
    1: 20,
    2: 30,
    length: 3
}
//传统做法
let arr = Array.prototype.slice.call(arrLike);   //[10, 20, 30]
let arr = Array.from(arrLike);   //[10, 20, 30]
//将数组空位转换为undefined
let arr = Array.from([10, , 30]);   //[10, undefined, 30]
//额外的参数, 用于对元素进行处理 
let arr = Array.from(arrLike,function(x){
    return x*x;     //[100, 400, 900]
});
/* */
let arr1 = Array.of(3);   //[3]
let arr2 = Array.of(1, 2, 3);  //[1, 2, 3]
let arr3 = Array.of();    //[]
let arr4 = Array.of(undefined);  //[undefined]
let arr5 = Array.of(null);   //[null]
```
