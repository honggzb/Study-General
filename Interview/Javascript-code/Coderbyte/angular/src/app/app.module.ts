import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormChallengeComponent } from './coderbyte/reactive-form-challenge/reactive-form-challenge.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PhoneBookComponent } from './coderbyte/phone-book/phone-book.component';
import { GenerateUsernameComponent } from './coderbyte/generate-username/generate-username.component';
import { UIcomponentComponent } from './coderbyte/tic-tac-toe/uicomponent/uicomponent.component';
import {GameBoardComponent} from './coderbyte/tic-tac-toe/game-board/game-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhoneBookReviewComponent } from './coderbyte/phone-book-review/phone-book-review.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormChallengeComponent,
    PhoneBookComponent,
    GenerateUsernameComponent,
    UIcomponentComponent,
    GameBoardComponent,
    PhoneBookReviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
