## General usage

- used Date pipe with offset:  `date_expression | date[:format[:timezone[:locale]]]`
- [Code](https://github.com/angular/angular/blob/5.0.4/packages/common/src/pipes/date_pipe.ts#L137)
- [Docs](https://angular.io/api/common/DatePipe)

```javascript
//In component
this.offset = new Date().getTimezoneOffset();
//In HTML file
<div>{{deviceInfo?.updatedAt | date: 'dd/MM/yyyy hh:mm:ss' : 'UTC'+offset}}</div>
```

## Custom date pipe

```javascript
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localizedDate',
})
export class LocalizedDatePipe implements PipeTransform {
  transform(value: any, locale: any, zone: any): any {
    var datePipe = new DatePipe(locale);

    var newDate = new Date(value);
    value = newDate.toUTCString(); // GMT

    if (locale == 'en-US' || locale == 'es-US') {
      value = datePipe.transform(value, 'MMM d, y', 'UTC');
    } else {
      value = datePipe.transform(value, 'd MMM y', 'UTC');
    }
    return value.replace('.', '').replace('.', '');
  }
}
```

```html
<div *ngIf="{ locale: locale$ | async } as vm">
  <div class="card-publish-date">
    {{ item.publishedDate | localizedDate: vm.locale?.code:'UTC' | titlecase }}
  </div>
</div>
```

