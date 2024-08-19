import { Component, effect, ElementRef, inject, input, output, viewChildren } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import { Course } from '../models/course.model';
import {openEditCourseDialog} from "../edit-course-dialog/edit-course-dialog.component";

@Component({
  selector: 'app-courses-card-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {

  courses = input.required<Course[]>();  //input signal
  courseUpdated = output<Course>();      // output signal, pass new data to parent
  courseDeleted = output<string>();     // output signal, pass new data to parent
  courseCards = viewChildren<ElementRef>('coursesCard');

  constructor() {
    effect(() => {
      console.log("coursesCard", this.courseCards());
    })
  }

  dialog = inject(MatDialog);

  async onEditCourse(course: Course) {        // async
    const newCourse = await openEditCourseDialog(
      this.dialog,
      {
        mode: "update",
        title: "Update Existing Course",
        course
      }
    );
    if(!newCourse) return;
    console.log('Course edited: ', newCourse);
    this.courseUpdated.emit(newCourse);     // pass data to parent
  }

  onCourseDeleted(course: Course) {
    this.courseDeleted.emit(course.id);    // pass data to parent
  }
}
