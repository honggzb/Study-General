## ngZone

- ngZone service creates a zone named angular to automatically trigger change detection when a sync or async function is executed
  - When a sync or async function is executed
  - When there is no microTask scheduled
- A zone is an execution context that persists across async tasks
- `ngZone.run()` - this runs the code outside the angular zone
- two cases
  - if call some logic out of zone: `ngZone.runOutsideAngular(somefunc)`
    - if need angular to do the ChangeDeteach, we need to call by using `ngZone.run()` to make our logic back to angular Zone.
  - some third-party library, if they are executing out of angular zone, and the side effects will be ignored by angular
- ngZone.run() is particularly useful when unit testing your routing.

```ts
it('should redirect if condition true', fakeAsync(() => {
  router.navigate(['']);
  fixture.ngZone.run(() => {
    component.redirectIfConditionTrue();
  });
  tick();
  expect(location.path()).toBe('/AgentLeadsManager');
}));
```

## When apps update HTML

- **Component initialization**
- **Event listener**. The DOM event listener can update the data in an Angular component and also trigger change detection
- **HTTP Data Request**
- MacroTasks, such as `setTimeout()` or `setInterval()`
- MicroTasks, such as `Promise.then()`. Other asynchronous APIs return a Promise object (such as `fetch`), so the `then()` callback function can also update the data
- Other **async** operations: include `WebSocket.onmessage()` and `Canvas.toBlob()`
  - For the full list, see the [Zone Module document](https://github.com/angular/angular/blob/master/packages/zone.js/MODULE.md)

```ts
/* 
 all asynchronous operations in that function, trigger change detection automatically at the correct time
*/ 
export class AppComponent implements OnInit {
  constructor(private ngZone: NgZone) {}
  ngOnInit() {
    // New async API is not handled by Zone, so you need to
    // use ngZone.run() to make the asynchronous operation in the angular zone
    // and trigger change detection automatically.
    this.ngZone.run(() => {
      someNewAsyncAPI(() => {
        // update the data of the component
      });
    });
  }
}
/*  
when you don't want to trigger change detection. In that situation, you can use another NgZone method: runOutsideAngular() 
*/
export class AppComponent implements OnInit {
  constructor(private ngZone: NgZone) {}
  ngOnInit() {
    // You know no data will be updated,
    // so you don't want to trigger change detection in this
    // specified operation. Instead, call ngZone.runOutsideAngular()
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        // update component data
        // but don't trigger change detection.
      });
    });
  }
}
```

> [NgZone-official](https://docs.angular.lat/guide/zone)
