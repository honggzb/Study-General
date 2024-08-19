import { afterNextRender, Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialog} from "@angular/material/dialog";
import {MatTooltipModule, MatTooltip } from '@angular/material/tooltip';
import { Course } from '../models/course.model';
import { CoursesService } from '../services/courses.service';
//import { CoursesFetchService } from '../services/courses-fetch.service';
import { CoursesCardListComponent } from "../courses-card-list/courses-card-list.component";
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTabsModule, MatTooltip, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  coursesService = inject(CoursesService);
  dialog = inject(MatDialog);
  loadingService = inject(LoadingService);
  messagesService = inject(MessagesService);

  #courses = signal<Course[]>([]);
  beginnerCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course => course.category === 'BEGINNER');
  });
  immediateCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course => course.category === 'INTERMEDIATE');
  });
  advancedCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course => course.category === 'ADVANCED');
  });
  // beginnerList = viewChild<CoursesCardListComponent>("beginnerList", {
  //   read: ElementRef
  // });
  beginnerList = viewChild("beginnerList", {
    read: ElementRef    //read: MatTooltip
  });
  immediateList = viewChild<CoursesCardListComponent>("immediateList");
  advancedList = viewChild<CoursesCardListComponent>("advancedList");

  // constructor() {
  //   this.loadCourses().then(() => console.log('All course loaded:', this.courses()));
  // }

  constructor() {
    effect(() => {
      console.log('Beginner courses: ', this.beginnerCourses());
      //console.log('Advanced courses: ', this.advancedCourses())
      console.log('beginnerList', this.beginnerList());
    })
    afterNextRender(() => {
      this.loadCourses();
      this.loadCourses().then(() => console.log('All course loaded:', this.#courses()));
    })
  }

  // ngOnInit(): void {
  //   this.loadCourses().then(() => console.log('All course loaded:', this.courses()));
  // }

  async loadCourses() {
    try {
      this.loadingService.loadingOn();
      const courses = await this.coursesService.loadAllCourses();
      this.#courses?.set(courses);
    } catch (error) {
      // alert(`Error loading courses!`);
      // console.error(error);
      this.messagesService.showMessage(
        'Error loading courses!',
        'error'
      )
    } finally {
      this.loadingService.loadingOff();
    }
  }

  onCourseUpdated(updateCourse: Course) {
    const courses = this.#courses();
    const newCourses = courses.map(course => (
      course.id === updateCourse.id ? updateCourse : course
    ));
    this.#courses.set(newCourses);
  }

  async onCourseDeleted(courseId: string) {
    try {
      await this.coursesService.deleteCourse(courseId);
      const courses = this.#courses();
      const newCourses = courses.filter(course => course.id !== courseId);
      this.#courses.set(newCourses);
    } catch (error) {
      alert(`Error Deleting course!`);
      console.error(error);
    }
  }


  async onAddCourse() {
    const newCourse = await openEditCourseDialog(
      this.dialog,
      {
        mode: "create",
        title: "Create New Course"
      }
    );
    if(!newCourse) return;
    const newCourses = [...this.#courses(), newCourse];
    this.#courses.set(newCourses);
  }

}
