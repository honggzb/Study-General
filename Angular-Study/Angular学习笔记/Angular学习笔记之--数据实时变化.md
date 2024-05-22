[Angular学习笔记之--数据实时变化](#top)

- [变更检测的触发时机](#变更检测的触发时机)
- [通过RxJS的Subject和Observable来实现- 观察者和订阅者模式](#通过rxjs的subject和observable来实现--观察者和订阅者模式)
- [变化监测](#变化监测)
  - [变更检测的执行机制和顺序](#变更检测的执行机制和顺序)
- [zone.js](#zonejs)


---------------------------------------

## 变更检测的触发时机

- HTTP请求：通过Ajax请求或Fetch API 发送HTTP请求在后台获取数据
- 定时器任务：setTimeout/setInterval
- 事件处理：用户交互事件（点击、滚动、键盘输入等）
- 自定义的异步函数

[⬆ back to top](#top)

## 通过RxJS的Subject和Observable来实现- 观察者和订阅者模式

```js
// data-service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({providedIn: 'root'})
export class DataService {
  private dataSource = new Subject<any>();
  // 向外提供Observable，以便组件订阅
  data$ = this.dataSource.asObservable();
  // 发射新数据
  changeData(newData: any) {
    this.dataSource.next(newData);
  }
}
//在组件中，你可以这样使用这个服务
// your.component.ts
import { Component } from '@angular/core';
import { DataService } from './data-service.ts';
import { Subscription } from 'rxjs';
@Component({
  selector: 'your-component',
  template: `
    <button (click)="changeData()">Change Data</button>
  `
})
export class YourComponent {
  dataSubscription: Subscription;
  constructor(private dataService: DataService) {
    // 订阅数据变化
    this.dataSubscription = this.dataService.data$.subscribe(data => {
      // 处理数据变化
      console.log(data);
    });
  }
  changeData() {
    // 触发数据变化
    this.dataService.changeData('new data');
  }
  ngOnDestroy() {
    // 取消订阅，防止内存泄露
    this.dataSubscription.unsubscribe();
  }
}
```

[⬆ back to top](#top)

## 变化监测

- Angular 变更检测是一种机制，Angular 会定期检查数据是否发生变化，如果发生变化，它会自动更新视图。Angular 的变更检测策略可以手动触发，以确保在特定的操作后更新视图
- 变更检测可以通过以下方式进行：
  - 使用 `ChangeDetectorRef` 手动触发变更检测
  - 使用 `async` 管道在模板中处理异步数据
  - 使用 `OnPush` 变化检测策略，它会在输入属性发生变化时检查变化, 只有以下几种情况会触发该组件的变更检测：
    - 只有输入数据的引用（`@Input`）改变时，组件才进行变更检测
    - 当DOM事件触发时，才进行变更检测：从根组件开始往下遍历进行变更检测
    - 手动触发变更检测（`ChangeDetectorRef`对象`.detectChanges()`）：从该组件开始往下遍历进行变更检测

```js
//使用 `ChangeDetectorRef` 手动触发变更检测
import { Component, ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-example',
  template: `<div>{{ asyncData }}</div>`
})
export class ExampleComponent {
  asyncData: string;
  constructor(private cdRef: ChangeDetectorRef) {}
  updateData() {
    this.asyncData = 'New Data';
    this.cdRef.detectChanges();   // 手动触发变更检测
  }
}
// 使用 OnPush 变化检测策略
import { Component, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-example',
  template: `<div>{{ data }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,   // 不需要手动触发变更检测，因为 OnPush 策略只在输入属性变化时检查
})
export class ExampleComponent {
  data = 'Initial Data';
  updateData() {
    this.data = 'Updated Data';
  }
}
```

### 变更检测的执行机制和顺序

只要有异步操作，就会触发变更检测。从根节点开始，从上到下遍历所有子组件（深度遍历）检测，直至最后一个组件达到稳定状态。

1. 更新组件的输入属性
2. 调用组件的生命周期的钩子函数onChanges, OnInit, DoCheck, AfterContentInit
3. 更新当前组件的视图DOM
4. 递归更新子组件…：当前组件的视图更新完成后，就会递归地更新子组件的视图。包含了以上三个步骤
5. 调用所有子组件生命周期的钩子ngAfterViewInit

[⬆ back to top](#top)

## zone.js

- Zone.js 是 Angular 中另一个关键技术，它用于捕获和拦截，以实现变化监测
- Zone.js 可以劫持异步操作，包括定时器、HTTP 请求和事件等。当这些异步操作触发时，Zone.js 会通知 Angular 进行变化检测

> References
- [Angular变更检测](https://blog.csdn.net/qq_42358061/article/details/137756362)
