[share and shareReplay避免多次调用](#top)

- [Share](#share)
- [shareReplay](#sharereplay)
- [Demo1](#demo1)
- [Demo2- Angular Http share Replay](#demo2--angular-http-share-replay)


### Share

- will multicast values emitted by a source Observable for subscribers
- can be used to share a source Observable among multiple subscribers without caching its values

```javascript
import { interval, tap, map, take, share } from 'rxjs';
const source$ = interval(1000).pipe(
  tap((x) => console.log('Processing: ', x)),
  map(() => Math.round(Math.random() * 100)),
  take(2),
  share()  // if you remove share, you will see that each subscription will have its own execution of the source observable
);

source$.subscribe((x) => console.log('subscription 1: ', x));
source$.subscribe((x) => console.log('subscription 2: ', x));

setTimeout(
  () => source$.subscribe((x) => console.log('subscription 3: ', x)),
  1500
);
```

### shareReplay

- not only shares the source Observable, but also caches its values and replays them to each new subscriber
- shareReplay replays the last emissions for late subscribers
  - `shareReplay({ bufferSize: 1, refCount: true })`
- notes: In **Angular**, there are some gotchas when using share and shareReplay.
  - Observables subscribed in the **template** with **the async pipe** might reach refCount 0 if unsubscribed automatically by the async pipe when inside a *ngIf, which would cause a new execution of the source Observable

```javascript
const source = of(1, 2, 3).pipe(
  tap(val => console.log(`Source emitted ${val}`)),
  shareReplay(1)       // set to cache 1 value, so Subscriber 2 will receive the latest value emitted by the source 
);
source.subscribe(val => console.log(`Subscriber 1 received ${val}`));
// We delay second observable
setTimeout(() => {
  source.subscribe(val => console.log(`Subscriber 2 received ${val}`));
}, 1000);
// Results
Source emitted '1'
'Subscriber 1' received '1'
Source emitted '2'
'Subscriber 1' received '2'
Source emitted '3'
'Subscriber 1' received '3'
'Subscriber 2' received '3'

// angular sample
const http$ = CreateHttpObservable('/api/courses');
// Let's map our results
const courses$: Observable<any[]> = http$.pipe(
  tap(() => console.log('HTTP executed')),
  map(res => Object.values(res.payload)),
  shareReplay()
);
// Let map only the beginner courses
this.beginnerCourses$ = courses$.pipe(
  map(
    courses => courses.filter((course: { category: string; }) => course.category === 'BEGINNER'))
);
// Let map only the advance courses
this.advanceCourses$ = courses$.pipe(
  map(
    courses => courses.filter((course: { category: string; }) => course.category === 'ADVANCED'))
);
```

- there is no subscription method, because we are using the async pipe to run the subscription

> [Always Know When to Use Share vs. ShareReplay](https://www.bitovi.com/blog/always-know-when-to-use-share-vs.-sharereplay)

### Demo1

```javascript
// In service:
getData$ = this.http.get(API_ENDPOINT).pipe(shareReplay(1));
//In component, need to unsubscribe and you can subscribe multiple times with single API call:
ngOninit(){
   this.data$ =  this._jokeService.getData$;
   this.data$.subscribe()
}
//In template, use:
*ngIf="data$ | async as data"
```

### Demo2- Angular Http share Replay

```javascript
export class AppComponent implements OnInit  {
  name = 'Angular';
  constructor(private httpClient: HttpClient) {}
  ngOnInit() {
      // will cause additional requests (two in total)
      this.getData().subscribe();
      this.getData().subscribe();
      // will be shared using shareReplay (on in total)
      const data$ = this.getData();
      data$.subscribe();
      data$.subscribe();
      data$.subscribe();
  }
  private getData() {
    return this.httpClient.get('https://www.metaweather.com/api/location/44418/')
      .pipe(
        catchError(() => of('request failed')),
        tap(res => console.log('REQUEST CALLED:', res)),
        shareReplay(1),   
      )
  }
}
```
