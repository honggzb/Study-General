[Loading Indicator-Angular 17+](#top)

- [loading indicator service](#loading-indicator-service)
- [loading indicator component](#loading-indicator-component)
- [Using the loading indicator](#using-the-loading-indicator)
  - [using globally](#using-globally)
  - [useing with async/await code](#useing-with-asyncawait-code)
  - [Automatically showing the loading indicator when loading data from the backend](#automatically-showing-the-loading-indicator-when-loading-data-from-the-backend)
- [Proving an alternative UI for the loading indicator](#proving-an-alternative-ui-for-the-loading-indicator)

---------------------------------------------------------

- `ng add @angular/material`

## loading indicator service

```ts
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  loadingOn() {
    this.loadingSubject.next(true);
  }
  loadingOff() {
    this.loadingSubject.next(false);
  }
}
```

- using a **BehaviorSubject** to store the current state of the loading indicator
- keeping the subject **private**, to keep control over who can emit values using it
- exposing the subject as an **observable(loading$)** so that any component can subscribe to it and get notified when the loading indicator is turned on or off
- exposing two simple public methods to turn the loading indicator on or off

[⬆ back to top](#top)

## loading indicator component

```ts
@Component({
  selector: 'loading-indicator',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  imports: [MatProgressSpinnerModule, AsyncPipe, NgIf, NgTemplateOutlet],
  standalone: true,
})
export class LoadingIndicatorComponent implements OnInit{
  loading$: Observable<boolean>;
  @Input()
  detectRouteTransitions = false;
  @ContentChild("loading")
  customLoadingIndicator: TemplateRef<any> | null = null;

  constructor(
    private loadingService: LoadingService,
    private router: Router){
      this.loading$ = loadingService.loading$;
    }

  ngOnInit(): void {
    if(this.detectRouteTransitions) {
      this.router.events
      .pipe(
        tap((event) => {
          if(event instanceof RouteConfigLoadStart) {
            this.loadingService.loadingOn();
          } else if(event instanceof RouteConfigLoadEnd) {
            this.loadingService.loadingOff();
          }
        })
      ).subscribe();
    }
  }
}
```

[⬆ back to top](#top)


## Using the loading indicator

### using globally

```html
<ul>
  <li><a routerLink="/contact">Contact</a></li>
  <li><a routerLink="/help">Help</a></li>
  <li><a routerLink="/about">About</a></li>
</ul>
<router-outlet />
<loading-indicator />    <!--it's turned off by default -->
```

### useing with async/await code

```ts
@Component({
  selector: "child-component",
  standalone: true,
  imports: [CommonModule],
  template: ` <button (click)="onLoadCourses()">Load Courses</button> `,
})
export class ChildComponentComponent {
  constructor(private loadingService: LoadingService) {}
  onLoadCourses() {
    try {
      this.loadingService.loadingOn();
      // load courses from backend
    } catch (error) {
      // handle error message
    } finally {
      this.loadingService.loadingOff();
    }
  }
}
```

[⬆ back to top](#top)

### Automatically showing the loading indicator when loading data from the backend

- use an Http Interceptor to automatically turn the loading indicator on and off for every HTTP request
- register loading interceptor
- `SkipLoading`:  -> don't turn on the loading indicator for certain HTTP requests
  - `this.http.get("/api/courses", { context: new HttpContext().set(SkipLoading, true) });`  -> disable the loading indicator for a single HTTP request
- `detectRouteTransitions`:  -> integrating the loading indicator with the router:
  - `<loading-indicator [detectRouteTransitions]="true" />`

```ts
//don't turn on the loading indicator for certain HTTP requests:
export const SkipLoading = new HttpContextToken<boolean>(() => false);
@Injectable()
export class LoadingIndicator implements HttpInterceptor {
    constructor(private loadingService: LoadingService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.context.get(SkipLoading)) {
            return next.handle(req);
        }
        this.loadingService.loadingOn();
        return next.handle(req).pipe(
            finalize(() => {
                this.loadingService.loadingOff();
            })
        )
    }
}
//register loading interceptor
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      RouterModule,
      LoadingService
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
});
// don't turn on the loading indicator for certain HTTP requests:  disable the loading indicator for a single HTTP request
this.http.get("/api/courses", { context: new HttpContext().set(SkipLoading, true) });
```

[⬆ back to top](#top)

## Proving an alternative UI for the loading indicator

```html
<loading-indicator>
  <ng-template #loading>
    <div class="custom-spinner">
      <img src="custom-spinner.gif" />
    </div>
  </ng-template>
</loading-indicator>
```

[⬆ back to top](#top)
