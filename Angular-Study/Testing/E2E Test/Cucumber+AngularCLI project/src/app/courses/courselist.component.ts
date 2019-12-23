import { Component, OnInit } from '@angular/core';
import { CourseService } from '../shared/service.component';
import { ToastrService } from '../common/toastr.service';

@Component({
    template: `
    <div class="row bg-dark">
    <div class="col-md-12 bg-dark">
      <h3 style="color:white;"> All courses </h3>
      <hr style="border: .5px solid white;">
      <div class="card" style="width: 20rem;float:left;height:350px; background-color: grey;margin: 10px;" *ngFor="let course of courses">
        <course-thumb (click)= "showToastrMessage(course.Name)" #thumbnail [course] = "course"> </course-thumb>
      </div>
    </div>
    </div>
    `
})
export class CourseListComponent implements OnInit {
    //Create local variable on course
    courses:any;

    constructor(private course: CourseService, private toastr: ToastrService) { }

    //ngOnInit is called right after the directive's data-bound properties have been checked for the first time
    //More like Hooks in NUnit [BeforeTest]
    ngOnInit():void {
        this.courses = this.course.getCourses();
    }

    showToastrMessage(message: string) {
        this.toastr.Success(message)
    }
}
