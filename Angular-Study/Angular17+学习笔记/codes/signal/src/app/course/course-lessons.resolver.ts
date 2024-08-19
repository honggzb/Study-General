import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Lesson } from "../models/lesson.model";
import { LessonsService } from "../services/lessons.service";

export const courseLessonsResolver: ResolveFn<Lesson[]> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  const courseId = route.paramMap.get('courseId');
  if(!courseId) return [];
  const lessonService = inject(LessonsService);
  return lessonService.loadLessons({courseId});
}