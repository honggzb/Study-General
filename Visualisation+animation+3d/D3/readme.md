- D3.js是一个JavaScript库（是一个**被数据驱动**的文档），用于在浏览器中创建交互式可视化. D3.js库允许我们在数据集的上下文中操作网页的元素.这些元素可以是HTML，SVG，或画布元素，可以根据数据集的内容进行引入，删除或编辑.它是一个用于**操作DOM对象**的库. D3.js可以成为数据探索的宝贵帮助，它可以控制数据的表示，并允许添加交互性.
- Highcharts 是一个用纯JavaScript编写的一个图表库， 能够很简单便捷的在web网站或是web应用程序添加有交互性的图表,HighCharts支持的图表类型有曲线图、区域图、柱状图、饼状图、散状点图和综合图表

|libs|是否免费/开源|难度|兼容性|
|---|---|---|---|
|Highcharts|非商业免费，商业需授权，代码开源|基于SVG，方便自己定制，但图表类型有限|兼容IE6及以上的所有主流浏览器，完美支持移动端缩放、手势操作|
|D3|完全免费，代码开源|基于SVG，方便自己定制；D3.v4支持Canvas+SVG，如果计算比较密集，也可以选择用Canvas。<br>除此之外，D3图表类型非常丰富，几乎可以满足所有开发需求，但代码相对于以上两个插件来说，会稍微难一点|兼容IE9 及以上的所有主流浏览器，对于移动端的兼容性也同上|
|Echarts|完全免费，代码开源|基于Canvas，适用于数据量比较大的情况|兼容 IE6 及以上的所有主流浏览器，同样支持移动端的缩放和手势操作|

---------------------------------------------------------------------------------------------------

