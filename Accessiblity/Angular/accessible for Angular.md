[accessible for Angular](#top)

- [WCAG Checklists](#wcag-checklists)
- [General Accessibility audit](#general-accessibility-audit)
- [address common web accessibility issues](#address-common-web-accessibility-issues)
  - [Manual testing](#manual-testing)
  - [Automated testing](#automated-testing)
- [Define unique page titles](#define-unique-page-titles)
- [Ensure adequate color contrast](#ensure-adequate-color-contrast)
- [Use Semantic HTML](#use-semantic-html)
- [Create selectable controls with Angular Material](#create-selectable-controls-with-angular-material)
- [Provide control labels with ARIA](#provide-control-labels-with-aria)
- [Add the power of @angular/cdk/a11y](#add-the-power-of-angularcdka11y)
  - [Control focus with FocusTrap](#control-focus-with-focustrap)
  - [Announce changes with LiveAnnouncer - Changes, errors, and notifications are not announced](#announce-changes-with-liveannouncer---changes-errors-and-notifications-are-not-announced)
- [Enable HighContrast mode](#enable-highcontrast-mode)


---------------------------------------------------------------

- Meet all accessibility guidelines, WCAG 2.0, and ARIA 1.2, and pass axe and Lighthouse accessibility audits
- Use Google Chrome Developer Tools, Lighthouse, and axe to audit your app's accessibility
- Solve single-page app (SPA) pitfalls with unique page titles
- Fix low-color contrast issues for low-vision users
- Use semantic HTML to ensure screen readers navigate the page correctly
Use Angular Material and unnest controls to ensure screen readers can access all controls
- Add ARIA support for screen readers
- Import and use the Angular CDK a11y package
- Use FocusTrap for custom component screen-reader navigation
- Announce notifications with the CDK LiveAnnouncer
- Detect users with HighContrast mode and implement high-contrast theming

--------------------------------------------------------

## WCAG Checklists

- https://www.wuhcag.com/wcag-checklist/

## General Accessibility audit

- 🛑 All pages have the same page title
- 🛑 Elements must have sufficient color contrast
- 🛑 HTML should have logical order, name, and role
- 🛑 Nested checkboxes are not selectable for screen readers
- 🛑 Screen reader does not read slider values
- 🛑 Screen reader focus in the color picker exits the dialog
- 🛑 Changes, errors, and notifications are not announced
- 🛑 HighContrast mode is not enabled

## address common web accessibility issues

### Manual testing

- turn on computer's built-in screen reader and navigate through your app with keyboard navigation
- MacOS: 
  - System Preferences --> Accessibility --> VoiceOver --> Enable VoiceOver
  - TouchID three times while holding the Command key

### Automated testing

- Lighthouse and Chrome Developer Tools
  1. Open 'Chrome Developer Tools'
  2. Select the 'Lighthouse' tab and select the 'Accessibility' checkbox
  3. Click Generate report to run an a11y Lighthouse audit
- Axe
  1. Install the 'axe' DevTools extension
  2. Open 'Chrome Developer Tools'
  3. Select the axe DevTools tab and select 'Scan all of my page' to run an axe DevTools scan
- Linting: In 'eslint.json', add the following, which apply to accessibility
  - For more information, see the latest ESLint rules on [GitHub](https://github.com/angular-eslint/angular-eslint/tree/main/packages/eslint-plugin-template/src/rules)


```js
"@angular-eslint/template/accessibility-alt-text": 2,
"@angular-eslint/template/accessibility-elements-content": 2,
"@angular-eslint/template/accessibility-label-for": 2,
"@angular-eslint/template/no-positive-tabindex": 2,
"@angular-eslint/template/accessibility-table-scope": 2,
"@angular-eslint/template/accessibility-valid-aria": 2,
"@angular-eslint/template/click-events-have-key-events": 2,
"@angular-eslint/template/mouse-events-have-key-events": 2,
"@angular-eslint/template/no-autofocus": 2,
"@angular-eslint/template/no-distracting-elements": 2
```

[⬆ back to top](#top)

## Define unique page titles

- Add a unique title to each of the three defined routes

```js
const routes: Routes = [
  { path: 'shop', component: ShopComponent, title: 'Our Shop – a11y in Angular' },
  { path: 'about', component: AboutComponent, title: 'Our Story - a11y in Angular' },
  { path: 'locate', component: LocationComponent, title: 'Find Us - a11y in Angular' },
  { path: '',   redirectTo: '/shop', pathMatch: 'full' },
  { path: '**', component: ShopComponent },
];
```

[⬆ back to top](#top)

## Ensure adequate color contrast

- Update Material theme to use a darker text color, increasing the contrast ratio of your icons
- src/styles.scss
  - `$light-primary: mat.define-palette(mat.$pink-palette, $default: A100, $lighter: 100, $text: 900);`
- [built-in accessibility tooling](https://developer.chrome.com/blog/new-in-devtools-89/#apca)

## Use Semantic HTML

- HTML should have logical order, name, and role
- Changing a `<div>` to a `<button>`
- Use heading elements sequentially: 
  - Reorder the text to use semantic HTML and apply styling using [Angular Material typography](https://material.angular.io/guide/typography)

```html
<h2>Who are we?</h2>
<p class="mat-subheading-2">Have you ever thought, "wow, I love dumplings"?</p>
<p class="right mat-subheading-1">Who hasn't.</p>
<p class="center mat-subheading-1">We took it one step further and created Dumpling Dumpling,</p> 
<p class="center mat-subheading-1">double the dumpling, double the fun.</p>
<div class="spacer"></div>
<h2>How are we different?</h2>
<p class="mat-subheading-2">Handmade in San Francisco, California, we craft fully customizable dumplings. Glitter? Rainbows? Vegan? We do it all.</p>
<p class="right mat-subheading-2">This shop is concept only.</p>
```

[⬆ back to top](#top)

## Create selectable controls with Angular Material

- **Problem**: select a nested checkbox --> the parent checkboxes don't specify children checkboxes
- **Solution**: replace checkboxes with Material checkboxes(`<mat-selection-list>`)

```js
//src/app/shop/shop.component.ts
@Component(...)
export class ShopComponent implements OnInit {
  fillings: string[] = ['Bok Choy & Chili Crunch', 'Tofu & Mushroom', 'Chicken & Ginger', 'Impossible Meat & Spinach'];
  selectedFillings: string[] = [];
  fauxPurchase(): void {
    let flavor = '';
    this.selectedFillings.forEach(filling => {
      flavor = flavor + " " + filling
    })
  }
}
//src/app/shop/shop.component.html
<mat-selection-list [(ngModel)]="selectedFillings" 
  aria-label="Dumpling fillings">
  <mat-list-option *ngFor="let flavor of fillings" 
    [value]="flavor" 
    color="primary">
    {{ flavor }}
  </mat-list-option>
</mat-selection-list>
```

[⬆ back to top](#top)

## Provide control labels with ARIA

- Label control using `aria-label` to `<mat-slider>`
  
```js
//src/app/shop/shop.component.html
<mat-slider
  aria-label="Dumpling order quantity slider"
  id="quantity" name="quantity" color="primary" class="quantity-slider"
  [max]="13" [min]="1" [step]="1" [tickInterval]="1"
  thumbLabel
  [(ngModel)]="quantity">
</mat-slider>
```

[⬆ back to top](#top)

## Add the power of @angular/cdk/a11y

- [a11y](https://material.angular.io/cdk/a11y/overview) module provides a number of tools to improve accessibility and is specifically useful for componen
  
```js
// src/app/app.module.ts
import { A11yModule } from '@angular/cdk/a11y';
@NgModule({
  declarations: [...],
  imports: [
    A11yModule
  ],
  providers: [...],
  bootstrap: [...]
})
```

### Control focus with FocusTrap

- `cdkFocusTrap` can be used to trap and control focus order in custom components
- Using `mat-dialog-content` is enough to resolve most issues by trapping focus in a dialog. 
- Add the attribute `cdkFocusInitial` to define the initial focus region on the dumpling wrapper color `<mat-selection-list>` within the color picker dialog

```html
<!-- src/app/shop/color-picker/color-picker-dialog/color-picker-dialog.component.html -->
<mat-selection-list #colors aria-label="Dumpling wrapper color" multiple="false" cdkFocusInitial>
  <!--...-->
</mat-selection-list>
```

### Announce changes with LiveAnnouncer - Changes, errors, and notifications are not announced

- Add an `announcement` when a color is selected
- Add an `announcement` when a fake purchase is made

```js
//src/app/shop/color-picker/color-picker-dialog/color-picker-dialog.component.ts
import { LiveAnnouncer } from '@angular/cdk/a11y';
@Component(...)
export class ColorPickerDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ColorPickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ColorDialogData,
    private liveAnnouncer: LiveAnnouncer) { }
  public changeColor(color: string): void {
    this.liveAnnouncer.announce(`Select color: ${color}`);
    this.dialogRef.close();
  }
}
//src/app/shop/shop.component.ts
import { LiveAnnouncer } from '@angular/cdk/a11y';
@Component(...)
export class ShopComponent implements OnInit {
  constructor(private liveAnnouncer: LiveAnnouncer) { }
  fauxPurchase(): void {
    let flavor = '...';
    const fakePurchase = `Purchase ${this.quantity} ${flavor}dumplings in the color ${this.color}!`;
    this.liveAnnouncer.announce(fakePurchase);
  }
}
```

[⬆ back to top](#top)

## Enable HighContrast mode

- Add support for high contrast mode
  - In 'styles.scss', use the 'cdk-high-contrast' mixin provided in `@angular/cdk/a11y` to add an outline to buttons in High Contrast mode

```css
@use @angular/cdk';
.purchase-button {
    border-radius: 5px;
    background-color: mat.get-color-from-palette(mat.$pink-palette, A100);
    @include cdk-high-contrast {
      outline: solid 1px;
      background-color: mat.get-color-from-palette(mat.$pink-palette, 50);
    }
}
:host-context(.dark-theme) {
  .purchase-button {
    background-color: mat.get-color-from-palette(mat.$light-green-palette, A100);
    @include cdk-high-contrast {
      outline: solid 1px;
      background-color: mat.get-color-from-palette(mat.$light-green-palette, 50);
    }
  }
}
```

[⬆ back to top](#top)

> references
- [Angular Material a11y](https://material.angular.io/cdk/a11y/overview)
  - https://github.com/googlecodelabs/angular-accessibility
- [Accessibility Fundamentals](https://developers.google.com/web/fundamentals/accessibility)
- https://web.dev/accessible/
- [Build more accessible Angular apps](https://codelabs.developers.google.com/angular-a11y#0)
