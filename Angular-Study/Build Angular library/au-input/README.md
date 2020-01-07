
## Main technologies in 3rd Library

### using Ng-content and seperated styles

```html
<!-- au-fa-input.component.html  -->
<i class="icon fa" [ngClass]="classes"></i>
<ng-content></ng-content>
<!-- common/common.scss  -->
:host ::ng-deep input {
    border:none;
    outline: none;
    height: 100%;
    margin: 1px 0;
    box-sizing: border-box;
}
```

- using `ng-content` if it has many properties
- **note:** `/deep/` is deprecated. The shadow-dom-piercing descendant combinator is deprecated and support is being removed from major browsers and tools. As such, in v4 we deprecated support in Angular for all 3 of `/deep/`, `>>>` and `::ng-deep`. Until removal, `::ng-deep` is preferred for broader compatibility with the tools

[back to top](#top)

### using ViewChild/@ContentChild with user-defined directive

- `ViewChild/@ContentChild`
  - angular 8, `@ViewChild(CourseCardComponent, {read:HighlightedDirective, static:false}) highlighted: HighlightedDirective;`
  - angular 9, `@ViewChild(CourseCardComponent) highlighted: HighlightedDirective;`
- using `ViewEncapsulation.Emulated`

```javascript
@Component({
  selector: 'au-fa-input',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './au-fa-input.component.html',
  styleUrls: ['./au-fa-input.component.scss']
})
export class AuFaInputComponent {
  @Input()
  icon: string;
  // for ng-content, using directive
  @ContentChild(InputRefDirective, {static: false})
  input:InputRefDirective;
  constructor() { }
  @HostBinding('class.input-focus')
  get isInputFocus(){
    return this.input ? this.input.focus : false;
  }
  get classes() {
    const cssClasses = {};
    if(this.icon) {
      cssClasses['fa-' + this.icon] = true;
    }
    return cssClasses;
  }
}
```

[back to top](#top)

### others

`npm i --save bootstrap @angular/material font-owesome material-design-icons`

```css
/* styles.scss */
@import "~bootstrap/dist/css/bootstrap.css";
@import "~font-awesome/css/font-awesome.css";
@import "~material-design-icons/iconfont/material-icons.css"
```

## publish procedure

- create lib/index.ts- `export {AuInputModule} from './au-input.module';`

```shell
ng serve -prod --aot
# publish to a private enterprise npm repository
npm clean
npm publish
# new version
npm version patch
npm build
cd dist/
npm publish
```

[back to top](#top)

## Test the library with different customers

### Angular Package Format

- [Angular Package Format](https://github.com/angular-university/au-input/tree/master/src/lib)
- `index.ts`, `export {AuInputModule} from './src/module';`


### systemJS base project

- [systemJS base project](https://github.com/angular-university/au-input/tree/master/src/demo)

```javascript
//systemjs.config.js
packages: {
      'au-input': {
        main: 'index.js',
        defaultExtension: 'js'
      }
    }
```

[back to top](#top)

> Reference
- https://github.com/angular-university/angular-advanced-course/
