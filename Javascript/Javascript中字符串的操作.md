## Javascript中字符串的操作

<table>
    <tbody>
     <tr><td colspan="3" align="center">**字符串的查找**</td></tr>
      <tr>
        <td>索引`[ ]`</td>
        <td>通过下标获取字符串指定位置的字符，但是不能改变该索引对应的值</td>
        <td>
        `var str = "hello world"`<br>
        `alert(str[0]);`<br>
        `str[0] = "H";//不会影响str,但也不会报错`
        </td>
      </tr>
      <tr>
        <td>`indexOf(serarchString, position)`<br>`lastIndexOF(serarchString, position)`</td>
        <td>搜索指定字符串出现的位置,<br>- 第一个参数表示要查找的元素，<br>- 第二个参数表示要查找的位置，<br>若找到则返回对应元素所在的位置，否则返回-1</td>
        <td>
        `var s = 'hello world!';`<br>
`alert(s.indexOf('world'));//返回6`<br>
`alert(s.indexOf('World'));//返回-1`<br>
`alert(s.indexOf('o'));//返回4`<br>
`alert(s.indexOf('o',6));//从第六位开始查找，返回7`
        </td>
      </tr>
      <tr>
        <td>`charAt(index)`</td>
        <td>返回字符串中位置为index的字符</td>
        <td>
        `"abc".charAt(1);   //"b"`
        </td>
      </tr>
      <tr>
        <td>`charCodeAt(index)`</td>
        <td>返回字符串中位置为index的字符代码。对于ASCII 字符，这将返回其ASCII代码</td>
        <td>
        `"abc".charCodeAt(0);    //97`
        </td>
      </tr>
      <tr><td colspan="3" align="center">**字符串的合并**</td></tr>
      <tr>
        <td>concat<br>(和“+”类似)</td>
        <td>将一个或多个字符串拼接起来，返回拼接到的新的字符串，原字符串不变</td>
        <td>
        `var str1 = "hello ";`<br>
        `var res = str1.concat(" world","!");  //返回hello world！`
        </td>
      </tr>
      <tr>
        <td>join("character")</td>
        <td>将一个或多个字符串拼接起来，返回拼接到的新的字符串，原字符串不变</td>
        <td>
        `var str1 = "hello ";`<br>
        `var res = str1.concat(" world","!");`<br>
        `alert(res);//返回hello world！`<br>
        `alert(str1);//返回hello`
        </td>
      </tr>
      <tr><td colspan="3" align="center">**字符串的拆分，截取方式**</td></tr>
      <tr>
        <td>`slice(start,end)`</td>
        <td>返回被操作字符的子字符串，原字符串不变，接受两个参数，字符串的起始位置和结束位置，<br>- 返回的字符串不包含结束位置的字符，第一个参数要小于第二个参数，否则返回"",<br>- 若只有一个参数，返回起始位置到字符串结尾的所有字符串，<br>- 若传递的参数为负数，将传入的负值与字符创的长度相加</td>
        <td>
        var str = "hello world!";<br>
        alert(str.slice(3,7));//返回lo w<br>
        alert(str.slice(3));//返回lo world!<br>
        alert(str.slice(9,5));//返回""<br>
        alert(str.slice(-7,-3));//负数与长度相加，即str.slice(5,9)返回 wor<br>
        alert(str.slice(5,9));//返回 wor
        </td>
      </tr>
      <tr>
        <td>`split(separator,limit)`</td>
        <td>将字符串以separator作为分割符切割成多个子字符串，并将他们作为一个数组返回<br>
        - limit(可选)表示数组的最大长度，超过的部分将被舍弃。<br> - separator分隔符不被包含在任何子字符串中，如果sepatator为空字符串，则返回字符串中的字符序列组成的数组<br>- 如果split方法没有任何参数，则返回仅包含字符串本身，仅有一个元素的数组</td>
        <td>
        `"a1,b1,c1".split(","); // ["a1","b1","c1"]`<br>
        `"a,b,c".split(",",2); //["a","b"]`<br>
        `"a,b,c".split("");   //["a",",","b",",","c"];`<br>
        `"ab,c".split();   //["ab,c"]`<br>
        `var s = "1,23,45";`<br>
        `var arr1 = s.split(",");`<br>
        `alert(arr1);//返回数组["1","23","45"]`<br>
        `var arr2 = s.split(",",2);`<br>
        `alert(arr2);//返回数组["1","23"]`
        </td>
      </tr>
      <tr>
        <td>`substring(start,end)`</td>
        <td>当传入的参数是正数时，substring与slice的功能基本相同，唯一的区别是当第一个参数大于第二个参数时，方法将第二个参数作为截取的起始位置而将第一个参数作为截取结束的位置，且截取的字符串不包含第一个参数位置对应的值，当传入的参数是负值时，该方法会将所有的负值转化为0</td>
        <td>
        var str = "hello world!";<br>
        alert(str.substring(3,7));//返回lo w<br>
        alert(str.substring(3));//返回lo world!<br>
        alert(str.substring(9,5));//返回 wor,即str.substring(5,9),不包含第九项<br>
        alert(str.substring(-7,-3));//负数与长度相加，即str.substring(0,0)返回""<br>
        alert(str.substring(-7,3));//负数与长度相加，即str.substring(0,3)返回hel
        </td>
      </tr>
      <tr>
        <td>`substr(start,length)`</td>
        <td>返回指定位置开始的指定长度的字符串，原字符串不变，若第二个参数缺省就一直截取到字符串结束，当传递的参数为负值时，方法会将负的第一个参数与字符串的长度相加，将负的第二个参数转化为0</td>
        <td>
        var s = 'hello world!'<br>
        alert(s.substr(0, 5));//从索引0开始，截取5个字符串，返回hello<br>
        alert(s.substr(7)); //从索引7开始截取，一直到结束，返回orld<br>
        alert(s.substr(-7,3));//负数与长度相加，即str.substr(5,3),返回 wo<br>
        alert(s.substr(-7,-3));//负数与长度相加，即str.substr(5,0),返回""
        </td>
      </tr>
      <tr>
        <td>`str.trim()`<br>`str.strimLeft()`<br>`str.strimRight()`<br>IE9+</td>
        <td>原数组不变</td>
        <td>
        `var str1 = "      hello world   ";`<br>
        `var str2 = str1.trim();  //返回"hello world"`
        </td>
      </tr>
      <tr><td colspan="3" align="center">**字符串的大小写转换**</td></tr>
      <tr>
        <td>`toLowerCase()`<br>`toUpperCase()`<br>`toLocalLowerCase()`<br> `toLocalUpperCase()`</td>
        <td>String 对象的大小写转换</td>
        <td></td>
      </tr>
      <tr><td colspan="3" align="center">**替换和匹配字符串**</td></tr>
      <tr>
        <td>`Replace(searchValue,replaceValue)`</td>
        <td>将字符串中第一个出现的searchValue子字符串替换为replaceValue，并返回新的字符串。原有的字符串不受影响</td>
        <td>`replace("aa","bb")`<br>`//替换所有,replace(/aa/g,bb);`</td>
      </tr>
      <tr>
        <td>`match(reExp)`</td>
        <td>从字符串中搜索出匹配regExp正则表达式的所有子字符串，将他们作为一个数组返回。利用对象类型到布尔类型的转换规则，还可以判断一个字符串是否匹配regExp表示的正则表达式<br>类似RegExp的exec()方法</td>
        <td>`var stringValue="bat,cat";`<br>` var patter=/.at/;`<br> `stringvalue.match(patter);`</td>
      </tr>
      <tr>
        <td>`search(regExp)`</td>
        <td>返回字符串的索引项,没有返回-1</td>
        <td>`alert(str.search(/abc/g));//显示“１”`</td>
      </tr>
      <tr>
        <td>encodeURI()<br>encodeURIComponent()</td>
        <td></td>
        <td>`var uri = "http://www.xx.com/illegal value.html#start";`<br>
