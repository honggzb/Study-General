- [一、强制换行](#强制换行)
- [二、禁止换行并超出显示省略号](#禁止换行)
- [三、多行超出省略号](#多行超出省略号)

| 功能 | 代码 |
| :------------- | :------------- |
|不换行 |`white-space: nowrap;`|
|自动换行 |`word-wrap: break-word; word-break: normal;`|
|强制换行 |`word-break: break-all;`|

```css
/* 单行文本溢出的省略*/
p {
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
}
/* 多行文本溢出的省略*/
p{
  position: relative;
  line-height: 1.5em;
  /* 高度为需要显示的行数*行高，比如显示两行，高度为3 */
  height: 3em;
  overflow: hidden;
}
p:after {
  content: '...';
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff;
}
```

**相关的css**

`white-space: normal|pre|nowrap|pre-wrap|pre-line|inherit;`

- white-space 属性设置如何处理元素内的空白 
- normal 默认。空白会被浏览器忽略。 
- pre 空白会被浏览器保留。其行为方式类似 HTML 中的 pre 标签。 
- nowrap 文本不会换行，文本会在在同一行上继续，直到遇到 br 标签为止。 
- pre-wrap 保留空白符序列，但是正常地进行换行。 
- pre-line 合并空白符序列，但是保留换行符。 
- inherit 规定应该从父元素继承 white-space 属性的值。

`word-wrap: normal|break-word; `

- word-wrap 属性用来标明是否允许浏览器在单词内进行断句，这是为了防止当一个字符串太长而找不到它的自然断句点时产生溢出现象。 
- normal: 只在允许的断字点换行(浏览器保持默认处理) 
- break-word:在长单词或URL地址内部进行换行 

![](https://i.imgur.com/12su8uB.png)

`word-break: normal|break-all|keep-all;`

- word-break 属性用来标明怎么样进行单词内的断句。 
- normal：使用浏览器默认的换行规则。 
- break-all:允许再单词内换行 
- keep-all:只能在半角空格或连字符处换行

![](https://i.imgur.com/1erTvE7.png)

<h2 id="强制换行">一、强制换行</h2>

1. `word-break: break-all;` 只对英文起作用，以字母作为换行依据
2. `word-wrap: break-word;` 只对英文起作用，以单词作为换行依据
3. `white-space: pre-wrap;` 只对中文起作用，强制换行

word-break:break-all 和 word-wrap:break-word 都是能使其容器如DIV的内容自动换行，它们的区别在于：

1. `word-break:break-all`: 假设div宽度为450px，它的内容就会到450px自动换行，如果该行末端有个很长的英文单词，它会把单词截断，一部分保持在行尾，另一部分换到下一行, 即可在单词内换行
2. `word-wrap:break-word`:  例子与上面一样，但区别就是它会把整个单词看成一个整体，如果该行末端宽度不够显示整个单词，它会自动把整个单词放到下一行，而不会把单词截断掉

> 注意：设置强制将英文单词断行，需要将行内元素设置为块级元素。

<h2 id="禁止换行">二、禁止换行并超出显示省略号</h2>

```css
white-space:nowrap; 
overflow:hidden; 
text-overflow:ellipsis;
```

- white-space:nowrap; 是禁止换行
- overflow:hidden; 是让多出的内容隐藏起来，否则多出的内容会撑破容器。
- text-overflow:ellipsis; 让多出的内容以省略号...来表达。但是这个属性主要用于IE等浏览器，Opera浏览器用-o-text-overflow:ellipsis; 而Firefox浏览器没有这个功能，多出的内容只能隐藏起来。

<h2 id="多行超出省略号"> 三、多行超出省略号</h2>

css3提供了多行省略号的方法！遗憾就是这个暂时只支持webkit浏览器！

- 撑开上下边框不要使用padding!
- 高度= 行高 x 行数 （webkit-line-clamp）

```css
div{
    width:400px;
    margin:0 auto;
    overflow : hidden;
    border:1px solid #ccc;
    text-overflow: ellipsis;
    padding: 0 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 30px;
    height: 60px;
}
```
