
- [1 数组合并](#数组合并)
    - 1.1 concat 方法
    - 1.2 循环遍历
    - 1.3 apply
- [2 对象合并](#对象合并)
    - 2.1 $.extend()
    - 2.2 遍历赋值
    - 2.3 Obj.assign()
    - 2.4 对象的深拷贝和浅拷贝

<h2 id="数组合并">1. 数组合并</h2>

```javascript
//1.1 concat 方法 - 原数组不改变
var a=[1,2,3],b=[4,5,6];
var c=a.concat(b);
console.log(c);     // 1,2,3,4,5,6
console.log(a);     // 1,2,3 不改变本身
//1.2 循环遍历
var arr1=['a','b'];
var arr2=['c','d','e'];
for(var i=0;i<arr2.length;i++){
   arr1.push(arr2[i])
}
console.log(arr1);   //['a','b','c','d','e']
//1.3 apply - 使用Array.prototype.push.apply(arr1,arr2) 或 arr1.push.apply(arr1,arr2);
var arr1=['a','b'];
var arr2=['c','d','e'];
Array.prototype.push.apply(arr1,arr2);
//或者
arr1.push.apply(arr1,arr2);<br>console.log(arr1) //['a','b','c','d','e']
```

<h2 id="对象合并">2. 对象合并</h2>

```javascript
//2.1 $.extend()
var obj1= {'a': 1};
var obj2= {'b': 1};
var c = $.extend(obj1, obj2); 
console.log(obj1); // {a: 1, b: 1} obj1已被修改 
//或者 <br>var obj3 = $.extend({}, obj1, obj2) <br>console.log(obj3); //{a: 1, b: 1} 不会改变obj1,obj2
// 2.2 遍历赋值
var obj1={'a':1};
var obj2={'b':2,'c':3};
for(var key in obj2){
   if(obj2.hasOwnProperty(key)===true){ 
     //此处hasOwnProperty是判断自有属性，
     //使用 for in 循环遍历对象的属性时，原型链上的所有属性都将被访问会避免原型对象扩展带来的干扰
      obj1[key]=obj2[key];
    } 
} 
console.log(obj1);//{'a':1,'b':2,'c':3};
//2.3 Obj.assign()
//可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象
Object.assign(target, ...sources)
//a. 复制一个对象<br>var obj = { a: 1 ,b:2};
var copyObj = Object.assign({}, obj);
console.log(copyObj); // { a: 1,b:2 }<br><br>//b.合并多个对象 
var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };
var obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1); // { a: 1, b: 2, c: 3 }, 且目标对象自身也会改变。
//2.4 对象的深拷贝和浅拷贝
//   2.4.1 浅拷贝
var obj1={'a':1};
var obj2={'b':{'b1':22,'b2':33}};
$.extend(obj1, obj2);  //obj1拷贝了obj2的属性
console.log(obj1) // {'a':1,'b'{'b1':22,'b2':33}}
console.log(obj1.b.b1) // 22
obj2.b.b1=44;  //obj2重新赋值
console.log(obj1.b.b1) // 44 obj1.b仅拷贝了对象的指引，所以受原obj2的影响
//   2.4.2 深拷贝
var obj1={'a':1};
var obj2={'b':{'b1':22,'b2':33}};
$.extend(true,obj1, obj2);  //第一个参数设为true表示深复制
console.log(obj1) // {'a':1,'b'{'b1':22,'b2':33}}
console.log(obj1.b.b1) // 22
obj2.b.b1=44;  //obj2重新赋值
console.log(obj1.b.b1) // 22 obj1拷贝了obj2的所有属性以及值，并不受obj2的影响
```

> reference
> [详解JavaScript中的数组合并方法和对象合并方法](https://www.jb51.net/article/139903.htm)
