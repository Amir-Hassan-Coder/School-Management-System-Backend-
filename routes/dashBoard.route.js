import express from "express"
import { authorizeRoles, protect } from "../middlewares/auth.middleware.js";
import { getDashboad } from "../controller/dashboard.controller.js";

const dashboardRouter = express.Router();

dashboardRouter.get('/' , protect , authorizeRoles("admin") , getDashboad);

export default dashboardRouter