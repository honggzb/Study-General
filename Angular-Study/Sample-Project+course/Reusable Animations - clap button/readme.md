- [Principle of creating an reusable animations](#Principle-of-creating-an-reusable-animations)
  - [create animation by calling the useAnimation() function](#create-animation-by-calling-the-useAnimation-function)
  - [consume animation by calling the useAnimation() function](#consume-animation-by-calling-the-useAnimation-function)
- [Use in Project - clap button](#Use-in-Project---clap-button)
  - [Animation - Pulse/slide](#Animation---Pulseslide)
  - [Components](#Components)
    - [structure of components](#structure-of-components)
    - [handle bubble component show/hide - using Observable](#handle-bubble-component-showhide---using-Observable)

## Principle of creating an reusable animations

### create animation by calling the useAnimation() function

`const myAnimation = animation('{{ timings }}', []);`

### consume animation by calling the useAnimation() function

- State Change
  - `:increment` — the binding is incremented
  - `:decrement` — the binding is decremented
  - `:leave` — the element is removed from the DOM
  - `:enter` — the element enters the DOM
- interaction
  - `@HostBinding()`  为指令的宿主元素添加类、样式、属性等
  - `@HostListener()` 监听宿主元素上的事件

```javascript
@Component({
  selector: 'app-counter-bubble',
  template: `+{{counter}}`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('visibilityChange', [
      transition(':enter', [
        useAnimation(slideInAnimation, {
          params: { from: '20%', timings: '200ms ease-in' }
        })
      ]),
      transition(':leave', [
        useAnimation(slideOutAnimation, {
          params: { to: '-200%', timings: '200ms ease-in' }
        })
      ])
    ])
  ]
})
export class CounterBubbleComponent {
  @HostBinding('@visibilityChange')
  animation = true;
}
```

## Use in Project - clap button

```
├── clap-button/
|    ├── components/
|    |    ├── counter-bubble.component.ts
|    |    ├── total-counter.component.ts
|    |    └── fab.component.ts
|    ├── containers/
|    |    └── clap-button.component.ts
|    ├── clap-button.module.ts
|    └── animations.ts
├── app.component.ts
└── app.module.ts
```

- [Live Demo](https://stackblitz.com/github/zetsnotdead/ng-clap-button)
- [GitHub](https://github.com/zetsnotdead/ng-clap-button)

### Animation - Pulse/slide

```javascript
//define
export const pulseAnimation = animation([
  style({ transform: 'scale(1)' }),
  animate(
    '{{ timings }}',
    keyframes([
      style({ transform: 'scale(1)', offset: 0 }),
      style({ transform: 'scale({{ scale }})', offset: 0.5 }),
      style({ transform: 'scale(1)', offset: 1 })
    ])
  )
]);
//define
export const slideInAnimation  = animation([
   style({ transform: 'translateY({{ from }})', opacity: 0 }),
   animate('{{ timings }}', style({ transform: 'translateY(0)', opacity: 1 }))
]);
export const slideOutAnimation = animation([
  animate(
    '{{ timings }}',
    style({ transform: 'translateY({{ to }})', opacity: 0 })
  )
]);
//consume pulseAnimation
useAnimation(
  pulseAnimation,
  { params: { timings: 200, scale: 1.1, } }
)
```

### Components

#### structure of components

```
├── clap-button/
|    ├── components/
|    |    ├── counter-bubble.component.ts
|    |    ├── total-counter.component.ts
|    |    └── fab.component.ts
|    ├── containers/
|    |    └── clap-button.component.ts  -https://material.io/design/components/buttons-floating-action-button.html
```

**use in component**

```javascript
<app-clap-button [totalCounter]="totalCounter" [userCounter]="userCounter" (userCounterChange)="userCounter = userCounter + 1"></app-clap-button>

export class AppComponent {
  userCounter = 0;
  get totalCounter() {
    return this.userCounter + 0;
  }
}
```

- container component

```javascript
//container- FAB(Floating Action Button) - angular material
@Component({
  selector: 'app-clap-button',
  template: `
    <app-counter-bubble *ngIf="showBubble$ | async" [counter]="userCounter" ></app-counter-bubble>
    <app-total-counter *ngIf="!(showBubble$ | async)" [counter]="totalCounter"></app-total-counter>
    <app-fab (click)="userCounterChange.emit()" [counter]="userCounter"></app-fab>`,
  styles: [
    `:host {  position: relative; }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClapButtonComponent implements OnInit {
  @Input() totalCounter: number;
  @Input() userCounter: number;
  @Output() userCounterChange = new EventEmitter<void>();
  showBubble$: Observable<boolean>;
  ngOnInit() {
    const change$ = this.userCounterChange.asObservable();
    const showBubble$ = change$.pipe(mapTo(true));
    const hideBubble$ = change$.pipe(
      debounceTime(400),
      mapTo(false)
    );
    this.showBubble$ = merge(showBubble$, hideBubble$);
  }
}
```

- dumb components

```javascript
//Bubble component
@Component({
  selector: 'app-counter-bubble',
  template: `+{{counter}}`,
  animations: [
    trigger('visibilityChange', [
      transition(':enter', [
        useAnimation(slideInAnimation, {
          params: { from: '20%', timings: '200ms ease-in' }
        })
      ]),
      transition(':leave', [
        useAnimation(slideOutAnimation, {
          params: { to: '-200%', timings: '200ms ease-in' }
        })
      ])
    ])
  ]
})
export class CounterBubbleComponent {
  @HostBinding('@visibilityChange')
  animation = true;
}
//total counter component
@Component({
  selector: 'app-total-counter',
  template: `{{ counter }}`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalCounterComponent {
  @Input() counter: string;
}
//fab component
@Component({
  selector: 'app-clap-fab',
  template: `<i class="material-icons">pan_tool</i>`,
  animations: [
    trigger('counterChange', [
      transition(
        ':increment',
        useAnimation(pulseAnimation, {
          params: {
            timings: '400ms cubic-bezier(.11,.99,.83,.43)',
            scale: 1.05
          }
        })
      )
    ])
  ]
})
export class ClapFabComponent {
  @HostBinding('@counterChange')
  @Input()
  counter: number;
}
```

[back to top](#top)

#### handle bubble component show/hide - using Observable

```javascript
const change$ = this.userCounterChange.asObservable();
const showBubble$ = change$.pipe(mapTo(true));
const hideBubble$ = change$.pipe(
  debounceTime(400),
  mapTo(false)
);
this.showBubble$ = merge(showBubble$, hideBubble$);
```

