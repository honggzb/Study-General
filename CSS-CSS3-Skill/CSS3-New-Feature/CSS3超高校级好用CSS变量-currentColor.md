##currentColor-CSS3超高校级好用CSS变量

-- [top](#top)

- [1. currentColor的使用与表现](#currentColor的使用与表现)
- [2. currentColor的实战表演秀](#currentColor的实战表演秀)
  - [2.1 背景色镂空技术](#背景色镂空技术)
  - [1.2 CSS变量的空格尾随特性](#CSS变量的空格尾随特性)
  - [1.3 CSS变量的相互传递特性  ---`variable-name: var(--another-variable-name);`](#CSS变量的相互传递特性)
  - [1.4 CSS变量的作用域](#CSS变量的作用域)
- [3. One variable, many changes](#One-variable-many-changes)

<h3 id="CSS-variable">1. currentColor的使用与表现</h3>

currentColor表示“当前的标签所继承的文字颜色”:   `img[src$='mm1.jpg'] { border: 1em solid currentColor; }`

<h3 id="currentColor的实战表演秀">2. currentColor的实战表演秀</h3>

<h4 id="currentColor的实战表演秀">[2.1 背景色镂空技术](http://www.zhangxinxu.com/study/201410/background-hollow-currentcolor.html)</h4>

```html
  <style>
  .icon {
    display: inline-block;
    width: 16px; height: 20px;
    background-image: url(sprite_icons.png);
    background-color: currentColor;        /* 该颜色控制图标的颜色 */
  }
  .icon1 { background-position: 0 0; }
  .icon2 { background-position: -20px 0; }
  </style>
  <div class="demo">
    更改颜色：<input id="colorInput" type="color" value="#34538b" autocomplete="off">
    <p>
      <i class="icon icon1" style="background-color: rgb(0, 255, 255);"></i><a href="##" class="link">返回</a>
      <i class="icon icon2" style="background-color: rgb(0, 255, 255);"></i><a href="##" class="link">刷新</a>
    </p>
  </div>
  <script>
  var eleInput = document.getElementById("colorInput"),eleIcons = document.getElementsByTagName("i");
  eleInput.onchange = function() {
      var i = 0, l = eleIcons.length;
      for (; i<l; i+=1) {
          eleIcons[i].style.backgroundColor = this.value;
      }
  };
  </script>
```

[back to top](#top)

<h4 id="currentColor的实战表演秀">[2.1 背景色镂空技术](http://www.zhangxinxu.com/study/201307/background-color-insert-background-image.html)</h4>



[back to top](#top)

> Reference

http://www.zhangxinxu.com/wordpress/2014/10/currentcolor-css3-powerful-css-keyword/
