[ScrollBar in Mobile Web](#top)

- [Webkit scrollbar](#Webkit-scrollbar)
    - Hidden scroll Bar
    - user-defined scroll Bar
- [IE浏览器滚动条样式](#IE浏览器滚动条样式)
- [FireFox浏览器滚动条](#FireFox浏览器滚动条)

## Webkit scrollbar

```css
::webkit-scrollbar             //1 滚动条整体部分，其中的属性有width,height,background,border（就和一个块级元素一样）等。
::webkit-scrollbar-button      //2 滚动条两端的按钮。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。
::webkit-scrollbar-track       //3  外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。
::webkit-scrollbar-track-piece //4  内层轨道，滚动条中间部分（除去）。
::webkit-scrollbar-thumb       //5  滚动条里面可以拖动的那部分
::webkit-scrollbar-corner      //6  边角
::webkit-resizer               //7   定义右下角拖动块的样式
```

![](https://i.imgur.com/XmYAkgP.png)

> 水平滚动条只能设height，width是随着屏幕变化的。而竖直滚动条只能设width

webkit提供的还有更多的伪类，可以定制更丰富滚动条样式。内容参考：https://www.webkit.org/blog/363/styling-scrollbars/

伪类|说明
---|---
:horizontal| horizontal伪类，主要应用于选择水平方向滚动条。
:vertical|vertical伪类主要是应用于选择竖直方向滚动条
:decrement| decrement伪类应用于按钮和内层轨道(track piece)。它用来指示按钮或者内层轨道是否会减小视窗的位置(比如，垂直滚动条的上面，水平滚动条的左边。)
:increment|increment伪类与和decrement类似，用来指示按钮或内层轨道是否会增大视窗的位置(比如，垂直滚动条的下面和水平滚动条的右边。)
:start|start伪类也应用于按钮和滑块。它用来定义对象是否放到滑块的前面。
:end|类似于start伪类，标识对象是否放到滑块的后面。
:double-button|该伪类可以用于按钮和内层轨道。用于判断一个按钮是不是放在滚动条同一端的一对按钮中的一个。对于内层轨道来说，它表示内层轨道是否紧靠一对按钮。
:single-button|类似于double-button伪类。对按钮来说，它用于判断一个按钮是否自己独立的在滚动条的一段。对内层轨道来说，它表示内层轨道是否紧靠一个single-button。
:no-button|用于内层轨道，表示内层轨道是否要滚动到滚动条的终端，比如，滚动条两端没有按钮的时候。
:corner-present|用于所有滚动条轨道，指示滚动条圆角是否显示。
:window-inactive|用于所有的滚动条轨道，指示应用滚动条的某个页面容器(元素)是否当前被激活。(在webkit最近的版本中，该伪类也可以用于::selection伪元素。webkit团队有计划扩展它并推动成为一个标准的伪类)
:enabled、:disabled、:hover、和:active等伪类|同样在滚动条中适用

### Hidden scroll Bar

![](https://i.imgur.com/zPrSSdh.png)

```css
.listcol{                      //每一栏的classname
    font-size: 1.3rem;
    line-height: 2rem;
    width: 4.5rem;
    color:#999;
    text-align: center;
    overflow-y:scroll;
    z-index: 10;
    &::-webkit-scrollbar{
        background-color:transparent;
    }
    &__item{
        height: 2rem;
    }
}
```

### user-defined scroll bar

> [chrome documation](https://webkit.org/blog/363/styling-scrollbars/)

![](https://i.imgur.com/mDHCTfM.png)

```css
.listcol{
    &::-webkit-scrollbar{
        background-color:yellow;
        width: 1rem;
    }
    &::-webkit-scrollbar-track{
        background-color: #f25712;     //一种偏橘的红色（如果是口红色号的话应该适合白皮）
        //height:5rem;  加了也没用
    }
    &::-webkit-scrollbar-track-piece{
        background-color: #cdcdcd; //一种灰色
        height: 2rem;
    }
    &::-webkit-scrollbar-thumb{
        @include bg('choose');        //就是那个圆里有个对勾的图形，bg是我写的mixin，就是添加个背景图片。
    }
}
```

[back to top](#top)

## IE浏览器滚动条样式

滚动条样式|支持情况|支持浏览器版本|可否继承|描述
---|---|---|---|---
scrollbar-3dlight-color|IE特有属性|IE5.5+|y|设置滚动框的和滚动条箭头左上边缘的颜色
scrollbar-highlight-color|IE特有属性|IE5.5+|y|设置滚动框的和滚动条箭头左上边缘的颜色
scrollbar-face-color|IE特有属性|IE5.5+|y|设置滚动框和滚动条箭头的颜色
scrollbar-arrow-color|IE特有属性|IE5.5+|y|设置滚动条箭头的颜色
scrollbar-shadow-color|IE特有属性|IE5.5+|y|设置滚动框的和滚动条箭头右下边缘的颜色
scrollbar-dark-shadow-color|IE特有属性|IE5.5+|y|设置滚动条槽的颜色
scrollbar-base-color|IE特有属性|IE5.5+|y|设置滚动条主要构成部分的颜色
scrollbar-track-color|IE特有属性|IE5.5+|y|设置滚动条轨迹组成部分的颜色

![](https://i.imgur.com/tIfFeNV.gif)

[back to top](#top)

## FireFox浏览器滚动条--??? not working

```css
@-moz-document url-prefix(http://),url-prefix(https://) {   
    /* 滚动条颜色 */  
    scrollbar {   
       -moz-appearance: none !important;   
       background: rgb(0,255,0) !important;   
    }   
    /* 滚动条按钮颜色 */  
    thumb,scrollbarbutton {   
       -moz-appearance: none !important;   
       background-color: rgb(0,0,255) !important;   
    }   
    /* 鼠标悬停时按钮颜色 */  
      
    thumb:hover,scrollbarbutton:hover {   
       -moz-appearance: none !important;   
       background-color: rgb(255,0,0) !important;   
    }   
    /* 隐藏上下箭头 */  
    scrollbarbutton {   
       display: none !important;   
    }   
    /* 纵向滚动条宽度 */  
    scrollbar[orient="vertical"] {   
      min-width: 15px !important;   
    }   
}
```

[back to top](#top)

> - [CSS在移动端隐藏滚动条/自定义滚动条（scrollbar的各种属性）](https://blog.csdn.net/github_36487770/article/details/78750589)
> - [自定义浏览器滚动条的样式，打造属于你的滚动条风格](https://www.lyblog.net/detail/314.html)
