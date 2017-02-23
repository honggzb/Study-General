- meta基础知识
  - H5页面窗口自动调整到设备宽度，并禁止用户缩放页面
  - 忽略将页面中的数字识别为电话号码
  - 忽略Android平台中对邮箱地址的识别
  - 当网站添加到主屏幕快速启动方式，可隐藏地址栏，仅针对ios的safari (new)
  - 将网站添加到主屏幕快速启动方式，仅针对ios的safari顶端状态条的样式
- viewport模板 (new)
- 常见问题
  - 移动端如何定义字体font-family
  - 移动端字体单位font-size选择px还是rem (new)
  - 移动端touch事件(区分webkit 和 winphone) (new)
  - 移动端click屏幕产生200-300 ms的延迟响应
  - 触摸事件的响应顺序
  - 什么是Retina 显示屏，带来了什么问题
  - ios系统中元素被触摸时产生的半透明灰色遮罩怎么去掉
  - 部分android系统中元素被点击时产生的边框怎么去掉
  - winphone系统a、input标签被点击时产生的半透明灰色背景怎么去掉
  - webkit表单元素的默认外观怎么重置 (new)
  - webkit表单输入框placeholder的颜色值能改变么
  - webkit表单输入框placeholder的文字能换行么
  - IE10（winphone8）表单元素默认外观如何重置
  - 禁止ios 长按时不触发系统的菜单，禁止ios&android长按时下载图片
  - 禁止ios和android用户选中文字
  - 打电话发短信写邮件怎么实现
  - 模拟按钮hover效果
  - 屏幕旋转的事件和样式
  - audio元素和video元素在ios和andriod中无法自动播放
  - 摇一摇功能  (new)
  - 手机拍照和上传图片
  - 微信浏览器用户调整字体大小后页面矬了，怎么阻止用户调整
  - 消除transition闪屏
  - 开启硬件加速
  - 取消input在ios下，输入的时候英文首字母的默认大写
  - android上去掉语音输入按钮
  - android 2.3 bug
  - android 4.x bug
  - 设计高性能CSS3动画的几个要素
  - fixed bug
  - 如何阻止windows Phone的默认触摸事件
  - 播放视频不全屏
  - FastClick:消除在移动浏览器上触发click事件与一个物理Tap(敲击)之间的300延迟
  - 微信浏览器、UC浏览器成功禁用触摸时的弹出层失败
  - 模拟按钮hover效果的两种实现方式，第一种在微信没反应，第二种页面引用了zepto.js,写了方法但是和默认的滑动有冲突，不能流畅的滑动了
  - ios虚拟键盘“go”按钮的实现
- 常用的移动端框架
  - zepto.js
  - iscroll.js
  - underscore.js
  - 滑屏框架
  - Sea.js
- flex布局

## meta基础知识

<h5>1. H5页面窗口自动调整到设备宽度，并禁止用户缩放页面</h5>

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
```

<h5>2. 忽略将页面中的数字识别为电话号码</h5>

`<meta name="format-detection" content="telephone=no" />`

<h5>3. 忽略Android平台中对邮箱地址的识别</h5>

`<meta name="format-detection" content="email=no" />`

当网站添加到主屏幕快速启动方式，可隐藏地址栏，仅针对ios的safari

```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<!-- ios7.0版本以后，safari上已看不到效果 -->
```

体验demo，解决在主屏幕打开页面后，点击页面链接不会跳转到系统自带的Safari

<h5>4. 将网站添加到主屏幕快速启动方式，仅针对ios的safari顶端状态条的样式</h5>

```html
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<!-- 可选default、black、black-translucent -->
```

## viewport模板

<h5>1. viewport模板——通用</h5>

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
<title>标题</title>
<link rel="stylesheet" href="index.css">
</head>
<body>
这里开始内容
</body>
</html>
```

