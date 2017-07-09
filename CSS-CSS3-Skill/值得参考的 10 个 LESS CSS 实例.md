[值得参考的 10 个 LESS CSS 实例](#top)

- [1. 简单的圆角半径](#简单的圆角半径)
- [2. 四角的半径定制](#四角的半径定制)
- [3. 方块阴影 Box Shadow](#方块阴影)
- [4. 元素过渡效果 Transition](#元素过渡效果)'
- [5. 转换/旋转 Transform](#转换))
- [6. 线性渐变 Linear Gradient](#线性渐变)
- [7. 快速渐变 Quick Gradient](#快速渐变)
- [8. 镜像效果 Webkit Reflection](#镜像效果)
- [9. 互补色方案 Complementary Color Scheme](#互补色方案)
- [10. 颜色微调 Subtle Color Scheme](#颜色微调)

CSS3 一个非常基本的新属性可以快速的生产圆角效果，如上图所示。要使用 CSS3 的圆角效果我们必须针对不同的浏览器定义各自的前缀，而如果使用了 LESS 就可以不用那么麻烦。

<h3 id="简单的圆角半径">1. 简单的圆角半径</h3>

使用一个变量来调整这个半径大小。下面代码使用 mixin 技术，通过定义 .border-radius 并接收一个 radius 参数，该参数默认值是 5px，可以在多个地方重复使用该 mixin 方法：

```css
/* Mixin */
.border-radius (@radius: 5px) {
	-webkit-border-radius: @radius;
	-moz-border-radius: @radius;
	border-radius: @radius;
}
/* Implementation */
#somediv {
	.border-radius(20px);
}
```

[back to top](#top)

<h3 id="四角的半径定制">2. 四角的半径定制</h3>

如希望用户可自由定制四个角的半径，那么我们需要对上面代码做下改进。使用4个变量分别代表四个边角的半径大小：

```css
/* Mixin */
.border-radius-custom (@topleft: 5px, @topright: 5px, @bottomleft: 5px, @bottomright: 5px) {
	-webkit-border-radius: @topleft @topright @bottomright @bottomleft;
	-moz-border-radius: @topleft @topright @bottomright @bottomleft;
	border-radius: @topleft @topright @bottomright @bottomleft;
}
/* Implementation */
#somediv {
	.border-radius-custom(20px, 20px, 0px, 0px);
}
```

[back to top](#top)

<h3 id="方块阴影">3. 方块阴影 Box Shadow</h3>
 
另外一个 CSS3 经常用到的属性是 box-shadow，该属性也有不同浏览器的前缀要求，而使用 LESS 的话可以这样：

```css
/* Mixin */
.box-shadow (@x: 0px, @y: 3px, @blur: 5px, @alpha: 0.5) {
	-webkit-box-shadow: @x @y @blur rgba(0, 0, 0, @alpha);
	-moz-box-shadow: @x @y @blur rgba(0, 0, 0, @alpha);
	box-shadow: @x @y @blur rgba(0, 0, 0, @alpha);
}
 /* Implementation */
#somediv {
	.box-shadow(5px, 5px, 6px, 0.3);
}
```

[back to top](#top)

<h3 id="元素过渡效果">4. 元素过渡效果 Transition</h3>
 
CSS3 的过渡使用起来更加麻烦，你必须最大化的支持各种浏览器，因此你需要定义 5 个前缀：

```css
/* Mixin */
.transition (@prop: all, @time: 1s, @ease: linear) {
	-webkit-transition: @prop @time @ease;
	-moz-transition: @prop @time @ease;
	-o-transition: @prop @time @ease;
	-ms-transition: @prop @time @ease;
	transition: @prop @time @ease;
}
/* Implementation */
#somediv { .transition(all, 0.5s, ease-in); } 
#somediv:hover { opacity: 0;}
```

[back to top](#top)

<h3 id="转换">5. 转换/旋转 Transform</h3>
 
你可以使用 CSS3 来对元素进行角度旋转、缩放和倾斜等效果：

```css
/* Mixin */
.transform (@rotate: 90deg, @scale: 1, @skew: 1deg, @translate: 10px) {
	-webkit-transform: rotate(@rotate) scale(@scale) skew(@skew) translate(@translate);
	-moz-transform: rotate(@rotate) scale(@scale) skew(@skew) translate(@translate);
	-o-transform: rotate(@rotate) scale(@scale) skew(@skew) translate(@translate);
	-ms-transform: rotate(@rotate) scale(@scale) skew(@skew) translate(@translate);
	transform: rotate(@rotate) scale(@scale) skew(@skew) translate(@translate);
}
/* Implementation */
#someDiv {
	.transform(5deg, 0.5, 1deg, 0px);
}
```
 
渐变是 CSS3 最复杂的属性之一，有上百万中不同的设置组合，但我们常用的无非几种。

[back to top](#top)

<h3 id="线性渐变">6. 线性渐变 Linear Gradient</h3>

实现两个不同颜色之间的渐变，你可以定义开始颜色和最终颜色，这里我们使用最新的渐变语法，浏览器的支持情况请看这里。

```css
/* Mixin */
.gradient (@origin: left, @start: #ffffff, @stop: #000000) {
	background-color: @start;
	background-image: -webkit-linear-gradient(@origin, @start, @stop);
	background-image: -moz-linear-gradient(@origin, @start, @stop);
	background-image: -o-linear-gradient(@origin, @start, @stop);
	background-image: -ms-linear-gradient(@origin, @start, @stop);
	background-image: linear-gradient(@origin, @start, @stop);
}
/* Implementation */
#someDiv { .gradient(left, #663333, #333333); }
```

[back to top](#top)

<h3 id="线性渐变">7. 快速渐变 Quick Gradient</h3>

创建渐变最讨厌的事情之一就是找出你的颜色。有时你只是想快速在现有颜色上做一些渐变效果。使用从透明开始到全黑的渐变效果，你需要设置的就是最初颜色已经透明度 alpha 值：

```css
/* Mixin */
.quick-gradient (@origin: left, @alpha: 0.2) {
	background-image: -webkit-linear-gradient(@origin, rgba(0,0,0,0.0), rgba(0,0,0,@alpha));
	background-image: -moz-linear-gradient(@origin, rgba(0,0,0,0.0), rgba(0,0,0,@alpha));
	background-image: -o-linear-gradient(@origin, rgba(0,0,0,0.0), rgba(0,0,0,@alpha));
	background-image: -ms-linear-gradient(@origin, rgba(0,0,0,0.0), rgba(0,0,0,@alpha));
	background-image: linear-gradient(@origin, rgba(0,0,0,0.0), rgba(0,0,0,@alpha));
}
/* Implementation */
#somediv {
	background-color: BADA55;
	.quick-gradient(top, 0.2);
}
```

[back to top](#top)

<h3 id=" 镜像效果">8. 镜像效果 Webkit Reflection</h3>
 
CSS3 中的镜像效果在浏览器都是普遍支持的。需要做的就是设置长度和不透明度这两个参数，很简单：

```css
/* Mixin */
.reflect (@length: 50%, @opacity: 0.2){
	-webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(@length, transparent), to(rgba(255,255,255,@opacity)));
}
/* Implementation */
#somediv { .reflect(20%, 0.2); }
```

颜色计算 Color Math: LESS 和 Sass 最独特的功能就是颜色计算函数，你可以轻松使用 LESS 来创建各种调色板，下面是两个简单的例子。

[back to top](#top)

<h3 id="互补色方案">9. 互补色方案 Complementary Color Scheme</h3>
 
这里我们使用一个基本色，然后通过彩色旋转以及加亮和变暗方法扩展到5个不同色板。为了生成互补色，我们使用 spin 将颜色旋转 180 度：

```css
/* Mixin */
@base: #663333;
@complement1: spin(@base, 180);
@complement2: darken(spin(@base, 180), 5%);
@lighten1: lighten(@base, 15%);
@lighten2: lighten(@base, 30%);
 
/* Implementation */
.one   {color: @base;}
.two   {color: @complement1;}
.three {color: @complement2;}
.four  {color: @lighten1;}
.five  {color: @lighten2;}
```

[back to top](#top)

<h3 id="颜色微调">10. 颜色微调 Subtle Color Scheme</h3>
 
互补色很有用，但在网页设计中另外一个更有用的就是颜色微调：

```css
/* Mixin */
@base: #663333;
@lighter1: lighten(spin(@base, 5), 10%);
@lighter2: lighten(spin(@base, 10), 20%);
@darker1: darken(spin(@base, -5), 10%);
@darker2: darken(spin(@base, -10), 20%);
/* Implementation */
.one   {color: @base;}
.two   {color: @lighter1;}
.three {color: @lighter2;}
.four  {color: @darker1;}
.five  {color: @darker2;}
```

[back to top](#top)
