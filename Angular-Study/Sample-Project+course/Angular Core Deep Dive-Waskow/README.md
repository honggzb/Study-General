[Angular Core Deep Dive](#top)

- [Migration to version 9](#migration-to-version-9)
  - [update commands](#update-commands)
  - [some breaking changes are coming in Angular 9](#some-breaking-changes-are-coming-in-angular-9)
  - [Update Angular CLI version Globally](#update-angular-cli-version-globally)
  - [Using TypeScript in Node.js On The Server](#using-typescript-in-nodejs-on-the-server)
  - [Proxying to a backend server](#proxying-to-a-backend-server)
- [Angular Components, Directives and Pipes](#angular-components-directives-and-pipes)
  - [conditional class](#conditional-class)
  - [Pipe](#pipe)
  - [View/Component/HTML Query](#viewcomponenthtml-query)
- [Template/Content Projection](#templatecontent-projection)
  - [ng-content](#ng-content)
  - [ng-content child Decoration](#ng-content-child-decoration)
  - [ng-container](#ng-container)
  - [ng-template and *ngTemplateOutlet](#ng-template-and-ngtemplateoutlet)
- [Directive](#directive)
  - [Host binding - DOM properties vs attributes](#host-binding---dom-properties-vs-attributes)
  - [Host Listening - Handling events in Directives](#host-listening---handling-events-in-directives)
  - [export directive as function](#export-directive-as-function)
  - [structural directive](#structural-directive)
- [Style Isolation/View Encapsulation](#style-isolationview-encapsulation)
- [Service and Dependency Injection](#service-and-dependency-injection)
  - [Http Service](#http-service)
  - [Providers and Injection Tokens(user-defined service)](#providers-and-injection-tokensuser-defined-service)
  - [Tree-Shakeable Providers](#tree-shakeable-providers)
  - [Injection Tokens](#injection-tokens)
  - [Angular DI Host Decorator](#angular-di-host-decorator)
- [Angular Change Detection](#angular-change-detection)
  - [OnPush Change Detection](#onpush-change-detection)
  - [Handle Observable Date streams with onPush change Detection strategy](#handle-observable-date-streams-with-onpush-change-detection-strategy)
  - [Angular attribute decorator](#angular-attribute-decorator)
  - [Angular Custom Change Detection with 'ChangeDetectorRef'](#angular-custom-change-detection-with-changedetectorref)
- [Angular Lifecycle Hooks - use cases and pitalls](#angular-lifecycle-hooks---use-cases-and-pitalls)
  - [AfterContentChecked Lifecycle Hook/AfterViewChecked Lifecycle Hook](#aftercontentchecked-lifecycle-hookafterviewchecked-lifecycle-hook)
- [Impure Pipe](#impure-pipe)
- [Angular Elements](#angular-elements)
- [Angular Internationalization i18n](#angular-internationalization-i18n)
  - [Setting up localization](#setting-up-localization)
  - [Translate attributes](#translate-attributes)
  - [I18n Pluralization/Select among alternative text messages- Regular expressions for plurals and selections](#i18n-pluralizationselect-among-alternative-text-messages--regular-expressions-for-plurals-and-selections)
  - [Alternative expressions](#alternative-expressions)
  - [Create Language Switcher in app.component](#create-language-switcher-in-appcomponent)
  - [Running a translated angular APP](#running-a-translated-angular-app)
- [Angular Elements](#angular-elements-1)

## Migration to version 9

### update commands

```shell
# First update the local angular cli to version 8.3.17 or 8.x
npm install --no-save @angular/cli@^8.3.15
# using flag --next is required while using ng update command. This flag is not required, once final version of Angular 9 is released
# using @9 is required, otherwise it will update to 10 directly
# using --allow-dirty if there is message : Repository is not clean. Please commit or stash any changes
ng update @angular/cli@9 @angular/core@9 --next --allow-dirty
```
### some breaking changes are coming in Angular 9

> Static flag migration.
  Removes the `static` flag from dynamic queries.
  As of Angular 9, the "static" flag defaults to false and is no longer required for your view and content queries.
  Read more about this here: https://v9.angular.io/guide/migration-dynamic-flag

> Missing @Injectable and incomplete provider definition migration.
  In Angular 9, enforcement of @Injectable decorators for DI is a bit stricter and incomplete provider definitions behave differently.
  Read more about this here: https://v9.angular.io/guide/migration-injectable

> ModuleWithProviders migration.
  In Angular 9, the ModuleWithProviders type without a generic has been deprecated.
  This migration adds the generic where it is missing.
  Read more about this here: https://v9.angular.io/guide/migration-module-with-providers

> Renderer to Renderer2 migration.
  As of Angular 9, the Renderer class is no longer available.
  Renderer2 should be used instead.
  Read more about this here: https://v9.angular.io/guide/migration-renderer

> Undecorated classes with decorated fields migration.
  As of Angular 9, it is no longer supported to have Angular field decorators on a class that does not have an Angular decorator.
  Read more about this here: https://v9.angular.io/guide/migration-undecorated-classes

> Undecorated classes with DI migration.
  As of Angular 9, it is no longer supported to use Angular DI on a class that does not have an Angular decorator.
  Read more about this here: https://v9.angular.io/guide/migration-undecorated-classes

### Update Angular CLI version Globally

```shell
npm uninstall -g angular-cli
npm cache clean       # or npm cache verify (if npm &gt; 5)
npm install -g @angular/cli@latest
```

### Using TypeScript in Node.js On The Server

```shell
"scripts": {
    "server": "ts-node -P ./server.tsconfig.json ./server.ts"
    # or
    "server": "./node_modules/.bin/ts-node -P ./server.tsconfig.json ./server.ts"
  },
```

- fix server startup issue, server.tsconfig.json

### Proxying to a backend server

1. Create a file **proxy.conf.json** in your project's 'src/' folder
2. In the CLI configuration file **angular.json**, add the **proxyConfig** option to the serve target
3. To run the dev server with this proxy configuration, call `ng serve`

```json
"architect": {
  "serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "options": {
      "browserTarget": "your-application-name:build",
      "proxyConfig": "src/proxy.conf.json"
    },
```

[back to top](#top)

## Angular Components, Directives and Pipes

### conditional class

1. `[ngClass]="cardClasses()` in course-card.component.html
2. `[ngStyle]="{'text-decoration':'underline'}"` in course-card.component.html

### Pipe

- A pipe is a template mechanism that we can use to tranform data and display it in another form to the user

### View/Component/HTML Query

- `@ViewChild`
  - component/Plain HTML:  `@ViewChild('cardRef1') card: CourseCardComponent;`
  - component/Plain HTML: `container: ElementRef;`
  - native DOM: `@ViewChild('cardRef1',{read: ElementRef}) card: CourseCardComponent;`
    - `{read: ElementRef}`： 可以选择任何一部分来操作， 如native DOM等
- `@ViewChildren`
  - `@ViewChildren('cardRef1') cards: QueryList<CourseCardComponent>;`

1. 定义`#cards`

```html
<button (click)="onCoursesEdited()">Edit Courses</button>
<course-card #cards *ngFor="let course of courses; index as i; first as isFirst; last as isLast;"
               [class.is-first]="isFirst" [class.is-last]="isLast"
               [course]="course" [cardIndex]="i + 1"
               (courseSelected)="onCourseSelected($event)"></course-card>
```

2. 使用reference，注意EventEmitter方法**changes**是一个observable

```javascript
@ViewChildren(CourseCardComponent) cards: QueryList<CourseCardComponent>;

onCoursesEdited() {
    this.courses.push({
      id: 8,
        description: 'Complete Typescript Course',
        longDescription: "Complete Guide to Typescript From Scratch: Learn the language in-depth and use it to build a Node REST API.",
        iconUrl: 'https://angular-academy.s3.amazonaws.com/thumbnails/typescript-2-small.png',
        category: 'BEGINNER'
    })
  }
ngAfterViewInit() {
    // this.cards.changes是一个observable, 所以可以subscribe后，使用onCoursesEdited来处理
    this.cards.changes.subscribe(
      cards => console.log(cards)
    )
  }
```

[back to top](#top)

## Template/Content Projection

### ng-content

```html
<!-- parent html -->
<course-card #cards *ngFor="let course of courses; index as i; first as isFirst; last as isLast;"
               [class.is-first]="isFirst" [class.is-last]="isLast"
               [course]="course" [cardIndex]="i + 1"
               (courseSelected)="onCourseSelected($event)">
  <img class="course-image" width="200" alt="Angular Logo" [src]="course.iconUrl" />
  <div class="course-description">{{course.longDescription}}</div>
</course-card>
<!-- child html -->
<ng-content select="img"></ng-content>
<ng-content select=".course-image"></ng-content>
<ng-content select=".course-description"></ng-content>
```

### ng-content child Decoration

- ng-content use `@ContentChild`/`@ContentChildren`, did not use `@ViewChild`/`@ViewChildren`
- ng-content use `ngAfterContentInit()`, did not use `ngAfterViewInit()`

### ng-container

**will not create extra DOM element keep page more lightweight**

```html
<!-- course-card.html, before -->
<div class="" *ngIf="course" [ngClass]="cardClasses()">
  <div class="course-title" [ngStyle]="{'text-decoration':'underline'}">
    {{cardIndex + '.  ' + course.description}}
  </div>
  <img width="200" alt="Angular Logo" [src]="course.iconUrl" *ngIf="course.iconUrl;else noImage"/>
  <ng-template #noImage>
    <p> No image is available</p>
  </ng-template>
  <div class="course-description">{{course.longDescription}}</div>
  <br>
  <div class="course=category" [ngSwitch]="course.category">
    <button class="catergory" *ngSwitchCase="'BEGINNER'">BEGINNER</button>
    <button class="catergory" *ngSwitchCase="'INTERMEDIATE'">INTERMEDIATE</button>
    <button class="catergory" *ngSwitchCase="'ADVANCED'">ADVANCED</button>
    <button class="catergory" *ngSwitchDefault>All levels</button>
  </div>
  <br>
  <button (click)="onCourseViewed(course)">View Course</button>
</div>
<!-- course-card.html, after -->
<!-- the benefit of ng-container is if course did not exist, there is no DOM for whole course -->
<ng-container *ngIf="course">
  <div class="" [ngClass]="cardClasses()">
    <div class="course-title" [ngStyle]="{'text-decoration':'underline'}">
      {{cardIndex + '.  ' + course.description}}
    </div>
    <img width="200" alt="Angular Logo" [src]="course.iconUrl" *ngIf="course.iconUrl;else noImage"/>
    <div class="course-description">{{course.longDescription}}</div>
    <br>
    <!-- the benefit of ng-container is if course.category did not exist, there is no DOM for category -->
    <ng-container [ngSwitch]="course.category">
      <div class="course-category">
        <ng-container *ngSwitchCase="'BEGINNER'">
          <button class="catergory">BEGINNER</button>
        </ng-container>
        <button class="catergory" *ngSwitchCase="'INTERMEDIATE'">INTERMEDIATE</button>
        <button class="catergory" *ngSwitchCase="'ADVANCED'">ADVANCED</button>
        <button class="catergory" *ngSwitchDefault>All levels</button>
      </div>
    </ng-container>
    <br>
    <button (click)="onCourseViewed(course)">View Course</button>
  </div>
</ng-container>
```

[back to top](#top)

### ng-template and *ngTemplateOutlet

- ngTemplateOutlet with parameters: `*ngTemplateOutlet="noImageTpl;context:{description:course.description}"`

```html
<!-- app.component.html -->
<ng-template #blankImage let-courseName="description">
  <p class="warn"> {{courseName}} has no image yet.</p>
  <img width="200" src="/assets/empty-image.png" />
</ng-template>
<course-card *ngFor="let course of courses; index as i;"
             [course]="course" [cardIndex]="i + 1"
             (courseSelected)="onCourseSelected($event)"
             [noImageTpl]="blankImage">      <!-- define local noImageTpl template variable -->
  <course-image [src]="course.iconUrl" *ngIf="course"></course-image>
  <div class="course-description" *ngIf="course">{{course.description}}</div>
</course-card>
<!-- course-card.component.html -->
<ng-container *ngIf="course">
  <div class="" [ngClass]="cardClasses()">
    <div class="course-title" [ngStyle]="{'text-decoration':'underline'}">
      {{cardIndex || '' + '.  ' + course.description}}
    </div>
    <!-- using course-image component by select="course-image" -->
    <ng-content select="course-image" *ngIf="course.iconUrl;else noImage"></ng-content>
    <ng-template #noImage>
      <!-- use noImageTpl with parameter by *ngTemplateOutlet, must input noImageTpl in ts, -->
      <!-- @Input() noImageTpl: TemplateRef<any>; -->
      <ng-container *ngTemplateOutlet="noImageTpl;context:{description:course.description}"></ng-container>
    </ng-template>
    <div class="course-description">{{course.longDescription}}</div>
    <br>
    <ng-container [ngSwitch]="course.category">
      <!-- ... -->
    </ng-container>
    <br>
    <button (click)="onCourseViewed(course)">View Course</button>
  </div>
</ng-container>

```

[back to top](#top)

## Directive

- components are directives with template
- `ng g directive directives/highlighted`
- directive also apply to host element
- structural directive: such as div/component with star syntax `*ngIf/*ngFor/*ngSwitch`
- attribute directive:  `<input disabled required>`

### Host binding - DOM properties vs attributes
### Host Listening - Handling events in Directives

```javascript
//1. define directive -> highlighted.directive.ts
 @HostBinding('class.highlighted')  //DOM property
   get cssClass(){
    return true;
   }
 @HostBinding('attr.disabled')  //DOM attribute
  get disable() {
    return true;
  }
//2. use directive in app.component.html
<course-card *ngFor="let course of courses; index as i;" highlighted>
```

### export directive as function

```javascript
//highlighted.directive.ts
@Directive({
  selector: '[highlighted]',
  exportAs: 'hlm'    //export as function
})
export class HighlightedDirective {
  //...
  toggle() {
    this.isHighlighted = !this.isHighlighted;
    console.log("highlight directive", this.isHighlighted);
    this.toggleHighlight.emit(this.isHighlighted);
  }
}
//app.component.html
<course-card *ngFor="let course of courses; index as i; first as isFirst; last as isLast;"
               [class.is-first]="isFirst" [class.is-last]="isLast"
               [course]="course" [cardIndex]="i + 1"
               (courseSelected)="onCourseSelected($event)"
               [noImageTpl]="blankImage"
               highlighted #highlighter="hlm"      //define a template references highlighter
               (toggleHighlight)="onToggle($event)">
    <course-image [src]="course.iconUrl" *ngIf="course"></course-image>
    <div class="course-description"
         *ngIf="course"
         (dblclick)="highlighter.toggle()">{{course.description}}</div>   // use directive function toggle()
  </course-card>
```

### structural directive

`<course-image [src]="course.iconUrl" *ngxUnless="!course"></course-image>`

```javascript
//ngx-unless.directive.ts
export class NgxUnlessDirective {
  visible = false;
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }
  @Input()
  set ngxUnless(condition: boolean) {
    if(!condition && !this.visible) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.visible = true;
    } else {
      this.viewContainer.clear();
      this.visible = false;
    }
  }
}
```

[back to top](#top)

## Style Isolation/View Encapsulation

- View Encapsulation
  - `:host` Host selector -> view encapsulation
  - `::ng-deep` modifier  ->  bypassing view encapsulation style
    - `:host ::ng-deep h2` -> cascade to all child elements of a component, but not to any other element on the page
  - `:host-context` Host Context selector  -> component apply a style to some element outside of it, bypassing global style(common use cases for theming)
- encapsulation parameter
  - `ViewEncapsulation.Emulated`
  - `ViewEncapsulation.None`
  - `ViewEncapsulation.ShadowDom`
  - `ViewEncapsulation.Native`
- [Angular :host, :host-context, ::ng-deep - Angular View Encapsulation](https://blog.angular-university.io/angular-host-context/)

```html
<!-- courseCard component will pass slamon-theme(global) style -->
<div class="salmon-theme">
  <div>
      <br><p>style test</p> <br> <br>
  </div>
  <course-card class="course-card">
      <!-- ... -->
  </course-card>
</div>ts-node
<style>
:host-context(.salmon-theme) .course-card {
  background: lightsalmon;
}
</style>
```

- [Angular :host, :host-context, ::ng-deep - Angular View Encapsulation](https://blog.angular-university.io/angular-host-context/)

[back to top](#top)

## Service and Dependency Injection

### Http Service

```javascript
// http.get return Observable,
// method 1: it must be triggle by subscribe
ngOnInit() {

  this.http.get('/api/courses', { params })
           .subscribe(courses => this.courses = courses);
}
// method 2: use Observable and async pipe - this method helps preventing memory leak
courses$: Observable<Course[]>;
ngOnInit() {
    const params = new HttpParams().set('page', '1').set('pageSize', '10');
    this.courses$ = this.http.get<Course[]>('/api/courses', { params });
  }
// template using async pipe
<course-card *ngFor="let course of (courses$ | async)">
   <!-- ... -->
</course-card>
<!-- or -->
<div *ngIf="courses$ | async as courses">
  <course-card *ngFor="let course of courses">
    <!-- ... -->
  </course-card>
</div>
```

### Providers and Injection Tokens(user-defined service)

- **Injection Token:** unique identify one dependency
- to understand, we can remove `{providedIn: 'root'}` and define provider manually

```javascript
//1. courses.service.ts- remove {providedIn: 'root'}
@Injectable()
export class CoursesService {
   //...
}
//
//2. define user-defined provider in app.component.ts
// 2.1 user-defined provider defination for CoursesService
function coursesServiceProvider(http: HttpClient): CoursesService {
  return new CoursesService(http);
}
// 2.2 injection token defination
const COURSES_SERVICE = new InjectionToken<CoursesService>('COURSES_SERVICE');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{
    provide: COURSES_SERVICE,
    useFactory: coursesServiceProvider,
    deps: [HttpClient]   //must defined dependency
  }]
})
export class AppComponent implements AfterViewInit, OnInit {
  // 2.3 add decorator to input token
  constructor(@Inject(COURSES_SERVICE) private coursesService: CoursesService){}
  //...
}
```

- Class name as a dependency injection token because class name exists at runtime under the form ofa constructor function
- Interface does not exist at runtime, it is compile time construct only

```javascript
providers: [{
    provide: CoursesService,
    useClass: CoursesService
  }]
```

### Tree-Shakeable Providers

- Since Angular 6, can create tree-shakable dependencies and even leave out Angular modules
  - **hard dependencies**: using `providers` option of the `NgModule` -> all the services provided in an Angular module become part of the bundle, even the ones that aren’t used by declarables or other dependencies
  - **tree-shakable dependencies**:
- Tree-shakable dependencies enable smaller compiled bundles

```javascript
// tree-shakable service
@Injectable({
  providedIn: 'root',    // root meaning: application wide singleton
  useFactory: (http) => new CoursesService(http),
  deps: [HttpClient]
})
export class CoursesService {
  //...
}
```

- [Tree-shakable dependencies in Angular projects](https://indepth.dev/tree-shakable-dependencies-in-angular-projects/)
- [Tree Shakeable Providers and Services in Angular](https://coryrylan.com/blog/tree-shakeable-providers-and-services-in-angular)

### Injection Tokens

- only included in the bundle in runtime if they are injective
- inject objects instead of intances of classes
- if want to jnject some global configuration - application wide configuration

```javascript
//config.ts
export interface AppConfig {
    apiUrl: string;
    courseCacheSize: number;
}
export const APP_CONFIG : AppConfig = {
    apiUrl: 'http://localhost:4222',
    courseCacheSize: 10
}
export const CONFIG_TOKEN = new InjectionToken<AppConfig>('CONFIG_TOKEN',
                                    // second param is for tree-shadeable
                                    { providedIn: 'root', factory: () => APP_CONFIG });
// app.component.ts
export class AppComponent implements AfterViewInit, OnInit {
  // ...
  constructor(private coursesService: CoursesService,
              @Inject(CONFIG_TOKEN) private config: AppConfig){
    console.log(config);
  }
```

### Angular DI Host Decorator

- By default a service is application wide singleton
- `@Self()`:     always use itself component DI
- `@SkipSelf()`: always use parent component DI, not local component
- `@Host()`:  such as a directive that needs to grab dependencies created by its host component
- `@Optional()`

[back to top](#top)

## Angular Change Detection

### OnPush Change Detection

- angular will not detect data changes by analyzing each of the expression of the template, instead angular will detect changes in the `@input` data of the component(such as `course` in course-card.component.ts)
- pushing the data either via input properties or via a async pipie into the component
- event handler will gets triggered in onPush detection will be triggered just like the case of default change detection

```javascript
//app.component.html
<button (click)="onEditCourse()">Edit course</button>
<course-card *ngFor="let course of courses"
             [course]="course"
             (courseChange)="save($event)">
      <course-image [src]="course.iconUrl" *ngxUnless="!course"></course-image>
</course-card>
//app.component.ts
export class AppComponent {
  courses = Courses;
  onEditCourse() {
    //1) just change value, it do not work
    this.courses[0].description = 'new Value';
    //2)  create a new copy variable, then it work  <- it changes `@input` data
    const course = this.courses[0];
    const newCourse = {...course};  // copy object
    newCourse.description = 'new Value';
    this.courses[0] = newCourse;
  }
// course-card.component.ts
export class CourseCardComponent implements OnInit {
  @Input() course: Course;
}
```

### Handle Observable Date streams with onPush change Detection strategy

- use **'async'** pipe as much as possible, otherwise onPush detection will not detect data changes in component template

```javascript
// 1) workable sample if use onPush detection
//app.component.html
<button (click)="onEditCourse()">Edit course</button>
<div class="courses" *ngIf="(courses$ | async) as courses">
  <course-card *ngFor="let course of courses"
              [course]="course"
              (courseChange)="save($event)">
        <course-image [src]="course.iconUrl" *ngxUnless="!course"></course-image>
  </course-card>
</div>
//app.component.ts
export class AppComponent implements OnInit {
  courses$: Observable<Course[]>;
  ngOnInit() {
    this.courses$ = this.coursesService.loadCourses();
  }
}
// 2) bad sample, did not work if use onPush detection
//app.component.html
<button (click)="onEditCourse()">Edit course</button>
<div class="courses">
  <course-card *ngFor="let course of courses"
              [course]="course"
              (courseChange)="save($event)">
        <course-image [src]="course.iconUrl" *ngxUnless="!course"></course-image>
  </course-card>
</div>
//app.component.ts
export class AppComponent implements OnInit {
  courses: Course[];
  ngOnInit() {
    this.coursesService.loadCourses().subscribe((courses) => this.courses = courses);
  }
}
```

### Angular attribute decorator

- a performance optimization that will prevent angular from continuously checking the value of that type property
- looks like a one-time binding -> only being bound to the valid in the template once first time that component gets built and then the content of this attribute will no longer be shake in the future

```javascript
//app.component.html
<div class="courses" *ngIf="(courses$ | async) as courses">
  <course-card *ngFor="let course of courses"
              [course]="course"
              type="beginner'  <!-- attribute with no square bracket -->
              (courseChange)="save($event)">
        <course-image [src]="course.iconUrl" *ngxUnless="!course"></course-image>
  </course-card>
</div>
export class AppComponent implements OnInit {
  //...
  constructor(private coursesService: CoursesService,
              @Attribute('type') private type: string){
              //attribute decorator accept one parameter which is name of attribute in template
    console.log(type);
  }
}
```

### Angular Custom Change Detection with 'ChangeDetectorRef'

```javascript
//app.component.html
<button (click)="onEditCourse()">Edit course</button>
<div class="courses">
  <course-card *ngFor="let course of courses"
              [course]="course"
              (courseChange)="save($event)">
        <course-image [src]="course.iconUrl" *ngxUnless="!course"></course-image>
  </course-card>
</div>
//app.component.ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush  // add OnPush detection
})
// 1) method 1: use it in ngOnInit
export class AppComponent implements OnInit, DoCheck {
  courses: Course[];
  loaded = false;
  constructor(private coursesService: CoursesService,
              private cd: ChangeDetectorRef){
              //attribute decorator accept one parameter which is name of attribute in template
    console.log(type);
  }
  ngOnInit() {
    this.coursesService.loadCourses().subscribe(courses => {
      this.courses = courses;
      this.cd.markForCheck();
    });
  }
}
// 2) method 2: use it in ngDoCheck
export class AppComponent implements OnInit, DoCheck {
  courses: Course[];
  loaded = false;
  constructor(private coursesService: CoursesService,
              private cd: ChangeDetectorRef){
              //attribute decorator accept one parameter which is name of attribute in template
    console.log(type);
  }
  ngOnInit() {
    this.coursesService.loadCourses().subscribe(courses => {
      this.courses = courses;
      this.loader = true;
    });
  }
  ngDoCheck() {
    if(this.loader) {  // this.loader is for preventing only happened in first data loading
      this.cd.markForCheck();
      this.loader = undefined;
    }
  }
}
```

[back to top](#top)

## Angular Lifecycle Hooks - use cases and pitalls

When a component is created:

1. first call the constructor and pass the constructor dependencies, but do not populate input member variables ->
2. ngOnChanges -> only trigger if the input object itself(reference) changes, not if one of the object properties changes
3. ngOnInit ->

### AfterContentChecked Lifecycle Hook/AfterViewChecked Lifecycle Hook

- **For project content into the component’s view**
  - AfterContentChecked will be called when every event that angular is handling -> methods in aftercontentchecked should be lightweighted
  - can not change properties in the content party of the component
  - AfterContentChecked() is a great place to do any modifications to the data of component before it gets checked for changes, it is the last opportunity to modify the data of the template
- **On the other hand**
  - AfterViewChecked cannot modify anything that relates to the component or anything in the content part of component
  - ngAfterViewChecked() is a great place to perform common DOM operations such as set focus on new element or scrolling to a bottom of a list

```javascript
//app.component.html
<button (click)="onEditCourse()">Edit course</button>
<div class="courses">
  <course-card *ngFor="let course of courses"
              [course]="course"
              (courseChange)="save($event)">
      <course-image [src]="course.iconUrl" *ngxUnless="!course"></course-image>
  </course-card>
</div>
//app.component.ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush  // add OnPush detection
})
export class AppComponent implements OnInit, DoCheck {
  //...
  ngAfterContentChecked() {
    this.course.description = 'ngAfterContentChecked';  //will not cause error
    this.course.iconUrl = '';    //will cause error because it is property of content part of course-card component
    }
  }
  ngAfterViewChecked() {
    this.course.description = 'ngAfterContentChecked';  //will cause error
  }
}
```

> References
- [Angular — Understanding Angular lifecycle hooks with a Sample Project](https://medium.com/bb-tutorials-and-thoughts/angular-understanding-angular-lifecycle-hooks-with-a-sample-project-375a61882478)
- https://github.com/bbachi/angular-lifecycle-hooks

[back to top](#top)

## Impure Pipe

- will be called in every angular change detection cycle

```javascript
@Pipe({
  name: 'filterByCategory',
  pure: false     // impure pipe
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(courses: Course[], category: string): unknown {  //first param is input of the pipe, second is pipe string
    return courses.filter(course => course.category === category);
  }

}

```

[back to top](#top)

## Angular Elements

- `ng add @angular/elements --project-name=deepdiv`
- `ng g component course-title`

```javascript

```

[back to top](#top)

## Angular Internationalization i18n

### Setting up localization

1. `ng add @angular/localize` <- setup environment
2. `ng xi18n` -> reate a translation source file **messages.xlf** in root directory
   1. `ng xi18n --i18n-locale fr` -> specify the base locale of app if want generate in franch version at first time
   2. `ng xi18n --output-path src/locale`  -> output options
3. using i18n pipes in template, `meaning|description@@user-defined unique id`
   1. Help the translator with a description and meaning
   2. Define unique custom ids

```html
<div class="demo">
  <h4 i18n="welcome message|greet the user a greeting at the start of course.@@welcomeMessage">Welcome to the Angular Core deep dive course</h4>
  <!-- meaning|description@@user-defined unique id -->
  <button (click)="onCoursesEdited()" i18n>Edit Courses</button>
</div>
```

### Translate attributes

```html
<img [src]="logo" i18n-title title="Angular logo" />
<!-- or -->
<img [src]="logo" i18n title="Angular logo" />
```

### I18n Pluralization/Select among alternative text messages- Regular expressions for plurals and selections

- Select among alternative text messages
  - `<span i18n>The author is {gender, select, male {male} female {female} other {other}}</span>`
- Pluralization
  - must defined a variable coursesTotal in app.component.ts firstly
  - `<span i18n>Updated {minutes, plural, =0 {just now} =1 {one minute ago} other {{{minutes}} minutes ago}}</span>`
    - The first parameter is the key. It is bound to the component property (minutes), which determines the number of minutes.
    - The second parameter identifies this as a plural translation type.
    - The third parameter defines a pluralization pattern consisting of pluralization categories and their matching values.
  - Pluralization categories include (depending on the language):
    - `=0` (or any other number)
    - `zero`
    - `one`
    - `two`
    - `few`
    - ` many`
    - `other`
  - plural can be nested

```html
<div class="demo">
    <h4 i18n="welcome message|greet the user a greeting at the start of course.@@welcomeMessage">Welcome to the Angular Core deep dive course</h4>
    <button (click)="onCoursesEdited()" i18n>Edit Courses</button>
    <div i18n>{coursesTotal, plural,
      =0 {No courses available.}
      =1 { One course is available.}
      other { A total of {{coursesTotal}} coures are available}}</div>
</div>
<!-- Nesting plural and select ICU expressions -->
<span i18n>Updated: {minutes, plural,
  =0 {just now}
  =1 {one minute ago}
  other {{{minutes}} minutes ago by {gender, select, male {male} female {female} other {other}}}}
</span>
```

### Alternative expressions

```html
<!-- course-card.component.html -->
<div class="course-category">
    {
      course.category,
      select,
      BEGINNER {BEGINNER}
      INTERMEDIATE {INTERMEDIATE}
      ADVANCED {ADVANCED}
    }
</div>
```

### Create Language Switcher in app.component

```javascript
export class AppComponent {
  //...
  languageList = [ // <--- add this
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' }
  ];
}
<ul>
  <li *ngFor="let language of languageList">
    <a href="/{{language.code}}/"> {{language.label}} </a>
  </li>
</ul>
```

### Running a translated angular APP

1. create a localization folder, translation files messages.fr.xlf
2. Translating plural and select expressions in messages.fr.xlf
   1. `<source>{VAR_PLURAL, plural, =0 {just now} =1 {one minute ago} other {<x id="INTERPOLATION" equiv-text="{{minutes}}"/> minutes ago} }</source>`
   2. `<target>{VAR_PLURAL, plural, =0 {à l'instant} =1 {il y a une minute} other {il y a <x id="INTERPOLATION" equiv-text="{{minutes}}"/> minutes} }</target>`
   3. save files
3. Setting Up the AOT Compiler -> edit angular.json
   1. Add fr and en key under the build key
4. `ng serve --configuration=fr` -> running locale version
5. `ng build --configuration=fr --prod` -> building locale version

```javascript
"architect": {
    "build": {
          "configurations": {
            "production": { ... },
            "fr": {
              "aot": true,        //AOT
              "outputPath": "dist/deepdiv-fr",
              "i18nFile": "src/app/locale/messages.fr.xlf",
              "i18nFormat": "xlf",
              "i18nLocale": "fr",    //sets the locale for the package
              "i18nMissingTranslation": "ignore",
              "baseHref": "/fr/"     //sets the base URL portion for the given package
            },
            "fr": {
              "aot": true,        //AOT
              "outputPath": "dist/deepdiv",
              "i18nFile": "src/app/locale/messages.xlf",
              "i18nFormat": "xlf",
              "i18nLocale": "en",
              "i18nMissingTranslation": "ignore",
              "baseHref": "/en/"     //sets the base URL portion for the given package
            }
          }
        },
    "serve": {
          "configurations": {
            "production": {
              "browserTarget": "deepdiv:build:production"
            },
            "fr": {
              "browserTarget": "deepdiv:build:fr"
            }
          }
      },
```

- also need to tweak the serve section inside the angular.json

```javascript
"serve": {
          "configurations": {
            "production": {
              "browserTarget": "deepdiv:build:production"
            },
            "fr": {
              "browserTarget": "deepdiv:build:fr"
            },
            "en": {
              "browserTarget": "deepdiv:build"
            }
          }
        },
```

> https://angular.io/guide/i18n

[back to top](#top)

## Angular Elements

- Angular elements are Angular components packaged as custom elements (also called Web Components), a web standard for defining new HTML elements in a framework-agnostic way
- element provides an easy path to creating dynamic HTML content in your Angular app. HTML content that you add directly to the DOM in an Angular app is normally displayed without Angular processing
- `ng add @angular/elements`
- `ng g c course-title`

```javascript
// course-title.component.ts
@Component({
  selector: 'course-title',
  templateUrl: `<div class="course-title">{{title}}</div>`,
  styleUrls: ['./course-title.component.css']
})
export class CourseTitleComponent {
  @Input() title: string;
  constructor() { }
}
//app.component.ts
import {createCustomElement} from '@angular/elements';
constructor(private injector: Injector){ }   //use Injector
ngOnInit() {
    const htmlElement = createCustomElement(CourseTitleComponent, {injector: this.injector});
    customElements.define('course-title', htmlElement);
  }
//course.component.html
<course-title [title]=course.description></course-title>
//app.module.ts
@NgModule({
  //...
  entryComponents: [CourseTitleComponent]
})
//courses.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  //...
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

> https://angular.io/guide/elements

[back to top](#top)

> [How To Update Angular CLI To Latest Version 9](https://www.angularjswiki.com/angular/update-angular-cli-version-ng-update-to-latest-6-7-versions/)

> Conference
- https://github.com/angular-university
- https://github.com/angular-university/angular-course
- [Angular Translation: A Closer Look at Angular 8](https://medium.com/i18n-and-l10n-resources-for-developers/angular-translation-a-closer-look-at-angular-8-fdf688f3c44a)
