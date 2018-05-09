- [Grid Layout概述](#Grid-Layout概述)
- [一些重要概念](#一些重要概念)

### Grid Layout概述

[CSS Grid](https://www.w3cplus.com/blog/tags/355.html)是一个强大的工具，它允许在Web上创建二维布局, 网格布局并不是为了取代弹性盒，相反，它是弹性盒的一种补充, 可以往弹性容器中放入网格，也可以在网格块中加入flex元素

- 网格容器: 通过display属性设置属性值为grid或inline-grid可以创建一个网格容器
- 网格项目: 网格容器中的所有子元素就会自动变成网格项目（grid item）

| 名称|css |说明|
| :------------- | :------------- | :------------- |
|网格容器|`display: grid;`| 网格项目默认放在行中，并且跨网格容器的全宽<br>![](https://i.imgur.com/sCfcjLL.png)|
|网格容器|`display: inline-grid;` |![](https://i.imgur.com/9FKTav1.png)|
|网格项目的列|grid-template-columns |可以是任何非负值，长度可以是px、%、em|
|网格项目的行|grid-template-rows |可以是任何非负值，长度可以是px、%、em|

- chrome浏览器开启示例功能: chrome://flags/#enable-experimental-web-platform-features

### 一些重要概念

- **fr单位**: 一个弹列的网格轨道。它代表了网格容器中可用的空间（就像Flexbox中无单位的值）
  - 当fr和其它长度单位的值结合在一起的时候，fr是基于网格容器可用空间来计算
  - `grid-template-columns: 3rem 25% 1fr 2fr`  --> 1fr=(网格宽度-3rem-网格宽度*25%)/3
- **网格轨道最小和最大尺寸minmax()**: minmax()函数接受两个参数：第一个参数定义网格轨道的最小值，第二个参数定义网格轨道的最大值。可以接受任何长度值，也接受auto值。auto值允许网格轨道基于内容的尺寸拉伸或挤压
  - `grid-template-rows: minmax(100px, auto);`            --> 第一行的高度最小值是100px，但其最大值为auto，允许行高可以变大超过100px
  - `grid-template-columns: minmax(auto, 50%) 1fr 3em;`   --> 第一列设置了最小值为auto，但它的最大值是50%，也就是列的最大宽度不会超过网格容器宽度的50%
- **重复网格轨道repeat()**  -->repeat()函数接受两个参数：第一个参数定义网格轨道应该重复的次数，第二个参数定义每个轨道的尺寸
  - `grid-template-rows: repeat(4, 100px);`
  - `grid-template-columns: 30px repeat(3, 1fr) 30px;`   --> 1fr=(网格宽度-30px-30px)/3
- **间距grid-column-gap和grid-row-gap** --> 列与列，行与行之间的间距，可以是任何非负值，长度值可以是px、%、em等
  - 注：不能创建列和行与网格容器边缘的间距
  - grid-gaps 是grid-row-gap和grid-column-gap两个属性的缩写, 
    - `grid-gap: 100px 1em;` 等价于 `grid-column-gap: 100px; grid-row-gap: 1em;`
    - `grid-gap: 2rem;` 等价于 `grid-column-gap: 2rem; grid-row-gap: 2rem;`
- **网格线**:  `grid-row-start`,`grid-row-end`,`grid-column-start`,`grid-column-end`

> Reference
> - [学习CSS Grid](https://www.w3cplus.com/css/learncssgrid.html)
> - [CSS Grid和Flexbox解决实际的布局问题](https://www.w3cplus.com/css3/css-grid-flexbox-solving-real-world-problems.html)
