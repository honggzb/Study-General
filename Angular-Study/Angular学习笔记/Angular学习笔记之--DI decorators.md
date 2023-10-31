- [Default DI](#default-di)
- [@Self() and @Optional()](#self-and-optional)
- [@SkipSelf()](#skipself)
- [@Host()](#host)

## Default DI

- Angular will first check if the component defines a dependency injector in its decorator.
- If it does find in on the component, the component (specifically: each of its instances) will receive its own instance of the service.
- If it doesn’t find in on the component, it will look for a parent injector (e.g. the parent component its ancestors etc), up the injectors tree and in the end it will stop on the application-wide instance of the service defined on a one of our NgModules. Unless it’s not even there, in which case we will get a “No provider” error

## @Self() and @Optional()

- only to find the injector is the component itself
- If it isn’t defined in local component, we will get an error, in this case we can decorate a parameter with `@Optional()`, then if no provider found, no error will occur. Instead angular will set the value for service to null
- `constructor(@Optional() @Self() private readonly where: DidWeGoWrong){ //... }`

## @SkipSelf()

- in injectors hierachy, skipping the first step of looking for a possible injector in the requesting component

## @Host()

- Angular to look for the injector on the component itself
- if the injector is not found there, it looks for the injector up to its host component
- look similar to the @Self() decorator, there are two common scenarios where said host component is something different than our current class
  - for Directive. In that case it can be used on a Component that defines its injector and that component would be the directive’s host
  - Or if KidComponent projected into ParentComponent(by that `<ng-content></ng-content>` thingy). Then we also say that our component is being hosted by ParentComponent — and if ParentComponent provides ToyService and KidComponent does not, the @Host() decorator of that inner component would still get that service’s instance
    - [A curious case of the @Host decorator and Element Injectors in Angular](https://indepth.dev/a-curious-case-of-the-host-decorator-and-element-injectors-in-angular/)


> References
- [@Self or @Optional @Host? The visual guide to Angular DI decorators](https://medium.com/frontend-coach/self-or-optional-host-the-visual-guide-to-angular-di-decorators-73fbbb5c8658)
- [A curious case of the @Host decorator and Element Injectors in Angular](https://indepth.dev/a-curious-case-of-the-host-decorator-and-element-injectors-in-angular/)
