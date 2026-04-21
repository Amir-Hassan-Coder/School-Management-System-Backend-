import Attendence from "../models/attendance.model.js";

export const marksAttendence = async (req , res)=>{
    try {
        const {studentId , classId , status} = req.body;

        if (!studentId || !classId || !status) {
            return res.status(400).json({
                succses:false,
                message:"all fields are required"
            })
        };

        const today = new Date();

        // check to day attendence is already mark or not 
        const existing = await Attendence.findOne({
            studentId,
            date:{
                 $gte: new Date(today.setHours(0, 0, 0, 0)),
                   $lte: new Date(today.setHours(23, 59, 59, 999))
            }
        })

        if (existing) {
            res.status(403).json({
                succses:false,
                message:"this student attendence is already marks for today"
            });
        }

        const attendence = await Attendence.create({
            studentId,
            classId,
            date: new Date(),
            status
        });

        res.status(201).json({
            succses:true,
            message:"attendence marked",
            attendence
        });
    } catch (error) {
        res.status(500).json({
            succses:false,
            message:"marks attendence api priblem"
        })
    }
}


export const getAttendence = async (req , res)=>{
    try {
        const {studentId} = req.params;

        const studentAttendence = await Attendence.find(studentId).populate("studentId").populate("classId");

       
       res.status(200).json({
        succses:true,
        message:"student all attendece ",
        studentAttendence
       })
    } catch (error) {
        res.status(500).json({
            succses:false,
            message:"get attendence api problem"
        })
    }
}

export const getAttendenceByDate = async (req , res)=>{
    try {
        const {date} = req.query;

        const start = new Date();
        const end = new Date();

        start.setHours(0,0,0,0);
        end.setHours(23,59,59,999);

        const records = await Attendence.find({
            date:{ $gte: start, $lte: end}
        }).populate("studentId").populate("classId");

        res.status(200).json({
            succses:true,
            message:"get attendence by date marking system",
            records
        })
    } catch (error) {
        res.status(500).json({
            succses:false,
            message:"get attendence by date api problem "
        });
    }
}