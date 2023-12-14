[Highcharts-study](#top)

## Basic

### 图表主要组成 

![图表主要组成](图表主要组成.png)

### 图表容器

```javascript
//1、通过构造函数
var charts = Highcharts.chart('container', {
  // Highcharts 配置
});
//2、或者通过 chart.renderTo 来指定
var charts = Highcharts.chart({
    // Highcharts 配置
    chart : {
        renderTo : 'container'  // 或 document.getElementById('container')
    }
}); 
//3、如果你的页面已经引入了 jQuery，那么还可以 jQuery 插件的形式调用
$("#container").highcharts({
    // Highcharts 配置  
}); 
```

### 图表样式

### 事件

|事件|说明|效果|
|---|---|---|
|click |图表点击事件|[效果](https://jshare.com.cn/highcharts/hhhhhg)|
|load |图表加载完后事件|[效果](https://jshare.com.cn/highcharts/hhhhyj)|
|addSeries |图表增加序列事件|[效果](https://jshare.com.cn/highcharts/hhhhhj)|
|drilldown |图表下钻事件|[效果](https://jshare.com.cn/highcharts/hhhhys)|
|drillup | 图表上钻事件|[效果](https://jshare.com.cn/highcharts/hhhhys)|
|redraw |图表重绘事件|[效果](https://jshare.com.cn/highcharts/hhhhyg)|
|selection | 图表范围选择事件|[效果](https://jshare.com.cn/highcharts/hhhhqG)|
|beforePrint | 图表打印前事件|[效果](https://jshare.com.cn/highcharts/HNF0bj/1)|
|afterPrint | 图表打印后事件|[效果](https://jshare.com.cn/highcharts/HNF0bj)|

### 其他配置

1. 图表类型: 通过 `chart.type` 来指定图表类型，表示如果默认图表类型，即如果 series 中没有指定 type， 那么图表的类型就由该属性来确定。highcharts 支持的所有图表类型见 plotOptions。
2. 图表缩放: 图表缩放包括缩放（zoom）和平移（pan），对应的属性有：
   - zoomType ： 缩放类型，值可以是 “x”、“y”、“xy”，分别表示水平缩放、竖直缩放、平面缩放
   - 缩放恢复按钮：可以指定按钮的样式、位置等，见 resetZoomButton，按钮的文字可以通过 lang 中的属性来指定
   - selectionMarkerFill ：选中背景色，详细参考 API 文档
   - panKey：平移键，默认是 “Shift”，即在启用平移后，按住指定的按键即可对图表进行平移操作，在线试一试
   - panning ： 是否启用平移，启用平移后，按住平移键，然后就可以用鼠标对图表进行平移操作（即平移操作是平移键加鼠标拖动）
3. 3D 属性: Highcharts 4.0 开始支持 3D 图表类型，目前支持 3D 柱形图、3D 饼图、3D 散点图
4. 其他
   - 图表反转 ： 图表反转指的是将图表的 x轴和 y轴进行对调操作，对应的只需要设置 chart.inverted = true 即可。
   - 图表动画 ：chart.animation 可以设置图表的全局动画效果，这里的动画指的是图表更新时的动画效果，而图表初始化的动画是在 plotOptions.series.animation 中启用和关闭的。
   - 图表自适应 ：前面说过通过设置图表容器的 min-width 可以让图表自适应，这个开关对应的属性是 chart.reflow，另外，还可以通过 API 接口 Chart.reflow 在外部对图表进行自适应操作，在线试一试

[⬆ back to top](#top)

## Data handle


[⬆ back to top](#top)

> References
- [highcharts official](https://www.highcharts.com/)
- [Highcharts中文官网](https://www.hcharts.cn/)
- https://www.npmjs.com/package/highcharts-angular


