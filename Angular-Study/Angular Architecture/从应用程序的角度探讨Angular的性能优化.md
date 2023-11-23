[从应用程序的角度探讨Angular的性能优化](#top)

- [使用生命周期钩子](#使用生命周期钩子)
- [使用OnPush变更检测策略](#使用onpush变更检测策略)
- [懒加载模块](#懒加载模块)
- [使用虚拟滚动](#使用虚拟滚动)
- [使用轻量级的管道](#使用轻量级的管道)
- [使用trackBy帮助ngFor优化](#使用trackby帮助ngfor优化)
- [避免在引用类型中改变对象的属性](#避免在引用类型中改变对象的属性)
- [缓存数据](#缓存数据)
- [开启 AOT 编译](#开启-aot-编译)

--------------------------------------------------------

## 使用生命周期钩子

- ngOnInit() ：在组件初始化后每次调用，用于初始化数据。
- ngOnChanges() ：在组件或者指令的输入属性发生变化时调用，用于响应式的更新组件或指令。
- ngDoCheck() ：在组件或者指令的每一次变更检查周期中调用，可以用来检查和更新组件的状态。
- ngAfterViewInit() ：在组件及其子组件的视图创建完成后调用，可以处理与视图相关的任务。

[⬆ back to top](#top)

## 使用OnPush变更检测策略

- 默认情况下，Angular检查应用程序中发生的所有数据更改，从而导致性能下降。为了解决这个问题，可以使用OnPush变更检测策略，这将只在输入绑定值发生更改时才启动变更检测。这个策略只适用于具有@Input() properties的组件，并且需要手动设置。


```javascript
import {Component, ChangeDetectionStrategy} from '@angular/core';
@Component({
    selector: 'app-sample-component',
    templateUrl: './sample.component.html',
    styleUrls: ['./sample.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleComponent {
    // ...
}
```

[⬆ back to top](#top)

## 懒加载模块

- 懒加载模块允许我们将应用程序分成小块，只在需要时才加载它们。这可以有效地减少应用程序的启动时间并提高性能
- 在应用程序的路由器中，使用loadChildren 而不是component属性

```javascript
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'about', loadChildren: './about/about.module#AboutModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactModule' },
  { path: 'lazy', loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule),
];
```

[⬆ back to top](#top)

## 使用虚拟滚动

- 当使用大型数据集时，渲染所有数据可能会占用大量内存并影响应用程序的性能
- 虚拟滚动将只渲染可见区域内的数据，并根据需要加载更多数据，这可以减少渲染的数据量并提高应用程序的性能
- Angular CDK提供了一个名为`CdkVirtualScrollViewport` 的指令，它可以帮助你实现虚拟滚动

```javascript
<cdk-virtual-scroll-viewport itemSize="50" class="example-viewport">
  <div *cdkVirtualFor="let item of items" class="example-item">{{item}}</div>
</cdk-virtual-scroll-viewport>
```

[⬆ back to top](#top)

## 使用轻量级的管道

- Angular中的管道可以用来转换数据，并在模板中显示不同的输出。使用轻量级的管道可以提高Angular应用的性能
- 一个经典的例子是将日期格式化为特定的字符串形式。我们可以使用内置的DatePipe管道来实现这一点，但是它可能会导致性能问题。相反，可以编写一个自定义的轻量级管道来执行相同的任务

```javascript
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: any): string {
    const date = new Date(value);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
```

- `<p>{{ myDate | customDate }}</p>`
- 但是需要注意的是，某些管道可能会对性能产生负面影响。建议遵循以下规则使用轻量级的管道：
  - 尽可能使用纯管道： 纯管道指输入不变时，输出永远不变的管道，它们只在输入发生变化时进行计算，在模板中绑定的表达式将不会多次被执行。
  - 避免使用复杂管道： 复杂管道需要更多的计算资源，因此应该尽可能避免使用它们。当必须使用复杂管道时，应该将其结果缓存起来，以便在需要时可以重用它们。

```javascript
//自定义管道没有过多的附加操作或计算，因此它比内置的DatePipe稍微快一些
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({name: 'uppercase'})
export class UpperCasePipe implements PipeTransform {
    transform(value: string): string {
        return value.toUpperCase();
    }
}
```

[⬆ back to top](#top)

## 使用trackBy帮助ngFor优化

- 当使用 ngFor 循环渲染数组或列表时，如果数据发生变化，“脏检查”机制会触发重新渲染所有列表项。
- 通过使用 trackBy 函数，可以告诉 Angular 如何跟踪列表项的变化，从而避免不必要的渲染。

```html
<ul>
  <li *ngFor="let item of items; trackBy: itemTrackByFn">{{ item }}</li>
</ul>

itemTrackByFn(index, item) {
  return item.id;
}
```

[⬆ back to top](#top)

## 避免在引用类型中改变对象的属性

- 在 Angular 应用程序中，通过在组件和服务之间传递引用类型，可以轻松地共享数据。但是，如果试图修改已经在其他地方使用的对象的属性，则所有对该对象的引用都将受到影响，这可能导致不必要的变更检测。
- 为了避免这种情况，尽量避免直接修改对象的属性，而是使用 `Object.assign()`或spread运算符创建新对象。

```javascript
const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
// 不好的写法
this.userService.updateUser(user.id, user.name);
user.email = 'new-email@example.com';
// 好的写法
this.userService.updateUser(user.id, user.name, { email: 'new-email@example.com' });
```

[⬆ back to top](#top)

## 缓存数据

- 缓存可以避免重复的请求并减少网络带宽
- 在Angular中，可以使用Angular的**HttpInterceptors**来拦截HTTP请求并缓存响应

```javascript
@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }
    const cachedResponse = this.cache.get(request.urlWithParams);
    if (cachedResponse) {
      return of(cachedResponse);
    }
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(request.urlWithParams, event);
        }
      })
    );
  }
}
```

[⬆ back to top](#top)

## 开启 AOT 编译

- 开启 AOT 编译可以大大提高应用程序的性能。AOT 编译将在构建期间对组件/指令和模板进行编译，并将生成的 JavaScript 代码直接注入到 HTML 模板中。这意味着在运行时，浏览器不再需要编译模板，从而减少启动时间和加载时间。
- 在 Angular CLI 中使用 --aot 选项构建您的应用程序：`ng build --aot`
- 在 Angular 应用程序中配置 JIT 编译器，以便像 AOT 所做的那样提前编译组件：

```
@NgModule({
  // ...
  providers: [
    {
      provide: COMPILER_OPTIONS,
      useValue: {
        providers: [{useClass: JitCompiler}]
      },
      multi: true
    }
  ],
  // ...
})
export class AppModule {}
```

[⬆ back to top](#top)

- [Angular中的性能优化：从应用程序的角度探讨技术](https://juejin.cn/post/7231853294410317881)
- [Angular 性能优化实战](https://juejin.cn/post/7210574986780229669)