```
│   ├── D3/
│   │   ├── 00.prepare/
│   │   │   └── mockServer代码和说明
│   │   ├── 2. basic-axis-scale/
│   │   │   ├── d3-2.中文坐标轴.html
│   │   │   ├── d3-2.带网格的坐标轴1.html
│   │   │   ├── d3-2.带网格的坐标轴2.html
│   │   │   ├── d3-2.散点图.html
│   │   │   ├── d3-2.散点图之使用坐标轴.html
│   │   │   └── 
│   │   ├── 3.barGraph/
│   │   │   ├── d3-1.条形图.html	Rename D3/barGraph/d3-1.条形图.html
│   │   │   ├── d3-3.dragEvents.html
│   │   │   ├── d3-3.events.html
│   │   │   ├── d3-3.柱状图1水平柱状图.html
│   │   │   ├── d3-3.柱状图2垂直柱状图.htm
│   │   │   ├── d3-3.柱状图2垂直柱状图1.html
│   │   │   ├── d3-3.柱状图3动画过渡.html
│   │   │   ├── d3-3.柱状图4Wrapping Long Labels.html
│   │   │   ├── d3-3.柱状图4sortable.html
│   │   │   ├── d3-3.柱状图4使用字母刻度.html
│   │   │   └── 
│   │   ├── 4.line-areaGraph/
│   │   │   ├── d3-4.线性图表-curve interpolation comparison.htm
│   │   │   ├── d3-4.线性图表.html
│   │   │   ├── d3-4.线性图表2-Segmented Lines.html
│   │   │   ├── d3-4.线性图表2-Thershold Lines.html
│   │   │   ├── d3-4.线性图表2-折线+图表.html	Create d3-4.线性图表2-折线+图表.html
│   │   │   ├── d3-4.线性图表2-时间轴.html	Add files
│   │   │   ├── d3-4.线性图表3-多行折线+线内标注.html
│   │   │   ├── d3-4.线性图表3-多行折线.htm
│   │   │   ├── d3-4.线性图表3-多行折线1-circle+tooltip.html	Update d3-4.线性图表3-多行折线1-circle+tooltip.htm
│   │   │   ├── d3-4.面积图表.html
│   │   │   ├── d3-4.面积图表之二元面积图.html
│   │   │   ├── d3-4.饼图圆环图1.html
│   │   │   ├── d3-4.饼图圆环图2.html
│   │   │   └── 
│   │   ├── 5.others/
│   │   │   ├── d3-5.Stack.html
│   │   │   ├── d3-5.Tree+可收缩思维导图.html
│   │   │   ├── d3-5.Tree-collasible.html
│   │   │   ├── d3-5.Tree-horizontal-collasible-rect-node.html	Create d3-5.Tree-horizontal-collasible-rect-node.html
│   │   │   ├── d3-5.Tree-use-flat-data.html	Rename d3-5.Tree-use-fla-data.html to d3-5.Tree-use-flat-data.html
│   │   │   ├── d3-5.Tree-vertical tree.html	Create d3-5.Tree-vertical tree.html
│   │   │   ├── d3-5.Tree-with-different-nodes.html	Create d3-5.Tree-with-different-nodes.html
│   │   │   ├── d3-5.chord.html	Update d3-5.chord.html
│   │   │   ├── d3-5.horizontal stack bar chart.html
│   │   │   ├── d3-5.horizontal stack bar chart.html	
│   │   │   ├── d3-5.力矩散点图+图例.html
│   │   │   ├── d3-5.散点图+toggleButton.html
│   │   │   ├── d3-航线数据可视化.html
│   │   │   ├── d3-6.treemap+tooltip.html   #2023year
│   │   │   └── d3-7.heatmap+tooltip.html   #2023year
│   │   ├── 6.animation/
│   │   │   ├── Transition Easing Comparison in v4.html	Create Transition Easing Comparison in v4.html
│   │   │   ├── d3-6.动画之条形图排序+删除增加bar-function.html	Update d3-6.动画之条形图排序+删除增加bar-function.html
│   │   │   ├── d3-6.动画之条形图排序+删除增加bar.html	Create d3-6.动画之条形图排序+删除增加bar.html
│   │   │   ├── d3-6.动画之条形图排序切换.html
│   │   │   └── 
│   │   ├── 7.D3-angular-2/
│   │   ├── 8.Map/
│   │   │   ├── d3-8.Choropleth Map-tooltip.html     #2023year
│   │   │   ├── d3-8.basic-map.html
│   │   │   ├── d3-8.map-tooltip.html
│   │   │   └── 
│   │   ├── 9.D3-react/
│   │   ├── book/
│   │   │   ├── 2017-VegaLite-InfoVis(斯坦福的数据可视化论文).pdf
│   │   │   ├── D3.js tips and tricks-v4.pdf
│   │   │   ├── D3.js+By+Example[ww.java1234.com].pdf
│   │   │   ├── D3.js_in_action.pdf	Add files
│   │   │   ├── Practical_D3.js-Apress_2016(Tarek_Amr_Rayna_Stamboliyska).pdf
│   │   │   ├── react+d3js[www.java1234.com].pdf
│   │   │   ├── readme.md	Create readme.md
│   │   │   ├── 《D3.js数据可视化实战手册 》迷你书.pdf
│   │   │   ├── 数据可视化实战(使用D3设计交互式图表).pdf
│   │   │   ├── 数据可视化实战-d3db.pdf
│   │   │   └──
│   │   ├── D3 的学习- version 45.md
│   │   ├── D3之d3-selection原理.md
│   │   ├── d3-3.events.html
│   │   ├── d3-3.柱状图3动画过渡.html
│   │   ├── todo-list.md
│   │   └── file-list.md
```

## D3 thirdparty libraries

- [ag-charts](https://charts.ag-grid.com/) - react, angular, vue
  - [ag-charts-react](https://charts.ag-grid.com/react/quick-start/)
  - [ag-charts-angular](https://charts.ag-grid.com/angular/quick-start/)
 
## resources

- [D3.js version 5 数据可视化学习](https://github.com/yanlele/D3.js-learning/tree/master)
