[Contents](#top)

- [Layout](#layout)
  - [centering](#centering)
  - [Constant width to height ratio](#constant-width-to-height-ratio)
  - [clearfix](#clearfix)
- [Visual](#visual)
  - [Dynamic shadow](#dynamic-shadow)
  - [text selection](#text-selection)
  - [text disable selection](#text-disable-selection)
  - [Etched text](#etched-text)
  - [Gradient text](#gradient-text)
  - [Offscreen](#offscreen)
  - [Overflow scroll gradient](#overflow-scroll-gradient)
  - [Pretty text underline](#pretty-text-underline)
  - [Shape separator](#shape-separator)
  - [System font stack](#system-font-stack)
  - [Triangle](#triangle)
- [Animation](#animation)
  - [bounding loading](#bounding-loading)
  - [donut spinner](#donut-spinner)
  - [hover underline animation](#hover-underline-animation)
- [Interactivity](#interactivity)
  - [Mouse cursor gradient tracking](#mouse-cursor-gradient-tracking)
  - [Tab Sibling fade](#tab-sibling-fade)
- [other](#other)
  - [list Counter](#list-counter)

--------------------------

> 1rem ~= 16px
  
--------------------------

## Layout

### centering

```css
/* display table centering */
.container{ height: 250px; width: 250px; }
.center{ display: table; height: 100%; width: 100%; }
.center > span { display: table-cell; text-align: center; vertial-align: middle; }
/* display flexbox centering */
.container{ display: flex; justify-content: center; align-items: center; }
/* display grid centering */
.container{ display: grid; justify-content: center; align-items: center; }
/* transform centering */
.container{ height: 250px; width: 250px; position: relative;}
.center{ left: 50%; position: absolute; top: 50%; transform: translate(-50%, -50%) }
```

### Constant width to height ratio

`<div class="constant-width-to-height-ratio"></div>`

```css
.constant-width-to-height-ratio {
  background: #333;
  width: 50%;
}
.constant-width-to-height-ratio::before {
  content: '';
  padding-top: 100%;
  float: left;
}
.constant-width-to-height-ratio::after {
  content: '';
  display: block;
  clear: both;
}
```

### clearfix

```css
container.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
```

[back to top](#top)

## Visual

### Dynamic shadow

```html
<div class="dynamic-shadow"></div>
<style>
.dynamic-shadow {
  position: relative;
  width: 10rem;
  height: 10rem;
  background: linear-gradient(75deg, #6d78ff, #00ffb8);
  z-index: 1;
}
.dynamic-shadow::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background: inherit;
  top: 0.5rem;
  filter: blur(0.4rem);    /* blur the pseudo-element to create the appearance of a shadow underneath */
  opacity: 0.7;
  z-index: -1;
}
</style>
```

### text selection

- `<p class="custom-text-selection">Select some of this text.</p>`
- `::selection` defines a pseudo selector on an element to style text within it when selected. Note that if you don't combine any other selector your style will be applied at document root level, to any selectable element.

```css
::selection {
  background: aquamarine;
  color: black;
}
.custom-text-selection::selection {
  background: deeppink;
  color: white;
}
```

[back to top](#top)

### text disable selection

- Requires prefixes for full support 
- This is not a secure method to prevent users from copying content.

```css
.unselectable {
  user-select: none;
}
```

### Etched text

```css
/* use text-shadow - a white shadow offset 0px horizontally and 2px vertically from the origin position */
.etched-text {
  text-shadow: 0 2px white;
  font-size: 1.5rem;
  font-weight: bold;
  color: #b8bec5;
}
```

### Gradient text

```css
/* -webkit-linear-gradient -> gives the text element a gradient background.*/
.gradient-text {
  background: -webkit-linear-gradient(pink, red);
  -webkit-text-fill-color: transparent;   /* fills the text with a transparent color */
  -webkit-background-clip: text; /* clips the background with the text, filling the text with the gradient background as the color */
}
```

[back to top](#top)

### Offscreen

- way to completely hide an element visually and positionally in the DOM while still allowing it to be accessed by JavaScript and readable by screen readers. This method is very useful for accessibility ( ADA) development when more context is needed for visually-impaired users. 
- As an alternative to `display: none` which is not readable by screen readers or `visibility: hidden` which takes up physical space in the DOM

```html
<a class="button" href="http://pantswebsite.com">
  Learn More
  <span class="offscreen"> about pants</span>
</a>
<style>
.offscreen {
  border: 0;
  clip: rect(0 0 0 0);    /* indicate that no part of the element should be shown */
  height: 1px;  /* height and width of the element 1px */
  margin: -1px; /* Negate the elements height and width */
  overflow: hidden;   /* hide the element's overflow */
  padding: 0;         /* remove all padding */
  position: absolute;
  width: 1px;
}
</style>
```

### Overflow scroll gradient

```html
<div class="overflow-scroll-gradient">
  <div class="overflow-scroll-gradient__scroller">
    Content to be scrolled
  </div>
</div>
<style>
.overflow-scroll-gradient {
  position: relative;
}
.overflow-scroll-gradient::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 240px;
  height: 25px;
  /* adds a linear gradient that fades from transparent to white  */
  background: linear-gradient(rgba(255, 255, 255, 0.001), white ); /* transparent keyword is broken in Safari and IE */
  /* specifies that the pseudo-element cannot be a target of mouse events, allowing text behind it to still be selectable/interactive */
  pointer-events: none;
}
.overflow-scroll-gradient__scroller {
  overflow-y: scroll;
  background: white;
  width: 240px;
  height: 200px;
  padding: 15px 0;
  line-height: 1.2;
  text-align: center;
}
</style>
```

[back to top](#top)

### Pretty text underline

```css
.pretty-text-underline {
  display: inline;
  /* uses 4 values with offsets that cover a 4x4 px area to ensure the underline has a "thick" shadow  */
  text-shadow: 1px 1px #f5f6f9, -1px 1px #f5f6f9, -1px -1px #f5f6f9, 1px -1px #f5f6f9;  
  /* creates a 90deg gradient using the text color */
  background-image: linear-gradient(90deg, currentColor 100%, transparent 100%);
  /* size the gradient as 100% of the width of the block and 1px in height at the bottom and disables repetition, which creates a 1px underline beneath the text */
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 100% 1px;
}
/* ::selection pseudo selector rule ensures the text shadow does not interfere with text selection */
.pretty-text-underline::-moz-selection {
  background-color: rgba(0, 150, 255, 0.3);
  text-shadow: none;
}
.pretty-text-underline::selection {
  background-color: rgba(0, 150, 255, 0.3);
  text-shadow: none;
}
```

### Shape separator

```css
.shape-separator {
  position: relative;
  height: 48px;
  background: #333;
}
/* using SVG shape, but it did not work for IE*/
.shape-separator::after {
  content: '';
  background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxLjQxNCI+PHBhdGggZD0iTTEyIDEybDEyIDEySDBsMTItMTJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+);
  position: absolute;
  width: 100%;
  height: 24px;
  bottom: 0;
}
```

[back to top](#top)

### System font stack

Uses the native font of the operating system to get close to a native app feel

```css
.system-font-stack {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu,
    Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
```

### Triangle

```css
.triangle-down {
  width: 0; height: 0;
  border-top: 20px solid #333;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
.triangle-up {
  width: 0; height: 0;
  border-bottom: 20px solid #333;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
.triangle-left {
  width: 0; height: 0;
  border-left: 20px solid #333;
  border-bottom: 20px solid transparent;
  border-top: 20px solid transparent;
}
.triangle-full-down {
  width: 0; height: 0;
  border-top: 40px solid #333;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
}
```

[back to top](#top)

## Animation

### bounding loading

```html
<div class="bouncing-loader">
  <div></div>
  <div></div>
  <div></div>
</div>
<style>
@keyframes bouncing-loader {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0.1;
    transform: translateY(-1rem);
  }
}
.bouncing-loader {
  display: flex;
  justify-content: center;
}
.bouncing-loader > div {
  width: 1rem;
  height: 1rem;
  margin: 3rem 0.2rem;
  background: #8385aa;
  border-radius: 50%;
  animation: bouncing-loader 0.6s infinite alternate;
}
.bouncing-loader > div:nth-child(2) {
  animation-delay: 0.2s;
}
.bouncing-loader > div:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
```

### donut spinner

```html
<div class="donut"></div>
<style>
@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.donut {
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);   /* semi-transparent border*/
  border-left-color: #7983ff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: donut-spin 1.2s linear infinite;
}
</style>
```

### hover underline animation

`<p class="hover-underline-animation">Hover this text to see the effect!</p>`

```css
.hover-underline-animation {
  display: inline-block;    /* prevent the underline from spanning the entire parent width rather than just the text */
  position: relative;
  color: #0087ca;
}
.hover-underline-animation::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #0087ca;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
```

[back to top](#top)

## Interactivity

### Mouse cursor gradient tracking

```html
<button class="mouse-cursor-gradient-tracking">
  <span>Hover me</span>
</button>
<style>
  .mouse-cursor-gradient-tracking {
  position: relative;
  background: #7983ff;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border: none;
  color: white;
  cursor: pointer;
  outline: none;
  overflow: hidden;
}
.mouse-cursor-gradient-tracking span {
  position: relative;
}
.mouse-cursor-gradient-tracking::before {
  --size: 0;
  content: '';
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--size);
  height: var(--size);
  background: radial-gradient(circle closest-side, pink, transparent);
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease;
}
.mouse-cursor-gradient-tracking:hover::before {
  --size: 200px;
}
</style>
<script>
  var btn = document.querySelector('.mouse-cursor-gradient-tracking')
btn.onmousemove = function(e) {
  var x = e.pageX - btn.offsetLeft
  var y = e.pageY - btn.offsetTop
  btn.style.setProperty('--x', x + 'px')
  btn.style.setProperty('--y', y + 'px')
}
</script>
```

> note: If the element's parent has a positioning context (position: relative), you will need to subtract its offsets as well

```javascript
var x = e.pageX - btn.offsetLeft - btn.offsetParent.offsetLeft
var y = e.pageY - btn.offsetTop - btn.offsetParent.offsetTop
```

### Tab Sibling fade

```html
<div class="sibling-fade">
  <span>Item 1</span>
  <span>Item 2</span>
  <span>Item 3</span>
  <span>Item 4</span>
  <span>Item 5</span>
  <span>Item 6</span>
</div>
<style>
  span {
  padding: 0 1rem;
  transition: opacity 0.2s;
}
.sibling-fade:hover span:not(:hover) {
  opacity: 0.5;
}
</style>
```

[back to top](#top)

## other

### list Counter

- `counter-reset` : Initializes a counter, the value is the name of the counter. By default, the counter starts in 0. This property can also be used to change its value to any specific number
  - `counter-reset: [ <identifier> <integer>? ]+ | none | inherit`
  - identifier: 计数器名称，可自定义, 名称时可以随意取名，但此名不能是CSS的关键词
  - integer:  计数器的初始值，默认为0
- `counter-increment` Used in element that will be countable. Once counter-reset initialized, a counter's value can be increased or decreased
  - `counter-increment: [ <identifier> <integer>? ]+ | none | inherit`
  - identifier: 计数器名称，调用counter-reset声明的计数器的标识符
  - integer:  计数器的初始值，默认为0, 指定计数起始值。其值允许是0或者负整数值，如果未指定任何值，则该值为1（前提是counter-reset未显式设置计数的起始值）。其值递增是按倍数值递增，如果设置了值为2,后面元素递增值为4、6、8，依此类推
- `content`: 和伪类:before、:after或者伪元素::before、::after配合在一起使用，主要功能用来生成内容
  - `&:before{ content:"Chapter" counter(Chapter) "." counter(section); }`
- `counter(name, style)` 
  - 函数，其主要配合content一起使用
  - name:  定义的属性值,用来告诉该文档插入的计数器标识符名称是什么
  - style: 与列表中的list-style-type值相等, 可是'disc, circle, square, decimal, decimal-leading-zero, lower-roman, upper-roman, lower-greek, lower-latin, upper-latin, armenian, georgian, lower-alpha, upper-alpha, none, inherit'
- `counters(counter, string, style)` 
  - 函数，其主要配合content一起使用
  -  the first as the name of the counter
  -  the second one you can include a string which comes after the counter
  -  the third one can be decimal or upper-roman (decimal by default)
- **counter只会对可见元素做统计**。只要DOM元素设置了display:none和visibility: hidden;都将不会被计算在内

**1. general- number, such as 2-1, 2-2**

```html
<ul>
  <li>List item</li>
  <li>List item</li>
  <li>List item
    <ul>
      <li>sub List item</li>
      <li>sub List item</li>
      <li>sub List item</li>
    </ul>
  </li>
</ul>
<style>
  /* 1) 父元素有一个counter-reset应用于实例化（初始化）*/
  ul { counter-reset: unicornCounter; }   /* Initializes a counter, the value is the name of the counter. By default, the counter starts in 0.  */
  /* 2) 被指定的子元素上开始计算 */
  li::before {
    counter-increment: unicornCounter;
    /* 3) 显示计数器 - 可以使用伪元素(::before或::after)和它的content来显示计数器 */
    content: counters(unicornCounter, '-') ' '; /* included sub-title of list, such as 2-1, 2-2 */
  }
  /*2. upper-roman, such as I-II */
   ul { counter-reset: term; } 
  li::before {
    counter-increment: term;
    content: counters(unicornCounter, '-') ' '; 
  }
</style>
```

**2. upper-roman, such as I-II**

```html
<dl>
  <dt>term</dt>
  <dd>definition</dd>
  <dd>definition</dd>
  <dd>definition</dd>
  <dt>term</dt>
  <dd>definition</dd>
  <dd>definition</dd>
<dl>
<style>
  dl { counter-reset: term; }
  dt { 
    counter-increment: term;
    counter-reset: definition;
  }
  dt::before {
    content: counter(term, upper-roman) ":"; 
  }
  dd{ counter-increment: definition; }
  dd::before {
    content:counter(term,upper-roman) "-" counter(definition,upper-roman) ":";
    margin-right:5px;
  }
</style>
```

- [counter-increment
](https://tympanus.net/codrops/css_reference/counter-increment/)
- [CSS的计数器：counter-increment与counter-reset](http://www.wozhuye.com/compatible/297.html)
- [扩展阅读-使用CSS的counter-increment做的游戏](https://www.w3cplus.com/css3/pure-css-games-with-counter-increment.html)

**3. Automatic Figure Numbering counter**

```html
<article>
  <figure>
    <img src="1.jpg" alt="" />
    <figcaption>Here is the legend for your image<figcaption>
  </figure>
  <p>...</p>
</article>
<style>
.article { counter-reset: figures;}
.figure figcaption { counter-increment: figures; }
.figure figcaption:before {content: 'Fig. ' counter(figures) ' - ';}
/* format of number is :  FIG. 1 - Here is the legend for your image*/
</style>  
```

> [30 seconds of code](https://github.com/30-seconds/30-seconds-of-code#readme)
