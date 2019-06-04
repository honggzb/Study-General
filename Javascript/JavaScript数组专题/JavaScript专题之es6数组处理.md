[JavaScript专题之es6数组处理](#top)

<table>
   <th>
      <td>方法</td>
      <td>说明</td>
      <td>返回值</td>
      <td>例子</td>
   </th>
   <tr>
      <td colspan="4" bgcolor=#7B68EE>遍历查找</td>
   </tr>
   <tr>
      <td>forEach</td>
      <td>仅仅只是遍历数组</td>
      <td>无返回值，不改变原数组</td>
      <td>常用于注册组件、指令等</td>
   </tr>
   <tr>
      <td>map</td>
      <td>可简单的理解为映射</td>
      <td>返回一个新数组，不改变原数组的值</td>
      <td>不改变原数组</td>
   </tr>
   <tr>
      <td>filter</td>
      <td>过滤掉数组中不满足条件的值</td>
      <td>返回一个新数组，不改变原数组的值</td>
      <td></td>
   </tr>
   <tr>
      <td>find</td>
      <td>参数n代表数组里的每一项，然后内部通过遍历数组里的每一项，找到满足条件的项</td>
      <td>返回第一个满足条件的元素，没有找到返回-1</td>
      <td>[1, 4, -5, 10].find((n) => n < 0) // -5</td>
   </tr>
   <tr>
      <td>findIndex</td>
      <td>findIndex的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组</td>
      <td>返回第一个满足条件的索引，没有找到返回-1</td>
      <td>[1, 4, -5, 10].findIndex((value,index,arr) => value < 0) // 2</td>
   </tr>
   <tr>
      <td colspan="4">上面4个方法内部机制都有一个遍历过程</td>
   </tr>
   <tr>
      <td colspan="4" bgcolor=#7B68EE>查找</td>
   </tr>
   <tr>
      <td>some</td>
      <td>只要其中一个为true就会停止遍历并返回true</td>
      <td>返回true、false，不改变原数组</td>
      <td>一真即真</td>
   </tr>
   <tr>
      <td>every</td>
      <td>遍历数组每一项，只有所有都返回true才会返回true，哪怕有一个false，就会返回false</td>
      <td>返回true、false，不改变原数组</td>
      <td>一假即假</td>
   </tr>
   <tr>
      <td colspan="2">every和some目的：确定数组的所有成员是否满足指定的测试</td>
      <td colspan="2">返回true、false</td>
   </tr>
   </tr>
   <tr>
      <td>reduce</td>
      <td>让数组的前后两项进行某种计算。然后返回其值，并继续计算</td>
      <td>不改变原数组，返回计算的最终结果，从数组的第二项开始遍历</td>
      <td></td>
   </tr>
   <tr>
      <td colspan="4" bgcolor=#7B68EE>静态方法</td>
   </tr>
   <tr>
      <td>Array.from</td>
      <td>让类数组对象变成数组</td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td>Array.of</td>
      <td>将一组值转换为数组</td>
      <td></td>
      <td></td>
   </tr>
</table>

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
