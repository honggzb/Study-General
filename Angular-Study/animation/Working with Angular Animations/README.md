[Angular学习笔记之Animation- Working with Angular Animations- Gary Simon](#top)

- [Configuration and structure](#configuration-and-structure)
  - [Enabling the animations module](#enabling-the-animations-module)
  - [Angular Animation structure](#angular-animation-structure)
- [States and Transitions](#states-and-transitions)
  - [State function, style function, transition function, animation function](#state-function-style-function-transition-function-animation-function)
  - [wildcard and void states](#wildcard-and-void-states)
- [Animating Timing](#animating-timing)
- [Multi-step Animation](#multi-step-animation)
- [Animation Callbacks](#animation-callbacks)
- [Special Sample of animation](#special-sample-of-animation)
  - [Boolean values in transitions](#boolean-values-in-transitions)
  - [Animating entering and leaving a view](#animating-entering-and-leaving-a-view)
  - [increment and decrement in transitions](#increment-and-decrement-in-transitions)
  - [Animatable properties and units with wildcards](#animatable-properties-and-units-with-wildcards)
- [Multiple animation triggers](#multiple-animation-triggers)
- [Complex animation sequences](#complex-animation-sequences)
  - [Filter animation example](#filter-animation-example)
- [Reusable animations](#reusable-animations)
- [Route transition animations](#route-transition-animations)

## Configuration and structure

### Enabling the animations module

- `@angular/animations`
- `@angular/platform-browser`

```javascript
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  declarations: [ ],
  bootstrap: [ ]
})
```

### Angular Animation structure

![](https://i.imgur.com/MC0cG1O.png)

```javascript
//1) Importing animation functions into component files
import { trigger, state, style, animate, transition } from '@angular/animations';
//2) Adding the animation metadata property, including state and animation
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({})),
      state('closed', style({})),
      transition('open => closed', animate('100m2 ease-out))
    ]),
    trigger('name2', [ ... ])
  ]
})
export class AppComponent {
  state: string = 'open';
}
//3) attaching trigger in template
<div [@triggerName]='state'></div>
<div [@openClose]="isOpen ? 'open' : 'closed'" class="open-close-container">
  <p>The box is now {{ isOpen ? 'Open' : 'Closed' }}!</p>
</div>
```

- [Animations API summary](https://angular.io/guide/animations#animations-api-summary)

[back to top](#top)

## States and Transitions

- Animate is a simple transition that changes a single HTML element from one state to another

### State function, style function, transition function, animation function

```javascript
@Component({
  selector: 'app-root',
  template: `<button [@myTrigger]='state' (click)="toggleState()">My Button</button>`,
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('myTrigger', [
      state('small', style({ transform: 'scale(1)' })),
      state('large',style({ transform: 'scale(1.4)' })),
      // transition('small => large', animate('500ms')),
      // transition('large => small', animate('500ms')),
     // transition('small => large, large => small', animate('500ms'))
     transition('small <=> large', animate('500ms'))
    ])
  ]
})
export class AppComponent {
  state: string = 'large';
  toggleState() {
    this.state = (this.state === 'small') ? 'large' : 'small';
  }
}
```

### wildcard and void states

- `*` applies to **any** animation state, include `void`
- `void` applies to any animation that's not currently attached to a view
  - can use the void state to configure transitions for an element that is entering or leaving a page
- Combining wildcard and void states
  - `* => void` applies when the element leaves a view, regardless of what state it was in before it left
  - `void => *` applies when the element enters a view, regardless of what state it assumes when entering

```javascript
transition('* => small', animate('500ms'))
transition('* => *', animate('500ms'))
//sample of void
@Component({
  selector: 'app-root',
  template: `<button (click)="toggleState()">My Button</button>
             <ul>
               <li *ngFor="let item of items" [@myTrigger]='state'>{{ item }}</li>
             </ul>`,
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('myTrigger', [
      state('fadeIn', style({
        opacity: '1'
      })),
     transition('void => *', [
       style({ opacity: '0', transform: 'translateY(20px)'})
       animate('500ms')
     ])
    ])
  ]
})
export class AppComponent {
  state: string = 'fadeIn';
  items = ['item1', 'item2'];
  toggleState() {
    this.items.push("another item");
    this.state = 'fadeIn';
  }
}
```

[back to top](#top)

## Animating Timing

```
duration  delay    easing
  0.5s    100ms  ease-in-out
```

- duration
  - controls ow long an animation lasts
- delay
  - controls when an animation starts
  - delay comes first, animation comes second
- easing:
  - controls acceleration of animation
  - controls deceleration of animation

```javascript
transition('void => *', [
       style({ opacity: '0', transform: 'translateY(20px)'}),
       //animate('1000ms 0s ease-out'),  //fast in, slow out
       animate('1000ms 0.5s ease-in')  //slow in, fast out
     ])
```

[back to top](#top)

## Multi-step Animation

```javascript
state('fadeIn', style({
        opacity: '1',
        transform: 'scale(1.2)'
      })),
transition('void => *', [
       animate(1000, keyframes([
         style({ opacity: 0, transform: 'translateY(-30px)', offset: 0}),
         style({ opacity: 1, transform: 'translateY(5px) scale(1.2)', offset: .3}),
         style({ opacity: .3, transform: 'translateY(0px) scale(1.2)', offset: 1})
       ]))
     ])
    ])
```

[back to top](#top)

## Animation Callbacks

- Animation TransitionEvent: animation `trigger()` function emits callbacks when it starts and when it finishes
- Event Binding on template:  `<div (@trigger.start)="someMethodStart($event)" [@trigger]="state"> </div>`
  - the animation event is passed back via $event, as `@triggerName.start` and `@triggerName.done`
  - ![](https://i.imgur.com/Pj2ZaTd.png)

```javascript
@Component({
  selector: 'app-root',
  template: `<button (click)="toggleState()" [@removeMe]='btnState'>My Button</button>
            <ul>
              <li *ngFor="let item of items"
                  [@myTrigger]='state'
                  (@myTrigger.start)="animStart($event)"
                  (@myTrigger.done)="animDone($event)">{{ item }}</li>
            </ul>
            {{ animDetails }}`,
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('myTrigger', [
      state('fadeIn', style({
        opacity: '1',
        transform: 'scale(1.2)'
      })),
     transition('void => *', [
       animate(1000, keyframes([
         style({ opacity: 0, transform: 'translateY(-30px)', offset: 0}),
         style({ opacity: 1, transform: 'translateY(5px) scale(1.2)', offset: .3}),
         style({ opacity: .3, transform: 'translateY(0px) scale(1.2)', offset: 1})
       ]))
     ])
    ]),
    trigger('removeMe', [
      state('out', style({
        transform: 'scale(0)',
        opacity: 0
      })),
      state('in', style({
        opacity: 1
      })),
      transition('* => out', [
        animate('500ms 0s ease-in', keyframes([
          style({ opacity: 1, transform: 'translateX(-8px), offset: 0'}),
          style({ opacity: 1, transform: 'translateX(0px), offset: 0.3'}),
          style({ opacity: 0, transform: 'translateX(50px), offset: 1'}),
        ]))
      ])
    ])
  ]
})
export class AppComponent {
  state: string = 'fadeIn';
  items = new Array();
  animDetails: string = 'waiting...';
  //some angular version need to trigger by manully
  constructor(private cdRef: ChangeDetectorRef){}
  toggleState() {
    this.items.push("another item");
    this.state = 'fadeIn';
  }
  //start state callback
  animStart(event: any) {
     console.log(event);
  }
  //state done callback
  animDone(event: any) {
    this.animDetails = 'It took me ' + event.totalTime + 'ms to complete';
    this.cdRef.detectChanges();   //some angular version need to trigger by manully
    console.log('Animation finished');
 }
}
```

[back to top](#top)

## Special Sample of animation

### Boolean values in transitions

`<div [@openClose]="isOpen ? true : false" class="open-close-container"></div>`

### Animating entering and leaving a view

```javascript
animations: [
  trigger('flyInOut', [
    state('in', style({ transform: 'translateX(0)' })),
    //:enter is alias for void => *
    transition(':enter', [
      style({ transform: 'translateX(-100%)' }),
      animate(100)
    ]),
    //:leave is alias for * => void
    transition(':leave', [
      animate(100, style({ transform: 'translateX(100%)' }))
    ])
  ])
]
```

### increment and decrement in transitions

- The `transition()` function takes additional selector values, `:increment` and `:decrement`
- uses `query()` and `stagger()` methods
- adapt to the transition when a numeric value has increased or decreased in value
- note: doesn't need to use `state()`

```javascript
trigger('filterAnimation', [
  transition(':enter, * => 0, * => -1', []),
  //increment
  transition(':increment', [
    query(':enter', [
      style({ opacity: 0, width: '0px' }),
      stagger(50, [
        animate('300ms ease-out', style({ opacity: 1, width: '*' })),
      ]),
    ], { optional: true })
  ]),
  //decrement
  transition(':decrement', [
    query(':leave', [
      stagger(50, [
        animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
      ]),
    ])
  ]),
]),
```

### Animatable properties and units with wildcards

- Sometimes you don't know the value of a dimensional style property until runtime. you can use a special wildcard * property value under style(), so that the value of that particular style property is computed at runtime and then plugged into the animation

```javascript
animations: [
  trigger('shrinkOut', [
    state('in', style({ height: '*' })),
    transition('* => void', [
      style({ height: '*' }),
      animate(250, style({ height: 0 }))
    ])
  ])
]
```

[back to top](#top)

## Multiple animation triggers

- Parent-child animations
  - Each time an animation is triggered in Angular, the parent animation always get priority and child animations are blocked. 
  - In order for a child animation to run, the parent animation can use the `query()` function to collect inner elements and then allow the animations to run using the `animateChild()` function
-  `@.disabled` : Disabling an animation on an HTML element
   -  Disabling animations application-wide is useful during end-to-end (E2E) testing

```html
<div [@.disabled]="isDisabled">
  <div [@childAnimation]="isOpen ? 'open' : 'closed'" class="open-close-container">
    <p>The box is now {{ isOpen ? 'Open' : 'Closed' }}!</p>
  </div>
</div>
<script>
@Component({
  animations: [
    trigger('childAnimation', [
      // ...
    ]),
  ],
})
export class OpenCloseChildComponent {
  isDisabled = false;
  isOpen = false;
}
</script>
```

- Disabling all animations:  place the `@.disabled` host binding on the topmost Angular component

```javascript
export class AppComponent {
  @HostBinding('@.disabled')
  public animationsDisabled = false;
}
```

[back to top](#top)

## Complex animation sequences

- `query()` finds one or more inner HTML elements
- `stagger()` applies a cascading delay to animations for multiple elements
- `group()` runs multiple animation steps in parallel
- `sequence()` runs animation steps one after another

```javascript
animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.hero, form', [
          style({opacity: 0, transform: 'translateY(-100px)'}),
          stagger(-30, [   //delay each animation by 30 milliseconds
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
  ]
})
export class HeroListPageComponent implements OnInit {
  @HostBinding('@pageAnimations')
  public animatePage = true;
  _heroes = [];
  heroTotal = -1;
  get heroes() { return this._heroes; }
  ngOnInit() { this._heroes = HEROES; }
}
```

### Filter animation example

```javascript
@Component({
  animations: [
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
            //During the animation, the element assumes its default width
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ])
      ]),
    ]),
  ]
})
export class HeroListPageComponent implements OnInit {
  heroTotal = -1;
}
```

[back to top](#top)

## Reusable animations

```javascript
//shared/animations.ts
import { animation, trigger, animateChild, group, transition, animate, style, query } from '@angular/animations';
export const transAnimation = animation([
  style({
    height: '{{ height }}',
    opacity: '{{ opacity }}',
    backgroundColor: '{{ backgroundColor }}'
  }),
  animate('{{ time }}')
]);
//using it in components
import { transAnimation } from './animations';
@Component({
    trigger('openClose', [
      transition('open => closed', [
        useAnimation(transAnimation, { params: { height: 0, opacity: 1, backgroundColor: 'red', time: '1s' }
        })
      ])
    ])
  ],
})
```

[back to top](#top)

## Route transition animations

1. Route configuration - using data property of each route defines the key animation-specific configuration associated with a route

```javascript
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: '/enter-leave' },
      { path: 'heroes', component: HeroListPageComponent, data: {animation: 'FilterPage'} },
      { path: 'home', component: HomeComponent, data: {animation: 'HomePage'} },
      { path: 'about', component: AboutComponent, data: {animation: 'AboutPage'} },
    ])
  ],
```

2. Router outlet

```html
<div [@routeAnimations]="prepareRoute(outlet)" >
  <router-outlet #outlet="outlet"></router-outlet>
</div>
<script>
//app/app.component.ts
/*prepareRoute() method 
  1) detect when a view changes, assigns an animation state value to the animation trigger (@routeAnimation) based on the route configuration data property value
  2) takes the value of the output directive (established through #outlet="outlet")
  3) return the state of animation based on the custom data of the current active route
*/
prepareRoute(outlet: RouterOutlet) {
  return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
}
</script>
```

3. Animation definition

```javascript
//app/animations.ts - defining as reusable animation
export const slideInAnimation =
  trigger('routeAnimations', [
    transition('HomePage <=> AboutPage', [
      style({ position: 'relative' }),

      query(':enter, :leave', [ 
        style({ position: 'absolute', top: 0, left: 0, width: '100%' })]), 
        style({ left: '-100%'})  
      ]),
      //Querying the view containers, returns the view that is being removed
      query(':leave', animateChild()),  
      group([
        query(':leave', [ animate('300ms ease-out', style({ left: '100%'})) ]),
        query(':enter', [ animate('300ms ease-out', style({ left: '0%'})) ])
      ]),
      //Querying the view containers, returns the view that is being inserted
      query(':enter', animateChild()),
    ]),
    transition('* <=> FilterPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [ style({ position: 'absolute', top: 0, left: 0, width: '100%' }) ]),
      //1) matches the view that is added and hides the newly added view by positioning it to the far left
      query(':enter', [ style({ left: '-100%'}) ]),
      //2) Querying the view containers, returns the view that is being removed
      query(':leave', animateChild()),
      //3) group() function to make the inner animations run in parallel
      group([
        // 3.1) Queries the view that is removed and animates it to slide far to the right
        query(':leave', [ animate('200ms ease-out', style({ left: '100%'})) ]),
        // 3.2) Slides in the new view and animates it sliding from the left to right
        query(':enter', [ animate('300ms ease-out', style({ left: '0%'})) ])
      ]),
      //4) new view to run its child animations after the main animation completes
      query(':enter', animateChild()),
    ])
  ]);
//import to app.component.ts
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [ slideInAnimation ]
})
```

4. Styling the host and child components
5. Querying the view containers

[back to top](#top)

> Reference
- https://angular.io/guide/animations
- http://www.garysimon.com
- [summary of available animation functions](https://angular.io/guide/animations#animation-api-summary)