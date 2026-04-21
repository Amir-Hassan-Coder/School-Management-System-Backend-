import express from "express"
import { createStudent, deleteStudent, getAllStudent, getSingleStudent, updateStudent } from "../controller/student.controller.js";
import { protect , authorizeRoles } from "../middlewares/auth.middleware.js";
const studentRouter = express.Router();
studentRouter.post("/create" , protect, authorizeRoles("admin") , createStudent);

studentRouter.get("/all" , protect, authorizeRoles("admin") , getAllStudent);

// studentRouter.get("/:id" , protect, authorizeRoles("student , admin") , getSingleStudent);
studentRouter.get("/:id", protect, authorizeRoles("student", "admin"), getSingleStudent);
studentRouter.delete("/delete/:id", protect, authorizeRoles("student", "admin"),deleteStudent);
studentRouter.put("/update/:id", protect, authorizeRoles("admin"), updateStudent);
export default studentRouter