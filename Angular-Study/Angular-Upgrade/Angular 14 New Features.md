[Angular 14 New Features](#top)

- [1. 独立组件(Stand-alone Components)](#1-独立组件stand-alone-components)
  - [defination/create](#definationcreate)
  - [Using Stand-alone components](#using-stand-alone-components)
  - [独立组件Bootstrap无模块的应用](#独立组件bootstrap无模块的应用)
- [2. 严格类型化的表单](#2-严格类型化的表单)
  - [新的 FormRecord 类](#新的-formrecord-类)
  - [problem](#problem)
  - [solution 1](#solution-1)
  - [solution  2](#solution--2)
- [3. Angular CLI Auto-Completion](#3-angular-cli-auto-completion)
- [4. 改进的模板诊断](#4-改进的模板诊断)
- [5. 简化页面标题可访问性](#5-简化页面标题可访问性)
- [6. Angular CDK中最新的原语(Primitives)](#6-angular-cdk中最新的原语primitives)
- [7. Angular DevTools](#7-angular-devtools)
- [8. 可选的注入器](#8-可选的注入器)
- [9. 内置的改进](#9-内置的改进)
- [10. 扩展开发者诊断(Extended Developer Diagnostics)](#10-扩展开发者诊断extended-developer-diagnostics)

-----------------------------------------------------------------------------

## 1. 独立组件(Stand-alone Components)

- 允许定义组件、指令和管道，而不把它们包含在任何模块中
  - 对于独立组件、指令和管道，可以直接在 `@Component()` 中添加 `standalone: true` 标志，而无需 `@NgModule()`
- 为了让Ng模块在独立组件中是可选的，Angular发布了RFC (Request for Comments)。这些模块不会在Angular 14的更新中被淘汰，而是会成为临时模块，以保持与现有Angular库和应用的兼容性
- 值得注意的是，在Angular 14之前，每个组件都需要与一个模块相关联。如果父模块的declarations数组没有链接到每个组件，则应用程序将失败

### defination/create

- command line: `ng g component --standalone user`
- add standalone in component

```javascript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // includes NgIf and TitleCasePipe
import { bootstrapApplication } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { ImageComponent } from './app/image.component';
import { HighlightDirective } from './app/highlight.directive';
@Component({
  selector: 'app-root',
  standalone: true,      // 装饰器中新的standalone属性
  imports: [
    ImageComponent, HighlightDirective, // import standalone Components, Directives and Pipes
    CommonModule, MatCardModule // and NgModules
  ],
  template: `
    <mat-card *ngIf="url">
      <app-image-component [url]="url"></app-image-component>
      <h2 app-highlight>{{name | titlecase}}</h2>
    </mat-card>
  `
})
export class ExampleStandaloneComponent {
  name = "emma";
  url = "www.emma.org/image";
}
// Bootstrap a new Angular application using our `ExampleStandaloneComponent` as a root component.
bootstrapApplication(ExampleStandaloneComponent);
//2. standalone directive
import { Directive } from '@angular/core';

@Directive({
  selector: '[app-highlight]',
  standalone: true,
  host: {
    '[style.background-color]': "'#ff44cc'",
    '[style.padding]': "'0.1em 0.2em'",
    '[style.margin-top]': "'0.1em'",
  },
})
export class HighlightDirective {}
```

[⬆ back to top](#top)

### Using Stand-alone components

- in other component
  
```javascript
@Component({
  standalone: true,
  selector: 'photo-gallery',
  // an existing module is imported directly into a standalone component
  // CommonModule imported directly to use standard Angular directives like *ngIf
  // the standalone component declared above also imported directly
  imports: [CommonModule, MatButtonModule, TableComponent],
  template: `
    ...
    <button mat-button>Next Page</button>
    <app-table *ngIf="expression"></app-table>
  `,
})
export class PhotoGalleryComponent { }
```

- in ngModule

```javascript
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, TableComponent], // import our standalone TableComponent
  bootstrap: [AppComponent]
})
export class AppModule {}
```

[⬆ back to top](#top)

### 独立组件Bootstrap无模块的应用

- 如果你想摆脱应用程序中的所有ngModules，将需要以不同的方式启动你的应用程序。Angular有新的函数`bootstrapApplication(AppComponent)`，需要在main.ts文件中调用这个函数
  - 这个函数的第二个参数将允许你定义你在你的应用程序中需要的提供者。由于大多数提供者通常存在于模块中，Angular（目前）需要为它们使用一个新的importProvidersFrom提取函数:
  - `bootstrapApplication(AppComponent, { providers: [importProvidersFrom(HttpClientModule)] });`
- 新的懒人-加载路由函数`loadComponent`和`loadChildren`可以懒人加载独立组件
  - `loadChildren`现在不仅允许懒人加载ngModule，而且还允许直接从路由文件中加载子路由

```javascript
{ 
  path: 'home',
  loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
}
{ 
  path: 'home',
  loadChildren: () => import('./home/home.routes').then(c => c.HomeRoutes)
}
```

- https://stackblitz.com/edit/angular-standalone

[⬆ back to top](#top)

## 2. 严格类型化的表单

- 更新完全纠正了Github的主要问题，即对Angular响应式表单包执行严格的类型。这些严格类型的表单将增强一种现代化驱动的方法，让Angular能够与现有表单无缝对接
- Angular 14提供了从以前版本到v14的平稳过渡体验。Angular团队增加了自动迁移功能，以便在升级过程中维护现有的应用程序。另外，你现在可以使用FormControl调用它携带的特定值，接受泛型输入
- API的复杂性会受到频繁监听，以确保更改处理的准确性和平滑性。此外，Angular 14的最新更新不会妨碍基于模板的表单
- 严格类型化表单的优势:
  - 任何返回`FormControl` / `FormGroup`值的属性和方法现在都是严格类型的。例如：`value`，`getRawValue()``，valueChanges`
  - 任何改变表单控件值的方法现在都是类型安全的:`setValue()`, `patchValue()`, `updateValue()`
  - 表单控件现在是严格类型化的。它也适用于表单组的`.get()`方法。这也将防止在编译时发生访问不存在的情况

```javascript
const cat = new FormGroup({
   name: new FormGroup({
      first: new FormControl('Barb'),
      last: new FormControl('Smith'),
   }),
   lives: new FormControl(9),
});
// Type-checking for forms values!
// TS Error: Property 'substring' does not exist on type 'number'.
let remainingLives = cat.value.lives.substring(1);
// Optional and required controls are enforced!
// TS Error: No overload matches this call.
cat.removeControl('lives');
// FormGroups are aware of their child controls.
// name.middle is never on cat
let catMiddleName = cat.get('name.middle');

// v14 partial typed form, migrating `UntypedFormGroup` -> `FormGroup`
const cat = new FormGroup({
   name: new FormGroup(
      first: new UntypedFormControl('Barb'),
      last: new UntypedFormControl('Smith'),
   ),
   lives: new UntypedFormControl(9)
});
```

[⬆ back to top](#top)

### 新的 FormRecord 类

- 新的 "表单组 "类的缺点是它失去了它的动态性质。一旦定义了，你将不能在运行中添加或删除表单控件。
- 为了解决这个问题，Angular提出了新的类`FormRecord`。`FormRecord`实际上与`FormGroup`相同，但它是动态的，所有的表单控件都应该有相同的类型
- **注意:**  所有的FormControls必须是相同的类型。如果你真的需要动态和异质的FormGroup，应该使用UntypedFormGroup类来定义你的表单

```javascript
folders: new FormRecord({
  home: new FormControl(true, { nonNullable: true }),
  music: new FormControl(false, { nonNullable: true })
});
// Add new FormContol to the group 
this.foldersForm.get('folders').addControl('videos', new FormControl(false, { nonNullable: true }));
// This will throw compilation error as control has different type
this.foldersForm.get('folders').addControl('books', new FormControl('Some string', { nonNullable: true }));
```

[⬆ back to top](#top)

### problem

```javascript
/* Before Angular 14 */
const untypedControl = new FormControl(true);
untypedControl.setValue(100); // value is set, no errors
// Now
const strictlyTypedControl = new FormControl<boolean>(true);
strictlyTypedControl.setValue(100); // you will receive the type checking error message here
// Also in Angular 14
const strictlyTypedControl = new FormControl(true);
strictlyTypedControl.setValue(100); // you will receive the type checking error message here
```

- 如果提供了true的值，Angular就为这个FormControl设置`boolean | null`的类型。.reset()方法需要可置空的值，如果没有提供值，就会置空这些值
- 一个旧的、没有定义类型的FormControl类被转换为UntypedFormControl（对UntypedFormGroup、UntypedFormArray和UntypedFormBuilder来说也是如此），它实际上是FormControl<any>的别名。如果你从以前的Angular版本升级，你所有提到的FormControl类将被Angular CLI替换为UntypedFormControl类
- Note: **如果你的初始值是 "null"，那么你将需要明确指定FormControl类型**

[⬆ back to top](#top)

### solution 1

- 可以定义接口，并把这个接口作为表单组的类型传递。在这种情况下，TypeScript将推断出FormGroup中的所有类型

```javascript
interface LoginForm {
    email: FormControl<string>;
    password?: FormControl<string>;
}
const login = new FormGroup<LoginForm>({
    email: new FormControl('', {nonNullable: true}),
    password: new FormControl('', {nonNullable: true}),
});
```

[⬆ back to top](#top)

### solution  2

- 可以使用FormBuilder的方法.group()的新的 "nonNullable "表单生成器属性, `fb.nonNullable.group()`
- 它包含 "NonNullable FormBuilder表单生成器 "类实例，也可以直接创建
- **请注意**，
  - 如果使用nonNullable的FormBuilder或者你在FormControl中设置了nonNullable的选项，那么当你调用`.reset()`方法时，它将使用初始FormControl值作为重置值
  - 另外，非常重要的一点是，`this.form.value`中的所有属性都将被标记为可选属性, 因为当禁用表单组FormGroup内的任何表单控件FromControl时，这个表单控件的值将从form.value中删除
- 要获得整个表单对象，应该使用`.getRawValue()`方法

```javascript
const fb = new FormBuilder();
const login = fb.nonNullable.group({
    email: '',
    password: '',
});
login.get('email').disable();
// 要获得整个表单对象，应该使用.getRawValue()方法
console.log(login.getRawValue());
```

[⬆ back to top](#top)

## 3. Angular CLI Auto-Completion

- Angular CLI的自动完成功能最棒的地方在于，你可以通过交付创建模块、指令和组件所需的命令来提高工作效率。然而，Angular 14为你提供了大量方便的命令。你不需要担心在互联网上查找命令。下面是在Angular 14中如何做到这一点
- Angular 14在CLI中提供了最新的特性，允许在终端中实时自动完成。第一步，执行ng，补全命令。下一步是输入ng命令并按Tab查看所有可能的选项。输入以选择其中一个选项
- 另外，如果你使用的是最新的Angular 14版本，你可以在ng create命令选项列表中使用更多的自动完成选项

## 4. 改进的模板诊断

- Angular 14的新更新增强了模板诊断功能，通过编译器与typescript代码的协调，让开发者避免了泛型错误
- 在Angular 13和之前的版本中，编译器不会生成任何警告信号，如果有任何问题限制它这样做，它就会停止执行
- 一些可能的警告信号可能来自于一些基本问题，比如当变量不是空值时使用了不需要的操作符，或者双向绑定语法。此外，诊断测试受到新的私有编译器扩展的限制，该编译器显示用户模板的警告标志或信息诊断

## 5. 简化页面标题可访问性

通常，在应用程序开发期间，页面标题清楚地显示页面的内容。在之前的Angular 13中，添加标题的整个过程都是与新路由对齐的。Angular路由器中的title属性。然而，Angular 14不提供在向页面添加标题时所需的额外的imports。

## 6. Angular CDK中最新的原语(Primitives)

Angular 14有什么新特性? 嗯，Angular组件开发工具包(CDK)为Angular组件开发提供了一套全面的工具。在Angular 14中，CDK菜单和Dialog已经被驱动到了一个稳定的Angular版本。尽管如此，新的CDK原语允许创建更易于访问的自定义组件。

## 7. Angular DevTools

在离线模式下使用Angular的DevTools调试扩展很简单。这个扩展在Morzilla的插件下为Firefox用户提供。

## 8. 可选的注入器

如果你在Angular14中开发嵌入式视图，你可以使用可选的注入器TemplateRef.createEmbeddedView和ViewContainerRef.createEmbeddedView

## 9. 内置的改进

Angular14更新的一个有趣之处在于，它允许CLI部署小代码，而不会降低代码的价值。内置的增强功能可以帮助您直接从模板连接到受保护的组件成员。总之，您可以使用公共API对可重用组件进行更多的控制。

## 10. 扩展开发者诊断(Extended Developer Diagnostics)

- 扩展的开发者诊断是Angular14的一个特性，它提供了一个可扩展的框架，帮助更好地理解模板，并显示了促进潜在提升的建议。
- [Angular 模板中无用的无效合并运算符??的错误](https://link.juejin.cn/?target=https%3A%2F%2Fangular.io%2Fextended-diagnostics%2FNG8102)
  - 扩展诊断在 ng build、ng serve、 和 Angular 语言服务中实时显示为警告。诊断可在 tsconfig.json 中配置，可以在其中指定诊断应该是 warning、error 还是 suppress

```
{
  "angularCompilerOptions": {
    "extendedDiagnostics": {
      // The categories to use for specific diagnostics.
      "checks": {
        // Maps check name to its category.
        "invalidBananaInBox": "error"
        "nullishCoalescingNotNullable": "warning"
      },
      // The category to use for any diagnostics not listed in `checks` above.
      "defaultCategory": "suppress"
    },
    ...
  },
  ...
}
```

[⬆ back to top](#top)

> references
- [官方升级文档](https://update.angular.io/)
- [Angular 14有什么新特性?](https://blog.csdn.net/sumeiff/article/details/125679020)
- [翻译文章--Angular 14 新特性介绍](https://cn.community.intersystems.com/post/%E7%BF%BB%E8%AF%91%E6%96%87%E7%AB%A0-angular-14-%E6%96%B0%E7%89%B9%E6%80%A7%E4%BB%8B%E7%BB%8D)
- [Angular v14 现已推出](https://juejin.cn/post/7104925075211550756)
