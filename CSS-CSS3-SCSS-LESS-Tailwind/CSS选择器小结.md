[CSS选择器小结](#top)

- CSS3选择器规范地址：	   https://www.w3.org/TR/2011/REC-css3-selectors-20110929/
- CSS3选择最新选择器规范:  https://www.w3.org/TR/selectors  

**单冒号 vs 双冒号**

- 单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。
  - 对于CSS2中已经有的伪元素，例如 :before，单冒号和双冒号的写法 ::before 作用是一样的
  - 如果网站只需要兼容 webkit、firefox、opera 等浏览器，建议对于伪元素采用双冒号的写法，如果不得不兼容 IE 浏览器，还是用 CSS2 的单冒号写法比较安全

![](https://i.imgur.com/1M8x52R.png)

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
| :------------- | :------------- |
|`:not`|	|
|`:empty`|(内容必须是空的，有空格都不行，有attr没关系)|

- index的值从1开始计数！！！！
- index可以为变量n(只能是n)
- index可以为even odd
- :nth-child和:nth-of-type有一个很重要的区别: **nth-of-type以元素为中心！！**
  - `#wrap li:nth-child(index)`:  表示匹配#wrap中第index的子元素, 这个子元素必须是li
  - `#wrap ele:nth-of-type(index)`:  表示匹配#wrap中第index的ele子元素

```html
<style>
div > a:not(:last-of-type) {border-right: 1px solid red;}
</style>
<div>
	<a href="#">first</a>
	<a href="#">second</a>
	<a href="#">third</a>
	<a href="#">fourth</a>
	<a href="#">fifth</a>
</div>
```
 
|伪元素|说明|
| :------------- | :------------- |
|`::after`||
|`::before`||
|`::firstLetter`|`div::first-letter`|
|`::firstLine`||
|`::selection`|`div::selection {background: red;color: pink;}`|


### css声明的优先级
  
- 选择器的特殊性
  - 选择器的特殊性由选择器本身的组件确定，特殊性值表述为4个部分，如    0,0,0,0
  - 一个选择器的具体特殊性如下确定：
    - 1.对于选择器中给定的ID属性值，加 0,1,0,0
    - 2.对于选择器中给定的各个类属性，属性选择，或伪类，加 0,0,1,0
    - 3.对于选择器中的给定的各个元素和伪元素，加0,0,0,1
    - 4.通配符选择器的特殊性为0,0,0,0
    - 5.结合符对选择器特殊性没有一点贡献
    - 6.内联声明的特殊性都是1,0,0,0
    - 7.继承没有特殊性
     -注意：id选择器和属性选择器: `div[id="test"]（0,0,1,1）` 和 `#test（0,1,0,0）`   
  - 特殊性 1,0,0,0 大于所有以0开头的特殊性(不进位)
  - 选择器的特殊性最终都会授予给其对应的声明
  - 如果多个规则与同一个元素匹配，而且有些声明互相冲突时，特殊性越大的越占优势
- 继承
  - 继承没有特殊性，甚至连0特殊性都没有
  - 0特殊性要比无特殊性来的强
- 层叠
  - 1.找出所有相关的规则，这些规则都包含一个选择器
  - 2.计算声明的优先级
    - 先按来源排序
    - 在按选择器的特殊性排序
    - 最终按顺序
