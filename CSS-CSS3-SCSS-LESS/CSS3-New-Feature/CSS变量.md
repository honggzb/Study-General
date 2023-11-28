[Bridging CSS and JS with Custom Properties](#top)

- [1. CSS variable](#CSS-variable)
  - [1.1 CSS变量var()语法和用法](#CSS变量var语法和用法)
  - [1.2 CSS变量的空格尾随特性](#CSS变量的空格尾随特性)
  - [1.3 CSS变量的相互传递特性  ---`variable-name: var(--another-variable-name);`](#CSS变量的相互传递特性)
  - [1.4 CSS变量的作用域](#CSS变量的作用域)
    - CSS变量与响应式布局实例demo
  - [1.5 在JS中使用原生属性](#在JS中使用原生属性)
    - 案例1： 显示当前设备类型
    - 案例2：改变元素颜色
- [2. Passing values between CSS and JavaScript](#Passing-values-between-CSS-and-JavaScript)
  - 例子: 鼠标跟随
- [3. One variable, many changes](#One-variable-many-changes)
- [4. working with calc()](#working-with-calc)
- [5. Modular Scale with CSS variables](#Modular)
- [6. Responsive design with CSS Variable](#Responsive)

<h3 id="CSS-variable">1. CSS variable</h3>

unique abilities of Custom Properties

- cascade
- the ability to modify values with Javascript

<h4 id="CSS变量var语法和用法">1.1 CSS变量var()语法和用法</h4>

- CSS中原生的变量定义语法是： `--*`
- 变量使用语法是：  `var(--*)`

```css
body {
  --深蓝: #369;
  background-color: var(--深蓝);
}
//cascading using
.view { 
  transform: 
    translateX(var(--tx, 0))
    rotate(var(--deg, 0))
    scale(var(--scale, 1))
    translateY(var(--ty, 0));
}
.view.activated {
  --tx: 10vmin;
  --deg: 90deg;
}
.view.minimize {
  --scale: .8;
}
.view.priority {
  --ty: 10vmin;
}
//working with calc()
.colorful {
  --translation: 10;
  transform: 
    translateX(calc(var(--translation) * 1vw))
    translateY(calc(var(--translation) * 1vh));
  filter: hue-rotate(calc(var(--translation) * 4.5deg));
```

<h4 id="CSS变量的空格尾随特性">1.2 CSS变量的空格尾随特性</h4>

```css
body {
  --size: 20;   
  font-size: var(--size)px;
}
```

此处`font-size:var(--size)px`等同于`font-size:20 px`，注意，20后面有个空格

```css
body {
  --size: 20px;   
  font-size: var(--size);
}
/*或使用calc()*/
body {
  --size: 20;   
  font-size: calc(var(--size))*1px;
}
```

[back to top](#top)

<h4 id="CSS变量的相互传递特性">1.3 CSS变量的相互传递特性  ---`variable-name: var(--another-variable-name);`</h4>

```css
body {
  --green: #4CAF50;   
  --backgroundColor: var(--green);
}
/*例子*/
.block {
  --block-text: 'This is my block'; 
  --block-highlight-text: var(--block-text)' with highlight'; 
  } 
.block:before { content: var(--block-text); } 
.block__highlight:before { content: var(--block-highlight-text); 
/*注意： 声明新变量的值不能直接由一个已定义的变量计算而来，但可以使用CSS calc()来代替*/
.block{ --block-font-size: 1rem; }  
.block_highlight{ font-size: calc(var(--block-font-size)*1.5)};
.calcSample { margin: 0 0 calc(var(--base-line-height, 0) * 1rem); } /*http://codepen.io/malyw/pen/MymmNK*/
```

[back to top](#top)

<h4 id="CSS变量的作用域">1.4 CSS变量的作用域</h4>

- 使用:root 作用域来定义全局变量
- 局部作用域： 让某个变量只在部分元素/组件下可见，只需要在特定的元素下定义该变量著作权归作者所有。
- 媒体查询也可以提供作用域

```css
/*1 global*/
:root{--global-var: 'global'; }
/*2 局部作用域*/
.block__highlight { 
  --block-highlight-font-size: 1.5rem; 
  font-size: var(--block-highlight-font-size); 
}
/*3 媒体查询也可以提供作用域*/
@media screen and (min-width: 1025px) { 
  :root { --screen-category: 'desktop'; } 
}
/*例子:  展示伪类下的作用域*/
body { 
  --bg: #f00; background-color: 
  var(--bg); transition: background-color 1s; 
  } 
body:hover { --bg: #ff0; }
```

**[CSS变量与响应式布局实例demo](http://www.zhangxinxu.com/study/201611/css-var-media-query-layout.html)**

```css
.box {
    --columns: 4;
    --margins: calc(24px / var(--columns));
    --space: calc(4px * var(--columns));
    --fontSize: calc(20px - 4 / var(--columns));
}
@media screen and (max-width: 1200px) {
    .box { --columns: 3; }
}
@media screen and (max-width: 900px) {
    .box { --columns: 2; }
}
@media screen and (max-width: 600px) {
    .box { --columns: 1; }
}
```

[back to top](#top)

<h4 id="在JS中使用原生属性">1.5 在JS中使用原生属性</h4>

功能|css|js方法|js例子
---|---|---|---
Read value|`.my-element {--element-height: 5rem;}`|getPropertyValue|`rootStyles.getPropertyValue('--screen-category').trim();` 
Write value|`.my-element {height: calc(var(--element-height) * 1px);}` |setProperty|`myElement.style.setProperty('--element-height', height + 'px')`

```javascript
//read
const rootStyles = getComputedStyle(document.documentElement);
const varValue = rootStyles.getPropertyValue('--screen-category').trim();
//write
document.documentElement.style.setProperty('--screen-category', value);
```

**案例1： 显示当前设备类型**

```html
<h2>Debug CSS variables:</h2>
<div>
  <button class="alert-value">Alert '--screen-category' variable value</button>
</div>
<div>
  <button class="set-value">Set '--screen-category' variable value to:</button>
  <input type="text" class="var-value" value="custom" />
</div>
<div>
  <button class="set-value-from-var">Set '--screen-category' variable from '--default-screen-category'</button>
</div>
<style>
:root {--default-screen-category: 'default-screen-category';}
@media screen and (max-width: 1024px) {
  :root { --screen-category: 'tablet'; }
}
@media screen and (max-width: 640px) {
  :root {--screen-category: 'phone';}
}
@media screen and (min-width: 1025px) {
  :root {--screen-category: 'desktop';}
}
body:after { content: '--screen-category : 'var(--screen-category); }
</style>
<script>
document.querySelector('.alert-value').addEventListener('click', () => {
  const rootStyles = getComputedStyle(document.documentElement);
  const varValue = rootStyles.getPropertyValue('--screen-category').trim();
  alert(varValue);
});
const inputEl = document.querySelector('.var-value');
document.querySelector('.set-value').addEventListener('click', () => {
  document.documentElement.style.setProperty('--screen-category', `'${inputEl.value}'`);
});
document.querySelector('.set-value-from-var').addEventListener('click', () => {
  document.documentElement.style.setProperty('--screen-category', 'var(--default-screen-category)');
});
</script>
```

**案例2：改变元素颜色**

```html
<style>
:root {--footer-color: #ff4545; /* the default */}
footer {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  background-color: var(--footer-color)
}
</style>
<label>Choose a footer color:
<input type="color" value="#ff4545">
<footer></footer>
<script>
var input = document.querySelector('input')
var footer = document.querySelector('footer')
input.addEventListener('change', function(){
  footer.style.setProperty('--footer-color', input.value)
})
</script>
```

[back to top](#top)

<h3 id="Passing-values-between-CSS-and-JavaScript">2 Passing values between CSS and JavaScript</h3>

```JavaScript
.container {position: relative;}
.container > .auxElement {position: absolute;}
document.querySelector('.container').addEventListener('click', evt => {
  const aux = document.querySelector('container > .auxElement');
  aux.style.transform = `translate(${evt.clientX}px, ${evt.clientY}px)`;
})
```

或使用send javascript variable to .css  - **transform: translate(var, var)**

```css
.the_div{transition-duration:2s;}
var my_width = window.innerwidth * 0.1;
$(".the_div").css({"transform":"translate("+my_width+"px,0px)"});   //注意CSS变量的空格尾随特性
```

**例子: 鼠标跟随**

```html
<style>
#the_div{
  position: relative;
  --clickX: 0;
  --clickY: 0;
  height: 1000px;
}
#the_div > .auxElement {
  position: absolute;
  height: 50px;
  width:50px;
  background-color: blue;
  transform: translate(var(--clickX, 0), var(--clickY, 0));
}
</style>
<div id="the_div">
  this is a container.
  <div class="auxElement"></div>
</div>
<script>
const container = document.getElementById('the_div');
container.addEventListener('click', evt => {
  container.style.setProperty('--clickX', `${evt.clientX}px`);
  container.style.setProperty('--clickY', `${evt.clientY}px`);
});
</script>
```

[back to top](#top)

<h3 id="One-variable-many-changes">3. One variable, many changes</h3>

```javascript
const thingsToUpdate = new Map([
  ['playButton', 'background-color'],
  ['title': 'color'],
  ['progress': 'background-color']
])};
for (let [id, property] of thingsToUpdate) {
  document.getElementById(id).style.setProperty(property, newColor);
}
//2 
const colorList = document.querySelectorAll('.js-update-color');
for (let el of colorList) {
  el.style.setProperty('color', newColor);
}
const backgroundList = document.querySelectorAll('.js-update-background');
for (let el of backgroundList) {
  el.style.setProperty('background-color', newColor);
}
```

[back to top](#top)

<h3 id="working-with-calc">4. working with calc()</h3>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>css variable</title>
  <style>
  :root {
    --translation: 0;
  }
  .colorful {
    transform: 
      translateX(calc(var(--translation) * 1vw))
      translateY(calc(var(--translation) * 1vh));/*
      rotate(calc(var(--translation) * .025turn));*/
    filter: hue-rotate(calc(var(--translation) * 4.5deg));
    
    transition: transform 5000ms ease-in-out, filter 5000ms linear;
    
    width: 10vmin;
    height: 10vmin;
    border-radius: 2.5vmin;
    background: hsl(0, 50%, 50%);
    will-change: transform, filter;
  }
  .go {
    --translation: 80;
  }
  body {
    height: 100vh;
    display: flex;
    overflow: hidden;
    background: hsl(0, 50%, 12%);
  }
  </style>
</head>
<body>
<div class="colorful"></div>
<script>
  var colorful = document.querySelector('.colorful');
  colorful.addEventListener('transitionend', function(e){
    if(e.propertyName == 'transform'){
      document.documentElement.classList.toggle('go');
    }
  });
  setTimeout(function(){
    document.documentElement.classList.add('go');
  }, 10);
</script>
</body>
</html>
```

**use unitless variables + calc to vary rotations and easings in relation to one another**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>css variable</title>
  <style>
  :root {
    /* transform properties that will be updated via JS */
    --x: 0;
    --y: 0;
    --z: 0;
    --r: 0deg;
    --rotation: var(--r);
    --scale: .875;
    /* the four separat parts of the x and y cubic beziers */
    --cubic1-1: .85;
    --cubic1-2: .18;
    --cubic1-3: .44;
    --cubic1-4: 1.2;
    --cubic2-1: .75;
    --cubic2-2: -0.35;
    --cubic2-3: 0;
    --cubic2-4: .9;
    /* if advanced calc is supported, this will be used to give an additional easing variance to each item in the stack */
    --cubic1-change: 1;
    --cubic2-change: 1;
    /*treated like Sass/LESS variables */
    --primary: hsl(156, 70%, 60%);
    --secondary: hsl(203, 70%, 60%);
    --dim: 6vmin;
    --duration: 3200ms;
  }
  span, p, b, i {
    display: block;
    width: var(--dim);
    height: var(--dim);
    border-radius: 10%;
    background: var(--primary);
  }
  .x:nth-of-type(2n + 2) .r {
    background: var(--secondary);
  }
  div {
    will-change: transform;
    transition: transform var(--duration) ease-in-out;
  }
  .x {
    transform: translateX(calc(var(--x) * 1px));
    transition-timing-function: cubic-bezier(.85,.18,.44,1.2);
    transition-timing-function: cubic-bezier(var(--cubic1-1),var(--cubic1-2),var(--cubic1-3),var(--cubic1-4));
    position: absolute;
  }
  .advanced-calc .x {
    transition-timing-function: 
      cubic-bezier(
        calc(var(--cubic1-1) * var(--cubic1-change)),
        calc(var(--cubic1-2) * var(--cubic1-change)),
        calc(var(--cubic1-3) * var(--cubic1-change)),
        calc(var(--cubic1-4) * var(--cubic1-change)));
  }
  .y {
    transform: translateY(calc(var(--y) * 1px));
    transition-timing-function: cubic-bezier(.75,-0.35,.07,.9);
    transition-timing-function: cubic-bezier(var(--cubic2-1),var(--cubic2-2),var(--cubic2-3),var(--cubic2-4));
  }
  .advanced-calc .y {
    transition-timing-function: 
      cubic-bezier(
        calc(var(--cubic2-1) * var(--cubic2-change)),
        calc(var(--cubic2-2) * var(--cubic2-change)),
        calc(var(--cubic2-3) * var(--cubic2-change)),
        calc(var(--cubic2-4) * var(--cubic2-change)));
  }
  .z {
    transform: translateZ(calc(var(--z) * 1px));
    transition-timing-function: ease-in-out;
  }
  .r {
    transform: translate3d(-50%, -50%, 0) scale(var(--scale));
    transform: translate3d(-50%, -50%, 0) scale(var(--scale)) rotate(var(--rotation));
    transition: transform 1200ms ease-in-out;
  }
  /* give an extra amount of spin to different elements */
  .advanced-calc b.r {
    --rotation: calc(var(--r) * .5);
  }
  .advanced-calc p.r {
    --rotation: calc(var(--r) * 1.5);
  }
  body {
    min-height: 100vh;
    overflow: hidden;
    background: hsl(203, 28%, 12%);
    perspective: 1000px;
    perspective-origin: center center;
  }
  </style>
</head>
<body>
  <div class="z">
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><span class="r"></span></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><span class="r"></span></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><span class="r"></span></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><span class="r"></span></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><span class="r"></span></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><span class="r"></span></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><span class="r"></span></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><span class="r"></span></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><span class="r"></span></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><span class="r"></span></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><span class="r"></span></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><span class="r"></span></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><span class="r"></span></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
    <div class="x"><div class="y"><span class="r"></span></div></div>
    <div class="x"><div class="y"><b class="r"></b></div></div>
  </div>
<script>
//Determine if we can use unitless variables + calc to vary rotations and easings in relation to one another
document.documentElement.classList.add(isCalcSupported() ? 'advanced-calc' : 'basic-calc');
//All Items are stacked on top of each other with absolute positioning, make the front element the smallest scale. This function also sets up the relational cubic bezier offset. That is what sets up the additional motion effect in Chrome/Opera/Safari.
setupItems();
//Perform action on press end
if (window.PointerEvent) {
  document.body.addEventListener('pointerup', jumpFromInteraction);
} else {
  document.body.addEventListener('mouseup', jumpFromInteraction);
  document.body.addEventListener('touchend', jumpFromInteraction);
}
var style = document.documentElement.style;
function jumpFromInteraction(e) {
  if (beforeInteractionInterval) {
    clearInterval(beforeInteractionInterval);
    beforeInteractionInterval = undefined;
  }
  jump(e);
}
//Translate to the new point and rotate a randomized amount
function jump(e) {
  var x = e.clientX || e.changedTouches[0].clientX;
  var y = e.clientY || e.changedTouches[0].clientY;
  var r = Math.random() * 720 - 360;
  style.setProperty('--x', x);
  style.setProperty('--y', y);
  style.setProperty('--r', r + 'deg');
  changeEasing();
}
//Change the four points of the cubic-bezier to up the non-linear ante
function changeEasing() {
  style.setProperty('--cubic1-1', part(.8, .15));
  style.setProperty('--cubic1-2', part(.1, .2));
  style.setProperty('--cubic1-3', part(.35, .25));
  style.setProperty('--cubic1-4', part(1, .25));
  
  style.setProperty('--cubic2-1', part(.7, .15));
  style.setProperty('--cubic2-2', part(-.35, .35));
  style.setProperty('--cubic2-3', part(0, .1));
  style.setProperty('--cubic2-4', part(.8, .2));
}
function part(min, offset) {
  return Math.random() * offset + min;
}
//each square has a slightly offset scale and cubic-bezier multiplier that builds on the previous element.  When the cubic bezier is randomized on each press, each element will multiply each part of the cubic bezier by its cubic-change offset defined here.
function setupItems() {
  var items = document.querySelectorAll('.x');
  var l = items.length;
  for (var i = 0; i < l; ++i) {
    items[i].style.setProperty('--cubic1-change', .5 + i * .5/l);
    items[i].style.setProperty('--cubic2-change', 1 - i * .5/l);
    items[i].style.setProperty('--scale', 1 - i * .5/l);
  }
}

//Support functions
function isCalcSupported() {
  document.body.style.transitionTimingFunction = 'cubic-bezier(calc(1 * 1),1,1,1)';
  return getComputedStyle(document.body).transitionTimingFunction != 'ease';
}
//Do automatic animations while waiting for viewer to interact
setTimeout(freeJump,100);
var beforeInteractionInterval = setInterval(freeJump, 3200);
var freeJumpCount=0;
function freeJump() {
  jump({
    clientX: Math.floor(((freeJumpCount) % 4 < 2 ? (Math.random() * .3 + .7) : (Math.random() * .4 + .01)) * window.innerWidth),
    clientY:  Math.floor(((freeJumpCount++) % 2 == 0 ? (Math.random() * .2 + .8) : (Math.random() * .2 + .01)) * window.innerHeight)
  });
}
</script>
</body>
</html>
```

> Note: calc() does not always work as expected across the browsers

- [the differences in browser support for calc](https://codepen.io/thebabydino/pen/wfraH)
- [simplified calc use cases](https://codepen.io/danwilson/pen/ZKbxRv)

[back to top](#top)

<h3 id="Modular">5. Modular Scale with CSS variables</h3>

```css
:root {
  /* scale for 1.2 */
  --font-size-1: 1rem;
  --font-size-2: 1.2rem;
  --font-size-3: 1.44rem;
  --font-size-4: 1.728rem;
  --font-size-5: 2.074rem;
  --font-size-6: 2.488rem;
}
@media screen and (min-width: 800px) {
  :root {
    /* scale for 1.33 */
    --font-size-1: 1rem;     
    --font-size-2: 1.333rem; 
    --font-size-3: 1.777rem;
    --font-size-4: 2.369rem; 
    --font-size-5: 3.157rem;
    --font-size-6: 4.209rem;
  }
}
h1 {font-size: var(--font-size-6);}
h2 {font-size: var(--font-size-5);}
```

[back to top](#top)

<h3 id="Responsive">6. Responsive design with CSS Variables</h3>

```scss
// All the logic and setting of properties goes first.
// For static vars use Sass
$breakpoint-small: 450px;
$breakpoint-med: 900px;
$inverse-background: #222;
$inverse-text: #F0F0F0;
// For dynamically scoped vars use CSS Custom Props
:root {
	--container-display: block;
	--card-figure-display: none;
	--title-font-size: 1.2rem; 
	--card-background: #F0F0F0;
}
// CSS variables do not work in media query conditions 
// this is why we use sass variables
@media screen and (min-width: $breakpoint-small) {
	:root {
		--card-figure-display: inline-block;
		--title-font-size: 1.75rem; 
	}
}
@media screen and (min-width: $breakpoint-med) {
	:root {
		--container-display: flex;
		--title-font-size: 2rem; 
	}
}
// Dynamically scoped can include elements
.card-a, .card-c {
	--card-background: $inverse-background;
	--card-text-color: $inverse-text;
} 
// or elements within media queries
@media screen and (min-width: $breakpoint-med) { 
	.card-c {
		// I can force these variables to inherit from the :root
		--card-background: inherit;
		--card-text-color: inherit;
	}
	.card-a, .card-d {
		--card-background: #222;
		--card-text-color: #FAFAFA;
	} 
}
// End of variable declarations, now we start applying property declarations
// No media queries needed beyond this point.
// This is the 'logic fold'
html {
	font-family: 'Open Sans';
}
body {
	margin: 1rem auto;
	width: 85%;
	max-width: 1000px;
}
h1 { 
	font-size: var(--title-font-size); 
	font-weight: bold;
	margin: 0 1rem .5rem 1rem;
	line-height: 1.2;
}
.card-container {
	display: var(--container-display);
}
.card {
  display: flex;
	line-height: 1.15;
  align-items: flex-start;
	background: var(--card-background);
	color: var(--card-text-color);
	border: solid 1px #ccc;
	padding: 20px;
	margin: 1em;
}
.card-figure {
  margin-right: 1em;
	display: var(--card-figure-display);
}
.card-body {
  flex: 1;
}
.card-title {
	font-weight: bold;
	margin: 0 0 .5em 0;
}
```

[back to top](#top)

> Reference

- [CSS Custom Properties - The Basics](https://sgom.es/posts/2017-01-27-css-custom-properties-the-basics/)
- [Bridging CSS and JS with Custom Properties](https://sgom.es/posts/2017-02-10-bridging-css-and-js-with-custom-properties/?utm_source=frontendfocus&utm_medium=email)
- [小tips:了解CSS/CSS3原生变量var](http://www.zhangxinxu.com/wordpress/2016/11/css-css3-variables-var/comment-page-1/)
- [深入学习CSS自定义属性（CSS变量）](http://www.w3cplus.com/css3/css-properties-in-depth.html?utm_source=tuicool&utm_medium=referral)
- [Communicating Between JavaScript and CSS Using CSS Variables](https://eager.io/blog/communicating-between-javascript-and-css-with-css-variables/)
- [Using CSS variables correctly](https://madebymike.com.au/writing/using-css-variables/?utm_source=frontendfocus&utm_medium=email)
- [Making Custom Properties (CSS Variables) More Dynamic](https://css-tricks.com/making-custom-properties-css-variables-dynamic/)
