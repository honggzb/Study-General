##实现 CSS3 3D 全景

- [1. perspective](#perspective)
- [2. transform-style](#transform-style)
- [3. 实现CSS 3D全景的原理](#实现CSS-3D全景的原理)

**CSS3 Transform 属性**

- transform-origin：元素变形的原点（默认值为**50% 50% 0**，该数值和后续提及的百分比均默认基于元素自身的宽高算出具体数值）
- perspective:     指定了观察者与 z=0 平面的距离，使具有三维位置变换的元素产生透视效果。（默认值：none，值只能是绝对长度，即负数是非法值）
- transform-style：用于指定其为子元素提供 2D 还是 3D 的场景。另外，该属性是非继承的
- transform：      该属性能让你修改 CSS 可视化模型的坐标空间，其中包括 平移（translate）、旋转（rotate）、缩放（scale） 和 扭曲（skew）

<h3 id="perspective">1. perspective</h3> 

对于 perspective，该属性指定了“眼睛”与元素的 perspective-origin （默认值是 50% 50%）点的距离。那么问题来了：“当我们应用 px 作为衡量单位时，那它的实际距离该如何量化呢（即如何得到我们熟悉且易于表达的距离）？”

答：当我们的屏幕的分辨率是 1080P（1920*1080px），且该元素或祖先元素的 perspective 值是 1920px 时，该应用了 CSS3 3D Transform 的元素的立体效果就相当于我们在距离一个屏幕宽度（1920px）的屏幕前观看该元素的真实效果。尽管如此，目前我也不清楚如何准确地为元素设置一个合适的 perspective 值，只能猜测个大概值，然后再动态修改值，以达到满意的呈现效果。

![](http://i.imgur.com/nJ6Aq00.png)

另外，关于 perspective 还有另外一个重要的点。因为，perspective-origin 的默认值是 50% 50%，因此，对哪个元素应用 perspective 属性，就决定了“眼睛”的位置（即我们的“眼睛”是在哪个角度看物体）。一般来说，当我们需要正视物体时，就会将该属性设置在与该元素中心重合的某一祖先元素上。

再另外，如果说：“如何让一个元素（的背面）不可见？”，你可能会说 backface-visibility:hidden;。其实，对于在“眼睛”背后的元素（以元素的 transform-origin 为参考点），即元素的z轴坐标值大于 perspective 的值，浏览器是不会将其渲染出来的。

<h3 id="transform-style">2. transform-style</h3> 

由于 transform-style 属性是非继承的，对于中间节点需要显式设定。对于 transform 属性：下图整理了 rotate3d、translate3d 的变换方向：

![](http://i.imgur.com/lMw4xIU.png)

transform 中的变换属性的顺序是有关系的，如 translateX(10px) rotate(30deg) 与 rotate(30deg) translateX(10px) 是不等价的。

另外，需要注意的是 scale 中如果有负数值，则该方向会产生 180 度的翻转；

再另外，部分 transform 效果会导致元素（字体）模糊，如 translate 的数值存在小数、通过 translateZ 或 scale 放大元素等等。每个浏览器都有其不同的表现。

<h3 id="实现CSS-3D全景的原理">3. 实现CSS 3D全景的原理</h3> 

想象一下，当我们站在十字路口中间，身体不动，头部旋转 360°，这个过程中所看到的画面就形成了一幅以你为中心的全景图了。其实，当焦距不变时，我们就等同于站在一个圆柱体的中心。

但是，虚拟世界与现实的最大不同是：没有东西是连续的，即所有东西都是离散的。例如，你无法在屏幕上显示一个完美的圆。你只能以一个正多边形表示圆：边越多，圆就越“完美”。

举例：对于正九面体，每个元素的宽为 210px，对应的角度为 40°，即如下图

![](http://i.imgur.com/og633gt.png)

由此得到一个公用函数，只需传入含有元素的宽度和元素数量的对象，即可得到 r 值：

```javascript
function calTranslateZ(opts) {
  return Math.round(opts.width / (2 * Math.tan(Math.PI / opts.number)))
}
calTranlateZ({
    width: 210,
    number: 9
});  // 288
```

**3.1 构建正多面体**

HTML 结构

```
#view(perspective:1000px) 
  #stage(transform-style:preserve-3d) 
    #cube(transform-style:preserve-3d) 
      .div(width:600px;height:600px;)  /*组成立方体的元素*/
```

**3.2 将我们的“眼睛”放置在正多面体内**

由于在“眼睛”后的元素是不会被浏览器所渲染的（与 .div元素 是否设置 backface-visibility:hidden; 无关），且我们保证了 .div元素 的正面都指向了正多面体的中心，这就形成 360° 被环绕的效果了。 那“眼睛”具体是被放置在哪个位置呢？

答：通过设置 #stage 元素的 translateZ 的值，让不能被看到的 .div元素 的 Z 轴坐标值大于 perspective 的值即可。如：立方体的正面的 translateZ 是 -300px（为了保证立方体的正面是指向立方体中心，正面元素需要设置 rotateY(-180deg) translateZ(-300px)，即正面元素向“眼球”方向平移了 300px），而 #view 的 perspective 的值为 1000px，那么 #stage 的 translateZ 的值应该大于 700px 且小于 1300px，具体数值则取决于你想要呈现的效果了。

> references:

- [Intro to CSS 3D transforms](https://desandro.github.io/3dtransforms/docs/carousel.html)
- [CSS 3D Panorama - 淘宝造物节技术剖析](http://www.w3cplus.com/animation/css-3d-panorama.html)
