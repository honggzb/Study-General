
import { CourseService } from './course.service';
import { IAppState } from '../store/IAppState';
import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';

export const FILTER_COURSES = 'courses/FILTER';
export const REQUEST_COURSES_SUCCESS = 'courses/REQUEST_COURSES_SUCCESS'

//should be injectable
@Injectable()
export class CourseActions {

  constructor(private ngRedux: NgRedux<IAppState>, private courseService: CourseService){ }

  getCourses(){
    this.courseService.getCourses()
        .subscribe(courses => {
          this.ngRedux.dispatch({         //dispatch action
            type: REQUEST_COURSES_SUCCESS,
            courses,
          })
        })
  }

  filterCourses (searchText: string){
    this.ngRedux.dispatch({
      type: FILTER_COURSES,
      searchText
    });
    return {
      type: FILTER_COURSES,
      searchText,
    };
  }

}
