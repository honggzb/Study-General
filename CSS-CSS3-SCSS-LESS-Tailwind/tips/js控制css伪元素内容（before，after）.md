## [js控制css伪元素内容（before，after）](#top)

- [一、伪元素](#伪元素)
- [二、Javascript获取CSS伪元素属性](#Javascript获取CSS伪元素属性)
- [三. 更改伪元素的样式](#更改伪元素的样式)
  - [方法1. 用class名来重写样式- (简单粗暴)更换class来实现伪元素属性值的更改](#更换class来实现伪元素属性值的更改)
  - [方法2. 使用CSSStyleSheet的insertRule来为伪元素修改样式](#使用CSSStyleSheet的insertRule来为伪元素修改样式)
  - [方法3. 在head标签中插入style的内部样式](#在head标签中插入style的内部样式)
- [四、修改伪元素的content的属性值](#修改伪元素的content的属性值)
  - [方法1. 使用CSSStyleSheet的insertRule来为伪元素修改样式](#使用CSSStyleSheet的insertRule来为伪元素修改样式)
  - [方法2. 使用DOM元素的`data-*`属性来更改content的值](#使用DOM元素的data属性来更改content的值)
  - [方法3. 自定义功能](#自定义功能)
- [五、`:before`和`:after`伪元素的常见用法总结)](#before和after伪元素的常见用法总结)
  - [5.1 利用content属性，为元素添加内容修饰](#利用content属性，为元素添加内容修饰)
  - [5.2 用于清除浮动](#清除浮动)
  - [5.3 特效妙用](#特效妙用)
  - [5.4 特殊形状的实现- 对话气泡](#特殊形状的实现)
  - [5.5 需要修改伪元素的content属性，使用attr函数，伪元素的content属性支持这个方法](#需要修改伪元素的content属性)
  - [5.6 调用计数器](#调用计数器)

<h3 id="伪元素">一、伪元素</h3>

伪元素有六个，分别是 `::after、::before、::first-line、::first-letter、::selection、::backdrop`, 在各大网页中最常用的伪元素，是`::after`和`::before`。

[back to top](#top)

<h3 id="Javascript获取CSS伪元素属性">二、Javascript获取CSS伪元素属性</h3>

语法： `window.getComputedStyle(element[, pseudoElement])`

```javascript
.element:before { content: 'NEW'; color: rgb(255, 0, 0); }
var color = 
        window.getComputedStyle(document.querySelector('.element'), ':before')
              .getPropertyValue('color')
```

把伪元素作为第二个参数传到window.getComputedStyle方法中就可以获取到它的CSS属性了。

> 注：

- window.getComputedStyle方法在IE9以下的浏览器不支持，getPropertyValue必须配合getComputedStyle方法一起使用。IE支持CurrentStyle属性，但还是无法获取伪元素的属性
- `getPropertyValue()`和直接使用键值访问，都可以访问`CSSStyleDeclaration Object`。它们两者的区别有：
对于float属性，如果使用键值访问，则不能直接使用getComputedStyle(element, null).float，而应该是cssFloat与styleFloat；
直接使用键值访问，则属性的键需要使用驼峰写法，如：style.backgroundColor
- 使用getPropertyValue()方法不必可以驼峰书写形式（不支持驼峰写法），例如：style.getPropertyValue(“border-top-color”)；
getPropertyValue()方法在IE9+和其他现代浏览器中都支持；在IE6~8中，可以使用getAttribute()方法来代替；
- 伪元素默认是”display: inline”。如果没有定义display属性，即使在CSS中显式设置了width的属性值为固定的大小如”100px”，但是最后获取的width值仍是”auto”。这是因为行内元素不能自定义设置宽高。解决办法是给伪元素修改display属性为”block”、”inline-block”或其他。

[back to top](#top)

<h3 id="更改伪元素的样式">三. 更改伪元素的样式</h3>

<h4 id="更换class来实现伪元素属性值的更改">方法1. 用class名来重写样式- (简单粗暴)更换class来实现伪元素属性值的更改</h4>

```html
<style>
p:after{content:'我是后缀'}
p.change{content:'我是修改过的后缀'}
</style>
<!--  -->
<style>
span.change:after { content: 'bar' }
</style>
<span>example</span>
<hr />
<button>change</button>
<script>
v$('button').click(function(){
    $('span').addClass('change');
});
</script>
<!--  -->
<style>
  .red::before { content: "red"; color: red; }
  .green::before { content: "green"; color: green;}
</style>
<div class="red">内容内容内容内容</div>
<script>
  $(".red").removeClass('red').addClass('green');
</script>
```

<h4 id="使用CSSStyleSheet的insertRule来为伪元素修改样式">方法2. 使用CSSStyleSheet的insertRule来为伪元素修改样式</h4>

```javascript
document.styleSheets[0].addRule('.red::before','color: green'); // 支持IE
document.styleSheets[0].insertRule('.red::before { color: green }', 0); // 支持非IE的现代浏览器
```

<h4 id="在head标签中插入style的内部样式">方法3. 在head标签中插入style的内部样式</h4>

```javascript
var style = document.createElement("style"); 
document.head.appendChild(style); 
sheet = style.sheet; 
sheet.addRule('.red::before','color: green'); // 兼容IE浏览器
sheet.insertRule('.red::before { color: green }', 0); // 支持非IE的现代浏览器
//jquery
$('<style>.red::before{color:green}</style>').appendTo('head');
```

```javascript
<div class="htmlbox_close"></div>
var str = window.getComputedStyle($('.htmlbox_close')[0], '::before').getPropertyValue('top');
    console.log(str);
document.styleSheets[0].addRule('.htmlbox_close::before', 'top:100px');
document.styleSheets[0].insertRule('.htmlbox_close::before { top:100px }', 0);
document.styleSheets[0].addRule('.htmlbox_close::after', 'top:100px');
document.styleSheets[0].insertRule('.htmlbox_close::before { top:100px }', 0);
var str = window.getComputedStyle($('.htmlbox_close')[0], '::before').getPropertyValue('top');
//firefox浏览器不支持addRule()方法，IE8-浏览器不支持insertRule()方法。兼容写法
function insertRule(sheet,ruleKey,ruleValue,index){
    　　return sheet.insertRule ? sheet.insertRule(ruleKey+ '{' + ruleValue + '}',index) : sheet.addRule(ruleKey,ruleValue,index);
} 
insertRule(document.styleSheets[0],'#box:before','content:"前缀";color: red;',0)
```

> [缺点]该方法必须有内部<style>或用<link>链接外部样式，否则若不存在样式表，则document.styleSheets为空列表，则报错

[back to top](#top)

<h3 id="修改伪元素的content的属性值">四、修改伪元素的content的属性值</h3>

<h4 id="使用CSSStyleSheet的insertRule来为伪元素修改样式">方法1. 使用CSSStyleSheet的insertRule来为伪元素修改样式</h4>

```javascript
var latestContent = "修改过的内容";
var formerContent = window.getComputedStyle($('.red'), '::before').getPropertyValue('content'); document.styleSheets[0].addRule('.red::before','content: "' + latestContent + '"'); document.styleSheets[0].insertRule('.red::before { content: "' + latestContent + '" }', 0);
```

<h4 id="使用DOM元素的data属性来更改content的值">方法2. 使用DOM元素的`data-*`属性来更改content的值</h4>

```html
<style>
.red::before {
  content: attr(data-attr);
  color: red;
}
</style>
<div class="red" data-attr="red">内容内容内容内容</div>
<script>
  $('.red').attr('data-attr', 'green');
</script>
```

如果有频繁的切换，进化版- 利用css中，伪元素的content是读取到data属性

```html
<style>
p:after{content: attr(data-content);}
p.change:after{content: attr(data-content);}
</style>
<script>
$(this).addClass('change').attr('data-content', content);
</script>
```

[back to top](#top)

<h3 id="before和after伪元素的常见用法总结">五、:before和:after伪元素的常见用法总结</h3>

<h4 id="利用content属性，为元素添加内容修饰">5.1 利用content属性，为元素添加内容修饰</h4>

```css
/* 1） 添加字符串：使用引号包括一段字符串，将会向元素内容中添加字符串。*/
a:after { content: "after content"; }
/* 2） 使用attr()方法，调用当前元素的属性的值：*/
a:after { content: attr(href); }
a:after { content: attr(data-attr); 
/* 3）使用url()方法，引用多媒体文件： */
a::before { content: url(logo.png); }
/* 4) 使用counter()方法，调用计时器：*/
h:before { counter-increment: chapter; content: "Chapter " counter(chapter) ". " }
```

<h4 id="清除浮动">5.2 清除浮动</h4>

清除浮动是一个时常会遇到的问题，不少人的解决办法是添加一个空的 div 应用 clear:both; 属性。现在，无需增加没有意义的元素，仅需要以下样式即可在元素尾部自动清除浮动：

```css
.clear-fix { *overflow: hidden; *zoom: 1; }   /**IE 兼容写法*/
.clear-fix:after { display: table; content: ""; width: 0; clear: both; }
```

<h4 id="特效妙用">5.3 特效妙用</h4>

```css
a {
  position: relative;
  display: inline-block;
  text-decoration: none;
  color: #000;
  font-size: 32px;
  padding: 5px 10px;
}
a::before, a::after { 
  content: "";
  transition: all 0.2s;
}
a::before { left: 0; }
a::after {  right: 0;}
a:hover::before, a:hover::after { position: absolute; }
a:hover::before { content: "\5B"; left: -20px; }
a:hover::after { content: "\5D"; right: -20px; }
/*HTML代码
<a href="#">我是个超链接</a>
*/
/*调用引号字符open-quote close-quote*/
.demo:before{ content: open-quote; }
.demo:after{ content: close-quote; }
/*HTML代码   <div class="demo"></div>   */
```

<h4 id="特殊形状的实现">5.4 特殊形状的实现- 对话气泡</h4>

```css
.tooltip {
  position: relative;
  display: inline-block;
  padding: 5px 10px;
  background: #80D4C8;
}
.tooltip:before {  /* 对话气泡 */
  content: "";
  display: block;
  position: absolute;
  left: 50%;
  margin-left: -5px;
  bottom: -5px;
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #80D4C8;
}
/*HTML代码
<div class="tooltip">I'm a tooltip.</div>
 */ 
```

```javascript
p:after { content: attr(data-content); }
/****新增伪元素样式,用来覆盖原有的样式**********/
p.change:after { content: attr(data-content); }
$(this).addClass('change').attr('data-content', content);
```

```html
<style>
body {font: 200%/1.45 charter;}
ref::before {
		content: '\00A7';
		letter-spacing: .1em;
	}
</style>
<article>The seller can, under Business Law <ref>1782</ref>, offer a full refund to buyers. </article>
<script>
function ruleSelector(selector) {
  function uni(selector) {
    return selector.replace(/::/g, ':')
  }
  return Array.prototype.filter.call(Array.prototype.concat.apply([], Array.prototype.map.call(document.styleSheets, function(x) {
    return Array.prototype.slice.call(x.cssRules);
  })), function(x) {
    return uni(x.selectorText) === uni(selector);
  });
}

var toggle = false, pseudo = ruleSelector("ref::before").slice(-1);

document.querySelector("article").onclick = function() {
  pseudo.forEach(function(rule) {
    if (toggle = !toggle)
      rule.style.color = "red";
    else
      rule.style.color = "black";
  });
}
</script>
```

[back to top](#top)

<h4 id="需要修改伪元素的content属性">5.5 需要修改伪元素的content属性，使用attr函数，伪元素的content属性支持这个方法</h4>

```html
<style>
　　.change:before{content: attr(data-beforeData);color: red;}
</style> 
<script>
  oBox.setAttribute('data-beforeData','前缀');
</script>
```

The whole example

```javascript
/**
* NG Responsive Tables v1.0
* Inspiration: http://css-tricks.com/examples/ResponsiveTables/responsive.php
* Author: Tomislav Matijević
* List of functions:
*	- targetTable: Searches for each table row , find td and take its current index.
*      Apply to that index same index of table head or td in first table row ( in case there are no table header applied )
*	- checkForTableHead: If there is no table head defined, use td in first table row as table head (prevention mode)
* Config:
* - Adjust paddings
* - On each td there is class named "tdno[index]", so you can modify each td if you need custom padding
*/
;(function ( $ ) {
	$.fn.ngResponsiveTables = function(options) {
		var defaults = {
		smallPaddingCharNo: 5,
		mediumPaddingCharNo: 10,
		largePaddingCharNo: 15
		},
		$selElement = this,
		ngResponsiveTables = {
			opt: '',
			dataContent: '',
			globalWidth: 0,
		init: function(){
			this.opt = $.extend( defaults, options );
			ngResponsiveTables.targetTable();
		},
		targetTable: function(){
			var that = this;
			$selElement.find('tr').each(function(){
				$(this).find('td').each(function(i, v){
					that.checkForTableHead( $(this), i );
					$(this).addClass('tdno' + i);
				});
			});
		},
		checkForTableHead: function(element, index){
			if( $selElement.find('th').length ){
				this.dataContent = $selElement.find('th')[index].textContent;
			}else{
				this.dataContent = $selElement.find('tr:first td')[index].textContent;
			}
			// This padding is for large texts inside header of table
			// Use small, medium and large paddingMax values from defaults to set-up offsets for each class
			if( this.opt.smallPaddingCharNo > $.trim(this.dataContent).length ){
				element.addClass('small-padding');
			}else if( this.opt.mediumPaddingCharNo > $.trim(this.dataContent).length ){
				element.addClass('medium-padding');
			}else{
				element.addClass('large-padding');
			}
			element.attr('data-content', this.dataContent);
		}
	};
	$(function(){
		ngResponsiveTables.init();
	});
		return this;
	};
}( jQuery ));
```

[back to top](#top)

<h4 id="调用计数器">5.6 调用计数器</h4>

- counter-increment属性递增一个或多个计数器值。 
- counter-increment属性通常用于counter-reset属性和content属性。 
- counter相当于一个变量，根据css规则的增加一跟踪使用次数； 
- counter-reset重置计数器默认值； 
- counter-increment增加计数器； 
- counter()和counters()获取计数；用于增加计数值，默认的步长值是”1″，同样我们可以改变它，如counter-increment:photocount 2;定义步长为2

如对部分和子部分进行编号:  

```html
<style>
body {counter-reset:section;}
h1 {counter-reset:subsection;}
h1:before{ 
    counter-increment:section;
    content:"Section " counter(section) ". ";
}
h2:before {
    counter-increment:subsection;
    content:counter(section) "." counter(subsection) " ";
}
</style>
<body>
<p><b>Note:</b> IE8 supports these properties only if a !DOCTYPE is specified.</p>
<h1>HTML tutorials</h1>
<h2>HTML Tutorial</h2>
<h2>XHTML Tutorial</h2>
<h2>CSS Tutorial</h2>
<h1>Scripting tutorials</h1>
<h2>JavaScript</h2>
<h2>VBScript</h2>
```

<h3 id="自定义功能">六、自定义功能</h3>

```html
<!DOCTYPE html>
<title>CSS</title>
<style>
    body {
        font: 200%/1.45 charter;
    }
    ref::before {
        content: '\00A7';
        letter-spacing: .1em;
    }
</style>
<article>The seller can, under Business Law <ref>1782</ref>, offer a full refund to buyers. </article>
<script>
    function ruleSelector(selector) {
        function uni(selector) {
            return selector.replace(/::/g, ':')
        }
        return Array.prototype.filter.call(Array.prototype.concat.apply([], Array.prototype.map.call(document.styleSheets, function(x) {
            return Array.prototype.slice.call(x.cssRules);
        })), function(x) {
            return uni(x.selectorText) === uni(selector);
        });
    }
    var toggle = false, pseudo = ruleSelector("ref::before").slice(-1);
    document.querySelector("article").onclick = function() {
        pseudo.forEach(function(rule) {
            if (toggle = !toggle)
                rule.style.color = "red";
            else
                rule.style.color = "black";
        });
    }
</script>
```

> Reference

- [JS控制伪元素的方法汇总](http://www.jb51.net/article/81984.htm)
- [如何用js控制css伪类after](https://segmentfault.com/q/1010000002452755)
- [js设置before和after伪元素效果的方法总结](http://www.111cn.net/wy/js-ajax/98445.htm)
- https://stackoverflow.com/questions/9798210/is-there-any-way-to-reset-after-before-css-rules-for-an-element
- http://jsfiddle.net/1dw7h4s3/
