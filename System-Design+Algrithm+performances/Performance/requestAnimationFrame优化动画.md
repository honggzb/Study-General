## [requestAnimationFrame优化动画](#top)

- [1. requestAnimationFrame的使用方式](#requestAnimationFrame的使用方式)
- [2. 简化版的补丁](#简化版的补丁)

requestAnimationFrame的方式的优势如下：

- 经过浏览器优化，动画更流畅
- 窗口没激活时，动画将停止，省计算资源
- 更省电，尤其是对移动终端

<h3 id="requestAnimationFrame的使用方式">1. requestAnimationFrame的使用方式</h3>

```javascript
//simplest sample
function animate() {
  // Do whatever
  requestAnimationFrame(animate);
  // Do something animate
}
//go->
requestAnimationFrame(animate);
```

有的时候我们必须要加一些控制，requestAnimationFrame也可以像setInterval一样返回一个句柄，然后我们可以取消它。控制动画代码如下。

```javascript
//Start and Stop - add controller
var globalID;
function repeatOften() {
  $("<div />").appendTo("body");
  globalID = requestAnimationFrame(repeatOften);
}
$("#start").on("click", function() {
  globalID = requestAnimationFrame(repeatOften);  //when ot start
});
$("#stop").on("click", function() {
  cancelAnimationFrame(globalID);   //when to stop
});
```

[back to top](#top)

<h3 id="简化版的补丁">2. polyfill- 兼容性</h3>

```javascript
//Paul Irish的简化版的补丁, 可以较好的兼容支持该特性的浏览器
window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
(function animate(){   // 使用
  requestAnimationFrame(animate);
  //动画
})();
```

[完整版补丁](https://github.com/darius/requestAnimationFrame)

[back to top](#top)

> Reference

- [Using requestAnimationFrame](https://css-tricks.com/using-requestanimationframe/)
- [requestAnimationFrame动画控制详解](http://www.xuebuyuan.com/2224970.html)
- [Paul Irish, requestAnimationFrame for Smart Animating](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/)
- [MDN, Window.requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame)
- [Chris Coyier, Using requestAnimationFrame](http://css-tricks.com/using-requestanimationframe/)
- [Matt West, Efficient Animations with requestAnimationFrame](http://blog.teamtreehouse.com/efficient-animations-with-requestanimationframe)
- [W3C CR, Timing control for script-based animations](#http://www.w3.org/TR/animation-timing/)
- [Polyfill for requestAnimationFrame/cancelAnimationFrame](https://github.com/darius/requestAnimationFrame)
- [张鑫旭, CSS3动画那么强，requestAnimationFrame还有毛线用？](http://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/)
- [朱永盛, 理解WebKit和Chromium: 渲染主循环（main loop)和requestAnimationFrame](http://blog.csdn.net/milado_nju/article/details/8101188)


