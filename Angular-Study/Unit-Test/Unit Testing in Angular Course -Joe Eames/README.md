[Unit Testing in Angular Course -Joe Eames](#top)

- [Automated Testing Overview](#automated-testing-overview)
  - [Unit Tests in Angular](#unit-tests-in-angular)
- [Isolated Unit Tests](#isolated-unit-tests)
  - [Testing a pipe](#testing-a-pipe)
  - [Testing a Service](#testing-a-service)
  - [Testing a component](#testing-a-component)
- [Shallow Integration Tests](#shallow-integration-tests)
  - [Debugging Techinques](#debugging-techinques)
  - [nativeElement vs. debugElement](#nativeelement-vs-debugelement)
  - [Simple Shallow Integration Test- no constructor and child component](#simple-shallow-integration-test--no-constructor-and-child-component)
  - [handle child directives](#handle-child-directives)
- [Deep Integration Tests](#deep-integration-tests)
- [Test DOM interaction and Routing components](#test-dom-interaction-and-routing-components)
  - [Test DOM interaction by emitting event from children](#test-dom-interaction-by-emitting-event-from-children)
  - [Test Interacting with Input Boxes](#test-interacting-with-input-boxes)
  - [Testing Routing component](#testing-routing-component)
- [Advanced Topic](#advanced-topic)
  - [Async Testing- three method](#async-testing--three-method)
  - [Code Coverage](#code-coverage)

## Automated Testing Overview

testing| explanation |demo
---|---|---
Unit testing| Live running application, Tests exercise live application|![](https://i.imgur.com/O7cNIoa.png)
End to end testing| A single “unit” of code|![](https://i.imgur.com/ea8zTzI.png)
Integration or functional testing|More than a unit, less than the complete application, everything in between|![](https://i.imgur.com/CzmKCdl.png), ![](https://i.imgur.com/UZrhkzS.png)

**Types of Mocks**

- Mocking is one type of Unit tests
- Dummies: the object that fill a place, used in place of real object
- Stubs:  the object has controllable behavior
- Spies:  the object that keep track of which of its methods were called, and how many times they were called, and what parameters were used for each call
- True mocks: complex objects that verify that they were used in exactly a specific way

### Unit Tests in Angular

- Isolated
- Integration
  - Shallow: only testing single component and none of its child components or directives
  - Deep

**Techniques of Unit Tests**

- Move less interesting setup into beforeEach()
- Keep critical setup within the it()
- Include Arrange, Act, and Assert inside the it()

[back to top](#top)

## Isolated Unit Tests

### Testing a pipe

```javascript
describe('StrengthPipe', () => {
  it('should display weak if strength is 5', () => {
    let pipe = new StrengthPipe();
    expect(pipe.transform(5)).toEqual('5 (weak)');
  });
  it('should display strong if strength is 10', () => {
    let pipe = new StrengthPipe();
    expect(pipe.transform(10)).toEqual('10 (strong)');
  });
});
```

[back to top](#top)

### Testing a Service

```javascript
describe('MessageService', () => {
  let service: MessageService;
  beforeEach(() => {
    service = new MessageService();
  });
  it('should have no messages to start', () => {
    expect(service.messages.length).toBe(0);
  });
  it('should add a message when add is called', () => {
    service.add('message1');
    expect(service.messages.length).toBe(1);
  });
  it('should clear all messages when clear is called', () => {
    service.add('message1');
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});
```

[back to top](#top)

### Testing a component

- mocking(service) to Isolate Code: `mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);`
- Testing Interactions:  `expect(mockHeroService.deleteHero).toHaveBeenCalled();`

```javascript
describe('HerosComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;
  beforeEach(() => {
    HEROES = [
      {id:1, name: 'SpiderDude', strength: 8},
      {id:2, name: 'Wonderful Woman', strength: 24},
      {id:3, name: 'SuperDude', strength: 55}
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    component = new HeroesComponent(mockHeroService);
  });
  describe('delete', () => {
    it('should remove the indicated hero from the heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      component.delete(HEROES[2]);
      expect(component.heroes.length).toBe(2);
    });
    // check line 37 in heroes.component.ts to verify if parameter passing correctly
    it('should call deleteHero', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      component.delete(HEROES[2]);
      //expect(mockHeroService.deleteHero).toHaveBeenCalled();
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });
  });
})
```

[back to top](#top)

## Shallow Integration Tests

### Debugging Techinques

- Console in Dev Tools
- `"test": "ng test --source-map=false"`

### nativeElement vs. debugElement

- nativeElement: is regular DOM node
- debugElement: is a wrapper around a DOM node
  - it can exposes additional properties that we may want for other purposes, such as 'routerLink' in `<a routerLink="/detail/{{hero.id}}">`, debuElement can access routerLink directive
  - `import { By } from '@angular/platform-browser';`

### Simple Shallow Integration Test- no constructor and child component

- ignore child directive/component: `schemas: [NO_ERRORS_SCHEMA]`

```javascript
// hero.component.shallow.spec.ts
describe('HeroComponent (Shallow Tests)', () => {
  let fixture: ComponentFixture<HeroComponent>;  // just need using some properties of component
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]   // ignore child directive/component
    });
    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the correct hero', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };
    expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
  });
  // testing rendered HTML
  it('should rnder the hero name in an anchor tag', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };
    fixture.detectChanges();  // fire ngOninit
    //expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    let deA = fixture.debugElement.query(By.css('a'));
    expect(deA.nativeElement.textContent).toContain('SuperDude');
  });
});
```

[back to top](#top)

### handle child directives

- ignore child directives:  `schemas: [NO_ERRORS_SCHEMA]`
- mock child directives:

```javascript
// heros.component.shallow.spec.ts
import { HeroService } from './../hero.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA } from '@angular/core/';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../hero';

describe('HerosComponent (Shallow tests)', () => {

  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;
  // 2) mocking child component- hero.component
  @Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
  }
  beforeEach(() => {
    HEROES = [
      {id:1, name: 'SpiderDude', strength: 8},
      {id:2, name: 'Wonderful Woman', strength: 24},
      {id:3, name: 'SuperDude', strength: 55}
    ];
    // mocking an injected service
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ],
      //schemas: [NO_ERRORS_SCHEMA] // 1) ignore child directive/component
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });
  it('should set heroes correctly from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();  // fire ngOninit
    expect(fixture.componentInstance.heroes.length).toBe(3);
  });
  it('should create one li for each hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();  // fire ngOninit
    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  });
});
```

[back to top](#top)

## Deep Integration Tests

- Test HTTP
- Service Intergation Test: using `httpTestingController`

```javascript
import { TestBed, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('HeroService', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;
  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    //let messageService = TestBed.get(MessageService);
    service = TestBed.get(HeroService);
  });
  describe('getHero', () => {
    //it('should call get with the correct Url', inject([HeroService, HttpTestingController], (service: HeroService, controller: HttpTestingController) => {
    it('should call get with the correct Url', () => {
      //service.getHero(3).subscribe();
      service.getHero(4).subscribe(() => {
        console.log('fulfilled');
      });
      const req = httpTestingController.expectOne('api/heroes/4');
      req.flush({id: 4, name: 'SuperDude', strength: 100});
      //verify to avoid that there is 2 calling and one is correct URL, one is incorrect URL
      httpTestingController.verify();
    });
  });
});
```

[back to top](#top)

## Test DOM interaction and Routing components

### Test DOM interaction by emitting event from children

**Three methods to raise an event** - delete action in herosComponent

- `heroComponents[0].query(By.css('button')).triggerEventHandler('click', { stopPropagation: () =>{}});`
- `(<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);`
- `heroComponents[0].triggerEventHandler('delete', null);`

```javascript
// heroes.component.deep.spec.ts
it(`should call heroService.deleteHero when Hero component's delete button is clicked`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();  // fire ngOninit
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    // choose button in child component
    // heroComponents[0].query(By.css('button'))
    //                  .triggerEventHandler('click', { stopPropagation: () =>{}});
    //(<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);  // jjust need pass undefined
    heroComponents[0].triggerEventHandler('delete', null);
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
});
```

### Test Interacting with Input Boxes

- after typing text in input box, Test Hero component are created and add to Hero component list

```javascript
// heroes.component.deep.spec.ts
it(`should add a new hero to the hero list when the add button is clicked`, () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();  // fire ngOninit
    const name = 'Mr. Ice';
    mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 4}));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    //checking if add to ul list
    fixture.detectChanges();
    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);
});
```

### Testing Routing component

- dealing with built-in directive: create a directive stub used to listen
  - such as RouterLinkDirectiveStub to handle RouterLink directive

```javascript
// heroes.component.deep.spec.ts
//1) create RouterLinkDirectiveStub
@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo : any = null;
  onClick(){
    this.navigatedTo = this.linkParams;
  }
}
//2) add it to TestBed and comment 'NO_ERRORS_SCHEMA'
TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ],
      //schemas: [NO_ERRORS_SCHEMA] // ignore child directive/component
    });
//3) use RouterLinkDirectiveStub testing
it(`should have the correct route for the first hero`, () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();  // fire ngOninit
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    let routerLink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub))
                                      .injector.get(RouterLinkDirectiveStub);
    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);
    expect(routerLink.navigatedTo).toBe('/detail/1');
});
```

[back to top](#top)

## Advanced Topic

### Async Testing- three method

- `fakeAsync` and `tick`/`flush`: work well with both `Promise`, a `setTimeout` and pretty much all others asychronous types of code
- `done()` and `setTimeout()`: cannot use in Promise
- `async` and `whenStable`:  to handle Promise and zone()

```javascript
//hero-detail.component.deep.spec.ts
import { TestBed, ComponentFixture, fakeAsync, tick, flush, async } from '@angular/core/testing';
//1) use done() and setTimeout()
it('should call updateHero when save is called', (done) => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();
    fixture.componentInstance.save();
    setTimeout(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
      done();
    }, 300);
});
//2)use fakeAsync and tick/flush
it('should call updateHero when save is called', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();
    fixture.componentInstance.save();
    //tick(250);
    flush();  // if don't know how long it is
    expect(mockHeroService.updateHero).toHaveBeenCalled();
}));
// 3) use async and whenStable to handle Promise and zone()
it('should call updateHero when save is called', async(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();
    fixture.componentInstance.save();
    fixture.whenStable().then(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    });
}));
```

[back to top](#top)

### Code Coverage

- `ng test --code-coverage`
- 'coverage/index.html'

[back to top](#top)
