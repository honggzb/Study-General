[Angular Fundamentals- Jim Cooper](#top)

- [Using 3th-library](#using-3th-library)
- [Routing](#routing)
  - [Link](#link)
  - [Guarding](#guarding)
  - [Lazy loading Module](#lazy-loading-module)
- [Form](#form)
  - [Template-based Form and validation](#template-based-form-and-validation)
  - [Reactive Form and validation](#reactive-form-and-validation)
  - [Customer Validator](#customer-validator)
- [Communication between components](#communication-between-components)
  - [Communicating with Child Components](#communicating-with-child-components)
  - [Communicating with Parent Components](#communicating-with-parent-components)
  - [Using Content Project in component](#using-content-project-in-component)
    - [using multiple slot Content projection](#using-multiple-slot-content-projection)
    - [Styling projected content](#styling-projected-content)
    - [Interacting with Projected Content inside ng-content](#interacting-with-projected-content-inside-ng-content)
- [Pipe- displaying data](#pipe--displaying-data)
  - [custom Pipe](#custom-pipe)
  - [Filtering and Sorting Data](#filtering-and-sorting-data)
- [Dependency Injection](#dependency-injection)
  - [Opaque Token & Inject() to avoid global defining](#opaque-token--inject-to-avoid-global-defining)
  - [@ViewChild Decorator vs. ElementRef](#viewchild-decorator-vs-elementref)
- [Directives and custom validators](#directives-and-custom-validators)
  - [using @Input Setter](#using-input-setter)
  - [add custom validator to angular's Validator](#add-custom-validator-to-angulars-validator)
  - [Multi-fields validator](#multi-fields-validator)
- [HTTP, Observables and RxJS](#http-observables-and-rxjs)
- [Testing Angular](#testing-angular)
- [To Production](#to-production)
  - [Linting](#linting)
- [Production Optimizations(ng build)](#production-optimizationsng-build)
- [Optimistic Bundling Downloading](#optimistic-bundling-downloading)

```
AngularJS   | Angular 2+
MVC         | Components
```
## Using 3th-library

1. use `ng add`, such as angular material which has support schematics

```shell
ng add @angular/material   # add angular material lib
ng g @angular/material:material-nav --name nav  #create navComponent which is angular material-nav
ng g @angular/material:material-dashboard --name dashboard
ng g @angular/material:material-table --name customer-list
```

2. some library which did not support schematic, such as bootstrap, toastr.

```shell
# 1) install
npm install bootstrap font-awesome toastr jquery --save
# 2) configuration
# 2.1) method1 to use css, edit styles.scss file
@import "~bootstrap/dist/css/bootstrap.css";
@import "~font-awesome/css/font-awesome.css";
# 2.2) edit angular.json
"styles": [
              "node_modules/toastr/build/toastr.min.css",
              "src/styles.scss"
          ],
"scripts": [
              "node_modules/jquery/dist/jquery.min.js",
              "node_modules/bootstrap/dist/js/bootstrap.js",
              "node_modules/toastr/build/toastr.min.js"
           ],
```

[back to top](#top)

## Routing

### Link

```html
<!-- html -->
<a class="nav-link" [routerLink]="['/events']"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{exact:true}">All Events <span class="sr-only">(current)</span></a>
<a class="nav-link" [routerLink]="['events/new']" routerLinkActive="active">Create Event</a>
<a class="nav-link" [routerLink]="['events',event.id]" routerLinkActive="active">Create Event</a>
<!-- javascript -->
<script>
import { ActivatedRoute, Router } from '@angular/router';
ngOnInit() {
    this.event = this.eventService.getEvent(+this.activatedRoute.snapshot.params['eventId'])
}
this.router.navigate(['/events']);
</script>
```

### Guarding

- Route Activation: 检查是否route的id是否存在
- Route De-Activation:
- resolve: 解决异步数据

```javascript
const routes: Routes = [
  { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
  { path: 'events', component: EventsListComponent, resolve: {events: EventsListResolver} },   //events必须和EventsListResolver中的定义的一致
  { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator] },
  { path: '404', component: Errors404Component },
  { path: '', pathMatch: 'full', redirectTo: '/events' }
];
/*1) Route Activation - EventRouteActivator*/
//event-route-activaror.service.ts
export class EventRouteActivator implements CanActivate{
  constructor(private eventService: EventService, private router:Router) { }
  canActivate(route:ActivatedRouteSnapshot){
    //如ID存在，则转到该id的页面， 如不存在，则转到404页面
    const eventExists = !!this.eventService.getEventById(+route.params['id']);
    if(!eventExists)
      this.router.navigate(['/404']);
    return eventExists;
  }
}
/*2) Route De-Activation*/
//in app.module.ts
providers: [
    EventService,
    ToastrService,
    EventRouteActivator,
    EventsListResolver,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    }
  ],
export function checkDirtyState(component: CreateEventComponent){
  if(component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?');
  return true;
}
// in create-event.component.ts
export class CreateEventComponent implements OnInit {
  isDirty:boolean = true;     //define isDirty = true
  constructor(private router: Router) { }
  ngOnInit() {}
  cancel(){
    this.router.navigate(['/events']);
  })
/*3) resolve data for asych*/
// events-list-resolver.service.js
export class EventsListResolver implements Resolve<any> {
  constructor(private eventService: EventService) { }
  resolve(){
    return this.eventService.getEvents().pipe(map(events => events))  //events必须和route中的定义的一致
  }
}
```

### Lazy loading Module

```javascript
//sub-module and sub-router - user.module.ts
const userRoutes = [
  { path: 'profile', component: ProfileComponent },
];
@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes)  //forChild
  ],
  providers: []
})
export class UserModule { }
//main router module
const routes: Routes = [
  //...
  { path: 'user', loadChildren: './user/user.module#UserModule' },   //loadChildren
];
// path should be - user/profile
```

[back to top](#top)

## Form

### Template-based Form and validation

```html
<form #loginForm="ngForm" autocomplete="off" (ngSubmit)="login(loginForm.value)" novalidate>
    <div class="form-group" >
      <label for="userName">User Name:</label>
      <em *ngIf="loginForm.controls.userName?.invalid && (loginForm.controls.userName?.touched || mouseoverLogin)">Required</em>
      <input (ngModel)="userName" name="userName" id="userName" type="text" class="form-control" placeholder="User Name..." required />
    </div>
    <div class="form-group" >
      <label for="password">Password:</label>
      <em *ngIf="loginForm.controls.password?.invalid && (loginForm.controls.password?.touched ||mouseoverLogin)">Required</em>
      <input (ngModel)="password" name="password" id="password" type="password" class="form-control" placeholder="Password..." required />
    </div>
    <span (mouseenter)="mouseoverLogin=true" (mouseleave)="mouseleaveLogin=false">
        <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid">Login</button>
    </span>
    <button type="button" class="btn btn-default" (click)="cancel()">Cancel</button>
  </form>
<script>
export class LoginComponent implements OnInit {
  userName;
  password;
  mouseoverLogin;  //when mouseenter to submit button, it will show Required word

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {}
  login(formValues){
    this.authService.loginUser(formValues.userName, formValues.password);
    this.router.navigate(['events']);
  }
  cancel(){
    this.router.navigate(['events']);
  }
}
</script>
```

### Reactive Form and validation

```javascript
//create-session.component.ts
ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar'])]);
    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract
    });
  }
```

### Customer Validator

```html
<label for="abstract">Abstract:</label>
      <em *ngIf="abstract.invalid && abstract.dirty && abstract?.errors.required">Required</em>
      <em *ngIf="abstract.invalid && abstract.dirty && abstract?.errors.maxlength">Cannot exceed 400 character</em>
      <em *ngIf="abstract.invalid && abstract.dirty && abstract?.errors.restrictedWords">Cannot include {{ abstract?.errors.restrictedWords }} word</em>
      <textarea formControlName="abstract" id="abstract" rows=3 class="form-control" placeholder="abstract..."></textarea>
<script>
//restricted-words.validator.ts
export function restrictedWords(words){
  return (control:FormControl):{[key:string]:any} => {
    if(!words) return null;
    var invalidWords = words.map( w => control.value.includes(w) ? w : null)
                            .filter(w => w != null);
    return invalidWords && invalidWords.length>0 ? { 'restrictedWords': invalidWords.join(', ')} : null;
  }
}
//create-session.component.ts
this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar'])]);
</script>
```

[back to top](#top)

## Communication between components

### Communicating with Child Components

### Communicating with Parent Components

use Output parameters to pass data back to parent component

**child component: create-session.component**

```html
<form [formGroup]="newSessionForm" (ngSubmit)="saveSession(newSessionForm.value)" autocomplete="off">
  <!-- ...   -->
  <button type="button" class="btn btn-default" (click)="cancel()">Cancel</button>
</form>
<script>
@Output() saveNewSession = new EventEmitter()
@Output() cancelAddSession = new EventEmitter()
  //...
saveSession(formValues){
    let session:ISession = {
        //...
    }
    this.saveNewSession.emit(session);
  }
  //...
cancel(){
  this.cancelAddSession.emit();
}
</script>
```

**parent component: event-detail.component**

```html
<create-session *ngIf="addMode" (saveNewSession)="saveNewSession($event)" (cancelAddSession)="cancelAddSession()"></create-session>
<script>
saveNewSession(session:ISession){
  const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
  session.id = nextId+1;
  this.event.sessions.push(session);
  this.eventService.updateEvent(this.event);
  this.addMode = false;
  }
cancelAddSession(){
  this.addMode = false;
}
</script>
```

### Using Content Project in component

**using `<ng-content></ng-content>` to create Collapse**

```javascript
//collapsible-card.component
(@Component({
  selector: 'collapsible-card',
  template: `
    <div class="card bg-light mb-3">
      <div class="card-body">
        <h3 class="card-title" (click)="toggleContent()">{{title}}</h3>
        <ng-content *ngIf="visible"></ng-content>
      </div>
    </div>`,
  styles: []
})
export class CollapsibleCardComponent implements OnInit {
  @Input() title:string
  visible:boolean = false;
  constructor() { }
  ngOnInit() {}
  toggleContent(){
    this.visible = !this.visible;
  }
}
```

apply to session-list.component

```html
<div class="row" *ngFor="let session of sessions">
  <div class="col-md-10">
    <collapsible-card [title]="session.name">
      <div class="card-text">
        <h6>{{session.presenter}}</h6>
        <span>Duration: {{session.duration}}</span><br />
        <span>Level: {{session.level}}</span>
        <p>{{session.abstract}}</p>
      </div>
    </collapsible-card>
  </div>
</div>
```

### using multiple slot Content projection

- use select property of ng-content, it can be a class, id or tag

```javascript
//collapsible-card.component
(@Component({
  selector: 'collapsible-card',
  template: `
    <div class="card bg-light mb-3">
      <div class="card-body">
        <h3 class="card-title" (click)="toggleContent()">
          <ng-content select="[card-title]"></ng-content>
        </h3>
        <ng-content select="[card-body]" *ngIf="visible"></ng-content>
      </div>
    </div>`,
  styles: []
})
export class CollapsibleCardComponent{
  visible:boolean = false;
  toggleContent(){
    this.visible = !this.visible;
  }
}
```

apply to session-list.component

```html
<div class="row" *ngFor="let session of sessions">
  <div class="col-md-10">
    <collapsible-card>
      <span card-title>   <!-- using card-title -->
        {{session.name}}
        <i *ngIf="session.voters.length >2" class="fa fa-fire" style="color: red;"></i>
      </span>
      <div class="card-text" card-body>     <!-- using card-body -->
        <h6>{{session.presenter}}</h6>
        <span>Duration: {{session.duration}}</span><br />
        <span>Level: {{session.level}}</span>
        <p>{{session.abstract}}</p>
      </div>
    </collapsible-card>
  </div>
</div>
```

### Styling projected content

- `:host` selector:  the styles will be applied only inside this component
- `/deep/` modifier: the style will no longer be scoped only to HTML elements of this particular component, but it will also affect any
descendant elements

```css
:host /deep/ input {
  border: none;
  outline: none;
}
```

### Interacting with Projected Content inside ng-content

- cannot interact with the ng-content tag
- Instead, the best way to interact with the projected input is to start by applying a **new separate directive** to the input 

```html
<h1>FA Input</h1>
<fa-input icon="envelope">
  <input inputRef type="email" placeholder="Email">
 </fa-input>
```

The we can use that this directive to track if the input has the focus or not

```javascript
//create a directive named inputRef
@Directive({
  selector: '[inputRef]'
})
export class InputRefDirective {
  focus = false;
  // native focus and blur DOM event are being detected using @HostListener decorator
  @HostListener("focus")
  onFocus() {
    this.focus = true;
  }
  @HostListener("blur")
  onBlur() {
    this.focus = false;
  }
}
// to interact with projected content
@Component({
  selector: 'fa-input',
  template: `
    <i class="fa" [ngClass]="classes"></i>
    <ng-content></ng-content>
    `,
  styleUrls: ['./fa-input.component.css']
})
export class FaInputComponent {
  @Input() icon: string;
  @ContentChild(InputRefDirective)   //inject inputRef directive
  input: InputRefDirective;
  @HostBinding("class.focus")
  get focus() {
    return this.input ? this.input.focus : false;
  }
  get classes() {
    const cssClasses = { fa: true };
    cssClasses['fa-' + this.icon] = true;
    return cssClasses;
  }
}
```

[back to top](#top)

## Pipe- displaying data

```
           Pipes vs Filters
AngularJS Filters    | Angular Pipe
Formatting           | Formatting
Sorting              | No sorting
Filtering            | No filtering
```

### custom Pipe

```javascript
@Pipe({
  name: 'duration'    //name of pipe
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {   //  (input value:input value type):return value type
    switch(value){
      case 1: return 'Half Hour';     // return value
      case 2: return 'One Hour';      // return value
      case 3: return 'Half Day';      // return value
      case 4: return 'Full Day';      // return value
      default: return value.toString();   // return value
    }
  }
}
```

### Filtering and Sorting Data

- Sort and filter AngularJS Filters have performance issue
- Angular need wrote sort and filter by yourself
- Sample: add filterBy and sortBy as template variable
  - `<session-list *ngIf="!addMode" [sessions]="event?.sessions" [filterBy]="filterBy" [sortBy]="sortBy"></session-list>`
  - In parent component, adding `filterBy: string = 'all';sortBy: string = 'name';`

```javascript
//session-list.component
export class SessionListComponent implements OnChanges {
  @Input() sessions:ISession[]
  @Input() filterBy: string
  @Input() sortBy: string
  visibleSessions: ISession[] = []
  //use ngOnchanges to catch change of value
  ngOnChanges() {
    if(this.sessions){
      this.filterSessions(this.filterBy);
      this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc);
    }
  }
  //filter
  filterSessions(filter){
    if(filter === 'all'){
      //clone by slice method to make visibleSession unique
      this.visibleSessions = this.sessions.slice(0);
    }else{
      this.visibleSessions = this.sessions.filter(session => {
        return session.level.toLocaleLowerCase() === filter;
      });
    }
  }
}
// seperate function for sorting
function sortByNameAsc(s1: ISession, s2: ISession){
  if(s1.name > s2.name) return 1
  else if(s1.name === s2.name) return 0
  else return -1
}
function sortByVotesDesc(s1: ISession, s2: ISession){
  return s2.voters.length - s1.voters.length;
}
```

[back to top](#top)

## Dependency Injection

### Opaque Token & Inject() to avoid global defining

1. change ToastrService to interface
   1. define a token
   2. inject token(InjectionToken)
2. modify app.module.ts, useValue
3. inject token in component

```javascript
//toastr.service.ts
import { InjectionToken } from '@angular/core';
// TOASTR_TOKEN is a object, so use can use it's instantiate
export let TOASTR_TOKEN = new InjectionToken<Toastr>('toastr');
export interface Toastr {
  success(message: string, title?:string):void;
  info(message: string, title?:string):void;
  warning(message: string, title?:string):void;
  error(message: string, title?:string):void;
}
//app.module.ts
providers: [
    //...
    { provide: TOASTR_TOKEN, useValue: toastr },
]
//profile.component.ts
export class ProfileComponent implements OnInit {
  constructor(private auth: AuthService, private router:Router,
              @Inject(TOASTR_TOKEN) private toastr: Toastr) {}   //inject token
  //use toastr
  saveProfile(profileFormValue){
    if(this.profileForm.valid){
      this.auth.updateCurrentUser(profileFormValue.firstName, profileFormValue.lastName);
      this.router.navigate(['events']);
      this.toastr.success('Profile Saved!');
    }
}
```

### @ViewChild Decorator vs. ElementRef

```javascript
@Component({
  selector: 'simple-modal',
  template: `
    <div id="{{elementId}}" #modalcontainer class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{title}}</h4>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
          </div>
          <div class="modal-body" (click)="closeModal()">
            <ng-content></ng-content>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`,
  styles: [`.modal-body { height: 250px; overflow-y: scroll; }`]
})
export class SimpleModalComponent {
  @Input() title:string
  @Input() elementId: string
  //@ViewChild('modalcontainer') containerEI: ElementRef
  @Input() closeOnBodyClick: string
  private el: HTMLElement;
  constructor(@Inject(JQ_TOKEN) private $: any, ref: ElementRef) {
    //or
    this.el = ref.nativeElement;
   }
  closeModal(){
    if(this.closeOnBodyClick.toLocaleLowerCase() === 'true'){
      //this.$(this.containerEI.nativeElement).modal('hide');
      // or
      this.$('.modal').modal('hide');
    }
  }
}
```

[back to top](#top)

## Directives and custom validators

### using @Input Setter

```javascript
//upvote.component.ts
@Input() set voted(val){
    this.iconColor = val ? 'red' : 'white';
  }
```

### add custom validator to angular's Validator

- add customer validator to NG_VALIDATORS as one item of NG_VALIDATORS's list

```javascript
@Directive({
  selector: '[validateLocation]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: LocationValidator,
    multi: true
  }]
})
export class LocationValidator implements Validators{
  validate(formGroup: FormGroup): {[key: string]: any} {
    let addressControl = formGroup.controls['address'];
    let cityControl = formGroup.controls['city'];
    let countryControl = formGroup.controls['country'];
    let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];   //another formGroup

    if((addressControl && addressControl.value && cityControl && cityControl.value && countryControl && countryControl.value) || (onlineUrlControl && onlineUrlControl.value)){
      return null;
    } else{
      return { validateLocation: false}
    }
  }
}
```

### Multi-fields validator

- define a local ref(locationGroup) in one group, add validateLocation in this group
- add (click) or (focus) in another group, `(focus)="locationGroup.control.controls.address.updateValueAndValidity()"`

```html
<div ngModelGroup="location" #locationGroup="ngModelGroup" validateLocation>
  <div class="form-group">
    <label for="address">Event Location:</label>
            <em *ngIf="locationGroup?.invalid && locationGroup?.touched">You must enter either the full location OR an onlineUrl</em>
          <input (ngModel)="newEvent.location.address" name="address" id="address" type="text" class="form-control" autofocus placeholder="Address of event..." />
          </div>
          <div class="row">
            <div class="col-md-6">
              <input (ngModel)="newEvent.location.city" name="city" id="city" type="text" class="form-control" autofocus placeholder="City..." />
            </div>
            <div class="col-md-6" >
              <input (ngModel)="newEvent.location.country" name="country" id="country" type="text" class="form-control" autofocus placeholder="Country..." />
            </div>
  </div>
</div>
<div class="form-group">
  <label for="onlineUrl">Online Url:</label>
    <input (ngModel)="newEvent.onlineUrl" name="onlineUrl" id="onlineUrl" type="text" class="form-control" (focus)="locationGroup.control.controls.address.updateValueAndValidity()" placeholder="Online Url..." />
</div>
```

[back to top](#top)

## HTTP, Observables and RxJS

## Testing Angular

```
            unit test                    |    End to End test
fast                                     | slow
Involve Isolated pieces of Code          | Exercises the Entire System
-----------------------------------------------------------------------------------------------
        Isolated Tests                   |       Integrated Tests
Test Class Only-No Template              | Test Class & Template
Constructed in Test                      | Constructured by Framework
Simple                                   | Complex
Best for Services & Pipes                | Mainly Used for Components & Directives, sometimes used for Service
Appropriate For Components & Directives  | Deep or Shallow
```

- [Towards Better Testing In Angular. Part 1 — Mocking Child Components](https://medium.com/@abdul_74410/towards-better-testing-in-angular-part-1-mocking-child-components-b51e1fd571da)

[back to top](#top)

## To Production

### Linting

- Pointing out and fixing potential problems
- Catching potential errors
- automatic error fix
- TSlint(Typescript linting)
  - rules in `tslint.json`
  - command line:  `ng lint`, `ng lint --fix`

## Production Optimizations(ng build)

- development mode off
- Bundling
- Minification
- Tree Shaking: remove methods and properties that never called
- Dead code elimination
- Asset inlining
- Executes AOT(Ahead Of Time compiler)
  -

## Optimistic Bundling Downloading

- preload: `RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})`

[back to top](#top)

> Reference
- https://jcoop.io/angular-practice-exercises/
- http://angular2-first-look.azurewebsites.net/
- www.joeeames.me


node node_modules/ngf-server/server.js
