##Bridging CSS and JS with Custom Properties

-- [top](#top)

- [1. CSS variable](#CSS-variable)
  - [1.1 CSS变量var()语法和用法](#CSS变量var语法和用法)
  - [1.2 CSS变量的空格尾随特性](#CSS变量的空格尾随特性)
  - [1.3 CSS变量的相互传递特性  ---`variable-name: var(--another-variable-name);`](#CSS变量的相互传递特性)
  - [1.4 CSS变量的作用域](#CSS变量的作用域)
  - [1.5 在JS中使用原生属性](#在JS中使用原生属性)
- [2. Passing values between CSS and JavaScript](#Passing-values-between-CSS-and-JavaScript)
- [3. One variable, many changes](#One-variable-many-changes)

<h3 id="CSS-variable">1. CSS variable</h3>

<h4 id="CSS变量var语法和用法">1.1 CSS变量var()语法和用法</h4>

- CSS中原生的变量定义语法是： `--*`
- 变量使用语法是：  `var(--*)`

```css
body {
  --深蓝: #369;
  background-color: var(--深蓝);
}
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

> Reference

- [CSS Custom Properties - The Basics](https://sgom.es/posts/2017-01-27-css-custom-properties-the-basics/)
- [Bridging CSS and JS with Custom Properties](https://sgom.es/posts/2017-02-10-bridging-css-and-js-with-custom-properties/?utm_source=frontendfocus&utm_medium=email)
- [小tips:了解CSS/CSS3原生变量var](http://www.zhangxinxu.com/wordpress/2016/11/css-css3-variables-var/comment-page-1/)
- [深入学习CSS自定义属性（CSS变量）](http://www.w3cplus.com/css3/css-properties-in-depth.html?utm_source=tuicool&utm_medium=referral)
- [Communicating Between JavaScript and CSS Using CSS Variables](https://eager.io/blog/communicating-between-javascript-and-css-with-css-variables/)
