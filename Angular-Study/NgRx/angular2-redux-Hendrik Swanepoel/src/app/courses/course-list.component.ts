import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core'
//import { CourseService } from './course.service';
//import { FilterService } from '../blocks/filter-text/filter-text.service';
import { Course } from './course';
//import { FilterTextComponent } from '../blocks/filter-text';
import { filterCourses, IAppState } from '../store';
import { select, NgRedux } from 'ng2-redux';
import { CourseActions } from './course.actions';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  //courses: Course[];
  //filteredCourses = this.courses;
  //filteredCourses = [];
  @select('filteredCourses') filteredCourses$: Observable<Course>;

  // constructor(private _courseService: CourseService, private _filterService: FilterService) {
  // }
  // constructor(private _courseService: CourseService) {
  // }
  //inject action like service
  constructor(private NgRedux : NgRedux<IAppState>, private courseActions: CourseActions) {

  }

  filterChanged(searchText: string) {
    console.log('user searched: ', searchText);
    //this.filteredCourses = this._filterService.filter(searchText, ['id', 'name', 'topic'], this.courses);
    //store.dispatch(filterCourses(searchText));
    this.courseActions.filterCourses(searchText);
  }

  // getCourses() {
  //   this._courseService.getCourses()
  //     .subscribe(courses => {
  //       this.courses = this.filteredCourses = courses;
  //     });
  // }

  // updateFromState(){
  //   const allState = store.getState();
  //   //this.courses = allState.courses;
  //   this.filteredCourses = allState.filteredCourses;
  //   //console.log(this.filteredCourses);
  // }

  ngOnInit() {
    //this.getCourses();
    // this.updateFromState();
    // store.subscribe(() => {
    //   this.updateFromState();
    // })
    this.courseActions.getCourses();
    componentHandler.upgradeDom();
  }
}
