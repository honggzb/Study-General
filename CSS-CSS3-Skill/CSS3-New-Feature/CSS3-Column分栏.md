
Properties属性|	CSS Version版本|继承性|	Description简介
---|---|---|---
columns|	CSS3|	无|CSS3 columns 属性，是复合属性，设置或检索对象的列数和每列的宽度
column-width|	CSS3|	无|	CSS3 column-width 属性，设置或检索对象每列的宽度
column-count|	CSS3|	无|CSS3 column-count 属性，设置或检索对象的列数
column-gap|	CSS3|	无	|CSS3 column-gap 属性，设置或检索对象的列与列之间的间隙
column-rule|	CSS3|	无	|CSS3 column-rule 属性，是复合属性。设置或检索对象的列与列之间的边框。
column-rule-width|	CSS3|	无|	CSS3 column-rule-width 属性，设置或检索对象的列与列之间的边框厚度。
column-rule-style|	CSS3|	无	|CSS3 column-rule-style 属性，设置或检索对象的列与列之间的边框样式。
column-rule-color|	CSS3|	无|	CSS3 column-rule-color 属性，设置或检索对象的列与列之间的边框颜色。
column-span|	CSS3|	无|	CSS3 column-span 属性，设置或检索对象元素是否横跨所有列。
column-fill|	CSS3|	无	|CSS3| column-fill 属性，设置或检索对象所有列的高度是否统一。
column-break-before|	CSS3|	无	|CSS3 column-break-before 属性，设置或检索对象之前是否断行。
column-break-after|	CSS3|	无|	CSS3 column-break-after 属性，设置或检索对象之后是否断行。
column-break-inside|	CSS3	|无|	CSS3 column-break-inside 属性，设置或检索对象内部是否断

- column-rule-style：列之间分割线风格(`：none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset`)  
  - none： 无轮廓
  - column-rule-color与column-rule-width将被忽略
  - hidden： 隐藏边框
  - dotted： 点状轮廓
  - dashed： 虚线轮廓
  - solid： 实线轮廓
  - double： 双线轮廓。两条单线与其间隔的和等于指定的column-rule-width值
  - groove： 3D凹槽轮廓
  - ridge： 3D凸槽轮廓
  - inset： 3D凹边轮廓
  - outset： 3D凸边轮廓
- column-rule-color：列之间分割线演示  
- column-span: 允许一个元素的宽度跨越多列  
- column-fill: 分列方式  

```css
.column2(@count: 2)
{
  column-count: @count;
  column-gap: 5rem;
  column-rule-color: #e6e7e8;
  column-rule-style: solid;
  column-rule-width: 1px;
	-moz-column-count: @count;
  -moz-column-gap: 5rem;
  -moz-column-rule-color: #e6e7e8;
  -moz-column-rule-style: solid;
  -moz-column-rule-width: 1px;
	-webkit-column-count: @count;
  -webkit-column-gap: 5rem;
  -webkit-column-rule-color: #e6e7e8;
  -webkit-column-rule-style: solid;
  -webkit-column-rule-width: 1px;
}
```

http://www.w3chtml.com/css3/properties/multi-column/
