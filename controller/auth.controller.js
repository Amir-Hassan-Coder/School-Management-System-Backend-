import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        succses: false,
        message: "plz provide a all fileds",
      });
    }

    // check exits user
    const exitsUser = await User.findOne({ email });
    if (exitsUser) {
      return res.status(400).json({
        succses: false,
        message: "this user is already registerd",
      });
    }

    const hasedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hasedPass,
      role,
    });

    res.status(201).json({
      succses: false,
      message: "user registerd succsesfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      succses: false,
      message: "register user api problem",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        succses: false,
        message: "plz provide a all fileds",
      });
    }

    // check exits user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        succses: false,
        message: "you can't login",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        succses: false,
        message: "plz provide a correct password",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SE_KEY,
      { expiresIn: "1d" },
    );

    res.cookie("token" , token , {
        httpOnly:true,
        secure: false
    });


    res.status(200).json({
        succses:true,
        message:"User Login SuccsesFully",
        user,
        token
    });
  } catch (error) {
    res.status(500).json({
      succses: false,
      message: "login user api problem",
      error: error.message,
    });
  }
};


