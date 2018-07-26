[Javascript中forEach, reduce详解](#top)

- [1. forEach](#forEach)
    - 跳出forEach循环的方法
- [2. reduce](#reduce)
    - 应用1 -求和
    - 应用2 -对象的求和（同学的总成绩）
    - 简化的结合map和reduce的例子
    - 使用reduce方法完成多维度的数据叠加

<h2 id="forEach">1. forEach</h2>

`array.forEach(function(currentValue, index, arr), thisValue)`

- 参数
    - currentValue: 必需。当前元素
    - index: 可选。当前元素的索引值
    -  arr:  可选。当前元素所属的数组对象
    -  thisValue: 可选。传递给函数的值一般用 "this" 值。如果这个参数为空， "undefined" 会传递给 "this" 值
-  返回值:	undefined

```html
<p>乘以: <input type="number" id="multiplyWith" value="10"></p>
<button onclick="numbers.forEach(myFunction)">点我</button>
<p>计算后的值: <span id="demo"></span></p>
<script>
var numbers = [65, 44, 12, 4];
function myFunction(item,index,arr) {
    arr[index] = item * document.getElementById("multiplyWith").value;
    demo.innerHTML = numbers;
}
</script>
```

[back to top](#top)

### 跳出forEach循环的方法

- **问题**： 在forEach中，不能使用 continue 和 break ，可以使用 return 或 return false 跳出循环，效果与 for 中 continue 一样。注意该方法无法一次结束所有循环。
- **原因**：forEach（）无法在所有元素都传递给调用的函数之前终止遍历。也就是说，没有像for循环中使用的相应的break语句。
- **解决方法**: 如果要提前终止，必须把forEach（）方法放在一个**try块**中，并能抛出一个异常。如果forEach（）调用的函数抛出foreach.break异常，循环会提前终止

```javascript
var arr = [1,2,3,4,5];
try{
    arr.forEach(function(el,index){
        if (el==3) {
            console.log("try中遇到20,能退出吗?");//
            foreach.break=new Error("StopIteration");
        }else{
            console.log(el);
        }
    });
}catch(e){
    console.log(e.message);
    if(e.message==="foreach is not defined") {
        console.log("跳出来了?");
        //return;
    }else
        throw e;
}

//重写foreach方法-- 自定义foreach方法(往Array或String的prototype添加也可以)
function fore7(arr,func){
    console.log(arr);
    for (var i = 0; i < arr.length; i++) {
        var ret= func.call(this,arr[i],i);//回调函数
        if(typeof ret !== "undefined"&&(ret==null||ret==false)) break;
    }

}
//自定义foreach,的用法
fore7(getArr(1,30),function(a,i){
    console.log(i+':'+a);
    if (i==20) return false;//跳出循环
})
//返回min,max之间的数组成的数组,无序
function getArr(min,max){
    if(typeof min!=='number'||typeof max !== 'number') return [];
    var arr = [];
    for (var i = min; i <= max; i++) {
        if (arr.length<1) {
            arr.push(i);
        }else{
            var len = arr.length;
            var rIndex = Math.round(Math.random()*(len-1));
            var temp = arr[rIndex];
            arr[rIndex] = i;
            arr.push(temp);
        }
    }
    return arr;
}
```

[back to top](#top)

<h2 id="reduce">2. reduce</h2>

`array.reduce(callback(total, currentValue, currentIndex, arr), initialValue)`

- reduce() 方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始缩减，最终为一个值
- reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，callback（执行数组中每个值的函数，包含四个参数）接受四个参数：
    - total: 必需。初始值, 或者计算结束后的返回值(上一次回调函数的返回值)
    - currentValue: 必需。当前元素值, 以被用来设置累加器的初始值。如果没有在这定义初始值，那么初始值将变成数组中的第一项，而 currentValue 将从数组的第二项开始
     - currentIndex: 可选。当前元素的索引
    - arr: 可选。当前元素所属的数组对象
- initialValue: 可选。传递给函数的初始值(作为第一次调用 callback 的第一个参数)
- 返回值:	返回计算结果
- 注意，在ie9并不支持该方法

### 应用1 -求和

```javascript
var items = [10, 120, 1000];
var reducer = function add(sumSoFar, item) { return sumSoFar + item; };   // reducer function
var total = items.reduce(reducer, 0);   //1130
//
[10, 120, 1000].reduce(function(sumSoFor, item){return sumSoFor+item; }, 0)
```

[back to top](#top)

应用到page

```html
<button onclick="myFunction()">点我</button>
<p>数组元素之和: <span id="demo"></span></p>
<script>
var numbers = [15.5, 2.3, 1.1, 4.7];
function getSum(total, num) {
    return total + Math.round(num);
}
function myFunction(item) {
    document.getElementById("demo").innerHTML = numbers.reduce(getSum, 0);
}
//
var array = [4,5,6,7,8]; var singleVal = 0; // 只能在这一行下面写代码
singleVal = array.reduce(function(previousVal,currentVal){return previousVal + currentVal;});
</script>
```

[back to top](#top)

### 应用2 -对象的求和（同学的总成绩）

```javascript
var dis = {     //各科所占的比重
    math: 0.5,
    chinese: 0.3,
    english: 0.2
}
var result = [
    {subject: 'math',score: 88},
    {subject: 'chinese',score: 95},
    {subject: 'english',score: 80}
];
var sum = result.reduce(function(prev, cur) {
    return cur.score * dis[cur.subject] + prev;
}, 0);     //88.5
// 假设该同学因为违纪被处罚在总成绩总扣10分，只需要将初始值设置为-10即可
var sum = result.reduce(function(prev, cur) {
    return cur.score * dis[cur.subject] + prev;
}, -10);    //78.5
```

### 简化的结合map和reduce的例子

```javascript
+(function(s){
    return s.split('').map(function(x){return x*1;}).reduce(function(x,y){return x*10+y});
})('54321');
//一串字符串中每个字母出现的次数
'abcdaabc'.split('').reduce(function(res, cur) {
    res[cur] ? res[cur] ++ : res[cur] = 1
    return res;
}, {});     //{a: 3, b: 2, c: 2, d: 1}
```

[back to top](#top)

### 使用reduce方法完成多维度的数据叠加

思路： 将reduce函数第一个参数callback封装为一个数组，由数组中的每一个函数单独进行叠加并完成reduce操作。所有的一切通过一个manager函数来管理流程和传递初始参数

```javascript
//目标对象多个属性的同时叠加
var reducers = {
  totalInEuros : function(state, item) {
    return state.euros += item.price * 0.897424392;
  },
  totalInYen : function(state, item) {
    return state.yens += item.price * 113.852;
  }
};
var manageReducers = function(reducers) {
  return function(state, item) {
    return Object.keys(reducers).reduce(
      function(nextState, key) {
        reducers[key](state, item);
        return state;
      },
      {}
    );
  }
};
var bigTotalPriceReducer = manageReducers(reducers);
var initialState = {euros:0, yens: 0};
var items = [{price: 10}, {price: 120}, {price: 1000}];
var totals = items.reduce(bigTotalPriceReducer, initialState);
console.log(totals);
```

