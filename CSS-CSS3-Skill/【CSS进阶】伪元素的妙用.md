[【CSS进阶】伪元素的妙用](#top)

- [1. 利用after清除浮动](#利用after清除浮动)
- [2. 单个颜色实现按钮 hover 、active 的明暗变化](#单个颜色实现按钮)
- [3. CSS3 transfrom属性变形不会作用于位于div上的的文字](#transfrom属性变形不会作用于位于div上的的文字)
- [4. 伪元素实现换行，替代`<br>`换行标签](#伪元素实现换行)
- [5. 不改变按钮原本大小的情况下去增加点击热区](#不改变按钮原本大小的情况下去增加点击热区)

<h2 id ="利用after清除浮动">1. 利用after清除浮动</h2>

```css
.clearfix:after {content:"."; display:block; height:0; visibility:hidden; clear:both; }
.clearfix { *zoom:1; }
```

<h2 id ="单个颜色实现按钮">2. 单个颜色实现按钮 hover 、active 的明暗变化</h2>

- before --> 在背景色上方叠加一个白色半透明层 `rgba(255,255,255,.2)` 可以得到一个更亮的颜色
- after  --> 在背景色上方叠加一个黑色半透明层 `rgba(0,0,0,.2)` 可以得到一个更暗的颜色

```css
.pesudo:before{
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index:-1;
  background:rgba(0,0,0,.1);    /*黑色半透明层*/
}
.pesudo:hover:before{
  content:"";
}
.pesudo:after{
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index:-1;
  background:rgba(255,255,255,.2);   /*白色半透明层*/
}
.pesudo:active:after{
  content:"";
}
```

[back to top](#top)

<h2 id ="transfrom属性变形不会作用于位于div上的的文字">3. CSS3 transfrom属性变形不会作用于位于div上的的文字</h2>
 
- 用CSS3 transfrom属性，内容文字也会跟着CSS3变换一起发生了扭曲，通常会用一个div 做背景进行变换，而文字则是放在另外一个div中
- 运用before伪元素，将CSS3变换作用于伪元素上，这样变形不会作用于位于 div 上的的文字，而且没有使用多余的标签

```css
.parallelogram{
          position: absolute;
          top:50%;left: 50%;
          transform:translate(-50%,-50%);
          width: 280px;line-height:150px;
          text-align: center;
          color: white;
          font-size: 200%;
}
.parallelogram:before{
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          background-color:#00aabb;
          z-index:-1;
          transform: skew(.08turn);     /* CSS3变换skew 作用于伪元素 */
}
```

[back to top](#top)

<h2 id ="伪元素实现换行">4. 伪元素实现换行，替代`<br>`换行标签</h2>

**行内级元素末尾实现换行**

```css
.inline-element::after{
    content: "\A";    /*Unicode字符是专门代表换行符*/
    white-space: pre;  /*作用是保留元素后面的空白符和换行符*/
} 
```

[back to top](#top)

<h2 id ="不改变按钮原本大小的情况下去增加点击热区">5. 不改变按钮原本大小的情况下去增加点击热区</h2>

```css
.btn::befoer{
  content:"";
  position:absolute;
  top:-10px;
  right:-10px;
  bottom:-10px;
  left:-10px;
}
```

[back to top](#top)

<h2 id ="单标签图案">6. 单标签图案</h2>

[CSS3奇思妙想.html](https://github.com/honggzb/Study-General/blob/master/CSS-CSS3-Skill/goodSample/CSS3%E5%A5%87%E6%80%9D%E5%A6%99%E6%83%B3.html)

> [【CSS进阶】伪元素的妙用--单标签之美](https://www.cnblogs.com/coco1s/p/5528393.html)
