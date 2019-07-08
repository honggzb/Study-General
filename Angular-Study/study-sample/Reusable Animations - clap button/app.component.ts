import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
  <app-clap-button 
    [totalCounter]="totalCounter" 
    [userCounter]="userCounter" 
    (userCounterChange)="userCounter = userCounter + 1"
    >
  </app-clap-button>
  `,
  styles: [
    `:host {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }`
  ]
})
export class AppComponent {
  userCounter = 0;

  get totalCounter() {
    return this.userCounter + 0;
  }
}