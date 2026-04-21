import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },

     classId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"class",
        required:true
    },

    rollNumber:{
        type:Number,
        
        required:true

    },

     parentName:{
        type:String,
        required:true

    },
} , {timestamps:true});

const Student = mongoose.model("Student" , studentSchema);
export default Student;