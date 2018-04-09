[常用css代码](top)

- [1. 垂直居中](#垂直居中)
    - 方法1：table-cell
    - 方法2：display:flex
    - 方法3：绝对定位和负边距
    - 方法4：绝对定位和0
    - 方法5：translate
    - 方法6：display:inline-block
    - 方法7：display:flex和margin:auto
    - 方法8：display:-webkit-box
    - 方法9：display:-webkit-box
- [2. 文字截断](#文字截断)
- [3. :nth-child() 选择器写法  兼容ie8以上](#选择器写法)
- [4. Will-Change](#Will-Change)
- [5. Linking（链接）的技巧](#Linking链接的技巧)
- [6. 当input选中的时候出现一个边框](#当input选中的时候出现一个边框)
- [7. 元素内容是否可被编辑（html）](#元素内容是否可被编辑（html）)
- [8. video可在页面中播放，而不是全屏播放](#video可在页面中播放，而不是全屏播放)
- [9. user-select禁止选中文本](#select禁止选中文本)
- [10. webkit-scroller自定义浏览器滚动条](#scroller自定义浏览器滚动条)
- [11. webkit-appearance去除默认样式](#appearance去除默认样式)
- [12. 使用CSS transforms 或者 animations时可能会有页面闪烁的bug](#animations时可能会有页面闪烁的bug)
- [13. transform-style: preserve-3d 让元素支持3D](#让元素支持3D)
- [14. perspective 这个属性定义子元素会获得透视效果，而不是元素本身](#这个属性定义子元素会获得透视效果，而不是元素本身)
- [15. font-smoothing 设置字体平滑，会让字体看起来比较舒服](#设置字体平滑，会让字体看起来比较舒服)
- [16. ::selection 修改选中文本颜色 -可美化被鼠标选中的文字的样式](#修改选中文本颜色)
- [17. CSS里的:target伪选择器](#CSS里的伪选择器)

<h2 id="垂直居中">1. 垂直居中</h2>

```html
<div class="box box1">
    <span>垂直居中</span>
</div>
```

[纯CSS实现垂直居中的几种方法](http://www.cnblogs.com/hutuzhu/p/4450850.html)

```css
/* 方法1：table-cell */
.box1{
    display: table-cell;
    vertical-align: middle;
    text-align: center;        
}
/* 方法2：display:flex */
.box2{
    display: flex;
    justify-content:center;
    align-items:Center;
}
/* 方法3：绝对定位和负边距 */
.box3{position:relative;}
.box3 span{
            position: absolute;
            width:100px;
            height: 50px;
            top:50%;
            left:50%;
            margin-left:-50px;
            margin-top:-25px;
            text-align: center;
}
/* 方法4：绝对定位和0 */
.box4 span{
  width: 50%; 
  height: 50%; 
  background: #000;
  overflow: auto; 
  margin: auto; 
  position: absolute; 
  top: 0; left: 0; bottom: 0; right: 0; 
}
/* 这种方法跟上面的有些类似，但是这里是通过margin:auto和top,left,right,bottom都设置为0实现居中，很神奇吧。不过这里得确定内部元素的高度，可以用百分比，比较适合移动端 */

/* 方法5：translate */
.box6 span{
            position: absolute;
            top:50%;
            left:50%;
            width:100%;
            transform:translate(-50%,-50%);
            text-align: center;
}
/* 或 */
.verticalcenter{
    position: relative;
    top: 50%;
    -ms-transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
}
/* 方法6：display:inline-block */
.box7{
  text-align:center;
  font-size:0;
}
.box7 span{
  vertical-align:middle;
  display:inline-block;
  font-size:16px;
}
.box7:after{
  content:'';
  width:0;
  height:100%;
  display:inline-block;
  vertical-align:middle;
}
/* 这种方法确实巧妙...通过:after来占位 */
/* 方法7：display:flex和margin:auto */
.box8{
    display: flex;
    text-align: center;
}
.box8 span{margin: auto;}
/* 方法8：display:-webkit-box */
.box9{
    display: -webkit-box;
    -webkit-box-pack:center;
    -webkit-box-align:center;
    -webkit-box-orient: vertical;
    text-align: center
}
/* 方法9：display:-webkit-box */
/* 在 content 元素外插入一个 div。 content 清除浮动，并显示在中间 */
<div class="floater"></div>  
<div class="content"> Content here </div>  
.floater {
    float:left; 
    height:50%; 
    margin-bottom:-120px;
}
.content {
    clear:both; 
    height:240px; 
    position:relative;
}
/*优点： 
适用于所有浏览器 
没有足够空间时(例如：窗口缩小) content 不会被截断，滚动条出现
缺点： 
需要额外的空元素了*/
```

[back to top](#top)

<h2 id="文字截断">2. 文字截断</h2>

```css
/*常用的一种可兼容但是只截断一行：*/
.nowrap {
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis;        // IE
  -o-text-overflow: ellipsis;    //Opera
  -icab-text-overflow: ellipsis; //iCab
  -khtml-text-overflow: ellipsis;  //Konqueror Safari
  -moz-text-overflow: ellipsis;  //Firefox,mozilla
  -webkit-text-overflow: ellipsis;    //Safari,Swift 
}
/* 不太兼容但是可以截断多行*/
.nowrap { display:-webkit-box; overflow:hidden; text-overflow:ellipsis; -webkit-box-orient:vertical; -webkit-line-clamp:1; 
}
.nowrap2 { display:-webkit-box; overflow:hidden; text-overflow:ellipsis; -webkit-box-orient:vertical; -webkit-line-clamp:2; 
}
.nowrap3 { display:-webkit-box; overflow:hidden; text-overflow:ellipsis; -webkit-box-orient:vertical; -webkit-line-clamp:3; 
}
```

[back to top](#top)

<h2 id="选择器写法">3. :nth-child() 选择器写法  兼容ie8以上</h2>

选择器写法|功能
---|---
p:first-of-type |选择第一个 p 
p:last-of-type|选择最后一个 p
li:nth-child(2)|选择第二个li 
p:nth-of-type(odd)|单排的 p
p:nth-of-type(even) |双排的 p
p:nth-of-type(2n+0)| 第2n个p

[back to top](#top)

<h2 id="Linking链接的技巧">5. Linking（链接）的技巧</h2>

```css
a[href^="http://"] {
    background:transparent url(../images/external.png) center right no-repeat;
    display:inline-block;
    padding-right:15px;
}
a[href$='.pdf'] {
    background:transparent url(../images/pdf.png) center left no-repeat;
}
a[href^="mailto:"] {
    background:transparent url(../images/mailto.png) center left no-repeat;
}
/*比如说“.zip”、“.rar”、“.gzip”文件，如果想给这类链接设置同一个“icon”*/
a[href$='.zip'], a[href$='.rar'], a[href$='.gzip'] {
    background:transparent url(../images/zip.png) center left no-repeat;
    display:inline-block;
    padding-left:20px;
}
<a href="#" lang="fr">En Français</a>
<a href="#" lang="zh">中国</a>
a[lang|='zh'] {
    background: url('lang.gif') no-repeat 0 50%;
}
```

[back to top](#top)

<h2 id="当input选中的时候出现一个边框">6. 当input选中的时候出现一个边框</h2>

`textarea:focus, input:focus{ outline: none;}   /*一般设置成 none*/`

<h2 id="元素内容是否可被编辑（html）">7. 元素内容是否可被编辑（html）</h2>

`<div id="example-one" contenteditable="true">`

```css
#example-one { margin-bottom: 10px; }
[contenteditable="true"] { padding: 10px; outline: 2px dashed #CCC; }
[contenteditable="true"]:hover { outline: 2px dashed #0090D2; }
```

<h2 id="video可在页面中播放，而不是全屏播放">8. video可在页面中播放，而不是全屏播放</h2>

`<video id="myvideo" src="test.mp4" webkit-playsinline="true"></video>`

<h2 id="select禁止选中文本">9. user-select禁止选中文本</h2>

```css
p { -webkit-user-select: none; /* Chrome, Opera, Safari */ 
-moz-user-select: none;        /* Firefox 2+ */ 
-ms-user-select: none;         /* IE 10+ */ 
user-select: none;             /* Standard syntax */}
```

<h2 id="scroller自定义浏览器滚动条">10. webkit-scroller自定义浏览器滚动条</h2>

```css
/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
div::-webkit-scrollbar { width: 5px; height: 5px; background-color: rgba(245, 245, 245, 0.47);}
/*定义滚动条的轨道，内阴影及圆角*/
div::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3); border-radius: 10px; background-color: #f5f5f5;}
/*定义滑块，内阴影及圆角*/
div::-webkit-scrollbar-thumb { /*width: 10px;*/ height: 20px; border-radius: 10px; -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3); background-color: rgba(85, 85, 85, 0.25);}
```

[back to top](#top)

<h2 id="appearance去除默认样式">11. webkit-appearance去除默认样式</h2>

`input, button, textarea, select { *font-size: 100%; -webkit-appearance:none;}`

<h2 id="appearance去除默认样式">12. 使用CSS transforms 或者 animations时可能会有页面闪烁的bug</h2>

`elements { -webkit-backface-visibility: hidden; }`

<h2 id="让元素支持3D">13. transform-style: preserve-3d 让元素支持3D</h2>

```css
elements {
    -webkit-transform: rotateY(60deg); /* Chrome, Safari, Opera */
    -webkit-transform-style: preserve-3d; /* Chrome, Safari, Opera */
    transform: rotateY(60deg);
    transform-style: preserve-3d;
}
```

[back to top](#top)

<h2 id="这个属性定义子元素会获得透视效果，而不是元素本身">14. perspective 这个属性定义子元素会获得透视效果，而不是元素本身</h2>

```html
<div class="cube pers250">
    <div class="face front">1</div>
    <div class="face back">2</div>
    <div class="face right">3</div>
    <div class="face left">4</div>
    <div class="face top">5</div>
    <div class="face bottom">6</div>
</div>
<style>
.cube {
  width: 100%;
  height: 100%;
  backface-visibility: visible;
  perspective-origin: 150% 150%;
  transform-style: preserve-3d;
  -webkit-backface-visibility: visible;
  -webkit-perspective-origin: 150% 150%;
  -webkit-transform-style: preserve-3d;
}
.pers250 {
  perspective: 250px;
  -webkit-perspective: 250px;
}
.face {
  display: block;
  position: absolute;
  width: 100px;
  height: 100px;
   border: none;
  line-height: 100px;
  font-family: sans-serif;
  font-size: 60px;
  color: white;
  text-align: center;
}
</style>
```

[back to top](#top)

<h2 id="设置字体平滑，会让字体看起来比较舒服">15. font-smoothing 设置字体平滑，会让字体看起来比较舒服</h2>

```css
h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6, p, .navbar, .brand, a, .td-name, td {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: "Microsoft YaHei", "微软雅黑", 'Muli', "Helvetica", Arial, sans-serif;
}
```


<h2 id="修改选中文本颜色">16. ::selection 修改选中文本颜色 -可美化被鼠标选中的文字的样式</h2>

```css
::selection {
    color: white;
    background-color: rgba(0, 0, 0, 0.8);    /*或lightblue*/
}
::-webkit-selection {
    color: white;
    background-color: rgba(0, 0, 0, 0.8);
}
::-moz-selection {
    color: white;
    background-color: rgba(0, 0, 0, 0.8);
}
```

[back to top](#top)

<h2 id="CSS里的伪选择器">17. CSS里的:target伪选择器</h2>

当浏览器地址里的hash(地址里#号后面的部分)和:target伪选择器指定的ID匹配上时，它的样式就会在这个ID元素上生效

```css
/* would apply to all targetted elements */
:target { color: #000;}
/* applies to H2's */
h2:target { color: #f00; }
```

[back to top](#top)

> References

- [aming的小屋](http://www.qdfuns.com/house/26716/note)
- [八个制作Linking（链接）的技巧](http://www.w3cplus.com/blog/180.html)
- [被遗忘的CSS](https://segmentfault.com/a/1190000014217217)
