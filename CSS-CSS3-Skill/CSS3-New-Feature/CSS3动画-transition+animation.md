##CSS3动画-transition+animation

--[top](top)

- [1. CSS Transition](#CSS-Transition)
- [2. CSS Animation](#CSS-Animation)
  - [2.1 animation](#animatio)
  - [2.2 keyframes](#keyframes)
- [3. CSS Transform](#CSS-Transform)
- [4. Will-Change](#Will-Change)
- [5. CSS自定义属性制作动画](#CSS自定义属性制作动画)

CSS3属性中有关于制作动画的三个属性：`Transform,Transition,Animation`

<h3 id="CSS-Transition">1. CSS Transition</h3>

`transition ： [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'> [, [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'>]]*`

属性|说明
---|---
`transition-property：none(没有属性改变)/ all（所有属性改变, default）/[<IDENT>（元素属性名）] [','<IDENT>]*`|当元素其中一个属性改变时执行transition效果
`transition-duration ： <time> [, <time>]* `| 指定元素 转换过程的持续时间，单位为s（秒）或者ms(毫秒),可以作用于所有元素，包括:before和:after伪元素。其默认值是0，也就是变换时是即时的
`transition-timing-function ：ease/linear(匀速)/ease-in(加速)/ease-out(减速)/ease-in-out/cubic-bezier(<number>, <number>, <number>, <number>)[, ease/ linear/ease-in/ease-out/ ease-in-out/cubic-bezier(<number>, <number>, <number>, <number>)]* `|根据时间的推进去改变属性值的变换速率, cubic-bezier，可以使用[工具网站](http://cubic-bezier.com/#.17,.67,.83,.67)来定制
`transition-delay ： <time> [, <time>]* `| 指定一个动画开始执行的时间，也就是说当改变元素属性值后多长时间开始执行transition效果，单位为s（秒）或者ms(毫秒)，其使用和transition-duration极其相似，也可以作用于所有元素，包括:before和:after伪元素。 默认大小是"0"，也就是变换立即执行，没有延迟

```
                    animation duration           animation delay
transition:   all           .5s       ease-in-out      1s;
       selected property             animation type
```

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

<h3 id="CSS-Animation">2. CSS Animation</h3>

```CSS
div:hover { animation: 1s rainbow; } /*1) 指定动画一个周期持续的时间，以及动画效果的名称:  当鼠标悬停在div元素上时，会产生名为rainbow的动画效果，持续时间为1秒*/
@keyframes rainbow {    /*2) 用keyframes关键字定义rainbow效果*/
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}
```

<h4 id="animation">2.1 animation</h4>

```css
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


<h4 id="keyframes">2.2 keyframes</h4>

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

参考这几个网站：[webdesignersblog](http://www.webdesignersblog.net/css3/35-best-awesome-css3-animation-demos/)、[slodive](http://slodive.com/web-development/best-css3-animation-demos-tutorials/)、[impressivewebs](http://www.impressivewebs.com/demo-files/css3-animated-scene/)这上面有许多特别有意的动画demo

[back to top](#top)

<h3 id="CSS-Transform">3. CSS Transform</h3>

[back to top](#top)

<h3 id="Will-Change">]4. Will-Change</h3>

> [see other article](https://github.com/honggzb/Study-General/blob/master/CSS-CSS3-Skill/CSS3-New-Feature/CSS3-will-change%E7%9A%84%E4%BD%BF%E7%94%A8(%E6%8F%90%E9%AB%98%E9%A1%B5%E9%9D%A2%E6%BB%9A%E5%8A%A8%E3%80%81%E5%8A%A8%E7%94%BB%E7%AD%89%E6%B8%B2%E6%9F%93%E6%80%A7%E8%83%BD).md)

<h3 id="CSS自定义属性制作动画">5. CSS自定义属性制作动画</h3>

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

modify

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

[back to top](#top)

> reference

- [CSS3 Transition](http://www.w3cplus.com/content/css3-transition)
- [CSS3 Animation](http://www.w3cplus.com/content/css3-animation)
- [CSS动画简介](http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html)
- 
