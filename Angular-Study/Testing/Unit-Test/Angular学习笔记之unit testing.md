[Angular学习笔记之unit testing](#top)

- [Testing Classes & Pipes](#testing-classes--pipes)
  - [testing class](#testing-class)
  - [Test pipe](#test-pipe)
- [Testing with Mocks & Spies](#testing-with-mocks--spies)
  - [Prepare - classes needed test](#prepare---classes-needed-test)
  - [Testing with the Real AuthService](#testing-with-the-real-authservice)
  - [Mocking with Fake Classes](#mocking-with-fake-classes)
  - [Mocking by Overriding Functions](#mocking-by-overriding-functions)
  - [Mocking with Spies](#mocking-with-spies)
- [Test Bed](#test-bed)
- [Testing Asynchronous Code](#testing-asynchronous-code)
  - [Done function and spy callbacks](#done-function-and-spy-callbacks)
  - [async and whenStable](#async-and-whenstable)
  - [fakeAsync and tick](#fakeasync-and-tick)

## Testing Classes & Pipes

> **tip**
> Everything in Angular is an instance of a class, be it a Component, Directive, Pipe and so on. So once you know how to test a basic class you can test everything

```javascript
// 1. test setup
// 1.1 async service
export class AuthService {
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
// 1.2 component need test
export class LoginComponent implements  OnInit {
  needsLogin: boolean = true;
  constructor(private auth: AuthService) { }
  ngOnInit()  {
    this.auth.isAuthenticated().then((authenticated) => {
      this.needsLogin = !authenticated;
    })
  }
}
```

### testing class

```javascript
import { AuthService } from './auth.service';
describe('Service: Auth', () => {
    let service: AuthService;
    beforeEach(() => {               //(1)
        service = new AuthService();
    });
    afterEach(() => {                //(2)
        service = null;
        localStorage.removeItem('token');
    });
    it('should return true from isAuthenticated when there is a token', () => {
        localStorage.setItem('token', '1234');    //(3)
        expect(service.isAuthenticated()).toBeTruthy();
    });
    it('should return false from isAuthenticated when there is no token', () => {
        expect(service.isAuthenticated()).toBeFalsy();   //(4)
    });
});
```

### Test pipe

- Pipes are by far the simplest part of Angular, they can be implemented as a class with one function
- Pipe classes have one function called transform so in order to test pipes just need to test this one function, passing inputs and expecting outputs

```javascript
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'default'
})
export class DefaultPipe implements PipeTransform {
  transform(value: string, fallback: string, forceHttps: boolean = false): string {
    let image = "";
    if (value) {
      image = value;
    } else {
      image = fallback;
    }
    if (forceHttps) {
      if (image.indexOf("https") == -1) {
        image = image.replace("http", "https");
      }
    }
    return image;
  }
}
// Test
/* tslint:disable:no-unused-variable */
import { DefaultPipe } from './default.pipe';
describe('Pipe: Default', () => {   //
    let pipe: DefaultPipe;
    beforeEach(() => {
        pipe = new DefaultPipe();
    });
    it('providing no value returns fallback', () => {
        expect(pipe.transform('', 'http://place-hold.it/300')).toBe('http://place-hold.it/300');
    });
    it('providing a value returns value', () => {
        expect(pipe.transform('http://place-hold.it/300', 'fallback')).toBe('http://place-hold.it/300');
    });
    it('asking for https returns https', () => {
        expect(pipe.transform('', 'http://place-hold.it/300', true)).toBe('https://place-hold.it/300');
    });
});
```

> Tip
- If Pipe requires dependencies to be injected into the constructor it might be better to use the Angular Test Bed

[back to top](#top)

## Testing with Mocks & Spies

### Prepare - classes needed test

```javascript
// componet
import {Component} from '@angular/core';
import {AuthService} from "./auth.service";
@Component({
  selector: 'app-login',
  template: `<a [hidden]="needsLogin()">Login</a>`
})
export class LoginComponent {
  constructor(private auth: AuthService) { }
  needsLogin() {
    return !this.auth.isAuthenticated();
  }
}
//service
export class AuthService {
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
```

### Testing with the Real AuthService

- Tight Coupling
- not very isolated 

```javascript
import {LoginComponent} from './login.component';
import {AuthService} from "./auth.service";
describe('Component: Login', () => {
  let component: LoginComponent;
  let service: AuthService;
  //(1)create an instance of AuthService and inject it into out LoginComponent 
  beforeEach(() => {
    service = new AuthService();
    component = new LoginComponent(service);
  });
  // (2)clean up data and localStorage after each test spec has been run
  afterEach(() => { 
    localStorage.removeItem('token');
    service = null;
    component = null;
  });
  it('needsLogin returns true when the user has not been authenticated', () => {
    expect(component.needsLogin()).toBeTruthy();
  });
  it('needsLogin returns false when the user has been authenticated', () => {
    localStorage.setItem('token', '12345');
    expect(component.needsLogin()).toBeFalsy();
  });
});
```

### Mocking with Fake Classes

```javascript
import {LoginComponent} from './login.component';
// (1) create a class called MockAuthService which has the same isAuthenticated function as the real AuthService class
class MockAuthService { 
  authenticated = false;
  isAuthenticated() {
    return this.authenticated;
  }
}
describe('Component: Login', () => {
  let component: LoginComponent;
  let service: MockAuthService;
  // (2)  inject into our LoginComponent an instance of the MockAuthService instead of the real AuthService
  beforeEach(() => { 
    service = new MockAuthService();
    component = new LoginComponent(service);
  });
  afterEach(() => {
    service = null;
    component = null;
  });
  it('needsLogin returns true when the user has not been authenticated', () => {
     // (3) trigger the behaviour from the service by setting the authenticated property
    service.authenticated = false;  
    expect(component.needsLogin()).toBeTruthy();
  });
  it('needsLogin returns false when the user has been authenticated', () => {
    service.authenticated = true;    // (3)
    expect(component.needsLogin()).toBeFalsy();
  });
});
```

### Mocking by Overriding Functions

```javascript
// service
class MockAuthService extends AuthService {
  authenticated = false;
  isAuthenticated() {
    return this.authenticated;
  }
}
```

### Mocking with Spies

- A Spy is a feature of Jasmine which lets you take an existing class, function, or object and mock it in such a way that you can control what gets returned from function calls

```javascript
import {LoginComponent} from './login.component';
import {AuthService} from "./auth.service";
describe('Component: Login', () => {
  let component: LoginComponent;
  let service: AuthService;
  let spy: any;
  beforeEach(() => {    // (1) create a real instance of AuthService and inject it into the LoginComponent
    service = new AuthService();
    component = new LoginComponent(service);
  });
  afterEach(() => {   // (2) teardown function there is no need to delete the token from localStorage
    service = null;
    component = null;
  });
  it('needsLogin returns true when the user has not been authenticated', () => {
    // (3) create a spy on our service so that if the isAuthenticated function is called it returns false
    spy = spyOn(service, 'isAuthenticated').and.returnValue(false); 
    expect(component.needsLogin()).toBeTruthy();
    expect(service.isAuthenticated).toHaveBeenCalled();
  });
  it('needsLogin returns false when the user has been authenticated', () => {
    spy = spyOn(service, 'isAuthenticated').and.returnValue(true);
    expect(component.needsLogin()).toBeFalsy();
    expect(service.isAuthenticated).toHaveBeenCalled();
  });
});
```

[back to top](#top)

## Test Bed

- Test Bed (ATB) is a higher level Angular Only testing framework that to easily test behaviours that depend on the Angular Framework
- easier way to create components, handle injection, test asynchronous behaviour and interact with application
  - It allows us to test the interaction of a directive or component with its template.
  - It allows us to easily test change detection.
  - It allows us to test and use Angular’s DI framework.
  - It allows us to test using the NgModule configuration we use in our application.
  - It allows us to test user interaction via clicks and input fields

```javascript
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {AuthService} from "./auth.service";
describe('Component: Login', () => {
  let component: LoginComponent;
  // 1) A fixture is a wrapper for a component and its template
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  beforeEach(() => {
    // creates a test Angular Module which we can use to instantiate components, perform dependency injection and so on
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService]
    });
    // 2) create an instance of a component fixture through the TestBed, this injects the AuthService into the component constructor
    fixture = TestBed.createComponent(LoginComponent);
    // 3)the actual component from the componentInstance on the fixture
    component = fixture.componentInstance; 
    // 4) get resolve dependencies using the TestBed injector by using the get function
    authService = TestBed.get(AuthService);
  });
  it('needsLogin returns true when the user has not been authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    expect(component.needsLogin()).toBeTruthy();
    expect(authService.isAuthenticated).toHaveBeenCalled();
  });
  it('needsLogin returns false when the user has been authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    expect(component.needsLogin()).toBeFalsy();
    expect(authService.isAuthenticated).toHaveBeenCalled();
  });
});
```

## Testing Asynchronous Code

Three mechanisms can use:

- The Jasmine **done** function and spy callbacks. We attach specific callbacks to spies so we know when promises are resolves, we add our test code to those callbacks and then we call the done function.
  - This works but means we need to know about all the promises in our application and be able to hook into them.
- Use the Angular **async** and **whenStable** functions,
  - don’t need to track the promises ourselves but  still need to lay our code out via callback functions which can be hard to read
-  Use the Angular **fakeAsync** and **tick** functions, this additionally lets us lay out our async test code as if it were synchronous
   - **important:** `fakeAsync` does have some drawbacks, it doesn’t track XHR requests for instance

```javascript
// 1. test setup
// 1.1 async service
export class AuthService {
  isAuthenticated(): Promise<boolean> {
    return Promise.resolve(!!localStorage.getItem('token'));   // async
  }
}
// 1.2 component need test
export class LoginComponent implements  OnInit {
  needsLogin: boolean = true;
  constructor(private auth: AuthService) { }
  ngOnInit()  {
    this.auth.isAuthenticated().then((authenticated) => {
      this.needsLogin = !authenticated;
    })
  }
}
```

[back to top](#top)

### Done function and spy callbacks

- Jasmine's built-in way to handle async code

```javascript
it('Button label via jasmine.done', (done) => {      //(1)
  fixture.detectChanges();
  expect(el.nativeElement.textContent.trim()).toBe('Login');
  let spy = spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
  component.ngOnInit();
  spy.calls.mostRecent().returnValue.then(() => {    // (2)
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Logout');
    done();                                          // (3)
  });
});
```

[back to top](#top)

### async and whenStable

```javascript
it('Button label via async() and whenStable()', async(() => {      // (1)
  fixture.detectChanges();
  expect(el.nativeElement.textContent.trim()).toBe('Login');
  spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
  fixture.whenStable().then(() => {                               // (2)
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Logout');
  });
  component.ngOnInit();
}));
```

[back to top](#top)

### fakeAsync and tick

```javascript
it('Button label via fakeAsync() and tick()', fakeAsync(() => {    // (1)
  expect(el.nativeElement.textContent.trim()).toBe('');
  fixture.detectChanges();
  expect(el.nativeElement.textContent.trim()).toBe('Login');
  spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
  component.ngOnInit();
  tick();                        // (2) when there are pending asynchronous activities we want to complete
  fixture.detectChanges();
  expect(el.nativeElement.textContent.trim()).toBe('Logout');
}));
```

[back to top](#top)

> Reference
- https://codecraft.tv/courses/angular/unit-testing/overview/
