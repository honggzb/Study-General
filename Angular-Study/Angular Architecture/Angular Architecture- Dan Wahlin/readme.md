[Angular Architecture- Dan Wahlin](#top)

- [Concept](#concept)
  - [Architecture Considerations](#architecture-considerations)
  - [Architecture Planning Template](#architecture-planning-template)
- [Organizing Features and Modules](#organizing-features-and-modules)
  - [Options for Organizing Code](#options-for-organizing-code)
  - [Core Modules vs Shared Modules](#core-modules-vs-shared-modules)
  - [Importing Core and Shared](#importing-core-and-shared)
  - [Creating a custom Library](#creating-a-custom-library)
- [Stucturing Components](#stucturing-components)
  - [Container and presntation components](#container-and-presntation-components)
  - [ngOnChanges: reference vs value](#ngonchanges-reference-vs-value)
  - [Cloning techniques -deep clone](#cloning-techniques--deep-clone)
  - [Component inheritance](#component-inheritance)
- [Component Communication](#component-communication)
  - [RxJS subjects](#rxjs-subjects)
  - [Unsubscribing from Observables](#unsubscribing-from-observables)
  - [EventBus Service vs Observable Service](#eventbus-service-vs-observable-service)
- [State Management](#state-management)
- [Additional Considerations](#additional-considerations)
  - [Replacing functions with pipe ASAP](#replacing-functions-with-pipe-asap)
  - [HttpClient and RxJS operators(Higher-order Mapping Operators)](#httpclient-and-rxjs-operatorshigher-order-mapping-operators)
  - [Key Security consideration](#key-security-consideration)
  - [HTTP interceptors and CORS](#http-interceptors-and-cors)

## Concept

### Architecture Considerations

- App overview
- App Features
- Domain security
- Domain Rules Logging
- Data models
- Feature/Components:
  - organize features and modules
  - structuring components
  - component communication
  - state management
- Shared Functionality
- other consideration
  - Accessibility
  - i18n
  - Environments
  - CI/CD
  - CDN/Containaer, server
  - Unit testing, end-to-end testing
  - APIs

### Architecture Planning Template

1. Basic

App Overview|App Features| service/Communication
---|---|---
![](https://i.imgur.com/R2J8GWh.png)|![](https://i.imgur.com/fAQDFXD.png)|![](https://i.imgur.com/gPlJ2gm.png)
Domain security|Domain Rules Logging| service/Communication
![](https://i.imgur.com/9OLRlG9.png)|![](https://i.imgur.com/bi2yubN.png)|![](https://i.imgur.com/NiI4x4Z.png)
Data models|Feature/Components| Shared Functionality
![](https://i.imgur.com/t06tYff.png)|![](https://i.imgur.com/o6U1YUm.png)|![](https://i.imgur.com/gkdguna.png)

2. REST Verb Examples

VERB | URI | ACTION
---|---|---
GET| /customers| select multiple records
GET| /customers/101| select a single record
POST| /customers| insert a records
PUT| /customers/101| update a records
PATCH| /customers/101| update specific properites
DELETE| /customers/101| delete date a records

2. Style Guide
   1. https://angular.io/guide/styleguide
   2. coding conventions
   3. naming rules
   4. orginizing modules
   5. creating and using components
   6. creating and using services
   7. lifecyle hooks
   8. ...

[back to top](#top)

## Organizing Features and Modules

- **L** -> Locate code quickly
- **I** -> Identify the code at a glance
- **K** -> Keep the flattest structure you can
- **T** -> Try to be DRY(don't repeat)

### Options for Organizing Code

```
                        Convention-based | Feature-based
       Follows strict naming conventions | Features are organized into their own folder
           Related code may be separated | Features are self-contained
Can result in a lot of files in a folder | Easy to find everything related to a feature
                  in larger applications |
```

![](https://i.imgur.com/EOfypyO.png)

### Core Modules vs Shared Modules

```
                                                              Core Moduels | Shared Modules
                      should contain singleton services shared through app | should contain reusable components, pipes, directives
services that are specific to a feature can go to in the features's folder |
                                 LoggingService, ErrorService, DataService | calendarcomponent, AutoCompleteComponent
```

### Importing Core and Shared

![](https://i.imgur.com/yhg96yV.png)

**Preventing Reimport of core, core should only be imported into the root/app module**

- Method 1: using decorator
  - `@Optional` - A constructor parameter decorator that marks a dependency as optional
  - `@SkipSelf` - A constructor parameter decorator that tells the DI framework that dependency resolution should start from the parent injector
- Method 2:
  - convert `throwIfAlreadyLoaded` to a class

```javascript
//mehtod 1: Preventing Reimport of core, core should only be imported into the root/app module
export function throwIfAlreadyLoaded(parentModule: any, moduleName: string){
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}
//using
import { throwIfAlreadyLoaded } from './import.guard';
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
//mehtod 2: Preventing Reimport of core, core should only be imported into the root/app module
export class EndureModuleLoadedOnceGuard {
  constructor(targerModule: any) {
    if(targetModule){
      throw new Error(`${targerModule.constructor.name} has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
//using
import { EndureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
export class CoreModule extends EndureModuleLoadedOnceGuard {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
```

### Creating a custom Library

- Creating a custom libaray
  - `ng new my-project`
  - `ng generate library my-lib`
  - note:
    - tsconfig file will be updated to look for library reference
    - build the libray before trying to use it in the workspace
- Publish a custom library
  - `ng build my-lib`
  - `cd dist/my-lib`
  - `npm publish`
  - https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry
- Comsume a custom library

[back to top](#top)

## Stucturing Components

### Container and presntation components

- break complex components into child components
- using container -> presentation pattern where possible
  - container retrieves state
  - presentation components render
- use OnPush on presentation components

**passing state with input and output properites**

![](https://i.imgur.com/UYGbEsL.png)
![](https://i.imgur.com/sEk5Mwn.png)
![](https://i.imgur.com/aijHwRj.png)

### ngOnChanges: reference vs value

- `changeDetection: ChangeDetectionStrategy.OnPush`, OnPush causes change detection to run when:
  - An input property reference changes
  - An output property/EventEmitter or DOM event fires
  - Async pipe receives an event
  - Change detection is manually invoked via ChangeDetectorRef
- child/presentation components did not change data

### Cloning techniques -deep clone

- JSON.parse()
- deepClone: cloner.service.ts
- Immutable.js

```javascript
import { Injectable } from '@angular/core';
import { Customer } from '../shared/interfaces';
import { List, Map, fromJS } from 'immutable';
import { Observable, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ClonerService } from './cloner.service';
@Injectable({providedIn: 'root'})
export class CustomersService {
  customers: Customer[] = [
   //...
  ];
  immutableCustomers = List<Customer>(this.customers);
  constructor(private clonerService: ClonerService) {  }
  getCustomers() : Observable<Customer[]> {
    // const custs = this.customers;
    // const custs = JSON.parse(JSON.stringify(this.customers));
    // const custs = this.clonerService.deepClone<Customer[]>(this.customers);
    const custs = this.immutableCustomers.toArray();
    return of(custs);
  }
  getCustomer(id: number) : Observable<Customer> {
    return this.getCustomers()
      .pipe(
        map(custs => {
          const filteredCusts = custs.filter(cust => cust.id === id);
          // Enable if using Immutable.js below
          // const filteredCusts = this.immutableCustomers.filter(cust => cust.id === id);
          if (filteredCusts) {
            const cust = filteredCusts[0];
            // return cust;
            // return JSON.parse(JSON.stringify(cust)) as Customer;
            //return this.clonerService.deepClone<Customer>(cust);
            return fromJS(cust).toJS() as Customer;
          }
        }),
      );
  }
  updateCustomer(customer: Customer) : Observable<boolean> {
    const index = this.getCustomerIndex(customer.id);
    customer.orderTotal = +customer.orderTotal;
    // update collections
    this.customers[index] = customer;
    this.immutableCustomers = this.immutableCustomers.update(index, () => customer);
    return of(true);
  }
  getCustomerIndex(id: number) {
    return this.customers.findIndex((cust, index, array) => cust.id === id);
  }
}
```

### Component inheritance

![](https://i.imgur.com/gjefRaB.png)

```javascript
//base-component.ts
@Component({
  selector: 'app-base-component',
  template: '',                                     //empty template
  changeDetection: ChangeDetectionStrategy.OnPush   //onpush strategy
})
export class BaseComponent implements OnInit, OnChanges {
  @Input() label: string;
  private _value: string;
  @Input() get value() {
      return this._value;
  }
  set value(val: string) {
      if (val && val !== this._value) {
        this.isDirty = true;
      }
      this._value = val;
      this.valueChange.emit(val);
  }

  @Input() isDirty = false;
  @Output() valueChange = new EventEmitter<string>();
  constructor() { }
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      console.log('Value changed ', changes['value'].currentValue);
    }
  }
}
//widget1.component.ts
@Component({
  selector: 'app-widget1',
  templateUrl: './widget1.component.html',
  styleUrls: ['./widget1.component.css']
})
export class Widget1Component extends BaseComponent implements OnInit {  // extends BaseComponent
  constructor() {
    super();
  }
  ngOnInit() {}
}
```

[back to top](#top)

## Component Communication

### RxJS subjects

- RxJS subjects:  acts both as an observer and as an Observable
- there are 4 types of subjects
- http://reactivex.io/documentation/subject.html

varieties||marble diagram
---|---|---
Subject| send data to subscribed observers, any previously emitted data is not sent to new observers|
BehaviorSubject|send recently data value to new observers|![](https://i.imgur.com/sDdnKn0.png)
ReplaySubject|all previously sent data can (optionally) be 'replayed' to new observers|![](https://i.imgur.com/LtzRtex.png)
AsyncSubject| emit the last value(only last value) to observers when sequence is completed|![](https://i.imgur.com/uBnhunu.png)

### Unsubscribing from Observables

- unsubscribe in ngOnDestroy
- [AutoUnsubscribe decorator](https://github.com/NetanelBasal/ngx-auto-unsubscribe):
  - add `@AutoUnsubscribe()` in component
  - must add `ngOnDestroy() {}`, even if empty
- [subSink](https://github.com/wardbell/subsink): multiple subscription Object

### EventBus Service vs Observable Service

```
                                                 Event Bus | Observable Service
-----------------------------------------------------------|--------------------------------------------
                                          Mediator pattern | Observable pattern
                     Angular service acts as the middleman | Angular service exposes observable
                                        between components | directly to components
components don't know where data is coming from by default | Components know where data is coming from
                                           Loosely coupled | Not as loosely coupled as event bus
                              Relies on subject/observable | Relies on subject/observable
```

![](https://i.imgur.com/kwxHDvt.png)

```javascript
//event-bus.service.ts
// just define 2 methods: on() and emit()
@Injectable()
export class EventBusService {
    private subject$ = new Subject();
    on(event: Events, action: any): Subscription {
         return this.subject$
              .pipe(
                    filter((e: EmitEvent) => {
                      return e.name === event;
                    }),
                    map((e: EmitEvent) => {
                      return e.value;
                    })
                  )
                    .subscribe(action);
    }
    emit(event: EmitEvent) {
        this.subject$.next(event);
    }
}
export class EmitEvent {
  constructor(public name: any, public value?: any) { }
}
export enum Events { CustomerSelected }
//use in app.component.ts
ngOnInit() {
    //Example of using an event bus to provide loosely coupled communication (mediator pattern)
    this.eventbusSub = this.eventbus.on(Events.CustomerSelected, (cust => this.customer = cust));
  }
//use in customers-list.component.ts
selectCustomer(cust: Customer) {
    this.customerSelected.emit(cust);
    // Send customer to any eventbus listeners listening for the CustomerSelected event
    this.eventbus.emit(new EmitEvent(Events.CustomerSelected, cust));
  }
//sata.service.ts
private customersSubject$ = new BehaviorSubject<Customer[]>(this.customers);
customersChanged$ = this.customersSubject$.asObservable();
addCustomer() : Observable<Customer[]> {
    let id = this.customers[this.customers.length - 1].id + 1;
    this.customers.push({
      id: id,
      name: 'New Customer ' + id,
      city: 'Somewhere',
      age: id * 5
    });
    this.customersSubject$.next(this.customers);   //use next
    return of(this.customers);
  }
//use in app.component.ts
ngOnInit() {
  this.customersChangedSub = this.dataService.customersChanged$.subscribe(custs => this.customers = custs);
}
```

[back to top](#top)

## State Management

- State Management methods
  - Services: is typically a class with a narrow, well-defined purpose.
  - [NgRx](https://ngrx.io/): provides reactive state management, unify the events in app and derive state using RxJS
    - immutable data
    - provide consistency across a team
    - diagnostic tool to watch store
    - ![](https://i.imgur.com/tggIS72.png)
  - [ngrx-data](https://github.com/ngrx):
    - is an NgRx extension that offers a gentle iintroduction to ngrx/redux without the boilerplate
    - 1 line of code per entity
    - ![](https://i.imgur.com/KtzsNGO.png)
  - [Observable Store](https://github.com/DanWahlin/Observable-Store):
    - more complex state management
    - state is read-only/immutable
    - provide state change notification to any subscriber
    - works with any library/framework
    - ![](https://i.imgur.com/kXWMFAk.png)
  - Akita, Ngxs, MobX, ...
- State types
  - application state
  - Session state
  - Entity state

[back to top](#top)

## Additional Considerations

### Replacing functions with pipe ASAP

Functions vs pipe|
---|---
Functions| Function calls made from template are invoked every time a change occurs(no caching)
pipe| a pure pipe returns same result given the same inputs, only called when inputs are changed

**Using Memo decorator in pipe**

- use [Memo decorator](https://github.com/mgechev/memo-decorator) to enhance caching of pipe's transform() function when a primitive value is passed
- convert `{ addTax(product.price) | currencty}}` to
- using pipe: `{ product.price | addtaxmemo | currency}}`

```javascript
//shared/addtax-memo.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decoarator';
@Pipe({name: 'addtaxmemo'})
export class AddTaxmemoPipe implements PipeTransform {
  @memo()
  transform(price: number): number {
    if (price) {
      return this.getTotalPrice(price);
    }
    return price;
  }
  getTotalPrice(price: number) {
    console.log('addtaxmemo pipe called');
    let total = price + (price * .08);
    return total;
  }
}
```

### HttpClient and RxJS operators(Higher-order Mapping Operators)

- Higher-order Mapping Operators: `concatMap`, `mergeMap`, `switchMap`
- Combination operator: `comblineLatest`, `forkJoin`, `wihtLatestFrom`

```javascript
//httpClientRxJS.service.ts
getCharactersAndPlanets() {
    return forkJoin(
      this.getCharacters(),
      this.getPlanets()
    )
    .pipe(
      map((res) => {
        return { characters: res[0], planets: res[1] };
      }),
      catchError(error => of(error))
    );
}
//homeworld come from url in result in first http calling
// [{..., homeworld: "https://swapi.co/api/planets/1/", ...}, ...]
 getCharactersAndHomeworlds() {
    return this.http.get(this.baseUrl + 'people')
      .pipe(
        switchMap(res => {
          return from(res['results']);  // convert array to observable
        }),
        mergeMap((person: any) => {
            return this.http.get(person['homeworld'])
              .pipe(
                map(hw => {
                  person['homeworld'] = hw;
                  return person;
                })
              );
        }),
        toArray()
      );
  }
```

### Key Security consideration

**CSRF Consideration**

![](https://i.imgur.com/PIaE018.png)

- enable CSRF on the server if using cookie authentication
- angular read a token from a cookie set by the serve and add it to the request headers
- change the cookie/header name as appropriate for server
- server will validate the header value
- **Note: a simpe POST request can be used for a CSRF attack**

**Route guards**

- define route guards needed by app base on user or group/role
- **route guards don't 'secure' an App**
- Rely on the server to secure data, API, etc.
- do not store sensitive data(secrets, keys, passwords, etc) in the browser
- If an API requires a 'secret' to be passed, consider calling it through a "middle-man" service
- Use JWT tokens where possible for serve authntication(set appropriate TTL expiration for tokens)

### HTTP interceptors and CORS

- HTTP interceptors provide a centralized place to hook into request/response
- Add withCredentials when using cookies and calling via CORS
- ![](https://i.imgur.com/YFefvbx.png)

```javascript
//core/interceptors/auth.interceptor.ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // might inject some type of authservice here for token
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header (fake value is shown here)
    const authHeader = '49a5kdkv409fd39'; // this.authService.getAuthToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authHeader)
    });
    return next.handle(authReq);
  }
}
```

[back to top](#top)

> reference
- [DanWahlin github](https://github.com/DanWahlin)
