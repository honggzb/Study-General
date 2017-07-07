[lodash学习笔记](#top)

- [1. Array方法](#Array方法)
- [2. Collection方法](#Collection方法)
- [3. Object方法](#Object方法)
- [4. Map/Reduce(映射和精简)](#MapReduce)
- [5. Seq方法- Chain](#Chain)

lodash学习笔记是一个具有一致接口、模块化、高性能等特性的 JavaScript 工具库, 表现一致性, 模块化, 高性能, 以及 可扩展

<h3 id="Array方法">1. Array方法</h3>

[lodash中文学习拾零之Array篇](http://blog.csdn.net/Soaring_Tiger/article/details/48089017)

<h3 id="Collection方法">2. Collection方法</h3>

- 在lodash中，Collection是一个抽象的概念，指的是那些准备用来迭代的JavaScript object，可以是数组、字符串或者object对象，至于这些数据类型之间的差别细节，则被lodash隐藏起来了，作为开发者你不用操心
- lodash的 Array方法则没有那么抽象，它处理的就是实实在在的数组。从这个意义上讲，即便Array方法没有显式的检查提交的数据类型，但是它们要求提交的数据得有数值型length属性（a numerical length property）

实际上，在大部分时候，并不需要严格得区分arrays和collections之间的差别，因为面对的大多数collections都是以数组的形式出现的，只有在比较少的情况下，会面临着差别 。所以只要记住，Array方法是严格要求数据类型（有数值型length属性）的就行了

分类|方法
---|---
遍历|forEach, forEachRight
排序|sortBy, `_sorttByAll`,`_sorttByOrder`
数据过滤和搜索|`_where`,filter,reject
只找一条符合要求的数据|`_find`, `_findLast`,`_findWhere`
集合改造Transforming collections|`_groupBy`, minmax
集合的扁平化和压缩|flatten, pluck
鉴别部分或全部的集合元素|`_some`,`_every`

1. 数组（Array）肯定是集合（Collection），所以所有的Colleciton方法都适用于数组
2. 集合不一定都是数组

[back to top](#top)

<h3 id="Object方法">3. Object方法</h3>

- 判断Object类型variadic functions:  function, array, string, JSON
- 赋值与取值Assigning and accessing properties
  - 扩展对象Extending objects
    -  `_.assign(object, [sources], [customizer], [thisArg])`
    -  `_.merge(object, [sources], [customizer], [thisArg])`
    -  `_.defaults(object, [sources])`
    -  `_.defaultsDeep(object, [sources])`
- 查找keys和values
  - `_.findKey(object, [predicate=_.identity], [thisArg])`
  - `_.findLastKey(object, [predicate=_.identity], [thisArg])`
- 遍历对象Iterating over objects
  - 基础遍历Basic For Each
    - `_.forOwn(object, [iteratee=_.identity], [thisArg])`
    - `_.forOwnRight(object, [iteratee=_.identity], [thisArg])`
  - 搜索继承属性 Including inherited properties- `_.forOwn`无法检索继承下来的属性，所以要检索继承的属性就要用forIn和forInRight了
    - `_.forIn(object, [iteratee=_.identity], [thisArg])`
    - `_.forInRight(object, [iteratee=_.identity], [thisArg])`
- Keys和Values
  - Keys
    - `_.keys(object)` - 获得object的所有own key
    - `_.keysIn(object)` - 获得object的所有key,prototype也包含在内
  - Values
    - `_.values(object)` - 获得Object所有的own key的值
    - `_.valuesIn(object)` - 获得Object所有Key的值，prototype的值也包括在内
- 调用方法
  - `_.result(object, path, [defaultValue])`
  - `_.functions(object)`
- 转化对象Transforming objects
  - `_.pairs(object)`- 将对象转为数组
  - `_.pick(object, [predicate], [thisArg])` - 挑选对象的特定的property，并返回一个新的object
  - `_.omit(object, [predicate], [thisArg])` - 扔掉指定的property，返回一个新的Object
  -  `_.invert(object, [multiValue])` - 颠倒key和value
- 创建和克隆对象
  -  `_.create(prototype, [properties])`
  -  `_.clone(value, [isDeep], [customizer], [thisArg])`
  -  `_.cloneDeep(value, [customizer], [thisArg])`

[back to top](#top)

<h3 id="MapReduce方法">4. Map/Reduce(映射和精简)</h3>

[lodash 中文学习拾零之 Map/Reduce篇](http://blog.csdn.net/Soaring_Tiger/article/details/48270051)

- 挑选数据`.pluck`或者`.map`:  `.pluck`就是在`.map`的基础上进行了封装，而且`pluck`只能以字符串(String)作为挑选的参数，而`map`的功能则更加强大
- 映射集合 Mapping collections
  - 用map包含以及屏蔽属性
  - 执行计算
  - 调用函数
  - 过滤并且映射
- 映射对象
  - 处理对象中的key
  - 调用函数
  - 映射key-value对
- 化简集合
  - 求和Summing values
  - 过滤和化简Filtering and reducing
  - 最大值最小值平均值操作
- 化简对象
  - 化简Keys
  - 对象累加器
  - 绑定上下文
- MapReduce 模式
  - 通用回调函数
  - MapReduce 链

[back to top](#top)

<h3 id="Chain">5. Seq方法- Chain</h3>

Chain可以说是 lodash 中最为重要的部件，想要用lodash进行复杂的多步操作都离不开chain的帮助。

Chain的调用方式有两种

- 一种是显式调用(Explicit Chaining)
- 一种是隐式调用(Implicit Chaining)

```JavaScript
//显式调用例子如下:
let numbers = [1, 2, 3, 4, 5];
let sumOfEvenSquares = _.chain(numbers) //注意numbers放置的位置
    .filter(n => n % 2 === 0)
    .map(n => n * n)
    .sum()
    .value();      //取值
//特别要注意结尾的那个.value()，因为可能要等待延时(Deferred execution)数据的到来，再执行取值。这就是我们常说的Lazy evaluation （延迟计算/惰性求值）
//隐式调用例子如下：
let sumOfEvenSquares = _(numbers) //注意numbers的位置，不需要显式的使用chain关键字
    .filter(n => n % 2 === 0)
    .map(n => n * n)
    .sum()
//案例1
let isEven = n => n % 2 === 0;
let square = n => n * n;
let sumOfEvenSquares = _(numbers).filter(isEven).map(square).sum();
//案例2
//首先生成链式表达式
var wallet = _(assets).filter(ownedBy('me'))
                      .pluck('value')
                      .reduce(sum);
$json.get("/new/assets").success(function(data) {
    assets.push.apply(assets, data);     // 然后更新数据
    wallet.value();                      // 最后求值
});
```

分类|方法
---|---
`_(value)`|隐式调用
`_.chain(value)`|显式调用
`_.tap(value, interceptor, [thisArg])`|拦截器，可在链条当中插它一下，可以对数据进行处理
`_.thru(value, interceptor, [thisArg])|`和tap非常相似，但是必须有返回值，否则会报错！
`_.prototype.chain()`|允许wrapper对象使用显式链。这样就允许隐式链可以切换为显式链
`_.prototype.concat([values])`|新建一个数组，将原始数组与新加入的值合并起来
`_.prototype.plant()`|克隆一个已有的操作链
`_.prototype.reverse()`|反转数组元素的次序：注意改方法会改变被操作的数组
`_.prototype.toString()`|将unwrapped 的值转为字符串

[back to top](#top)

> References

- http://lodashjs.com/
- [Lodash 中文文档](http://www.css88.com/doc/lodash/)
- [Lodash 中文文档4.5](https://www.kancloud.cn/wizardforcel/lodash-doc-45/144108)
- [lodash 中文学习拾零之Array篇](http://blog.csdn.net/soaring_tiger/article/details/48089017)


