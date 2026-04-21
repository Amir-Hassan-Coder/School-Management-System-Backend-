import express from "express"
import { createClass, getClass } from "../controller/class.controller.js";
import { authorizeRoles, protect } from "../middlewares/auth.middleware.js";

const classRouter = express.Router();
classRouter.post('/create' , protect , authorizeRoles('admin') , createClass);
classRouter.get('/all' , protect , authorizeRoles('admin' , "student") , getClass);
export default classRouter