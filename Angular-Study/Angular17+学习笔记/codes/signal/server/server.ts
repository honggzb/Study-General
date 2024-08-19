import * as express from 'express';
import {Application} from "express";
import {getAllCourses, createCourse, getCourseById, saveCourse, deleteCourse} from "./courses.route";
import { loginUser } from './login.route';
import { searchLessons, saveLesson } from './lessons.route';

const bodyParser = require('body-parser');
const cors = require('cors');

const app: Application = express();

app.use(bodyParser.json());
app.use(cors({origin: true}));

app.route('/api/courses').get(getAllCourses);
app.route('/api/courses').post(createCourse);
app.route('/api/courses/:id').get(getCourseById);
app.route('/api/courses/:id').put(saveCourse);
app.route('/api/courses/:id').delete(deleteCourse);

app.route('/api/login').post(loginUser);

app.route('/api/search-lessons').get(searchLessons);
app.route('/api/lessons/:id').put(saveLesson);

const httpServer = app.listen(9000, () => {
  console.log("HTTP REST API Server running at http://localhost:" + httpServer.address()["port"]);
});
