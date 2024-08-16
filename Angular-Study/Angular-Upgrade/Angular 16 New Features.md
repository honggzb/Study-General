[Angular 16 New Features](#top)

- [Angular Signals](#angular-signals)
- [服务器端渲染（SSR）](#服务器端渲染ssr)
- [实验性的Jest支持](#实验性的jest支持)
- [Required Inputs](#required-inputs)
- [独立项目支持](#独立项目支持)
- [esbuild 开发者预览版加快构建速度](#esbuild-开发者预览版加快构建速度)
- [路由器输入](#路由器输入)

## Angular Signals

- Angular信号来管理Angular应用程序中的状态更改。
- 信号可以被识别为用户可以同步访问的规则变量。但它还附带了一些附加功能，比如通知其他人（组件模板、其他信号、函数等）其值的更改，以及以声明的方式创建派生状态。

```ts
import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Calculate Area</h1>
    <p>Answer : {{ area() }}</p>
    <button (click)="calculateArea(10,10)">Click</button>
  `,
})
export class App {
    height = signal(5);
    width = signal(5);
    area = computed(() => this.height() * this.width());
    constructor() {
      effect(() => console.log('Value changed:', this.area()));
    }
    calculateArea(height: number, width: number) {
      this.height.set(height);
      this.width.set(width);
    }
}
```

 [⬆ back to top](#top)

## 服务器端渲染（SSR）

- 可以通过在引导应用程序时添加`provideClientHydration（）`作为提供程序来启用
- 只是一个开始。他们计划在下一步探索部分水合作用，并满足开发人员的几个要求

```ts
import {
 bootstrapApplication,
 provideClientHydration,
} from '@angular/platform-browser';
// ...
bootstrapApplication(RootCmp, {
 providers: [provideClientHydration()]
});
```

[⬆ back to top](#top)

## 实验性的Jest支持

1. 安装Jest: `npm install jest --save-dev`
2. 更新angular.json文件

```ts
{
  "projects": {
    "my-app": {
      "architect": {
        "test": {
          "builder": "@angular-devkit/build-angular:jest",
          "options": {
            "tsConfig": "tsconfig.spec.json",
            "polyfills": ["zone.js", "zone.js/testing"]
          }
        }
      }
   }
}
```

[⬆ back to top](#top)

## Required Inputs

- 可以根据需要定义输入值, 使用@Input装饰器或@Component装饰器输入数组来定义一个

```ts
export class App {
  @Input({ required: true }) name: string = '';
}
// or
@Component({
  ...
  inputs: [
    {name: 'name', required: true}
  ]
})
```

[⬆ back to top](#top)

## 独立项目支持

- `ng new --standalone`

## esbuild 开发者预览版加快构建速度

- v16 带来了基于 esbuild 的全新 Angular CLI 构建器开发者预览版。这种新架构能够在多种场景下显著缩短构建时间。该预览版还与 Vite 相集成以支持 CLI 的开发服务器。
- 更新 angular.json 即可体验这一全新构建设置：

```ts
content_copy"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser-esbuild",
```

## 路由器输入

- 允许将路由参数绑定到组件输入中，从而无需将ActivatedRoute注入组件
- 若要启用此功能，必须导入`RouterModule`并在`app.module.ts`文件中启用`bindToComponentInputs`属性
- such as: ` http://localhost:4200/articles?articleId=001`

```ts
@NgModule({
 imports: [
   RouterModule.forRoot([], { bindToComponentInputs: true })
 ],
})
export class AppModule {}
// Route
const routes: Routes = [
 { path: "articles", component: ArticleComponent, },
];
// Component
@Component({})
export class ArticleComponent implements OnInit {
  //pass query params using the name of the component input
  @Input() articleId?: string; 
  ngOnInit() {}
}
```

[⬆ back to top](#top)

> []()
