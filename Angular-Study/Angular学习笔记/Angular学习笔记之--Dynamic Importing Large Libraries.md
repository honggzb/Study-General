[Angular学习笔记之Dynamic Importing Large Libraries](#top)

- [Use import()](#use-import)
- [Sample: Dynamically Importing Highcharts](#sample-dynamically-importing-highcharts)
- [investigate build size in Webpack](#investigate-build-size-in-webpack)
- [webpack-visualizer](#webpack-visualizer)
  - [Site Usage](#site-usage)
  - [Plugin Usage](#plugin-usage)

## Use import()

- `import()` is a new feature of ECMAScript. It loads a script dynamically in runtime.
  - In the future, all modern browsers support it natively.
- `import()`'s support is not enough, it need webpack helping, webpack can replaceimport() calls with its own [dynamic module loading](https://webpack.js.org/guides/code-splitting/#dynamic-imports) function in the bundling flow

1. Preparation: Edit tsconfig.json
   1. TypeScript has support for dynamic `import()` , but it is enabled only in some module types
   2. set its `module` field to `esnext`
2. Migrate to dynamic `import()` in angular component
   1. `normalizeCommonJSImport` is a utility function for compatibility between CommonJS module and ES modules and for strict-typing

```javascript
// 1) Preparation: Edit tsconfig.json
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "module": "esnext",     // set to esnext
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "es5",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2018",
      "dom"
    ]
  }
}
// 2) Migrate to dynamic import()
import { normalizeCommonJSImport } from '../utils/normalizeCommonJSImport';
// import() returns a Promise
const importChart = normalizeCommonJSImport(
  import(/* webpackChunkName: "chart" */ 'chart.js'),    // returns Promise<typeof Chart>
);
@Component({ ... })
export class AppComponent {
  @ViewChild('chart') chartElement: ElementRef<HTMLCanvasElement>;
  async ngOnInit() {
    // Wait for dynamic import resolution
    const Chart = await importChart;
    new Chart(this.chartElement.nativeElement, {
      /** chart configurations */
    });
  }
}
```

## Sample: Dynamically Importing Highcharts

```javascript
import { Component, OnInit } from '@angular/core';
import { normalizeCommonJSImport } from '../../normalizeCommonJSImport';
const loadHighcharts = normalizeCommonJSImport(
  import('highcharts'),
);
@Component({
  selector: 'widget-pie-chart',
  template: `
    <ng-container *ngIf="highcharts">
      <highcharts-chart
        [highcharts]="highcharts"
        [options]="chartOptions">
      </highcharts-chart>
    </ng-container>
  `
})
export class PieChartComponent implements OnInit {
  highcharts: any;
  chartOptions: any = {
    //...
  };
 // ...
  public async ngOnInit() {
    this.highcharts = await loadHighcharts;
  }
}
```

- investigate build size
  - `ng build --prod --named-chunks --stats-json && ./node_modules/webpack-bundle-analyzer/lib/bin/analyzer.js ./dist/serendipity/stats-es2015.json`
- https://github.com/highcharts/highcharts-angular

## investigate build size in Webpack

1. install the Analyzer: `npm i webpack-bundle-analyzer --save-dev`
2. Creating the webpack stats.json file: `webpack --json > stats.json`
   1. or `npx webpack --config config/webpack/development.js --json > stats.json`
3. Using the Analyzer: `yarn webpack-bundle-analyzer stats.json`

## webpack-visualizer

- https://github.com/chrisbateman/webpack-visualizer
  
### Site Usage

Upload your stats JSON file to the site: chrisbateman.github.io/webpack-visualizer/

### Plugin Usage

`npm install webpack-visualizer-plugin`

```javascript
var Visualizer = require('webpack-visualizer-plugin');
//...
//This will output a file named stats.html in your output directory
plugins: [new Visualizer()],  
// or custmize output html
var Visualizer = require('webpack-visualizer-plugin');
plugins: [new Visualizer({
  filename: './statistics.html'
})],
```

[back to top](#top)

> Reference
- [Angular: Dynamic Importing Large Libraries](https://medium.com/lacolaco-blog/angular-dynamic-importing-large-libraries-8ec079603d0)
- https://github.com/lacolaco/angular-chartjs-dynamic-import
- https://webpack.js.org/guides/code-splitting/#dynamic-imports
- [Dynamically Importing Highcharts](https://robferguson.org/blog/2019/09/23/dynamically-importing-highcharts/)
