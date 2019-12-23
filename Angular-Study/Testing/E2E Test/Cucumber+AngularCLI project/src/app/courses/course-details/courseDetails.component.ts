import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../shared/service.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'courseDetails.component.html',
    styles: [
        `
            .row {color: white; min-height: 100%;}
            .course-image: {height: 100px; }
        `
    ]
})

export class CourseDetails implements OnInit {
    course: any;
    constructor(private courseService: CourseService, private routes: ActivatedRoute) {}

    ngOnInit(){
        this.course = this.courseService.getSpecificCourse(+this.routes.snapshot.params['id'])
    }
}
