
import { Course } from '../courses/course';

export interface IAppState {
  //two states
  courses: Course[],
  filteredCourses: Course[]
}
