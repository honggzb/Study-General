### Global setup

```javascript
// global.spec.ts
afterEach(() => {
  // From https://github.com/angular/angular/issues/31834 to increase unit test performance
  window.document.querySelectorAll('style').forEach((style: HTMLStyleElement) => style.remove(https://pmdevhf3.w360.cginet/pmcore/#/dashboard));
});
```

### component

```javascript
 beforeEach(() => {
    fixture = TestBed.createComponent(CgiRepcodeBodyBranchesComponent);
    component = fixture.componentInstance;
    component.dataSource = mockDataSourceBranches.data;
    fixture.detectChanges();
  });
```

```javascript
import { configureTestSuite } from 'ng-bullet';
configureTestSuite(() => {    //
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        // ...
      ],
      providers: [
        TranslateService,
        CGIFilterService,
        // ...
      ],
      declarations: [
        CgiTaxHarvestExecutedComponent,
        // ...
      ],
    }) .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [
          CGICheckboxGroupComponent,
          // ...
        ] } });
  });
```

- https://github.com/angular/angular/issues/31834
