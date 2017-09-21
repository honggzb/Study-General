<table cellspacing="0" cellpadding="5">
  <thead> 
      <th align="center">页面坐标api</th>
      <th align="center">说明</th>
      <th></th>
  </thead>
  <tbody> 
    <tr border="1">
      <td rowspan="2" align="center">网页可见区域</td>
      <td>网页可见区域宽</td>
      <td>document.body.clientWidth;</td>
    </tr>
    <tr border="1">
      <td>网页可见区域高</td>
      <td>document.body.clientHeight;</td>
    </tr>
    <tr border="1">
      <td rowspan="2" align="center">网页可见区域(包括边线的宽)</td>
      <td>网页可见区域宽</td>
      <td>document.body.offsetWidth(包括边线的宽)</td>
    </tr>
    <tr border="1">
      <td>网页可见区域高</td>
      <td>document.body.offsetHeight;(包括边线的宽)</td>
    </tr>
    <tr border="1">
      <td rowspan="2">网页正文全文</td>
      <td>网页正文全文宽</td>
      <td>document.body.scrollWidth;</td>
    </tr>
    <tr>
      <td>网页正文全文高</td>
      <td>document.body.scrollHeight;</td>
    </tr>
    <tr border="1">
      <td rowspan="2" align="center">网页被卷去的</td>
      <td>网页被卷去的左</td>
      <td>document.body.scrollLeft;</td>
    </tr>
    <tr>
      <td>网页被卷去的高</td>
      <td>document.body.scrollTop;</td>
    </tr>
    <tr border="1">
      <td rowspan="2" align="center">网页正文部分</td>
      <td>网页正文部分上</td>
      <td>window.screenTop; //返回当前窗口距离屏幕顶端的距离</td>
    </tr>
    <tr>
      <td>网页正文部分左</td>
      <td>window.screenLeft;</td>
    </tr>
    <tr>
      <td rowspan="2" align="center">屏幕</td>
      <td>屏幕的高</td>
      <td>window.screen.height;</td>
    </tr>
    <tr>
      <td>屏幕的宽</td>
      <td>window.screen.width;</td>
    </tr>
    <tr border="1">
      <td rowspan="2" align="center">屏幕可用工作区</td>
      <td>屏幕可用工作区高度</td>
      <td>window.screen.availHeight;</td>
    </tr>
    <tr>
      <td>屏幕可用工作区宽度</td>
      <td>window.screen.availWidth;</td>
    </tr>
  </tbody>
</table>

![](https://i.imgur.com/Kd3r5pp.png)

| Header One     | Header Two     |
| :------------- | :------------- |
|scrollHeight|获取对象的滚动高度|
|scrollLeft|设置或获取位于对象左边界和窗口中目前可见内容的最左端之间的距离|
|scrollTop|设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离|
|scrollWidth|获取对象的滚动宽度|
|offsetHeight|获取对象相对于版面或由父坐标 offsetParent 属性指定的父坐标的高度|
|offsetLeft|获取对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置|
|offsetTop|获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置|
|event.clientX|相对文档的水平座标|
|event.clientY|相对文档的垂直座标|
|event.offsetX|相对容器的水平坐标|
|event.offsetY|相对容器的垂直坐标|
|document.documentElement.scrollTop|垂直方向滚动的值|
|event.clientX+document.documentElement.scrollTop|相对文档的水平座标+垂直方向滚动的量|