`alert(encodeURI(uri));// http://www.xx.com/illegal%20value.html#start`<br>
`alert(encodeURIComponent(uri));//http%3A...`</td>
      </tr>
      <tr>
        <td>Math</td>
        <td>`Math.max.apply(Math,[1,2,3,4,5,6]);`<br>
            `Math.Ceil()` 执行向上舍入<br>`Math.floor()` 执行向下舍入<br>
            `Math.round()`执行标准舍入</td>
        <td></td>
      </tr>
    </tbody>
</table>

- `new String(stringValue)`, 将参数转换为字符串，并作为一个String 对象
- 参数是负值的情况下：
  - slice()方法会将传入的负值与字符串长度相加
  - substr()方法将负的第一个参数加上字符串长度，第二个参数转换成0
  - substring()方法会把所有负值参数都转换为0
- 判断字符串中是否包含某个字符（indexOf），  `if(str.indexOf('?')>=0){//// 条件成立就是指包含 某个字符} `

**案例1：请把用户输入的不规范的英文名字，变为首字母大写，其他小写的规范名字**

```javascript
var arr = ['adam', 'LISA', 'barT'];
function normalize(arr) {
    function toCase(x){
        return x[0].toUpperCase()+x.substring(1).toLowerCase();
    }
    return arr.map(toCase);
}
```

**案例2：把字符串转换为数字类型**

```javascript
var str = "13579";
function toNumber(str){
    var arr = str.split('');  // 这里把字符串拆分数组['1','3','5','7','9']
    var arr2 = arr.map(function(x){return x-0});// 这里把字符串转换为数字类型
    var resoult = arr2.reduce(function(x,y){return x*10+y}) ;  
return resoult;
}
```

**案例3：通过利用map() 把字符串转换为整数**

```javascript
var arr =['1','2','3'];
function toNumber(x){
  return parseInt(x);
}
var resoult =arr.map(toNumber);
```

**案例4：去除数组中相同的元素。使用indexOf()**

```javascript
var arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
var res = arr.filter(function (element, index, self) {
    return self.indexOf(element) === index;
});
```

- [廖雪峰的JavaScript教程](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000)
