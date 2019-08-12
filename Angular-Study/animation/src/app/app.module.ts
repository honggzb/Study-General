import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { ExamplesComponent } from './examples/examples.component';
import { HowtoComponent } from './howto/howto.component';
//import { InMemoryDataService } from './api/in-memory-data.service;
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    ExamplesComponent,
    HowtoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
    routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
