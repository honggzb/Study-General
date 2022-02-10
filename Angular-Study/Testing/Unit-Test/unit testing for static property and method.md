### ES6 class in typescript with static methods

```javascript
//
export class StaticClass {
    static getMessage(name: string): String {
        return 'Hi' + name + 'Welcome to my blog';
    }
}
// unit test
let spyStaticClass = jest.spyOn(StaticClass, "getMessage")
                         .withArgs("John").and.returnValue("welcome");
StaticClass.getMessage("John")
expect(StaticClass.getMessage).toHaveBeenCalled();
expect(StaticClass.getMessage).toHaveBeenCalledWith("John");
expect(StaticClass.getMessage("John")).toEqual("welcome");
```

### Angular component using the static method

```javascript
export class AppComponent {
  title = '';
  constructor() { }
  ngOnInit() {
    this.title = StaticClass.getMessage('john');
  }
}
//unit test
it('should call ngInit and call static methods ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    let spyStaticClass = spyOn(StaticClass, "getMessage").and.returnValue("welcome")
    StaticClass.getMessage("John")
    fixture.detectChanges();
    component.ngOnInit();
    expect(StaticClass.getMessage).toHaveBeenCalled();
    expect(StaticClass.getMessage).toHaveBeenCalledWith("John");
    expect(StaticClass.getMessage("John")).toEqual("welcome");
  });
```

> [How to write unit testing static methods in a class of Angular and typescript](https://www.cloudhadoop.com/angular-static-method-test/)
