import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Lesson } from '../models/lesson.model';
import { GetLessonsResponse } from '../models/get-lessons.response';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  env = environment;
  http = inject(HttpClient);

  async loadLessons(config: {
    courseId?: string,
    query?:string
  }): Promise<Lesson[]> {
    const {courseId, query} = config;
    let params = new HttpParams();
    if(courseId) {
      params = params.set("courseId", courseId);
    }
    if(query) {
      params = params.set("query", query);
    }
    const lessons$ = this.http.get<GetLessonsResponse>(`${this.env.apiRoot}/search-lessons`, { params })
    const response = await firstValueFrom(lessons$);
    return response.lessons;
  }

  async saveLesson(lessonId: string, changes: Partial<Lesson>): Promise<Lesson> {
    const saveLesson$ = this.http.put<Lesson>(`${this.env.apiRoot}/lessons/${lessonId}`, changes);
    return firstValueFrom(saveLesson$);
  }

}


