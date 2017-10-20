[常用css技巧](#top)

- [1. 让DIV内部内容撑开外层的div方法](#让DIV内部内容撑开外层的div方法)


<h2 id="让DIV内部内容撑开外层的div方法">1. 让DIV内部内容撑开外层的div方法</h2>

外层的DIV（a）没有设置高度，想弄成自适应的，在外层DIV的下面添加的其他DIV（b）节点会因为DIV（a）没有设置高度而浮到上面去，跟DIV（a）的内容重叠在一起

```html
<!-- 方法1 -->
<div id="a" style="height:auto;">  
  <!--内容-->  
  <br style="clear:both;"><!--这里添加这个样式的标签，就可以解决-->  
</div>
<!-- 方法2 -->
<div class="fuqin">
　　<ul>
　　　　<!--内容-->
　　</ul>
　　<div class="clearfloat"></div>
</div>
.clearfloat{clear:both;height:0;font-size: 1px;line-height: 0px;} 
```

[back to top](#top)
