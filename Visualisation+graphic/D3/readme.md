[D3 的学习- version 4/5](#top)

- [1. 数据和数据绑定](#数据绑定)
- [补充1. 使用数据文件-- d3-fetc](#使用数据文件)
- [补充2. Elements, attributes and styles](#Elements)
- [补充3: transition过度和动画, event listener, zoom/pan/drag behavior](#transition)
- [2. 比例尺和坐标轴](#比例尺和坐标轴)
  - [2.1 比例尺](#比例尺)
    - [2.1.1 比例尺种类](#比例尺种类)
    - [2.1.2 比例尺的操作](#比例尺的操作)
  - [2.2 坐标轴](#坐标轴)
- [补充1. 使用数据文件-- d3-fetch](#使用数据文件)
- [补充2: transition过度和动画, event listener, zoom/pan/drag behavior](#transition)
- [补充3. shape](#shape)
- [3. 柱状图](#柱状图)
- [4. 曲线和图表](#曲线和线性图标)
- [5. path transition](#path)
- [6. Map的制作](https://github.com/honggzb/Study-General/tree/master/D3/8.Map)
- [Reference && Resource](#bottom)

-----------------------
|操作|方法|
|--|--|
|用D3操作DOM元素|`d3.select(selector)` 返回匹配选择器的第一个元素<br>`d3.selectAll(selector)` 返回匹配选择器所有元素<br>`selection.append(type)` 创建新元素并返回该元素<br>`selection.remove()` 从DOM中移除当前元素<br>`selection.attr(name[,value])` 取得或设置属性的值<br>`selection.style(name[,value[,priority]])` 取得或设置元素的样式|
|在DOM元素中绑定数据|`selection.datum([value])` 为每个元素绑定值value<br>`selection.data([data[,key]])` 为每个元素分别绑定对应data中数据值<br>`selection.enter()` 为缺失的元素返回占位符<br>`selection.exit()` 返回没有被绑定数据的元素|
|交互与动画|`selection.transition([name])`|

- 选择元素语法: 
  - `d3.select('body').append('p').text('some text');`
  - `d3.selectAll('p');`
- set up mock server by using express-generator

```shell
express d3MockServer
npm Install
npm start
# localhost:3000
#change to use HTML in Express instead of Jade
#// app.js
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
#// routes/index.js
router.get('/', function(req, res, next) {
  res.render('public/index', { title: 'Express mock server' });
});
#create your html view in /public directory
```

-------

<h2 id="数据绑定">1. 数据和数据绑定</h2>

- D3可以处理的数据类型
  - JS的数据类型： 如数字，时间，字符串，布尔值，数组，对象等
  - D3自定义的数据类型: 如集合（Set）,映射（Map）,嵌套（Nest）,及各种颜色空间（RGB，HSL，L*a*b，HSV）对象等
- D3的数据绑定: `data(dataset).enter().append('el')`
- D3的数据使用: `function(d){ //... } `, d就是dataset中的数据

```JavaScript
var dataset = [ 5, 10, 15, 20, 25 ];
d3.select("body").selectAll("p")      //1) 选择集： 对所有的p进行操作
    .data(dataset)
    .enter()                          //2) 数据绑定到选择集
    .append("p")
    .text(function(d){                //3) 为选择集设置属性
      return "I can count up to " + d;
    })
    .style('color', function(d){     //3) 为选择集设置属性
      if(d>15){
        return 'red';
      }else{
        return 'black';
      }
    })`
```

**d3数据绑定之三种data states**：[Thinking with Joins](https://bost.ocks.org/mike/join/)

![states](https://i.imgur.com/wzBiAIj.png)

```JavaScript
// expand-in
circle.enter().append("circle")
      .attr("r", 0)
      .transition()
      .attr("r", 2.5);
//shrink-out
circle.exit().transition()
      .attr("r", 0)
      .remove();
```

**案例1： 用层画条形图**

```html
<style>
div.bar {
  display: inline-block;
  width: 20px;
  margin-right: 2px;
  background-color: teal;
}
</style>
<script>
//随机生成0-30的整数
var dataset = [];
for (var i = 0; i < 25; i++) {
    var newNumber = Math.round(Math.random() * 30);  //随机生成0-30的整数
    dataset.push(newNumber);
}
d3.select("body").selectAll("div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("height", function(d) {
        return (d * 5) + "px";
    });
</script>
```

**案例2：绘制SVG**

| Header One     | Header Two     |
| :------------- | :------------- |
| Item One       | Item Two       |

```JavaScript
var dataset = [ 5, 10, 15, 20, 25 ];
// SVG尺寸
var w = 500, h = 50;      //整个svg画布
var svg = d3.select('body')
      .append('svg')
      .attr("width", w)
      .attr("height", h);
svg.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('cx', function(d, i){
          return (i*50)+25;
        })
        .attr('cy', h/2)
        .attr('r',function(d){
          return d;
        })
        .attr('fill', 'teal');
```

**案例3： 使用svg改写上面条形图**

```JavaScript
var w = 500, h = 100, barPadding = 1;
var svg = d3.select('body')
      .append('svg')
      .attr("width", w)
      .attr("height", h);
svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('x', function(d, i){
          return i*(w/dataset.length);    
        })
        .attr('y',function(d){
          return h-(d*4);     
        })
        .attr('width', w/dataset.length - barPadding)   //条宽 = (w / dataset.length）: 固定值
        .attr('height', function(d){
          return d*4;                        //条高 = 条长-纵坐标（纵坐标是从上到下计算，即下方向为正）
        })
        .attr('fill',function(d){           //颜色
          return "rgb(0, 0,"+ (d*20) +")";
        });
//文本标记（数值）
svg.selectAll('text')
   .data(dataset)
   .enter()
   .append('text')
   .text(function(d) { return d; })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i){
     return i*(w/dataset.length)+(w/dataset.length-barPadding)/2;
   })
   .attr("y", function(d){
     return h - (d*4) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white");
```

[back to top](#top)

<h2 id="使用数据文件">补充1. 使用数据文件-- d3-fetch</h2>

[d3-fetch](https://github.com/d3/d3-fetch)

- d3.blob - get a file as a blob.
- d3.buffer - get a file as an array buffer.
- d3.csv - get a comma-separated values (CSV) file.
- d3.dsv - get a delimiter-separated values (CSV) file.
- d3.image - get an image.
- d3.json - get a JSON file.
- d3.text - get a plain text file.
- d3.tsv - get a tab-separated values (TSV) file.

[back to top](#top)

<h2 id="Elements">补充2. Elements, attributes and style</h2>

```JavaScript
/* circle */
holder.append("circle") // attach a circle
      .attr("cx", 200) // position the x-center
      .attr("cy", 100) // position the y-center
      .attr("r", 50); // set the radius
/* ellipse */
holder.append("ellipse") // attach an ellipse
      .attr("cx", 200) // position the x-centre
      .attr("cy", 100) // position the y-centre
      .attr("rx", 100) // set the x radius
      .attr("ry", 50); // set the y radius
/* rectangle */
holder.append("rect") // attach a rectangle
      .attr("x", 100) // position the left of the rectangle
      .attr("y", 50) // position the top of the rectangle
      .attr("height", 100) // set the height
      .attr("width", 200); // set the width
      .attr("rx", 10)   // rx: The radius curve of the corner of the rectangle in the x dimension (optional).
      .attr("ry", 10)   // ry: The radius curve of the corner of the rectangle in the y dimension (optional).
/* line */
holder.append("line") // attach a line
      .style("stroke", "black") // colour the line
      .attr("x1", 100) // x position of the first end of the line
      .attr("y1", 50) // y position of the first end of the line
      .attr("x2", 300) // x position of the second end of the line
      .attr("y2", 150); // y position of the second end of the line 
/* polyline */
holder.append("polyline") // attach a polyline
      .style("stroke", "black") // colour the line
      .style("fill", "none") // remove any fill colour
      .attr("points", "100,50, 200,150, 300,50"); // x,y points
/* polygon - 闭合的polyline*/
holder.append("polygon") // attach a polygon
      .style("stroke", "black") // colour the line
      .style("fill", "none") // remove any fill colour
      .attr("points", "100,50, 200,150, 300,50"); // x,y points
/* path */
holder.append("path") // attach a path
      .style("stroke", "black") // colour the line
      .style("fill", "none") // remove any fill colour
      .attr("d", "M 100,50, L 200,150, L 300,50 Z"); // path commands
    // first moves (M) to 100,50 then draws a line (L) to 200,150 then draws another line (L) to 300,50 then closes the path (Z). 
```

[back to top](#top)

<h2 id="transition">补充3: transition过度和动画, event listener, zoom/pan/drag behavior</h2>

```html
<p>Elastic</p>
<div class="elastic" style="width:100px; height:50px; background-color:red"></div>
<p>Bounce</p>
<div class="bounce" style="width:100px; height:50px; background-color:red"></div>
<p>Back</p>
<div class="back" style="width:100px; height:50px; background-color:red"></div>
<script>
  function applyTransition(selection, ease, delay) {
        selection.transition()                //1) transition()
        .ease(ease)                           //2) 
        .delay(delay)                         //3) 
        .duration(2000)                       //4) 
        .style("transform", "translateX(400px)")
        .style("background-color", "blue");
      }
      d3.select("div.elastic")
        .call(applyTransition, d3.easeElastic, 1000)
      d3.select("div.bounce")
        .call(applyTransition, d3.easeBounce, 2000);
      d3.select("div.back")
        .call(applyTransition, d3.easeBack, 4000);
</script>
```

**transtion chaining**

```javascript
d3.select("div.shape")
  // Transition 1
  .transition()
    .delay(1000)
    .duration(2000)
    .style("background-color", "red")
    .style("border-radius", "50%")
  // Transition 2
  .transition()
    .delay(1000)
    .duration(2000)
    .style("background-color", "blue")
    .style("border-radius", "0px")
```

**transitional events**

D3 provides `.on()` method to register an event listener

```javascript
d3.select("svg")
  .on("mouseover", function() { // register a listener for the mouseover event
        printPosition();
    });
d3.select("text")
  .text(d3.mouse(svg.node()));     //current group:   svg.node()
//  
d3.select("div")
    .transition()
    .delay(1000)
    .duration(2000)
    .style("background-color", "red")
    .style("border-radius", "50%")
    .on("start", function() { console.log("Started"); })
    .on("end", function() { console.log("Finished"); })
```

**zoom,  pan behavior**:   http://jsbin.com/catuvab/7/edit?html,output

```javascript
var width = 500, height = 400, r = 10;
var data = [
        [width / 2 - r, height / 2 - r],
        [width / 2 - r, height / 2 + r],
        [width / 2 + r, height / 2 - r],
        [width / 2 + r, height / 2 + r]
];
// 1) create a new zoom behavior using d3.zoom():
var zoom = d3.zoom()
            .scaleExtent([1, 10])       //defines how much zoom is allowed
            .on("zoom", zoomed);        //register a zoom event listener and zoom/pan
// 2) create a svg container which should respond to zoom or pan event
var svgG =  d3.select("body")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .style("border", "1px solid")
              .call(zoom) // This is how we attach zoom behavior to the container
              .append("g")
// 3) create a zoom or pan target
svgG.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", r)
        .attr("transform", function (d) {
              return "translate(" + d + ")";
         });
// 4) define the event listener function ‘zoomed’
function zoomed() {
  svgG.attr("transform", "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ") scale(" + d3.event.transform.k + ")");
}
```

**drag behavior**

```javascript
// 1) create a new drag behavior:
var drag = d3.drag()
             .on("drag", dragged);
// 2) attached an event listener for the drag event. D3 also provides hooks for start of the drag and end of the drag 
d3.drag()
  .on("start", started) // after a new pointer becomes active (on mousedown or touchstart).
  .on("drag", dragged) // after an active pointer moves (on mousemove or touchmove).
  .on("end", ended); // after an active pointer becomes inactive (on mouseup, touchend or touchcancel).
// 3) call the drag function on a selection
d3.select(".draggable")
  .call(drag);
// 4) define the event handler function ‘dragged’
function dragged() {
  var x = d3.event.x; // Get current x position
  var y = d3.event.y; // Get current y position
  d3.select(this)
      // Translate the selection to the current x and y position
      .attr("transform", "translate(" + x + "," + y + ")");
}
```

> - [Table of Progressv](https://bl.ocks.org/mbostock/1468715)
> - [D3 Show Reel](https://bl.ocks.org/mbostock/1256572)
> - [Donut Transitions](https://bl.ocks.org/mbostock/4341417)

[back to top](#top)

<h2 id="shape">补充3. shape</h2>

- line generator
- line interpolators (curves): http://jsbin.com/sosude/3/edit?html,output
  - linear: d3.curveLinear
  - linearClosed: d3.curveLinearClosed
  - basis: d3.curveBasis
  - basisClosed: d3.curveBasisClosed
  - cardinal: d3.curveCardinal
  - cardinalClosed: d3.curveCardinalClosed
  - step: d3.curveStep    : 直方图
  - stepBefore: d3.curveStepBefore
  - stepAfter: d3.curveStepAfter
  - bundle: d3.curveBundle
- area generator
- area interpolation: 同line interpolators
- arc generator:   [圆环图, 闭合和不闭合](http://jsbin.com/fafaqu/6/edit?html,output)
  - innerRadius(r) : If r > 0, it will create an annulus (donut) arc with the inner radius of the arc as r.
  - outerRadius(r) : This sets the outer radius of the arc.
  - startAngle(angle) : Sets the start angle of the arc. The angle is in radians with 0 at –y (12 o’clock) and positive angles proceeding clockwise.
  - endAngle(angle) :  Sets the start angle of the arc. The angle is in radians with 0 at –y (12 o’clock) and positive angles proceeding clockwise.
- using pie generator to draw a pie chart and donut chart: http://jsbin.com/waliye/8/edit?html,output
  - data – the corresponding element in the input data array.
  - value – the numeric value of the arc.
  - index – the zero-based sorted index of the arc.
  - startAngle – the start angle of the arc.
  - endAngle – the end angle of the arc.
  - padAngle – the pad angle of the arc.
- arc transition:  using `attrTween()`

```javascript
// 1) line generator: Sample data points to draw a line
var data = [
	{x: 0, y: 4},
	{x: 1, y: 9},
	{x: 2, y: 6},
	{x: 4, y: 5},
	{x: 6, y: 7},
	{x: 7, y: 3},
	{x: 9, y: 2}
];
var line = d3.line() 
    .x(function(d) { return xScale(d.x); })
    .y(function(d) { return yScale(d.y); });
// Create a path element and set its d attribute value using the line generator created above	
svgContainer.append("path")
            .attr("d", line(data))    //new feature to pass data set to line generator
            .attr("fill", "none")
            .attr("stroke", "red")
// 2) line interpolators (curves)
var line = d3.line()
             .x(function(d) { return xScale(d.x); })
             .y(function(d) { return yScale(d.y); })
             .curve(d3.curveBasis); // Specifies the curve type (interpolation)
// 3) area generator
var area = d3.area()
            .x(function(d) { return xScale(d.x); })
            .y0(yScale(0))
            .y1(function(d) { return yScale(d.y); })
// 4) arc generator
var area = d3.area()
            .x(function(d) { return xScale(d.x); })
            .y0(yScale(0))
            .y1(function(d) { return yScale(d.y); })
            .curve(d3.curveBasis)
// 5) pie generator
 var width = 500, height = 500, fullAngle = 2 * Math.PI;
 var arc1 = d3.arc()
          .innerRadius(0)
          .outerRadius(100)
          .startAngle(0)
          .endAngle(fullAngle/4);  // 1/4圆
 var arc2 = d3.arc()
          .innerRadius(50)
          .outerRadius(100)
          .startAngle(0)
          .endAngle(fullAngle);     //闭合圆环
 var svgContainer = d3.select("body")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .style("border", "1px solid");
  var group1 = svgContainer.append("g");
  var group2 = svgContainer.append("g");
  group1.append("path")
          .attr("d", arc1())
          .attr("fill", "red");
  group2.append("path")
          .attr("d", arc2())
          .attr("fill", "blue");
  group1.attr("transform", "translate(" + 200 + "," + 200 + ")");
  group2.attr("transform", "translate(" + 200 + "," + 350 + ")");
// 6) using pie generator to draw a pie chart and donut chart:  
//      innerRadius(0)  --> pie chart, innerRadius(40) --> donut chart
  var width = 500, height = 500,
      color = d3.scaleOrdinal(d3.schemeCategory10);
  var svgContainer = d3.select("body")
        .append("svg")
          .attr("width", width)
          .attr("height", height)
          .style("border", "1px solid");
  var data = [1, 2, 1, 5, 6, 8, 10];
  var arc = d3.arc()
          .outerRadius(100)
          .innerRadius(40);
  var group = svgContainer.append("g")
          .attr("transform", "translate(" + 200 + "," + 250 + ")")
  var arcs = d3.pie()(data);
  arcs.forEach(function(d, i) {
    group.append("path")
         .attr("d", arc(d))
         .attr("fill", color(i)); 
  });
// 7) arc transition by using attrTween():   http://jsbin.com/kafinoh/16/edit?html,output
function render() {
    d3.select("g").remove();
    var arc = d3.arc()
                .outerRadius(100)
                .innerRadius(60);
    var group = svgContainer.append("g")
                            .attr("transform", "translate(" + 230 + "," + 210 + ")")
    var arcs = d3.pie()(data);
    arcs.forEach(function(d, i) {
          group.append("path")
            .attr("fill", color(i))
            .transition()
            .duration(2000)
            .attrTween("d", function() {     //transition: tween both start and end angle
              var start = {startAngle: 0, endAngle: 0};
              var interpolate = d3.interpolate(start, d);
              return function(t) {
                return arc(interpolate(t));
            };
          })
        });
}
setInterval(render, 3000);
```

[back to top](#top)

<h2 id="比例尺和坐标轴">2. 比例尺和坐标轴</h2>

- https://github.com/d3/d3-scale
- [Introducing d3-scale](https://medium.com/@mbostock/introducing-d3-scale-61980c51545f) by Mike Bostock
- [Chapter 7. Scales of Interactive Data Visualization for the Web](http://chimera.labs.oreilly.com/books/1230000000345/ch07.html) by Scott Murray
- [d3: scales, and color](http://www.jeromecukier.net/blog/2011/08/11/d3-scales-and-color/) by Jérôme Cukier

<h3 id="比例尺">2.1 比例尺</h3>

<h3 id="比例尺种类">2.1.1 比例尺种类</h3>

比例尺就是一个数据映射函数，比如线性比例尺可以实现类似y=ax+b的变换。D3一共有三类九种比例尺

![](https://i.imgur.com/lg936Is.png)

|scaleOrdinal|Grammer|
| :------------- | :------------- |
|Continuous (Linear, Power类似scaleSqrt的乘方比例尺, Log对数比例尺, Identity恒等比例尺, Time) |`d3.scaleLinear()`,`d3.scalePow()`, `d3.scaleLog()`,`d3.scaleIdentity()`, `d3.scaleTime()`|
|Sequential|`d3.scaleSequential()`|
|Quantize|`d3.scaleQuantize()`|
|Threshold|`d3.scaleThreshold()`|
|Ordinal (Band, Point)|` d3.scaleOrdinal([range])`, `d3. d3.scaleBand()`,`d3.scalePoint()`|

**常用比例尺映射关系**

| 常用比例尺 | code|映射关系|
| :------------- | :------------- |:------------- |
|线性比例尺|`d3.scaleLinear().domain([1,5]).range([0,100])`|![](https://i.imgur.com/RxE7xFJ.png)|
|序数比例尺|`d3.scaleBand().domain([1,2,3,4]).range([0,100])`|![](https://i.imgur.com/bASmEUz.png)|
|序数比例尺|` d3.scaleOrdinal()`<br>输入域和输出域都使用离散的数据<br>当输入不是domain()中的数据集时, domain()的值按照顺序循环依次对应range()的值|![](https://i.imgur.com/HWoBKkW.png)|
|量化比例尺|`d3.scaleQuantize().domain([0, 10]).range(['small', 'medium', 'long'])`<br>定义域是连续的，而输出域是离散的|![](https://i.imgur.com/ad2LwNV.png)|
|时间比例尺|`d3.scaleTime().domain([new Date(2017, 0, 1, 0), new Date(2017, 0, 1, 2)]).range([0,100])`|   |
|颜色比例尺|`d3.scaleOrdinal(d3.schemeCategory10)`|   |

**General code**

```JavaScript
scale(1) // 输出:0
scale(2) // 输出:25
scale(4) // 输出:75
scale(0)  // 输出:undefined, 当输入不是domain()中的数据集时
scale(10) // 输出:undefined, 当输入不是domain()中的数据集时
//量化比例尺
d3.scaleQuantize().domain([0, 10]).range(['small', 'medium', 'long'])
scale(1) // 输出:small
scale(5.5) // 输出:medium
scale(8) // 输出:long 
scale(-10) // 输出：small, domain()域外的情况
scale(10) // 输出：long, domain()域外的情况
//时间比例尺
d3.scaleTime()
  .domain([new Date(2017, 0, 1, 0), new Date(2017, 0, 1, 2)])
  .range([0,100])
scale(new Date(2017, 0, 1, 0)) // 输出:0
scale(new Date(2017, 0, 1, 1)) // 输出:50 
//颜色比例尺
let color = d3.scaleOrdinal(d3.schemeCategory10);   //序数颜色比例尺schemeCategory10,schemeCategory20 :10就是10种颜色，20就是20种
```

**1. d3.scaleLinear() 线性比例尺**, 有两个最重要的函数: 定义域和值域

- `d3.scaleLinear().domain([100, 500])`:  定义域范围(输入域)
- `d3.scaleLinear().range([10,350])`:     值域范围(输出域), 相当于将domain中的数据集映射到range的数据集中

```JavaScript
var linearScale = d3.scale.linear().domain([0,10000]).range([0,100]);
linearScale(1);      //0.01
linearScale(10);     // 0.1
linearScale(100);    // 1
linearScale(1000);   // 10
linearScale(10000);  // 100
```

**2.`d3.scaleOrdinal()` 序数比例尺**

**1) version 3**

![](https://i.imgur.com/kBC9otQ.jpg)

`d3.scaleOrdinal().domain([0, 1, 2]).rangeRoundBands([0, 100], 0.4, 0.1);`

- domain的参数数组有多少个元素，就会有多少个rangeBand
- rangeBand之间的间隔为padding*step（padding取值范围为0到1），它与rangeBand的关系是均分一个step
- 比如padding为0.4，则rangeBand的长度为0.6*step。根据上述代码可得最终坐标轴的长度等于(0.1+2+0.6+0.1)*step，由此算出step的长度，再推出外间距、rangeBand、内间距的长度。而定义域上的取值刻度定位在每个rangeBand的中间。于是得到了示意图中的坐标轴（红色标注）

```javascript
var dataset = {
 x: ["赵","钱","孙","李","周","吴","郑","王"],
 y: [40, 30, 50, 70, 90, 20, 10, 40]
};
var xScale =  d3.scale.ordinal()
                .domain(dataset.x)
                .rangeRoundBands([0, width - padding.left - padding.right],0,0);
```

**2) version 4**

version 4+ 没有bandwidth, 可转向使用scaleBand

```
domain 
range 
unknown 
copy 
d3.scaleImplicit
```

```JavaScript
var width = 500,height = 500,padding = {left:20,right:20};
var data = ["tang","song","yuan","ming","qing"];
var axis_length = width - padding.left - padding.right;
//d3.scaleImplicit = 200;
var svg = d3.select("body").append("svg")
            .attr("width",width)
            .attr("height",height)
var scale = d3.scaleOrdinal()
              .domain(data)
              .range([0,100,200,300,400])
// .unknown(500);	
console.log(scale("ceshi"));
var axis = d3.axisBottom()
             .scale(scale)
             .ticks(5)
svg.append("g").call(axis).attr("transform","translate("+ (padding.left) +","+(height - 100)+")");
```

**3. `d3.scaleBand()` 序数比例尺** 

- 并不是一个连续性的比例尺，domain()中使用一个数组，不过range()需要是一个连续域: `let scale = d3.scaleBand().domain([1,2,3,4]).range([0,100])`
- 示意图同`d3.scaleOrdinal()`

```
domain 
range ：设置输出范围 
round ：是否取整 
rangeRound ： 整合range and round 
paddingInner ： 设置paddingInner 【0，1】 
paddingOuter ： 设置paddingOuter 【0，1】 
padding：整合paddingInner and paddingOuter 
align ： 设置刻度位置 默认0.5 范围【0，1】 
bandwidth ：获取bandwidth 
step ： 获取step 
```

**4. `d3.schemeCategory10/20/20b/20c` 颜色序数比例** 

- v3:  schemeCategory10/20/20b/20c 曾经是归类在颜色比例尺。但实际使用确实是序数比例尺的用法。只不过range是色值
- v4: 归类到序数比例

```JavaScript
var color = d3.scaleOrdinal(d3.schemeCategory10);
//d3.scaleOrdinal([range]);
//添加【range】除了使用.range()外也可以在.scaleOrdinal()中作为参数；
//而实际使用一般是用做序数比例。只需再添加.domain()就好了
color.domain(["tang","song","yuan","ming","qing"]);
color("tang")//即可返回色值；
//当然不添加domain也可以；但是一般是在是在function(d){color(d)}中调用，倘若在此之前调用了color("唐")，则比例中的颜色则已经分配出去；这样怎么看都是不严谨的
```

<h3 id="比例尺的操作">2.1.2 比例尺的操作</h3>

**invert()与invertExtent()方法**

- 比例尺的例子都相当于一个正序的过程，从domain的数据集映射到range数据集中，那么有没有逆序的过程呢？D3中提供了invert()以及invertExtent()方法可以实这个过程
- 这两种方法只针对连续性比例尺有效，即domain()域为连续性数据集的比例尺

```JavaScript
let scale = d3.scaleLinear().domain([1,5]).range([0,100])
scale.invert(50) // 输出:3
let scale2 = d3.scaleQuantize().domain([0,10]).range(['small', 'big'])
scale2.invertExtent('small') // 输出:[0,5]
```

**坐标轴的缩放**

```JavaScript
// 1) 坐标轴的缩放
var xScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, function(d) { return d[0]; })])    //返回数组的最大元素
      .range([0, w]);
// 2）设定圆心的坐标
.attr("cx", function(d) {
    return xScale(d[0]);
})
.attr("cy", function(d) {
    return yScale(d[1]);
})
// 3) 设定文本坐标值
.attr("x", function(d) {
    return xScale(d[0]);
})
.attr("y", function(d) {
    return yScale(d[1]);
})
```

**Customizing Ticks**

- ticks() : This tells D3 how many ticks we want to render in the axis. But this is just a suggestion to D3. D3 can create slightly more or less ticks based on the available real estate and its own calculation.
- tickPadding() : Sets the space between tick labels and the axis.
- tickFormat() : Gives custom format to the labels

```JavaScript
var xAxis = d3.axisBottom(xScale)
    .ticks(5)
    .tickPadding(10)
    .tickFormat(function(d) { return d + "%"; })
```

<h3 id="坐标轴">2.2 坐标轴/</h3>

**创建坐标轴一般步骤**

```JavaScript
var width=600,  height=600，
margin = {top: 20, right: 0, bottom: 20, left: 0};
//
var svg = d3.select('body')
      .append('svg')
      .attr("width", width)
      .attr("height", height);
//2) 添加坐标轴g
var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//3) 创建比例尺:  坐标轴的线性比例尺
var xScale = d3.scaleLinear().domain([0,10]).range([0,300]);
var yScale = d3.scaleLinear().domain([0,10]).range([0,300]);
//4) 定义坐标轴
var xAxis=d3.axisBottom().scale(xScale);
var yAxis=d3.axisLeft().scale(yScale);
//5) 在svg中添加一个包含坐标轴各元素的g元素
svg.append("g")
   .attr("transform", "translate(0," + height + ")")    //平移到（0,height）
   .call(xAxis);                                        //添加x坐标轴
svg.append("g")
   .call(yAxis);                                        //添加y坐标轴
```

**各种坐标轴**

```JavaScript
let height = 400;
let width = 600;
//1) 从零开始的连续性x坐标轴
let x = d3.scaleLinear().range([0, width]);
let xScale = x.domain([0, 10]);
// x轴
let xAxis = svg.append('g')
               .attr('class', 'xAxis')
               .attr('transform', `translate(0, ${height})`)
               .call(d3.axisBottom(xScale));
//2) 时间型x坐标轴
let x = d3.scaleTime().range([0, width])
let xScale = x.domain([new Date(2017, 1), new Date(2017, 6)])
let xAxis = svg.append('g')
               .attr('class', 'xAxis')
               .attr('transform', `translate(0, ${height})`)
               .call(d3.axisBottom(xScale))
//3) 不从零开始的非连续性x坐标轴
let x = d3.scaleBand().range([0, width])
let xScale = x.domain(['北京', '上海', '广州', '深圳'])
let xAxis = svg.append('g')
               .attr('class', 'xAxis')
               .attr('transform', `translate(0, ${height})`)
               .call(d3.axisBottom(xScale))
//  从零开始的非连续性x坐标轴,使用d3.scaleOrdinal()
let x = d3.scaleOrdinal().range([150, 300, 450, 600])
let xScale = x.domain(['北京', '上海', '广州', '深圳'])
let xAxis = svg.append('g')
              .attr('class', 'xAxisis')
              .attr('transform', `translate(0, ${height})`)
              .call(d3.axisBottom(xScale)
```
[back to top](#top)

<h2 id="柱状图">3. 柱状图</h2>

[back to top](#top)

<h2 id="曲线和线性图标">4. 曲线和图表</h2>

![](https://i.imgur.com/osw4uh1.png)

- 线性图表: `d3.line()`
- 面积图表: `d3.area()`

```javascript
/*
curveLinear
curveStep
curveStepBefore
curveStepAfter
curveBasis
curveCardinal
curveMonotoneX
curveCatmullRom
*/
var curveArray = [
    {"d3Curve":d3.curveLinear,"curveTitle":"curveLinear"},
    {"d3Curve":d3.curveStep,"curveTitle":"curveStep"},
    {"d3Curve":d3.curveStepBefore,"curveTitle":"curveStepBefore"},
    {"d3Curve":d3.curveStepAfter,"curveTitle":"curveStepAfter"},
    {"d3Curve":d3.curveBasis,"curveTitle":"curveBasis"},
    {"d3Curve":d3.curveCardinal,"curveTitle":"curveCardinal"},
    {"d3Curve":d3.curveMonotoneX,"curveTitle":"curveMonotoneX"},
    {"d3Curve":d3.curveCatmullRom,"curveTitle":"curveCatmullRom"}
  ];
svg.append("path")
   .datum(data)
    .attr("class", "line")
        .style("stroke", function() { // Add the colours dynamically
                return daCurve.color = color(daCurve.curveTitle); })
        .attr("id", 'tag'+i) // assign ID
        .attr("d", d3.line()
                     .curve(daCurve.d3Curve)
                     .x(function(d) { return x(d.date); })
                     .y(function(d) { return y(d.close); })
                 );
```

path命令 | 参数 | 是否能重复 | 解释
---|---|---|---
M(m)| x, y| 不能 | 把笔尖移动到新位置，但因为没有落笔，不会“描绘图形”。所有的path都需要以m/M开头(绝对路径)
L(l)| x, y| 能 | 从当前点画一条直线到坐标x,y()相对路径)
H(h )| x|能 |画水平线，从当前点画一条水平线，到横坐标为X处
V(v )| y |能|画垂线，从当前点画一条垂线，到纵坐标为Y处
C(c)| x1 y1 x2 y2 x y| 能 | 绘制一条曲线。起点为当前点，终点为x,y.<br>使用(x1,y1)作为开始阶段曲线的控制点，使用 (x2,y2)作为结束阶段的控制点
S(s)| x2 y2 x y |能| 绘制一条平滑的曲线。 绘制一条以当前点为起点,x,y为终点绘制一条三次方贝塞尔曲线。<br>注意这是一个简写，这条曲线同样也有两个控制点，但此时x1 y1跟x2,y2是对称的，可以直接写x2y2这一个。
Q(q)| x1 y1 x y |能 |二次方贝塞尔曲线。绘制一条以当前点为起点,x,y为终点的二次方贝塞尔曲线。x1 y1为控制点
T(t)| x y| 能 |绘制二次方贝塞尔曲线的简写。绘制一条以当前点为起点,x,y为终点的二次方贝塞尔曲线。<br>控制点假定为前一个命令的控制点相对于当前点的反射。<br> 如果前一个命令不存在，或者前一个命令不是二次贝塞尔曲线命令或平滑的二次贝塞尔曲线命令，则此控制点就是当前点。
A(a)| rx ry x-axis-rotation large-arc-flag sweep-flag x y | 能|椭圆弧线命令在当前点与指定的终点 (x, y)之间创建一条椭圆弧线。
Z(z)|none |不能|闭合路径。会有一条线连接路径最后一个点与起点

[back to top](#top)

<h2 id="path">5. path transition</h2>

- [Tutorial](https://bost.ocks.org/mike/path/)
- [sample 1](https://bl.ocks.org/mbostock/1643051)
- [sample 2](https://bl.ocks.org/mbostock/1642874)
- [sample 3](https://bl.ocks.org/mbostock/1642989)

[back to top](#top)

------------------------------

<h2 id="bottom">Reference && Resource</h2>

> resources
- [NVD3](http://nvd3.org) Re-usable charts for d3.js
- [好奇猫](https://haoqicat.com/)
- [镜心的小树屋](https://github.com/JXtreehouse/D3_lessions/tree/master/03-barchart_horizontal)

------------------------------

> Reference
- [D3.js (v4) Essentials](http://rajapradhan.com/blogs/d3-js-v4-essentials/)
- [D3 的学习资料](http://www.ourd3js.com/wordpress/865/#more-865)
- [D3 Sample Gallery](https://bl.ocks.org/)
- [Mike Bostock’s Blocks- D3 Sample Gallery](https://bl.ocks.org/mbostock)-- useful
- [d3noob’s Blocks- D3 Sample Gallery](https://bl.ocks.org/d3noob)-- useful（入门级）
- [Tutorials- official recommend](https://github.com/d3/d3/wiki/Tutorials)
- [D3 in Depth](http://d3indepth.com/)
- [D3数据可视化系列教程](https://blog.csdn.net/column/details/zhangtianxu.html)
- [D3 Tutorial](https://www.dashingd3js.com/table-of-contents)
- [作者mbostock的博客](http://bl.ocks.org/mbostock)
- [D3 中文手册v4](https://github.com/xswei/d3js_doc)
- [官网案例](https://github.com/d3/d3/wiki/Gallery)
- [D3中常用的比例尺](https://segmentfault.com/a/1190000011006780)
- [如何用D3绘制各种样式的x坐标轴](https://segmentfault.com/a/1190000010910308)
- [D3 And Angular](https://www.dashingd3js.com/d3-resources/d3-and-angular)
- [The Full List In One Page](https://www.dashingd3js.com/d3-resources/the-big-list-of-d3-resources)
- [D3.js + Canvas 绘制组织结构图](https://juejin.cn/post/6844903615425937416)
-----------------------

> vue+d3.js
- [Shen Shuntian's github](https://github.com/ssthouse)
- [Shen Shuntian's Github Repository 可视化 (D3.js & Three.js)](https://juejin.cn/post/6844903694614413325)
- [vs文档](https://github.com/GopherJ/Vs)Vs 是一个基于 d3.js 和 vue.js 的数据可视化分析包，适用于图表，dashboard 制作
- [vs预览](https://gopherj.github.io/Vs/#/)
- [使用Vue与d3.js制作的一款弹框插件](https://segmentfault.com/a/1190000009888380)

-----------------------------------

> sample
- [Bubble chart](http://usabilityetc.github.io/demos/d3-country-bubble-chart/)
- [Pie && stack bar graph](http://otc2ysde8.bkt.clouddn.com/dimple/index.html)
- [Across U.S. Companies, Tax Rates Vary Greatly](https://archive.nytimes.com/www.nytimes.com/interactive/2013/05/25/sunday-review/corporate-taxes.html)
- [Dissecting a Trailer: The Parts of the Film That Make the Cut](https://archive.nytimes.com/www.nytimes.com/interactive/2013/02/19/movies/awardsseason/oscar-trailers.html)
- [Zoomable Treemap Bar Chart - with link of other complex sample](https://bl.ocks.org/tejaser/2d5045a7e90ac3fd250180d86bc16f99)
