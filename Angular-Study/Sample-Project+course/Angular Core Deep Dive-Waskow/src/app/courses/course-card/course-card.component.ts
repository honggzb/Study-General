import { Component, Input, Output, OnInit, EventEmitter, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Course} from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
  providers: [ CoursesService ]
})
export class CourseCardComponent implements OnInit {

  @Input() course: Course;
  @Input() cardIndex: number;
  @Input() noImageTpl: TemplateRef<any>;

  @Output() courseSelected = new EventEmitter<Course>();
  @Output() courseChange = new EventEmitter<Course>();

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    console.log('Course card coursesService ' + this.coursesService.id);
  }

  onCourseViewed(course: Course): void {
    this.courseSelected.emit(this.course);
  }

  cardClasses(){
    return {
      'beginner':  this.course.category === 'BEGINNER',
      'course-card': true
    };
  }

  onCourseSave(description: string) {
    this.courseChange.emit({...this.course, description});
    console.log(description);
  }

}
