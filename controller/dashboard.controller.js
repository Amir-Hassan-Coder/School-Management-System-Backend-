import classs from "../models/class.model.js";
import feesModel from "../models/fees.model.js";
import Student from "./../models/student.model.js";
import Attendence from "./../models/attendance.model.js";

 export const getDashboad = async (req, res) => {
  try {
    const totalstudent = await Student.countDocuments();

    const totalclass = await classs.countDocuments();

    const revenueData = await feesModel.find({ status: "paid" });

    const totalRevenue = revenueData.reduce((sum, item) => {
      return sum + item.amount;
    });

    const presentCount = await Attendence.countDocuments({ status: "present" });

    const absentCount = await Attendence.countDocuments({ status: "absent" });


    res.status(200).json(200).json({
        sucsses:true,
        data:{
            totalstudent,
            totalclass,
            totalRevenue,

            attendence: {
                present: presentCount,
                absent: absentCount
            }
        }
    })
  } catch (error) {
    res.status(500).json({
      sucsses: false,
      message: "get DashBoard api problem",
    });
  }
};
