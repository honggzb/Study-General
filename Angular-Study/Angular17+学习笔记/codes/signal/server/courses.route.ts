import {Request, Response} from 'express';
import {COURSES} from "./db-data";
import {setTimeout} from 'timers';

export function getAllCourses(req: Request, res: Response) {
  /*
      console.log("ERROR loading courses!");
      res.status(500).json({message: 'error occurred.'});
      return;
  */
 console.log(`Called GET /api/courses`);
  setTimeout(() => {
    console.log(`Returning GET /api/courses`);
    res.status(200).json({courses:Object.values(COURSES)});
  }, 1000);

}

export function getCourseById(req: Request, res: Response) {
  setTimeout(() => {
    const courseId = req.params["id"];
    const courses:any = Object.values(COURSES);
    const course = courses.find(course => course.id == courseId);
    res.status(200).json(course);
  })
}

export var coursesKeyCounter = 100;

export function createCourse(req: Request, res: Response) {
  console.log("Creating new course ...");
  const changes = req.body;
  const newCourse = {
    id: coursesKeyCounter,
    seqNo: coursesKeyCounter,
    ...changes
  };
  COURSES[newCourse.id] = newCourse;
  coursesKeyCounter += 1;
  setTimeout(() => {
    res.status(200).json(newCourse);
  }, 1500);
}

export function saveCourse(req: Request, res: Response) {
  /*
    console.log("ERROR saving course!");
    res.sendStatus(500);
    return;
  */
  const id = req.params["id"],
  changes = req.body;
  console.log("Saving course changes", id, JSON.stringify(changes));
  const newCourse = {
    ...COURSES[id],
    ...changes
  };
  COURSES[id] = newCourse;
  console.log("new course version", newCourse);
  setTimeout(() => {
    res.status(200).json(COURSES[id]);
  }, 1500);
}

export function deleteCourse(req: Request, res: Response) {
  console.log("Deleting course ...");
  const id = req.params["id"];
  const course = COURSES[id];
  delete COURSES[id];
  setTimeout(() => {
    res.status(200).json({id});
  }, 1500);
}