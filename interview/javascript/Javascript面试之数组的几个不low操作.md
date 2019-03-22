[JS面试之数组的几个不low操作](top)

- [扁平化n维数组](#%E6%89%81%E5%B9%B3%E5%8C%96n%E7%BB%B4%E6%95%B0%E7%BB%84)
- [去重](#%E5%8E%BB%E9%87%8D)
- [排序](#%E6%8E%92%E5%BA%8F)
- [最大值](#%E6%9C%80%E5%A4%A7%E5%80%BC)
- [求和](#%E6%B1%82%E5%92%8C)
- [合并](#%E5%90%88%E5%B9%B6)
- [判断是否包含值](#%E5%88%A4%E6%96%AD%E6%98%AF%E5%90%A6%E5%8C%85%E5%90%AB%E5%80%BC)
- [类数组转化](#%E7%B1%BB%E6%95%B0%E7%BB%84%E8%BD%AC%E5%8C%96)
- [每一项设置值](#%E6%AF%8F%E4%B8%80%E9%A1%B9%E8%AE%BE%E7%BD%AE%E5%80%BC)
- [每一项是否满足](#%E6%AF%8F%E4%B8%80%E9%A1%B9%E6%98%AF%E5%90%A6%E6%BB%A1%E8%B6%B3)
- [有一项满足](#%E6%9C%89%E4%B8%80%E9%A1%B9%E6%BB%A1%E8%B6%B3)
- [过滤数组](#%E8%BF%87%E6%BB%A4%E6%95%B0%E7%BB%84)
- [对象和数组转化](#%E5%AF%B9%E8%B1%A1%E5%92%8C%E6%95%B0%E7%BB%84%E8%BD%AC%E5%8C%96)

## 扁平化n维数组

```javascript
[1,[2,3]].flat(2);          //[1, 2, 3]
[1,[2,3,[4,5]]].flat(3);    //[1, 2, 3, 4, 5]
[1,[2,3,[4,5]]].toString(); //"1,2,3,4,5"
```

- `var newArray = arr.flat([depth]);`
- [Array.prototype.flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
- Browser compatibility:  did not supported by IE/Edge
- Alternative: `reduce` and `concat`

```javascript
var arr1 = [1, 2, [3, 4]];
arr1.reduce((acc, val) => acc.concat(val), []);   // [1, 2, 3, 4]
[].concat(...arr1);  // [1, 2, 3, 4]
```

## 去重

```javascript
Array.from(new Set([1,2,3,3,4,4]))   //[1,2,3,4]
[...new Set([1,2,3,3,4,4])]          //[1,2,3,4]
```

## 排序

```javascript
[1,2,3,4].sort((a, b) => a - b); // [1,2,3,4],默认是升序
[1,2,3,4].sort((a, b) => b - a); // [4,3,2,1] 降序
```

## 最大值

```javascript
Math.max(...[1,2,3,4])           //4
Math.max.apply(this,[1,2,3,4])   //4
[1,2,3,4].reduce( (prev, cur,curIndex,arr)=> {
  return Math.max(prev,cur);
},0)                            //4
```

## 求和

```javascript
[1,2,3,4].arr.reduce(function (prev, cur) {
   return prev + cur;
 },0)                           //10 
```

## 合并

```javascript
[1,2,3,4].concat([5,6])               //[1,2,3,4,5,6]
[...[1,2,3,4],...[4,5]]               //[1,2,3,4,5,6]
[1,2,3,4].push.apply([1,2,3,4],[5,6]) //[1,2,3,4,5,6]
```

## 判断是否包含值

```javascript
[1,2,3].includes(4)                    //false, IE不支持
[1,2,3].indexOf(4)                     //-1 如果存在换回索引
[1, 2, 3].find((item)=>item===3))      //3 如果数组中无值返回undefined, IE不支持
[1, 2, 3].findIndex((item)=>item===3)) //2 如果数组中无值返回-1, IE 11+支持
```

## 类数组转化

```javascript
Array.prototype.slice.call(arguments)   //arguments是类数组(伪数组)
Array.prototype.slice.apply(arguments)
Array.from(arguments)                  //IE不支持
[...arguments]
```

## 每一项设置值

```javascript
[1,2,3].fill(false)       //[false,false,false]
```

## 每一项是否满足

```javascript
[1,2,3].every(item=>{return item>2}) //false
```

## 有一项满足

```javascript
[1,2,3].some(item=>{return item>2})   //true, IE/Edge/Chrome/Firefox不支持
```

## 过滤数组

```javascript
[1,2,3].filter(item=>{return item>2}) //[3]
```

## 对象和数组转化

```javascript
Object.keys({name:'张三',age:14})          //['name','age']
Object.values({name:'张三',age:14})        //['张三',14]
Object.entries({name:'张三',age:14})       //[[name,'张三'],[age,14]], IE不支持
Object.fromEntries([name,'张三'],[age,14]) //ES10的api,Chrome不支持 , firebox输出{name:'张三',age:14}
```

> Reference
- [JS面试之数组的几个不low操作(3)](https://segmentfault.com/a/1190000018549643)
