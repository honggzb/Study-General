[Main technologies](#top)

- [file structure](#file-structure)
- [interactive between ng-template and au-modal component](#interactive-between-ng-template-and-au-modal-component)
- [click event, keyboard ESC handling(close dialog)](#click-event-keyboard-esc-handlingclose-dialog)
- [animation in modal](#animation-in-modal)

## file structure

```
├── app
│   ├── au-modal/
│   │   ├── au-modal-open-on-click.directive.ts
│   │   ├── au-modal.component.html
│   │   ├── au-modal.component.ts
│   │   ├── au-modal.component.scss
│   │   ├── au-modal.module.ts
│   │   └── modal.service.ts
│   ├── animations.ts
│   ├── app.component.html
│   ├── app.component.ts
│   └── app.module.ts
```

[back to top](#top)

## interactive between ng-template and au-modal component

- HTML structure
- 使用ngTemplateOutlet和context
- 实现点击不同按钮打开不同的tab

```html
<!-- app.component.html   -->
<ng-template #authModalBody let-title="title" let-loginTabActive="loginTabActive">
    <h4>{{title}}</h4>
    <au-tab-panel id="tab-panel" #tabPanel>
        <au-tab title="Login" #loginTab [selected]="loginActive"><!-- ... --></au-tab>
        <au-tab title="Sign Up" #signUpTab [selected]="!loginActive"><!-- ... --></au-tab>
    </au-tab-panel>
</ng-template>
 <au-modal
    [@fadeInOut]                  <!-- animation   -->
    #modal                        <!-- communicate with inside close icon  -->
    [hideOnClickOutside]="true"
    [hideOnEsc]="true"
    [body]="authModalBody"        <!-- ng-template id   -->
    [context]="{title: 'Login or Sign up', loginTabActive: loginActive}"
    *auModalOpenOnClick="[loginButton, signUpButton]">
    <!-- [loginButton, signUpButton]配合ng-template中的[selected]和setLoginActive()- 点击不同按钮打开不同的tab -->
    <i class="fa fa-times" (click)="modal.closeModal()"></i>
  </au-modal>
<div class="modal-buttons">
    <button #loginButton (click)="setLoginActive(true)">Login</button>
    <button #signUpButton (click)="setLoginActive(false)">Sign Up</button>
    <button id="testButton" #testButton>Test</button>
</div>
<!-- app/au-modal/au-modal.component.html   -->
<div class="modal-overlay" (click)="onClickOutsideModal()">
    <div class="modal-body" (click)="cancelClick($event)">
        <div class="close-icon">
            <ng-content select="i"></ng-content>
        </div>
        <ng-container *ngIf="body else projectContent">
            <ng-container *ngTemplateOutlet="body;context:context"></ng-container>
        </ng-container>
        <ng-template #projectContent>
            <ng-content></ng-content>
        </ng-template>
    </div>
</div>
```

[back to top](#top)

## click event, keyboard ESC handling(close dialog)

- 创建auModalOpenOnClick directive
- 创建modal service:
  - **note:** 这个service应该是global，所以在auModule中加入了statci forRoot()，同时在app module中使用forRoot

```javascript
//au-modal-open-on-click.directive.ts
@Directive({selector: '[auModalOpenOnClick]'})
export class AuModalOpenOnClickDirective implements OnInit, OnDestroy {
  elements: HTMLBaseElement[];
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private modalService: AuModalService) { }
  ngOnInit(): void {
    this.modalService.close$.subscribe(() => this.viewContainer.clear());
  }
  //prevent memory leakage
  ngOnDestroy() {
    this.elements.forEach(el => el.removeEventListener('click', this.clickHandler));
  }
  //
  @Input()
  set auModalOpenOnClick(els){
    let elements: HTMLBaseElement[];
    if(els.length){  elements = els;
    }else{ elements = [els];  }
    // handle multiple buttons
    elements.forEach(el => {
      el.addEventListener('click', () => {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
      });
    });
  }
  //
  clickHandler = (() => {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }).bind(this)
}
//model.service.ts
export class AuModalService {
  private subject = new Subject();
  close$: Observable<any> = this.subject.asObservable();
  constructor() { }
  close() {
    this.subject.next();
  }
}
// 2) global setting
//au-modal.module.ts
export class AuModalModule {
  // use it in root
  static forRoot(): ModuleWithProviders{
    return {
      ngModule: AuModalModule,
      providers: [AuModalService]
    }
  }
 }
// app.module.ts
    imports: [
        //...
        AuModalModule.forRoot()
   ],
//3) 应用： au-modal.component.ts
export class AuModalComponent implements OnInit {
//input
  @Input()
  body: TemplateRef<any>;
  @Input()
  context: any;
  @Input()
  hideOnEsc = true;
  @Input()
  hideOnClickOutside = true;
  constructor(
    private modalService: AuModalService,
    private eventManager: EventManager) { }
  ngOnInit() {
    this.eventManager.addGlobalEventListener('window', 'keyup.esc', () => {
      if(this.hideOnEsc){
        this.closeModal();
      }
    });
  }
  closeModal() {
    this.modalService.close();
  }
  onClickOutsideModal() {
    if (this.hideOnClickOutside) {
        this.closeModal();
    }
  }
  cancelClick(evt: KeyboardEvent){
    evt.preventDefault();
    evt.stopPropagation();
  }
}
```

[back to top](#top)

## animation in modal

```javascript
// 定义
export const fadeIn = animation([
    style({ opacity: 0}),
    animate("{{delay}}", style({ opacity: 1}))
]);
export const fadeOut = animation([
    animate("{{delay}}", style({ opacity: 0}))
]);
export const fadeInOut = trigger('fadeInOut', [
    transition('void => *', useAnimation(fadeIn, {params: {delay: '1000ms'}})),
    transition('* => void', useAnimation(fadeOut, {params: {delay: '1000ms'}}))
]);
//使用
// app.component.ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInOut]
})
//app.component.html
<au-modal
    [@fadeInOut]
    //....
</au-modal>
```

[back to top](#top)

> Reference
- https://github.com/angular-university/angular-advanced-course/tree/master/au-modal
- https://github.com/angular-university/angular-advanced-course/tree/master/animations
