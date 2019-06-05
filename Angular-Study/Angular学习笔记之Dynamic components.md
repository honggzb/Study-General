[Angular Dynamic components](#top)

- [组件工厂和编译器](#%E7%BB%84%E4%BB%B6%E5%B7%A5%E5%8E%82%E5%92%8C%E7%BC%96%E8%AF%91%E5%99%A8)
- [组件工厂解析器（ComponentFactoryResolver）-组件在同一个module](#%E7%BB%84%E4%BB%B6%E5%B7%A5%E5%8E%82%E8%A7%A3%E6%9E%90%E5%99%A8componentfactoryresolver-%E7%BB%84%E4%BB%B6%E5%9C%A8%E5%90%8C%E4%B8%80%E4%B8%AAmodule)
- [动态加载和编译模块-组件不在同一个module](#%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BD%E5%92%8C%E7%BC%96%E8%AF%91%E6%A8%A1%E5%9D%97-%E7%BB%84%E4%BB%B6%E4%B8%8D%E5%9C%A8%E5%90%8C%E4%B8%80%E4%B8%AAmodule)
  - [使用`SystemJsNgModuleLoader`模块加载器- 在entryComponents中注册的或者在组件模板中使用的组件](#%E4%BD%BF%E7%94%A8systemjsngmoduleloader%E6%A8%A1%E5%9D%97%E5%8A%A0%E8%BD%BD%E5%99%A8--%E5%9C%A8entrycomponents%E4%B8%AD%E6%B3%A8%E5%86%8C%E7%9A%84%E6%88%96%E8%80%85%E5%9C%A8%E7%BB%84%E4%BB%B6%E6%A8%A1%E6%9D%BF%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%9A%84%E7%BB%84%E4%BB%B6)
  - [使用compileModuleAndAllComponentsAsync方法自己去加载模块- 组件没有注册在entryComponents属性里](#%E4%BD%BF%E7%94%A8compilemoduleandallcomponentsasync%E6%96%B9%E6%B3%95%E8%87%AA%E5%B7%B1%E5%8E%BB%E5%8A%A0%E8%BD%BD%E6%A8%A1%E5%9D%97--%E7%BB%84%E4%BB%B6%E6%B2%A1%E6%9C%89%E6%B3%A8%E5%86%8C%E5%9C%A8entrycomponents%E5%B1%9E%E6%80%A7%E9%87%8C)
- [运行时动态创建组件](#%E8%BF%90%E8%A1%8C%E6%97%B6%E5%8A%A8%E6%80%81%E5%88%9B%E5%BB%BA%E7%BB%84%E4%BB%B6)
- [组件销毁](#%E7%BB%84%E4%BB%B6%E9%94%80%E6%AF%81)
- [ngOnChanges](#ngonchanges)

**组件b-comp 如何动态加载组件a-comp**

- **如果两个在同一个module，直接调用ComponentFactoryResolver等API就行**
- **如果不在同一个module，就使用SystemJsNgModuleLoader模块加载器**

一些概念

- JIT和AOT Compiler
  - AOT(Ahead Of Time) Compiler: compile在build阶段生成，这个Compiler不会被打包到依赖包里
  - JIT(Just In Time) compiler： compile在run阶段生成， 这个Compiler会被打包到依赖包里，用户下载到本地，在运行时 Compiler 会编译组件/指令类生成对应的视图工厂类
- 静态模板（static templates）
- 指令/模块工厂（ComponentFactory）: Angular Compiler把组件如a.component.ts编译为a.component.ngfactory.js，即Compiler使用@Component decorator作为原材料，把组件/指令类编译为另一个视图工厂类
- 工厂解析器（ComponentFactoryResolver）: 一个对象，通过它拿到那些编译后的factory对象一个对象，通过它拿到那些编译后的factory对象

## 组件工厂和编译器

- Angular中每一个组件是由组件工厂创建的，组件工厂又是由编译器根据你写的`@Component`装饰器里的元数据编译生成的
- Angular内部使用了**视图**概念，或者说整个框架是一颗视图树。每一个视图是由大量不同类型节点（node）组成的：元素节点，文本节点等等, 可查看[译 Angular DOM 更新机制](https://juejin.im/post/5ad35b0cf265da2381561347)
  - 每一个节点都有其专门作用，这样每一个节点的处理只需要花很少的时间，并且每一个节点都有**ViewContainerRef**和**TemplateRef**等服务供使用，还可以使用**ViewChild/ViewChildren**和**ContentChild/ContentChildren**做DOM查询这些节点
  - 简单点说就是Angular程序是一颗视图树，每一个视图（view）又是有多种节点（node）组成的，每一个节点又提供了模板操作API给开发者使用，这些节点可以通过DOM Query API拿到

```javascript
@Component({
  selector: 'a-comp',
  template: '<span>A Component</span>'
})
class AComponent {}
// 生成类似如下的组件工厂代码
function View_AComponent_0(l) {   //整个代码可理解为视图
  return jit_viewDef1(0,[
      elementDef2(0,null,null,1,'span',...),  //可理解为节点
      jit_textDef3(null,['My name is ',...])   //可理解为节点
    ]
//...
//可使用 ViewContainerRef API 把该组件/视图插入DOM中
export class SampleComponent implements AfterViewInit {
    @ViewChild("vc", {read: ViewContainerRef}) vc: ViewContainerRef;
    ngAfterViewInit() {
        this.vc.createComponent(componentFactory);
    }
}
```

[back to top](#top)

## 组件工厂解析器（ComponentFactoryResolver）-组件在同一个module

```javascript
//module
@NgModule({
    declarations: [FRAComponent, FRBComponent],
    entryComponents: [FRAComponent, FRBComponent],  //组件在同一个module
    exports: [FRAComponent, FRBComponent]
})
export class FRModule {}
// FRAComponent
import {Component, ComponentFactoryResolver, ViewChild, ViewContainerRef} from "@angular/core";
import {FRBComponent} from "./b.component";
@Component({
    moduleId: module.id,
    selector: 'fr-a-component',
    template: 'I am A component that inserts dynamic B component below: <div #vc></div>'
})
export class FRAComponent {
    @ViewChild('vc', {read: ViewContainerRef}) _container: ViewContainerRef;
    constructor(private _resolver: ComponentFactoryResolver) {}
    ngAfterViewInit() {
        const cmpFactory = this._resolver.resolveComponentFactory(FRBComponent);
        this._container.createComponent(cmpFactory);
    }
}
```

[back to top](#top)

## 动态加载和编译模块-组件不在同一个module

### 使用`SystemJsNgModuleLoader`模块加载器- 在entryComponents中注册的或者在组件模板中使用的组件

load() 函数内部其实是使用了编译器的compileModuleAsync方法，该方法只会为在entryComponents中注册的或者在组件模板中使用的组件，去创建组件工厂

```javascript
@Component({
  providers: [
    {
      provide: NgModuleFactoryLoader,   //注册
      useClass: SystemJsNgModuleLoader 
    }
  ]
})
export class ModuleLoaderComponent {
  constructor(private _injector: Injector,
              private loader: NgModuleFactoryLoader) {
  }
  ngAfterViewInit() {
    //SystemJsNgModuleLoader模块加载器有一个load方法来把模块加载到浏览器里，同时编译该模块和在该模块中申明的所有组件
    this.loader.load('app/t.module#TModule').then((factory) => {
      const module = factory.create(this._injector);
      const r = module.componentFactoryResolver;
      const cmpFactory = r.resolveComponentFactory(AComponent);
      
      // create a component and attach it to the view
      const componentRef = cmpFactory.create(this._injector);
      this.container.insert(componentRef.hostView);
    })
  }
}
```

### 使用compileModuleAndAllComponentsAsync方法自己去加载模块- 组件没有注册在entryComponents属性里

使用compileModuleAndAllComponentsAsync方法自己去加载模块。该方法会为模块里所有组件生成组件工厂，并返回 ModuleWithComponentFactories 对象

```javascript
ngAfterViewInit() {
  System.import('app/t.module').then((module) => {
      _compiler.compileModuleAndAllComponentsAsync(module.TModule)
        .then((compiled) => {
          const m = compiled.ngModuleFactory.create(this._injector);
          const factory = compiled.componentFactories[0];
          const cmp = factory.create(this._injector, [], null, m);
        })
    })
}
```

[back to top](#top)

## 运行时动态创建组件

如模块是在运行时之前定义的，并且模块是可以提前或延迟加载的。也可以不需要提前定义模块，像AngularJS的方式在运行时创建模块和组件, 动态创建视图的一般流程如下：

- 定义组件类及其属性，并使用装饰器装饰组件类
- 定义模块类，在模块类中申明组件类，并使用装饰器装饰模块类
- 编译模块和模块中所有组件，拿到所有组件工厂

在运行时，可以使用这些装饰器如 @NgModule()/@Component() 去装饰任何类

```javascript
// AngularJS 的代码
const template = '<span>generated on the fly: {{name}}</span>'
const linkFn = $compile(template);
const dataModel = $scope.$new();
dataModel.name = 'dynamic'
linkFn(dataModel);  // link data model to a template

// Angular的代码
@ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;
constructor(private _compiler: Compiler,
            private _injector: Injector,
            private _m: NgModuleRef<any>) {}

ngAfterViewInit() {
  const template = '<span>generated on the fly: {{name}}</span>';
  const tmpCmp = Component({template: template})(class {
  });
  const tmpModule = NgModule({declarations: [tmpCmp]})(class {
  });
  this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
    .then((factories) => {
      const f = factories.componentFactories[0];
      const cmpRef = this.vc.createComponent(tmpCmp);
      cmpRef.instance.name = 'dynamic';
    })
}
```

[back to top](#top)

## 组件销毁

```javascript
ngOnDestroy() {
  if(this.cmpRef) {
    this.cmpRef.destroy();
  }
}
```

[back to top](#top)

## ngOnChanges

- 对于所有动态加载的组件，Angular 会像对静态加载组件一样也执行变更检测，这意味着ngDoCheck也同样会被调用
- 然而，就算动态加载组件申明了`@Input`输入绑定，但是如果父组件输入绑定属性发生改变，该动态加载组件的`ngOnChanges`不会被触发。这是因为这个检查输入变化的`ngOnChanges`函数，只是在编译阶段由编译器编译后重新生成，该函数是组件工厂的一部分，编译时是根据模板信息编译生成的。因为动态加载组件没有在模板中被使用，所以该函数不会由编译器编译生成

[back to top](#top)

> Reference
- [译-关于Angular动态组件你需要知道的](https://segmentfault.com/a/1190000014688076)
- [](https://blog.angularindepth.com/here-is-what-you-need-to-know-about-dynamic-components-in-angular-ac1e96167f9e)
- [How I built a customizable loading-indicator with Angular dynamic components](https://www.freecodecamp.org/news/how-i-built-a-customizable-loading-indicator-with-angular-dynamic-components-a291310f01d/)
- https://github.com/TapaiBalazs/angular-reusables/tree/master/projects/loading-indicator
