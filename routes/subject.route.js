import express from "express";
import { createSubject } from "../controller/subject.controller.js";
import { authorizeRoles, protect } from "../middlewares/auth.middleware.js";

const subjectRouter = express.Router();
subjectRouter.post('/create', protect , authorizeRoles('admin') , createSubject);

export default subjectRouter; // Default export