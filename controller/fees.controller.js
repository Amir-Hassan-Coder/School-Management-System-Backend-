import feesModel from "../models/fees.model.js";
import mongoose from "mongoose";
export const createFess = async (req, res) => {
  try {
    const { studentId, classId, amount, month } = req.body;

    if (!studentId || !classId || !amount || !month) {
      res.status(401).json({
        succses: false,
        message: "all fileds are required",
      });
    }

    const findFess = await feesModel.findOne({ studentId, month });
    if (findFess) {
      return res.status(400).json({
        succses: false,
        message: "this student is already pay fees in this month",
      });
    }

    const createFess = await feesModel.create({
      studentId,
      classId,
      month,
      amount,
    });

    res.status(201).json({
      succses: false,
      message: "fess is created succssFully ",
      createFess,
    });
  } catch (error) {
    (res.status(500),
      json({
        succses: false,
        message: "Fess Pay Api problem",
        error: error.message,
      }));
  }
};

export const getFeesByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const fees = await feesModel
      .find({ studentId })
      .populate("studentId")
      .populate("classId");

    if (!fees) {
      return res.status(404).json({
        succses: false,
        message: "this student fess is not found",
      });
    }

    res.status(200).json({
      succses: false,
      message: "the student fess is ",
      fees,
    });
  } catch (error) {
    res.status(500).json({
      succses: false,
      message: "getFeesByStudent api problem",
    });
  }
};

export const payFess = async (req, res) => {
  try {
    const { id } = req.params;

    const fees = await feesModel.findById(id);
    if (!fees) {
      return res.status(404).json({
        succses: false,
        message: "Fess is Not Found",
      });
    }

    fees.status = "paid";

    fees.paidAt = new Date();

    await fees.save();

    res.status(200).json({
      succses: false,
      message: "Fees paid successfully",
      fees,
    });
  } catch (error) {
    res.status(500).json({
      succses: false,
      message: "payfees api problem",
    });
  }
};

export const getAllFess = async (req, res) => {
  try {
    const fees = await feesModel
      .find()
      .populate("studentId", "name email")
      .populate("classId", "name");

      if (!fees) {
        return res.status(404).json({
          succses:false,
          message:"Fees is not found"
        });
      }

      res.status(200).json({
        succses:true,
        message:"all student fees",
        fees
      })
  } catch (error) {
    res.status(500).json({
      succses: false,
      message: "getAllfees api problem",
    });
  }
};
