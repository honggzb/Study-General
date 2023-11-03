[现代CSS代码的建议](#top)

- [1. 一切应为Border-box](#一切应为Border-box)
- [2. 以背景图方式使用Images](#以背景图方式使用Images)
- [3. Em, Rem, 以及 Pixel](#EmRemPixel)
- [4. Flexbox](#Flexbox)
  - [4.1 Equal Height Columns](#Equal-Height-Columns)
  - [4.2 Reordering Elements](#Reordering-Elements)
  - [4.3 Horizontal And Vertical Centering](#Horizontal-And-Vertical-Centering)
  - [4.4 Fully Responsive Grids](#Fully-Responsive-Grids)
  - [4.5 Perfect Sticky Footer](#Perfect-Sticky-Footer)

<h3 id="一切应为Border-box">1. 一切应为Border-box</h3>

box-sizing这个属性相当的重要。它的两种取值:

- 默认值为content-box，即当我们设置某个元素的heght/width属性时，仅仅会作用于其内容尺寸。而所有的内边距与边都是在其之上的累加，譬如某个<div>标签设置为宽100，内边距为10，那么最终元素会占用120(100 + 2*10)的像素。
- border-box:内边距与边是包含在了width/height之内，譬如设置了width:100px的<div>无论其内边距或者边长设置为多少，其占有的大小都是100px。将元素设置为border-box会很方便你进行样式布局，这样的话你就可以在父元素设置高宽限制而不担心子元素的内边距或者边打破了这种限制。

[back to top](#top)

<h3 id="以背景图方式使用Images">2. 以背景图方式使用Images</h3>

如果需要在响应式的环境下展示图片，有个简单的小技巧就是使用该图片作为某个<div>的背景图而不是直接使用img标签。基于这种方式配合上background-size与background-position这两个属性，可以很方便地按比例缩放:

```css
img { width: 300px;height: 200px; }
div {
    width: 300px;
    height: 200px;
    background: url('http://cdn.tutorialzine.com/wp-content/uploads/2016/08/bicycle.jpg');
    background-position: center center;
    background-size: cover;
}
section{ float: left;margin: 15px; }
```

不过这种方式也是存在缺陷的，譬如你无法设置图片的懒加载、图片无法被搜索引擎或者其他类似的工具抓取到，有个不错的属性叫object-fit可以解决这个问题，不过该属性目前的浏览器支持并不是很完善。

[back to top](#top)

<h3 id="EmRemPixel">3. Em, Rem, 以及 Pixel</h3>

- `em` – 其基本单位即为当前元素的font-size值，经常适用于media-queries中，em是特别适用于响应式开发中。
- `rem` – 其是相对于html属性的单位，可以保证文本段落真正的响应式尺寸特性。
- `px` – Pixels 并没有任何的动态扩展性，它们往往用于描述绝对单位，并且可以在设置值与最终的显示效果之间保留一定的一致性。

[back to top](#top)

<h3 id="Flexbox">4. Flexbox</h3>

[5 Flexbox Techniques You Need to Know About](http://tutorialzine.com/2016/04/5-flexbox-techniques-you-need-to-know-about/)

<h4 id="Equal-Height-Columns">4.1 Equal Height Columns</h4>

```html
<style>
.container {
	display: flex;
	flex-direction: row;    /* Items inside the container will be positioned horizontally */
  align-items: stretch;   /* Items inside the container will take up it's entire height */
}
</style>
<div class="container">
	<div>...</div>
	<div>...</div>
	<div>...</div>
</div>
```

[back to top](#top)

<h4 id="Reordering-Elements">4.2 Reordering Elements</h4>

```html
<style>
.container {display: flex;}
.blue{order: 3; }
.red{order: 2; }
.green{order: 1;}
</style>
<div class="container">
  <div class="blue">...</div>
	<div class="red">...</div>
	<div class="green">...</div>
</div>
```

[back to top](#top)

<h4 id="Horizontal-And-Vertical-Centering">4.3 Horizontal And Vertical Centering</h4>

```html
<style>
.container {
  display: flex;
	justify-content: center;  /* Center according to the main axis */
  align-items: center;  /* Center according to the secondary axis */
}
</style>
<div class="container">
  <div>...</div>
</div>
```

[back to top](#top)

<h4 id="Fully-Responsive-Grids">4.4 Fully Responsive Grids</h4>

```html
<style>
.container {display: flex;}
.col-1{flex: 1;}
.col-2{flex: 2;}
@media (max-width: 800px){
	.container{
		flex-direction: column;  /* Turn the horizontal layout into a vertical one. */
	}
}
</style>
<div class="container">
	<div class="col-1">...</div>  <!-- This column will be 25% wide -->
	<div class="col-2">...</div><!-- This column will be 50% wide -->
	<div class="col-1">...</div><!-- This column will be 25% wide -->
</div>
```

[back to top](#top)

<h4 id="Perfect-Sticky-Footer">4.5 Perfect Sticky Footer</h4>

```html
<style>
html{height: 100%;}
body{
    display: flex;
    flex-direction: column;
    height: 100%;
}
/* The main section will take up all the available free space
   on the page that is not taken up by the footer. */
.main{ flex: 1 0 auto; }
/* The footer will take up as much vertical space as it needs and not a pixel more. */
footer{flex: 0 0 auto;}
</style>
<div class="container">
  <div class="main">...</div>
	<footer>...</footer>  <!-- Our sticky foooter -->
</div>
```

[148个资源让你成为CSS专家](https://segmentfault.com/a/1190000006689923#articleHeader6)
