||||
|---|---|---|
|利用解构2赋值交换变量的值|`[a, b] = [b,a]`||
|sort|including Object Array<br>`xxx.sort((a, b) => b.balance - a.balance)`|return Array|
|filter|including Object Array<br>`xxx = xxx.filter((a) => a.type === type)`|return Array|
|deltete|including Object Array<br>`xxx = xxx.filter((a) => a.type !== type)`|return Array|
|find|including Object Array<br>`pet = pets.find(pet => pet.type ==='Dog' && pet.name === 'Tommy')`|return Object|

## JavaScript 单行代码

|||
|---|---|
|反转字符串|`str.split('').reverse().join('')`|
|标题大小写为字符串|`sentence.replace(/\b\w/g, char => char.toUpperCase());`|
|变量之间交换值|`[a, b] = [b, a];`|
|将数字转换为布尔值|`const isTruthy = num => !!num;`|
|截断字符串|const truncateString = (str, maxLength) => (str.length > maxLength) ? `${str.slice(0, maxLength)}...` : str;`<br>`truncateString("Hello World", 8); // Hello Wo...`|
|计算字符串中的元音数|`const countVowels = str => (str.match(/[aeiou]/gi) || []).length;`|
|删除字符串中的空格|`const removeWhitespace = str => str.replace(/\s/g, '');`|
|------------------------|------------------------------|
|数组去重|`const uniqueArray = arr => [...new Set(arr)];`|
|合并数组|`const mergeArrays = (...arrays) => [].concat(...arrays);`|
|检查数组是否相等|`const areArraysEqual = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2)`|
|------------------------|------------------------------|
|深度克隆对象|`const deepClone = obj => JSON.parse(JSON.stringify(obj));`|
|检查对象是否为空|`const isEmptyObject = obj => Object.keys(obj).length === 0;`|
|------------------------|------------------------------|
|计算数字的平均值|`const average = arr => arr.reduce((acc, num) => acc + num, 0) / arr.length;`|
|生成一个数字范围|`const range = (start, end) => [...Array(end - start + 1)].map((_, i) => i + start);`<br>`range(5, 15); // [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]`|
|生成指定长度的随机字符串|`const generateRandomString = length => [...Array(length)].map(() => Math.random().toString(36)[2]).join('')`|
|------------------------|------------------------------|
|将对象转换为查询参数|`const objectToQueryParams = obj => Object.entries(obj).map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&');`<br>`objectToQueryParams({ page: 2, limit: 10 }) // page=2&limit=10`|
|检查有效的电子邮件|`const isValidEmail = email => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)`|
|复制内容到剪贴板|`const copyToClipboard = (content) => navigator.clipboard.writeText(content)`|
|获取 HH:MM:SS 格式的当前时间|`const currentTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })`<br>`currentTime() // 19:52:21`|
|------------------------|------------------------------|
|计算两个日期之间的间隔|`const dayDiff = (d1, d2) => Math.ceil(Math.abs(d1.getTime() - d2.getTime()) / 86400000)`|
|找出该日期是一年中的第几天|`const dayInYear = (d) => Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)`|

