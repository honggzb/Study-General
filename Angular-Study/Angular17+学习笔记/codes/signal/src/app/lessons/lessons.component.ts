import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Lesson } from '../models/lesson.model';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { LessonsService } from '../services/lessons.service';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [LessonDetailComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss'
})
export class LessonsComponent {

  mode = signal<'master' | 'detail'>('master');
  lessons = signal<Lesson[]>([]);
  selectedLesson = signal<Lesson | null>(null);
  searchInput = viewChild.required<ElementRef>('search');  // signal viewChild

  lessonsService = inject(LessonsService);

  async onSearch() {
    const query = this.searchInput()?.nativeElement.value;
    console.log('search query', query);
    const results = await this.lessonsService.loadLessons({query});
    this.lessons.set(results);
  }

  onLessonSelected(lesson: Lesson) {
    this.mode.set("detail");
    this.selectedLesson.set(lesson);
  }

  onCancel() {
    this.mode.set("master");
  }

  onLessonUpdated(lesson: Lesson) {
    this.lessons.update(lessons => lessons.map(l => l.id === lesson.id ? lesson : l));
  }

}
