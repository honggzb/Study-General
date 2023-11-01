[Chart Js with ng2-charts](#top)

- [General](#general)
- [ng2-chart](#ng2-chart)
  - [ng2-chart Properties](#ng2-chart-properties)
  - [ng2-chart Colors](#ng2-chart-colors)
  - [ng2-chart Events](#ng2-chart-events)
- [Configure Chart Js and ng2-charts Library](#configure-chart-js-and-ng2-charts-library)
- [Samples](#samples)
  - [Line Chart](#line-chart)
  - [Pie Chart](#pie-chart)
  - [Bar Chart](#bar-chart)
  - [Doughnut Chart](#doughnut-chart)
  - [Radar Chart](#radar-chart)
  - [Bubble Chart](#bubble-chart)

---------------------

## General

- Chart.Js is a well-recognized JavaScript library, and It is used to represent the data using the HTML5 canvas. It allows us to build dynamic as well as static charts, and it comes with full animation support for the various charts. It takes data in the JSON form, so it is merely simple to use it with any programming language.
- ng2-charts helps to create eye-catching charts in Angular with the help of Chart.js

## ng2-chart

### ng2-chart Properties

property | explanation
---|---
`data (SingleOrMultiDataSet)`|set of points of the chart, it should be MultiDataSet only for line, bar, radar and doughnut, otherwise SingleDataSet
`datasets ({ data: SingleDataSet, label: string }[])` | data see about, the label for the dataset which appears in the legend and tooltips
`labels (Label[])` | x axis labels. It’s necessary for charts: line, bar and radar. And just labels (on hover) for charts: polarArea, pie and doughnut. Label is either a single string, or it may be a string[] representing a multi-line label where each array element is on a new line.
`chartType (ChartType)` | indicates the type of charts, it can be: line, bar, radar, pie, polarArea, doughnut
`colors (Color[])` |data colors, will use default and|or random colors if not specified
`legend: (boolean = false)` | if true show legend below the chart, otherwise not be shown

### ng2-chart Colors

- There are a set several default colors. Colors can be replaced using the colors attribute.
- If there is more data than colors, colors are generated randomly.

### ng2-chart Events

- chartClick: fires when click on a chart has occurred, returns information regarding active points and labels
- chartHover: fires when mousemove (hover) on a chart has occurred, returns information regarding active points and labels

[back to top](#top)

## Configure Chart Js and ng2-charts Library

`npm install ng2-charts chart.js --save`

```javascript
import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [...],
  imports: [ ChartsModule ],
})
export class AppModule { }
```

[back to top](#top)

## Samples

### Line Chart

- ![Alt text](Line-Chart.png)
- line-chart.component.ts

```javascript
import { Component, } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
}
```

- line-chart.component.html

```html
<div class="chart-wrapper">
    <canvas baseChart 
        [datasets]="lineChartData" 
        [labels]="lineChartLabels" 
        [options]="lineChartOptions"
        [colors]="lineChartColors" 
        [legend]="lineChartLegend" 
        [chartType]="lineChartType" 
        [plugins]="lineChartPlugins">
    </canvas>
</div>
```

### Pie Chart

- pie-chart.component.ts

```javascript
import { Component } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['SciFi'], ['Drama'], 'Comedy'];
  public pieChartData: SingleDataSet = [30, 50, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
}
```

- pie-chart.component.html

```html
<div class="chart-wrapper">
    <canvas baseChart 
      [data]="pieChartData" 
      [labels]="pieChartLabels" 
      [chartType]="pieChartType"
      [options]="pieChartOptions"
      [plugins]="pieChartPlugins"
      [legend]="pieChartLegend">
  </canvas>
</div>
```

### Bar Chart

- ![Bar Chart](Bar-Chart.png)
- bar-chart.component.ts

```javascript
import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  ];
}
```

- bar-chart.component.html

```html
<div class="chart-wrapper">
    <canvas baseChart 
      [datasets]="barChartData"
      [labels]="barChartLabels"
      [options]="barChartOptions"
      [plugins]="barChartPlugins"
      [legend]="barChartLegend"
      [chartType]="barChartType">
  </canvas>
</div>
```

### Doughnut Chart

- doughnut-chart.component.ts

```javascript
import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent {
  doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';
}
```

- doughnut-chart.component.html

```html
<div class="chart-wrapper">
    <canvas baseChart 
      [data]="doughnutChartData"
      [labels]="doughnutChartLabels"
      [chartType]="doughnutChartType">
  </canvas>
</div>
```

### Radar Chart 

- ![Radar Chart](./images/Radar-Chart .png)
- radar-chart.component.ts

```javascript
import { Component } from '@angular/core';
import { Component } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent {
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Punctuality', 'Communication', 'Problem Solving',
    'Team Player', 'Coding', 'Technical Knowledge', 'Meeting Deadlines'];
  public radarChartData: ChartDataSets[] = [
    { data: [0, 1, 2, 3, 4, 5, 6], label: 'Employee Skill Analysis' }
  ];
  public radarChartType: ChartType = 'radar';
}
```

- radar-chart.component.html

```html
<div class="chart-wrapper">
    <canvas baseChart
      [datasets]="radarChartData"
      [options]="radarChartOptions"
      [labels]="radarChartLabels"
      [chartType]="radarChartType">
  </canvas>
</div>
```

### Bubble Chart 

- ![Radar Chart](./images/Radar-Chart .png)
- bubble-chart.component.ts

```javascript
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent {
  public bubbleChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          min: 0,
          max: 50,
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 50,
        }
      }]
    }
  };
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;
  public bubbleChartData: ChartDataSets[] = [
    {
      data: [
        { x: 15, y: 15, r: 15 },
        { x: 25, y: 15, r: 25 },
        { x: 36, y: 12, r: 33 },
        { x: 10, y: 18, r: 18 },
      ],
      label: 'Investment Equities',
    },
  ];
}
```

- bubble-chart.component.html

```html
<div class="chart-wrapper">
    <canvas baseChart
      [datasets]="bubbleChartData"
      [options]="bubbleChartOptions"
      [colors]="bubbleChartColors"
      [legend]="bubbleChartLegend"
      [chartType]="bubbleChartType">
  </canvas>
</div>
```

[back to top](#top)

> References
- [Angular 11 Chart Js Tutorial with ng2-charts Examples](https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/)
- https://www.npmjs.com/package/ng2-charts
- https://www.chartjs.org/
