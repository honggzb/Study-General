import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CourseComponent } from './courses/course.component';
import { CourseService } from './courses/course.service';
import { CourseListComponent } from './courses/course-list.component';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryStoryService } from '../api/in-memory-story.service';
import { AppRoutingModule } from './app-routing.module';

import { RouterModule }   from '@angular/router';
import { FilterTextComponent, FilterService } from './blocks/filter-text';
import { ToastComponent, ToastService } from './blocks/toast';
import { SpinnerComponent, SpinnerService } from './blocks/spinner';
import { ModalComponent, ModalService } from './blocks/modal';
import { ExceptionService } from './blocks/exception.service';


@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    CourseListComponent,
    FilterTextComponent,
    ToastComponent,
    SpinnerComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryStoryService, { delay: 500 }),
    AppRoutingModule
  ],
  providers: [
    CourseService,
    FilterService,
    ToastService,
    SpinnerService,
    ModalService,
    ExceptionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
