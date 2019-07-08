## Principle of creating an reusable animations

```javascript
// Create an animation by calling the animation() function
const myAnimation = animation('{{ timings }}', []);
// Consume the animation by calling the useAnimation() function
trigger('myTrigger',
  transition('* => *',
    useAnimation(myAnimation, { params: { timings: 200 } })
  )
);
```

## Use in Project

```
├── clap-button/
|    ├── components/
|    |    ├── counter-bubble.component.ts
|    |    ├── fab.component.ts
|    |    └── total-counter.component.ts
|    ├── containers/
|    |    └── clap-button.component.ts
|    ├── clap-button.module.ts
|    └── animations.ts
├── app.component.ts
└── app.module.ts
```

- [Live Demo](https://stackblitz.com/github/zetsnotdead/ng-clap-button)
- [GitHub](https://github.com/zetsnotdead/ng-clap-button)

### create the Pulse/slide Animation

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

### create The FAB(Floating Action Button in angular material) Component

- https://material.io/design/components/buttons-floating-action-button.html
- State Change
  - `:increment` — the binding is incremented
  - `:decrement` — the binding is decremented
  - `:leave` — the element is removed from the DOM
  - `:enter` — the element enters the DOM

```javascript
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

### Bubble component

```javascript
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
```