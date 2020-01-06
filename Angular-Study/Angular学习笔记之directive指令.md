[Angular学习笔记之directive指令](#top)

- [Angular的指令分类](#angular%e7%9a%84%e6%8c%87%e4%bb%a4%e5%88%86%e7%b1%bb)
- [补充：host element(宿主元素)](#%e8%a1%a5%e5%85%85host-element%e5%ae%bf%e4%b8%bb%e5%85%83%e7%b4%a0)
  - [宿主元素事件监听-HostListener装饰器](#%e5%ae%bf%e4%b8%bb%e5%85%83%e7%b4%a0%e4%ba%8b%e4%bb%b6%e7%9b%91%e5%90%ac-hostlistener%e8%a3%85%e9%a5%b0%e5%99%a8)
  - [动态设置宿主元素的属性值-HostBinding属性装饰器](#%e5%8a%a8%e6%80%81%e8%ae%be%e7%bd%ae%e5%ae%bf%e4%b8%bb%e5%85%83%e7%b4%a0%e7%9a%84%e5%b1%9e%e6%80%a7%e5%80%bc-hostbinding%e5%b1%9e%e6%80%a7%e8%a3%85%e9%a5%b0%e5%99%a8)
  - [获取宿主元素属性值](#%e8%8e%b7%e5%8f%96%e5%ae%bf%e4%b8%bb%e5%85%83%e7%b4%a0%e5%b1%9e%e6%80%a7%e5%80%bc)
- [补充： 模板元素<ng-template>和ngTemplateOutlet指令-内嵌视图的操作](#%e8%a1%a5%e5%85%85-%e6%a8%a1%e6%9d%bf%e5%85%83%e7%b4%a0ng-template%e5%92%8cngtemplateoutlet%e6%8c%87%e4%bb%a4-%e5%86%85%e5%b5%8c%e8%a7%86%e5%9b%be%e7%9a%84%e6%93%8d%e4%bd%9c)
- [属性指令](#%e5%b1%9e%e6%80%a7%e6%8c%87%e4%bb%a4)
  - [内置属性指令](#%e5%86%85%e7%bd%ae%e5%b1%9e%e6%80%a7%e6%8c%87%e4%bb%a4)
  - [自定义属性指令](#%e8%87%aa%e5%ae%9a%e4%b9%89%e5%b1%9e%e6%80%a7%e6%8c%87%e4%bb%a4)
- [结构指令](#%e7%bb%93%e6%9e%84%e6%8c%87%e4%bb%a4)
  - [内置结构指令](#%e5%86%85%e7%bd%ae%e7%bb%93%e6%9e%84%e6%8c%87%e4%bb%a4)
  - [自定义结构指令](#%e8%87%aa%e5%ae%9a%e4%b9%89%e7%bb%93%e6%9e%84%e6%8c%87%e4%bb%a4)
  - [TemplateRef vs. ViewContainerRef](#templateref-vs-viewcontainerref)

## Angular的指令分类

Angular的指令分为三种：

- 组件(Component directive)：用于构建UI组件，继承于Directive 类
- 属性指令(Attribute directive)：用于改变组件的外观或行为
- 结构指令(Structural directive)：用于动态添加或删除 DOM元素来改变DOM布局
- **指令与组件的关系:** 组件继承于指令，并扩展了与UI视图相关的属性，如 template、styles、animations、encapsulation 等
- ![](https://i.imgur.com/55yObif.png)

## 补充：host element(宿主元素)

- host element(宿主元素): 应用指令的元素，就是宿主元素

![](https://i.imgur.com/ekS34Uc.png)

### 宿主元素事件监听-HostListener装饰器

```javascript
//HostListenerDecorator 装饰器定义
export interface HostListenerDecorator {
    (eventName: string, args?: string[]): any;
    new (eventName: string, args?: string[]): any;
}
//HostListenerDecorator装饰器应用, counting.directive.ts
import { Directive, HostListener } from '@angular/core';
@Directive({
    selector: 'button[counting]'
})
class CountClicks {
    numberOfClicks = 0;
    @HostListener('click', ['$event.target'])
    onClick(btn: HTMLElement) {
        console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
    }
}
//app.component.ts
@Component({
  selector: 'exe-app',
  styles: [`
    button {
      background: blue;
      color: white;
      border: 1px solid #eee;
    }
  `],
  template: `<button counting>增加点击次数</button>`
})
export class AppComponent {}
```

**也可以在指令的metadata信息中，设定宿主元素的事件监听信息**

```javascript
import { Directive } from '@angular/core';
@Directive({
    selector: 'button[counting]',
    host: { '(click)': 'onClick($event.target)' }   //metadata
})
export class CountClicks {
    numberOfClicks = 0;
    onClick(btn: HTMLElement) {
        console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
    }
}
```

### 动态设置宿主元素的属性值-HostBinding属性装饰器

```javascript
//HostBinding 装饰器定义
export interface HostBindingDecorator {
    (hostPropertyName?: string): any;
    new (hostPropertyName?: string): any;
}
//HostBinding 装饰器应用, button-press.directive.ts
import { Directive, HostBinding, HostListener } from '@angular/core';
@Directive({
    selector: '[exeButtonPress]'
})
export class ExeButtonPress {
    @HostBinding('attr.role') role = 'button';
    @HostBinding('class.pressed') isPressed: boolean;
    @HostListener('mousedown') hasPressed() {
        this.isPressed = true;
    }
    @HostListener('mouseup') hasReleased() {
        this.isPressed = false;
    }
}
//app.component.ts
@Component({
  selector: 'exe-app',
  styles: [`
    button {
      background: blue;
      color: white;
      border: 1px solid #eee;
    }
    button.pressed {
      background: red;
    }
  `],
  template: `<button exeButtonPress>按下按钮</button>`
})
export class AppComponent { }
```

**也可以在指令的metadata信息中，设定宿主元素的属性绑定信息**

```javascript
import { Directive, HostListener } from '@angular/core';
@Directive({
    selector: '[exeButtonPress]',
    host: {    //metadata
      'role': 'button',
      '[class.pressed]': 'isPressed'
    }
})
export class ExeButtonPress {
    isPressed: boolean;
    @HostListener('mousedown') hasPressed() {
        this.isPressed = true;
    }
    @HostListener('mouseup') hasReleased() {
        this.isPressed = false;
    }
}
```

[back to top](#top)

### 获取宿主元素属性值

- `@Input`       -> 定义输入属性
- `@HostBinding` -> 操作宿主元素的属性
- `@Attribute`   -> 获取指令宿主元素的属性值(自定义属性？？？)
- `@ViewChild`   -> 获取视图中定义的模板元素

```javascript
import { Directive, HostBinding, HostListener, Input, Attribute } from '@angular/core';
@Directive({ selector: '[greet]'})
export class GreetDirective {
    @Input() greet: string;
    @HostBinding() get innerText() {
        return this.greet;
    }
    @HostListener('click',['$event'])
    onClick(event) {
        this.greet = 'Clicked!';
        console.dir(event);
    }
    constructor(@Attribute('author') public author: string) {
        console.log(author);
    }
}
//指令的应用
@Component({
  selector: 'app-root',
  template: `
    <h2>Hello, Angular</h2>
    <h2 [greet]="'Hello, Semlinker!'"
      author="semlinker">Hello, Angular</h2>
  `,
})
export class AppComponent { }
```

[back to top](#top)

## 补充： 模板元素<ng-template>和ngTemplateOutlet指令-内嵌视图的操作

- `@ViewChild`用来获取视图中定义的模板元素，然后利用`ViewContainerRef`对象的 `createEmbeddedView()`方法，创建内嵌视图
- ngTemplateOutlet指令用于基于已有的`TemplateRef`对象，插入对应的内嵌视图
  - 在应用NgTemplateOutlet指令时，可通过`[ngTemplateOutletContext]`属性来设置 `EmbeddedViewRef`的上下文对象。绑定的上下文应该是一个对象

```javascript
import { Component, TemplateRef, ViewContainerRef, ViewChild,
  AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `<ng-template #tpl> Hello, Semlinker!</ng-template>`,
})
export class AppComponent implements AfterViewInit{
  @ViewChild('tpl')
  tplRef: TemplateRef<any>;
  constructor(private vcRef: ViewContainerRef) {}
  ngAfterViewInit() {
    this.vcRef.createEmbeddedView(this.tplRef);
  }
}
```

```javascript
//ngTemplateOutlet的使用
@Component({
  selector: 'app-root',
  template: `
    <ng-template #stpl>Hello, Semlinker!</ng-template>
    <ng-template #atpl>Hello, Angular!</ng-template>
    <div [ngTemplateOutlet]="atpl"></div>
    <div [ngTemplateOutlet]="stpl"></div>
  `,
})
export class AppComponent { }
//ngOutletContext的使用
@Component({
  selector: 'app-root',
  template: `
    <ng-template #stpl let-message="message"><p>{{message}}</p></ng-template>
    <ng-template #atpl let-msg="message"><p>{{msg}}</p></ng-template>
    <ng-template #otpl let-msg><p>{{msg}}</p></ng-template>
    <div [ngTemplateOutlet]="atpl"
      [ngTemplateOutletContext]="context">
    </div>
    <div [ngTemplateOutlet]="stpl"
      [ngTemplateOutletContext]="context">
    </div>
    <div [ngTemplateOutlet]="otpl"
      [ngTemplateOutletContext]="context">
    </div>
  `,
})
export class AppComponent {
  context = { message: 'Hello ngOutletContext!',
    $implicit: 'Hello, Semlinker!' };
}
```

[back to top](#top)

## 属性指令

### 内置属性指令

```html
<!-- 1.ngStyle指令： 用于设定给定DOM元素的style属性-->
<!-- 绑定常量 -->
<div [ngStyle]="{'background-color': 'green'}"></div>
<!-- 绑定表达式 -->
<div [ngStyle]="{'background-color': person.country === 'UK' ? 'green' : 'red'}">
<!-- 还可以使用 [style.<property>]的语法： -->
 <ul *ngFor="let person of people">
     <li [style.color]="getColor(person.country)">
        {{ person.name }} ({{person.country}})
     </li>
</ul>
<!-- 2.ngClass指令：用于动态的设定DOM元素的CSS class-->
<!-- 绑定常量 -->
<div [ngClass]="{'text-success': true }"></div>
<!-- 绑定表达式 -->
<div [ngClass]="{'text-success': person.country === 'CN'}"></div>
```

### 自定义属性指令

```javascript
//指令定义
import { Directive, HostBinding} from '@angular/core';
@Directive({
    selector: '[greet]'  //属性指令
})
export class GreetDirective {
  @HostBinding() innerText = 'Hello, Everyone!';
}
//指令的应用
@Component({
  selector: 'app-root',
  template: `<h2 greet>Hello, Angular</h2>`,  //
})
export class AppComponent { }
```

[back to top](#top)

## 结构指令

### 内置结构指令

- *语法糖是ngIf和ngFor语法的一种简写形式。Angular引擎在解析时会自动转换成 <template> 标准语法

```html
<!-- 1.ngIf指令： -->
<!-- 指令标准形式 -->
<template [ngIf]='condition'>
   <p>I am the content to show</p>
</template>
<!-- 指令定义 -->
<div *ngIf="person.country === 'CN'">{{ person.name }} ({{person.country}})</div>
<!-- 2.ngFor指令： -->
<!-- 指令标准形式 -->
<template ngFor [ngForOf]="people" let-person>
   <div> {{ person.name }} ({{person.country}}) </div>
</template>
<!-- 指令定义 -->
<div *ngFor="let person of people">{{person.name}}</div>
<!-- 3.ngSwitch指令：包括两个指令，一个属性指令和一个结构指令 -->
<!-- 指令标准形式 -->
<ul [ngSwitch]='person.country'>
  <template [ngSwitchCase]="'UK'">
      <li class='text-success'>
          {{ person.name }} ({{person.country}})
        </li>
  </template>
  <template [ngSwitchCase]="'USA'">
      <li class='text-secondary'>
          {{ person.name }} ({{person.country}})
        </li>
  </template>
  <template [ngSwitchDefault]>
      <li class='text-primary'>
          {{ person.name }} ({{person.country}})
        </li>
  </template>
</ul>
<!-- 指令定义 -->
<ul [ngSwitch]='person.country'>
  <li *ngSwitchCase="'UK'" class='text-success'>
      {{ person.name }} ({{person.country}})
  </li>
   <li *ngSwitchCase="'USA'" class='text-secondary'>
      {{ person.name }} ({{person.country}})
  </li>
  <li *ngSwitchDefault class='text-primary'>
    {{ person.name }} ({{person.country}})
  </li>
</ul>
```

[back to top](#top)

### 自定义结构指令

```javascript
//实现ngIf指令相反的效果，当指令的输入条件为False值时，显示DOM元素
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
@Directive({
    selector: '[exeUnless]'
})
export class UnlessDirective {
    @Input('exeUnless')
    set condition(newCondition: boolean) {
        if (!newCondition) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
    constructor(private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) {
    }
}
//指令的应用
@Component({
  selector: 'app-root',
  template: ` <h2 *exeUnless="condition">Hello, Semlinker!</h2> `,
})
export class AppComponent {
  condition: boolean = false;
}
```

### TemplateRef vs. ViewContainerRef

- **TemplateRef：** 用于表示内嵌的template模板元素，通过TemplateRef实例，我们可以方便创建内嵌视图(Embedded Views)，且可以轻松地访问到通过ElementRef封装后的 nativeElement。需要注意的是组件视图中的template模板元素，经过渲染后会被替换成 comment元素
- **ViewContainerRef：** 用于表示一个视图容器，可添加一个或多个视图。通过ViewContainerRef实例，可基于TemplateRef实例创建内嵌视图，并能指定内嵌视图的插入位置，也可以方便对视图容器中已有的视图进行管理。简而言之，ViewContainerRef **的主要作用是创建和管理内嵌视图或组件视图**

> Reference
- [Angular 2 Directive](https://segmentfault.com/a/1190000008626070#item-7)
- [Angular 4 指令快速入门](https://segmentfault.com/a/1190000009674089#item-4-5)
