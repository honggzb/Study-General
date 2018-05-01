[Angular>2 + Accessibility](#top)

- [Angular CDK- Component Dev Kit](https://material.angular.io/cdk/categories): a package of components on the top of which are built most of Angular Material tools
- CDK **A11y** package: tools to developers to easily implement a smooth and comfortable keyboard interaction between the user and your app

```javascript
import { Component, ViewChild, ViewChildren, ElementRef, QueryList, HostListener, AfterViewInit } from '@angular/core';
import { FocusTrapFactory, FocusMonitor, ListKeyManager} from '@angular/cdk/a11y'
@Component({
  selector: 'app-root',
  template: `
  <button (click)="testA11y()"> Test A11y! </button>
  <div #element role="dialog" hidden=true>
      <label>Sample field</label>
      <input #elementChild>
      <label>Sample field</label>
      <input #elementChild>
      <label>Sample field</label>
      <input #elementChild>
      <label>Sample field</label>
      <input #elementChild>
      <label>Sample field</label>
      <input #elementChild>
  </div>`
})
export class AppComponent implements AfterViewInit {
  keyManager : any
  @ViewChild('element') element : ElementRef; 
  @ViewChildren('elementChild') elementChild : QueryList<any>

  constructor( private focusTrap: FocusTrapFactory, 
            private focusMonitor : FocusMonitor ) {}

  ngAfterViewInit() { 
    this.keyManager = new ListKeyManager(this.elementChild) 
    this.keyManager.withHorizontalOrientation('ltr') // Arrow navigation options 
    this.keyManager.withWrap()  // Arrow navigation options 
  }
  /* Enables keyboard arrows navigation */
  @HostListener('window:keyup', ['$event']) 
  keyFunc(event) {
    if (event.code !== 'Tab') {
      this.keyManager.onKeydown(event)
      this.focusMonitor.focusVia(this.keyManager.activeItem.nativeElement, "keyboard")
    }
    else {  // 'artificially' updates the active element in case the user uses Tab instead of arrows
      this.keyManager.onKeydown(event)
      this.keyManager.setNextItemActive()
    }
  }
  /* Shows the form, puts focus on it and initialize keyboard navigation */
  testA11y() {
    this.element.nativeElement.hidden = false;   
    let focusTrap = this.focusTrap.create(this.element.nativeElement)  // creates a focus trap region
    focusTrap.focusInitialElement()     // Moves the focus in the form (by default the first field)
    this.keyManager.setFirstItemActive()    // Sets the element we focused on as 'active' to the KeyManager
  }
}
```

- `FocusTrapFactory` service:  instantiates the focus trap in the form
  - `create()` method:  with a template reference as parameter, to create a focus trap. So now, once the form open, the user can go through all focusable elements of the form using the tab key without leaving the form.
- `FocusMonitor` service: togther with `ListKeyManager` to enable interaction with the keyboard arrows
- `ListKeyManager` class: service: togther with `FocusMonitor` to enable interaction with the keyboard arrows
  - `ListKeyManager.onKeydown(event)`
  - `FocusMonitor.focusVia(...)`


**FocusTrap related directives**

```HTML
<div #element role="dialog" cdkTrapFocus>
      <label>Sample field</label>
      <input>
      <label>Focus Trap starts here</label>
      <input cdkFocusRegionStart>
      <label>Sample field</label>
      <input>
      <label>Focus Trap (should) end here</label>
      <input cdkFocusRegionEnd>
      <label>Sample field</label>
      <input>
  </div>
```

> Reference
> - [Angular CDK — getting started — Accessibility & A11y](https://codeburst.io/angular-cdk-getting-started-accessibility-a11y-1b6143b961c)
> 