<h5>2. viewport模板 - target-densitydpi=device-dpi，android 2.3.5以下版本不支持</h5>

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=750, user-scalable=no, target-densitydpi=device-dpi"><!-- width取值与页面定义的宽度一致 -->
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
<title>标题</title>
<link rel="stylesheet" href="index.css">
</head>
<body>
这里开始内容
</body>
</html>
```

> 参考案例：http://action.weixin.qq.com/payact/readtemplate?t=mobile/2015/wxzfsht/index_tmpl

## 常见问题

<h5>1. 移动端如何定义字体font-family</h5>

中文字体使用系统默认即可，英文用Helvetica

`body{font-family:Helvetica;}  /* 移动端定义字体的代码 */`

> 参考[《移动端使用字体的思考》](http://www.cnblogs.com/PeunZhang/p/3592096.html)

<h5>2. 移动端字体单位font-size选择px还是rem</h5>

- 对于只需要适配少部分手机设备，且分辨率对页面影响不大的，使用px即可
- 对于需要适配各种移动设备，使用rem，例如只需要适配iPhone和iPad等分辨率差别比较挺大的设备
- rem配置参考，适合视觉稿宽度为640px的：

```html
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
html{font-size:10px}
@media screen and (min-width:321px) and (max-width:375px){html{font-size:11px}}
@media screen and (min-width:376px) and (max-width:414px){html{font-size:12px}}
@media screen and (min-width:415px) and (max-width:639px){html{font-size:15px}}
@media screen and (min-width:640px) and (max-width:719px){html{font-size:20px}}
@media screen and (min-width:720px) and (max-width:749px){html{font-size:22.5px}}
@media screen and (min-width:750px) and (max-width:799px){html{font-size:23.5px}}
@media screen and (min-width:800px){html{font-size:25px}}
```

> 体验demo：http://1.peunzhang.sinaapp.com/demo/rem/index.html

<h5>3. 移动端touch事件(区分webkit 和 winphone)</h5>

当用户手指放在移动设备在屏幕上滑动会触发的touch事件

**以下支持webkit**

- touchstart——当手指触碰屏幕时候发生。不管当前有多少只手指
- touchmove——当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用event的preventDefault()可以阻止默认情况的发生：阻止页面滚动
- touchend——当手指离开屏幕时触发
- touchcancel——系统停止跟踪触摸时候会触发。例如在触摸过程中突然页面alert()一个提示框，此时会触发该事件，这个事件比较少用

**TouchEvent**

- touches：屏幕上所有手指的信息
- targetTouches：手指在目标区域的手指信息
- changedTouches：最近一次触发该事件的手指信息
- touchend时，touches与targetTouches信息会被删除，changedTouches保存的最后一次的信息，最好用于计算手指信息
参数信息(changedTouches[0])
- clientX、clientY在显示区的坐标
- target：当前元素

> 参考：https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent

**以下支持winphone 8**

- MSPointerDown——当手指触碰屏幕时候发生。不管当前有多少只手指
- MSPointerMove——当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用css的html{-ms-touch-action: none;}可以阻止默认情况的发生：阻止页面滚动
- MSPointerUp——当手指离开屏幕时触发

<h5>4. 移动端click屏幕产生200-300 ms的延迟响应</h5>

移动设备上的web网页是有300ms延迟的，玩玩会造成按钮点击延迟甚至是点击失效。

以下是历史原因，来源一个公司内一个同事的分享：

2007年苹果发布首款iphone上IOS系统搭载的safari为了将适用于PC端上大屏幕的网页能比较好的展示在手机端上，使用了双击缩放(double tap to zoom)的方案，比如你在手机上用浏览器打开一个PC上的网页，你可能在看到页面内容虽然可以撑满整个屏幕，但是字体、图片都很小看不清，此时可以快速双击屏幕上的某一部分，你就能看清该部分放大后的内容，再次双击后能回到原始状态。

双击缩放是指用手指在屏幕上快速点击两次，iOS 自带的 Safari 浏览器会将网页缩放至原始比例。

原因就出在浏览器需要如何判断快速点击上，当用户在屏幕上单击某一个元素时候，例如跳转链接<a href="#"></a>，此处浏览器会先捕获该次单击，但浏览器不能决定用户是单纯要点击链接还是要双击该部分区域进行缩放操作，所以，捕获第一次单击后，浏览器会先Hold一段时间t，如果在t时间区间里用户未进行下一次点击，则浏览器会做单击跳转链接的处理，如果t时间里用户进行了第二次单击操作，则浏览器会禁止跳转，转而进行对该部分区域页面的缩放操作。那么这个时间区间t有多少呢？在IOS safari下，大概为300毫秒。这就是延迟的由来。造成的后果用户纯粹单击页面，页面需要过一段时间才响应，给用户慢体验感觉，对于web开发者来说是，页面js捕获click事件的回调函数处理，需要300ms后才生效，也就间接导致影响其他业务逻辑的处理。

解决方案：

- fastclick可以解决在手机上点击事件的300ms延迟
- zepto的touch模块，tap事件也是为了解决在click的延迟问题

触摸事件的响应顺序

    1、ontouchstart 
    2、ontouchmove 
    3、ontouchend 
    4、onclick

解决300ms延迟的问题，也可以通过绑定ontouchstart事件，加快对事件的响应

<h5>5. 什么是Retina 显示屏，带来了什么问题</h5>

**retina**：一种具备超高像素密度的液晶屏，同样大小的屏幕上显示的像素点由1个变为多个，如在同样带下的屏幕上，苹果设备的retina显示屏中，像素点1个变为4个, 在高清显示屏中的位图被放大，图片会变得模糊，因此移动端的视觉稿通常会设计为传统PC的2倍, 那么，前端的应对方案是：

设计稿切出来的图片长宽保证为偶数，并使用backgroud-size把图片缩小为原来的1/2

```css
//例如图片宽高为：200px*200px，那么写法如下
.css{width:100px;height:100px;background-size:100px 100px;}
```

其它元素的取值为原来的1/2，例如视觉稿40px的字体，使用样式的写法为20px

`.css{font-size:20px}`

> 参考[《高清显示屏原理及设计方案》](http://www.cnblogs.com/PeunZhang/p/3441110.html)

<h5>6. ios系统中元素被触摸时产生的半透明灰色遮罩怎么去掉</h5>

ios用户点击一个链接，会出现一个半透明灰色遮罩, 如果想要禁用，可设置`-webkit-tap-highlight-color`的`alpha`值为`0`，也就是属性值的最后一位设置为0就可以去除半透明灰色遮罩

`a,button,input,textarea{-webkit-tap-highlight-color: rgba(0,0,0,0;)}`

<h5>7. 部分android系统中元素被点击时产生的边框怎么去掉</h5>

android用户点击一个链接，会出现一个边框或者半透明灰色遮罩, 不同生产商定义出来额效果不一样，可设置`-webkit-tap-highlight-color`的`alpha`值为`0`去除部分机器自带的效果

```css
a,button,input,textarea{
-webkit-tap-highlight-color: rgba(0,0,0,0;)
-webkit-user-modify:read-write-plaintext-only; 
}
```

    -webkit-user-modify有个副作用，就是输入法不再能够输入多个字符
    另外，有些机型去除不了，如小米2
    对于按钮类还有个办法，不使用a或者input标签，直接用div标签

> 参考[《如何去除android上a标签产生的边框》](http://www.cnblogs.com/PeunZhang/archive/2013/02/28/2907708.html)

<h5>8. winphone系统a、input标签被点击时产生的半透明灰色背景怎么去掉</h5>

`<meta name="msapplication-tap-highlight" content="no">`

<h5>9. webkit表单元素的默认外观怎么重置</h5>

**通用**

`.css{-webkit-appearance:none;}`

**伪元素改变number类型input框的默认样式**

```css
input[type=number]::-webkit-textfield-decoration-container {
   background-color: transparent;    
}
input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
}
```

<h5>10. webkit表单输入框placeholder的颜色值能改变么</h5>

```css
input::-webkit-input-placeholder{color:#AAAAAA;}
input:focus::-webkit-input-placeholder{color:#EEEEEE;}
```

<h5>11. webkit表单输入框placeholder的文字能换行么</h5>

    ios可以，android不行~
    在textarea标签下都可以换行~
    
<h5>12. IE10（winphone8）表单元素默认外观如何重置</h5>

**禁用 select 默认下拉箭头**

::-ms-expand 适用于表单选择控件下拉箭头的修改，有多个属性值，设置它隐藏 (display:none) 并使用背景图片来修饰可得到我们想要的效果

`select::-ms-expand {display: none;}`

**禁用 radio 和 checkbox 默认样式**

::-ms-check 适用于表单复选框或单选按钮默认图标的修改，同样有多个属性值，设置它隐藏 (display:none) 并使用背景图片来修饰可得到我们想要的效果。

```css
input[type=radio]::-ms-check,input[type=checkbox]::-ms-check{
display: none;
}
```

**禁用PC端表单输入框默认清除按钮**

当表单文本输入框输入内容后会显示文本清除按钮，::-ms-clear 适用于该清除按钮的修改，同样设置使它隐藏 (display:none) 并使用背景图片来修饰可得到我们想要的效果。

```css
input[type=text]::-ms-clear,input[type=tel]::-ms-clear,input[type=number]::-ms-clear{
display: none;
}
```

**禁止ios 长按时不触发系统的菜单，禁止ios&android长按时下载图片**

`.css{-webkit-touch-callout: none}`

**禁止ios和android用户选中文字**

`.css{-webkit-user-select:none}`

> 参考[《如何改变表单元素的外观(for Webkit and IE10)》](http://www.cnblogs.com/PeunZhang/p/3522603.html)

<h5>13. 打电话发短信写邮件怎么实现</h5>

```html
<!--打电话-->
<a href="tel:0755-10086">打电话给:0755-10086</a>
<!--发短信，winphone系统无效-->
<a href="sms:10086">发短信给: 10086</a>
<a href="mailto:peun@foxmail.com">peun@foxmail.com</a>
```

> 写邮件，可参考[《移动web页面给用户发送邮件的方法》](http://www.cnblogs.com/PeunZhang/p/4952783.html)

<h5>14. 模拟按钮hover效果</h5>
 
移动端触摸按钮的效果，可明示用户有些事情正要发生，是一个比较好体验，但是移动设备中并没有鼠标指针，使用css的hover并不能满足我们的需求，还好国外有个激活css的active效果，代码如下，

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
<style type="text/css">
a{-webkit-tap-highlight-color: rgba(0,0,0,0);}
.btn-blue{display:block;height:42px;line-height:42px;text-align:center;border-radius:4px;font-size:18px;color:#FFFFFF;background-color: #4185F3;}
.btn-blue:active{background-color: #357AE8;}
</style>
</head>
<body>
<div class="btn-blue">按钮</div>
<script type="text/javascript">
  document.addEventListener("touchstart", function(){}, true)
</script>
</body>
</html>
```

兼容性ios5+、部分android 4+、winphone 8, 要做到全兼容的办法，可通过绑定ontouchstart和ontouchend来控制按钮的类名

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
<style type="text/css">
a{-webkit-tap-highlight-color: rgba(0,0,0,0);}
.btn-blue{display:block;height:42px;line-height:42px;text-align:center;border-radius:4px;font-size:18px;color:#FFFFFF;background-color: #4185F3;}
.btn-blue-on{background-color: #357AE8;}
</style>
</head>
<body>
<div class="btn-blue">按钮</div>
<script type="text/javascript">
  var btnBlue = document.querySelector(".btn-blue");
  btnBlue.ontouchstart = function(){
     this.className = "btn-blue btn-blue-on"
  }
  btnBlue.ontouchend = function(){
     this.className = "btn-blue"
  }
</script>
</body>
</html>
```

<h5>15. 屏幕旋转的事件和样式</h5>

**事件**:  window.orientation，取值：正负90表示横屏模式、0和180表现为竖屏模式；

```javascript
window.onorientationchange = function(){
   switch(window.orientation){
       case -90:
       case 90:
       alert("横屏:" + window.orientation);
       case 0:
       case 180:
       alert("竖屏:" + window.orientation);
       break;
   }
}
```

**样式**

```css
//竖屏时使用的样式
@media all and (orientation:portrait) {
.css{}
}
//横屏时使用的样式
@media all and (orientation:landscape) {
.css{}
}
```

<h5>16. audio元素和video元素在ios和andriod中无法自动播放</h5>

```javascript
//应对方案：触屏即播
$('html').one('touchstart',function(){
   audio.play()
})
```

> 可参考[《无法自动播放的audio元素》](http://www.cnblogs.com/PeunZhang/archive/2013/02/05/2893093.html)

<h5>17. 摇一摇功能</h5>

HTML5 deviceMotion：封装了运动传感器数据的事件，可以获取手机运动状态下的运动加速度等数据。

<h5>18. 手机拍照和上传图片</h5>

<input type="file">的accept 属性
<!-- 选择照片 -->
<input type=file accept="image/*">
<!-- 选择视频 -->
<input type=file accept="video/*">
使用总结：
•	ios 有拍照、录像、选取本地图片功能
•	部分android只有选取本地图片功能
•	winphone不支持
•	input控件默认外观丑陋

<h5>19. 微信浏览器用户调整字体大小后页面矬了，怎么阻止用户调整</h5>

**原因**

    •	android侧是复写了layoutinflater 对textview做了统一处理
    •	ios侧是修改了body.style.webkitTextSizeAdjust值
    解决方案：
    •	android使用以下代码，该接口只在微信浏览器下有效(感谢jationhuang同学提供)

```javascript
/**
* 页面加入这段代码可使Android机器页面不再受到用户字体缩放强制改变大小
* 但是会有一个1秒左右的延迟，期间可以考虑通过loading展示
* 仅供参考
*/
(function(){
   if (typeof(WeixinJSBridge) == "undefined") {
       document.addEventListener("WeixinJSBridgeReady", function (e) {
           setTimeout(function(){
               WeixinJSBridge.invoke('setFontSizeCallback',{"fontSize":0}, function(res) {
                   alert(JSON.stringify(res));
               });
           },0);
       });
   } else {
       setTimeout(function(){
           WeixinJSBridge.invoke('setFontSizeCallback',{"fontSize":0}, function(res) {
               alert(JSON.stringify(res));
           });
       },0);
   }
})();
```

•	ios使用-webkit-text-size-adjust禁止调整字体大小

`body{-webkit-text-size-adjust: 100%!important;}`

最好的解决方案：	`整个页面用rem或者百分比布局`

<h5>20. 消除transition闪屏</h5>

网络都是这么写的，但我并没有测试出来

```css
.css{
/*设置内嵌的元素在 3D 空间如何呈现：保留 3D*/
-webkit-transform-style: preserve-3d;
/*（设置进行转换的元素的背面在面对用户时是否可见：隐藏）*/
-webkit-backface-visibility: hidden;
}
```

**开启硬件加速**

    •	解决页面闪白
    •	保证动画流畅

```css
.css {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
```

> 参考[《用CSS开启硬件加速来提高网站性能》](http://www.cnblogs.com/PeunZhang/p/3510083.html)

<h5>21. 取消input在ios下，输入的时候英文首字母的默认大写</h5>

  <input autocapitalize="off" autocorrect="off" />

<h5>22. android 上去掉语音输入按钮</h5>

`input::-webkit-input-speech-button {display: none}`

<h5>23. android 2.3 bug</h5>

    •	@-webkit-keyframes 需要以0%开始100%结束，0%的百分号不能去掉
    •	after和before伪类无法使用动画animation
    •	border-radius不支持%单位
    •	translate百分比的写法和scale在一起会导致失效，例如-webkit-transform: translate(-50%,-50%) scale(-0.5, 1)

<h5>24. android 4.x bug</h5>

    •	三星 Galaxy S4中自带浏览器不支持border-radius缩写
    •	同时设置border-radius和背景色的时候，背景色会溢出到圆角以外部分
    •	部分手机(如三星)，a链接支持鼠标:visited事件，也就是说链接访问后文字变为紫色
    •	android无法同时播放多音频audio

> 参考[《border-radius 移动之伤》](https://github.com/yisibl/blog/issues/2)

<h5>25. 设计高性能CSS3动画的几个要素</h5>

    •	尽可能地使用合成属性transform和opacity来设计CSS3动画，不使用position的left和top来定位
    •	利用translate3D开启GPU加速

参考《High Performance Animations》

<h5>26. fixed bug</h5>

    •	ios下fixed元素容易定位出错，软键盘弹出时，影响fixed元素定位
    •	android下fixed表现要比iOS更好，软键盘弹出时，不会影响fixed元素定位
    •	ios4下不支持position:fixed

**解决方案**:  	可用isroll.js，暂无完美方案

> 参考
    [《移动端web页面使用position:fixed问题总结》](https://github.com/maxzhang/maxzhang.github.com/issues/2)
    [《使用iScroll.js解决ios4下不支持position:fixed的问题》](http://www.cnblogs.com/PeunZhang/archive/2013/06/14/3117589.html)

<h5>27. 如何阻止windows Phone的默认触摸事件</h5>

winphone下默认触摸事件事件使用e.preventDefault是无效的, 目前解决方法是使用样式来禁用
`html{-ms-touch-action: none;}/* 禁止winphone默认触摸事件 */`

> 参考[《Windows phone 8 touch support》](http://stackoverflow.com/questions/13396297/windows-phone-8-touch-support)

<h5>28. 播放视频不全屏</h5>

```html
<!--
1.目前只有ios7+、winphone8+支持自动播放
2.支持Airplay的设备（如：音箱、Apple TV)播放
x-webkit-airplay="true" 
3.播放视频不全屏，ios7+、winphone8+支持，部分android4+支持（含华为、小米、魅族）
webkit-playsinline="true" 
-->
<video x-webkit-airplay="true" webkit-playsinline="true" preload="auto" autoplay src="http://"></video>
```

> 体验demo：http://1.peunzhang.sinaapp.com/demo/video/index.html

<h5>29. FastClick</h5>

消除在移动浏览器上触发click事件与一个物理Tap(敲击)之间的300延迟

> 参考《[FastClick](https://github.com/ftlabs/fastclick)》

<h5>20. android内置浏览器能成功禁用触摸时的弹出层，但是微信浏览器、UC浏览器均失败。请教下：这几种浏览器下如何解决此问题呢？</h5>

```javascript
//为特定元素排除默认事件
document.addEventListener("touchstart", function (e) {
/^(?:INPUT|TEXTAREA|A)$/.test(e.target.tagName) || e.preventDefault();
});
```

`.css{-webkit-touch-callout: none}`

<h5>21. 白树大神，模拟按钮hover效果的两种实现方式，第一种在微信没反应，第二种页面引用了zepto.js,写了方法但是和默认的滑动有冲突，不能</h5>

@  ┛自命菜菜
这样写就不会冲突！

```javascript
//公用函数
function hasClass(ele, cls) {
  cls = cls || '';
  if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
  return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
}

function addClass(ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
  }
}

function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
    newClass = newClass.replace(' ' + cls + ' ', ' ');
  }
    ele.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}

//按钮中的class包含btn的，触摸时添加btn-on
var _btn = document.querySelectorAll(".btn");
for(var i = 0 ,l = _btn.length; i < l; i++){
  (function(num) {
      _btn[i].addEventListener("touchstart",function(e){
      addClass(_btn[num],"btn-on")
    })
      _btn[i].addEventListener("touchend",function(e){
      removeClass(_btn[num],"btn-on")
    })
  })(i);
}
```

<h5>22. ios虚拟键盘“go”按钮的实现</h5>

`<form action=".">`

必须加`action`，否则虚拟键盘出现的是“return”按钮

如果模拟“search”按钮，除了在`form`加`action`外则在input中加入`name="search"`或`type="search"`

## 常用的移动端框架

- zepto.js

    语法与jquery几乎一样，会jquery基本会zepto~
    最新版本已经更新到1.16
    官网：http://zeptojs.com/
    中文(非官网)：http://www.css88.com/doc/zeptojs_api/
    常使用的扩展模块：
    浏览器检测：https://github.com/madrobby/zepto/blob/master/src/detect.js
    tap事件：https://github.com/madrobby/zepto/blob/master/src/touch.js

- iscroll.js

    解决页面不支持弹性滚动，不支持fixed引起的问题~
    实现下拉刷新，滑屏，缩放等功能~
    最新版本已经更新到5.0
    官网：http://cubiq.org/iscroll-5

- underscore.js

    笔者没用过，不过听说好用，推荐给大家~
    该库提供了一整套函数式编程的实用功能，但是没有扩展任何JavaScript内置对象。
    最新版本已经更新到1.8.2
    官网：http://underscorejs.org/
    滑屏框架
    适合上下滑屏、左右滑屏等滑屏切换页面的效果

- slip.js
- iSlider.js
- fullpage.js
- swiper.js
- Sea.js 

    提供简单、极致的模块化开发体验
    •	简单友好的模块定义规范：Sea.js 遵循 CMD 规范，可以像 Node.js 一般书写模块代码。
    •	自然直观的代码组织方式：依赖的自动加载、配置的简洁清晰，可以让我们更多地享受编码的乐趣。

## flex布局

flex布局目前可使用在移动中，并非所有的语法都全兼容，但以下写法笔者实践过，效果良好~

```css
/* ============================================================
  flex：定义布局为盒模型
  flex-v：盒模型垂直布局
  flex-1：子元素占据剩余的空间
  flex-align-center：子元素垂直居中
  flex-pack-center：子元素水平居中
  flex-pack-justify：子元素两端对齐
  兼容性：ios 4+、android 2.3+、winphone8+
  ============================================================ */
.flex{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}
.flex-v{-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}
.flex-1{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;}
.flex-align-center{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;}
.flex-pack-center{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}
.flex-pack-justify{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}
```

示例：两端对齐

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
<style type="text/css">
/* ============================================================
  flex：定义布局为盒模型
  flex-v：盒模型垂直布局
  flex-1：子元素占据剩余的空间
  flex-align-center：子元素垂直居中
  flex-pack-center：子元素水平居中
  flex-pack-justify：子元素两端对齐
  兼容性：ios 4+、android 2.3+、winphone8+
  ============================================================ */
.flex{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}
.flex-v{-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}
.flex-1{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;}
.flex-align-center{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;}
.flex-pack-center{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}
.flex-pack-justify{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}
</style>
</head>
<body>
<div class="flex flex-pack-justify">
   <div>模块一</div>
   <div>模块二</div>
   <div>模块三</div>
   <div>模块四</div>
</div>
</body>
</html>
```

使用注意：

    •	flex下的子元素必须为块级元素，非块级元素在android2.3机器下flex失效
    •	flex下的子元素宽度和高度不能超过父元素，否则会导致子元素定位错误，例如水平垂直居中

> 参考：

    [flexyboxes](http://the-echoplex.net/flexyboxes/)
    [“老”的Flexbox和“新”的Flexbox](http://www.w3cplus.com/css3/old-flexbox-and-new-flexbox.html)
    [跨浏览器的Flexbox](http://www.w3cplus.com/css3/advanced-cross-browser-flexbox.html)

> reference:  http://peunzhang.cnblogs.com/
