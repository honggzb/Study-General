移动端触屏框架的使用Hammer.js

- [1. Hammerjs Events事件](#Events事件)
- [2. codes sample](#codes)

<h3 id="Events事件">1. Events事件</h3>

- Pan事件：在指定的dom区域内，一个手指放下并移动事件，即触屏中的拖动事件。这个事件在屏触开发中比较常用，如：左拖动、右拖动等，如手要上使用QQ时向右滑动出现功能菜单的效果。该事件还可以分别对以下事件进行监听并处理：
  - Panstart：拖动开始、Panmove：拖动过程、Panend：拖动结束、Pancancel：拖动取消、Panleft：向左拖动、Panright：向右拖动、Panup：向上拖动、Pandown：向下拖动
- Pinch事件：在指定的dom区域内，两个手指（默认为两个手指，多指触控需要单独设置）或多个手指相对（越来越近）移动或相向（越来越远）移动时事件。该事件事以分别对以下事件进行监听并处理：
  - Pinchstart：多点触控开始、Pinchmove：多点触控过程、Pinchend：多点触控结束、Pinchcancel：多点触控取消、Pinchin：多点触控时两手指距离越来越近、Pinchout：多点触控时两手指距离越来越远
-  Press事件：在指定的dom区域内触屏版本的点击事件，这个事件相当于PC端的Click事件，该不能包含任何的移动，最小按压时间为500毫秒，常用于我们在手机上用的“复制、粘贴”等功能。该事件分别对以下事件进行监听并处理：
  - Pressup：点击事件离开时触发
- Rotate事件：在指定的dom区域内，当两个手指或更多手指成圆型旋转时触发（就像两个手指拧螺丝一样）。该事件分别对以下事件进行监听并处理：
  - Rotatestart：旋转开始、Rotatemove：旋转过程、Rotateend：旋转结束、Rotatecancel：旋转取消
- Swipe事件：在指定的dom区域内，一个手指快速的在触屏上滑动。即我们平时用到最多的滑动事件。
  - Swipeleft：向左滑动、Swiperight：向右滑动、Swipeup：向上滑动、Swipedown：向下滑动
- Tap事件：在指定的dom区域内，一个手指轻拍或点击时触发该事件(类似PC端的click)。该事件最大点击时间为250毫秒，如果超过250毫秒则按Press事件进行处理。

**Tap事件与Click事件区别**

在安卓触屏上，Tap事件和click事件可以同时触发，但click事件会有几百毫秒的延迟，即先触发Tap事件，过一段时间再触发click事件

[back to top](#top)

<h3 id="codes">2. codes sample</h3>

```javascript
var layer = document.getElementById('layer');
var mc = new Hammer.Manager(layer);
mc.add(new Hammer.Tap());
mc.on('tap', function(e) {
    layer.style.display = "none";
    e.preventDefault();
});
//
var mcHammer = undefined;
function setupHammer() {
  if (!mcHammer) {
    var desktop = document.querySelector("ot-desktop");
    var mc = new Hammer.Manager(desktop);
    mc.add( new Hammer.Swipe({ event: 'prevresult', pointers: 2, threshold: 25, velocity: 0.65, direction: Hammer.DIRECTION_RIGHT }) );
    mc.add( new Hammer.Swipe({ event: 'nextresult', pointers: 2, threshold: 25, velocity: 0.65, direction: Hammer.DIRECTION_LEFT }) );
    mc.on("prevresult", goPrev);
    mc.on("nextresult", goNext)
    mcHammer = mc;
  }
}
function cleanupHammer() {
  if (mcHammer) {
    var mc = mcHammer;
    mc.stop(true);
    mc.destroy();
    mcHammer = undefined;
  }
}
function goPrev() {
  //...
}
function goNext() {
  //...
}
```

[back to top](#top)

> Reference

- [Hammer.js分析（一）——基础结构](http://www.cnblogs.com/strick/p/5173576.html)
- [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)
- 官网地址：http://eightmedia.github.com/hammer.js/  （带演示）
- 源码地址：https://github.com/EightMedia/hammer.js
