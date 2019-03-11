import { IEvent } from './shared/event.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styles: [`
    .card { min-height: 210px; cursor: pointer;}
    .green{ color: green; }
    .bold{ font-weight: bolder; }
  `]
})
export class EventCardComponent{

  @Input() event: IEvent;
  someProperty: any = 'some value';

  logFoo(){
    console.log('foo');
  }

  getStartTimeClass():any{
    // const isEarlyStart = this.event && this.event.time === '8:00 am';
    // return { green:isEarlyStart, bold:isEarlyStart }
    if(this.event && this.event.time === '8:00 am'){
      return ['green', 'bold'];
    }
    return [];
  }

}
