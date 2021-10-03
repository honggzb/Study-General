## mock observable streams

- A mock observable in Angular tests can be created by `MockProvider`, `MockInstance` or `ngMocks.defaultMock`

```javascript
// TodoService.list$(), that returns a type of Observable<Array<Todo>>
class TodoComponent implements OnInit {
  public list: Observable<Array<Todo>>;
  constructor(protected service: TodoService) {}
  ngOnInit(): void {
    this.service.list$().subscribe(list => (this.list = list));
  }
}
//1) The solution
// need to get the method to return an observable stream. For that, 
// we could extend the mock object via passing overrides as the second parameter into MockProvider
TestBed.configureTestingModule({
  declarations: [TodoComponent],
  providers: [
    MockProvider(TodoService, {
      list$: () => EMPTY,
    }),
  ],
});
// 2)Permanent fix
// - if we want to do it for all tests globally, we might use ngMocks.defaultMock
// - then, every time tests need a mock object of TodoService, its list$() will return EMPTY.
ngMocks.defaultMock(TodoService, () => ({
  list$: () => EMPTY,
}));
// 3) Customizing observable streams by using
beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [TodoComponent],
    providers: [MockProvider(TodoService)],
  });
});
it('test', () => {
  const fakeList$ = new Subject(); // <- create the subject.
  const list$ = jasmine.createSpy().and.returnValue(fakeList$);
  MockInstance(TodoService, () => ({ list$, }));
  const fixture = TestBed.createComponent(TodoComponent);
  fixture.detectChanges();
  expect(list$).toHaveBeenCalledTimes(1);
  fakeList$.next([]);
});
// 3.2) Customizing observable streams by using MockBuilder
let todoServiceList$: Subject<any>; // <- a context variable.
beforeEach(() => {
  todoServiceList$ = new Subject(); // <- create the subject.
  return MockBuilder(TodoComponent).mock(TodoService, {
    list$: () => todoServiceList$,
  });
});
it('test', () => {
  const fixture = MockRender(TodoComponent);
  todoServiceList$.next([]);
  // some assertions.
});
```

> [How to mock observable streams in Angular tests](https://ng-mocks.sudo.eu/extra/mock-observables)
