[JavaScript专题之排序1-sort解析](#top)

- [1. Array.prototype.sort()详解](#sort)
- [2. 排序案例1- 简单排序](#简单排序)
- [3. 排序案例2- 对象按指定属性排序](#对象排序)
- [4. 排序案例2- 表格的排序简单实例](#表格的排序简单实例)
- [其他](#其他)

<h2 id="sort">1. Array.prototype.sort()详解</h2>

- Array.prototype.sort()不够稳定，所以不能直接使用sort()
- [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

`arr.sort([compareFunction])`

- If compareFunction(a, b) is less than 0, sort a to an index lower than b, i.e. a comes first
- If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements. Note: the ECMAscript standard does not guarantee this behaviour, and thus not all browsers (e.g. Mozilla versions dating back to at least 2003) respect this
- If compareFunction(a, b) is greater than 0, sort b to an index lower than a, i.e. b comes first
compareFunction(a, b) must always return the same value when given a specific pair of elements a and b as its two arguments. If inconsistent results are returned then the sort order is undefined
- 没有指明compareFunction，那么元素会被转换为字符串的诸个字符并按照Unicode位点顺序排序

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
    return 1;     //如果是降序排序， return -1;
  }else if(obj1==obj2){
    return 0;
  }else{
    return -1;   //如果是降序排序   return 1;
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

<h2 id="对象排序">3. 排序案例2- 对象按指定属性排序</h2>

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
//自定义比较函数
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

[back to top](#top)

<h2 id="表格的排序简单实例">4. 排序案例2- 表格的排序简单实例</h2>

```html
<input id="btn1" type="button" value="排序">
<table id="tab1" width="200" border="1" cellpadding="14">
  <thead><td>序号</td><td>姓名</td><td>年龄</td></thead>
  <tbody>
    <tr><td>2</td><td>张三</td><td>20</td></tr>
    <tr><td>2</td><td>李四</td><td>25</td></tr>
    <tr><td>2</td><td>赵龙</td><td>30</td></tr>
    <tr><td>2</td><td>孙河</td><td>21</td></tr>
  </tbody>
</table>
<script type="text/javascript">
      var oTab=document.getElementById('tab1');
      var oBtn=document.getElementById('btn1');
      oBtn.onclick=function(){
        var arr=[]
        for(i=0;i<oTab.tBodies[0].rows.length;i++){
          arr[i]=oTab.tBodies[0].rows[i];
        }
        arr.sort(function(tr1,tr2){
          var n1=parseInt(tr1.cells[0].innerHTML);  
          var n2=parseInt(tr2.cells[0].innerHTML);
          return n1-n2;
        })
        for(i=0;i<arr.length;i++){
          oTab.tBodies[0].appendChild(arr[i])
        }
      }
</script>
```

[back to top](#top)

## 其他

```javascript
/**
 * 排序数组或者对象
 * by Jinko
 * date --
 * @param object 数组或对象
 * @param subkey 需要排序的子键, 该参数可以是字符串, 也可以是一个数组
 * @param desc 排序方式, true:降序, false|undefined:升序
 * @returns {*} 返回排序后的数组或者对象
 *
 * 注意: 对于对象的排序, 如果使用console.log打印对象的显示可能和排序结果不一致,
 *  其键会被浏览器以字母顺序排序显示,但在for循环中则为正确的排序顺序
 */
function sort_object(object, subkey, desc)
{
  var is_array = false;
  if(Object.prototype.toString.call(object) === '[object Array]') {
    is_array = true;
  }
  if(is_array) {
    var keys = {length:object.length};
  } else {
    if(typeof(Object.keys) == 'function') {
      var keys = Object.keys(object);
    } else{
      var keys = [];
      for(var key in keys) {
        keys.push(key);
      }
    }
  }
  for(var i=; i<keys.length; i++) {
    for(var j=i+; j<keys.length; j++) {
      if(is_array) {
        //数组排序
        if(Object.prototype.toString.call(subkey) === '[object Array]') {
          var vali = object[i];
          var valj = object[j];
          for(var si=; si<subkey.length; si++) {
            vali = vali[ subkey[si] ];
            valj = valj[ subkey[si] ];
          }
        } else {
          if((!subkey && subkey !== ) || subkey == '' && object.sort) {
            var vali = object[i];
            var valj = object[j];
          } else {
            var vali = object[i][subkey];
            var valj = object[j][subkey];
          }
        }
        if(desc) {
          if(valj > vali) {
            var tmp = object[i];
            object[i] = object[j];
            object[j] = tmp;
          }
        } else {
          if(valj < vali) {
            var tmp = object[i];
            object[i] = object[j];
            object[j] = tmp;
          }
        }
      } else {
        //对象排序
        var obi = object[ keys[i] ];
        var obj = object[ keys[j] ];
        if(Object.prototype.toString.call(subkey) === '[object Array]') {
          var vali = obi;
          var valj = obj;
          for(var si=; si<subkey.length; si++) {
            vali = vali[ subkey[si] ];
            valj = valj[ subkey[si] ];
          }
        } else {
          if((!subkey && subkey !== ) || subkey == '' && object.sort) {
            var vali = obi;
            var valj = obj;
          } else {
            var vali = obi[subkey];
            var valj = obj[subkey];
          }
        }
        if(desc) {
          if(valj > vali) {
            var tmp = keys[i];
            keys[i] = keys[j];
            keys[j] = tmp;
          }
        } else {
          if(valj < vali) {
            var tmp = keys[i];
            keys[i] = keys[j];
            keys[j] = tmp;
          }
        }
      }//is!array
    }
  }
  if(is_array) {
    return object;
  } else {
    var sorted = {};
    for(var i=; i<keys.length; i++) {
      sorted[ keys[i] ] = object[ keys[i] ];
    }
    return sorted;
  }
} 
//sort_object
```

> Reference
> - [JS学习之表格的排序简单实例](https://www.jb51.net/article/84323.htm)

