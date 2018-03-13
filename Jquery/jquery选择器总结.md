### 基本CSS选择器

|选择器 |描述 |
| :------------- | :------------- |
|`*`|匹配任何元素|
|`E`　|匹配标签名称为E的所有元素|
|`E  F`|匹配标签名称为F，同时作为E的后代节点的所有元素|
|`E>F`　|匹配标签名为F，同时作为E的直接子节点的所有元素( 第一代)|
|`E+F`　|匹配前面是邻近兄弟节点E的所有元素F（E和F紧挨着）,相当于next()方法|
|`E~F`　|匹配前面是任何兄弟节点E的所有元素F（E和F不需要紧挨着）,相当于nextAll()方法|
|`E:has(F)`|匹配标称名为E，至少有一个标签名为F的后代节点的所有元素|
|`E.C`|匹配类为C的所有元素E|
|`E#idvalue`|匹配id为指定的idvalue的元素E|
|`E［A］`|匹配带有特性A的所有元素E|

### 属性选择器

|选择器 |描述 |
| :------------- | :------------- |
|`$("div[id]");` |选择所有含有id属性的div元素| 
|`$("input[name='keleyicom']"); `|选择所有的name属性等于'keleyicom'的input元素 |
|`$("input[name!='keleyicom']");`|选择所有的name属性不等于'keleyicom'的input元素 |
|`$("input[name^='keleyi']");` |选择所有的name属性以'keleyi'开头的input元素 |
|`$("input[name$='keleyi']");` |选择所有的name属性以'keleyi'结尾的input元素 |
|`$("input[name*='keleyi']");`|选择所有的name属性包含'keleyi'的input元素 |
|`$("input[id][name$='keleyi']");` |可以使用多个属性进行联合选择，该选择器是得到所有的含有id属性并且那么属性以keleyi结尾的元素|

### 位置选择器

|选择器 |描述 |示例|
| :------------- | :------------- |:------------- |
|`:first`|第一个匹配项|`li a:first`返回第一个在<li>中的超链接对象|
|`:last`|最后一个匹配项|`li a:last`返回最后一个在<li>中的超链接对象|
|`:first-child`|第一个子元素|`li:first-child`返回每个列表的第一个<li>子元素（第一个li对象）|
|`:last-child`|最后一个子元素|`li:last-child`返回每个列表的最后一个<li>子元素（最后一个li对象）|
|`:only-child`|返回没有兄弟节点的所有对应元素|`ul:only-child`返回没有兄弟节点的<ul>元素|
|`:nth-child(n)`|返回第n个子节点（n从1开始计数）|`li:nth-child(2)`返回每个列表的第2个<li>项|
|`:nth-child(even|odd)` 返回偶数或奇数的子节点（从1开始计数）|`li:nth-child(even)`返回每个列表中的偶数<li>项|
|`:nth-child(Xn+Y)`|根据传入的公式计算的第n个子节点。如果Y为0，则忽略Y。n从0开始，且X不等于0|`li:nth-child(3n)`返回序号是3的倍数的<li>项，而`li:nth-child(5n+1)`则返回序号是5的倍数加1的<li>项|
|`:even`或`:odd`|返回页面内的偶数或奇数的匹配元素|`li:even`返回全部偶数<li>项，注意，序号计算是按整页内来计数的|
|`:eq(n)` |返回第n个匹配的元素（n从0开始计数）||
|`:gt(n)` |返回第n个匹配元素之后的元素（n从0开始计数，不包括第n个元素）||
|`:lt(n)`|返回第n个匹配元素之前的元素（n从0开始计数，不包括第n个元素）||

### 自定义筛选选择器

|选择器 |描述 |
| :------------- | :------------- |
|`:animated`|选择当前处于动态控制之下的元素|
|`:button`|选择任何按钮|
|`:checkbox`|选择任何复选框元素|
|`:checked`|选择任何已选中的复选框元素或单选按钮|
|`:contains(foo)`|选择包含文本foo的元素,`$('td:contains("abcd")').addClass('highlight');`|
|`:disabled`|选择在界面上已经禁用的表单元素|
|`:enabled`|选择在界面上已经启用的表单元素|
|`:file`|选择所有文件元素（input[type=file])|
|`:header`|选择标题元素（包括<h1>、<h2>直到<h6>）|
|`:hidden`|选择隐藏元素|
|`:image`|选择表单中的图像元素|
|`:input`|选择表单元素（包括：<input>, <select>, <textarea>,<button>）|
|`:not(filter)`|根据指定筛选器进行求反后得到的元素|
|`:parent`|选择在拥有后代节点的元素|
|`:password`|选择口令元素|
|`:radio`|选择单选按钮元素|
|`:reset`|选择复位元素|
|`:selected`|选择已选中的选项元素|
|`:submit`|选择提交按钮|
|`:text`|选择文本字段元素|
|`:visible`|选择可见元素|

### 表单选择器

|选择器 |示例|描述 |
| :------------- | :------------- |:------------- |
|`:input`|`$(":input")`|所有表单元素,包括textarea,select|
|`:text`|`$(":text")`|所有 type="text" 的 <input> 元素|
|`:password`|`$(":password")`|所有 type="password" 的 <input> 元素|
|`:radio`|`$(":radio")`|所有 type="radio" 的 <input> 元素|
|`:checkbox`|`$(":checkbox")`|所有 type="checkbox" 的 <input> 元素|
|`:submit`|`$(":submit")`| type="submit" 的 <input> 元素|
|`:reset`	|`$(":reset")`|所有 type="reset" 的 <input> 元素|
|`:button`|	`$(":button")`|所有 type="button" 的 <input> 元素|
|`:image`|`$(":image")`	|所有 type="image" 的 <input> 元素|
|`:file`|`$(":file")`|所有 type="file" 的 <input> 元素|
| ------------- | ------------- |------------- |
|`:enabled`|`$(":enabled")`|所有激活的 input 元素|
|`:disabled`|`$(":disabled")`|所有禁用的 input 元素|
|`:selected`|`$(":selected")`|所有被选取的 input 元素|
|`:checked`|`$(":checked")`|所有被选中的 input 元素|

### CSS 伪类

|选择器 |描述 |
| :------------- | :------------- |
|:active|	向被激活的元素添加样式 |
|:focus	|向拥有键盘输入焦点的元素添加样式 |
|:hover	|当鼠标悬浮在元素上方时，向元素添加样式 |
|:link	|向未被访问的链接添加样式 |
|:visited	|向已被访问的链接添加样式 |
|:first-child	|向元素的第一个子元素添加样式 |
|:lang	|向带有指定 lang 属性的元素添加样式 |
 
### CSS 伪元素

|选择器 |描述 |
| :------------- | :------------- |
|:first-letter	|向文本的第一个字母添加特殊样式 |
|:first-line	|向文本的首行添加特殊样式 |
|:before	|在元素之前添加内容 |
|:after	|在元素之后添加内容 |

> Reference
> - [jQuery所支持的各类CSS选择器](jQuery所支持的各类CSS选择器)
> - [js jquery css 选择器总结](https://www.cnblogs.com/ooo0/p/6115324.html)
