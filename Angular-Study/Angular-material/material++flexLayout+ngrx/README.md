[angular+material+ngrx](#top)

- [Angular Material + angular flex-layout](#angular-material--angular-flex-layout)
  - [Angular Material](#angular-material)
  - [angular flex-layout](#angular-flex-layout)
- [angular material components/directive](#angular-material-componentsdirective)
  - [mat-hint and mat-error](#mat-hint-and-mat-error)
  - [DatePicker](#datepicker)
  - [Side Menu](#side-menu)
  - [Spining/Dialog Effect](#spiningdialog-effect)
  - [Dialog component- StopTrainingComponent](#dialog-component--stoptrainingcomponent)
- [Angular Material Data Table- sorting, filterring](#angular-material-data-table--sorting-filterring)
- [Angular Fire](#angular-fire)
- [using NgRx](#using-ngrx)
- [Angular Material Themes](#angular-material-themes)
  - [Color Palette types](#color-palette-types)
  - [using pre-built theme](#using-pre-built-theme)
  - [custom theme](#custom-theme)

## Angular Material + angular flex-layout

### Angular Material

```javascript
// 1. install
npm install --save @angular/material @angular/cdk @angular/animations
// 2. configuration
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  //...
  imports: [BrowserAnimationsModule],
  //...
})
// 3. add theme css file in styles.css or index.html
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
<link href="node_modules/@angular/material/prebuilt-themes/indigo-pink.css" rel="stylesheet">
// 4. create shared module- material.module.ts
import { NgModule } from '@angular/core';
@NgModule({
  imports: [],
  exports: []
})
export class MaterialModule { }
// 4. Gesture Support and
npm install --save hammerjs
  //add it in src/main.ts
import 'hammerjs';
// 5. Add Material Icons in index.html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

### angular flex-layout

- `npm install @angular/flex-layout --save`
- `import { FlexLayoutModule } from '@angular/flex-layout';`
- https://github.com/angular/flex-layout
- https://blog.angularindepth.com/angular-flex-layout-flexbox-and-grid-layout-for-angular-component-6e7c24457b63

[back to top](#top)

## angular material components/directive

### mat-hint and mat-error

- No need to import, they are part of MatFormFieldModule
- https://material.angular.io/components/form-field/overview#hint-labels
- https://material.angular.io/components/form-field/overview#error-messages

```html
<!-- signup.component.html -->
<mat-form-field style="width: 70%;" hintLabel="Should be at least 6 charactors long.">
  <input matInput placeholder="your password" type="password"
         ngModel name="password" required minlength="6" #pwInput="ngModel">
  <mat-hint align="end">{{ pwInput.value?.length}}/6</mat-hint>
  <mat-error>Has to be at least 6 charactors long</mat-error>
</mat-form-field>
```

### DatePicker

- import `MatNativeDateModule`, `MatDatepickerModule`
- 限制条件： 如18岁以上才能注册功能
  - define a local reference : `[max]="maxDate" ngModel name="birthdate"`
  - initial and compute maxDate in component

```html
<!-- signup.component.html -->
<mat-form-field style="width: 70%;">
  <input matInput [matDatepicker]="picker" placeholder="Your birthday"
         [max]="maxDate" ngModel name="birthdate" required>
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
<script>
  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }
</script>
```

[back to top](#top)

### Side Menu

- using angular material's components: **sidenav** + **Toolbar** + **List**
- define a local ref(`#sidenav`) in container for controlling side menu's close/open

1. Template/components structure

- navigation:  `<mat-sidenav-container></mat-sidenav-container>`
  - header:  `<mat-toolbar></mat-toolbar>`
  - sidenav-list:  `<mat-nav-list></mat-nav-list>`

```html
<!-- app.component.html -->
<mat-sidenav-container>
    <mat-sidenav #sidenav rol="navigation">
        <app-sidenav-list (closeSidenav)="sidenav.close()"></app-sidenav-list>
    </mat-sidenav>
    <mat-sidenav-content>
      <app-header (sidenavToggle)="sidenav.toggle()"></app-header>  <!-- mat-toolbar -->
      <main>
          <router-outlet></router-outlet>
      </main>
    </mat-sidenav-content>
</mat-sidenav-container>
```

2. responsive layout

![](https://i.imgur.com/8lrIofV.png)

- using angular Flex-layout to complete responsive layout
- `fxHide.gt-xs`: hide button(hamburg menu button) when screen's size greater than xs
- `fxHide.xs`: hide top menu item, only show button(hamburg menu button) when when screen's size equal to xs
- using `sidenavToggle`(header.component) to emit side-nav's open/close event
- using `closeSidenav`(sidenav-list.component) to emit side-nav event when use clicking(choosing) one menu item

```html
<!-- header.component.html -->
<mat-toolbar color="primary">
  <!-- hide button(hamburg menu button) when screen's size greater than xs -->
    <div fxHide.gt-xs>
      <button mat-icon-button (click)="onToggleSidenav()">
        <mat-icon>menu</mat-icon>
      </button>
    </div>
    <div><a routerLink="/">LOGO</a></div>
     <!-- hide top menu item, only show button(hamburg menu button) when when screen's size equal to xs -->
    <div fxFlex fxLayout fxLayoutAlign="flex-end" fxHide.xs>
      <ul fxLayout fxLayoutGap="10px" class="navigation-items">
          <li><a routerLink="/signup">Signup</a></li>
          <li><a routerLink="/login">Login</a></li>
          <li><a routerLink="/training">Training</a></li>
          <li><a>Logout</a></li>
      </ul>
    </div>
</mat-toolbar>
<!-- sidenav-list.component.html -->
<mat-nav-list>
    <a mat-list-item routerLink="/signup" (click)="onClose()">
      <mat-icon>face</mat-icon>
      <span class="nav-caption">Signup</span>
    </a>
    <a mat-list-item routerLink="/login" (click)="onClose()">
      <mat-icon>input</mat-icon>
      <span class="nav-caption">Login</span>
    </a>
    <a mat-list-item routerLink="/training" (click)="onClose()">
      <mat-icon>fitness_center</mat-icon>
      <span class="nav-caption">Training</span>
    </a>
    <mat-list-item>
      <button mat-icon-button (click)="onClose()">
        <mat-icon>eject</mat-icon>
        <span class="nav-caption">Logout</span>
      </button>
    </mat-list-item>
</mat-nav-list>
```

[back to top](#top)

### Spining/Dialog Effect

![](https://i.imgur.com/3uyprsz.png)

- one method: using `@Output` to emit event
- two method: using subscription to handle data(note: need destroy after view)

```html
<mat-tab-group *ngIf="!ongoingTraining">
  <mat-tab label="New Exercise">
    <!-- will call CurrentTraining component -->
    <app-new-training></app-new-training>
  </mat-tab>
  <mat-tab label="Past Exercise">
    <app-past-training></app-past-training>
  </mat-tab>
</mat-tab-group>
<!-- will call dialog-stopTraining component -->
<app-current-training *ngIf="ongoingTraining" (trainingExit)="ongoingTraining=false"></app-current-training>
```

1. create dialog component- StopTrainingComponent

### Dialog component- StopTrainingComponent

```javascript
@Component({
  selector: 'app-stop-training',
  template: `
    <h1 mat-dialog-title>Are you sure?</h1>
    <mat-dialog-content>
      <p>You already got {{ passedData.progress }}%</p>
    </mat-dialog-content>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Yes</button>
      <button mat-button [mat-dialog-close]="false" cdkFocusInitial>No</button>
    </div>
    `,
  styles: []
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
```

2. set dialog component as entryComponents in app.module.ts

```javascript
@NgModule({
  //...
  entryComponents: [StopTrainingComponent]  //be prepare to use it
})
```

3. 调用dialog component and passing data between dialog component and current-training component

`<button mat-raised-button color="accent" (click)="onStop()">Stop</button>`

```javascript
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter<void>();
  timer: number;
  progress = 0;
  constructor(private dialog: MatDialog) { }
  ngOnInit() {
    this.startOrResumeTimer();
  }
  startOrResumeTimer(){
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if(this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 500);
  }
  onStop(){
    clearInterval(this.timer);
    // 打开dialog component， 并传入参数 progress
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress }
    });

    dialogRef.afterClosed().subscribe( result => {
      console.log(result);
      if(result) {  //if click yes
        //1) using event emit, in training.component.html
        // <app-current-training *ngIf="ongoingTraining" (trainingExit)="ongoingTraining=false"></app-current-training>
        this.trainingExit.emit();
        // or
        //2) using subscription, intraining.component.html
        // <app-current-training *nIf="ongoingTraining"></app-current-training
        // in training.service.t
        //    exerciseChanged = newSubject<Exercise>();
        //    this.exerciseChanged.ext(null);
        this.trainingservice.cancelxercise(this.progress);
      } else {     //if click no
        this.startOrResumeTimer();
      }
    });
  }
}
```

[back to top](#top)

## Angular Material Data Table- sorting, filterring

- must import `MatSortModule`
- need to put `this.dataSources.sort = this.sort; this.dataSources.paginator = this.paginator;` in `ngAfterViewInit`

## Angular Fire

![](https://i.imgur.com/fEyaLLu.png)

- `npm install @angular/fire firebase --save`
- **References**
  - [Angularfire Setup Docs](https://github.com/angular/angularfire2/blob/master/docs/install-and-setup.md)
  - [Angularfire Official Docs](https://github.com/angular/angularfire2/blob/master/docs/firestore/collections.md)
  - [Firebase Docs](https://firebase.google.com/docs/web/setup)
  - [Firebase Docs- Cloud Firestore](https://firebase.google.com/docs/firestore/manage-data/structure-data)

[back to top](#top)

## using NgRx

![](https://i.imgur.com/tGn24gP.png)

[back to top](#top)

## Angular Material Themes

### Color Palette types

Color palette| scenory
---|---
Primary Palette| most widely color across all screens
Accent Palette|used for the floating action button and interactive elements
warn palette|used to convey error state
foreground palette| for text and icons
background palette| for element backgrounds

### using pre-built theme

```css
@import '@angular/material/prebuilt-themes/deeppurple-amber.css';
<link href="node_modules/@angular/material/prebuilt-themes/indigo-pink.css" rel="stylesheet">
```

### custom theme

1. create your own scss file in root directory
   1. Imports the `mat-core()` Sass mixin. This includes all common styles that are used by multiple components.
   2. Defines a theme data structure as the composition of multiple palettes. This object can be created with either the `mat-light-theme` function or the `mat-dark-theme` function. The output of this function is then passed to the `angular-material-theme mixin`, which will output all of the corresponding styles for the theme

```css
@import '~@angular/material/theming';
@include mat-core();
$candy-app-primary: mat-palette($mat-indigo);
$candy-app-accent: mat-palette($mat-pink, A200, A100, A400);
$candy-app-warn: mat-palette($mat-red);
$candy-app-theme: mat-light-theme($candy-app-primary, $candy-app-accent, $candy-app-warn);
@include angular-material-theme($candy-app-theme);
```

3. add your scss file to angular-cli.json

```json
"styles": [
  "styles.css",
  "my-theme.scss"
]
```

- [Official Theming Guide](https://material.angular.io/guide/theming)
- [Material Design spec](https://material.io/archive/guidelines/style/color.html#color-color-palette)



[back to top](#top)
