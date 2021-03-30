[Mocking Child Components](#top)

- [Mocking Child Components](#mocking-child-components)
- [Service Injection](#service-injection)

## Mocking Child Components

- Add the child component to declarations array
- Use NO_ERRORS_SCHEMA to ignore the child component
- Manually mock/stub the child component
- Use ngMocks to automatically mock the child component

```javascript
//parent component
@Component({
  selector: 'parent',
  template: `<div>I am a parent. These are my children:</div>
             <child *ngFor="let child of children"
              [selected]="selected" [childName]="child" (select)="onSelect($event)"></child>`
}) 
export class ParentComponent {
  children: string[] = ['Bart', 'Lisa', 'Maggie'];
  selected = '';
  onSelect(child) {    
    this.selected = child;    
  }
}
//child component
@Component({
  selector: 'child',
  template: `<div (click)="onSelect()">
                {{childName}}
                <span *ngIf="selected == child"> ♥ </span>
            </div>`
})
export class ChildComponent {
  @Input() selected: string = '';
  @Input() childName: string = '';
  @Output() select = new EventEmitter<string>();
  onSelect() {    
    this.select.emit(this.childName);
  }
}
//parent.component.spec.ts
import { RouterTestingModule } from '@angular/router/testing';
import { 
  BrowserDynamicTestingModule, 
  platformBrowserDynamicTesting 
} 
from '@angular/platform-browser-dynamic/testing';
import { ParentComponent } from './parent.component';
import { ChildComponent } from './child.component';
import { Router } from '@angular/router';
import { Component, NO_ERRORS_SCHEMA, Input, Output, EventEmitter } from "@angular/core";
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
describe('Parent Component', () => {
  let component: ParentComponent;
  let fixture: ComponentFixture<ParentComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // 1) Add ChildComponent to declarations array
      // 2) Mocking Components using NgMock
      declarations: [ParentComponent, MockComponent(ChildComponent)],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();    
  });
  it('should create one child component for each child', () => {
    expect(childComponents().length).toEqual(component.children.length);
  });
  it('should set child to the name of the child', () => {
    expect(childComponents().map(c => c.childName)).toEqual(
      component.children
    );
  });
  it('should update selected if child component emits select', () => {
    expect(component.selected).toEqual('');
    childComponents()[0].select.emit(childComponents()[0].childName);
    expect(component.selected).toEqual(childComponents()[0].childName);
  });
   it('should set selected to the name of the selected child', () => {
    childComponents()[0].select.emit(childComponents()[0].childName);
    fixture.detectChanges();
    childComponents().map(c => c.selected).forEach(
      selected => expect(selected).toEqual(childComponents()[0].childName)
    );
  });
  // helper function to query all the ChildComponents
  //   - need to change our helper function to return ChildComponent instead of ChildComponentStub
  function childComponents(): ChildComponent[] {
    return fixture.debugElement
      .queryAll(By.directive(ChildComponent))
      .map(el => el.componentInstance);
  }
});
```

[back to top](#top)

## Service Injection

- Components have a parent/child relationship: Inputs and Outputs are a good approach
- Components are in separate routes: service injection might be our only choice
- Components take in dynamic content: ContentChildren is the way to go
- Need to call methods within a child component: we’ll have to use either ViewChild or service injection

[back to top](#top)

> Reference
- [Towards Better Testing In Angular. Part 1 — Mocking Child Components](https://medium.com/@abdul_74410/towards-better-testing-in-angular-part-1-mocking-child-components-b51e1fd571da)
- [Towards Better Testing In Angular. Part 2 — Service Injection](https://medium.com/@abdul_74410/towards-better-testing-in-angular-part-2-service-injection-c87b1fede954)
- [Towards Better Testing In Angular. Part 3— Inputs & Outputs](https://medium.com/@abdul_74410/towards-better-testing-in-angular-part-3-inputs-outputs-e8ed361cdad6)
