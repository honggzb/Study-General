import { IEvent } from './shared/event.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {EventService} from './shared/event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styles: []
})
export class EventsListComponent implements OnInit{
  events: IEvent[];
  constructor(private eventService: EventService, private route: ActivatedRoute){

  }
  ngOnInit(){
    this.events = this.route.snapshot.data['events'];
    //this.eventService.getEvents().subscribe((events) => { this.events = events });
  }

  // handleCardClick(eventName){
  //   this.toastr.success(eventName);
  // }
}
