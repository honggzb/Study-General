[移动web平时开发问题小结](#top)

- [1. CSS](#css)
  - [1.1 Background image not showing on iPad and iPhone](#background-image)
  - [1.2 Scrolling slow on mobile/ios(-webkit-overflow-scrolling: touch)](#Scrolling)
    - bug of dynamic add `-webkit-overflow-scrolling: touch;`
    - bug of 在body里使用 `-webkit-overflow-scrolling: touch;`无效
  - [1.3 Scrolling issue with Fix div or background on mobile/ios(use will-change提高性能)](#fix-Scrolling)
  - [1.4 flicker when using webkit-transition on mobile/ios](#flicker)
- [2. ios horizontal scroll bug](#ios-horizontal-bug) 

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

<h3 id="flicker">1.4 flicker on webkit-transition on mobile/ios</h3>

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

> Reference

- https://stackoverflow.com/questions/18999660/background-image-not-showing-on-ipad-and-iphone
- https://stackoverflow.com/questions/3845445/how-to-get-the-scroll-bar-with-css-overflow-on-ios
- [移动端web页面input+fixed布局bug总结](http://blog.csdn.net/ly2983068126/article/details/49306427)
- [踩坑路上——IOS Safari浏览器下固定定位position:fixed带来的问题与解决方案](http://blog.csdn.net/grsghh/article/details/61416953)
