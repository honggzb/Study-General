## Angularjs工具方法

工具方法|功能|返回值
---|---|---
`angular.isArray(value)`| 判断是否是数组|返回true/false
`angular.isDate(value)` |判断是否是日期类型|返回true/false
`angular.idDefined(value)`| 判断是否被定义了|返回true/false
`angular.isElement(node)`|判断是否是DOM节点|返回true/false
`angular.isFunction(value)`|判断是否是Function类型|返回true/false
`angular.isNumber(value)`| 判断是否是Number类型，其中包括NaN,Infinity和-Infinity|返回true/false
`angular.isObject(value)`|判断是否是Object类型，Array是Object类型，Null不是Object类型|返回true/false
`angular.isString(value)`|判断是否是字符串类型|返回true/false
`angular.uppercase(value)`| 转换成大写|
`angular.lowercase(value)`| 转换成小写|
`angular.equals(o1,o2)`| 判断两个字符串是否相等|返回true/false
`angular.extend(dst,src)`|继承关系|
`angular.fromJson(json)`|反序列化json字符串，把json字符串转换成JavaScript Object对象|
`angular.toJson(obj,pretty)`|格式化json字符串|
`angular.copy(source, [destination])`|复制|
`angular.forEach(obj, iterator, [context])`||
`angular.bind(self, fn, args)`|绑定对象，作为函数的上下文|
