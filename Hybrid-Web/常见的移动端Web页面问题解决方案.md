[常见的移动端Web页面问题解决方案](#top)

- [1、安卓浏览器看背景图片，有些设备会模糊](#安卓浏览器看背景图片)
- [2、图片加载很慢](#图片加载很慢)
- [3、禁止复制、选中文本](#禁止复制)
- [4、长时间按住页面出现闪退](#长时间按住页面出现闪退)
- [5、iphone及ipad下输入框默认内阴影](#iphone及ipad下输入框默认内阴影)
- [6、ios和android下触摸元素时出现半透明灰色遮罩](#ios和android下触摸元素时出现半透明灰色遮罩)
- [7、active兼容处理, 即伪类 :active 失效](#active兼容处理)
- [8、动画定义3D启用硬件加速](#动画定义3D启用硬件加速)
- [9、Retina屏的1px边框](#Retina屏的1px边框)
- [10、webkit mask 兼容处理](#兼容处理)
- [11、旋转屏幕时，字体大小调整的问题](#旋转屏幕时)
- [12、transition闪屏](#transition闪屏)
- [13、圆角bug:  某些Android手机圆角失效](#某些Android手机圆角失效)
- [14、IOS中input键盘事件keyup、keydown、keypress支持不是很好](#顶部状态栏背景色)
- [15、h5网站input设置为type=number的问题](#h5网站input设置为type=number的问题)
- [16、ios设置input按钮样式会被默认样式覆盖](#ios设置input按钮样式会被默认样式覆盖)
- [17、IOS键盘字母输入，默认首字母大写](#IOS键盘字母输入)
- [18、select 下拉选择设置右对齐](#下拉选择设置右对齐)
- [19、通过transform进行skew变形，rotate旋转会造成出现锯齿现象](#通过transform进行skew变形)
- [20、移动端点击300ms延迟](#移动端点击300ms延迟)
- [21、消除 IE10 里面的那个叉号](#里面的那个叉号)
- [22、关于 iOS 与 OS X 端字体的优化(横竖屏会出现字体加粗不一致等)](#端字体的优化)
- [23、关于 iOS 系统中，中文输入法输入英文时，字母之间可能会出现一个六分之一空格](#六分之一空格)
- [24、移动端HTML5 audio autoplay失效问题](#autoplay失效问题)
- [25、移动端HTML5 input date不支持placeholder问题](#移动端HTML5)
- [26、部分机型存在type为search的input，自带close按钮样式修改方法](#部分机型)
- [27、唤起select的option展开](#唤起select的option展开)

<h2 id="安卓浏览器看背景图片">1、安卓浏览器看背景图片，有些设备会模糊</h2>
 
用同等比例的图片在PC机上很清楚，但是手机上很模糊，原因是什么呢？

经过研究，是devicePixelRatio作怪，因为手机分辨率太小，如果按照分辨率来显示网页，这样字会非常小，所以苹果当初就把iPhone 4的960640分辨率，在网页里只显示了480320，这样devicePixelRatio＝2。现在android比较乱，有1.5的，有2的也有3的。

想让图片在手机里显示更为清晰，必须使用2x的背景图来代替img标签（一般情况都是用2倍）。例如一个div的宽高是100100，背景图必须得200200，然后background-size:contain;，这样显示出来的图片就比较清晰了。

```css
img{
  background: url('../images/icon/all.png') no-repeat center center;
  -webkit-background-size:50px 50px;
  background-size: 50px 50px;
  display:inline-block; 
  width:100%;
   height:50px;
}
/*或者*/
img{ background-size:contain; }
```

[back to top](#top)

<h2 id="图片加载很慢">2、图片加载很慢</h2>

若遇到图片加载很慢的问题，对这种情况，手机开发一般用canvas方法加载：

具体的canvas API 参见：http://javascript.ruanyifeng.com/htmlapi/canvas.html

下面举例说明一个canvas的例子：

```javascript
<li><canvas></canvas></li>
//js动态加载图片和li 总共举例17张图片！
var total=17;
var zWin=$(window);
var render=function(){
  var padding=2;
  var winWidth=zWin.width();
  var picWidth=Math.floor((winWidth-padding*3)/4);
  var tmpl ='';
  for (var i=1;i<=totla;i++){
  var p=padding;
  var imgSrc='img/'+i+'.jpg';
  if(i%4==1){
   p=0;
  }
  tmpl +='<li style="width:'+picWidth+'px;height:'+picWidth+'px;padding-left:'+p+'px;padding-top:'+padding+'px;"><canvas id="cvs_'+i+'"></canvas></li>';
  var imageObj = new Image();
  imageObj.index = i;
  imageObj.onload = function(){
    var cvs =$('#cvs_'+this.index)[0].getContext('2d');
    cvs.width = this.width;
    cvs.height=this.height;
    cvs.drawImage(this,0,0);
  }
  imageObj.src=imgSrc;
  }
}
render();
```

[back to top](#top)

<h2 id="禁止复制">3、禁止复制、选中文本</h2>

```css
Element {
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
   user-select: none;
}
```

<h2 id="长时间按住页面出现闪退">4、长时间按住页面出现闪退</h2>

`element { -webkit-touch-callout: none; }`

<h2 id="iphone及ipad下输入框默认内阴影">5、iphone及ipad下输入框默认内阴影</h2>

`Element{ -webkit-appearance: none; }`

<h2 id="ios和android下触摸元素时出现半透明灰色遮罩">6、ios和android下触摸元素时出现半透明灰色遮罩</h2>

`Element { -webkit-tap-highlight-color:rgba(255,255,255,0) }`

[back to top](#top)

<h2 id="active兼容处理">7、active兼容处理, 即伪类 :active 失效</h2>

**方法一**：body添加ontouchstart

`<body ontouchstart="">`

**方法二**：js给 document 绑定 touchstart 或 touchend 事件

```html
<style>
a { color: #000; }
a:active { color: #fff; }
</style>
<a herf=foo >bar</a>
<script>
 document.addEventListener('touchstart',function(){},false);
</script>
```

[back to top](#top)

<h2 id="动画定义3D启用硬件加速">8、动画定义3D启用硬件加速</h2>

```css
Element {
  -webkit-transform:translate3d(0, 0, 0)
  transform: translate3d(0, 0, 0);
}
```

<h2 id="Retina屏的1px边框">9、Retina屏的1px边框</h2>

具体请百度谷歌关键字，解决方案有很多

<h2 id="兼容处理">10、webkit mask 兼容处理</h2>

某些低端手机不支持css3 mask，可以选择性的降级处理。比如可以使用js判断来引用不同class：

```javascript
if( 'WebkitMask' in document.documentElement.style){
  alert('支持mask');
} else {
  alert('不支持mask');
}
```

<h2 id="旋转屏幕时">11、旋转屏幕时，字体大小调整的问题</h2>

```css
html, body, form, fieldset, p, div, h1, h2, h3, h4, h5, h6 {
  -webkit-text-size-adjust:100%;
}
```

<h2 id="transition闪屏">12、transition闪屏</h2>

```
/* 设置内嵌的元素在 3D 空间如何呈现：保留3D */
-webkit-transform-style: preserve-3d;
/* 设置进行转换的元素的背面在面对用户时是否可见：隐藏 */
-webkit-backface-visibility:hidden;
```

[back to top](#top)

<h2 id="某些Android手机圆角失效">13、圆角bug:  某些Android手机圆角失效</h2>

`background-clip: padding-box;`

<h2 id="顶部状态栏背景色">14、IOS中input键盘事件keyup、keydown、keypress支持不是很好</h2>

用input监听键盘keyup事件，在安卓手机浏览器中是可以的，但是在ios手机浏览器中变红很慢，用输入法输入之后，并未立刻相应keyup事件，只有在通过删除之后才能相应！

解决办法： 可以用html5的oninput事件去代替keyup

```html
<input type="text" id="testInput">
<script type="text/javascript">
  document.getElementById('testInput').addEventListener('input', function(e){
    var value = e.target.value;
  });
</script>
```

然后就达到类似keyup的效果！

[back to top](#top)

<h2 id="h5网站input设置为type=number的问题">15、h5网站input设置为type=number的问题</h2>

h5网页input的type设置为number一般会产生三个问题，一个问题是maxlength属性不好用了。另外一个是form提交的时候，默认给取整了。三是部分安卓手机出现样式问题。

问题一解决，我目前用的是js。如下

```javascript
<input type="number" oninput="checkTextLength(this ,10)"> 
function checkTextLength(obj, length) { 
      if(obj.value.length > length)  {    
        obj.value = obj.value.substr(0, length); 
      } 
}
```

问题二，是因为form提交默认做了表单验证，step默认是1,要设置step属性，假如保留2位小数，写法如下：

`<input type="number" step="0.01" />`

关于step，我在这里做简单的介绍，input 中type=number，一般会自动生成一个上下箭头，点击上箭头默认增加一个step，点击下箭头默认会减少一个step。number中默认step是1。也就是step=0.01,可以允许输入2位小数，并且点击上下箭头分别增加0.01和减少0.01。

假如step和min一起使用，那么数值必须在min和max之间。

`<input type="number" step="3.1" min="1" />`

首先，最小值是1，那么可以输入1.0，第二个是可以输入（1+3.1）那就是4.1,以此类推，每次点击上下箭头都会增加或者减少3.1，输入其他数字无效。这就是step的简单介绍。

问题三，去除input默认样式

```css
input[type=number] {
  -moz-appearance:textfield;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
```

[back to top](#top)

<h2 id="ios设置input 按钮样式会被默认样式覆盖">16、ios设置input 按钮样式会被默认样式覆盖</h2>

```css
input, textarea {
  border: 0;
  -webkit-appearance: none; 
}
```

[back to top](#top)

<h2 id="IOS键盘字母输入">17、IOS键盘字母输入，默认首字母大写</h2>

`<input type="text" autocapitalize="off" />`

<h2 id="下拉选择设置右对齐">18、select 下拉选择设置右对齐</h2>

`select option { direction: rtl; }`

<h2 id="通过transform进行skew变形">19、通过transform进行skew变形，rotate旋转会造成出现锯齿现象</h2>

```
-webkit-transform: rotate(-4deg) skew(10deg) translateZ(0);
 transform: rotate(-4deg) skew(10deg) translateZ(0);
 outline: 1px solid rgba(255,255,255,0)
 ```

[back to top](#top)

<h2 id="移动端点击300ms延迟">20、移动端点击300ms延迟</h2>

300ms尚可接受，不过因为300ms产生的问题，我们必须要解决。300ms导致用户体验并不是很好，解决这个问题，我们一般在移动端用tap事件来取代click事件。

推荐两个js，一个是fastclick，一个是tap.js

关于300ms延迟，具体请看：http://thx.github.io/mobile/300ms-click-delay/

<h2 id="移动端点透问题">21、移动端点透问题</h2>

```html
<div id="haorooms">点头事件测试</div>
<a href="#">www.xxx.com</a>
```

div是绝对定位的蒙层,并且z-index高于a。而a标签是页面中的一个链接，我们给div绑定tap事件：

```javascript
$('#haorooms').on('tap',function(){
  $('#haorooms').hide();
});
```

我们点击蒙层时 div正常消失，但是当我们在a标签上点击蒙层时，发现a链接被触发，这就是所谓的点透事件。

原因： touchstart 早于 touchend 早于click。 亦即click的触发是有延迟的，这个时间大概在300ms左右，也就是说我们tap触发之后蒙层隐藏， 此时 click还没有触发，300ms之后由于蒙层隐藏，我们的click触发到了下面的a链接上。

解决：

1. 尽量都使用touch事件来替换click事件。例如用touchend事件(推荐)。
2. 用fastclick，https://github.com/ftlabs/fastclick
3. 用preventDefault阻止a标签的click
4. 延迟一定的时间(300ms+)来处理事件 （不推荐）
5. 以上一般都能解决，实在不行就换成click事件。

```javascript
$("#haorooms").on("touchend", function (event) {
   event.preventDefault();
});
```

[back to top](#top)

<h2 id="里面的那个叉号">21、消除 IE10 里面的那个叉号</h2>

`input:-ms-clear{display:none;}`

<h2 id="端字体的优化">22、关于 iOS 与 OS X 端字体的优化(横竖屏会出现字体加粗不一致等)</h2>

iOS 浏览器横屏时会重置字体大小，设置 text-size-adjust 为 none 可以解决 iOS 上的问题，但桌面版 Safari 的字体缩放功能会失效，因此最佳方案是将 text-size-adjust 为 100% 。

```
-webkit-text-size-adjust: 100%;
-ms-text-size-adjust: 100%;
text-size-adjust: 100%;
```

<h2 id="六分之一空格">23、关于 iOS 系统中，中文输入法输入英文时，字母之间可能会出现一个六分之一空格</h2>

可以通过正则去掉

`this.value = this.value.replace(/\u2006/g, '');`

<h2 id="autoplay失效问题">24、移动端HTML5 audio autoplay失效问题</h2>

这个不是 BUG，由于自动播放网页中的音频或视频，会给用户带来一些困扰或者不必要的流量消耗，所以苹果系统和安卓系统通常都会禁止自动播放和使用 JS 的触发播放，必须由用户来触发才可以播放。

解决方法思路：先通过用户 touchstart 触碰，触发播放并暂停（音频开始加载，后面用 JS 再操作就没问题了）。

解决代码：

```javascript
document.addEventListener('touchstart', function () {
  document.getElementsByTagName('audio')[0].play();
  document.getElementsByTagName('audio')[0].pause();
});
```

[back to top](#top)

<h2 id="移动端HTML5">25、移动端HTML5 input date不支持placeholder问题</h2>

这个我感觉没有什么好的解决方案，用如下方法

`<input placeholder="Date" class="textbox-n" type="text" onfocus="(this.type='date')"  id="date">`

有的浏览器可能要点击两遍！

<h2 id="部分机型">26、部分机型存在type为search的input，自带close按钮样式修改方法</h2>

有些机型的搜索input控件会自带close按钮（一个伪元素），而通常为了兼容所有浏览器，我们会自己实现一个，此时去掉原生close按钮的方法为

```css
#Search::-webkit-search-cancel-button{
  display: none; 
}
```

如果想使用原生close按钮，又想使其符合设计风格，可以对这个伪元素的样式进行修改。

<h2 id="唤起select的option展开">27、唤起select的option展开</h2>

```javascript
//zepto方式:
$(sltElement).trrgger("mousedown");
//原生js方式:
function showDropdown(sltElement) {
  var event;
  event = document.createEvent('MouseEvents');
  event.initMouseEvent('mousedown', true, true, window);
  sltElement.dispatchEvent(event);
};
```

[back to top](#top)

- [40条常见的移动端Web页面问题解决方案](http://blog.csdn.net/ly_rq/article/details/72896124)
