[JavaScript中对象的深拷贝](#top)

- [一. 浅拷贝的实现](#浅拷贝的实现)
  - [1.1 方法一：简单的复制语句](#方法一)
  - [1.2 方法二：Object.assign](#方法二)
- [二. 深拷贝的实现](#深拷贝的实现)
  - [2.1 方法一：使用JSON.parse方法](#parse方法)
  - [2.2 方法二：递归拷贝](#递归拷贝)
  - [2.3 方法三：使用Object.create方法](#create方法)
- [jQuery.extend()方法和lodash的实现对象的深拷贝](#方法的实现对象的深拷贝)
- [Immutability - 浅freeze和深freeze](#Immutability)

---------------------

- 浅拷贝：仅仅复制对象的引用，而不是对象本身(拷贝就是复制,就相当于把一个对象中的所有的内容,复制一份给另一个对象,直接复制,或者说,就是把一个对象的地址给了另一个对象,他们指向相同,两个对象之间有共同的属性或者方法,都可以使用)
- 深拷贝：把复制的对象所引用的全部对象都复制一遍(把一个对象中所有的属性或者方法,一个一个的找到.并且在另一个对象中开辟相应的空间,一个一个的存储到另一个对象中)

<h2 id="浅拷贝的实现">一. 浅拷贝的实现</h2>

<h3 id="方法一">1.1 方法一：简单的复制语句</h3>

```JavaScript
var m = { a: 10, b: 20 }
var n = {a:m.a,  b:m.b};
n.a = 15;     // m,n均为： {a: 15, b: 20}
//简单的复制，浅拷贝
function simpleClone(initalObj) {    
  var obj = {};    
  for ( var i in initalObj) {
    obj[i] = initalObj[i];
  }    
  return obj;
}
```

<h3 id="方法二">1.2 方法二：Object.assign</h3>

```JavaScript
var obj = { a: {a: "hello", b: 21} };
var initalObj = Object.assign({}, obj);
initalObj.a.a = "changed";
console.log(obj.a.a);       // "changed"
```

[back to top](#top)

<h2 id="深拷贝的实现">二. 深拷贝的实现</h2>

<h3 id="parse方法">2.1 方法一：使用 JSON.parse() 方法</h3>

```JavaScript
function deepClone(initalObj) {
    var obj = {};
    try {
        obj = JSON.parse(JSON.stringify(initalObj));
    }
    return obj;
}
```

- 优点： 简单易用
- 缺点： 会抛弃对象的constructor。也就是深拷贝之后，不管这个对象原来的构造函数是什么，在深拷贝之后都会变成Object
- 适用： 能正确处理的对象只有 Number, String, Boolean, Array, 扁平对象，即那些能够被 json 直接表示的数据结构。RegExp对象是无法通过这种方式深拷贝。

[back to top](#top)

<h3 id="递归拷贝">2.2 方法二：递归拷贝</h3>

```JavaScript
function deepClone(initalObj, finalObj) {
    var obj = finalObj || {};
    for (var i in initalObj) {
        if (typeof initalObj[i] === 'object') {
            obj[i] = (initalObj[i].constructor === Array) ? [] : {};
            arguments.callee(initalObj[i], obj[i]);
        } else {
            obj[i] = initalObj[i];
        }
    }
    return obj;
}
//为了避免相互引用的对象导致死循环的情况，则应该在遍历的时候判断是否相互引用对象，如果是则退出循环
//改进版
function deepClone(initalObj, finalObj) {
    var obj = finalObj || {};
    for (var i in initalObj) {
        var prop = initalObj[i];
        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
        if(prop === obj) {
            continue;
        }
        if (typeof prop === 'object') {
            obj[i] = (prop.constructor === Array) ? [] : {};
            arguments.callee(prop, obj[i]);
        } else {
            obj[i] = prop;
        }
    }
    return obj;
}
```

[back to top](#top)

<h3 id="create方法">2.3 方法三：使用Object.create()方法</h3>

```JavaScript
function deepClone(initalObj, finalObj) {
    var obj = finalObj || {};
    for (var i in initalObj) {
        var prop = initalObj[i];
        // 免相互引用对象导致死循环，如initalObj.a = initalObj的情况
        if(prop === obj) {
            continue;
        }
        if (typeof prop === 'object') {
            obj[i] = (prop.constructor === Array) ? [] : Object.create(prop);
        } else {
            obj[i] = prop;
        }
    }
    return obj;
}
```
  
[back to top](#top)

<h2 id="方法的实现对象的深拷贝">jQuery.extend()方法和lodash的实现对象的深拷贝</h2>

官方链接地址：https://github.com/jquery/jquery/blob/master/src/core.js
  
```JavaScript
//jquery
var $ = require('jquery');
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = $.extend(true, {}, obj1);
console.log(obj1.b.f === obj2.b.f);   // false
//lodash
var _ = require('lodash');
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);   // false
```
  
[back to top](#top)

## Immutability

- `Object.freeze()` did not work in nested properies
- create a function `deepFreeze()`

```javascript
function deepFreeze(o) {
  Object.freeze(o);
  Object.getOwnPropertyNames(o).forEach((prop) => {
    if(o.hasOwnProperty(prop) && o[prop] != null && typeof o[prop] === 'object' && !Object.isFrozen(o[prop])) {
        deepFreeze(o[prop]);
      }
  });
  return o;
}
const person = deepFreeze({ // cannot change address if use deepFreeze
  name: 'hendrik',
  surname: 'swanepoel',
  address: {
    city: 'Cape Town',
    country: 'South Africa'
  }
});
//Object.freeze() 
person.address.city = 'something else';  // cannot change address if use deepFreeze
```
  
[back to top](#top)

> References

- [JavaScript中对象的深拷贝](http://www.dengzhr.com/js/1180)
- [什么是js深拷贝和浅拷贝及其实现方式](http://www.haorooms.com/post/js_copy_sq)
