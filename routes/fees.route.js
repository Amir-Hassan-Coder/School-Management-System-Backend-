import express from "express"
import { createFess, getAllFess, getFeesByStudent, payFess } from "../controller/fees.controller.js";
import { authorizeRoles, protect } from './../middlewares/auth.middleware.js';

const fessRouter = express.Router();
fessRouter.post("/create" , protect , authorizeRoles("admin") , createFess)
fessRouter.get("/:studentId" , protect , authorizeRoles("admin" , "student") , getFeesByStudent);
fessRouter.get('/' , protect , authorizeRoles("admin") , getAllFess);
fessRouter.put('/pay/:id' , protect , authorizeRoles("admin") , payFess)
export default fessRouter