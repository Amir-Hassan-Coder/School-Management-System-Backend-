import mongoose from "mongoose";
const feesSchema = new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },

    classId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"class",
         required:true
    },

    amount:{
        type:Number,
        required:true,
    },

     month:{
        type:String,
        required:true,
    },

     status:{
        type:String,

        enum:["unpaid" , "paid"]
    },

    paidAt:{
        type: Date
    }
} , {timestamps:true});

const feesModel = new mongoose.model("Fess" , feesSchema);

export default feesModel;


