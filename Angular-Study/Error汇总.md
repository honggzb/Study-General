[Error 汇总](#top)

- [Angular 2+](#angular)
  - [1. Can't bind to 'ngModel' since it isn't a known property of 'input'](#input)
- [Angular MATERIAL](#angularM)
  - [1. Type 'ElementRef' is not generic](#ElementRef)

<h2 id="angular">Angular 2+</h2>

<h3 id="input">1. Can't bind to 'ngModel' since it isn't a known property of 'input'</h3>

`import { FormsModule } from '@angular/forms';`

[back to top](#top)

<h2 id="angularM">Angular MATERIAL</h2>

<h2 id="ElementRef">2. Type 'ElementRef' is not generic</h2>

- **Reason**: the version of angular and angular material did not match
- **Solution**: change package.json, and delete node_modules directorty, and `npm install`

```
"dependencies": {
   "@angular/core": "^5.2.0",
   "@angular/cdk": "^5.2.0",
   "@angular/material": "^5.2.0"    
 },
```

[back to top](#top)
