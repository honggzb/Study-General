[你可能不知道的5个CSS属性](#top)

- [1. 书写显示（font-display和write-mode）](#font-display-write-mode)
  - [1.1 font-display](#font-display)
  - [1.2 writing-mode](#writing-mode)
- [2. 渲染性能的提升（contain和will-change属性）](#渲染性能的提升)
  - [2.1 contain](#contain)
  - [2.2 will-change](#will-change)
- [3. 创建新的花式设计（clip-path）](#创建新的花式设计)

<h3 id="font-display-write-mode">1. 书写显示（font-display和write-mode）</h3>

<h4 id="font-display">1.1 font-display</h4>

font-display属性允许控制可下载字体在完全加载之前呈现的方式，或者下载失败时的处理方案

font-display属性在@font-face声明时使用。借助它，可通过一行简单的CSS来控制字体的显示方式，而不需要使用基于JavaScript的解决方案。这意味着网页可以减小体积，提高性能。

在使用font-display时，以使用以下五个值之一：

- auto：默认值。这相当于根本不使用该属性，结果是浏览器隐藏文本，当自定义字体完成加载后再显示文本
- block：浏览器在等待自定义字体加载时隐藏文本的时间减少了（例如1秒）。如果这段期间自定义字体未加载好，文本会应用备用字体呈现出来。同时，浏览器将无限期地等待自定义字体加载，并且自定义字体加载完成后对文本应用自定义字体
- swap: 浏览器将立即展示后备字体，同时加载自定义字体。当自定义字体加载成功后，浏览器会使用自定义字体替换后备字体。 大多数情况下，这就是我们所追求的效果，之前提及到的JavaScript脚本实现的功能就基本和这个是一致的
- fallback: 使用自定义字体渲染的文本在短时间内 (大约 100ms) 不可见，之后浏览器将持续加载自定义字体，这个期间，文本将以无样式的状态呈现，当自定义字体加载好了之后，文本将会被赋予自定义的字体。但是，如果加载字体耗时过长，文本将会使用后备字体，并且不再会使用自定义字体替换（即使后续自定义字体加载成功）
- optional 效果和fallback几乎一样，都是先在极短的时间内文本不可见，然后再自定义字体没有加载好之前使用后备字体。不过optional选项可以让浏览器自由决定是否使用甚至加载自定义字体。选择权交给浏览器的原因是，当用户的网络环境不好的时候，加载字体也许并不是一个好的选择。当这些自定义字体不影响网页的品牌形象或者无碍设计的时候，这个值可能是个很好的选择

```css
@font-face {
  font-family: AmazingFont;
  src: url('/fonts/amazingfont.woff2') format('woff2'),
       url('/fonts/amazingfont.eot') format('eot');
  font-display: fallback;
}
h1 { font-family: AmazingFont, Arial, sans-serif; }
```

- [MDN 上的 font-display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display)
- [使用 font-display 控制字体性能](https://developers.google.com/web/updates/2016/02/font-display)
- [大家的 font-display](https://css-tricks.com/font-display-masses/)

[back to top](#top)

<h4 id="font-display">1.2. writing-mode</h4>

- writing-mode 并不是一个全新的 CSS 属性，现在所有主流浏览器(包括 Microsft Edge)都支持这个属性，不过较早的 Internet Explorer 规范支持的值有所不同。另外，Safari 支持这个属性的 vendor-prefixed 版本
- writing-mode 属性定义文本行是横向还是纵向，以及遇到边界时折行的方向
  - horizontal-tb：内容为我们常规的水平排列，从左到右阅读，第二行在第一行的下方
  - vertical-rl：内容垂直排列，从上到下，从右到左阅读，第二行在第一行的左侧
  - vertical-lr：内容垂直排列，从上到下，从左到右阅读，第二行在第一行的右侧
  - sideways-lr：内容垂直排列，从上到下，从左到右阅读，在所有的排版方式中，即使是垂直版式, 字的顶部都是向左的(只有Firefox支持)
  - sideways-rl：内容垂直排列，从上到下，从右到左阅读，在所有的排版方式中，即使是垂直版式，字的顶部都是向右(只有Firefox支持)

> References
- [JSFiddle](https://jsfiddle.net/e9swL373/)
- [CSS 写模式](https://24ways.org/2016/css-writing-modes/)
- [使用 CSS 3 实现垂直文本](http://generatedcontent.org/post/45384206019/writing-modes)
- [writing-mode](https://css-tricks.com/almanac/properties/w/writing-mode/)

[back to top](#top)

<h3 id="渲染性能的提升">2. 渲染性能的提升（contain和will-change属性）</h3>

<h4 id="contain">2.1 contain</h4>

- 如果构建具有许多小部件（包括第三方）的复杂网站，则新的contain 属性可能是优化网页的好工具。 如果您考虑在构建当今网页时大量使用Web Components和React组件，此属性可能会特别有用; 如果正在寻找一种将样式，布局和重绘计算范围限制为只有 DOM的局部的方法，则可以使用contains属性
- contain属性允许开发者声明当前元素和它的内容尽可能的独立于其他部分的Dom树
- 目前，只有Chrome 52+和Opera 40+才支持它。 contains允许几个值，每个值都可以让你限制浏览器需要做多少渲染工作
  - none：默认值。使用此值不应用限制效果
  - size：该值开启元素的大小限制。这意味着修改元素的大小可以不需要检查其后代。
  - layout：该值开启元素的布局限制。这规定外面任何东西都不会影响其内部布局，反之亦然
  - style：该值打开元素的样式限制。因此，对元素及其后代可能产生影响的属性不会影响这个元素之外的任何内容
  - paint：该值打开元素的绘制限制。这意味着元素的后代不会显示在其边界之外。例如，如果一个元素是屏幕外（或不可见的），它的所有元素都是屏幕外（或不可见的）。典型的用例是移动设备上的屏幕菜单
  - strict：该属性适用于所有形式的限制，本质上是除去none所有上述值的组合（即包含：size layout style paint）
  - content: 这个值与strict但像，除了不包含size

```html
<style>
  #menu {   contain: paint; } 
</style>
<button id="button">Show menu</button>
<ul id="menu" hidden>
  <li>Home</li>
  <li>About</li>
  <li>Contact</li>
</ul>
<script>
const menu = document.querySelector('#menu');
document.querySelector('#button').addEventListener('click', function() {
  if (menu.hasAttribute('hidden')) {
    menu.removeAttribute('hidden');
  } else {
    menu.setAttribute('hidden', '');
  }
});
</script>
```

- [CSS 包含属性](https://justmarkup.com/log/2016/04/css-containment/)
- [关于 contain 的 MDN 页面](https://developer.mozilla.org/en-US/docs/Web/CSS/contain)
- [10种减少重排提升性能的方式](https://www.sitepoint.com/10-ways-minimize-reflows-improve-performance/)
- https://csstriggers.com/

[back to top](#top)

<h4 id="will-change">2.2 will-change</h4>

will-change 属性，浏览器将有时间完成其优化工作，然后才需要执行操作并更改元素，并相应地分配内存。

- 不应该将此属性应用于太多元素即使您的页面运行良好。它会减慢运行速度并消耗大量的资源和内存，这很不友好。
您应该在更改发生之前和之后使用脚本代码切换开启will-change
- 这个属性不应该用来预测和解决潜在的性能问题。在出现问题后，它必须被视为最后的手段。
- will-change属性可以用来避免我们多年来一直在使用的hack：使用translateZ（）（或translate3d（））来推动浏览器动画并转换成硬件加速。

will-change支持四个值：

- auto: 浏览器不会设置任何特殊的优化。 这与没有指定属性一样具有相同的效果
- scroll-position：表明，顾名思义，您希望在不久的将来随时更改元素的滚动位置。 一些位于在可滚动的元素中的内容需要未来在滚动视窗内可见的时候，该值可用于提示浏览器准备渲染内容
- contents: 指定要更改元素的内容
- <custom-ident>: 期望改变的一个或多个CSS属性的名字，可以使用逗号将这些属性隔开。 这些属性有 transform和opacity

>References
- [Everything You Need to Know About the CSS will-change Property](https://dev.opera.com/articles/css-will-change-property/)
- [An Introduction to the CSS will-change Property](https://www.sitepoint.com/introduction-css-will-change-property/)

[back to top](#top)

<h3 id="创建新的花式设计">3. 创建新的花式设计（clip-path）</h3>

如果用 CSS 创建由简到繁的图形，clip-path 属性就很方便。使用这个属性，可以隐藏某个元素的特定区域。最常见的用法是在一个图像是使用 clip-path 属性有创意的显示一部分内容。

`clip-path: <clip-source> | [ <basic-shape> | <geometry-box> ] | none`

- `clip-source`: 引用内部或外部SVG元素的URL
- `basic-shape`: 基础形状函数， 定义在 CSS Shapes specification
- `geometry-box`: 如果明确与''组合，它将为基本形状提供参考框
- `none`: 没有剪贴


除了Microsoft的浏览器（Edge和IE）之外，所有主流浏览器都支持clip-path。 Safari支持带有-webkit-'前缀的属性。 第二个是所有实现了这个功能的浏览器只有部分的支持。 

- [CSS clip-path 属性介绍](https://www.sitepoint.com/introducing-css-clip-path-property/)
- [clip-path](https://css-tricks.com/almanac/properties/c/clip/)
- [在线工具clippy](http://bennettfeely.com/clippy/)


https://coyee.com/article/12409-5-css-properties-that-you-probably-don-t-know
