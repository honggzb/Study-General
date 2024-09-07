[纯CSS实现垂直居中](#top)

- [方法1：table-cell](#table-cell)
- [方法2：display:flex](#方法2)
- [方法3：绝对定位和负边距](#方法3)
- [方法4：绝对定位和0](#方法4)
- [方法5：translate](#方法5)
- [方法6：display:inline-block](#方法6)
- [方法7：display:flex和margin:auto](#方法7)
- [方法8：display:-webkit-box](#方法8)
- [Flexbox制作CSS布局](#Flexbox制作CSS布局)

<h3 id="table-cell">方法1：table-cell</h3>

```html
<div class="box box1">
    <span>垂直居中</span>
</div>
<style>
.box1{
    display: table-cell;
    vertical-align: middle;
    text-align: center;        
}
</style>
```

[back to top](#top)

<h3 id="方法2">方法2：display:flex</h3>

```css
.box2{
    display: flex;
    justify-content:center;
    align-items:Center;
}
```

[back to top](#top)

<h3 id="方法2">方法2：display:flex</h3>

```css
.box2{
    display: flex;
    justify-content:center;
    align-items:Center;
}
```

[back to top](#top)

<h3 id="方法3">方法3：绝对定位和负边距</h3>

```css
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
```

[back to top](#top)

<h3 id="方法4">方法4：绝对定位和0</h3>

```css
.box4 span{
  width: 50%; 
  height: 50%; 
  background: #000;
  overflow: auto; 
  margin: auto; 
  position: absolute; 
  top: 0; left: 0; bottom: 0; right: 0; 
}
```

[back to top](#top)

<h3 id="方法5">方法5：translate</h3>

```css
.box6 span{
            position: absolute;
            top:50%;
            left:50%;
            width:100%;
            transform:translate(-50%,-50%);
            text-align: center;
}
```

[back to top](#top)

<h3 id="方法6">方法6：display:inline-block</h3>

```css
.box7{
  text-align:center;
  font-size:0;
}
.box7 span{
  vertical-align:middle;
  display:inline-block;
  font-size:16px;
}
.box7:after{    /* 巧妙...通过:after来占位 */
  content:'';
  width:0;
  height:100%;
  display:inline-block;
  vertical-align:middle;
}
```

[back to top](#top)

<h3 id="方法7">方法7：display:flex和margin:auto</h3>

```css
box8{
    display: flex;
    text-align: center;
}
.box8 span{margin: auto;}
```

[back to top](#top)

<h3 id="方法8">方法8：display:-webkit-box</h3>

```css
.box9{
    display: -webkit-box;
    -webkit-box-pack:center;
    -webkit-box-align:center;
    -webkit-box-orient: vertical;
    text-align: center
}
```

[back to top](#top)

<h3 id="Flexbox制作CSS布局">Flexbox制作CSS布局</h3>

```css
body {
  display: flex;
  justify-content: center;   /* 水平居中  */
  align-items: center;       /* 垂直居中   */
}	
```

**An interactive slideshow with flex-order- Flex独立的源顺序**

把元素移动到所有盒子元素的左边，也就是直接移到标题的后面。我们可以使用"order"属性来实现。默认情况下，伸缩项目的order值是0，他们是按照文档流顺序排列

```css
header {
   -prefix-box-ordinal-group: 1; 
   /* old spec; must be positive旧的规范中，设置顺序（box-ordinal-group）属性值只接受一个正整数 */
   -ms-flex-order: -1;           /* IE 10 syntax */
   order: -1;                    /* new syntax */
}
section[aria-pressed="true"] { 
   /*aria-pressed="true":  WAI-ARIR属性和属性值，当用户点击其中某个section元素时，就会自动加上*/
   /* Set order lower than 0 so it moves before other section elements,
      except old spec, where it must be positive.
 */
   -prefix-box-ordinal-group: 1;
   -ms-flex-order: -1;
   order: -1;
   -prefix-box-flex: 3;
   flex: 3;
   max-width: 370px;             /* Stops it from getting too wide. */
}
```

[back to top](#top)

- [纯CSS实现垂直居中的几种方法](http://www.cnblogs.com/hutuzhu/p/4450850.html)
- [Flexbox Is As Easy As Pie – Designing CSS Layouts](https://www.smashingmagazine.com/2013/05/centering-elements-with-flexbox/)
- [Flexbox制作CSS布局易如反掌](http://www.w3cplus.com/css3/designing-css-layout-with-flexbox.html)
