https://github.com/sudheerj/angular-interview-questions

----------------------------------------------------
### <mark>Component Lifecycle</mark>

|Phase|	Method	|Summary|
|---|---|---|
|Creation	|`constructor`|Standard JavaScript class constructor, Runs when Angular instantiates the component|
||`ngOnInit`|Runs once after Angular has initialized all the component's inputs.|
||`ngOnChanges`	|Runs every time the component's inputs have changed.|
||`ngDoCheck`	|Runs every time this component is checked for changes.|
|Change Detection|`ngAfterContentInit`|	Runs once after the component's content has been initialized.|
||`ngAfterContentChecked`|	Runs every time this component content has been checked for changes.|
||`ngAfterViewInit`|	Runs once after the component's view has been initialized.|
||`ngAfterViewChecked`|	Runs every time the component's view has been checked for changes.|
|Rendering|`afterNextRender`|Runs once the next time that all components have been rendered to the DOM.|
||`afterRender`|Runs every time all components have been rendered to the DOM.|
|Destruction|	`ngOnDestroy`|Runs once before the component is destroyed|
----------------------------------------------------

[30道Angular经典面试题](#top)

||
|---|
|[Angular中的路由是什么？它的作用是什么？](#angular中的路由是什么它的作用是什么)|
|[什么是Angular模块？](#什么是angular模块)|
|[Angular中的指令是什么？](#angular中的指令是什么)|
|[Angular中的组件是什么？](#angular中的组件是什么)|
| [什么是Angular服务？](#什么是angular服务)|
|[什么是数据绑定？Angular中支持哪些类型的数据绑定？](#什么是数据绑定angular中支持哪些类型的数据绑定)|
| [什么是Angular的依赖注入？](#什么是angular的依赖注入)|
| [什么是Angular的管道？](#什么是angular的管道)|
| [什么是RxJS？](#什么是rxjs)|
| [Angular中的ngFor是什么？它有什么作用？](#angular中的ngfor是什么它有什么作用)|
| [Angular中的ngIf是什么？它有什么作用？](#angular中的ngif是什么它有什么作用)|
| [Angular中的ngSwitch是什么？它有什么作用？](#angular中的ngswitch是什么它有什么作用)|
| [什么是Angular的路由守卫？](#什么是angular的路由守卫)|
| [什么是Angular的HTTP模块？](#什么是angular的http模块)|
| [什么是Angular的表单？](#什么是angular的表单)|
| [Angular中的可观察对象是什么？](#angular中的可观察对象是什么)|
| [Angular中的NgModule是什么？](#angular中的ngmodule是什么)|
| [Angular中的路由器是什么？](#angular中的路由器是什么)|
| [Angular中的依赖注入是什么？](#angular中的依赖注入是什么)|
| [Angular中的模板语法是什么？](#angular中的模板语法是什么)|
| [什么是Angular的依赖注入树？如何在应用程序中使用它？](#什么是angular的依赖注入树如何在应用程序中使用它)|
| [Angular中的管道是什么？如何创建一个管道？](#angular中的管道是什么如何创建一个管道)|
| [Angular中的路由器守卫是什么？它有哪些类型？](#angular中的路由器守卫是什么它有哪些类型)|
| [Angular中的服务是什么？如何创建一个服务？](#angular中的服务是什么如何创建一个服务)|
| [Angular中的Change Detection是什么？如何优化应用程序的性能？](#angular中的change-detection是什么如何优化应用程序的性能)|
| [Angular中的NgModule是如何工作的？它有哪些功能？](#angular中的ngmodule是如何工作的它有哪些功能)|
| [Angular中的动态组件是什么？如何创建一个动态组件？](#angular中的动态组件是什么如何创建一个动态组件)|
| [Angular中的单元测试是什么？如何编写一个单元测试？](#angular中的单元测试是什么如何编写一个单元测试)|
| [Angular中的服务工厂是什么？如何创建一个服务工厂？](#angular中的服务工厂是什么如何创建一个服务工厂)|
| [Angular中的RxJS是什么？如何使用RxJS？](#angular中的rxjs是什么如何使用rxjs)|

## Angular中的路由是什么？它的作用是什么？

Angular中的路由是一种用于管理应用程序导航和视图的机制。它允许您在应用程序中定义不同的路径，并将每个路径映射到一个特定的组件或模块。通过使用路由，您可以轻松地实现单页应用程序，提高应用程序性能和用户体验。

## 什么是Angular模块？

Angular模块是一个由组件、指令、管道和服务组成的逻辑单元。它们用于将应用程序拆分成功能区块，并允许开发人员将代码组织为更可维护的结构。每个Angular应用程序都至少有一个根模块。

## Angular中的指令是什么？

Angular中的指令是一种用于扩展HTML元素或属性的机制。它们允许您添加行为和样式到您的应用程序中，例如根据数据绑定条件显示或隐藏元素。

[⬆ back to top](#top)

## Angular中的组件是什么？

Angular中的组件是一种用于封装HTML、CSS和JavaScript代码的机制。它们允许您创建可复用的UI元素，并将其放入整个应用程序中。每个Angular组件都具有自己的生命周期和状态，并使用输入和输出属性与其他组件进行通信。

## 什么是Angular服务？

Angular服务是一种可注入的类，用于处理与组件无关的应用程序逻辑。它们允许您将应用程序的业务逻辑从组件中抽象出来，使代码更加可维护和可测试。

## 什么是数据绑定？Angular中支持哪些类型的数据绑定？

数据绑定是一种机制，允许您将数据从组件模型绑定到模板上的特定元素或属性上。Angular支持四种类型的数据绑定：插值绑定、属性绑定、事件绑定和双向绑定。

[⬆ back to top](#top)

## 什么是Angular的依赖注入？

依赖注入是一种设计模式，Angular中使用它来管理组件和服务之间的依赖关系。通过使用依赖注入，您可以将组件和服务分离，并将它们的依赖关系委托给Angular框架，从而使代码更具可读性和可维护性。

## 什么是Angular的管道？

管道是一种用于将数据转换为特定格式的机制。Angular中提供了多种内置的管道类型，例如日期、货币和百分比。您还可以编写自己的管道来满足特定的需求。

[⬆ back to top](#top)

## 什么是RxJS？

RxJS是一种流式编程库，它允许您使用Observable对象来处理异步和事件驱动的编程任务。在Angular中，RxJS常用于处理HTTP请求、数据流和事件处理等任务。

## Angular中的ngFor是什么？它有什么作用？

ngFor是Angular中的一个指令，它允许您循环遍历集合并为每个元素创建一个模板实例。它可以用于在模板中动态生成列表、表格等结构。

## Angular中的ngIf是什么？它有什么作用？

ngIf是Angular中的一个指令，它允许您在模板中根据条件动态创建或删除DOM元素。它可以用于根据特定条件显示或隐藏某些元素，从而使应用程序更加动态和可交互。

[⬆ back to top](#top)

## Angular中的ngSwitch是什么？它有什么作用？

ngSwitch是Angular中的一个指令，它允许您在模板中根据条件动态切换DOM元素。它可以用于根据不同的条件显示不同的元素，从而使应用程序更加动态和可交互。

## 什么是Angular的路由守卫？

路由守卫是Angular中的一个机制，用于保护应用程序中的某些路由或组件。它可以用于验证用户身份、检查权限或限制特定路由的访问。

## 什么是Angular的HTTP模块？

HTTP模块是Angular中用于处理HTTP请求和响应的机制。它提供了一个HttpClient服务，允许您与Web服务器进行通信，并以多种格式（如JSON和XML）处理响应数据。

[⬆ back to top](#top)

## 什么是Angular的表单？

Angular的表单是一种用于收集和验证用户输入数据的机制。它提供了多种表单控件类型和验证器，允许您构建复杂的表单并确保用户输入的正确性。

## Angular中的可观察对象是什么？

可观察对象是RxJS中的一种类型，它允许您订阅数据流并以异步方式处理它们。在Angular中，可观察对象常用于处理HTTP请求、数据流和事件处理等任务。

## Angular中的NgModule是什么？

NgModule是Angular中的一个机制，用于组织和封装应用程序的代码。它可以将组件、指令、服务和管道等逻辑单元打包成一个逻辑单元，并提供依赖注入机制。

[⬆ back to top](#top)

## Angular中的路由器是什么？

路由器是Angular中用于管理导航和视图的机制。它允许您定义不同的路径，并将每个路径映射到一个特定的组件或模块。通过使用路由器，您可以轻松地实现单页应用程序，提供用户无缝的导航体验。

## Angular中的依赖注入是什么？

依赖注入是Angular中用于管理组件和服务之间依赖关系的机制。它允许您将一个组件所依赖的服务注入到组件中，从而使组件能够使用该服务的方法和属性。

## Angular中的模板语法是什么？

模板语法是Angular中用于构建模板的语法。它支持多种数据绑定、指令和管道，允许您构建动态和可交互的用户界面。其中，插值绑定、属性绑定、事件绑定和双向绑定是常见的数据绑定方式。指令和管道则允许您以声明性的方式修改DOM元素的行为和外观。

[⬆ back to top](#top)

## 什么是Angular的依赖注入树？如何在应用程序中使用它？

Angular的依赖注入树是一个由依赖注入器管理的对象图，其中每个依赖项都可以注入到其他对象中。在Angular应用程序中，每个组件和服务都可以作为一个注入器的提供者，从而将其依赖项注入到其他组件和服务中。您可以使用@Inject、@Injectable和@Injected等装饰器来实现依赖注入树。

## Angular中的管道是什么？如何创建一个管道？

管道是Angular中一种用于转换或格式化数据的机制。它允许您以声明性的方式修改数据的外观和行为。您可以使用@Pipe装饰器来创建一个管道，然后在模板中使用管道名作为管道的标识符。

[⬆ back to top](#top)

## Angular中的路由器守卫是什么？它有哪些类型？

路由器守卫是Angular中用于保护特定路由或组件的机制。它可以用于验证用户身份、检查权限或限制特定路由的访问。在Angular中，路由器守卫有四种类型：CanActivate、CanActivateChild、CanDeactivate和Resolve。每种类型都有不同的功能和用途。

## Angular中的服务是什么？如何创建一个服务？

服务是Angular中一种用于提供共享逻辑的机制。它允许您将可重用的代码封装成一个可注入的类，并在应用程序的多个组件中共享。您可以使用@Injectable装饰器来创建一个服务，并在组件或其他服务中注入它。

## Angular中的Change Detection是什么？如何优化应用程序的性能？

Change Detection是Angular中用于检测模型数据变化并更新视图的机制。它可以自动检测模型数据的变化，并将其同步到视图中。为了优化应用程序的性能，您可以采取多种措施，例如使用OnPush策略、减少模板中的函数调用、避免不必要的变化检测等。

[⬆ back to top](#top)

## Angular中的NgModule是如何工作的？它有哪些功能？

NgModule是Angular中用于组织和封装应用程序代码的机制。它可以将多个组件、指令、服务和管道打包成一个逻辑单元，并提供依赖注入机制。NgModule具有多种功能，包括定义组件、指令和管道、导入和导出其他NgModule、配置提供商和路由器等。

## Angular中的动态组件是什么？如何创建一个动态组件？

动态组件是Angular中一种动态加载组件的机制。它允许您在运行时根据需要动态创建组件，并将它们插入到应用程序中。您可以使用ComponentFactoryResolver服务和ViewContainerRef指令来创建和插入动态组件。

## Angular中的单元测试是什么？如何编写一个单元测试？

单元测试是Angular中一种测试组件和服务的机制。它可以确保组件和服务的功能符合预期，并避免在代码更改后引入错误。您可以使用Jasmine测试框架和Karma测试运行器来编写和运行单元测试。

[⬆ back to top](#top)

## Angular中的服务工厂是什么？如何创建一个服务工厂？

服务工厂是Angular中一种用于动态创建服务的机制。它允许您在应用程序运行时根据需要创建服务，并注入到其他组件或服务中。您可以使用@Injetable装饰器和工厂函数来创建一个服务工厂。

## Angular中的RxJS是什么？如何使用RxJS？

RxJS是Angular中一种用于异步编程的库。它基于响应式编程模型，可以帮助您处理异步数据流和事件流。您可以使用Observable和操作符来创建和转换数据流，使用Subject和BehaviorSubject来创建和处理事件流，以及使用Subscription来管理订阅。

[⬆ back to top](#top)

- [30道Angular经典面试题，背就完事了](https://juejin.cn/post/7207620183308812348)
