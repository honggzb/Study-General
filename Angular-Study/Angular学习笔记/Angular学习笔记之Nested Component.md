## [Angular学习笔记之Nested Component](#top)

- [Using @ViewChild to inject a reference to a DOM element](#using-viewchild-to-inject-a-reference-to-a-dom-element)
- [Using @ViewChild to inject a reference to the DOM element of a component](#using-viewchild-to-inject-a-reference-to-the-dom-element-of-a-component)
- [@ViewChild options argument](#viewchild-options-argument)
- [Using @ViewChild to inject Directives](#using-viewchild-to-inject-directives)


```
                                                | decorator     |
------------------------------------------------|---------------|-------------------------------------------------------------------------
sending data from parent to child Component     |  @Input       | binds the expression into directive, `@input() advice: string;`
------------------------------------------------|---------------|-------------------------------------------------------------------------
sending data from child to parent Component     |  @Output      | is used if the parent-child hierarchy is small
                                                | @EventEmitter | used t o emit data from child back to parent component
------------------------------------------------|---------------|-------------------------------------------------------------------------
accessing selector from view of child Component | @ViewChild    | `@ViewChild(selector { read: readValue, static: staticValue}) property;`
------------------------------------------------|---------------|-------------------------------------------------------------------------
```

- **must using ngAfterViewInit()**

### Using @ViewChild to inject a reference to a DOM element

- to interact with plain HTML elements in the template

```javascript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements  AfterViewInit {
  @ViewChild('title') title: ElementRef;
  ngAfterViewInit() {
    console.log('Values on ngAfterViewInit():');
    console.log("title:", this.title.nativeElement);
  }
}
```

### Using @ViewChild to inject a reference to the DOM element of a component

- when injecting a reference applied to a component, get back the component instance
- when injecting a reference to a plain HTML element, get back the corresponding wrapped reference to the native DOM element

```javascript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements  AfterViewInit {
  @ViewChild('primaryColorSample') sample: ColorSampleComponent;
  ngAfterViewInit() {
    console.log('Values on ngAfterViewInit():');
    console.log("sample:", this.sample);
  }
}
```

### @ViewChild options argument

- read property will specify exactly what we are trying to inject, in case that there are multiple possible injectables available
  - `@ViewChild('primaryColorSample', {read: ElementRef}) sample: ElementRef;`
  
### Using @ViewChild to inject Directives

- rewrite our template so that the handling of the click event is now delegated to the AppComponent class, `(click)="openColorPicker()"`
- injected directive injected in the following way:  `@ViewChild('primaryInput', {read:ColorPickerDirective}) colorPickerDirective: ColorPickerDirective;`

```javascript
// color-sample.component.ts
@Component({
  selector: 'color-sample',
  templateUrl: '
      <div class="color-sample mat-elevation-z3" [ngStyle]="{'background-color':color}">
        <mat-icon>palette</mat-icon>
      </div>',
  styleUrls: ['./color-sample.component.css']
})
export class ColorSampleComponent implements OnInit {
  @Input() color;
  constructor() { }
  ngOnInit() {
  }
}
// app.component.ts
import {ColorPickerDirective} from 'ngx-color-picker';
@Component({
  selector: 'app-root',
  templateUrl:
    '<div class="container">
      <h2>Choose Brand Colors:</h2>
      <div class="form-field">
        <color-sample [color]="primary" #primaryColorSample (click)="openColorPicker()"></color-sample>
        <mat-input-container>
          <mat-label>Primary Color</mat-label>
          <input #primaryInput  name="primary" [(colorPicker)]="primary" matInput cpPosition="bottom" [(ngModel)]="primary"/>
        </mat-input-container>
      </div>
    </div>'
})
export class AppComponent {
  primary = '#1976d2';
  @ViewChild('primaryInput') primaryInput: ElementRef;
  @ViewChild('primaryInput', {read:ColorPickerDirective}) colorPickerDirective: ColorPickerDirective;
  openColorPicker() {
    this.colorPickerDirective.openDialog();
  }
}
```

> https://blog.angular-university.io/angular-viewchild/

[go to top](#top)
