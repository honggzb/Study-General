[Chart Js with ng2-charts](#top)

- [General](#general)
- [ng2-chart](#ng2-chart)
  - [ng2-chart Properties](#ng2-chart-properties)
  - [ng2-chart Colors](#ng2-chart-colors)
  - [ng2-chart Events](#ng2-chart-events)
- [Configure Chart Js and ng2-charts Library](#configure-chart-js-and-ng2-charts-library)
- [Samples](#samples)
## General

- Chart.Js is a well-recognized JavaScript library, and It is used to represent the data using the HTML5 canvas. It allows us to build dynamic as well as static charts, and it comes with full animation support for the various charts. It takes data in the JSON form, so it is merely simple to use it with any programming language.
- ng2-charts helps to create eye-catching charts in Angular with the help of Chart.js

## ng2-chart

### ng2-chart Properties

property |
---|---
data (SingleOrMultiDataSet)|set of points of the chart, it should be MultiDataSet only for line, bar, radar and doughnut, otherwise SingleDataSet
datasets ({ data: SingleDataSet, label: string }[]) | data see about, the label for the dataset which appears in the legend and tooltips
labels (Label[]) |x axis labels. It’s necessary for charts: line, bar and radar. And just labels (on hover) for charts: polarArea, pie and doughnut. Label is either a single string, or it may be a string[] representing a multi-line label where each array element is on a new line.
chartType (ChartType) | indicates the type of charts, it can be: line, bar, radar, pie, polarArea, doughnut
colors (Color[]) |data colors, will use default and|or random colors if not specified
legend: (boolean = false) | if true show legend below the chart, otherwise not be shown

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

- Line Chart - https://stackblitz.com/edit/ng2-charts-line-template
- Pie Chart - https://stackblitz.com/edit/ng2-charts-pie-template
- Bar Chart - https://stackblitz.com/edit/ng2-charts-bar-template
- Doughnut Chart - https://stackblitz.com/edit/ng2-charts-doughnut-template
- Radar Chart - https://stackblitz.com/edit/ng2-charts-radar-template
- Polar Area Chart - https://stackblitz.com/edit/ng2-charts-polar-area-template
- Bubble Chart - https://stackblitz.com/edit/ng2-charts-bubble-template
- Scatter Chart - https://stackblitz.com/edit/ng2-charts-scatter-template

> References
- [Angular 11 Chart Js Tutorial with ng2-charts Examples](https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/)
- https://www.npmjs.com/package/ng2-charts
- https://www.chartjs.org/