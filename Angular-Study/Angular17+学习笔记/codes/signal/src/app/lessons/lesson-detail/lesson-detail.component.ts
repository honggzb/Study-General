import {Component, inject, input, output} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import { Lesson } from '../../models/lesson.model';
import { MessagesService } from '../../messages/messages.service';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.scss'
})
export class LessonDetailComponent {

  lesson = input.required<Lesson | null>();
  lessonUpdated = output<Lesson>();
  cancel = output();

  messagesService = inject(MessagesService);
  lessonsService = inject(LessonsService);

  OnCancel() {
    this.cancel.emit();
  }

  async onSave(description: string){
    try {
      const lesson = this.lesson();
      const updatedlesson = await this.lessonsService.saveLesson(lesson!.id, {description});
      this.lessonUpdated.emit(updatedlesson);
    } catch (error) {
      console.error(error);
      this.messagesService.showMessage(`Error saving lesson!`, 'error');
    }
  }

}
