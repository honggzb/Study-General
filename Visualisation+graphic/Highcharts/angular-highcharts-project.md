
## setup environment

```
ng new angular-highcharts
npm install highcharts highcharts-angular --save
```

## modify components

```typescript
// app.component.html
<highcharts-chart [Highcharts]="Highcharts" [options]="chartOptions"
  style="width: 80%; height: 400px; display: block;">
</highcharts-chart>
// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import library
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from  'highcharts-angular';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HighchartsChartModule],   // add HighchartsChartModule
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  Highcharts: typeof Highcharts = Highcharts;  // required
  updateFlag = false;
  data = [1, 2, 3, 4];
  chartOptions: Highcharts.Options = {
    series: [
      {
        type: 'line',
        data: this.data,
      },
    ],
  };
}
```

> References
- [highcharts official](https://www.highcharts.com/)
- [Highcharts中文官网](https://www.hcharts.cn/)
- [Angular Highcharts Tutorial+Sample](https://www.tutorialspoint.com/angular_highcharts/index.htm)
- [highcharts official Demo](https://www.highcharts.com/demo/highcharts/bar-basic)
- https://www.npmjs.com/package/highcharts-angular
- [Highcharts with Angular V14](https://www.highcharts.com/blog/tutorials/highcharts-with-angular-v14/)
- [Highcharts创建具有交互式报表功能的Angular应用程序](https://blog.51cto.com/u_14874181/5721479)
- https://stackblitz.com/edit/angular-highcharts-bar-chart?file=src%2Fapp%2Fapp.component.ts
