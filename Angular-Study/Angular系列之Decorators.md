[Angular Decorators](#top)

- [Types of Decorators](#types-of-decorators)
- [Creating a decorator](#creating-a-decorator)
- [What Angular decorators actually do](#what-angular-decorators-actually-do)

## Types of Decorators

- Class Decorators: top-level decorators that we use to express intent for classes
  - `@Component`, `@NgModule`
- Property Decorators: decorate specific properties within classes
  - `@Input()`, `@Output()`
- Method Decorators: decorate specific methods within class with functionality
  - `@HostListener()`
- Parameter Decorators: need to manually tell Angular to inject a particular provider
  - `@Inject()`


## Creating a decorator

- Decorator functions
- Passing data to a decorator

```javascript
//a decorator Console -> just going to simply log the class to the console
function Console(message) {
    console.log(message);
    //decorator must return a function closure which is passed the class as 'target' for the class to be given to
    return function(target) {
        console.log('Our decorated class', target);
    };
}
// using 
// passing data
@Console('Hey!')
class ExampleClass {
  constructor() {
    console.log('Yo!');
  }
}
// console output: 'Hey!'
// console output: 'Our decorated class', class ExampleClass{}...
```

## What Angular decorators actually do

- Storing metadata about a class, method or property
- Chaining decorators

```javascript
// possible configuration when creating a component
{
  selector: undefined,
  inputs: undefined,
  outputs: undefined,
  host: undefined,
  exportAs: undefined,
  moduleId: undefined,
  providers: undefined,
  viewProviders: undefined,
  changeDetection: ChangeDetectionStrategy.Default,
  queries: undefined,
  templateUrl: undefined,
  template: undefined,
  styleUrls: undefined,
  styles: undefined,
  animations: undefined,
  encapsulation: undefined,
  interpolation: undefined,
  entryComponents: undefined
}
```

- [A deep dive on Angular decorators](https://ultimatecourses.com/blog/angular-decorators#what-angular-decorators-actually-do)
