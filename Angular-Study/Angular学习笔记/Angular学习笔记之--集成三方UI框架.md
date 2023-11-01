[Angular学习笔记之集成三方UI框架](#top)

- [1. Angular Material](#1-angular-material)
- [2. NG-ZORRO](#2-ng-zorro)
- [3. Ag-grid](#3-ag-grid)

----------------------

## 1. Angular Material

https://material.angular.io/

```
# 1) install package
npm install --save @angular/material @angular/cdk
# 2) if need animations
npm install --save @angular/animations
#note: 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  ...
  imports: [BrowserAnimationsModule],
  ...
})
export class PizzaPartyAppModule { }
# 3) Import the component modules
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
@NgModule({
  ...
  imports: [MatButtonModule, MatCheckboxModule],
  ...
})
export class PizzaPartyAppModule { }
# 4) Include a pre-built theme - in styles.css
@import '~@angular/material/prebuilt-themes/deeppurple-amber.css';
#or in index.html
<link href="node_modules/@angular/material/prebuilt-themes/indigo-pink.css" rel="stylesheet">
# 5) Gesture Support
npm install --save hammerjs
# adding in src/main.ts
import 'hammerjs';
# 6) Add Material Icons, adding in index.html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

[back to top](#top)

## 2. NG-ZORRO
 
- [ZORRO 官网](https://ng.ant.design/)
- [NG4+NG-ZORRO搭建项目](https://blog.csdn.net/gaiery/article/details/79195041)

```shell
# 1) install package
npm install ng-zorro-antd --save
# 2) modifying /src/app/app.module.ts
import { NgZorroAntdModule } from 'ng-zorro-antd';
@NgModule({
  imports: [
    //...
    NgZorroAntdModule.forRoot()
})
# 在根module中需要使用 NgZorroAntdModule.forRoot()，在子module需要使用 NgZorroAntdModule
# /src/app/app.component.html
<button nz-button [nzType]="'primary'">测试按钮</button>
# 3) 修改 .angular-cli.json 文件的 styles 列表
"styles": [
  "../node_modules/ng-zorro-antd/src/ng-zorro-antd.less"
]
```
 
[back to top](#top)

## 3. Ag-grid
 
[Ag-grid 官网](https://www.ag-grid.com/)

```shell
npm install --save ag-grid-angular ag-grid
# angular.cli
"../node_modules/ag-grid/dist/styles/ag-grid.css",
"../node_modules/ag-grid/dist/styles/ag-theme-fresh.css"
# app.module.ts
imports:[
  AgGridModule.withComponents([])
],
exports:[
  AgGridModule
]
```

[back to top](#top)

> [Angular学习笔记之集成三方UI框架、控件的示例](https://segmentfault.com/a/1190000013931868)
