### 1. em

### 2. rem

rem中的“r”代表“root”，这意味着设置当前元素的字体大小为根元素

### 3. vh(view height) 和 vw(view width)

在进行响应式布局时，我们常常会使用百分比来布局，然而CSS的百分比不总是解决每个问题的最佳方案，CSS的宽度相对于离它最近的父元素的宽度。 如果你想使用视口的宽度、高度而不是父元素的宽高，可以使用vh和vw单位。 

`1vh = viewportHeight * 1/100; 1vw = viewportWidth * 1/100;` 使用vh、vw就可以保证元素的宽高适应不同设备。

### 4. vmin 和 vmax

vw和vh对应于viewport的width和height，而vmin和vmax分别对应于width、height中的最小值和最大值，例如如果浏览器的宽/高被设置为1000px/600px，那么

- 1vmin = 600 * 1/100;
- 1vmax = 1000 * 1/100;

几个实例：

```html
/* 1. 一个正方形元件总是触摸至少两个屏的边缘 */
<style type="text/css">
  .box { height: 100vmin;width : 100vmin; }
</style>
<body>
    <div class="box" style="background-color: #f00">fdasjfdlas</div>
</body>
/* 2. 覆盖全屏 */
<style type="text/css">
    body {
        margin: 0;
        padding:0;
    }
    .box {
        /*宽屏显示器width > height*/
        height: 100vmin;
        width : 100vmax;
    }
</style>
<div class="box" style="background-color: #f00">fdasjfdlas</div>
```

### 5. ex 和 ch

ex、ch单位与em、rem相似之处在于都依赖于font-size，但是ex、ch还依赖于font-family，基于font-specific来计算

http://www.alixixi.com/web/a/2014120994296.shtml
