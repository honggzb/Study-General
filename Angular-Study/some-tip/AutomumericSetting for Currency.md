## ngAutonumeric vs Autonumeric.js

### Standalone component with  '€' as currency:

```html
<ng-autonumeric options="French" [(ngModel)]="myModel" (format)="onFormat($event)" (change)="onChange($event)" placeholder=''></ng-autonumeric>
<br/>
```

###  directive:

```javascript
<input [ngAutonumeric]="{
              digitGroupSeparator: ' ',
              decimalCharacter: ',',
              decimalCharacterAlternative: '.',
              currencySymbol: '\u00a0€',
              currencySymbolPlacement: 's',
              roundingMethod: 'U',
              minimumValue: '0'
      }" 
  [(ngModel)]="myModel" (format)="onFormat($event)"(change)="onChange($event)" placeholder=''/>
```
