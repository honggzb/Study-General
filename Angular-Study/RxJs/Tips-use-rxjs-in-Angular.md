[Tips-use-rxjs-in-Angular](#top)

- [Components Input](#components-input)
- [Reset Button Click](#reset-button-click)
- [Http Requests](#http-requests)

## Components Input

```javascript
@Input() public amount: number;
public amount$ = new Subject();
public ngOnChanges(changes: SimpleChanges): void {
  if (changes.amount && changes.amount.currentValue !== undefined) {
    this.amount$.next(changes.amount.currentValue);
  }
```

[back to top](#top)

## Reset Button Click

create a new `onReset$` Subject which you can then weave into your counter-stream setupcreate a new `onReset$` Subject which you can then weave into your counter-stream setup

```html
<button (click)="onReset$.next()">Reset</button>
```

## Http Requests

- Async Pipe: `<li *ngFor="let bookmark of bookmarks$|async">{{bookmark}}</li>`
- handle response

```javascript
public bookmarks$ = this.currentUser$.pipe(
  switchMap(user => this.bookmarksService.getBookmarks(user.id)),
);
```

- handle Expensive Data

```javascript
public bookmarks$ = this.currentUser$.pipe(
  switchMap(user => this.bookmarksService.getBookmarks(user.id)),
  publishReplay(1),
  refCount(),
);
```

- remember to unsubscribing - for memory leaks

```javascript
private unsubscribe$ = new Subject();
public ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
//or
this.bookmarks$
  .pipe(takeUntil(this.unsubscribe$))
  .subscribe(bookmarks => {
    // do something
  });
```

[back to top](#top)

> [How to RxJS in Angular](https://www.matthiasmeier.io/blog/how-to-rxjs-in-angular/)
