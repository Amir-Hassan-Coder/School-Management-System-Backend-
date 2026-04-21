import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req , res , next)=>{
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(403).json({
                succses:false,
                message:"Not Authirized , No token"
            });
        }

        const decoded = jwt.verify(token , process.env.SE_KEY);
        console.log("decoded varibale mai ye hai " , decoded.id);
        
        const user = await User.findById(decoded.id).select("-password");

        req.user = user;

        next();
    } catch (error) {
          res.status(500).json({
      succses: false,
      message: "Not Authirized",
      error: error.message,
    });
    }
}


export const authorizeRoles =  (...roles)=>{
    try {
        return (req , res , next)=>{
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({
                    succses:false,
                    message:"Accses denied"
                });
            }

            next();
        }
    } catch (error) {
         res.status(500).json({
      succses: false,
      message: "roles admin error Authirized",
      error: error.message,
    });
    }
}