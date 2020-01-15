[Angular学习笔记之模板ng-template, ng-content, ng-container and ngTemplateOutlet](#top)

- [ng-template](#ng-template)
  - [借助其他结构型指令如ngIf，来显示ng-template的内容](#%e5%80%9f%e5%8a%a9%e5%85%b6%e4%bb%96%e7%bb%93%e6%9e%84%e5%9e%8b%e6%8c%87%e4%bb%a4%e5%a6%82ngif%e6%9d%a5%e6%98%be%e7%a4%bang-template%e7%9a%84%e5%86%85%e5%ae%b9)
  - [通过TemplateRef、ViewContainerRef把ng-template对应的元素显示出来](#%e9%80%9a%e8%bf%87templaterefviewcontainerref%e6%8a%8ang-template%e5%af%b9%e5%ba%94%e7%9a%84%e5%85%83%e7%b4%a0%e6%98%be%e7%a4%ba%e5%87%ba%e6%9d%a5)
  - [通过NgTemplateOutlet指令来显示已有的ng-template对应的视图](#%e9%80%9a%e8%bf%87ngtemplateoutlet%e6%8c%87%e4%bb%a4%e6%9d%a5%e6%98%be%e7%a4%ba%e5%b7%b2%e6%9c%89%e7%9a%84ng-template%e5%af%b9%e5%ba%94%e7%9a%84%e8%a7%86%e5%9b%be)
  - [补充：ng-container](#%e8%a1%a5%e5%85%85ng-container)
- [ng-content](#ng-content)
  - [select属性select=&quot;xx&quot;，指定html标签或者组件投射的ng-content位置](#select%e5%b1%9e%e6%80%a7selectquotxxquot%e6%8c%87%e5%ae%9ahtml%e6%a0%87%e7%ad%be%e6%88%96%e8%80%85%e7%bb%84%e4%bb%b6%e6%8a%95%e5%b0%84%e7%9a%84ng-content%e4%bd%8d%e7%bd%ae)
  - [ngProjectAs](#ngprojectas)
  - [获取ng-conent包含组件](#%e8%8e%b7%e5%8f%96ng-conent%e5%8c%85%e5%90%ab%e7%bb%84%e4%bb%b6)
- [Demo of using ng-conent- icon input](#demo-of-using-ng-conent--icon-input)
  - [style projected content](#style-projected-content)
  - [interact with projected content](#interact-with-projected-content)
- [sample + codes](https://github.com/honggzb/Study-General/tree/master/Angular-Study/Sample-general/tabs-for-ngTemplete%2Bng-content)

## ng-template

- `ng-template`是一个默认隐藏的元素,用来定义模板的, 其本身是不渲染
- `ng-template`是Angular结构型指令中的一种，用于定义模板渲染HTML(模板加载)。定义的模板不会直接显示出来，需要通过其他结构型指令（如`ng-if`）或`template-ref`将模块内容渲染到页面中， 或用`ng-container`和`templateOutlet`指令来进行使用
- ng-template在编写高定制性的组件时非常有用。可以把需要定制的内容作为模板传到组件中
- 通常将它当作一个嵌入式的模版, 通过`ViewChild`获取它的一个实例

### 借助其他结构型指令如ngIf，来显示ng-template的内容

```html
<div class="lessons-list" *ngIf="condition else elseTemplate">
    判断条件为真
</div>
<ng-template #elseTemplate>
    <div>判断条件为假</div>
</ng-template>
```

### 通过`TemplateRef`、`ViewContainerRef`把`ng-template`对应的元素显示出来

- TemplateRef对应ng-template的引用，
- ViewContainerRef呢则是view容器的引用用来操作DOM元素

```javascript
import {AfterViewInit, Component, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
@Component({
    selector: 'app-template-section',
    template: `
        <ng-template #tpl>
            Hello, ng-template!
        </ng-template>
    `,
    styleUrls: ['./template-section.component.less']
})
export class TemplateSectionComponent implements AfterViewInit {
    @ViewChild('tpl')
    tplRef: TemplateRef<any>;
    constructor(private vcRef: ViewContainerRef) {
    }
    ngAfterViewInit() {
        this.vcRef.createEmbeddedView(this.tplRef);  // 这样tplRef对应的ng-template内容就显示出来了
    }
}
````

### 通过`NgTemplateOutlet`指令来显示已有的`ng-template`对应的视图

- `NgTemplateOutlet`指令用于基于已有的`TemplateRef`对象，插入对应的内嵌视图
- 可以通过`[ngTemplateOutletContext]`属性来设置`ng-template`的上下文对象，绑定的上下文应该是一个对象
- `ng-template`中通过`let-xx="yy"`语法来声明绑定上下文对象属性名
  - `xx`是在`ng-template`内部使用的变量名字
  - `yy`是`xx`变量的上下文对象属性的值
  - `let-param`取的是绑定对象`myContext`的`$implicit`字段的值，`let-param`相和`let-param="$implicit"`是等价的，`let-name="name"`取的是绑定对象`myContext`里面`name`字段对应的值

**Sample1: 带参数的ng-template**

```javascript
import {AfterViewInit, Component, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
@Component({
    selector: 'app-ng-template',
    template: `
        <ng-template #inputTemplateWithContent let-param let-name="name">
            <div>{{param}} - {{name}}</div>
        </ng-template>
        <ng-container *ngTemplateOutlet="inputTemplateWithContent; context: myContext"></ng-container>
    `,
    styleUrls: ['./ng-template.component.less']
})
export class NgTemplateComponent {
    myContext = {$implicit: '默认值', name: 'tuacy'};
}
```

**Sample2: ng-template的内容，做为一个组件的参数**

```javascript
@Component({
    selector: 'app-template-input',
    template: `
        <!-- 没有传递参数的时候就使用defaultTemplate里面的布局 -->
        <ng-template #defaultTemplate>
            <div>咱们没有传递参数</div>
        </ng-template>
        <ng-container *ngTemplateOutlet="inputTemplate ? inputTemplate: defaultTemplate"></ng-container>
    `,
    styleUrls: ['./template-input.component.less']
})
export class TemplateInputComponent {
    //模板作为参数
    @Input()
    inputTemplate: TemplateRef<any>;
}
// 使用的时候的代码
<!-- 定义一个组件，把ng-template的内容作为参数传递进去 -->
<ng-template #paramTemplate>
    <div>我是参数</div>
</ng-template>
<app-template-input [inputTemplate]="paramTemplate"></app-template-input>
```

[back to top](#top)

### 补充：ng-container

- `<ng-container>`是Angular2定义的一个特殊的tag, 仅仅是作为一个容器使用，可直接包裹任何元素，包括文本，但本身不会生成元素标签，也不会影响页面样式和布局
- `<ng-container>`包裹的内容，如果不通过其他指令控制，会直接渲染到页面中
- `<ng-container>`作用
  - 一个重要的作用就是和`ng-template`一起使用
  - 还有一个用处就是配合`ngFor`和`*ngIf`使用, 因为`ngFor`和`*ngIf`不能同时处在一个元素上

```javascript
@Component({
    selector: 'app-ng-container',
    template: `
        <h1>ng-container</h1>
        <ul>
            <ng-container *ngFor="let item of list;let index=index">
                <li *ngIf="index%2 === 0">
                    {{"index is " + index + " value is " + item}}
                </li>
            </ng-container>
        </ul>
    `,
    styleUrls: ['./ng-container.component.less']
})
export class NgContainerComponent {
    list = ['1号位置', '2号位置', '3号位置', '4号位置', '5号位置', '6号位置', '7号位置', '8号位置', '9号位置'];
}
```

[back to top](#top)

## ng-content

- `<ng-content>`是一个内容映射，内容映射指的是在组件中嵌入模板代码，方便定制可复用的组件

### select属性`select="xx"`，指定html标签或者组件投射的ng-content位置

- xx可以是：
  - HTML标签或者组件的名字, `select="div"`
  - class名字, `select=".select-class"`
  - key-value的形式, `select="[name=test]"` -> n`g-content`位置只会放设置了属性name=”test“的html标签或者组件
  - key的形式, `select="[key]"` -> ng-content会选择设置有key的属性的html标签或者组件
- **强调一点select的值不能设置为动态的**

### ngProjectAs

- 不管是select标签或者组件的名字、或者class、或者是属性都是作用在直接子节点上

```javascript
@Component({
    selector: 'app-content-section',
    template: `
        <div>
            <h1>ng content</h1>
            <div style="background-color: #039be5">
                <ng-content select="app-content-child"></ng-content>
            </div>
        </div>
    `,
    styleUrls: ['./content-section.component.less']
})
export class ContentSectionComponent {
}
```

**下面中情况下ng-content没有投射到对应的内容**

```html
<app-content-section>
    <ng-container>
        <app-content-child [title]="'测试下'"></app-content-child>
    </ng-container>
</app-content-section>
```

通过使用`ngProjectAs`(work with`<ng-container>`)让ng-content的内容能正确的投射过来。

```html
<app-content-section>
    <ng-container ngProjectAs="app-content-child">
        <app-content-child [title]="'测试下'"></app-content-child>
    </ng-container>
</app-content-section>
```

### 获取ng-conent包含组件

- `@ContentChild`和`@ContentChildren`来获取ng-conent里面包含的组件(类似`@ViewChild`和`@ViewChildren`)
  
```javascript
@Component({
    selector: 'app-content-section',
    template: `
        <div>
            <h1>ng content</h1>
            <ng-content></ng-content>
        </div>
    `,
    styleUrls: ['./content-section.component.less']
})
export class ContentSectionComponent implements AfterContentInit {
    @ContentChild('section_child_0')   // 通过 #section_child_0 获取组件
    childOne: ContentChildComponent;
    @ContentChildren(ContentChildComponent)   // 通过 ContentChildComponent 组件名获取组件
    childrenList: QueryList<ContentChildComponent>;
    ngAfterContentInit(): void {
        console.log(this.childOne);
        this.childrenList.forEach((item) => {
            console.log(item);
        });
    }
}
// 使用app-content-section
import {Component} from '@angular/core';
@Component({
    selector: 'app-ng-content',
    template: `
        <app-content-section>
            <app-content-child #section_child_0 [title]="title_0"></app-content-child>
            <app-content-child #section_child_1 [title]="title_1"></app-content-child>
        </app-content-section>
    `,
    styleUrls: ['./ng-content.component.less']
})
export class NgContentComponent {
    title_0 = 'child_0';
    title_1 = 'child_1';
}
```

[back to top](#top)

## Demo of using ng-conent- icon input

- @HostBinding()可以为指令的宿主元素添加类、样式、属性等
- @HostListener()可以监听宿主元素上的事件

**Benefit of using projected content -no need to forward all properties**

- can support HTML itself attributes, such as `<input type="email" autocomplete="off" placeholder='Email'>`
- integration with angular forms
- can detect plain browser events
- can use custom third party properties, such as `data-`

### style projected content

```css
:host /deep/ input {
  border: none;
  outline: none;
}
```

### interact with projected content

cannot interact with the ng-content tag. Instead, the best way to interact with the projected input is to start by applying a new separate directive to the input.

```javascript
//input-ref.directive.ts
@Directive({
  selector: '[inputRef]'
})
export class InputRefDirective {
  focus = false;
 @HostListener("focus")
 onfocus(){
   this.focus = true;
 }
 @HostListener("blur")
 onblur(){
   this.focus = false;
 }
}
//icon-input.component.ts- for fontawesome
//<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
@Component({
  selector: 'icon-input',
  template: `
    <i class="fa" [ngClass]="classes"></i>
    <ng-content></ng-content>`,
  style: `
    :host {
      border: 1px solid grey;
      display: inline-block;
    }
    :host /deep/ input {
      border: none;
      outline: none;
      padding-left: 3px;
    }
    :host(.focus) {
      border: 1px solid blue;
    }`
})
export class IconInputComponent {
  @Input() icon: string;
  @ContentChild(InputRefDirective)   //获取ng-conent包含组件
  input: InputRefDirective
  @HostBinding("class.focus")
  get focus() {
    return this.input ? this.input.focus : false;
  }
  @Output() inputValue = new EventEmitter();
  inputFocus = false;

  get classes() {
    const cssClasses = { fa: true };
    cssClasses['fa-' + this.icon] = true;
    return cssClasses;
  }
}
//icon-input.component.ts- for material Design
//<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
@Component({
    selector: 'au-md-input',
    template: `
        <i class="md-icon" [innerHtml]="icon"></i>
        <ng-content></ng-content>`,
    styles: [ commonCss, defaultThemeCss , mdInputStyles ]
})
export class AuMdInputComponent implements AfterContentInit {
    @Input()
    icon: string;
    @ContentChild(InputRefDirective)
    input: InputRefDirective;
    ngAfterContentInit() {
        if (!this.input) {
            console.error("the au-md-input needs an input inside its content");
        }
    }
    @HostBinding('class.input-focus')
    get isInputFocus() {
        return this.input ? this.input.focus : false;
    }
}
```

> https://github.com/angular-university/au-input

[back to top](#top)

- [project demo1-tabs](https://github.com/honggzb/Study-General/tree/master/Angular-Study/Sample-general/tabs-for-ngTemplete%2Bng-content)
- [project demo2-modal](https://github.com/honggzb/Study-General/tree/master/Angular-Study/Sample-general/tabs-for-ngTemplete%2Bng-content)
- [<ng-template>, <ng-content>, <ng-container> and *ngTemplateOutlet in Angular](https://medium.freecodecamp.org/everything-you-need-to-know-about-ng-template-ng-content-ng-container-and-ngtemplateoutlet-4b7b51223691)
- [ng-template、ng-content、ng-container](https://www.jianshu.com/p/0f5332f2bbf8)
- [Angular ng-template, ng-container and ngTemplateOutlet - The Complete Guide To Angular Templates](https://blog.angular-university.io/angular-ng-template-ng-container-ngtemplateoutlet/)
