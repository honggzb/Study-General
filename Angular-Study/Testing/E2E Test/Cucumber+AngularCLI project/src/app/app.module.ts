import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CourseListComponent } from './courses/courselist.component';
import { CourseThumbnailComponent } from './courses/courseThumbnail.component';
import { NavigationComponent } from './nav/nav.component';
import { CourseService } from './shared/service.component';
import { ToastrService } from './common/toastr.service';
import { CourseDetails } from './courses/course-details/courseDetails.component';

import { CreateCourseComponent } from './courses/create-course.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    CourseThumbnailComponent,
    NavigationComponent,
    CourseDetails,
    CreateCourseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    CourseService,
    ToastrService,
    { provide: 'canDeactiveCreateEvent', useValue: checkDirtyState }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

function checkDirtyState(){
  return false;
}
