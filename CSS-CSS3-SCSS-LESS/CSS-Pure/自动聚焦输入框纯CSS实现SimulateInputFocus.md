focus输入框的时候，外面容器的灰色边框要高亮(不使用JavaScript,纯CSS实现)

![](http://i.imgur.com/FoTMrLF.png)

[demo](http://www.zhangxinxu.com/study/201608/input-focus-parent-highlight.html)

```html
<style>
.container {
    min-height: 120px;
    /* z-index用来创建新的层叠上下文，这样子元素的z-index:-1不会超出容器 
       具体可参见：http://www.zhangxinxu.com/wordpress/?p=5115
    */
    position: relative; z-index: 1;
}
.list {
    /* 已经输入的姓名列表 */
    display: inline-block; background-color: #f0f3f9;
}
.list:after {
    content: '×';
}
.input {
    /* 去掉输入框默认UI */
    width: 80px; border: 0; background: none;  
}
.border {
    /* 尺寸永远和容器一样大，假装是容器 */
    position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: -1;
    border: 1px solid #bbb;
}
.input:focus + .border {
    /* 模拟父选择器效果精髓所在 */
    border-color: #1271E0;    
}
</style>
<div class="container">
    <span class="list">李易峰</span>
    <span class="list">赵丽颖</span>
    <span class="list">杨紫</span>
    <input id="input" class="input"><label class="border" for="input"></label>
</div>
```

```javascript
$('input').focus(function() {
    $(this).parent().addClass('highlight');
});
```
