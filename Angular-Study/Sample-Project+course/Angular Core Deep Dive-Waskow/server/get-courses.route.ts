import { Request, Response } from 'express';
import { COURSES } from '../src/db-data';

export function getAllCourses(req: Request, res: Response) {
    res.status(200).json(Object.values(COURSES));
}