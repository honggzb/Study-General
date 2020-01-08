import { EventService } from './../events/shared/event.service';
import { ISession } from './../events/shared/event.model';
import { AuthService } from './../user/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: [`
    #searchForm { margin-right: 60px};
    li > a.active { color: #F97924;}
  `]
})
export class NavBarComponent implements OnInit {

  searchtTerm: string = '';
  foundSessions: ISession[];

  constructor(public auth:AuthService, private eventService: EventService) {}

  ngOnInit() {}

  searchSessions(searchtTerm){
    this.eventService.searchSessions(searchtTerm).subscribe(
      (sessions) => {
        this.foundSessions = sessions;
        console.log(this.foundSessions);
      });
  }

}
