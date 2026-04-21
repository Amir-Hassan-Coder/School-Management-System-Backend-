import express from "express"
import { getAttendence, getAttendenceByDate, marksAttendence } from "../controller/attendence.controller.js";

import { authorizeRoles, protect } from './../middlewares/auth.middleware.js';

const attendenceRouter = express.Router();

attendenceRouter.post('/mark' , protect , authorizeRoles("admin") , marksAttendence);
attendenceRouter.get('/get/:studentId' ,  protect , authorizeRoles("student" , "admin") , getAttendence);

attendenceRouter.get('/date' ,  protect , authorizeRoles("student" , "admin") , getAttendenceByDate);

export default attendenceRouter