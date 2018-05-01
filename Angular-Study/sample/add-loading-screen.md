## loading screens between route changes

Angular is a single-page frame work. The page doesn’t refresh between different routes and we need to take into account the slow connections and late responses from API’s.

[Types of router events](https://angular.io/api/router/Event):

| Types of router events|Explanation|
| :------------- | :------------- |
|NavigationStart| When the user starts the route change process|
|NavigationEnd|When the user reached the destination route|
|NavigationCancel|If the user cancels the navigation|
|NavigationError|If the navigation fails due to some reason|

```javascript
import { Component } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
@Component({
  selector: 'app-root',
  template: `
    <div class="my-overlay" *ngIf="showOverlay">
      <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
    </div>`,
  style: `
    .my-overlay {
        left: 0 !important;
        top: 0 !important;
        z-index: 10000 !important;
        width: 100% !important;
        height: 100% !important;
        position: fixed !important;
        background-color: rgba(0,0,0,0.9) !important;
        cursor: pointer !important;
        visibility: visible !important;
        transition: visibility 0s, opacity 0.4s linear !important;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: wait !important;
    }
    .my-overlay i.fa.fa-spinner.fa-spin, .spinner-big {
        font-size: 100px !important;
    }`
})
export class AppComponent   {

  public showOverlay = true;    //variable 
  constructor(private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }
  // Shows and hides the loading spinner during RouterEvent changes
  // navigationInterceptor method which takes in the router event as an argument.
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
    }
    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showOverlay = false;
    }
    if (event instanceof NavigationError) {
      this.showOverlay = false;
    }
  }
}
```

> [Angular — Adding load screens](https://medium.com/@sub.metu/angular-loading-screens-66a24894b99)
