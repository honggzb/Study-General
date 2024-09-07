[CSS Grid Layout](#top)

- [1. CSS Grid Layout概念](#Layout概念)
- [2. CSS Grid Layout案例](#Layout案例)
- [3. 显式和隐式网格线](#显式和隐式网格线)
- [4. 网格区域 grid-area](#网格区域)
- [5. 独立源与网格的层叠顺序](#独立源与网格的层叠顺序)
- [6. 网格的流动](#网格的流动)

<h2 id="Layout概念">1. CSS Grid Layout概念</h2>

`display: grid; /*inline-grid*/`： 开启Grid Layout

|Term|image|others|
| :------------- | :------------- |:------------- |
|Grid line|![](https://i.imgur.com/2JhN0nS.jpg)|`grid-column-start`, `grid-column-end`,`grid-row-start`, `grid-row-end`|
|Grid Track|![](https://i.imgur.com/dlJjhc2.jpg)|`grid-template-columns`, `grid-template-rows`|
|Grid Cell|![](https://i.imgur.com/ln1WPTb.jpg)|由行线line2、line3和列表line2、line3组成|
|Grid Area|![](https://i.imgur.com/DP6q7Va.jpg)|是行线line1、line3和列线line2、line4之间的区域，其主要包括了四个网格单元格, <br>`grid-area: 1/1/2/2`, 组成网格区域的网格线顺序是row-start/column-start/row-end/column-end|

**Grid Area**

![Grid Area](https://i.imgur.com/OKgjGmh.jpg)

**浏览器中开启CSS Grid Layout模块功能(older browser)**

- Chrome 49以下, 49+， 默认支持CSS Grid Layout模块功能
  - 浏览器地址栏中输入：`chrome://flags`，回车后在列表清单中找到“启用实验性网络平台功能”（`#enable-experimental-web-platform-features`）
  - 一个更为简单的方法，可以直接在浏览器地址栏中输入网址：`chrome://flags#enable-experimental-web-platform-features`立马定位需要的选项，然后点击“enable”
  - 重启浏览器
- Safari(Webkit)浏览器: 从2014年4月2号开始，在[Webkit Nightly](http://trac.webkit.org/changeset/166614)中默认内置了CSS Grid Layout模块功能
- FireFox浏览器: none
- IE10+: 默认支持CSS Grid Layout模块功能

Note:

- 多列布局模块中的所有`column-*`属性运用在网格容器上将失效
- `float`和`clear`使用在网格项目（网格单元格Grid Cell）上将失效
- `vertical-align`使用在网格单元格上将失效
- :`:first-line`和`::first-letter`这样的伪元素不能应用在网格容器上

<h2 id="Layout案例">2. CSS Grid Layout案例</h2>

```
.wrapper { 
  display: grid; 
  grid-template-columns: 100px 10px 100px 10px 100px 10px 100px; 
  grid-template-rows: auto 10px auto 10px auto; 
}
```

![](https://i.imgur.com/EI33QGK.jpg)

```html
<div class="wrapper">
  <div class="box a">A</div>
  <div class="box b">B</div>
  <div class="box c">C</div>
  <div class="box d">D</div>
  <div class="box e">E</div>
  <div class="box f">F</div>
  <div class="box g">G</div>
  <div class="box h">H</div>
  <div class="box i">I</div>
  <div class="box j">J</div>
</div>
```

![](https://i.imgur.com/yKGkKdU.jpg)

```css
body {  padding: 50px;}
.wrapper {
  display: grid;
  grid-template-columns: 100px 50px 100px 50px 100px 50px 100px;
  grid-template-rows: auto 50px auto 50px auto;
}
.box {
  background-color: #444;
  color: #fff;
  font-size: 150%;
  padding: 20px;
  text-align: center;
}
/*.f{ grid-column-start: 1; grid-column-end: 2; grid-row-start: 1; grid-row-end: 2; background: red; } 
.b { grid-column-start: 3; grid-column-end: 4; grid-row-start: 1; grid-row-end: 2; } 
.c { grid-column-start: 5; grid-column-end: 6; grid-row-start: 1; grid-row-end: 2; } 
.d { grid-column-start: 7; grid-column-end: 8; grid-row-start: 1; grid-row-end: 2; }
.e { grid-column-start: 1; grid-column-end: 2; grid-row-start: 3; grid-row-end: 4; } 
.a { grid-column-start: 3; grid-column-end: 4; grid-row-start: 3; grid-row-end: 4; background: orange; } 
.g { grid-column-start: 5; grid-column-end: 6; grid-row-start: 3; grid-row-end: 4; } 
.h { grid-column-start: 7; grid-column-end: 8; grid-row-start: 3; grid-row-end: 4; } 
.i { grid-column-start: 1; grid-column-end: 2; grid-row-start: 5; grid-row-end: 6; } 
.j { grid-column-start: 3; grid-column-end: 4; grid-row-start: 5; grid-row-end: 6; }*/
/*简写方式 1*/
/*.f{ grid-column: 1 / 2; grid-row: 1 / 2; background: red;} 
.b { grid-column: 3 / 4; grid-row: 1 / 2; } 
.c { grid-column: 5 / 6; grid-row: 1 / 2; } 
.d { grid-column: 7 / 8; grid-row: 1 / 2; } 
.e { grid-column: 1 / 2; grid-row: 3 / 4; } 
.a { grid-column: 3 / 4; grid-row: 3 / 4; background: orange; } 
.g { grid-column: 5 / 6; grid-row: 3 / 4; } 
.h { grid-column: 7 / 8; grid-row: 3 / 4; } 
.i { grid-column: 1 / 2; grid-row: 5 / 6; } 
.j { grid-column: 3 / 4; grid-row: 5 / 6; }*/
/*简写方式 2*/
.f{ grid-area: 1 / 1 / 2 / 2; background: red;} 
.b { grid-area: 1 / 3 / 2 /4; } 
.c { grid-area: 1 / 5 / 2 / 6; } 
.d { grid-area: 1 / 7 / 2 / 8; } 
.e { grid-area: 3 / 1 / 4 / 2; } 
.a { grid-area: 3 / 3 / 4 / 4; background: orange;} 
.g { grid-area: 3 / 5 / 4 / 6; } 
.h { grid-area: 3 / 7 / 4 / 8; } 
.i { grid-area: 5 / 1 / 6 / 2; } 
.j { grid-area: 5 / 3 / 6 / 4; }
```

[back to top](#top)

**合并单元格**  
![](https://i.imgur.com/GojkSqo.jpg)

```css
body {  padding: 50px;}
.wrapper {
  display: grid;
  grid-template-columns: 100px 10px 100px 10px 100px 10px 100px; 
  grid-template-rows: auto 10px auto 10px auto 10px auto 10px auto;
}
.box {
  background-color: #444;
  color: #fff;
  font-size: 150%;
  padding: 20px;
  text-align: center;
}
/* 使用 grid-column*/
.a{ grid-column: 1 / 6; grid-row: 1 / 2; } 
/* 设置height: 100%; box-sizing:border-box; 是为了浏览器的兼容性 */
.b { grid-column: 7 / 8; grid-row: 1 / 10; background: orange; height: 100%; box-sizing:border-box; } 
/*.b { grid-column: 7 / 8; grid-row: 1 / span 9; background: orange; }*/
.c { grid-column: 1 / 2; grid-row: 3 / 4; } 
.d { grid-column: 3 / 4; grid-row: 3 / 4; } 
.e { grid-column: 5 / 6; grid-row: 3 / 4; } 
.f { grid-column: 1 / 4; grid-row: 5 / 6; } 
.g { grid-column: 5 / 6; grid-row: 5 / 6; } 
.h { grid-column: 1 / 2; grid-row: 7 / 8; } 
.i { grid-column: 3 / 6; grid-row: 7 / 8; } 
.j { grid-column: 1 / 6; grid-row: 9 / 10; }
/* 或使用 grid-area*/
.a{ grid-area: 1 / 1 / 2 / 6; } 
.b { grid-area: 1 / 7 / 10 / 8; background: orange; height: 100%; box-sizing:border-box; } 
.c { grid-area: 3 / 1 / 4 / 2; } 
.d { grid-area: 3 / 3 / 4 / 4; } 
.e { grid-area: 3 / 5 / 4 / 6; } 
.f { grid-area: 5 / 1 / 6 / 4; } 
.g { grid-area: 5 / 5 / 6 / 6; } 
.h { grid-area: 7 / 1 / 8 / 2; } 
.i { grid-area: 7 / 3 / 8 / 6; } 
.j { grid-area: 10 / 1 / 9 / 6; }
```

[back to top](#top)

**自定义网格线配合关键词span合并单元格**: 
![](https://i.imgur.com/ZghaD8I.jpg)

```css
.wrapper {
  display: grid;
  /*grid-template-columns: (col) 100px (gutter) 50px (col) 100px (gutter) 50px (col) 100px (gutter) 50px (col) 100px (gutter) 50px (col) 100px (gutter) 50px (col) 100px (gutter); 
  grid-template-rows: (row) auto (gutter) 50px (row) auto (gutter) 50px (row) auto (gutter) 50px (row) auto;*/
  /* 使用repeat关键词来简化 */
  grid-template-columns:repeat(6, (col) 100px (gutter) 10px); 
  grid-template-rows: repeat(4, (row) auto (gutter) 10px );
}
.box {
  background-color: #444;
  color: #fff;
  font-size: 150%;
  padding: 20px;
  text-align: center;
  margin: 10px;
}
.a { grid-column: col / span gutter 2; grid-row: row; } 
.b { grid-column: col 3 / span gutter 2; grid-row: row; } 
.c { grid-column: col 5 / span gutter 2; grid-row: row; } 
.d { grid-column: col / span gutter 3; grid-row: row 2; } 
.e { grid-column: col 4 / span gutter 3; grid-row: row 2; } 
.f { grid-column: col / span gutter 2; grid-row: row 3; } 
.g { grid-column: col 3 / span gutter 1; grid-row: row 3; } 
.h { grid-column: col 4 / span gutter 2; grid-row: row 3; } 
.i { grid-column: col 6 / span gutter 1; grid-row: row 3; } 
.j { grid-column: col / span gutter 6; grid-row: row 4; }
```

[back to top](#top)

<h2 id="显式和隐式网格线">3. 显式和隐式网格线</h2>

- 网格单元格不在这些网格线范围内时，浏览器将会创建一个隐式的网格线
- 浏览器根据需要创建了需要的网格线，如果显式的网格线是六条，但单元格放在超过显式网格线的时候，其他网格轨道空间将会合并为０

![](https://i.imgur.com/Tqv2DdH.jpg)

- grid-template-columns定义的列网格线是1~8，grid-template-rows定义的行网格线是1~6。
- grid-area将.j的行网格线定义超出预设的显式网格线，多出7和8。 line7和line8是浏览器自动为网格创建的两条网格线，而这两条网格线，在CSS Grid Layout称为隐式网格线
- i, j轨道空间合并为０

```css
.wrapper { 
  display: grid; 
  grid-template-columns: 100px 10px 100px 10px 100px 10px 100px; 
  grid-template-rows: auto 10px auto 10px auto 10px auto 10px auto; 
} 
.a{ grid-area: 1 / 1 / 2 / 2; } 
.b { grid-area: 1 / 3 / 2 / 4; } 
.c { grid-area: 1 / 5 / 2 / 6; } 
.d { grid-area: 1 / 7 / 2 / 8; } 
.e { grid-area: 3 / 1 / 4 / 2; } 
.f { grid-area: 3 / 3 / 4 / 4; } 
.g { grid-area: 3 / 5 / 4 / 6; } 
/* 超过显式网格线的时候，其他网格轨道空间将会合并为０ */
/*.h { grid-area: 3 / 7 / 4 / 8; } 
.i { grid-area: 5 / 1 / 6 / 8; background-color: orange; } 
.j { grid-area: 7 / 1 / 8 / 8; background-color:green }*/
.h { grid-area: 5/ 1 / 6 / 8; } 
.i { grid-area: 10 / 1 / 11 / 8; background-color: orange; } 
.j { grid-area: 12 / 1 / 16 / 8; background-color:green }
```

**列隐式网格线**: 同样的道理，浏览器创建的隐式列网格线，组成的网格轨道空间也会合并成０

```css
.a{ grid-area: 1 / 1 / 2 / 2; } 
.b { grid-area: 1 / 3 / 2 / 4; } 
.c { grid-area: 1 / 5 / 2 / 6; } 
.d { grid-area: 1 / 7 / 2 / 8; } 
.e { grid-area: 3 / 1 / 4 / 2; } 
.f { grid-area: 3 / 3 / 4 / 4; } 
.g { grid-area: 3 / 5 / 4 / 6; } 
.h { grid-area: 3 / 7 / 4 / 8; } 
.i { grid-area: 1 / 11 / 2 / 12; background-color: orange; } 
.j { grid-area: 1 / 13 / 2 / 14; background-color:green }
```

[back to top](#top)

<h2 id="网格区域">4. 网格区域 grid-area</h2>

![Grid Area](https://i.imgur.com/OKgjGmh.jpg)

- 网格线定义网格区域, 见上
- grid-template-areas定义网格区域，如下

```html
<style>
body {  padding: 50px;}
.wrapper { 
  display: grid; 
  grid-template-columns: 220px 20px 220px 20px 220px; 
  grid-template-rows: auto; 
  grid-template-areas: 
  "header header header header header" 
  "sidebar . content content content" 
  "footer footer footer footer footer" 
} 
.box { 
  background-color: #444; 
  color: #fff; 
  font-size: 150%; 
  padding: 20px; 
  text-align: center; 
  margin-bottom: 20px;   /*模拟行与行的间距 */
}
.header { grid-area: header; } 
.content { grid-area: content; } 
.sidebar { 
  grid-area: sidebar;
  background-color: orange;
  box-sizing: border-box;    /*自适应高度 */
  height: calc(100% -20px);  /*自适应高度 */
} 
.footer { grid-area: footer; }
</style>
<div class="wrapper">
  <div class="header box">Header Area</div> 
  <div class="content box">
    <h2>Content Area</h2> 
    <ul> 
      <li>List item</li> 
      <li>List item</li> 
      <li>List item</li> 
      <li>List item</li> 
    </ul>
  </div> 
  <div class="sidebar box">Sidebar Area</div> 
  <div class="footer box">Footer Area</div>
</div>
```

**Responsive Layout**

![](https://i.imgur.com/uqMJcNA.png)

```html
<style>
body { padding: 40px;} 
.wrapper {background-color: #fff; color: #444;}
.box { 
  font-size: 150%; 
  padding: 10px; 
  text-align: center;
}
.header { grid-area: header; } 
.content { grid-area: content; background-color: #444; color: #fff; } 
.sidebar { 
  grid-area: sidebar;
  background-color: #ccc; color: #444;
  box-sizing: border-box;    /*自适应高度 */
  height: calc(100% -20px);  /*自适应高度 */
} 
.sidebar2 { grid-area: sidebar2; background-color: #ccc; color: #444; }
.footer { grid-area: footer; }
@media only screen and (min-width: 400px) and (max-width: 540px) { 
  .wrapper { 
    display: grid; 
    grid-template-columns: 20% 5% auto; 
    grid-template-rows: auto; 
    grid-template-areas: 
    "header header header" 
    "sidebar . content" 
    "sidebar2 sidebar2 sidebar2" 
    "footer footer footer"; } 
} 
@media only screen and (min-width: 540px) { 
  .wrapper { 
    display: grid; 
    grid-template-columns: 100px 10px auto 10px 100px; 
    grid-template-rows: auto; 
    grid-template-areas: 
      "header header header header header" 
      "sidebar . content . sidebar2" 
      "footer footer footer footer footer";
      max-width: 600px; 
   } 
}
</style>
<div class="wrapper">
  <div class="header box">Header Area</div> 
  <div class="content box">
    <h2>Content Area</h2> 
    <ul> 
      <li>List item</li> 
      <li>List item</li> 
      <li>List item</li> 
      <li>List item</li> 
    </ul>
  </div> 
  <div class="sidebar box">Sidebar Area</div> 
  <div class="sidebar2 box">Sidebar 2 Area</div> 
  <div class="footer box">Footer Area</div>
</div>
```

[back to top](#top)

<h2 id="独立源与网格的层叠顺序">5. 独立源与网格的层叠顺序</h2>

- **网格布局中的独立源**: 说得简单点，源指就是HTML结构, 这些HTML的标签元素称为源，而这些源的出现的顺序被称为内容流
- 在CSS Grid Layout中，HTML文档流(<body>中的元素)出现的顺序并不重要，只要元素标签的父元素被声明了是网格容器, 即只要关注子元素和父元素的层级关系
- **在CSS Grid Layout中具有独立的源（文档流），实现任何布局效果，完全不需要考虑文档流结构的先后顺序，只需要根据设计需求，调整网格单元格位置**

![](https://i.imgur.com/Xfxp7ZL.jpg)

<h2 id="网格的流动">6. 网格的流动</h2>

- 网格单元格在没有被显式设置明确位置时，浏览器将会自动为这些网格单元格的位置进行计算，按照先后顺序从左向右，或从上到下排列。在这里把这种方式称之为网格的流动
- `grid-auto-flow: column/row;`

![](https://i.imgur.com/gEcc57p.png)

```HTML
<style>
.box { 
  background: orange; height: 100px; line-height: 100px; text-align: center; color: #fff; font-size: 3em;
  margin: 5px 15px 5px 0;
} 
.box:nth-child(even){ background: green; } 
.wrapper { 
  width: 560px;    /*为保证box的宽度为100px，改为560px */
  border: 1px solid orange; 
  padding: 15px; 
  margin: 20px auto; 
  display: grid; 
  grid-template-columns: repeat(5, 115px); /*为保证box的宽度为100px， 改为115px*/
  /*grid-template-rows: auto ; */
  grid-template-rows: 115px 115px 115px; 
  grid-auto-flow: row;
}
</style>
<div class="wrapper"> 
  <div class="box a">A</div> 
  <div class="box b">B</div> 
  <div class="box c">C</div> 
  <div class="box d">D</div> 
  <div class="box e">E</div> 
  <div class="box f">F</div> 
  <div class="box h">H</div> 
  <div class="box i">I</div> 
  <div class="box j">J</div> 
  <div class="box k">K</div> 
  <div class="box l">L</div> 
  <div class="box m">M</div> 
  <div class="box n">N</div> 
  <div class="box o">O</div> 
</div>
```

[back to top](#top)

> References
> - [CSS Grid布局：什么是网格布局](https://www.w3cplus.com/css3/what-is-css-grid-layout.html)
> - [CSS Grid布局：网格单元格布局](https://www.w3cplus.com/css3/line-base-placement-layout.html)
