- [背景](#背景)
- [1. will-change属性](#will-change属性)
- [2. 属性语法](#属性语法)
- [3. 始终移除will-change](#始终移除will-change)
- [案例： 背景图片不随滚动条滚动而滚动的效果优化](#案例)

<h3 id="背景">背景</h3>

为了改善动画的性能和质量

CSS的动画、变形、渐变并不会自动的触发GPU加速，而是使用浏览器稍慢的软件渲染引擎。然而一些浏览器提供了[hardware acceleration by means of certain properties](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)来获取更高的渲染性能。 举个例子，opacity属性是几个能够加速的属性之一，因为GPU可以方便的处理。基本上任何层的透明度渐变浏览器都会交给GPU处理来加速。除了opacity能够使用GPU处理的就是CSS 3D变形了

在基于webkit的浏览器，在执行一些CSS的操作经常会看见闪烁，即二维变换和动画。在过去，通过欺骗浏览器一点点解决实现。我们会使浏览器执行3D变换，因此减轻了工作量到GPU上。这是因为3D转换是自动移到那里的。

**translateZ() (or translate3d()) Hack**

很长一段时间内我们都通过translateZ()或者translate3d() hack来骗取浏览器触发硬件加速，具体做法就是为元素添加没有变化的3D变形，比如元素在2维空间可以通过添加以下CSS来硬件加速

`.accelerate {-webkit-transform: translate3d(0, 0, 0);}`

为了避免创建layer的hacks，一个允许我们提前通知浏览器我们将对元素做何种变化的CSS属性被引入，这样浏览器可以优化处理元素渲染的方式，为元素提前准备昂贵的动画处理操作，这就是**`will-change`** 属性

<h3 id="will-change属性">1. will-change属性</h3>

will-change属性可以提前通知浏览器我们要对元素做什么动画，这样浏览器可以提前准备合适的优化设置。这样可以避免对页面响应速度有重要影响的昂贵成本。元素可以更快的被改变，渲染的也更快，这样页面可以快速更新，表现的更加流畅

1. 为了这个浏览器需要一定的时间来组织优化操作，这样当变化发生的时候，优化才能没有延迟的作用到元素, 即：需要有一个在正确是时间添加和移除will-change属性的方法

```
.element { transition: transform 1s ease-out; }  /* style rules */
.element:hover { will-change: transform; }    /* 为了使元素达到激活的状态，它必须先被hover */
.element:active { transform: rotateY(180deg); }
```

如果想要的变化实际是发生在hover的时候呢? 当鼠标进入父容器的时候增加了优化，并且当鼠标移开的时候清除它(让父元素hover的时候，声明will-change，这样，移出的时候就会自动remove，触发的范围基本上是有效元素范围)。这同时暗示了每当鼠标进入父容器的时候，浏览器可以预期知道元素的变化, 其实核心思想就是让浏览器有时间去准备。

```
.element { transition: opacity .3s linear; }
/* declare changes on the element when the mouse enters / hovers its ancestor */
.ancestor:hover .element { will-change: opacity; }
/* apply change when element is hovered */
.element:hover { opacity: .5; }
```

<h3 id="属性语法">2. 属性语法</h3>

```
/* 关键字值 */
will-change: auto;
will-change: scroll-position;    /* 要开始翻滚了 */
will-change: contents;           /* 内容要动画或变化了 */
will-change: transform;        /* <custom-ident>示例 */
will-change: opacity;          /* <custom-ident>示例 */
will-change: left, top;        /* 两个<animateable-feature>示例 */
/* 全局值 */
will-change: inherit;
will-change: initial;
will-change: unset;
```

<h3 id="始终移除will-change">3. 始终移除will-change</h3>

对于一般的优化，当变化完成的时候浏览器会撤销优化，恢复普通模式，但是如果使用了will-change会导致该优化迟迟不能释放，这就要求我们用完了就释放，这时候需要借助JavaScript(比方说点击某个按钮，其他某个元素进行动画。点击按钮(click)，要先按下(mousedown)再抬起才出发。因此，可以mousedown时候打声招呼, 动画结束自带回调)

```javaScript
// Rough generic example
// Get the element that is going to be animated on click, for example
var el = document.getElementById('element');
// Set will-change when the element is hovered
el.addEventListener('mouseenter', hintBrowser);
el.addEventListener('animationEnd', removeHint);
function hintBrowser() {
    // The optimizable properties that are going to change in the animation's keyframes block
    this.style.willChange = 'transform, opacity';
}
function removeHint() {
    this.style.willChange = 'auto';   //画结束回调，移除will-change
}
```

当然对于用户会反复触发的操作放在style中不移除也可以

<h3 id="案例">案例： 背景图片不随滚动条滚动而滚动的效果优化</h3>

使用background-attachment: fixed实现背景图片不随滚动条滚动而滚动效果的时候，发现，页面的绘制性能掉到了每秒30帧。

- background-attachment: fixed改成了position: fixed，因为前面的滚动实时计算重绘
- 背景图片所在的元素替换为::before伪元素
- 使用了CSS3 will-change加速

```
.front::before {
    content: '';
    position: fixed; // 代替background-attachment
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: white;
    background: url(/img/front/mm.jpg) no-repeat center center;
    background-size: cover;
    will-change: transform; // 创建新的渲染层
    z-index: -1;
  }
```

> Reference

- [CSS will-change 属性](http://www.cnblogs.com/yuzhongwusan/p/4186405.html)
- [关于CSS的will-change属性的介绍](http://www.w3cplus.com/css3/introduction-css-will-change-property.html)
- [will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)
- [使用CSS3 will-change提高页面滚动、动画等渲染性能](http://www.zhangxinxu.com/wordpress/2015/11/css3-will-change-improve-paint/)
- [Fix scrolling performance with CSS will-change property](https://fourword.fourkitchens.com/article/fix-scrolling-performance-css-will-change-property)

