import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventDetailsComponent } from './events/event-details/event-details.component';
import { EventsListComponent } from './events/events-list.component';
import { CreateEventComponent } from './events/create-event.component';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import {Errors404Component} from './errors/error404.component';
import { EventRouteActivator } from './events/event-details/event-route-activator.service';
import {EventsListResolver} from './events/events-list-resolver.service';
import { EventResolver } from './events/event-resolvers.service';

const routes: Routes = [
  { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
  { path: 'events', component: EventsListComponent, resolve: {events: EventsListResolver} },
  { path: 'events/:id', component: EventDetailsComponent, resolve: {event: EventResolver}  },
  // { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator]  },
  { path: 'event/session/new', component: CreateSessionComponent },
  { path: '404', component: Errors404Component },
  { path: '', pathMatch: 'full', redirectTo: '/events' },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
