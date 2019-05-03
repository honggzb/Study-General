- create a rxjsOperations.ts
- add `import './app/rxjsOpertions';` in 'main.ts'
  - note: must before `import { AppModule } from "./app/app.module";`

```javascript
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay, tap, catch, do, finally, map, pluck, toPromise, mergeMap } from 'rxjs/operators';
//or
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
```
