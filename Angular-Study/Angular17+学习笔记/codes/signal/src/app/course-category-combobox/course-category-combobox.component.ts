import { Component, contentChild, contentChildren, effect, ElementRef, input, model } from '@angular/core';
import { CourseCategory } from '../models/course-category.model';

@Component({
  selector: 'app-course-category-combobox',
  standalone: true,
  imports: [],
  templateUrl: './course-category-combobox.component.html',
  styleUrl: './course-category-combobox.component.scss'
})
export class CourseCategoryComboboxComponent {
  label = input.required<string>();
  value = model.required<CourseCategory>();

  title = contentChild<ElementRef>('title');
  //title = contentChildren<ElementRef>('title');

  constructor() {
    effect(() => {
      console.log("contentChild title: ", this.title())
    })
  }

  onCategoryChange(category: string) {
    this.value.set(category as CourseCategory);
  }
}
