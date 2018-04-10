## [CSS3动画-transition+animation](#top)

- [1. CSS Transition](#CSS-Transition)
- [2. CSS Animation](#CSS-Animation)
  - [animation](#animation)
  - [2.1 keyframes](#keyframes)
- [3. CSS Transform](#CSS-Transform)
- [4. Will-Change](#Will-Change)
- [5. CSS自定义属性制作动画](#CSS自定义属性制作动画)
- [6. 边框图片border-image](#边框图片border)
- [7. 背景background-clip, background-origin, background-size](#背景background)
- [8. 反射reflect](#反射reflect)

CSS3属性中有关于制作动画的三个属性：`Transform,Transition,Animation`

<h2 id="CSS-Transition">1. CSS Transition</h2>

```css
transition： [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'> [, [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'>]]
transition： CSS属性，花费时间，效果曲线(默认ease)，延迟时间(默认0)
transition: width, .5s, ease, .2s;
transition: all, .5s;     /* 所有属性从原始值到制定值的一个过渡，运动曲线ease,运动时间0.5秒 */
```

属性|说明
---|---
`transition-property：none(没有属性改变)/ all（所有属性改变, default）/[<IDENT>（元素属性名）] [','<IDENT>]*`|当元素其中一个属性改变时执行transition效果
`transition-duration ： <time> [, <time>] `| 指定元素 转换过程的持续时间，单位为s（秒）或者ms(毫秒),可以作用于所有元素，包括:before和:after伪元素。其默认值是0，也就是变换时是即时的
`transition-timing-function ：ease/linear(匀速)/ease-in(加速)/ease-out(减速)/ease-in-out/cubic-bezier(<number>, <number>, <number>, <number>)[, ease/ linear/ease-in/ease-out/ ease-in-out/cubic-bezier(<number>, <number>, <number>, <number>)]* `|根据时间的推进去改变属性值的变换速率, cubic-bezier，可以使用[工具网站](http://cubic-bezier.com/#.17,.67,.83,.67)来定制
`transition-delay ： <time> [, <time>]* `| 指定一个动画开始执行的时间，也就是说当改变元素属性值后多长时间开始执行transition效果，单位为s（秒）或者ms(毫秒)，其使用和transition-duration极其相似，也可以作用于所有元素，包括:before和:after伪元素。 默认大小是"0"，也就是变换立即执行，没有延迟


**transition-property: [ident-元素的某一个属性值]其对应的类型如下(https://www.w3.org/TR/css3-transitions/#properties-from-css-)**

属性值|说明
---|---
color|通过红、绿、蓝和透明度组件变换（每个数值处理）如：background-color,border-color,color,outline-color等css属性；
length|真实的数字 如：word-spacing,width,vertical-align,top,right,bottom,left,padding,outline-width,margin,min-width,min-height,max-width,max-height,line-height,height,border-width,border-spacing,background-position等属性
percentage|真实的数字 如：word-spacing,width,vertical-align,top,right,bottom,left,min-width,min-height,max-width,max-height,line-height,height,background-position等属性；
integer|离散步骤（整个数字），在真实的数字空间，以及使用floor()转换为整数时发生 如：outline-offset,z-index等属性；
number|真实的（浮点型）数值，如：zoom,opacity,font-weight,等属性；
transform list|详情请参阅：[《CSS3 Transform》](http://www.w3cplus.com/content/css3-transform)
rectangle|通过x, y, width 和 height（转为数值）变换，如：crop
visibility|离散步骤，在0到1数字范围之内，0表示“隐藏”，1表示完全“显示”,如：visibility
shadow|作用于color, x, y 和 blur（模糊）属性,如：text-shadow
gradient|通过每次停止时的位置和颜色进行变化。它们必须有相同的类型（放射状的或是线性的）和相同的停止数值以便执行动画,如：background-image
paint server (SVG)|只支持下面的情况：从gradient到gradient以及color到color，然后工作与上面类似
space-separated list of above|如果列表有相同的项目数值，则列表每一项按照上面的规则进行变化，否则无变化
a shorthand property|如果缩写的所有部分都可以实现动画，则会像所有单个属性变化一样变化

**示例1**

```CSS
img{ transition: 1s height; }   /*只有height的变化需要1秒实现，其他变化依然瞬间实现*/
img{ transition: 1s height, 1s width; }   /*height和width的变化是同时进行的*/
img{ transition: 1s height, 1s  1s width; }   /*width延迟（delay）1秒，再开始变化*/
img{ transition: 1s height cubic-bezier(.83,.97,.05,1.44); }   /*height在最后阶段放大过度、然后回缩*/
```

**示例2 - 下拉菜单**

```html
<div class="demo-hover demo-ul ul-transition t_c">
    <ul class="fllil">
        <li>
            <a href="javascript:;">html</a>
            <ul>
                <li><a href="#">div</a></li>
                <li><a href="#">h1</a></li>
            </ul>
        </li>
      <!---->
    </ul>
</div>
<style>
.demo-ul li ul{
    position: absolute;
    width: 100%; top: 40px; left: 0;
    transform: scaleY(0);
    overflow: hidden;
}
.ul-transition ul{
    transform-origin: 0 0;
    transition: all .5s;
}
.demo-ul li:hover ul{ transform: scaleY(1); }
</style>
```

**transition的使用注意**

- 不是所有的CSS属性都支持transition，完整的列表查看[这里](http://oli.jp/2010/css-animatable-properties/)，以及具体的[效果](http://leaverou.github.io/animatable/http://leaverou.github.io/animatable/)
- transition需要明确知道，开始状态和结束状态的具体数值，才能计算出中间状态。比如，height从0px变化到100px，transition可以算出中间状态。但是，transition没法算出0px到auto的中间状态，也就是说，如果开始或结束的设置是height: auto，那么就不会产生动画效果。类似的情况还有，display: none到block，background: url(foo.jpg)到url(bar.jpg)等等

**transition的局限**

- transition需要事件触发，所以没法在网页加载时自动发生
- transition是一次性的，不能重复发生，除非一再触发
- transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态
- 一条transition规则，只能定义一个属性的变化，不能涉及多个属性

CSS Animation就是为了解决这些问题而提出的

[back to top](#top)

<h2 id="CSS-Animation">2. CSS Animation</h2>

- `animation：动画名称，一个周期花费时间，运动曲线（默认ease），动画延迟（默认0），播放次数（默认1），是否反向播放动画（默认normal），是否暂停动画（默认running）`
- `animation-fill-mode : none / forwards  /backwards / both;`
  - none：不改变默认行为。    
  - forwards ：当动画完成后，保持最后一个属性值（在最后一个关键帧中定义） 
  - backwards：在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义）
  - both：向前和向后填充模式都被应用 

```CSS
div:hover { animation: 1s rainbow; } /*1) 指定动画一个周期持续的时间，以及动画效果的名称:  当鼠标悬停在div元素上时，会产生名为rainbow的动画效果，持续时间为1秒*/
@keyframes rainbow {    /*2) 用keyframes关键字定义rainbow效果*/
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}
/*sample*/
div:hover { animation: 1s 1s rainbow linear 3 forwards normal; }
div:hover {
  animation-name: rainbow;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-delay: 1s;
  animation-fill-mode:forwards;
  animation-direction: normal;
  animation-iteration-count: 3;
}
/* 2.1.1 动画具体播放的次数: infinite/n (无限次播放/n次)*/
div:hover {  animation: 1s rainbow infinite/n;  } /* 无限次播放/n次 */
/* 2.1.2 动画结束以后，会立即从结束状态跳回到起始状态。如果想让动画保持在结束状态，需要使用animation-fill-mode属性 */
div:hover {  animation: 1s rainbow forwards; }  /* 动画停留在结束状态 */
div:hover {  animation: 1s rainbow both; }  /*both: 根据animation-direction轮流应用forwards和backwards规则*/
/* 2.1.3 animation-direction: normal(default)/alternate/reverse/alternate-reverse, 最常用的值是normal和reverse。浏览器对其他值的支持情况不佳，应该慎用*/
div:hover {  animation: 1s rainbow 3 normal; }  /*动画连续播放三次*/
/*假定有一个动画是这样定义的*/
@keyframes rainbow {
  0% { background-color: yellow; }
  100% { background: blue; }
}
```  

![](http://i.imgur.com/lmbyhNo.png)

<h3 id="keyframes">2.1 keyframes</h3>

```css
@keyframes IDENT {   /*IDENT: 动画名称*/
     from {
       Properties:Properties value;
     }
     Percentage {
       Properties:Properties value;
     }
     to {
       Properties:Properties value;
     }
}
```

- 如省略某个状态，浏览器会自动推算中间状态, 使用from，Percentage， to是可以省略的, 还可以把多个状态写在一行
- 浏览器从一个状态向另一个状态过渡，是平滑过渡。**steps函数** 可以实现分步过渡。`div:hover { animation: 1s rainbow infinite steps(10); }`
- `animation-play-state`: 让动画保持突然终止时的状态

```css
div {
    animation: spin 1s linear infinite;
    animation-play-state: paused;
}
div:hover { animation-play-state: running; }   /*没有鼠标没有悬停时，动画状态是暂停；一旦悬停，动画状态改为继续播放*/
```

**案例1**

```css
@keyframes pulse {
  0% { transform: scale3d(1, 1, 1); }
  50%{ transform: scale3d(1.1, 1.1, 1.1); }
  100% { transform: scale3d(1, 1, 1); }
}
/*给这个按钮创建一个动名名称：buttonLight，然后在每个时间段设置不同的background,color来达到变色效果，改变box-shadow来达到发光效果*/
@-webkit-keyframes 'buttonLight' {
   from {
     background: rgba(96, 203, 27,0.5);
     -webkit-box-shadow: 0 0 5px rgba(255, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 200, 0.5);
     color: red;
   }
   25% {
     background: rgba(196, 203, 27,0.8);
     -webkit-box-shadow: 0 0 10px rgba(255, 155, 255, 0.5) inset, 0 0 8px rgba(120, 120, 200, 0.8);
     color: blue;
  }
  50% {
    background: rgba(196, 203, 127,1);
    -webkit-box-shadow: 0 0 5px rgba(155, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 100, 1);
    color: orange;
  }
  75% {
    background: rgba(196, 203, 27,0.8);
    -webkit-box-shadow: 0 0 10px rgba(255, 155, 255, 0.5) inset, 0 0 8px rgba(120, 120, 200, 0.8); 
    color: black;
  }
 to {
   background: rgba(96, 203, 27,0.5);
   -webkit-box-shadow: 0 0 5px rgba(255, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 200, 0.5);
   color: green;
  }
}
a.btn {  /*按钮的基本属性*/
  text-shadow: 0 -1px 1px rgba(0,0,0,0.3);
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.6) inset, 0 0 3px rgba(220, 120, 200, 0.8);
  /*调用animation属性，从而让按钮在载入页面时就具有动画效果*/
  animation: 1s buttonLight infinite;
}
```

**案例2： 打字效果 Typing animation with pure CSS**

```css
<h1>Typing animation by Lea Verou.</h1>
@keyframes typing { from { width: 0; } }
@keyframes blink-caret { 50% { border-color: transparent; } }
h1 { 
	font: bold 200% Consolas, Monaco, monospace;
	border-right: .1em solid;
	width: 16.5em;    /* fallback */
	width: 30ch;      /* # of chars(Typing animation with pure CSS. 
 * Works best in browsers supporting the ch unit) */
	margin: 2em 1em;
	white-space: nowrap;
	overflow: hidden;
	animation: typing 20s steps(30, end),     /* # of steps = # of chars */
	           blink-caret .5s step-end infinite alternate;
}
```

**案例3： stackoverflow**

```html
<style>
    body {
        font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
        overflow: hidden;
        background: #fff;
    }

    .center {
        margin: 80px auto;
    }

    .so {
        display: block;
        width: 500px;
        height: 156px;
        background: #ffffff;
    }
    .so .inner {
        width: 500px;
        height: 156px;
        position: absolute;
    }
    .so .inner * {
        position: absolute;
        animation-iteration-count: infinite;
        animation-duration: 3.5s;
    }
    .so .inner .name {
        position: absolute;
        font-size: 54px;
        left: 130px;
        top: 95px;
    }
    .so .inner .name .b {
        font-weight: bold;
    }
    .so .inner .stack-box {
        top: 100px;
        width: 115px;
        height: 56px;
    }
    .so .inner .box {
        width: 115px;
        height: 56px;
        left: 0px;
    }
    .so .inner .box div {
        background: #BCBBBB;
    }
    .so .inner .box .bottom {
        bottom: 0px;
        left: 0px;
        width: 115px;
        height: 12px;
    }
    .so .inner .box .left {
        bottom: 11px;
        left: 0px;
        width: 12px;
        height: 34px;
    }
    .so .inner .box .right {
        bottom: 11px;
        left: 103px;
        width: 12px;
        height: 34px;
    }
    .so .inner .box .top {
        top: 0px;
        left: 0px;
        width: 0;
        height: 12px;
    }
    .so .inner .stack {
        left: 22px;
        top: 22px;
    }
    .so .inner .stack .inner-item {
        background: #F48024;
        width: 71px;
        height: 12px;
    }
    .so .inner .stack .item {
        transition: transform 0.3s;
        width: 291px;
    }
    .so .inner .stack div:nth-child(1) {
        transform: rotate(0deg);
    }
    .so .inner .stack div:nth-child(2) {
        transform: rotate(12deg);
    }
    .so .inner .stack div:nth-child(3) {
        transform: rotate(24deg);
    }
    .so .inner .stack div:nth-child(4) {
        transform: rotate(36deg);
    }
    .so .inner .stack div:nth-child(5) {
        transform: rotate(48deg);
    }
    .so .inner .box {
        animation-name: box;
    }
    .so .inner .box .top {
        animation-name: box-top;
    }
    .so .inner .box .left {
        animation-name: box-left;
    }
    .so .inner .box .right {
        animation-name: box-right;
    }
    .so .inner .box .bottom {
        animation-name: box-bottom;
    }
    .so .inner .stack-box {
        animation-name: stack-box;
    }
    .so .inner .stack {
        animation-name: stack;
    }
    .so .inner .stack .inner-item {
        animation-name: stack-items;
    }
    .so .inner .stack .item:nth-child(1) {
        animation-name: stack-item-1;
    }
    .so .inner .stack .item:nth-child(2) {
        animation-name: stack-item-2;
    }
    .so .inner .stack .item:nth-child(3) {
        animation-name: stack-item-3;
    }
    .so .inner .stack .item:nth-child(4) {
        animation-name: stack-item-4;
    }
    .so .inner .stack .item:nth-child(5) {
        animation-name: stack-item-5;
    }
    @keyframes stack {
        0% {
            left: 22px;
        }
        15% {
            left: 22px;
        }
        30% {
            left: 52px;
        }
        50% {
            left: 52px;
        }
        80% {
            left: 22px;
        }
    }
    @keyframes stack-item-1 {
        0% {
            transform: rotate(12deg * 0);
        }
        10% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(0deg);
        }
        54% {
            transform: rotate(0deg);
        }
        92% {
            transform: rotate(12deg * 0);
        }
    }
    @keyframes stack-item-2 {
        0% {
            transform: rotate(12deg * 1);
        }
        10% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(0deg);
        }
        54% {
            transform: rotate(0deg);
        }
        92% {
            transform: rotate(12deg * 1);
        }
    }
    @keyframes stack-item-3 {
        0% {
            transform: rotate(12deg * 2);
        }
        10% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(0deg);
        }
        54% {
            transform: rotate(0deg);
        }
        92% {
            transform: rotate(12deg * 2);
        }
    }
    @keyframes stack-item-4 {
        0% {
            transform: rotate(12deg * 3);
        }
        10% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(0deg);
        }
        54% {
            transform: rotate(0deg);
        }
        92% {
            transform: rotate(12deg * 3);
        }
    }
    @keyframes stack-item-5 {
        0% {
            transform: rotate(12deg * 4);
        }
        10% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(0deg);
        }
        54% {
            transform: rotate(0deg);
        }
        92% {
            transform: rotate(12deg * 4);
        }
    }
    @keyframes stack-items {
        0% {
            width: 71px;
        }
        15% {
            width: 71px;
        }
        30% {
            width: 12px;
        }
        50% {
            width: 12px;
        }
        80% {
            width: 71px;
        }
    }
    @keyframes box {
        0% {
            left: 0;
        }
        15% {
            left: 0;
        }
        30% {
            left: 30px;
        }
        50% {
            left: 30px;
        }
        80% {
            left: 0;
        }
    }
    @keyframes box-top {
        0% {
            width: 0;
        }
        6% {
            width: 0;
        }
        15% {
            width: 115px;
        }
        30% {
            width: 56px;
        }
        50% {
            width: 56px;
        }
        59% {
            width: 0;
        }
    }
    @keyframes box-bottom {
        0% {
            width: 115px;
        }
        15% {
            width: 115px;
        }
        30% {
            width: 56px;
        }
        50% {
            width: 56px;
        }
        80% {
            width: 115px;
        }
    }
    @keyframes box-right {
        15% {
            left: 103px;
        }
        30% {
            left: 44px;
        }
        50% {
            left: 44px;
        }
        80% {
            left: 103px;
        }
    }
    @keyframes stack-box {
        0% {
            transform: rotate(0deg);
        }
        30% {
            transform: rotate(0deg);
        }
        40% {
            transform: rotate(135deg);
        }
        50% {
            transform: rotate(135deg);
        }
        83% {
            transform: rotate(360deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
<body>
<div class="so center">
    <div class="inner">
        <div class="stack-box">
            <div class="stack">
                <div class="item">
                    <div class="inner-item"></div>
                </div>
                <div class="item">
                    <div class="inner-item"></div>
                </div>
                <div class="item">
                    <div class="inner-item"></div>
                </div>
                <div class="item">
                    <div class="inner-item"></div>
                </div>
                <div class="item">
                    <div class="inner-item"></div>
                </div>
            </div>
            <div class="box">
                <div class="bottom"></div>
                <div class="left"></div>
                <div class="right"></div>
                <div class="top"></div>
            </div>
        </div>
        <div class="name">
            stack<span class="b">overflow</span>
        </div>
    </div>
</div>
```

> 参考这几个网站：
- [webdesignersblog](http://www.webdesignersblog.net/css3/35-best-awesome-css3-animation-demos/)
- [slodive](http://slodive.com/web-development/best-css3-animation-demos-tutorials/)
- [impressivewebs](http://www.impressivewebs.com/demo-files/css3-animated-scene/)这上面有许多特别有意的动画demo
- [CSS3 Spinner & Loader animations](https://www.html5tricks.com/demo/css3-loading-cool-styles/index.html)
- []

[back to top](#top)

<h3 id="CSS-Transform">3. CSS Transform</h3>

- transform:适用于2D或3D转换的元素
- transform-origin：转换元素的位置（围绕那个点进行转换）。默认(x,y,z)：(50%,50%,0)

```css
transform: rotate(30deg);
transform: rotateX(180deg);
transform: rotate3d(10, 10 ,10, 90deg);
transform: translate(30px, 30px);
transform: scale(.8);
transform: skew(10deg, 10deg);
```

[back to top](#top)

<h2 id="Will-Change">]4. Will-Change</h2>

> [see other article](https://github.com/honggzb/Study-General/blob/master/CSS-CSS3-Skill/CSS3-New-Feature/CSS3-will-change%E7%9A%84%E4%BD%BF%E7%94%A8(%E6%8F%90%E9%AB%98%E9%A1%B5%E9%9D%A2%E6%BB%9A%E5%8A%A8%E3%80%81%E5%8A%A8%E7%94%BB%E7%AD%89%E6%B8%B2%E6%9F%93%E6%80%A7%E8%83%BD).md)

<h2 id="CSS自定义属性制作动画">5. CSS自定义属性制作动画</h2>

使用CSS自定义属性优化胡子抖动的动画

```css
.mustache {
  width: 180px; height: 180px;
  border-radius: 100%;
  position: absolute; top: 0; left: 200px;
  color: black;
  box-shadow: 150px 240px 0 0 currentColor, 
    300px 240px 0 0 currentColor;
}
.mustache:before {
  content: '';
  position: absolute;
  width: 210px; height: 120px;
  border-bottom: solid 180px currentColor;
  left: 30px; top: 120px;
  border-radius: 0 0 0 100%;
  transform: rotate(-40deg);
  transform-origin: right 210px;
  animation: shakeLeft 1s ease-in-out infinite;
}
.mustache:after {
  content: '';
  position: absolute;
  width: 210px; height: 120px;
  border-bottom: solid 180px currentColor;
  left: 390px; top: 120px;
  border-radius: 0 0 100% 0;
  transform: rotate(40deg);
  transform-origin: left 210px;
  animation: shakeRight 1s ease-in-out infinite;
}
@keyframes shakeLeft {
  0%{ transform: rotate(-50deg); }
  50%{ transform: rotate(-30deg); }
  100%{ transform: rotate(-50deg); }
}
@keyframes shakeRight {
  0%{ transform: rotate(50deg);}
  50%{ transform: rotate(30deg);}
  100%{ transform: rotate(50deg);}
}
```

[modify](https://github.com/honggzb/Study-General/blob/master/CSS-CSS3-Skill/CSS3-New-Feature/mustache.html)

```HTML
<style>
/* define 3 css variables*/
:root {
  --mouse-x: 0.1;
  --mouse-y: 0.1;
  --rotate: 0.1;
}
.mustache { left: calc(1000px * var(--mouse-x, 0.1)); }   /* left=100px*/
.mustache:before { transform: rotate(calc(-40deg * var(--rotate, 0.1)));}
.mustache:after { transform: rotate(calc(40deg * var(--rotate, 0.1)));}
</style>
<script type="text/javascript">
    (function changeVar() { 
      var root = document.documentElement; 
      document.addEventListener('mousemove', function(e) { 
        var x = e.clientX / innerWidth; 
        var y = e.clientY / innerHeight; 
        var deg = Math.random()*(e.clientX - e.clientY) / e.clientX; root.style.setProperty('--mouse-x', x); root.style.setProperty('--mouse-y', y); root.style.setProperty('--rotate', deg); }); 
    })();
</script>
```

[移动鼠标改变图片的旋转角度值](https://github.com/honggzb/Study-General/blob/master/CSS-CSS3-Skill/CSS3-New-Feature/%E7%A7%BB%E5%8A%A8%E9%BC%A0%E6%A0%87%E6%94%B9%E5%8F%98%E5%9B%BE%E7%89%87%E7%9A%84%E6%97%8B%E8%BD%AC%E8%A7%92%E5%BA%A6%E5%80%BC.html)

[back to top](#top)

<h2 id="边框图片border">6. 边框图片border-image</h2>

`border-image: 图片url 图像边界向内偏移 图像边界的宽度(默认为边框的宽度) 用于指定在边框外部绘制偏移的量（默认0） 铺满方式--重复（repeat）、拉伸（stretch）或铺满（round）（默认：拉伸（stretch））;`

**边框图片动画**

```html
<style>
.demo {
    border: 15px solid transparent;
    padding: 15px;   
    border-image: url(border.png);
    border-image-slice: 30;        /*改变该属性可设置动画*/
    border-image-repeat: round;
    border-image-outset: 0;
    border-image-width: 10px;       /*改变该属性可设置动画*/
}
</style>
<div class="demo"></div>
```

[back to top](#top)

<h2 id="背景background">7. 背景background-clip, background-origin, background-size</h2>

- `background-clip`
  - border-box(默认): 从边框开始绘制
  - padding-box: 不算border,，相当于把border那里的背景给裁剪掉
  - content-box: 只在内容区绘制（显示），不算padding和border，相当于把padding和border那里的背景给裁剪掉
- `background-origin`: 引用菜鸟教程的说法：background-Origin属性指定background-position属性应该是相对位置
  - 同`background-clip`的属性
- `background-size`

![](https://i.imgur.com/b188PJM.png)

**案例： 多张背景图**

```css
div{
    border:1px dashed black;
    padding:35px;
    background-size: contain;
    background:url('test.jpg') no-repeat left,url(logo.png) no-repeat right;
}
```

[back to top](#top)

<h2 id="反射reflect">8. 反射reflect</h2>

`-webkit-box-reflect:方向[ above-上 | below-下 | right-右 | left-左 ]，偏移量，遮罩图片`

| 案例 |code|效果|
| :------------- | :------------- | :------------- |
|下倒影|.reflect-bottom {-webkit-box-reflect: below;}|![](https://i.imgur.com/svGMFyP.png)|
|下倒影（渐变）|`reflect-bottom-mask {-webkit-box-reflect: below 0 linear-gradient(transparent, white);}`|![](https://i.imgur.com/o1Vnfg0.png)|
|下倒影（图片遮罩）|.reflect-bottom-img -webkit-box-reflect: below 0 url(shou.png);}|![](https://i.imgur.com/MawcVll.png)|
|右倒影（有偏移|.reflect-right-translate {-webkit-box-reflect: right 10px;}|![](https://i.imgur.com/aURiqZZ.png)|

[back to top](#top)

> reference

- [CSS3 Transition](http://www.w3cplus.com/content/css3-transition)
- [CSS3 Animation](http://www.w3cplus.com/content/css3-animation)
- [CSS动画简介](http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html)
- [CSS自定义属性制作动画](#http://www.w3cplus.com/css3/create-animation-with-css-variables.html)
