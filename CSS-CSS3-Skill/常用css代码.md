[目录](top)

- [1. 垂直居中](#垂直居中)
- [2. 文字截断](#文字截断)
- [3. :nth-child() 选择器写法  兼容ie8以上](#选择器写法)
- [4. Will-Change](#Will-Change)
- [5. Linking（链接）的技巧](#Linking链接的技巧)

<h3 id="垂直居中">1. 垂直居中</h3>

```css
.verticalcenter{
    position: relative;
    top: 50%;
    -ms-transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
}
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
