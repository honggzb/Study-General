[CSS选择器小结](#top)

- CSS3选择器规范地址：	   https://www.w3.org/TR/2011/REC-css3-selectors-20110929/
- CSS3选择最新选择器规范:  https://www.w3.org/TR/selectors  
	
| 类型|说明|
| :------------- | :------------- |
|**基本选择器**|  |
|通配符选择器|`*{ margin: 0; padding: 0; border: none; }`|
|元素选择器|`body { background: #eee; }`|
|类选择器|`.list { list-style: square; }`|
|ID选择器|`#list { width: 500px; margin: 0 auto; }`|
|后代选择器|`.list li { margin-top: 10px; background: #abcdef; }`|
|**基本选择器扩展**||
|子元素选择器<br>也可称为直接后代选择器,此类选择器只能匹配到直接后代，<br>不能匹配到深层次的后代元素|`#wrap > .inner {color: pink;}`|
|相邻兄弟选择器<br>它只会匹配紧跟着的兄弟元素|`#wrap #first + .inner {color: #f00;}`|
|通用兄弟选择器<br>它会匹配所有的兄弟元素(不需要紧跟)|`#wrap #first ~ div { border: 1px solid;}`|
|选择器分组<br>此处的逗号我们称之为结合符|`h1,h2,h3{color: pink;}`|
|------------- | ------------ |
|**属性选择器**|| 
|**存在和值属性选择器**||
|`[attr]`|该选择器选择包含 attr 属性的所有元素，不论 attr 的值为何|
|`[attr=val]`|该选择器仅选择 attr 属性被赋值为 val 的所有元素|
|`[attr~=val]`|表示带有以 attr 命名的属性的元素，并且该属性是一个以空格作为分隔的值列表，其中至少一个值为val|
|**子串值属性选择器**||
|`[attr|=val]`|选择attr属性的值是val（包括val）或以val-开头的元素|
|`[attr^=val]`|选择attr属性的值以val开头（包括val）的元素|
|`[attr$=val]`|选择attr属性的值以val结尾（包括val）的元素|
|`[attr*=val]`|选择attr属性的值中包含字符串val的元素|
|------------- |------------- |  
|**伪类与伪元素选择器**||
|链接伪类|注意:link，:visited，:target是作用于链接元素的！|
|:link|表示作为超链接，并指向一个未访问的地址的所有锚|
|:visited|表示作为超链接，并指向一个已访问的地址的所有锚|
|:target|代表一个特殊的元素，它的id是URI的片段标识符|
|**动态伪类**|注意:hover，:active基本可以作用于所有的元素！|
|:hover|表示悬浮到元素上|
|:active|表示匹配被用户激活的元素（点击按住时）|

- 由于a标签的:link和:visited可以覆盖了所有a标签的状态，所以当:link，:visited，:hover，:active同时出现在a标签身上时 :link和:visited不能放在最后！！！
- 隐私与:visited选择器: 只有下列的属性才能被应用到已访问链接：
  - `color`
  - `background-color`
  - `border-color`

| 类型|说明|
| :------------- | :------------- |
|**表单相关伪类**||
|`:enabled`|匹配可编辑的表单|
|`:disable`|匹配被禁用的表单|
|`:checked`|匹配被选中的表单|
|`:focus	`|匹配获焦的表单|
|------------- |------------- |
|**结构性伪类**||				
|**:nth-child(index)系列**||		
||`:first-child`|
||`:last-child`|
||`:nth-last-child(index)`|
||`:only-child`	(相对于:first-child:last-child 或者 :nth-child(1):nth-last-child(1))|
|**:nth-of-type(index)系列**||
||`:first-of-type`|
||`:last-of-type`|
||`:nth-last-type(index)`|
||`:only-of-type`	(相对于:first-of-type:last-of-type 或者 :nth-of-type(1):nth-last-of-type(1))|

- index的值从1开始计数！！！！
- index可以为变量n(只能是n)
- index可以为even odd
- :nth-child和:nth-of-type有一个很重要的区别: **nth-of-type以元素为中心！！**
  - `#wrap li:nth-child(index)`:  表示匹配#wrap中第index的子元素, 这个子元素必须是li
  - `#wrap ele:nth-of-type(index)`:  表示匹配#wrap中第index的ele子元素

| 类型|说明|
| :------------- | :------------- |
|`:not`|	|
|`:empty`|(内容必须是空的，有空格都不行，有attr没关系)|
|------------- |------------- |
|**伪元素**||
||`::after`|
||`::before`|
||`::firstLetter`|
||`::firstLine`|
||`::selection`|
