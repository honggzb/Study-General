[Angular学习笔记之组件通讯Component Communication](#top)

- [Communicating with a Template](#communicating-with-a-template)
  - [ViewChild and ViewChildren](#viewchild-and-viewchildren)
  - [Parent to Child Component](#parent-to-child-component)
  - [Child to Parent Component](#child-to-parent-component)
- [Communicating Through a Service](#communicating-through-a-service)
  - [Mangaging State](#mangaging-state)
  - [Property Bag service](#property-bag-service)
  - [State Management Service](#state-management-service)
  - [State Management Service with Notifications](#state-management-service-with-notifications)
- [Communicating Using the Router](#communicating-using-the-router)
- [ErrorObservable or _throw](#errorobservable-or-throw)

![](https://i.imgur.com/zQztxhg.png)

## Communicating with a Template

![](https://i.imgur.com/BmjF7Ir.png)

**Methods to achieve two-way binding**

1. the long way of two-way binding
2. getter and setter: clear and easy way
3. valueChanges() observable with ViewChild and ViewChildren

```javascript
// 1) the long way of two-way binding
   // 1.2) change to long way format
    <input type='text' [(ngModel)]='listFilter' />
   // to
    <input type='text' [ngModel]='listFilter' (ngModelChange)='onFilterChange($event)'/>
   // 1.1) add new function onFilterChange
    onFilterChange(filter: string) : void {
        this.listFilter = filter;
        this.performFilter(this.listFilter);
    }
// 2) getter and setter
    private _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.performFilter(this.listFilter);
    }
// 3)
```

### ViewChild and ViewChildren

**Getting a reference**

DOM (Jquery)| Decorator (Angular)
---|---
`letdivElement = document.getElementById('divElementId');`|`@ViewChild('divElementVar') divElementRef;`

Tracks changes in the DOM

```javascript
@ViewChildren('divElementVar') divElementRefs: QueryList<ElementRef>;
this.divElementRefs.changes.subscribe(() =>{
// Code here
})
```

**ViewChild vs. ViewChildren**

![](https://i.imgur.com/maFmZhF.png)

**1) HTML element**

viewChild and ViewChildren provides a `nativeElement` property

- directly accessing the DOM
- tightly coupled to the browser
- may not be able to use server-side rendering or web workers

```html
<input type='text' #filterElement [(ngModel)]='listFilter'/>
<javascript>
@ViewChild('filterElement') filterElementRef;
@ViewChild(NgModel) filterInput;
//必须放在ngAfterViewInit
ngAfterViewInit(): void {
    setTimeout(() => {
      console.log(this.filterElementRef);
      if(this.filterElementRef.nativeElement){
        this.filterElementRef.nativeElement.focus();   //DOM
      }
      console.log(this.filterInput);
      this.filterInput.valueChanges.subscribe(
        () => this.performFilter(this.listFilter)
      )
    }, 500);
}
</javascript>
```

![](https://i.imgur.com/7OFDt5o.png)

**注意：**

1. 必须放在ngAfterViewInit
2. 有时候必须使用SetTimeout
3. ElementRef返回是是HTML element结构，即DOM，可使用nativeElement属性中的blur，click等事件
4. Directive(如NgModel或自定义的Directive)返回的是Directive的数据的结构，可对数据进行操作，有valueChanges Observable
5. 只有Template-driven的表单使用@ViewChild访问其reference，Reactive-driven的表单没有必要使用
6. 和#ngIf一起使用的时候必须小心

```html
<!--ngIf existed scenario(?????????not working) -->
<div *ngIf='products'>
  <div>Filter by:</div>
  <div>
    <input type='text' [(ngModel)]='listFilter'/>
  </div>
</div>
<script>
@ViewChild('filterElement') filterElementRef: ElementRef;
//create a new private variable to hold reference to our subscription, for avoiding multiple subscribing when interacting with page
private _sub: Subscription;
private _filterInput: NgModel;
get filterInput(): NgModel {
  return this._filterInput;
}
@ViewChild(NgModel)
set filterInput(value:NgModel) {
  this._filterInput = value;
  //if _sub existed, did not subscribe again
  if(this.filterInput && this._sub){
    this._sub = this.filterInput.valueChanges.subscribe(
        () => this.performFilter(this.listFilter)
    );
  }
  if(this.filterElementRef.nativeElement){
        this.filterElementRef.nativeElement.focus();   //DOM
  }
}
</script>
```

[back to top](#top)

### Parent to Child Component

- @Input
- Watching for Changes
  - getter and setter:
    - Favor to only react to changes to specific properties
  - onChanges Lifcycle hook:
    -  favor to react to any input property changes
    -  favor if current and prior values are needed
- Template reference Vaiable
- @ViewChild

![](https://i.imgur.com/slMaGw7.png)

```javascript
// watching for chagnes to an input property
//child component module- shared.module.ts
@NgModule({
  declarations: [StarComponent, CriteriaComponent],
  //...
  exports: [   //export
    CommonModule,
    FormsModule,
    StarComponent,
    CriteriaComponent
  ]
})
// parent component-product-list.component.htm;
<app-criteria class="col-md-10"
          [displayDetail]="includeDetails"
          [hitCount]="filteredProducts?.length"></app-criteria>
// child component- criteria.component.ts
@Input() displayDetail: boolean;
@Input() hitCount: number;
hitMessage: string;
// 这里的changes是一个Object，包含了@Input进来的对象
ngOnChanges(changes: SimpleChange): void {
    console.log(changes);
    if(changes['hitCount'] && !changes['hitCount'].currentValue){
      this.hitMessage = 'No matches found';
      console.log(this.hitMessage);
    } else {
      this.hitMessage = 'Hits: ' + this.hitCount;
      console.log(this.hitMessage);
    }
  }
```

changes的定义 ![](https://i.imgur.com/tJ17qCc.png)

[back to top](#top)

### Child to Parent Component

![](https://i.imgur.com/24kokVI.png)

**note:**

1. Template Reference is not reliably available until the **afterViewInit** lifecycle hook
2. Using template reference, parent component can access child component's methods and properties.
3. can use component as reference directly

![](https://i.imgur.com/exkgpEB.png)

**Using parent component reference**

```javascript
// product-list.component.ts
@ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
parentListFilter:string;

ngAfterViewInit(): void {
    this.parentListFilter = this.filterComponent.listFilter;
}
ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.performFilter(this.parentListFilter);
      },
      (error: any) => this.errorMessage = <any>error
    );
  }
```

[back to top](#top)

## Communicating Through a Service

### Mangaging State

![](https://i.imgur.com/FJQ7eiN.png)
![](https://i.imgur.com/H8FxsO5.png)

### Property Bag service

![](https://i.imgur.com/bStgGlT.png)

### State Management Service

- provide, maintain and update state
  - encapsulate retrieve and store operations, minmized hits to the backend server, improves performance
  - Sharing Entity State
  - Displaying Concurrent Components
- Observe state changes
  - Keeping State in Sync by using a component **getter**
  - Change Detection
    - Communicating State Changes

### State Management Service with Notifications

**Broadcasting Service Notifications**

- EventEmitter
- Subject:
  - require no initial value
  - broadcasts items as they are pushed
- BehaviorSubject:
  - require an inital value
  - provide current value and then broadcasts item as they are pushed

[back to top](#top)

## Communicating Using the Router

**Router Parameters**

- required parameters
- optional parameters
- query parameters

![](https://i.imgur.com/4aOtddH.png)

[back to top](#top)

> Reference
- https://blogs.msmvps.com/deborahk/
