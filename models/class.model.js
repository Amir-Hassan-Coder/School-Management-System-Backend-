import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , "name is required"]
    },

    section:{
        type:String,
        required:[true , "section  is required"]
    }

   

    
} , {timestamps:true});

const classs = mongoose.model("class" , classSchema);
export default classs