import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { DurationPipe } from './events/shared/duration.pipe';
import { SessionListComponent } from './events/event-details/session-list.component';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { EventRouteActivator } from './events/event-details/event-route-activator.service';
import { EventService } from './events/shared/event.service';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { EventCardComponent } from './events/event-card.component';
import { EventsListResolver } from './events/events-list-resolver.service';
import { EventsListComponent } from './events/events-list.component';
import { CreateEventComponent } from './events/create-event.component';
import { TOASTR_TOKEN, Toastr} from './common/toastr.service';
import { JQ_TOKEN } from './common/jQuery.service';
import { CollapsibleCardComponent } from './common/collapsible-card.component';

import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/nav-bar.component';
import { Errors404Component } from './errors/error404.component';
// import { TOASTR_TOKEN as TOASTR_TOKEN2} from './common/toastr2.service';
import { AuthService } from './user/auth.service';
import { SimpleModalComponent } from './common/simple-modal.component';
import { ModalTriggerDirective } from './common/modal-trigger.directive';
import { UpvoteComponent } from './events/event-details/upvote.component';
import { VoteService } from './events/event-details/vote.service';
import { LocationValidator } from './events/shared/location-validator.directive';
import { EventResolver } from './events/event-resolvers.service';

//declare let toastr:Toastr;
let toastr:Toastr = window['toastr'];
let jQuery = window['$'];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventCardComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Errors404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleCardComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidator
  ],
  providers: [
    EventService,
    { provide: JQ_TOKEN, useValue: jQuery },
    { provide: TOASTR_TOKEN, useValue: toastr },
    // { provide: MinimalLogger, useExisting: Logger },
    // { provide: Logger, useFactory: Logger },
    AuthService,
    EventRouteActivator,
    EventsListResolver,
    EventResolver,
    VoteService,
    { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateEventComponent) {
  if (component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?')
  return true
}
