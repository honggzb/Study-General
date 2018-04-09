- [利用CSS3的transform:translate](#利用CSS3的transform:translate)
- [利用Flexbox](#利用Flexbox)
- [利用translate3d](利用translate3d)

### 利用CSS3的transform:translate

```css
.center{
    width:50%;
    position: absolute;
    top: 50%;
    left: 50%;
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

/**translate3d**/
.box-center{
  text-align:center; 
  position:absolute; 
  left:50%; 
  top:50%; 
  -webkit-transform:translate3d(-50%,-50%,0); 
  transform:translate3d(-50%,-50%,0); 
  width:100%;
}
```

- 好处：
  - 内容高度可变
  - 代码量小
- 缺陷
  - 需要定义宽度
  - 会和其他transform样式有冲突
  - 某些情况下的边缘和字体渲染会有问题
- 兼容性：http://caniuse.com/#search=transform 在这里看到2d的兼容性还是很全面，Android2.x,ios3.x都兼容，推荐用

### 利用Flexbox

```css
.center {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
```

- 好处：
  - 内容可以是任意高宽，溢出也能表现良好
  - 可以用于各种高级布局技巧
- 注意：
  - 需要在body上写样式，或者需要额外容器
  - 需要各种厂商前缀兼容现代浏览器
  - 可能有潜在的性能问题
- 兼容性： 移动设备基本兼容，可以放心使用，不过很容易掉坑，慎用
