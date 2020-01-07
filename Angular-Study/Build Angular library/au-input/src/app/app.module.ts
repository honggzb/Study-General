import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { AuInputModule } from './lib/au-input.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AuInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
