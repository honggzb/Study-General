import { IEvent, ISession } from './../shared/event.model';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styles: [`
    .container { padding-left: 20px; padding-right: 20px;}
    .event-image{ height: 100px;}
    a { cursor: pointer; color: red;}
    .active { color: red; }
  `]
})
export class EventDetailsComponent implements OnInit {

  event:IEvent;
  addMode:boolean;
  filterBy: string = 'all';
  sortBy: string = 'votes';

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    // routing to different page in the same component problem
    //snapshot is not observable, it will not navigation in search function
    //this.event = this.eventService.getEventById(+this.route.snapshot.params['id']);
    // this.route.params.forEach((params: Params) => {
    //     this.event = this.route.snapshot.data['event'];
    //     this.addMode = false;
    // });
    this.route.data.forEach((data) => {
      this.event = data['event'];
      this.addMode = false;
    })

  }

  addSession(){
    this.addMode = true;
  }

  saveNewSession(session:ISession){
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = nextId+1;
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event);
    this.addMode = false;
  }

  cancelAddSession(){
    this.addMode = false;
  }
}
