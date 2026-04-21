import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , "name is required"],
        unique:true
    },

    
} , {timestamps:true});

const subject = mongoose.model("Subject" , subjectSchema);
export default subject