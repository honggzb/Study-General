**JavaScript中将值转换为字符串的5种方法比较**

- Concat Empty String: `value + '';`
- Template Strings: `${value}`
- JSON.stringify:  `JSON.stringify(value);`
- toString():   `value.toString();`
- String(): `String(value);`

Concat Empty String|Template Strings|JSON.stringify|toString()|String()
---|---|---|---|---
`"hello" + '';`  'hello|`${hello};`  'hello'|`JSON.stringify("hello");`  'hello'|`"hello".toString();`  'hello'|`String("hello");`   'hello'
`123 + '';`  '123'|`${123};`  '123'|`JSON.stringify(123);`    '123'|`123.toString();`  '123'|`String(123);`   '123'
`true + '';`  'true'|`${true};`  'true'|`JSON.stringify(true);`  'true'|`true.toString();`  'true'|`String(true);`   'true'
`[1, "2", 3] + '';`  '1,2,3'|`${[1, "2", 3]};`  '1,2,3'|`JSON.stringify([1, "2", 3]);`  '[1,"2",3]'|`[1, "2", 3].toString();`  '1,2,3'|`String([1, "2", 3]);`   '1,2,3'
`{one: 1 } + '';`  '[object Object]'|`${{one: 1 }};`   '[object Object]'|`JSON.stringify({one: 1 });`  '{"one":1}'|`{one: 1 }.toString();`  '[object Object]'|`String({one: 1 });`  '[object Object]'
`undefined + '';`  'undefined'|`${undefined};`   'undefined'|`JSON.stringify(undefined);`   undefined|`undefined.toString();`  ❌ TypeError|`String(undefined);` 'undefined'
`null + ''; ` 'null'|`${null};`   'null'|`JSON.stringify(null);`  'null'|`null.toString();`  ❌ TypeError|`String(null);` 'null'
`Symbol('123')+ '';`  ❌ TypeError|`${Symbol('123')}`;  ❌ TypeError|J`JSON.stringify(Symbol('123'));`  undefined|`Symbol('123').toString()`   'Symbol(123)'|`String(Symbol('123'));`  'Symbol(123)'

https://juejin.im/post/5cf78797f265da1b6720fcfa
