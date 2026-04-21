import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("database connected succsesfully ✔️ ✔️ ✔️");
        
    } catch (error) {
        console.log("Database connected succsesfully");
    }
}

export default connectDB;