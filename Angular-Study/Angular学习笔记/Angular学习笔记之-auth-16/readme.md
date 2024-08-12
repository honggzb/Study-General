## Angular 15+ Auth

## Apply global

```ts
//  src/app/app.config.ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    [provideHttpClient(withInterceptors([authInterceptor])),]
  ]
};
```

## Apply on one route

```ts
//  src/app/app.routes.ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  {
    path: 'login',
    component: LoginComponent,
    providers: [provideHttpClient(withInterceptors([authInterceptor])),]
  }
];
```

-------------------------------------------------------------------
- [Angular Authentication and Authorization - The Correct Way](https://www.youtube.com/watch?v=R8a8ituFkls)
- [realworld Endpoints mockup](https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints)

---------------------------------------------------------------------------

```
- avvvv
- avvvv@gm.com
- avvvv
```
