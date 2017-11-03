[目录](top)

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
    - 
- [2. 文字截断](#文字截断)
- [3. :nth-child() 选择器写法  兼容ie8以上](#选择器写法)
- [4. Will-Change](#Will-Change)
- [5. Linking（链接）的技巧](#Linking链接的技巧)

<h3 id="垂直居中">1. 垂直居中</h3>

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

<h3 id="文字截断">2. 文字截断</h3>

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

<h3 id="选择器写法">3. :nth-child() 选择器写法  兼容ie8以上</h3>

选择器写法|功能
---|---
p:first-of-type |选择第一个 p 
p:last-of-type|选择最后一个 p
li:nth-child(2)|选择第二个li 
p:nth-of-type(odd)|单排的 p
p:nth-of-type(even) |双排的 p
p:nth-of-type(2n+0)| 第2n个p

[back to top](#top)

<h3 id="Linking链接的技巧">5. Linking（链接）的技巧</h3>

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
> References

- [aming的小屋](http://www.qdfuns.com/house/26716/note)
- [八个制作Linking（链接）的技巧](http://www.w3cplus.com/blog/180.html)
