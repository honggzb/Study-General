### css3新增结构性伪类

---

css3新增结构性伪类|说明
---|---
E：nth-child(n) |E父元素中的第n个字节点
p:nth-child(odd){background:red}|匹配奇数行
p:nth-child(even){background:red}|匹配偶数行
p:nth-child(2n){background:red}|
E：nth-last-child(n)|父元素中的第n个字节点，从后向前计算
E：only-child |E元素中只有一个子节点。注意：子节点不包含文本节点
E：first-child |E元素中的第一个子节点
E：last-child |E元素中的最后一个子节点
E：nth-of-type(n) |父元素中的第n个字节点，且类型为E
E:nth-last-of-type(n)表示E父元素中的第n个字节点，且类型为E,从后向前计算
E：only-of-type() |E的父元素中只有一个子节点，且这个唯一的子节点的类型必须是E。注意：子节点不包含文本节点
E：empty |E元素中没有子节点。注意：子节点包含文本节点
E：target |这个伪类允许我们选择基于URL的元素，如果这个元素有一个识别器（比如跟着一个#），那么:target会对使用这个ID识别器的元素增加样式。 
E：enabled |可点击的表单控件
E：disabled |不可点击的表单控件
E：checked |已选中的checkbox或radio
:not(p) { background: #ff0000; }|
---|---
E:target|表示当前的URL片段的元素类型，这个元素必须是E
E:first-line |表示E元素中的第一行
E:first-letter |表示E元素中的第一个字符
E::selection|表示E元素在用户选中文字时
E::before |生成内容在E元素前
E::after |生成内容在E元素后
Content 属性|
E:not(s) |表示E元素不被匹配
E~F|表示E元素毗邻的F元素

### 属性选择器

属性选择器|说明
---|---
p[index]{background:red}|只使用属性名，但没有确定任何属性值
p[index=1]{background:red}|指定属性名，并指定了该属性的属性值
p[index~=pre]{background:red} |指定属性名，并且具有属性值，此属性值是一个词列表，并且以空格隔开，其中词列表中包含了一个value词
p[index^=p]{background:red}|指定了属性名，并且有属性值，属性值是以value开头的
p[index$=M]{background:red}|指定了属性名，并且有属性值，而且属性值是以value结束的
p[index*=d]{background:red}|指定了属性名，并且有属性值，而且属值中包含了value
p[index|=d]{background:red}|指定了属性名，并且属性值是value或者以“value-”开头的值（比如说zh-cn）

### CSS3用户界面

CSS3用户界面|说明
---|---
`resize: none/both/horizontal/vertical/initial/inherit;`|属性规定是否可由用户调整元素尺寸
`box-sizing: content-box/border-box/initial/inherit;`|属性允许您以确切的方式定义适应某个区域的具体内容
outline-offset|属性对轮廓进行偏移，并在超出边框边缘的位置绘制轮廓
`direction: ltr/rtl/initial/inherit;`|文字排列方式(全兼容),注意要配合`unicode-bidi:bidi-override;` 一块使用

 ```css
 div {
    resize: horizontal;
    overflow: auto;
}
/*outline-offset animation*/
/* Chrome, Safari, Opera */
@-webkit-keyframes mymove {
    50% {outline-offset: 50px;}
}
/* Standard syntax */
@keyframes mymove {
    50% {outline-offset: 50px;}
}
```
 
```javascript
 function myFunction() {
    document.getElementById("box1").style.MozBoxSizing = "border-box"; // Firefox
    document.getElementById("box1").style.boxSizing = "border-box";
}
```

### CSS3多列

CSS3多列|说明
---|---
column-count|属性规定元素应该被分隔的列数
column-gap|属性规定列之间的间隔
column-rule|属性设置列之间的宽度、样式和颜色规则
