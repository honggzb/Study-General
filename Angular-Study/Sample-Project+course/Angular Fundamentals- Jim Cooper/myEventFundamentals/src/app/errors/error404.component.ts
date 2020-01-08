import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-errors',
  template: `
    <h1 class="errorMessage">
      404'd
    </h1>
  `,
  styles: [`
    .errorMessage{
      margin-top: 150px;
      font-size: 170px;
      text-aligh: center;
    }
  `]
})
export class Errors404Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
