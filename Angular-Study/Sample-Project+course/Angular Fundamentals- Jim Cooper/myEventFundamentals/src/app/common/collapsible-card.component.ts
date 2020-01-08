import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'collapsible-card',
  template: `
    <div class="card bg-light mb-3">
      <div class="card-body">
        <h4 class="card-title cursorPointer" (click)="toggleContent()">
          <ng-content select="[card-title]"></ng-content>
        </h4>
        <ng-content select="[card-body]" *ngIf="visible"></ng-content>
      </div>
    </div>`,
  styles: [`.cursorPointer {cursor: pointer;}`]
})
export class CollapsibleCardComponent implements OnInit {
  //@Input() title:string
  visible:boolean = false;
  constructor() { }
  ngOnInit() {}
  toggleContent(){
    this.visible = !this.visible;
  }
}
