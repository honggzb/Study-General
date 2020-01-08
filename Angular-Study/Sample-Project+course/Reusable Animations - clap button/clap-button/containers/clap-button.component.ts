import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { merge, Observable } from 'rxjs';
import { debounceTime, mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-clap-button',
  template: `
  <app-counter-bubble
    *ngIf="showBubble$ | async"
    [counter]="userCounter" >
  </app-counter-bubble>

  <app-total-counter
    *ngIf="!(showBubble$ | async)"
    [counter]="totalCounter">
  </app-total-counter>

  <app-fab
    (click)="userCounterChange.emit()"
    [counter]="userCounter">
  </app-fab>
  `,
  styles: [
    `
      :host {
        position: relative;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClapButtonComponent implements OnInit {
  @Input()
  totalCounter: number;

  @Input()
  userCounter: number;

  @Output()
  userCounterChange = new EventEmitter<void>();

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
