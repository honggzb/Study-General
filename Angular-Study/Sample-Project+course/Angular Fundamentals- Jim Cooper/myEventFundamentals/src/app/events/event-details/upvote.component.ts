import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'up-vote',
  template: `
    <div class="votingWidgetContainer pointable" (click)="onClick()">
        <div class="badge badge-light votingCount">
          <i *ngIf="voted" class="fa fa-heart" [style.color]="iconColor"></i>
          // <i *ngIf="voted" class="fa fa-heart"></i>
          // <i *ngIf="!voted" class="fa fa-heart-o"></i>
          <div>{{count}}</div>
    </div>`,
    styles: [`
      .badge {
        min-height: 70px;
      }
      .votingCount {
        font-weight: bold;
        font-size: 14px;
      }
      i{padding-top: 20px;}
    `]
})
export class UpvoteComponent implements OnInit {
  @Input() count: number
  @Input() set voted(val){
    this.iconColor = val ? 'red' : 'white';
  }
  @Output() vote = new EventEmitter()
  iconColor: string

  constructor() { }

  ngOnInit() {}

  onClick() {
    this.vote.emit({});
  }

}
