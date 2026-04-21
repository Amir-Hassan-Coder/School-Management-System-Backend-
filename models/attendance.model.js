import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true,
    },

    classId:{
          type:mongoose.Schema.Types.ObjectId,
        ref:"class",
        required:true,
    },

    date:{
        type: Date,
        required:true
    },

    status:{
        type:String,
        enum:["present" , "absent"],
        required:true
    }
} , {timestamps: true});

const Attendence = mongoose.model("Attendence" , attendenceSchema);

export default Attendence;