import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

export const pageTransition =
  trigger('transition', [
    state('in', style({ transform: 'translateY(0)', opacity: '0'})),
    transition('void => *', [
      style({transform: 'translateY(-15px', opacity: '1'}),
      animate(300)
    ])
  ]);
