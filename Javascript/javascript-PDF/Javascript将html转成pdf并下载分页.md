[Javascript将html转成pdf并下载分页](#top)

- [1. html2canvas API](#html2canvas)
- [2. jsPDF库](#jsPDF库)
    - [2.1 jsPDF库的基本使用](#jsPDF库的基本使用)
    - [2.2 html2canvas + jsPDF](#html2canvas+jsPDF)
    - [2.3 使用jsPDF分页](#使用jsPDF分页)

<h2 id="html2canvas">1. html2canvas API</h2>

- 直接在浏览器端使用html2canvas,对整个或局部页面进行‘截图’。但这并不是真的截图，而是通过遍历页面DOM结构，收集所有元素信息及相应样式，渲染出canvas-image
- html2canvas只能将它能处理的生成canvas-image，因此渲染出来的结果并不是100%与原来一致。但它不需要服务器参与，整个图片都由客户端浏览器生成，使用很方便

```html
<script type="text/javascript" src="./html2canvas.js"></script>
<script type="text/javascript">
 html2canvas(document.body, {
   onrendered:function(canvas) {
      document.body.appendChild(canvas);  // onrendered方法，可以将生成的canvas进行回调
   }
})
</script>

```

[back to top](#top)

<h2 id="jsPDF库">2. jsPDF库</h2>

- jsPDF库可以用于浏览器端生成PDF

<h3 id="jsPDF库的基本使用">2.1 jsPDF库的基本使用</h3>

```javascript
/*1) 文字生成PDF */
// 默认a4大小，竖直方向，mm单位的PDF
var doc = new jsPDF();
doc.text('Download PDF!', 10, 10);    // 添加文本‘Download PDF’
doc.save('a4.pdf');
/*2) 图片生成PDF */
// 三个参数，第一个方向，第二个单位，第三个尺寸格式
var doc = new jsPDF('landscape', 'pt', [205, 115])
var imageData = ‘data:image/png; base64, iVBORw0KGgo...’;   // 将图片转化为dataUrl
doc.addImage(imageData, 'PNG', 0, 0, 205, 115);
doc.save('a4.pdf');
/*3) 文字与图片生成PDF*/
// 三个参数，第一个方向，第二个尺寸，第三个尺寸格式
var doc = new jsPDF('landscape','pt',[205, 155])
var imageData = ‘data:image/png;base64,iVBORw0KGgo...’;   // 将图片转化为dataUrl
doc.setFontSize(20);   //设置字体大小
doc.text('Stone', 10, 20);   //10,20这两参数控制文字距离左边，与上边的距离
doc.addImage(imageData, 'PNG', 0, 40, 205, 115);   // 0, 40, 控制文字距离左边，与上边的距离
doc.save('a4.pdf')
```

<h3 id="html2canvas+jsPDF">2.2 html2canvas + jsPDF</h3>

- 生成pdf需要把转化的元素添加到jsPDF实例中，也有添加html的功能，但某些元素无法生成在pdf中，因此可以使用html2canvas + jsPDF的方式将页面转成pdf。通过html2canvas将遍历页面元素，并渲染生成canvas，然后将canvas图片格式添加到jsPDF实例，生成pdf

```html
<script type="text/javascript" src="./js/jsPdf.debug.js"></script>
<script type="text/javascript">
      var downPdf = document.getElementById("renderPdf");
      downPdf.onclick = function() {
          html2canvas(document.body, {
              onrendered:function(canvas) {
                  //返回图片dataURL，参数：图片格式和清晰度(0-1)
                  var pageData = canvas.toDataURL('image/jpeg', 1.0);
                  //方向默认竖直，尺寸ponits，格式a4[595.28,841.89]
                  var pdf = new jsPDF('', 'pt', 'a4');
                  //addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
                  pdf.addImage(pageData, 'JPEG', 0, 0, 595.28, 592.28/canvas.width * canvas.height );
                  pdf.save('stone.pdf');
              }
          })
      }
</script>
```

<h3 id="使用jsPDF分页+jsPDF">2.3 使用jsPDF分页</h3>

- jsPDF提供了一个很有用的API，addPage()，可以通过pdf.addPage()，来添加一页pdf，然后通过pdf.addImage(...)，将图片赋予这页pdf来显示
- 超过jsPDF实例格式尺寸的内容不显示: `var pdf = new jsPDF('', 'pt', 'a4');` demo中就是a4纸的尺寸
    - 虽然每一页pdf上显示的图片是相同的，但我们通过调整图片的位置，产生了分页的错觉。以第二页为例，将竖直方向上的偏移设置为-841.89即一张a4纸的高度，又因为超过a4纸高度范围的图片不显示，所以第二页显示了图片竖直方向上[841.89,1682.78]范围内的内容，这就得到了分页的效果，以此类推
- addImage有两个参数可以控制图片在pdf中的位置

```javascript
html2canvas(document.body, {
    onrendered: function (canvas) {
        var contentWidth = canvas.width;
        var contentHeight = canvas.height;
        var pageHeight = contentWidth / 595.28 * 841.89;   //一页pdf显示html页面生成的canvas高度;
        var leftHeight = contentHeight;    //未生成pdf的html页面高度
        var position = 0;   //pdf页面偏移
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高

        //两边留边距 imgWidth, imgHeight
        var imgWidth = 555.28;
        var imgHeight = 555.28 / contentWidth * contentHeight;
        var pageData = canvas.toDataURL('image/jpeg', 1.0);
        var pdf = new jsPDF('', 'pt', 'a4');
        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
            pdf.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight);
        } else {
            while (leftHeight > 0) {
                pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
                leftHeight -= pageHeight;
                position -= 841.89;
                //避免添加空白页
                if (leftHeight > 0) {
                    pdf.addPage();
                }
            }
        }
        pdf.save('content.pdf');
    }
})
```

- [github demo](https://github.com/linwalker/render-html-to-pdf)
- [Javascript将html转成pdf,下载（html2canvas 和 jsPDF）](https://blog.csdn.net/github_38771368/article/details/78730126)
