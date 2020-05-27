import { Component, Output, ViewChild, ViewChildren, QueryList, AfterViewInit, TemplateRef, ElementRef, OnInit, InjectionToken, Inject, Injector, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {Observable} from 'rxjs';
import {createCustomElement} from '@angular/elements';

import {Course} from './courses/model/course';
import { CourseCardComponent } from './courses/course-card/course-card.component';
import { CourseTitleComponent } from './course-title/course-title.component';
import { HighlightedDirective } from './directives/highlighted.directive';
import { CoursesService } from './courses/services/courses.service';;
import { CONFIG_TOKEN, APP_CONFIG, AppConfig } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit, OnInit {

  title = 'Angular core deep dive';

  courses$: Observable<Course[]>;
  courses;
  coursesTotal;

  @ViewChildren(CourseCardComponent)
  cards: QueryList<CourseCardComponent>;

  @ViewChild(HighlightedDirective,{ read: ElementRef})
  highlighted: HighlightedDirective;

  startDate = new Date(2020, 0, 1);

  constructor(private coursesService: CoursesService,
              @Inject(CONFIG_TOKEN) private config: AppConfig,
              private cd: ChangeDetectorRef,
              private injector: Injector){
    console.log(config);
  }

  onCourseSelected(course: Course): void {
    console.log(course);
  }

  onCoursesEdited() {
    this.courses.push({
      id: 8,
        description: 'Complete Typescript Course',
        longDescription: "Complete Guide to Typescript From Scratch: Learn the language in-depth and use it to build a Node REST API.",
        iconUrl: 'https://angular-academy.s3.amazonaws.com/thumbnails/typescript-2-small.png',
        category: 'BEGINNER'
    })
    this.courses[0].category = 'ADVANCE';
  }

  ngOnInit() {
    console.log('root component ' + this.coursesService.id);
    this.coursesService.loadCourses().subscribe(courses => {
      this.courses = courses;
      this.coursesTotal = this.courses.length;
    });
    //this.courses$ = this.coursesService.loadCourses();

    const htmlElement = createCustomElement(CourseTitleComponent, {injector: this.injector});
    customElements.define('course-title', htmlElement);
  }

  ngAfterViewInit() {
    //console.log(this.cards);
    // this.cards.changes是一个observable
    this.cards.changes.subscribe(
      cards => console.log(cards)
    )
    console.log(this.highlighted);
  }

  onToggle(isHighlighted: boolean){
    console.log("app", isHighlighted);
  }

  save(course: Course) {
    this.coursesService.saveCourse(course)
                       .subscribe(() => console.log('course saved'));
  }

}
