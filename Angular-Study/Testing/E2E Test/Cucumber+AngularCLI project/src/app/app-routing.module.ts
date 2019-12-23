import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseListComponent } from './courses/courselist.component';
import { CourseDetails } from './courses/course-details/courseDetails.component';
import {CreateCourseComponent} from './courses/create-course.component'

const routes: Routes = [
  { path: 'course/new', component: CreateCourseComponent},
  { path: 'course', component: CourseListComponent },
  { path: 'course/:id', component: CourseDetails },
  { path: '', redirectTo: 'course', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
