import Student from "../models/student.model.js";
import bcrypt from 'bcrypt';
import User from './../models/user.model.js';
import classs from "../models/class.model.js";

export const createStudent = async (req , res)=>{
    try {
        const {name , email , password , classId , rollNumber , parentName} = req.body;

       if (!name || !email || !password || !classId || !rollNumber || !parentName) {
            // 👉 validation

            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });
        // 👉 check duplicate email

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hasedPass = await bcrypt.hash(password , 10);

        const user = await User.create({
            name , email , password:hasedPass , role: "student"
        });

        const student = await Student.create({
            userId: user._id,
            classId,
            rollNumber,
            parentName
        });

        res.status(201).json({
            succses:true,
            message:"Student Created SuccsesFully",
            student
        })


    } catch (error) {
        res.status(500).json({
            succses:false,
            message:"Create Student Api Problem"
        });
    }
}

export const getAllStudent = async (req , res)=>{
    try {
        const student = await Student.find().populate("userId" , "name email role").populate("classId" , "name section");

        res.status(200).json({
            succses:true,
            message:"All Student data is there ", 
            student
        })
    } catch (error) {
         res.status(500).json({
            succses:false,
            message:"Get All Student Api Problem",
            error:error.message
        });
    }
}


export const getSingleStudent = async (req , res)=>{
    console.log("API HIT");
    console.log("Requested ID:", req.params.id);
    try {
        const {id} = req.params;


        const student = await Student.findById(id).populate("userId" , "name email role").populate("classId" , "name section");
console.log("Student from DB:", student);
        if (!student) {
            return res.status(403).json({
                succses:false,
                message:"student is not found",

            });
        }
  console.log("Logged user:", req.user._id);
        console.log("Requested student user:", student.userId._id);
        if (req.user.role === "student") {
            if (student.userId._id.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    succses:false,
                    message:"only admin and correct student accses it"
                });
            }
        }

        res.status(200).json({
            succses:false,
            message:"student fetched",
            student
        });

    } catch (error) {
        res.status(500).json({
            succses:false,
            message:"get single student api problem"
        })
    }
}



export const updateStudent = async (req , res)=>{
  try {
    const {id} = req.params;
    const student = await Student.findById(id);
    if (!student) {
        return res.status(402).json({
            succses:false,
            message:"student is not found"
        })
    }

    if (req.user.role === 'student') {
      if (student.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            succses:false,
            message:"Access denied"
        })
      }
    }

    const {rollNumber , parentName , classId} = req.body;
    if (rollNumber) student.rollNumber = rollNumber;
    if (parentName) student.parentName = parentName;
    if(classId) student.classId = classId;

    await student.save();

    res.status(200).json({
        succses:false,
        message:"student updated succses fully",
        student
    });
        
    
  } catch (error) {
    res.status(500).json({
      succses:false,
      message:"student update api problem ",

    })
  }
}


export const deleteStudent = async (req , res)=>{
    try {
        const {id} = req.params;
        const deleteStu = await Student.findById(id);
        if (!deleteStu) {
            return res.status(401).json({
                succses:false,
                message:"student is not found"
            });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({
                succses:false,
                message:"only admin can delete this student"
            })
        }
       await  deleteStu.deleteOne();
       res.status(200).json({
        succses:false,
        message:"student deleted succsesFully",
        deleteStu
       })
    } catch (error) {
        res.status(500).json({
            succses:false,
            message:"student delete api problem",
        })
    }
}