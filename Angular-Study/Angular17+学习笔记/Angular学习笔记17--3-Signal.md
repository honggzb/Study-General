[Angular学习笔记17--3-Signal](#top)

- [Basic](#basic)
  - [The basics usage of Signal- declare, get, set, update](#the-basics-usage-of-signal--declare-get-set-update)
  - [Immutability - Objects+Arrays](#immutability---objectsarrays)
  - [computed](#computed)
  - [Effects](#effects)
- [Service layer when using signal](#service-layer-when-using-signal)
  - [Fetch implementation](#fetch-implementation)
  - [HttpClient with async, await](#httpclient-with-async-await)
- [Signal Inputs](#signal-inputs)
  - [Value transforms](#value-transforms)
  - [Benifit](#benifit)
- [loading by using signal](#loading-by-using-signal)
  - [service implementation](#service-implementation)
  - [interceptor implementation](#interceptor-implementation)
  - [skip loading](#skip-loading)

-------------------------------------------------

- Signal 比的是性能优化版本的 Zone.js + OnPush + markForCheck 或者 Zone.js + RxJS + AsyncPipe 方案
- Signals may be either writable or read-only
  - `const value = signal(0);`
  - `const value = signal(0).asReadonly();`

## Basic

### The basics usage of Signal- declare, get, set, update

- set用于替换
- update 通过当前值来更新signal的值，最终会调用WritableSignal set方法
- mutate 通过当前值来更新signal的值 一般用于更新对象，数组

```ts
const value = signal(0);
console.log(value());        // read value
value.set(5);
value.update(curr => curr + 5);
```

### Immutability - Objects+Arrays

- 避免直接改变signal的值, do not operate signal **directly**
  - create a new
  - copy

```ts
//for Object
type Counter = {
  value: number
}
couter = signal<Counter>({ value: 100});
increment() {
  this.counter.update(counter => ({
    ...counter,                       // 1. copy
    value: couter.value + 1           // 2. change
  }))
}
// for Array
values = signal<number[]>([0]);
append() {
  this.values.update(values => ([
    ...values,                      // 1. copy
    values[values.length -1] +1     // 2. change
  ]));
}
```

[⬆ back to top](#top)

### computed

- 如果有另一个值依赖于其他Signal的值，并且需要重新计算时就可以使用computed
- Computed signal are **read-only** signals that derive their value from other signals - computed 返回值是`Signal<T> `是只读的，因此不能通过set, update等方法去修改Signal，只有computed依赖的signal发生变化时，就会自动更新
- computed 有 lazy execution + cache 的概念
  - 当连续 get value，formula只会执行第一次，后续会用缓存的值，这叫 cache
  - 当依赖变更的时候，cache 就算过期了，它也不会马上执行 formula 获取新值，而是继续等待下一次get value 时才会执行 formula

```ts
import { computed, signal } from '@angular/core';
const firstName = signal('Derrick');
const lastName = signal('Yam');
// 1. 调用 computed 函数，并且提供一个 formula 计算出最终值
const fullName = computed(() => firstName() + ' ' + lastName());
// 2. 调用 fullName getter, 它会执行了 formula 返回 'Derrick Yam' 并且把这个值缓存起来
console.log(fullName());
// 3. 再次调用 fullName getter, 这一次不会执行 formula，而是直接返回缓存结果 'Derrick Yam'
console.log(fullName());
// 4. 修改 fullName 的依赖,  这时不会执行 formula
firstName.set('Richard');
// 5. 修改 fullName 的依赖, 这时不会执行 formula
lastName.set('Lee');
// 6. 再次调用 fullName getter，这一次会执行 formula 返回 'Richard Lee' 并且把这个值缓存起来
console.log(fullName());
// 7. 再次调用 fullName getter, 这一次不会执行 formula，而是直接返回缓存结果 'Richard Lee'
console.log(fullName());
```

[⬆ back to top](#top)

### Effects

- An effect is an operation that runs whenever one or more signal values change.
- Effects always run **at least once**
- When an effect runs, it tracks any signal value reads. Whenever any of these signal values change, the effect runs again
  - effects keep track of their dependencies dynamically, and **only track signals** which were read in the most recent execution
  - 当需要监听signal的变化时可以使用effect，只要这些信号值中的任何一个发生变化，effect就会再次运行
- 释放effect 一般情况当组件销毁时会自动释放effect, 如果不想自动释放可以指manualCleanup为true
- Use cases for effects
  - Logging data being displayed and when it changes, either for analytics or as a debugging tool.
  - Keeping data in sync with window.localStorage
  - Adding custom DOM behavior that can't be expressed with template syntax
  - Performing custom rendering to a `<canvas>`, charting library, or other third party UI library

```ts
count = signal(0)
double = computed(() => this.count() * 2);
constructor() {
  effect(() => {
    console.log(`The count is: ${this.count()})`);
  });
}
//can assign the effect to a field (which also gives it a descriptive name)
readonly count = signal(0);
private loggingEffect = effect(() => {
  console.log(`The count is: ${this.count()}`);
});
//如果想在任意地方使用effect 需要手动指定Injector
injector = inject(Injector);
count = signal(0);
constructorOutside() {
  effect(() => {
    console.log(`The count is: ${this.count()})`);
  }, {injector: this.injector});
}
```

[⬆ back to top](#top)

## Service layer when using signal

### Fetch implementation

- add `withFetch` setting to 'src\app\app.config.ts'
- 'src\app\services\courses-fetch.service.ts'

```ts
// src\app\app.config.ts
import { provideHttpClient, withFetch } from "@angular/common/http";
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch())
  ]
};
// src\app\services\courses-fetch.service.ts
async loadAllCourses(): Promise<Course[]> {
    const response = await fetch(`${this.env.apiRoot}/courses`);
    const payload = await response.json();
    return payload.courses;
  }
```

[⬆ back to top](#top)

### HttpClient with async, await

- [firstValueFrom](https://rxjs.dev/api/index/function/firstValueFrom) in rxjs : Converts an observable to a promise by subscribing to the observable, and returning a promise that will resolve as soon as the first value arrives from the observable. The subscription will then be closed.
- 'src\app\services\courses.service.ts'

```ts
http = inject(HttpClient);
async loadAllCourses(): Promise<Course[]> {
  const courses$ = this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`);  // return observable
  const response = await firstValueFrom(courses$);   // transform to Promise
  return response.courses;
}
```

[⬆ back to top](#top)

## Signal Inputs

-  `input.required`   ->  return type
-  default use `undefined` implicitly

```ts
import {Component, input} from '@angular/core';
@Component({...})
export class MyComp {
  firstName = input<string>();         // InputSignal<string|undefined>
  age = input(0);                      // InputSignal<number>
  // required
  lastName = input.required<string>(); // InputSignal<string>
}
```

- 'src\app\courses-card-list\courses-card-list.component.ts'
  - `courses = input.required<Course[]>();`
- 'src\app\home\home.component.html'
  - `<app-courses-card-list (courseUpdated)="onCourseUpdated($event)" (courseDeleted)="onCourseDeleted($event)" [courses]="beginnerCourses()" />`

### Value transforms

```ts
// with the transform, resulting in booleans
class MyComp {
  disabled = input(false, {
    transform: (value: boolean|string) => typeof value === 'string' ? value === '' : value,
  });
}
// can pass an empty string as a shorthand to mark component as disabled
<my-custom-comp disabled>
```

### Benifit

- Signal inputs are more type safe:
  - Required inputs do not require initial values, or tricks to tell TypeScript that an input always has a value.
  - Transforms are automatically checked to match the accepted input values
- Signal inputs, when used in templates, will automatically mark `OnPush` components as dirty
- Values can be easily derived whenever an input changes using `computed`
- Easier and more local monitoring of inputs using `effect` instead of `ngOnChanges` or setters

[⬆ back to top](#top)

## loading by using signal

1. create loading component: 'src\app\loading\loading.component.ts', 'src\app\loading\loading.component.html'
2. create loading service: 'src\app\loading\loading.service.ts'
3. add loading component to 'app.component'

```ts
export class LoadingService {
  #loadingSignal = signal(false);
  loading = this.#loadingSignal.asReadonly();  //expose a readonly
  router = inject(Router);
  loadingOn() {
    this.#loadingSignal.set(true);
  }
  loadingOff() {
    this.#loadingSignal.set(false);
  }
}
```

### service implementation

1. add loadingService method to loading method of app.component

```ts
// src\app\app.component.ts
 async loadCourses() {
    try {
      this.loadingService.loadingOn();
      const courses = await this.coursesService.loadAllCourses();
      this.#courses?.set(courses);
    } catch (error) {
      alert(`Error loading courses!`);
      console.error(error);
    } finally {
      this.loadingService.loadingOff();
    }
  }
```

### interceptor implementation

1. create loading interceptor: 'src\app\services\loading.interceptor.ts'
2. add setting to 'src\app\app.config.ts'

```ts
// src\app\services\loading.interceptor.ts
import { HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { LoadingService } from "../loading/loading.service";
import { inject } from "@angular/core";
import { finalize } from "rxjs";
export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const loadingService = inject(LoadingService);
  loadingService.loadingOn();
  return next(req).pipe(
    finalize(() => loadingService.loadingOff())
  )
}
// src\app\app.config.ts
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { loadingInterceptor } from './services/loading.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptors([loadingInterceptor])
    )
  ]
};
```

### skip loading

1. create skip loading component: 'src/app/loading/skip-loading.component.ts'
2. adding loading component to loading interceptor: 'src\app\services\loading.interceptor.ts'
3. adding related service if using `httpClient`, such as 

```ts
// src/app/loading/skip-loading.component.ts
import { HttpContextToken } from "@angular/common/http";
export const SkipLoading = new HttpContextToken(
  () => false
)
// src\app\services\loading.interceptor.ts
export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  if(req.context.get(SkipLoading)) {
    return next(req);
  }
  // ...
}
// src/app/services/courses.service.ts
async loadAllCourses(): Promise<Course[]> {
  const courses$ = this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`, {
    context: new HttpContext().set(SkipLoading, true)
  });
  const response = await firstValueFrom(courses$);   // transform to Promise
  return response.courses;
}
```

[⬆ back to top](#top)

> references
- https://github.com/angular-university/angular-signals-course
- [Angular 18+ 高级教程 – Signals](https://www.cnblogs.com/keatkeat/p/17320930.html)
