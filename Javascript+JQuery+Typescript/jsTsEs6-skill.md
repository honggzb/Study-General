||||
|---|---|---|
|利用解构2赋值交换变量的值|`[a, b] = [b,a]`||
|sort|for Object Array<br>`xxx.sort((a, b) => b.balance - a.balance)`<br>return Array||
|filter|for Object Array<br>`xxx = xxx.filter((a) => a.type === type)`<br>return Array||
|delete|for Object Array<br>`xxx = xxx.filter((a) => a.type !== type)`<br>return Array|`str.splice(i,1)` for string|
|find|for Object Array<br>`pet = pets.find(pet => pet.type ==='Dog' && pet.name === 'Tommy')`<br>return Object||

数组去重

|||
|---|---|
|去重1|`[...new Set(arr)]`|
|去重2|`arr.filter((item, index) => arr.indexOf(item) === index)`|
|去重3|`arr.reduce((unique, item) => unique.name.includes(item.name) ? unique : [...unique, item], [])`|
|对象数组1|`var hash = {};`<br>`arr = arr.reduce(function(item, next) {` <br> `hash[next.name] ? '' : hash[next.name] = true && item.push(next);`<br>  `return item;`<br>`}, [])]`|
|对象数组2|`const map = new Map();` <br> `arr = arr.filter(v => !map.has(v.name) && map.set(v.name, v))`|

```js
function unique(array){
    var res = []
    for(var i=0;i<array.length;i++) {
        for(var j=0;j<res.length;j++) {
            if(array[i] === res[j]) {
                break
            }
        }
        if(j === res.length) {
            res.push(array[i])
        }
    }
    return res  
}
```

-----------------------------
- [JavaScript 单行代码](#javascript-单行代码)
- [数组中flat方法](#数组中flat方法)
- [失败重载](#失败重载)
- [下载各种文件](#下载各种文件)

## JavaScript 单行代码

|||
|---|---|
|反转字符串|`str.split('').reverse().join('')`|
|标题大小写为字符串|`sentence.replace(/\b\w/g, char => char.toUpperCase());`|
|变量之间交换值|`[a, b] = [b, a];`|
|将数字转换为布尔值|`const isTruthy = num => !!num;`|
|截断字符串|const truncateString = (str, maxLength) => (str.length > maxLength) ? `str.slice(0, maxLength)` : str;<br>`truncateString("Hello World", 8); // Hello Wo...`|
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

## 数组中flat方法

```js
let data = {
    type1:[
        {id:1,title:'title1',value:"value1"},
        {id:2,title:'title2',value:"value2"},
    ],
    type2:[
        {id:5,title:'title5',value:"value5"},
        {id:6,title:'title6',value:"value6"},
    ]
}
let values = Object.values(data);
let flatArr = values.flat();
// [{id: 1, title: 'title1', value: 'value1'}, {…}, {id: 5, title: 'title5', value: 'value5'}, {…}]
```

## 失败重载

```js
function request() {
    return new Promise((resolve, reject) => {
        // 随机数模拟请求成功与失败
        let num = Math.random() * 5;

        if (num > 3) {
            resolve("成功")
        } else {
            reject("失败")
        }
    })
}
function reload(fn, n) {
    // fn:请求函数，n:重试次数
    return new Promise(async (reslove, reject) => {
        // 限定次数完还没请求成功就不再执行
        while (n--) {
            try {
                let res = await fn();
                reslove("请求成功", res)
                // 请求成功就直接跳出循环不再执行
                break;
            } catch (err) {
                if (n <= 0) {
                    reject("次数用完仍然没请求成功")
                }
            }

        }
    })
}
reload(request, 3).then(res =>{
    console.log(res)
}).catch(err =>{
    console.log(err)
})
function getData(){
    return axios.get("http://xxxx")
}
reload(getData, 3).then(res =>{
    console.log(res)
}).catch(err =>{
    console.log(err)
})
```

## 下载各种文件

```js
<input type="text" id="fileUrl">
<button id="btn">下载</button>
async function download() {
    let url = fileUrl.value
    let response = await fetch(url)
    let file = await response.blob()
    let link = document.createElement("a")
    link.href = URL.createObjectURL(file)
    link.download = `文件${new Date()}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
}
btn.onclick = download
```

