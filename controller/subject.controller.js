// import Student from "../models/student.model.js";
import subject from "./../models/subject.model.js";

export const createSubject = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).json({
        succses: false,
        message: "All fields are required",
      });
    }

    const newSubject = await subject.create({ name });
    res.status(201).json({
      succses: true,
      message: "class is create succsesFully",
      newSubject,
    });

    
  } catch (error) {
    res.status(500).json({
      succses: false,
      message: "error in create Subject api",
      error: error.message,
    });
  }
};



