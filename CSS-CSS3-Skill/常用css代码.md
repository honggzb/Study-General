--[top](top)

- [1. 垂直居中](#垂直居中)
- [2. 文字截断](#文字截断)
- [3. :nth-child() 选择器写法  兼容ie8以上](#选择器写法)
- [4. Will-Change](#Will-Change)

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

> References

- [aming的小屋](http://www.qdfuns.com/house/26716/note)


