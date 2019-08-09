export const FILTER_COURSES = 'courses/FILTER';

export function filterCourses(searchText: string) {
  return {
    type: FILTER_COURSES,
    searchText,
  };
}
