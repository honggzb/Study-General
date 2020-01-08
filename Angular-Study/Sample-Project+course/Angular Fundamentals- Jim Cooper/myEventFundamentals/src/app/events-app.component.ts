import { AuthService } from './user/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'events-app',
  template: `
    <app-nav-bar></app-nav-bar>
    <router-outlet></router-outlet>
    `,
  styleUrls: [],
})
export class EventsAppComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    //this.auth.checkAuthenticationStatus().subscribe();
  }

}
