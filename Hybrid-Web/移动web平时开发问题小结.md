[移动web平时开发问题小结](#top)

- [1. CSS](#css)
  - [1.1 Background image not showing on iPad and iPhone](#background-image)
  - [1.2 Scrolling slow on mobile/ios(-webkit-overflow-scrolling: touch)](#Scrolling)
    - [bug of dynamic add `-webkit-overflow-scrolling: touch;`](#)
    - [bug of 在body里使用 `-webkit-overflow-scrolling: touch;`无效](#)
  - [1.3 Scrolling issue with Fix div or background on mobile/ios(use will-change提高性能)](#fix-Scrolling)
- [2. ios horizontal bug](#ios-horizontal-bug) 
- [3. 移动端web页面input+fixed布局bug - 软键盘唤起的情况下](#移动端web页面input+fixed布局)
- [4. IOS Safari浏览器下固定定位position:fixed带来的问题与解决方案](#Safari浏览器下固定定位)

<h2 id="css">1. CSS</h2>

<h3 id="background-image">1.1 Background image not showing on iPad and iPhone</h3>

See [background-size](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size_. This property must be specified after background-position, separated with the '/' character.

```css
background: url([URL]) 0 0 / auto 749px;
/* or 1) */
background: url([URL]) 0 0 / cover;
/* or 2) */
/* The support for background-size in the shorthand notation is also not very broad, as it's supported in Firefox 18+, Chrome 21+, IE9+ and Opera. 
It is not supported in Safari at all. Regarding this, I would suggest to always use(seperate writing) */
background: url("background1.png");
background-size: auto 749px; /* or cover */
/* or 3) */
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
```

other solution

```css
section {
    width: 200px;
    height: 100px;
    border: 1px solid grey;
}
#section1 {
    background: url(http://placehold.it/350x150) auto 100px;
}
#section2 {
    background: url(http://placehold.it/350x150) 0 0 / auto 100px;
}
#section3 {
    background: url(http://placehold.it/350x150) 0 0 / cover;
}
#section4 {  //safari work only this way
    background: url(http://placehold.it/350x150) 0 0;
    background-size: cover;
}
```

[back to top](#top)

<h3 id="Scrolling">1.2 Scrolling slow on mobile/ios</h3>

`-webkit-overflow-scrolling`是一个只有 iOS 设备支持的非标准属性。苹果自己的解释：指定是否在 overflow: scroll 的元素中使用“原生”的滚动方式, 包含两个可选值：auto 和 touch

- auto：就是普通的无惯性滚动效果
- touch：原生的滚动效果。使用此效果会构造一个stacking context

`-webkit-overflow-scrolling`引发了那些坑？(http://www.cnblogs.com/chris-oil/p/6164966.html)

- 滚动中 scrollTop 属性不会变化
- 手势可穿过其他元素触发元素滚动
- 运行时通过 JS 动态添加元素溢出高度导致滚动失效, [Google 上一搜一片](http://patrickmuff.ch/blog/2014/10/01/how-we-fixed-the-webkit-overflow-scrolling-touch-bug-on-ios/)
- 滚动时暂停其他transition

https://stackoverflow.com/questions/33601165/scrolling-slow-on-mobile-ios-when-using-overflowscroll

```css
.scrolling-content {
   overflow-y: scroll;                 //must be scroll, can not use auto
   -webkit-overflow-scrolling: touch;    /*adding `-webkit-overflow-scrolling:touch` to scrolling element*/
   height:100%;                          /*A value other than height:auto needs to be set*/
}
/* -webkit-overflow-scrolling: touch; breaks in Apple's iOS8 */
/*The solution I: to remove all the CSS that tricks the browser into using the GPU:/
-webkit-transform: translateZ(0px);
-webkit-transform: translate3d(0,0,0);
-webkit-perspective: 1000;
/*The solution II: */
.dashboardScroll-inner { height: calc(100% + 1px);}
```

http://patrickmuff.ch/blog/2014/10/01/how-we-fixed-the-webkit-overflow-scrolling-touch-bug-on-ios/

**dynamically add content to a div with `-webkit-overflow-scrolling: touch;`** that exceeds the div in height, it becomes broken and unscrollable. You can fix this by constantly having an inner div, that triggers the scrollbar because its 1px higher than the outer div:

```css
.outer {
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  /* More properties for a fixed height ... */
}
.inner { height: calc(100% + 1px); }
```

[bug of 在body里使用 -webkit-overflow-scrolling: touch;无效](https://segmentfault.com/q/1010000009348207)

直接给body写overflow-scrolling: touch在iOS手机并没有回弹的效果 但是给单个div写会有回弹的效果

```css
/*1) 解决方案1： 需要同时设置html和body才能起作用*/
html,body{
    height: 100%;
    overflow: auto;
   -webkit-overflow-scrolling: touch;
}
/*2) 解决方案2：给body加个overflow：hidden，再加这个-webkit-overflow-scrolling: touch;是有效果*/
/*3) 解决方案3：在body下添加个容器 把-webkit-overflow-scrolling: touch; 写到容器里*/
```

[back to top](#top)

<h3 id="fix-Scrolling">1.3 Scrolling issue with Fix div or background on mobile/ios</h3>

```css
/* Original CSS */
.what-we-do-cards {
  @include clearfix;
  border-top: 10px solid rgba(255, 255, 255, .46);
  background-color: white;
  background: url('/img/front/strategy.jpg') no-repeat center center;
  background-attachment: fixed;    /* GPU-intensive features */
  background-size: cover;          /* GPU-intensive features */
  color: $white;
  padding-bottom: 4em;
}
/* GPU-friendly CSS: Scrolling will no longer cause repainting once the image sits in its own layer */
.what-we-do-cards {
  @include clearfix;
  border-top: 10px solid rgba(255, 255, 255, .46);
  color: $white;
  padding-bottom: 4em;
  overflow: hidden;     /* added for pseudo-element*/
  position: relative; /* added for pseudo-element*/
  /* Fixed-position background image*/
  &::before {
    content: ' ';
    position: fixed;    /* instead of background-attachment */
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: white;
    background: url('/img/front/strategy.jpg') no-repeat center center;
    background-size: cover;
    will-change: transform;        /* creates a new paint layer*/
    z-index: -1;
  }
}
```

[Fix scrolling performance with CSS will-change property](https://www.fourkitchens.com/blog/article/fix-scrolling-performance-css-will-change-property/)

[back to top](#top)

<h3 id="flicker">1.3 flicker on webkit-transition on mobile/ios</h3>

- Add `-webkit-transform-style: preserve-3d;` to the elements that are flickering
- Add `-webkit-backface-visibility: hidden;` to the elements that are flickering
- Add `webkit-transform: translate3d(0, 0, 0);` to all its children
- move the animating element outside of the parent the flickeringelements are within
- if your element is bigger than 2000x2000 it has to create multiple textures. see http://trac.webkit.org/wiki/CoordinatedGraphicsSystem

```css
/*keep animation smooth in Safari above 2000px*/
@media ( min-width: 2000px ) {
    .boxContent {
        -webkit-backface-visibility: hidden;
    }
}  
```

- https://stackoverflow.com/questions/15751012/css-transform-causes-flicker-in-safari-but-only-when-the-browser-is-2000px-w
- http://www.viget.com/inspire/webkit-transform-kill-the-flash/

[back to top](#top)

<h2 id="ios-horizontal-bug">2. ios horizontal bug</h2>

if you are trying to achieve horizontal div scrolling with touch on mobile, the updated CSS fix does not work (tested on Android Chrome and iOS Safari multiple versions), eg: `-webkit-overflow-scrolling: touch`

http://chris-barr.com/2010/05/scrolling_a_overflowauto_element_on_a_touch_screen_device/

```javascript
//Usage:
touchHorizScroll('divIDtoScroll');
//Functions:
function touchHorizScroll(id){
    if(isTouchDevice()){ //if touch events exist...
        var el=document.getElementById(id);
        var scrollStartPos=0;

        document.getElementById(id).addEventListener("touchstart", function(event) {
            scrollStartPos=this.scrollLeft+event.touches[0].pageX;              
        },false);

        document.getElementById(id).addEventListener("touchmove", function(event) {
            this.scrollLeft=scrollStartPos-event.touches[0].pageX;              
        },false);
    }
}
function isTouchDevice(){
    try{
        document.createEvent("TouchEvent");
        return true;
    }catch(e){
        return false;
    }
}  
```

[back to top](#top)

<h2 id="移动端web页面input+fixed布局">3. 移动端web页面input+fixed布局bug - 软键盘唤起的情况下</h2>

移动端业务开发，iOS 下经常会有 fixed 元素和输入框(input 元素)同时存在的情况。 但是fixed元素在底部输入框软键盘被唤起以后，再次滑动页面，会出现许多莫名其妙的问题

简单解释下： > 软键盘唤起后，页面的fixed元素将失效（即无法浮动，也可以理解为变成了absolute定位），所以当页面超过一屏且滚动时，失效的fixed 元素就会跟随滚动了

**解决思路**

既然在 iOS 下由于软键盘唤出后，页面 fixed 元素会失效，导致跟随页面一起滚动，那么假如——页面不会过长出现滚动，那么即便 fixed 元素失效，也无法跟随页面滚动，也就不会出现上面的问题了。

那么按照这个思路，**如果使fixed元素的父级不出现滚动，而将原body滚动的区域域移到main内部，而 header和footer的样式不变**，代码如下：

```html
<body class="layout-scroll-fixed">
    <!-- fixed定位的头部 (absolute绝对定位也可以) -->
    <header> </header>
    <!-- 可以滚动的区域 -->
    <main>
        <div class="content"> <!-- 内容在这里... -->  </div>
    </main>
    <!-- fixed定位的底部 -->
    <footer>
        <input type="text" placeholder="Footer..."/>
        <button class="submit">提交</button>
    </footer>
</body>
```

```css
header, footer, main {
    display: block;
}
header {
    position: fixed;   /*或者写成absolute,如果考虑到更老一些的iOS统不支持fixed元素*/
    height: 50px;
    left: 0;
    right: 0;
    top: 0;
}
footer {
    position: fixed;  /*或者写成absolute, 如果考虑到更老一些的iOS统不支持fixed元素*/
    height: 34px;
    left: 0;
    right: 0;
    bottom: 0;
}
main {
    /* main绝对定位，进行内部滚动 */
    position: absolute;
    top: 50px;
    bottom: 34px;
    overflow-y: scroll;   /* 使之可以滚动 */
    -webkit-overflow-scrolling: touch;   /* 增加该属性，可以增加弹性, 是滑动更加顺畅 */
}
main .content { height: 2000px; }
```

[示例](http://resource.haorooms.com/softshow-16-151-1.html)

**其他的一些细节处理**

在细节处理上，其实还有很多要注意的，挑几个实际遇到比较大的问题来说一下：

- 有时候输入框focus以后，会出现软键盘遮挡输入框的情况，这时候可以尝试 input 元素的 scrollIntoView 进行修复。
- 在iOS下使用第三方输入法时，输入法在唤起经常会盖住输入框，只有在输入了一条文字后，输入框才会浮出。目前也不知道有什么好的办法能让唤起输入框时正确显示。这暂时算是 iOS 下的一个坑吧。
- 有些第三方浏览器底部的工具栏是浮在页面之上的，因此底部 fixed 定位会被工具栏遮挡。解决办法也比较简单粗暴——适配不同的浏览器，调整 fixed 元素距离底部的距离。
- 最好将 header 和 footer 元素的 touchmove 事件禁止，以防止滚动在上面触发了部分浏览器全屏模式切换，而导致顶部地址栏和底部工具栏遮挡住 header 和 footer 元素。
- 在页面滚动到上下边缘的时候，如果继续拖拽会将整个 View 一起拖拽走，导致页面的“露底”。

[back to top](#top)

<h2 id="Safari浏览器下固定定位">4. IOS Safari浏览器下固定定位position:fixed带来的问题与解决方案</h2>

移动端页面时使用固定定位position:fixed时会发现，在IOS的safari浏览器或原生APP下运行会出现几个**问题**:

1. 页面滑动失去惯性，即当我们滑动页面后松开手指，页面会立即停止 
2. 使用fixed定位的元素会随着页面的滑动而抖动的像是犯病了一样

**解决方案1:** ： `-webkit-overflow-scroll:touch`解决滑动无惯性 

- 哪个元素/页面使用了fixed定位，就给哪个元素添加该属性。 
- 注意：添加完后一定要在真机上测试，不要在浏览器如谷歌浏览器提供的移动端调试模式下测试…… 
- 但有时候使用fixed定位的元素是某个事件触发后而动态在当前页面上生成的一个页面，如果此时给该弹出层加上这个样式后，可能会引发其他冲突BUG等，所以在实际开发过程中，最好会使用事件来动态添加更改该样式

```javascript
//驱动弹窗显示的事件
$('.btnShow').on('click',function(){
    $('.iosWeb').show();        //弹窗显示
    $('.iosWeb').css('-webkit-overflow-scroll','touch');   //给该弹窗添加ios safari专用润滑剂
})
//隐藏弹窗的事件
$('.btnHide').on('click',function(){
    $('.iosWeb').hide();    //弹窗隐藏
    $('.iosWeb').css('-webkit-overflow-scroll','auto');  //去掉ios safari专用润滑剂
})
```

**解决方案2:** ： 使用fixed以外的定位方式重新布局 

如果一个使用了该样式的页面有某个使用了fixed定位的吸顶/吸底的头部/尾部，会发现页面虽然滑动无阻但fixed定位的头部和尾部也跟着起飞了，这我们就很不开心了，所以通常可以这样写该页面的布局：

```html
<div class="header"> <!--写点啥吧--> </div>
<div class="main">   <!--写点啥吧--> </div>
<div class="footer"> <!--写点啥吧--> </div>
<style>
/*我是吸顶头部*/
.header{
    width:100%;
    height:50px;
    position:fixed;
    top:0px;
}
/*我是中间要滑动的部分*/
.main{
    width:100%;
    height:auto;
    position:absolute;
    top:50px;/*top值为header的高*/
    bottom:50px;/*bottom值为footer的高*/
    overflow-y:scroll;
}
/*我是吸底尾部*/
.footer{
    width:100%;
    height:50px;
    position:fixed;
    bottom:0px;
}
</style>
```

[back to top](#top)

> Reference

- https://stackoverflow.com/questions/18999660/background-image-not-showing-on-ipad-and-iphone
- https://stackoverflow.com/questions/3845445/how-to-get-the-scroll-bar-with-css-overflow-on-ios
- [移动端web页面input+fixed布局bug总结](http://blog.csdn.net/ly2983068126/article/details/49306427)
- [踩坑路上——IOS Safari浏览器下固定定位position:fixed带来的问题与解决方案](http://blog.csdn.net/grsghh/article/details/61416953)
