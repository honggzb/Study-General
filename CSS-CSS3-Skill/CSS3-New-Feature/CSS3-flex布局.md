
## css3的flex布局 - `display: flex;`     [--**](#top)

- [一：容器的样式](#容器的样式)
  - [1.1 伸缩容器主轴的排列方向和换行 - flex-direction, flex-wrap, flex-flow](#伸缩容器主轴的排列方向和换行)
  - [1.2 伸缩项目在主轴上的对齐方式 - justify-content](#伸缩项目在主轴上的对齐方式)
  - [1.3 伸缩项目在交叉轴(侧轴)上的对齐方式 - align-items](#伸缩项目在交叉轴(侧轴)上的对齐方式)
  - [1.4 伸缩项目在多根轴线的对齐方式 - align-content](#伸缩项目在多根轴线的对齐方式)
- [二：元素样式的属性 - order, flex-grow, flex-shrink, flex-basic, flex, align-self](#元素样式的属性)
- [三：flex布局浏览器兼容处理](#flex布局浏览器兼容处理)
- [四：flex布局经典案例](#flex布局经典案例)
  - [4.1 水平和垂直居中](#水平和垂直居中)
  - [4.2 实现宽屏和窄屏的布局](#实现宽屏和窄屏的布局)
- [五：Flexbox在线生成工具](#Flexbox在线生成工具)

**注意，设为Flex布局以后，子元素的float、clear和vertical-align属性将失效, `text-overflow: ellipsis;` 在 `display: flex;` 元素上是没有效果的**

![](http://i.imgur.com/agCkd01.png)

Flexbox布局主要有三种语法版本：

- 2009版本，我们称之为老版本，使用的是“display:box”或者“display:inline-box”；
- 2011版本，我们称之为混合版本，使用的是“display:flexbox”或者“display:inline-flexbox”；
- 2013版本，也就是最新语法版本，使用的是“display:flex”或者“display:inline-flex”。

规范版本|IE|Opera|Firefox|Chrome|Safari
---|---|---|---|---|---
标准版本|11？|12.10+`*`|Behind flag|21+(`-webkit-`)|  
混合版本|10(`-ms-`)|   |   |   |  
最老版本|   |   |3+(`-moz-`)|<21(`-webkit-`)|3+(`-webkit-`)

**开启flexbox：让一个元素变成伸缩容器**

规范版本|属性名称|块伸缩容器|内联伸缩容器
---|---|---|---
标准版本|display|flex|inline-flex
混合版本|display|flexbox|inline-flexbox
最老版本|display|box|inline-box

<h3 id="容器的样式">一：容器的样式</h3>

<h4 id="伸缩容器主轴的排列方向和换行">1.1 伸缩容器主轴的排列方向和换行- flex-direction, flex-wrap, flex-flow</h4>

规范版本|属性名称|水平方向|反向水平|垂直方向|反向垂直
---|---|---|---|---|---
标准版本|flex-direction|row|row-reverse|column|column-reverse
混合版本|flex-direction|row|row-reverser|column|column-reverse
最老版本|box-orient|horizontal|horizontal|vertical|vertical
最老版本|box-direction|normal|row-reverse|normal|reverse

`flex-direction: column-reverse | row | row-reverse | wrap | column wrap; `  - 主轴的方向（即项目的排列方向）

- column-reverse:   主轴为水平方向，起点在右端
- column:           主轴为垂直方向，起点在上沿，并且支持换行 
- row（默认值）:      主轴为水平方向，起点在左端, 从左到右排列，并且子元素的宽度会自动伸缩铺满整个容器的宽度 
- row-reverse:      主轴为水平方向，起点在右端, 从右到左排列，并且子元素的宽度会自动伸缩铺满整个容器的宽度

`flex-wrap: nowrap | wrap | wrap-reverse;`  - 如果一条轴线排不下，如何换行

规范版本|属性名称|不换行|换行|反向换行
---|---|---|---|---
标准版本|flex-wrap|nowrap|wrap|wrap-reverse
混合版本|flex-wrap|nowrap|wrap|wrap-reverse
最老版本|box-wrap|single|multiple|N/A

- nowrap（默认）：     不换行
- wrap：             换行，第一行在上方
- wrap-reverse：     换行，第一行在下方

`flex-flow: <flex-direction> || <flex-wrap>;`  - flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap

[back to top](#top)

<h4 id="伸缩项目在主轴上的对齐方式">1.2 伸缩项目在主轴上的对齐方式 - justify-content</h4>

规范版本|属性名称|start|center|end|justify|distribute
---|---|---|---|---|---|---
标准版本|justify-content|flex-start|center|flex-end|space-between|space-around
混合版本|flex-pack|start|center|end|justify|distribute
最老版本|box-pack|start|center|end|justify|N/A

`justify-content: flex-start | flex-end | center | space-between | space-around;        /*左右的对齐方式*/`

- flex-start（默认值）：   左对齐
- flex-end：            右对齐
- center：              居中
- space-between：       两端对齐，项目之间的间隔都相等
- space-around：        每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍

![](http://i.imgur.com/mF24DmT.png)

[back to top](#top)

<h4 id="伸缩项目在交叉轴(侧轴)上的对齐方式">1.3 伸缩项目在交叉轴(侧轴)上的对齐方式 - align-items</h4>

规范版本|属性名称|start|center|end|baseline|stretch
---|---|---|---|---|---|---
标准版本|align-items|flex-start|center|flex-end|baseline|stretch
混合版本|flex-align|start|center|end|baseline|stretch
最老版本|box-align|start|center|end|baseline|stretch

`align-items: flex-start | flex-end | center | baseline | stretch;     /*上下的对齐方式*/`

- flex-start：   纵轴的起点对齐
- flex-end：     纵轴的终点对齐
- center：       纵轴的中点对齐
- baseline:     项目的第一行文字的基线对齐
- stretch（默认值）：    如果项目未设置高度或设为auto，将占满整个容器的高度

![](http://i.imgur.com/OqRLFZq.png)

[back to top](#top)

<h4 id="伸缩项目在多根轴线的对齐方式">1.4 伸缩项目在多根轴线的对齐方式 - align-content</h4>

如果项目只有一根轴线，该属性不起作用

规范版本|属性名称|start|center|end|justify|distribute|stretch
---|---|---|---|---|---|---|---
标准版本|align-content|flex-start|center|flex-end|space-between|space-around|stretch
混合版本|flex-line-pack|start|center|end|justify|distribute|stretch
最老版本|N/A | N/A | N/A  |  N/A  |  N/A | N/A   |N/A|N/A

`align-content: flex-start | flex-end | center | space-between | space-around | stretch;`

- flex-start：      与纵轴的起点对齐
- flex-end：        与纵轴轴的终点对齐
- center：          与纵轴轴的中点对齐
- space-between：   与纵轴轴两端对齐，轴线之间的间隔平均分布
- space-around：    每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
- stretch（默认值）： 轴线占满整个交叉轴

![](http://i.imgur.com/Ps37Xq1.png)

[back to top](#top)

<h3 id="元素样式的属性">二：元素样式的属性 - order, flex-grow, flex-shrink, flex-basic, flex, align-self</h3>

**1、order样式** - 元素(项目)的排列顺序。数值越小，排列越靠前，默认为0

`.item { order: <integer>; }`

**2、flex-grow样式** - 元素(项目)的放大比例，如果为0表示不放大。如果所有元素的flex-grow都为1，则平分剩余大小（不是大小相同，是平分剩余的大小）

`.item {flex-grow: <number>; /* default 0 */ }`

![](http://i.imgur.com/lyZohvu.png)

**3、flex-shrink样式** - 元素(项目)的缩小比例，默认为1，即如果空间不足，该项目将缩小

`.item {flex-shrink: <number>; /* default 1 */}`

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小

**4、flex-basis样式**

flex-basis属性定义了在分配多余空间之前，项目占据的大小（纵向排列时是height，横向排列时是width）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

`.item {flex-basis: <length> | auto; /* default auto */}`

可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间
  
**5、flex样式**

flex属性是flex-grow, flex-shrink和flex-basis的简写，默认值为`0 1 auto`。后两个属性可选。

该属性有两个快捷值：`auto (1 1 auto)` 和 `none (0 0 auto)`。建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

`.item {flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]}`

**6、align-self样式**

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch

规范版本 | 属性名称   | auto | start      | center | end      | baseline | stretch
---------|------------|------|------------|--------|----------|----------|--------
标准版本 | align-self | auto | flex-start | center | flex-end | baseline | stretch
混合版本 | flex-align | auto | start      | center | end      | baseline | stretch
最老版本 | N/A        | N/A | N/A  |  N/A  |  N/A | N/A   |N/A

`.item {align-self: auto | flex-start | flex-end | center | baseline | stretch; }  /*该属性可能取6个值，除了auto，其他都与align-items属性完全一致。*/`

- flex-start：   纵轴的起点对齐
- flex-end：     纵轴的终点对齐
- center：       纵轴的中点对齐
- baseline:     项目的第一行文字的基线对齐
- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度

![](http://i.imgur.com/khmSLzp.png)

[back to top](#=top)

<h3 id="flex布局浏览器兼容处理">三：flex布局浏览器兼容处理</h3>

- IE10部分支持2012，需要-ms-前缀
- Android4.1/4.2-4.3部分支持2009，需要-webkit-前缀
- Safari7/7.1/8部分支持2012，需要-webkit-前缀
- iOS Safari7.0-7.1/8.1-8.3部分支持2012，需要-webkit-前缀
- 所以需要考虑新版本2012：http://www.w3.org/TR/2012/CR-css3-flexbox-20120918/
- 而Android需要考虑旧版本2009：http://www.w3.org/TR/2009/WD-css3-flexbox-20090723/

```css
/* 子元素-平均分栏 */
.flex1 {
    -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-flex: 1;         /* OLD - Firefox 19- */
    width: 20%;               /* For old syntax, otherwise collapses. */
    -webkit-flex: 1;          /* Chrome */
    -ms-flex: 1;              /* IE 10 */
    flex: 1;                  /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
/* 父元素-横向排列（主轴） */
.flex-h {
    /* 盒子的兼容性写法 */
    display: box;              /* OLD - Android 4.4- */
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6(Safari, iOS, Android browser, older WebKit browsers) */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    /* 横向排列（主轴） */
    /* 09版 */
    -webkit-box-orient: horizontal;  /*IE10中显不一行，类似于flex-direction:row功能*/
    /* 12版 */
    -webkit-flex-direction: row;
    -moz-flex-direction: row;
    -ms-flex-direction: row;
    -o-flex-direction: row;
    flex-direction: row;
}
/* 父元素-横向换行 */
.flex-hw {
    /* 09版 */
    -webkit-box-lines: multiple;
    /* 12版 */
    -webkit-flex-wrap: wrap;
    -moz-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    -o-flex-wrap: wrap;
    flex-wrap: wrap;
}
/* 父元素-水平居中（主轴是横向才生效） */
.flex-hc {
    /* 09版 */
    -webkit-box-pack: center;
    /* 12版 */
    -webkit-justify-content: center;
    -moz-justify-content: center;
    -ms-justify-content: center;
    -o-justify-content: center;
    justify-content: center;
    /* 其它取值如下：
        align-items     主轴原点方向对齐
        flex-end        主轴延伸方向对齐
        space-between   等间距排列，首尾不留白
        space-around    等间距排列，首尾留白
     */
}
/* 父元素-纵向排列（主轴） */
.flex-v {
    display: box;              /* OLD - Android 4.4- */

    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */


    /* 09版 */
    -webkit-box-orient: vertical;
    /* 12版 */
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
}
/* 父元素-纵向换行 */
.flex-vw {
    /* 09版 */
    /*-webkit-box-lines: multiple;*/
    /* 12版 */
    -webkit-flex-wrap: wrap;
    -moz-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    -o-flex-wrap: wrap;
    flex-wrap: wrap;
}
/* 父元素-竖直居中（主轴是横向才生效） */
.flex-vc {
    /* 09版 */
    -webkit-box-align: center;
    /* 12版 */
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    -o-align-items: center;
    align-items: center;
}
/* 子元素-显示在从左向右（从上向下）第1个位置，用于改变源文档顺序显示 */
.flex-1 {
    -webkit-box-ordinal-group: 1;   /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-ordinal-group: 1;      /* OLD - Firefox 19- */
    -ms-flex-order: 1;              /* TWEENER - IE 10 */
    -webkit-order: 1;               /* NEW - Chrome */
    order: 1;                       /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
/* 子元素-显示在从左向右（从上向下）第2个位置，用于改变源文档顺序显示 */
.flex-2 {
    -webkit-box-ordinal-group: 2;   /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-ordinal-group: 2;      /* OLD - Firefox 19- */
    -ms-flex-order: 2;              /* TWEENER - IE 10 */
    -webkit-order: 2;               /* NEW - Chrome */
    order: 2;                       /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
```

为了更好的兼容性，我们需要给容器声明flex-h/flex-v，而不是一般的flex：

```css
/* 父元素-flex容器 */
.flex {
  display: box;              /* OLD - Android 4.4- */
  display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;      /* TWEENER - IE 10 */
  display: -webkit-flex;     /* NEW - Chrome */
  display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
```

建议在需要兼容Android时（2009版语法）采用flex-h/flex-v声明容器使用flex模式，在不需要兼容Android时（2012版语法）使用flex设置容器

[back to top](#=top)

<h3 id="flex布局经典案例">四：flex布局经典案例</h3>

<h4 id="水平和垂直居中">4.1 水平和垂直居中（网页设计的圣杯）</h4>

圣杯布局（Holy Grail Layout）指的是一种最常见的网站布局。页面从上到下，分成三个部分：头部（header），躯干（body），尾部（footer）。其中躯干又水平分成三栏，从左到右为：导航、主栏、副栏

![](http://i.imgur.com/N494UNW.png)

```html
<body class="HolyGrail">
  <header>
  <style>
  .HolyGrail {
      display: flex;
      min-height: 100vh;
      flex-direction: column;
    }
    header,footer { flex: 1; }
    .HolyGrail-body {
      display: flex;
      flex: 1;
    }
    .HolyGrail-content  { flex: 1; }
    .HolyGrail-nav, .HolyGrail-ads { flex: 0 0 12em; } /* 两个边栏的宽度设为12em */
    .HolyGrail-nav { order: -1;  }   /* 导航放到最左边 */
    /*小屏幕，躯干的三栏自动变为垂直叠加*/
    @media (max-width: 768px) {
    .HolyGrail-body {
      flex-direction: column;
      flex: 1;
    }
    .HolyGrail-nav, .HolyGrail-ads,.HolyGrail-content { flex: auto; }
  }
  </style>
  </header>
  <div class="HolyGrail-body">
    <main class="HolyGrail-content">...</main>
    <nav class="HolyGrail-nav">...</nav>
    <aside class="HolyGrail-ads">...</aside>
  </div>
  <footer>...</footer>
</body>
```

other

```css
html { height: 100%; } 
body {  /*父元素*/
  display: -webkit-box;  /* 老版本语法: Safari,  iOS, Android browser, older WebKit browsers.  */
  display: -moz-box;    /* 老版本语法: Firefox (buggy) */ 
  display: -ms-flexbox;  /* 混合版本语法: IE 10 */
  display: -webkit-flex;  /* 新版本语法： Chrome 21+ */
  display: flex;       /* 新版本语法： Opera 12.1, Firefox 22+ */
  /*垂直居中*/	
  -webkit-box-align: center;   /*老版本语法*/
  -moz-box-align: center;
  -ms-flex-align: center; /*混合版本语法*/
  -webkit-align-items: center;  /*新版本语法*/
  align-items: center;
  /*水平居中*/
  -webkit-box-pack: center;         /*老版本语法*/
  -moz-box-pack: center; 
  -ms-flex-pack: center;            /*混合版本语法*/
  -webkit-justify-content: center;  /*新版本语法*/
  justify-content: center;   
  margin: 0;
  height: 100%;
  width: 100%       /* needed for Firefox */
} 
/*子元素： 实现文本垂直居中*/
h1 {
  display: -webkit-box; 
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center; 
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;   /*无论h1元素有多高，文本将永远垂直居中*/
  align-items: center;
  height: 10rem;
}	
```

[back to top](#=top)

<h4 id="实现宽屏和窄屏的布局">4.2 实现宽屏和窄屏的布局</h4>

[back to top](#=top)

<h3 id="Flexbox在线生成工具">五：Flexbox在线生成工具</h3>

- [Flexplorer](http://bennettfeely.com/flexplorer/)
- [CSS Flexbox Please!](http://demo.agektmr.com/flexbox/)
- [Flexiejs](http://flexiejs.com/playground/)
 
> Reference

- [Flexbox Patterns](http://www.flexboxpatterns.com/home)
- http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool
- http://www.ruanyifeng.com/blog/2015/07/flex-examples.html
- [css3的flex布局](http://www.cnblogs.com/lxiang/p/4766813.html)
- [flex布局浏览器兼容处理](http://www.tuicool.com/articles/Afq6Bzq)
- [Flexbox制作CSS布局易如反掌](http://www.w3cplus.com/css3/designing-css-layout-with-flexbox.html)
- [CSS Flexible Box Layout Module(specification)W3C](http://www.w3.org/TR/css3-flexbox/)
- [一个完整的Flexbox指南](http://www.w3cplus.com/css3/a-guide-to-flexbox.html)
- [深入了解 Flexbox 伸缩盒模型](http://www.w3cplus.com/blog/666.html)
- [IE10中的Flexible Box("Flexbox")布局](http://www.w3cplus.com/css3/ie10-flexbox-layout.html)
- [IE10中的Flexible Box("Flexbox")布局](https://msdn.microsoft.com/library/hh673531(v=vs.85).aspx)
- [“老”的Flexbox和“新”的Flexbox](http://www.w3cplus.com/css3/old-flexbox-and-new-flexbox.html)
- [使用Flexbox：新旧语法混用实现最佳浏览器兼容](http://www.w3cplus.com/css3/using-flexbox.html)
- [跨浏览器的Flexbox](http://www.w3cplus.com/css3/advanced-cross-browser-flexbox.html)
- [看看接下来会发生什么：CSS3 Flexible Boxes](http://www.w3cplus.com/css3/a-look-on-whats-coming-up-css3-flexible-boxes.html)
- [响应式设计的未来——Flexbox](http://www.w3cplus.com/css3/responsive-design-of-the-future-with-flexbox.html)
- [使用CSS3 Flexbox布局](http://www.w3cplus.com/css3/css3-flexbox-layout.html)
- [Flexbox——快速布局神器](http://www.w3cplus.com/css3/flexbox-basics.html)
- [Flexbox中动画内幕](http://www.w3cplus.com/css3/animating-flexboxes-the-lowdown.html)
- [CSS3实现水平垂直居中](http://www.w3cplus.com/codes/vertically-center-content-with-css3.html)
- [CSS实战之Flex详解以及其在微信中的兼容实现](https://segmentfault.com/a/1190000004139009)
