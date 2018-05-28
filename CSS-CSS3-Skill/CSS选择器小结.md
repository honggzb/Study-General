[CSS选择器小结](#top)

- CSS3选择器规范地址：	   https://www.w3.org/TR/2011/REC-css3-selectors-20110929/
- CSS3选择最新选择器规范:  https://www.w3.org/TR/selectors  
	
|基本选择器|说明|
| :------------- | :------------- |
|通配符选择器|`*{ margin: 0; padding: 0; border: none; }`|
|元素选择器|`body { background: #eee; }`|
|类选择器|`.list { list-style: square; }`|
|ID选择器|`#list { width: 500px; margin: 0 auto; }`|
|后代选择器|`.list li { margin-top: 10px; background: #abcdef; }`|
|基本选择器扩展||
|子元素选择器<br>也可称为直接后代选择器,此类选择器只能匹配到直接后代，不能匹配到深层次的后代元素|`#wrap > .inner {color: pink;}`|
|相邻兄弟选择器<br>它只会匹配紧跟着的兄弟元素|`#wrap #first + .inner {color: #f00;}`|
|通用兄弟选择器<br>它会匹配所有的兄弟元素(不需要紧跟)|`#wrap #first ~ div { border: 1px solid;}`|
|选择器分组<br>此处的逗号我们称之为结合符|`h1,h2,h3{color: pink;}`|
