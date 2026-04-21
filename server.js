import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import { authorizeRoles, protect } from "./middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import classRouter from "./routes/class.route.js";
import subjectRouter from "./routes/subject.route.js";
import studentRouter from "./routes/student.route.js";
import attendenceRouter from "./routes/attendence.route.js";
import fessRouter from "./routes/fees.route.js";
import dashboardRouter from "./routes/dashBoard.route.js";

const server = express();
dotenv.config();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

// routes
server.use("/api/auth", authRouter);
server.use("/api/class", classRouter);
server.use("/api/subject", subjectRouter);
server.use('/api/student' , studentRouter);
server.use('/api/attendence' , attendenceRouter)
server.use('/api/fees' , fessRouter);
server.use('/api/dashboard' , dashboardRouter);
// test Routes
server.get('/' , protect , (req , res)=>{
    res.status(200).json({
        message:"tesing moode",
        user :req.user
    })
})

server.get('/admin' , protect , authorizeRoles('admin') , (req , res)=>{
    res.status(200).json({
        message:" Admin route tesing moode",
        user :req.user
    })
})


const port = process.env.PORT;
server.listen(port, () => {
  connectDB();
  console.log("Our server is running on this port ", port);
});
