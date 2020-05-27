import { Pipe, PipeTransform } from '@angular/core';
import { Course } from './model/course';

@Pipe({
  name: 'filterByCategory',
  pure: false
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(courses: Course[], category: string): unknown {  //first param is input of the pipe, second is pipe string
    return courses.filter(course => course.category === category);
  }

}
