import  classs from './../models/class.model.js';

export const createClass = async (req , res)=>{
    try {
        const {name , section} = req.body;
        if (!name || !section) {
            return  res.status(401).json({
            succses:false,
            message:"All fields are required",
           
        })
        }

        const exitsClass = await classs.findOne({name , section});
        if (exitsClass) {
            return res.status(401).json({
                succses:false,
                message:"this class is already exits"
            });
        }
        const newClass = await classs.create({name , section});
        res.status(201).json({
            succses:true,
            message:"class is create succsesFully",
            newClass
        })
    } catch (error) {
        res.status(500).json({
            succses:false,
            message:"error in create class api",
            error:error.message
        })
    }
}


 export const getClass = async (req , res)=>{
    try {
        const getFullClass = await classs.find();
        res.status(200).json({
            succses:true,
            message:"this is all classes ",
            getFullClass
        })
    } catch (error) {
        res.status(500).json({
            succses:false,
            message:"get class api problem",
            error:error.message
        })
    }
}