[Angular Material学习笔记之datepicker自定义日期格式](#top)

- [Mathod 1](#mathod-1)
  - [HTML Template](#html-template)
  - [Helper function(Adapater)](#helper-functionadapater)
  - [used in component](#used-in-component)
- [Method 2](#method-2)
  - [Technologies Used](#technologies-used)
  - [Create Custom Date Format](#create-custom-date-format)
  - [Configure `MAT_DATE_FORMATS` to use Custom Date Format](#configure-mat_date_formats-to-use-custom-date-format)
  - [moment.js](#momentjs)

## Mathod 1

### HTML Template

```html
<mat-form-field>
  <input matInput placeholder=”Select Date” [matDatepicker]=”datepickerRef” name=”datepicker” ngModel #dateCtrl=”ngModel” required readonly/>
  <mat-datepicker-toggle [for]=”datepickerRef” matSuffix></mat-datepicker-toggle>
  <mat-datepicker #datepickerRef></mat-datepicker>
  <mat-error *ngIf=”dateCtrl.errors?.required && deptCtrl.touched”>Choose a Date</mat-error>
</mat-form-field>
```

### Helper function(Adapater)

```javascript
import { NativeDateAdapter } from '@angular/material';
import { MatDateFormats } from '@angular/material/core';
export class AppDateAdapter extends NativeDateAdapter {
  // constructor(
  //   private formatter: FormatterService,
  //   @Optional() @Inject(MAT_DATE_LOCALE) matDateLocale: string,
  //   @Optional() @Inject(PLATFORM_ID) platformId) {
  //   super(matDateLocale, platformId);
  // }
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      let day: string = date.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = date.getFullYear();
      return `${day}-${month}-${year}`;   // format
    }
    return date.toDateString();
  }
}
export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric'
    },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};
```

![angular-material-datepicker-format](https://github.com/honggzb/Study-General/blob/master/Angular-Study/Angular-material/angular-material-datepicker-format-1.jpg)

### used in component

- Provide this implementation inside the providers tag of Component Decorator by overriding the default

```javascript
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/format-datepicker';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
```

[back to top](#top)

## Method 2

### Technologies Used

1. Angular 10.0.0
2. Angular Material 10.0.0
3. moment.js 2.27.0

### Create Custom Date Format

```javascript
export const MY_DATE_FORMATS = {
    // 1) parse: the date format in which a user enters date manually in input box. Using this date format Datepicker parses the input date and then displays it in its display date input format
    parse: {
      dateInput: 'DD-MM-YYYY',
    },
    // 2)
    display: {
      // 2.1) Datepicker displays the date in input box. Either date can be selected from calendar or date can be entered manually. Finally Datepicker will display date in display date input format.
      dateInput: 'MMM DD, YYYY',
      // 2.2) the date format in which calendar displays the month-year label
      monthYearLabel: 'MMMM YYYY',
      // 2.3) related to Accessibility (a11y).
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
    },
};
```

### Configure `MAT_DATE_FORMATS` to use Custom Date Format

1. Angular Material uses DateAdapter to create a Datepicker such as `NativeDateAdapter`, `MomentDateAdapter` or custom `DateAdapter`.
2. The `DateAdapter` can be provided by `MatNativeDateModule`, `MatMomentDateModule`, or a custom `implementation`.
3. The `MatNativeDateModule` provides `NativeDateAdapter` and `MatMomentDateModule` provides `MomentDateAdapter`.
4. The `MatNativeDateModule` and `MatMomentDateModule` use default parse and display formats.
5. The `NativeDateModule` and `MomentDateModule` without Mat -prefix, does not contain default parse and display formats. So for custom date formats we should import `NativeDateModule` or `MomentDateModule`.
6. The `NativeDateModule` uses native JavaScript date and `MomentDateModule` uses Moment from moment.js.
7. To provide custom date format we need to configure `MAT_DATE_FORMATS` either with `NativeDateModule` or `MomentDateModule`


```javascript
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_DATE_FORMATS } from './my-date-formats';

@NgModule({
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MomentDateModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  //------
})
export class AppModule { }
```

### moment.js

- The `moment.js` is the wrapper on native JavaScript Date. The `moment.js` can be used to parse and display dates using `MomentDateModule` or `MatMomentDateModule`

```javascript
YYYY ( 2019)
YY (19)
MM (11)
MMM (Jun)
MMMM (June)
DD (25)
L (14/08/2019)
LL (August 14 2019)
moment("10-20-1990", "MM-DD-YYYY")
moment("2019-10-20 6:30 +0000", "YYYY-MM-DD HH:mm Z")
// [year, month, day, hour, minute, second, millisecond]
oment([2019, 5, 14, 15, 25, 50, 525])
```

> Reference
- [Angular Material: DatePicker-Set Custom Date in (DD-MM-YYYY) format](https://amandeepkochhar.medium.com/angular-material-datepicker-set-custom-date-in-dd-mm-yyyy-format-5c0f4340e57)
- [Angular Material Datepicker Format](https://www.concretepage.com/angular-material/angular-material-datepicker-format)
- [Customizing the parse and display formats](https://v9.material.angular.io/components/datepicker/overview#customizing-the-parse-and-display-formats)
