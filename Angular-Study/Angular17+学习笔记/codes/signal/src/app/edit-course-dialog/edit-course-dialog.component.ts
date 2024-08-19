import {Component, effect, inject, signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { EditCourseDialogData } from './edit-course-dialog.data.model';
import {firstValueFrom, single} from "rxjs";
import { CourseCategory } from '../models/course-category.model';
import { Course } from '../models/course.model';
import { CourseCategoryComboboxComponent } from '../course-category-combobox/course-category-combobox.component';

@Component({
  selector: 'app-edit-course-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, CourseCategoryComboboxComponent],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss'
})
export class EditCourseDialogComponent {

  dialogRef = inject(MatDialogRef);
  data: EditCourseDialogData = inject(MAT_DIALOG_DATA);
  fb = inject(FormBuilder);
  courseService = inject(CoursesService);

  category = signal<CourseCategory>('BEGINNER');

  form = this.fb.group({
    title: [''],
    longDescription: [''],
    iconUrl: ['']
  });

  constructor() {
    this.form.patchValue({
      title: this.data?.course?.title,
      longDescription: this.data?.course?.longDescription,
      iconUrl: this.data?.course?.iconUrl,
    });
    this.category.set(this.data?.course?.category ?? 'BEGINNER');
    effect(() => {
      console.log(`Course category bi-directional binding: ${this.category()}`);
    })
  }

  async onSave() {
    const courseProps = this.form.value as Partial<Course>;
    courseProps.category = this.category();
    if(this.data?.mode === 'update') {
      await this.saveCourse(this.data?.course!.id, courseProps);
    } else if (this.data?.mode === "create") {
      await this.createCourse(courseProps);
    }
  }

  async saveCourse(courseId: string, changes: Partial<Course>) {
    try {
      const courseProps = this.form.value as Partial<Course>;
      if(this.data?.mode === 'update') {
        const updateCourse = await this.courseService.saveCourse(courseId, changes);
        this.dialogRef.close(updateCourse);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to save the course.')
    }
  }

  async createCourse(course: Partial<Course>) {
    try {
      const newCourse = await this.courseService.createCourse(course);
      this.dialogRef.close(newCourse);
    } catch (error) {
      console.error(error);
      alert('Error creating the course.')
    }
  }

  onClose() {
    this.dialogRef.close();
  }

}

export async function openEditCourseDialog(
  dialog: MatDialog,
  data: EditCourseDialogData) {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.width  = "400px";
  config.data = data;

  const close$ = dialog.open(
    EditCourseDialogComponent,
    config)
    .afterClosed();

  return firstValueFrom(close$);   // convert observable to Promise, and subscribe immediately
}
