[Angular>2 + D3](#top)

- [1. Application Structure](#Structure)
- [2. SVG components with Angular](#SVG)
- [3. D3 and Change Detection](#Change)
- [4. D3 Zoom and Drag behaviors](#behaviors)

<h2 id="Structure">1. Application Structure</h2>

```shell
# Install D3 and Moment
npm install d3 moment --save
npm install @types/d3 --save-dev
ng new d3-angular
# Application Structure
├── d3
|   ├── models            # typing safety and robust instances of datum
|   |    ├── link.ts
|   |    ├── node.ts
|   |    └── force-directed-graph.ts
|   ├── directives        # implement d3 behaviors
|   |    ├── zoomable.directive.ts
|   |    └── draggable.directive.ts
|   └── d3.service.ts     # expose all the methods to be used by either d3 models and directives or external application components
├── visuals
|   ├── graph             # force-directed graph's root component that will generate the graph and bind it to the document
|   ├── shared
|   |    ├── link-visual
|   |    └── node-visual
|   └──  bar-chart        # seperate component for bar-chart(simple )
```

**Moment.js**

- [Moment.js](http://momentjs.com/): Parse, validate, manipulate, and display dates and times in JavaScript

| Format Type | code |Result|
| :------------- | :------------- |:------------- |
|Format Date|`moment().format('MMMM Do YYYY, h:mm:ss a');`| April 12th 2018, 9:31:30 am|
|Relative Time|`moment("20111031", "YYYYMMDD").fromNow();`| 6 years ago|
|Calendar Time|`moment().subtract(6, 'days').calendar();`| Last Friday at 9:33 AM|
|Multiple Locale Support|`moment.locale();`|en|

[back to top](#top)

<h2 id="SVG">2. SVG components with Angular</h2>

Assigning selectors to components in the SVG namespace will not work the usual way. They must be **selected through an attribute selector**

```JavaScript
//app.component.html
<svg>
    <g [lineExample]></g>
</svg>
//app.component.ts
import { Component } from '@angular/core';
@Component({
    selector: '[lineExample]',
    template: `<svg:line x1="0" y1="0" x2="100" y2="100"></svg:line>`
})
export class LineExampleComponent {
    constructor() {}
}
```

[back to top](#top)

<h2 id="Change">3. D3 and Change Detection</h2>

1. **ChangeDetectionStrategy**: Angular will refresh the graph elements on every tick, change detection and mark it for check on every simulation tick
2. **ngOnChanges hook**: such like `.tsBarChartComponent`

```JavaScript
//src\app\visuals\graph\graph.component.ts
import { 
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
@Component({
  selector: 'graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<!-- svg, nodes and links visuals -->`
})
export class GraphComponent {
  constructor(private ref: ChangeDetectorRef) { }
  ngOnInit() {
      this.graph = this.d3Service.getForceDirectedGraph(...);
      this.graph.ticker.subscribe((d) => {
        this.ref.markForCheck();
      });
  }
}
//src\app\visuals\bar-chart\bar-chart.component.ts
ngOnChanges() {
    if (this.chart) {	      
      this.updateChart();	    
    }
}
updateChart(){
  //...
}
```

[back to top](#top)

<h2 id="behaviors">4. D3 Zoom and Drag behaviors</h2>

```JavaScript
@Component({
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
      <g [zoomableOf]="svg">
        <g [linkVisual]="link" *ngFor="let link of links"></g>
        <g [nodeVisual]="node" *ngFor="let node of nodes" 
           [draggableNode]="node"
           [draggableInGraph]="graph">
        </g>
      </g>
    </svg>`,
})
export class GraphComponent implements OnInit {
  // ...
}
// d3/d3.service.ts
applyZoomableBehaviour(svgElement, containerElement) {
    let svg, container, zoomed, zoom;
    svg = d3.select(svgElement);
    container = d3.select(containerElement);
    zoomed = () => {
      const transform = d3.event.transform;
      container.attr("transform", "translate(" + transform.x + "," + transform.y + ") scale(" + transform.k + ")");
    }
    zoom = d3.zoom().on("zoom", zoomed);
    svg.call(zoom);
  }
// d3/directives/zoomable.directive.ts
import { Directive, Input, ElementRef } from '@angular/core';
import { D3Service } from '../d3.service';
@Directive({
    selector: '[zoomableOf]'
})
export class ZoomableDirective {
    @Input('zoomableOf') zoomableOf: ElementRef;
    constructor(private d3Service: D3Service, private _element: ElementRef) {}
    ngOnInit() {
        this.d3Service.applyZoomableBehaviour(this.zoomableOf, this._element.nativeElement);
    }
}
```

[back to top](#top)

> - [How To Build A Chart Component in Angular 2 and D3](https://medium.com/@jcasarrubias/how-to-build-a-chart-component-in-angular-2-and-d3-c0a15d845eca)
> - [https://medium.com/netscape/visualizing-data-with-angular-and-d3-209dde784aeb]
  - Source: https://github.com/lsharir/angular-d3-graph-example (recently updated to angular 5)
  - Demo: https://lsharir.github.io/angular-d3-graph-example/
> - [Create a reusable chart component with Angular and D3.js](https://keathmilligan.net/create-a-reusable-chart-component-with-angular-and-d3-js/)
> - [D3官网](http://d3js.org/)
> - [官方 API](https://github.com/mbostock/d3/wiki/API-Reference)
> - [数据可视化专题](http://www.ourd3js.com/wordpress/2209/#more-2209)
> - [D3的学习资料](http://www.ourd3js.com/wordpress/865/#more-865)
> - [张天旭的博客](https://blog.csdn.net/tianxuzhang?viewmode=contents)


[Angular4 后台管理系统](#top)

1. 使用adminLte 皮肤。bootstrap的一款皮肤。风格比较严肃
2. 引用了ngx-bootstrap。这个是bootstrap对应angular的库
3. 使用wijmo5 flexgrid表格，号称是angular下最好的表格组件
4. D3
